import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PortfolioTournaments } from "../target/types/portfolio_tournaments";
import { PublicKey, SystemProgram } from "@solana/web3.js";

describe("portfolio-tournaments", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace
    .portfolioTournaments as Program<PortfolioTournaments>;
  const provider = anchor.AnchorProvider.env();
  const user = provider.wallet;

  it("Creates tournament", async () => {
    const entryFee = new anchor.BN(1000);
    const now = Math.floor(Date.now() / 1000);
    const startTime = new anchor.BN(now + 5); // Start a few seconds in future
    const endTime = new anchor.BN(now + 300); // 5 minutes later
    const id = new anchor.BN(1);

    // Derive Tournament PDA
    const [tournamentPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("tournament"),
        user.publicKey.toBuffer(),
        id.toArrayLike(Buffer, "le", 8),
      ],
      program.programId
    );

    // Derive Vault PDA
    const [vaultPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), tournamentPda.toBuffer()],
      program.programId
    );

    const tx = await program.methods
      .createTournament(entryFee, startTime, endTime, id)
      .accounts({
        creator: user.publicKey,
        
        // tournament: tournamentPda,
        // vault: vaultPda,
        // systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("✅ Created tournament! Transaction signature:", tx);
  });
});
