import { Program, AnchorProvider, setProvider } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import { ProgramWallet } from "../types/program";
import IDL from "../portofolio_tournaments.json";

export const PROGRAM_ID = new PublicKey(
  "7xaAXMNqwo3wCmTawLKchSbwZJchTkcnFxb1nLHnbg4u"
);

export const getProgram = (connection: Connection, wallet: ProgramWallet) => {
  const provider = new AnchorProvider(
    connection,
    wallet,
    AnchorProvider.defaultOptions()
  );
  setProvider(provider);
  // @ts-ignore - IDL types are complex to handle, but this works at runtime
  return new Program(IDL, PROGRAM_ID, provider);
};
