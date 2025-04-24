use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod state;

pub use instructions::*;

declare_id!("7xaAXMNqwo3wCmTawLKchSbwZJchTkcnFxb1nLHnbg4u");

#[program]
pub mod portfolio_tournaments {
    use super::*;

    pub fn create_tournament(
        ctx: Context<CreateTournament>,
        entry_fee: u64,
        start_time: u64,
        end_time: u64,
        id: u64,
    ) -> Result<()> {
        create_tournament::handler(ctx, entry_fee, start_time, end_time, id)
    }

    pub fn register_user(ctx: Context<RegisterUser>) -> Result<()> {
        register_user::handler(ctx)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
