use crate::errors::ClaimPrizeError;
use crate::state::{tournament::Tournament, tournament_vault::TournamentVault};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct ClaimPrize<'info> {
    #[account(mut)]
    pub winner: Signer<'info>,

    #[account(
        mut,
        constraint = tournament.is_finalized @ ClaimPrizeError::TournamentNotFinalized,
    )]
    pub tournament: Account<'info, Tournament>,

    #[account(
        mut,
        seeds = [b"vault", tournament.key().as_ref()],
        bump,
    )]
    pub vault: Account<'info, TournamentVault>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<ClaimPrize>) -> Result<()> {
    let vault = &mut ctx.accounts.vault;
    let winner = &mut ctx.accounts.winner;

    require!(
        ctx.accounts.tournament.winner == Some(winner.key()),
        ClaimPrizeError::NotWinner
    );

    require!(
        !ctx.accounts.tournament.is_claimed,
        ClaimPrizeError::AlreadyClaimed
    );

    let tournament = &mut ctx.accounts.tournament;

    // 97% of prize pool
    let prize = tournament.prize_pool * 97 / 100;

    // Manual lamports transfer
    **vault.to_account_info().try_borrow_mut_lamports()? -= prize;
    **winner.to_account_info().try_borrow_mut_lamports()? += prize;

    // Set the tournament as claimed
    ctx.accounts.tournament.is_claimed = true;

    msg!("Prize of {} lamports claimed by {}", prize, winner.key());

    Ok(())
}
