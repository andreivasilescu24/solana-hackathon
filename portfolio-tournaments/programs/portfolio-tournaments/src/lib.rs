use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod state;

pub use instructions::*;
pub use state::*;

declare_id!("7xaAXMNqwo3wCmTawLKchSbwZJchTkcnFxb1nLHnbg4u"); // LOCALNET ID
// declare_id!("9aQyw4VwZHRYH7Hu6QENQbeB8MQ3t9skfjCWqKvUGkpX"); // DEVNET ID

#[program]
pub mod portfolio_tournaments {
    use super::*;

    pub fn init_platform(ctx: Context<Initialize>) -> Result<()> {
        init_platform::handler(ctx)
    }

    pub fn create_tournament(
        ctx: Context<CreateTournament>,
        id: u64,
        entry_fee: u64,
        start_time: u64,
        end_time: u64,
        max_tokens_per_user: u8,
        max_users: u8,
        creator_weights: Vec<TokenAllocation>,
    ) -> Result<()> {
        create_tournament::handler(
            ctx,
            id,
            entry_fee,
            start_time,
            end_time,
            max_tokens_per_user,
            max_users,
            creator_weights,
        )
    }

    pub fn register_user(ctx: Context<RegisterUser>, weights: Vec<TokenAllocation>) -> Result<()> {
        register_user::handler(ctx, weights)
    }

    pub fn finalize_tournament(ctx: Context<FinalizeTournament>, winner: Pubkey) -> Result<()> {
        finalize_tournament::handler(ctx, winner)
    }
}
