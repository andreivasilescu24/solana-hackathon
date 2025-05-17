import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PortfolioTournaments } from "../target/types/portfolio_tournaments";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import { assert } from "chai";
import {
  PythConnection,
  getPythProgramKeyForCluster,
} from "@pythnetwork/client";

import axios from "axios";

const RENDER_MINT_ADDR = new PublicKey(
  "rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof"
);
const JUPITER_MINT_ADDR = new PublicKey(
  "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN"
);
const PYTH_MINT_ADDR = new PublicKey(
  "HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3"
);

const TOKEN_MINT_TO_PRICE_FEED = {
  [RENDER_MINT_ADDR.toBase58()]:
    "3d4a2bd9535be6ce8059d75eadeba507b043257321aa544717c56fa19b49e35d",
  [JUPITER_MINT_ADDR.toBase58()]:
    "0a0408d619e9380abad35060f9192039ed5042fa6f82301d0e48bb52be830996",
  [PYTH_MINT_ADDR.toBase58()]:
    "0bbf28e9a841a1cc788f6a361b17ca072d0ea3098a1e5df1c3922d06719579ff",
};

let startTime: anchor.BN;
let endTime: anchor.BN;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getPriceFeedQueryParams(): string {
  return Object.values(TOKEN_MINT_TO_PRICE_FEED)
    .map((id) => `ids[]=${id}`)
    .join("&");
}

async function fetchPriceAt(timestamp: anchor.BN) {
  const query = getPriceFeedQueryParams();
  const response = await axios.get(
    `https://hermes.pyth.network/v2/updates/price/${timestamp}?${query}&parsed=true`
  );
  return response.data.parsed;
}

function calculatePortfolioPnL(portfolio, startPrices, endPrices) {
  let totalReturn = 0;

  for (const { mint, weight } of portfolio.weights) {
    const mintStr = mint.toBase58();
    const priceFeedId = TOKEN_MINT_TO_PRICE_FEED[mintStr];

    if (!priceFeedId) {
      console.warn(`No price feed for token: ${mintStr}`);
      continue;
    }

    const startPriceObj = startPrices.find((p) => p.id === priceFeedId);
    const endPriceObj = endPrices.find((p) => p.id === priceFeedId);

    if (!startPriceObj || !endPriceObj) {
      console.warn(`Missing price data for feed: ${priceFeedId}`);
      continue;
    }

    const startPrice =
      startPriceObj.price.price * 10 ** startPriceObj.price.expo;
    const endPrice = endPriceObj.price.price * 10 ** endPriceObj.price.expo;

    const priceChange = (endPrice / startPrice - 1) * (weight / 100);
    totalReturn += priceChange;

    console.log(
      `→ Token ${mintStr}\n   Start: ${startPrice.toFixed(
        8
      )}, End: ${endPrice.toFixed(
        8
      )}, Weight: ${weight}%\n   PnL Contribution: ${(
        priceChange * 100
      ).toFixed(4)}%`
    );
  }

  return totalReturn;
}

