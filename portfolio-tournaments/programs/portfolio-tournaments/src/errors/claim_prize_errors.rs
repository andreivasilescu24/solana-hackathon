use anchor_lang::prelude::*;

#[error_code]
pub enum ClaimPrizeError {
    #[msg("Tournament not finalized yet.")]
    TournamentNotFinalized,
    #[msg("You are not the winner of this tournament.")]
    NotWinner,
    #[msg("Already claimed prize.")]
    AlreadyClaimed,
}
