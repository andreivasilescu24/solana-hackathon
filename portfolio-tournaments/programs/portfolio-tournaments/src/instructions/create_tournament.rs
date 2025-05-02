use anchor_lang::prelude::*;

use crate::state::{tournament::Tournament, tournament_vault::TournamentVault, TokenAllocation, UserPortfolio};
use crate::errors::{CreateTournamentError, RegisterUserError};


#[derive(Accounts)]
#[instruction(id: u64)]
pub struct CreateTournament<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,
 
    #[account(
        init, 
        payer = creator,
        space = 8 + Tournament::INIT_SPACE,
        seeds = [b"tournament".as_ref(), creator.key().as_ref(), id.to_le_bytes().as_ref()],
        bump,
    )]
    pub tournament: Account<'info, Tournament>,
    #[account(
        init,
        payer = creator,
        space = 8,
        seeds = [b"vault".as_ref(), tournament.key().as_ref()],
        bump,
    )]
    pub vault: Account<'info, TournamentVault>,

    #[account(
        init,
        payer = creator,
        space = 8 + UserPortfolio::INIT_SPACE,
        seeds = [b"user_portfolio".as_ref(), tournament.key().as_ref(), creator.key().as_ref()],
        bump,
    )]
    pub creator_portfolio: Account<'info, UserPortfolio>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<CreateTournament>,
    id: u64,
    entry_fee: u64,
    start_time: u64,
    end_time: u64,
    max_tokens_per_user: u8,
    max_users: u8,
    creator_weights: Vec<TokenAllocation>,
) -> Result<()> {
    require!(
        start_time < end_time,
        CreateTournamentError::StartTimeMustBeLessThanEndTime
    );

    let tournament = &mut ctx.accounts.tournament;
    let vault = &mut ctx.accounts.vault;
    let user_portfolio = &mut ctx.accounts.creator_portfolio;
    let creator = &ctx.accounts.creator;

    require!(creator_weights.len() <= max_tokens_per_user as usize, RegisterUserError::MaxTokensExceeded);

    require!(max_users >= 2, CreateTournamentError::TournamentNeedsAtLeastTwoUsers);

    let total_weight: u8 = creator_weights.iter().map(|w| w.weight).sum();
    require!(
        total_weight == 100,
        RegisterUserError::InvalidPortfolio
    );

    tournament.set_inner(Tournament {
        id,
        creator: creator.key(),
        entry_fee,
        start_time,
        end_time,
        prize_pool: 0,
        is_finalized: false,
        is_claimed: false,
        winner: None,
        max_tokens_per_user: max_tokens_per_user,
        max_users: max_users,
        current_users: 1,
    });


    // Save creator's portfolio
    user_portfolio.set_inner(UserPortfolio {
        user: creator.key(),
        tournament: tournament.key(),
        weights: creator_weights,
    });

    // Transfer entry fee from creator to vault
    let cpi_accounts = anchor_lang::system_program::Transfer {
        from: creator.to_account_info(),
        to: vault.to_account_info(),
    };
    let cpi_context = CpiContext::new(ctx.accounts.system_program.to_account_info(), cpi_accounts);
    anchor_lang::system_program::transfer(cpi_context, entry_fee)?;

    // Update tournament prize pool
    tournament.prize_pool += entry_fee;

    msg!("Tournament created with ID: {} and creator registered!", id);

    Ok(())
}
