use anchor_lang::prelude::*;

#[error_code]
pub enum CreateTournamentError {
    #[msg("Start time must be before end time of the tournament")]
    StartTimeMustBeLessThanEndTime,
}
