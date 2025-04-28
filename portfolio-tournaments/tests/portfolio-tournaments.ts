import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PortfolioTournaments } from "../target/types/portfolio_tournaments";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import { assert } from "chai";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("portfolio-tournaments", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace
    .portfolioTournaments as Program<PortfolioTournaments>;
  const provider = anchor.AnchorProvider.env();
  const user = provider.wallet;
  const id = new anchor.BN(3);

  const registrationUser1 = anchor.web3.Keypair.generate();
  const registrationUser2 = anchor.web3.Keypair.generate();

  const [tournamentPda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("tournament"),
      user.publicKey.toBuffer(),
      id.toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  );

  const [vaultPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), tournamentPda.toBuffer()],
    program.programId
  );

  it("Creates tournament", async () => {
    const entryFee = new anchor.BN(1000000000);
    const now = Math.floor(Date.now() / 1000);
    const startTime = new anchor.BN(now + 3); // Start a few seconds in future
    const endTime = new anchor.BN(now + 10); // 5 minutes later

    console.log(now, startTime.toString(), endTime.toString());

    console.log("Pub key: ", user.publicKey.toString());

    const tx = await program.methods
      .createTournament(id, entryFee, startTime, endTime)
      .accountsPartial({
        creator: user.publicKey,
        tournament: tournamentPda,
        vault: vaultPda,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("✅ Created tournament! Transaction signature:", tx);
  });

  it("Registers user", async () => {
    // 1. Generate a random user

    // console.log("Registration user: ", registrationUser.publicKey.toBase58());

    // console.log(
    //   "Balance before airdrop: ",
    //   (await provider.connection.getBalance(registrationUser.publicKey)) /
    //     LAMPORTS_PER_SOL,
    //   "SOL"
    // );

    // 2. Airdrop SOL to users
    const sig1 = await provider.connection.requestAirdrop(
      registrationUser1.publicKey,
      1.5 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(sig1);

    const sig2 = await provider.connection.requestAirdrop(
      registrationUser2.publicKey,
      1.5 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(sig2);

    // 3. Derive User Portfolio PDA
    const [userPortfolioPdaUser1] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("user_portfolio"),
        tournamentPda.toBuffer(),
        registrationUser1.publicKey.toBuffer(),
      ],
      program.programId
    );

    const [userPortfolioPdaUser2] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("user_portfolio"),
        tournamentPda.toBuffer(),
        registrationUser2.publicKey.toBuffer(),
      ],
      program.programId
    );

    const testTokenMintAddress = anchor.web3.Keypair.generate().publicKey;

    console.log(testTokenMintAddress.toBase58());
    // 4. Mock a simple portfolio (only one token, 100% allocation)
    const weights = [
      {
        mint: testTokenMintAddress, // fake token mint address
        weight: 100,
      },
    ];

    const vaultBalanceBefore = await provider.connection.getBalance(vaultPda);
    console.log(
      "Vault balance before user 1 registration: ",
      vaultBalanceBefore / LAMPORTS_PER_SOL,
      "SOL"
    );

    // 5. Call register_user
    await program.methods
      .registerUser(weights)
      .accountsPartial({
        user: registrationUser1.publicKey,
        tournament: tournamentPda,
        userPortfolio: userPortfolioPdaUser1,
        vault: vaultPda,
        systemProgram: SystemProgram.programId,
      })
      .signers([registrationUser1])
      .rpc();

    console.log(
      `✅ User ${registrationUser1.publicKey.toBase58()} registered in tournament!`
    );

    await program.methods
      .registerUser(weights)
      .accountsPartial({
        user: registrationUser2.publicKey,
        tournament: tournamentPda,
        userPortfolio: userPortfolioPdaUser2,
        vault: vaultPda,
        systemProgram: SystemProgram.programId,
      })
      .signers([registrationUser2])
      .rpc();

    console.log(
      `✅ User ${registrationUser2.publicKey.toBase58()} registered in tournament!`
    );

    console.log(
      "Vault balance after both registrations: ",
      (await provider.connection.getBalance(vaultPda)) / LAMPORTS_PER_SOL,
      "SOL"
    );
  });

  it("Finalizes tournament", async () => {
    console.log("Waiting 15 seconds...");
    await sleep(15000);
    console.log("Done waiting!");

    console.log(
      "Balance for user 1 before: ",
      (await provider.connection.getBalance(registrationUser1.publicKey)) /
        LAMPORTS_PER_SOL,
      "SOL"
    );
    console.log(
      "Balance for user 2 before: ",
      (await provider.connection.getBalance(registrationUser2.publicKey)) /
        LAMPORTS_PER_SOL,
      "SOL"
    );
    console.log(
      "Balance for vault before: ",
      (await provider.connection.getBalance(vaultPda)) / LAMPORTS_PER_SOL,
      "SOL"
    );

    await program.methods
      .finalizeTournament(registrationUser1.publicKey)
      .accountsPartial({
        tournament: tournamentPda,
        vault: vaultPda,
        systemProgram: SystemProgram.programId,
        creator: user.publicKey,
        winner: registrationUser1.publicKey,
      })
      .rpc();

    const winner = (await program.account.tournament.fetch(tournamentPda))
      .winner;
    assert.deepEqual(
      winner?.toBase58(),
      registrationUser1.publicKey.toBase58()
    );

    await program.methods
      .claimPrize()
      .accountsPartial({
        tournament: tournamentPda,
        vault: vaultPda,
        systemProgram: SystemProgram.programId,
        winner: registrationUser1.publicKey,
      })
      .signers([registrationUser1])
      .rpc();

    console.log(
      "Balance for vault after: ",
      (await provider.connection.getBalance(vaultPda)) / LAMPORTS_PER_SOL,
      "SOL"
    );

    console.log(
      "Balance for user 1 after: ",
      (await provider.connection.getBalance(registrationUser1.publicKey)) /
        LAMPORTS_PER_SOL,
      "SOL"
    );
    console.log(
      "Balance for user 2 after: ",
      (await provider.connection.getBalance(registrationUser2.publicKey)) /
        LAMPORTS_PER_SOL,
      "SOL"
    );
  });
});
