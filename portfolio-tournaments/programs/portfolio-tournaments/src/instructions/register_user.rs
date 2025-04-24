use anchor_lang::{
    prelude::*,
    system_program::{self, transfer, Transfer},
};

use crate::{
    errors::RegisterUserError,
    state::{
        tournament::Tournament, tournament_vault::TournamentVault, user_portfolio::UserPortfolio,
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
    pub user_portfolio: Account<'info, UserPortfolio>,

    #[account(
        mut,
        seeds = [b"vault".as_ref(), tournament.key().as_ref()],
        bump,
    )]
    pub vault: Account<'info, TournamentVault>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<RegisterUser>) -> Result<()> {
    let tournament = &mut ctx.accounts.tournament;
    let user = &ctx.accounts.user;

    // Check time window
    let now = Clock::get()?.unix_timestamp as u64;
    require!(
        now < tournament.start_time,
        RegisterUserError::RegistrationClosed
    );

    let user_token_weights = &ctx.accounts.user_portfolio.weights;

    // Validate portfolio weights
    let total_weight: u8 = user_token_weights.iter().map(|w| w.weight).sum();
    require!(total_weight == 100, RegisterUserError::InvalidPortfolio);

    // Transfer entry fee from user to vault
    let register_fee = tournament.entry_fee;

    let cpi_accounts = system_program::Transfer {
        from: ctx.accounts.user.to_account_info(),
        to: ctx.accounts.vault.to_account_info(),
    };

    let cpi_context = CpiContext::new(ctx.accounts.system_program.to_account_info(), cpi_accounts);
    system_program::transfer(cpi_context, register_fee)?;

    ctx.accounts.user_portfolio.set_inner(UserPortfolio {
        user: user.key(),
        tournament: tournament.key(),
        weights: user_token_weights.clone(),
    });

    // Update prize pool
    tournament.prize_pool += register_fee;

    msg!("{} registered for tournament {}", user.key(), tournament.id);

    Ok(())
}
