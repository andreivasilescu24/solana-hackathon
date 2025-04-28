use anchor_lang::{prelude::*, system_program::{transfer, Transfer}};

use crate::{errors::FinalizeTournamentError, state::{tournament::Tournament, tournament_vault::TournamentVault}};

#[derive(Accounts)]
pub struct FinalizeTournament<'info> {
    #[account(mut, has_one = creator)]
    pub tournament: Account<'info, Tournament>,

    #[account(mut)]
    pub creator: Signer<'info>,

    #[account(
        mut, 
        seeds = [b"vault".as_ref(), tournament.key().as_ref()],
        bump,
    )]
    pub vault: Account<'info, TournamentVault>,
    /// CHECK: This is the winner's wallet address, no checks are needed because we only transfer SOL to this account.
    #[account(mut)]
    pub winner: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<FinalizeTournament>, winner: Pubkey) -> Result<()> {
    let tournament = &mut ctx.accounts.tournament;
    let vault = &ctx.accounts.vault;

    let now = Clock::get()?.unix_timestamp as u64;

    require!(now > tournament.end_time, FinalizeTournamentError::TournamentNotEnded);
    require!(!tournament.is_finalized, FinalizeTournamentError::AlreadyFinalized);
    require!(
        ctx.accounts.winner.key() == winner,
        FinalizeTournamentError::InvalidWinnerAccount
    );
    
    // Set the winner
    tournament.winner = Some(winner);
    tournament.is_finalized = true;

    msg!("Tournament with ID {} finalized. Winner: {}", tournament.id, winner);

    Ok(())
}