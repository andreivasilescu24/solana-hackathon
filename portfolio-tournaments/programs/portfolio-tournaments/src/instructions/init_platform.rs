use anchor_lang::prelude::*;

use crate::PlatformAuthority;

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + PlatformAuthority::INIT_SPACE,
        seeds = [b"platform-authority".as_ref()],
        bump
    )]
    pub platform_authority: Account<'info, PlatformAuthority>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<Initialize>) -> Result<()> {
    ctx.accounts
        .platform_authority
        .set_inner(PlatformAuthority {
            authority_wallet: ctx.accounts.authority.key(),
        });
    Ok(())
}
