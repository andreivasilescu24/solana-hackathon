use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Tournament {
    pub id: u64,
    pub creator: Pubkey,
    pub entry_fee: u64, // Lamports
    pub start_time: u64,
    pub end_time: u64,
    pub prize_pool: u64, // Total prize pool in lamports
    pub is_finalized: bool,
    pub is_claimed: bool,
    pub winner: Option<Pubkey>,
    pub max_tokens_per_user: u8,
    pub max_users: u8,
    pub current_users: u8, // Number of users currently registered in the tournament
                           // #[max_len(30)]
                           // pub token_mints: Vec<Pubkey>, // List of token mints in the tournament
                           // #[max_len(30)]
                           // pub start_prices: Vec<u64>, // List of start prices for each token mint
                           // #[max_len(30)]
                           // pub end_prices: Vec<u64>, // List of end prices for each token mint
}
