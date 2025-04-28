use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod state;

pub use instructions::*;
pub use state::*;

declare_id!("7xaAXMNqwo3wCmTawLKchSbwZJchTkcnFxb1nLHnbg4u");

#[program]
pub mod portfolio_tournaments {
    use super::*;

    pub fn create_tournament(
        ctx: Context<CreateTournament>,
        id: u64,
        entry_fee: u64,
        start_time: u64,
        end_time: u64,
    ) -> Result<()> {
        create_tournament::handler(ctx, id, entry_fee, start_time, end_time)
    }

    pub fn register_user(ctx: Context<RegisterUser>, weights: Vec<TokenAllocation>) -> Result<()> {
        register_user::handler(ctx, weights)
    }

    pub fn finalize_tournament(ctx: Context<FinalizeTournament>, winner: Pubkey) -> Result<()> {
        finalize_tournament::handler(ctx, winner)
    }

    pub fn claim_prize(ctx: Context<ClaimPrize>) -> Result<()> {
        claim_prize::handler(ctx)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
