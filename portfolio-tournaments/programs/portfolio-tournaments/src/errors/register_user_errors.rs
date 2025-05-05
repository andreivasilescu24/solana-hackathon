use anchor_lang::prelude::*;

#[error_code]
pub enum RegisterUserError {
    #[msg("Registration period is closed.")]
    RegistrationClosed,
    #[msg("Portfolio weights must sum to 100.")]
    InvalidPortfolio,
    #[msg("Didn't send money to the vault.")]
    VaultTransferFailed,
    #[msg("Max tokens per user portfolio exceeded.")]
    MaxTokensExceeded,
    #[msg("Max users in tournament exceeded.")]
    MaxUsersReached,
}
