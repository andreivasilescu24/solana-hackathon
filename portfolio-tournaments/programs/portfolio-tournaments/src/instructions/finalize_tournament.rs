use anchor_lang::{prelude::*, system_program::{transfer, Transfer}};

use crate::{errors::FinalizeTournamentError, state::{tournament::Tournament, tournament_vault::TournamentVault}, PlatformAuthority};

#[derive(Accounts)]
pub struct FinalizeTournament<'info> {
    #[account(mut)]
    pub tournament: Account<'info, Tournament>,

    #[account(
        seeds = [b"platform-authority"],
        bump,
    )]
    pub platform: Account<'info, PlatformAuthority>,

    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut, 
        seeds = [b"vault".as_ref(), tournament.key().as_ref()],
        bump,
    )]
    pub vault: Account<'info, TournamentVault>,
    /// CHECK: This is the winner's wallet address, no checks are needed because we only transfer SOL to this account.
    #[account(mut)]
    pub winner: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: Platform fee recipient (backend treasury)
    pub platform_wallet: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<FinalizeTournament>, winner: Pubkey) -> Result<()> {
    let tournament = &mut ctx.accounts.tournament;
    let vault = &mut ctx.accounts.vault;
    let now = Clock::get()?.unix_timestamp as u64;

    // 1. Check authority
    require!(
        ctx.accounts.platform.authority_wallet == ctx.accounts.authority.key(),
        FinalizeTournamentError::NotTournamentAuthority
    );

    // 2. Check tournament state
    require!(
        now > tournament.end_time,
        FinalizeTournamentError::TournamentNotEnded
    );
    require!(
        !tournament.is_finalized,
        FinalizeTournamentError::AlreadyFinalized
    );
    require!(
        ctx.accounts.winner.key() == winner,
        FinalizeTournamentError::InvalidWinnerAccount
    );

    // 3. Calculate prize
    let prize = tournament.prize_pool * 97 / 100;
    let platform_fee = tournament.prize_pool - prize;

    // 4. Transfer lamports manually
    **vault.to_account_info().try_borrow_mut_lamports()? -= prize;
    **ctx.accounts.winner.to_account_info().try_borrow_mut_lamports()? += prize;

    **vault.to_account_info().try_borrow_mut_lamports()? -= platform_fee;
    **ctx.accounts.platform_wallet.to_account_info().try_borrow_mut_lamports()? += platform_fee;
    

    // 5. Finalize tournament
    tournament.winner = Some(winner);
    tournament.is_finalized = true;
    tournament.is_claimed = true;

    msg!(
        "Tournament with ID {} finalized. Winner: {} received {} lamports! Platform fee: {} lamports",
        tournament.id,
        winner,
        prize,
        platform_fee
    );

    Ok(())
}

