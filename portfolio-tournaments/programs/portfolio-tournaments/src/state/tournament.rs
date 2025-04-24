use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Tournament {
    pub id: u64,
    pub creator: Pubkey,
    pub entry_fee: u64,
    pub start_time: u64,
    pub end_time: u64,
    pub prize_pool: u64,
    pub is_finalized: bool,
    pub winner: Option<Pubkey>,
}
