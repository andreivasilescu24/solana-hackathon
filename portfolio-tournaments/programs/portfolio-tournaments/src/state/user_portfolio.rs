use anchor_lang::prelude::*;
// use crate::state::t

#[derive(AnchorSerialize, AnchorDeserialize, Clone, InitSpace)]
pub struct TokenAllocation {
    pub mint: Pubkey,
    pub weight: u8,
}

#[account]
#[derive(InitSpace)]
pub struct UserPortfolio {
    pub user: Pubkey,
    pub tournament: Pubkey,
    #[max_len(10)]
    pub weights: Vec<TokenAllocation>,
}
