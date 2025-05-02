use anchor_lang::{
    prelude::*,
    system_program::{self, transfer, Transfer},
};

use crate::{
    accounts,
    errors::{FinalizeTournamentError, RegisterUserError},
    state::{
        tournament::Tournament,
        tournament_vault::TournamentVault,
        user_portfolio::{TokenAllocation, UserPortfolio},
    },
};

#[derive(Accounts)]
pub struct RegisterUser<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub tournament: Account<'info, Tournament>,
    #[account(
        init,
        payer = user,
        space = 8 + UserPortfolio::INIT_SPACE,
        seeds = [b"user_portfolio".as_ref(), tournament.key().as_ref(), user.key().as_ref()],
        bump,
    )]
    pub user_portfolio: Account<'info, UserPortfolio>, // fail if user already registered

    #[account(
        mut,
        seeds = [b"vault".as_ref(), tournament.key().as_ref()],
        bump,
    )]
    pub vault: Account<'info, TournamentVault>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<RegisterUser>, weights: Vec<TokenAllocation>) -> Result<()> {
    let tournament = &mut ctx.accounts.tournament;
    let user = &ctx.accounts.user;

    require!(
        !tournament.is_finalized,
        FinalizeTournamentError::AlreadyFinalized
    );

    // Check time window
    let now = Clock::get()?.unix_timestamp as u64;
    require!(
        now < tournament.start_time,
        RegisterUserError::RegistrationClosed
    );

    require!(
        tournament.current_users < tournament.max_users,
        RegisterUserError::MaxUsersReached
    );

    require!(
        weights.len() <= tournament.max_tokens_per_user as usize,
        RegisterUserError::MaxTokensExceeded
    );

    // Validate portfolio weights
    let total_weight: u8 = weights.iter().map(|w| w.weight).sum();
    require!(total_weight == 100, RegisterUserError::InvalidPortfolio);

    // Transfer entry fee from user to vault
    let register_fee = tournament.entry_fee;

    let cpi_accounts = system_program::Transfer {
        from: ctx.accounts.user.to_account_info(),
        to: ctx.accounts.vault.to_account_info(),
    };

    let cpi_context = CpiContext::new(ctx.accounts.system_program.to_account_info(), cpi_accounts);
    system_program::transfer(cpi_context, register_fee)
        .map_err(|_| error!(RegisterUserError::VaultTransferFailed))?;

    ctx.accounts.user_portfolio.set_inner(UserPortfolio {
        user: user.key(),
        tournament: tournament.key(),
        weights: weights,
    });

    // Update prize pool
    tournament.prize_pool += register_fee;
    tournament.current_users += 1;

    msg!("{} registered for tournament {}", user.key(), tournament.id);

    Ok(())
}
