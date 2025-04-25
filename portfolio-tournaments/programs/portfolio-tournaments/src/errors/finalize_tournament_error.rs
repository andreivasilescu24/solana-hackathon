use anchor_lang::prelude::*;

#[error_code]
pub enum FinalizeTournamentError {
    #[msg("The tournament has not yet ended.")]
    TournamentNotEnded,
    #[msg("The tournament has already been finalized.")]
    AlreadyFinalized,
    #[msg("Winner pubkey does not match the provided winner account.")]
    InvalidWinnerAccount,
}
