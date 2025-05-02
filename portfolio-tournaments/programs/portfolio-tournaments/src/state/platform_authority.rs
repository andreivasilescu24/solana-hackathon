use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct PlatformAuthority {
    pub authority_wallet: Pubkey,
}
