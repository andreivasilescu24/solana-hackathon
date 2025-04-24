use anchor_lang::prelude::*;

use crate::state::{tournament::Tournament, tournament_vault::TournamentVault};
use crate::errors::CreateTournamentError;


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
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<CreateTournament>,
    entry_fee: u64,
    start_time: u64,
    end_time: u64,
    id: u64,
) -> Result<()> {
    
    require!(start_time < end_time, CreateTournamentError::StartTimeMustBeLessThanEndTime);
    
    ctx.accounts.tournament.set_inner(Tournament { 
        id: id, 
        creator: ctx.accounts.creator.key(), 
        entry_fee: entry_fee, 
        start_time: start_time, 
        end_time: end_time, 
        prize_pool: 0, 
        is_finalized: false, 
        winner: None 
    });


    msg!("Tournament created with ID: {}", id);

    Ok(())
}