describe("portfolio-tournaments", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace
    .portfolioTournaments as Program<PortfolioTournaments>;
  const provider = anchor.AnchorProvider.env();
  const user = provider.wallet;
  console.log("User:", user.publicKey.toString());
  const id = new anchor.BN(3);

  const registrationUser1 = anchor.web3.Keypair.generate();
  const registrationUser2 = anchor.web3.Keypair.generate();

  const platformAuthorityPda = PublicKey.findProgramAddressSync(
    [Buffer.from("platform-authority")],
    program.programId
  );

  // console.log(testTokenMintAddress.toBase58());
  // 4. Mock a simple portfolio (only one token, 100% allocation)
  const weights = [
    {
      mint: RENDER_MINT_ADDR,
      weight: 100,
    },
  ];

  const weightsUser1 = [
    {
      mint: PYTH_MINT_ADDR,
      weight: 50,
    },
    {
      mint: JUPITER_MINT_ADDR,
      weight: 50,
    },
  ];

  const weightsUser2 = [
    {
      mint: RENDER_MINT_ADDR,
      weight: 50,
    },
    {
      mint: JUPITER_MINT_ADDR,
      weight: 50,
    },
  ];

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

  const [creatorPortfolioPda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("user_portfolio"),
      tournamentPda.toBuffer(),
      user.publicKey.toBuffer(),
    ],
    program.programId
  );

  it("Initialize platform ", async () => {
    try {
      console.log("\nInitializing platform with:");
      console.log("Program ID:", program.programId.toString());
      console.log(
        "Platform Authority PDA:",
        platformAuthorityPda[0].toString()
      );
      console.log("Your wallet:", user.publicKey.toString());

      // Get the PDA account info before initialization
      const accountBefore = await provider.connection.getAccountInfo(
        platformAuthorityPda[0]
      );
      console.log(
        "\nPDA account before init:",
        accountBefore ? "Exists" : "Doesn't exist"
      );

      const tx = await program.methods
        .initPlatform()
        .accountsPartial({
          platformAuthority: platformAuthorityPda[0],
          authority: user.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([user.payer])
        .rpc();

      // Get the PDA account info after initialization
      const accountAfter = await provider.connection.getAccountInfo(
        platformAuthorityPda[0]
      );
      console.log(
        "\nPDA account after init:",
        accountAfter ? "Exists" : "Doesn't exist"
      );
      if (accountAfter) {
        console.log("Account owner:", accountAfter.owner.toString());
        console.log("Account data length:", accountAfter.data.length, "bytes");
      }

      console.log("\n✅ Platform initialized on devnet!");
      console.log("Transaction signature:", tx);
      console.log(
        `View on Solana Explorer: https://explorer.solana.com/tx/${tx}?cluster=devnet`
      );
      console.log(
        `View on Solscan: https://solscan.io/tx/${tx}?cluster=devnet`
      );
    } catch (error) {
      console.error("Error initializing platform:", error);
      throw error;
    }
  });

  it("Creates tournament", async () => {
    const entryFee = new anchor.BN(1000000000);
    const now = Math.floor(Date.now() / 1000);
    startTime = new anchor.BN(now + 3); // Start a few seconds in future
    endTime = new anchor.BN(now + 10); // 5 minutes later

    console.log("Pub key: ", user.publicKey.toString());

    const tx = await program.methods
      .createTournament(id, entryFee, startTime, endTime, 5, 5, weights)
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

    const vaultBalanceBefore = await provider.connection.getBalance(vaultPda);
    console.log(
      "Vault balance before user 1 registration: ",
      vaultBalanceBefore / LAMPORTS_PER_SOL,
      "SOL"
    );

    // 5. Call register_user
    await program.methods
      .registerUser(weightsUser1)
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
      .registerUser(weightsUser2)
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
      "Creator balance before: ",
      (await provider.connection.getBalance(user.publicKey)) / LAMPORTS_PER_SOL
    );

    console.log(
      "Balance for vault before: ",
      (await provider.connection.getBalance(vaultPda)) / LAMPORTS_PER_SOL,
      "SOL"
    );

    console.log(
      "Balance for platform authority before: ",
      (await provider.connection.getBalance(user.publicKey)) / LAMPORTS_PER_SOL,
      "SOL"
    );

    const userPortfolio1 = await program.account.userPortfolio.fetch(
      userPortfolioPdaUser1
    );
    const userPortfolio2 = await program.account.userPortfolio.fetch(
      userPortfolioPdaUser2
    );
    const creatorPortfolio = await program.account.userPortfolio.fetch(
      creatorPortfolioPda
    );

    const startPrices = await fetchPriceAt(new anchor.BN(1740819600));
    const endPrices = await fetchPriceAt(new anchor.BN(1743494400));

    // console.log("Start prices: ", startPrices);
    // console.log("End prices: ", endPrices);

    const pnlUser1 = calculatePortfolioPnL(
      userPortfolio1,
      startPrices,
      endPrices
    );

    const pnlUser2 = calculatePortfolioPnL(
      userPortfolio2,
      startPrices,
      endPrices
    );

    const pnlCreator = calculatePortfolioPnL(
      creatorPortfolio,
      startPrices,
      endPrices
    );

    const players = [
      {
        publicKey: registrationUser1.publicKey,
        pnl: pnlUser1,
      },
      {
        publicKey: registrationUser2.publicKey,
        pnl: pnlUser2,
      },
      {
        publicKey: user.publicKey,
        pnl: pnlCreator,
      },
    ];

    // Find max pnl
    let maxPnl = Number.NEGATIVE_INFINITY;
    let winnerPublicKey: PublicKey | null = null;

    for (const player of players) {
      if (player.pnl > maxPnl) {
        maxPnl = player.pnl;
        winnerPublicKey = player.publicKey;
      }
    }

    if (!winnerPublicKey) {
      throw new Error("No winner could be determined!");
    }

    console.log(
      "user1 address: ",
      registrationUser1.publicKey.toBase58(),
      " PNL: ",
      pnlUser1
    );
    console.log(
      "user2 address: ",
      registrationUser2.publicKey.toBase58(),
      " PNL: ",
      pnlUser2
    );
    console.log(
      "creator address: ",
      user.publicKey.toBase58(),
      " PNL: ",
      pnlCreator
    );
    console.log("🟢 Winner public key: ", winnerPublicKey?.toBase58());

    await program.methods
      .finalizeTournament(winnerPublicKey)
      .accountsPartial({
        tournament: tournamentPda,
        platform: platformAuthorityPda[0],
        authority: user.publicKey,
        vault: vaultPda,
        winner: winnerPublicKey,
        platformWallet: user.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    const winner = (await program.account.tournament.fetch(tournamentPda))
      .winner;
    assert.deepEqual(winner?.toBase58(), winnerPublicKey.toBase58());

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

    console.log(
      "Creator balance before: ",
      (await provider.connection.getBalance(user.publicKey)) / LAMPORTS_PER_SOL
    );

    console.log(
      "Balance for vault after: ",
      (await provider.connection.getBalance(vaultPda)) / LAMPORTS_PER_SOL,
      "SOL"
    );

    console.log(
      "Balance for platform authority after: ",
      (await provider.connection.getBalance(user.publicKey)) / LAMPORTS_PER_SOL,
      "SOL"
    );
  });
});
