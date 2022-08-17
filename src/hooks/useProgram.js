import { useEffect, useState } from "react";
// import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

// import idl from "./solana-tweeter-idl.json";

// const SOLANA_TWITTER_PROGRAM = "926GETHcFsLU3vDWQUEnTpWYRYXktK6gCCfzivjFq4pa";
// const programID = new PublicKey(SOLANA_TWITTER_PROGRAM);

// 78PoQT2bBAJiQxk3qBshvxvFEiPeARDAzYE6zwqpbnUv

export const useProgram = ({ connection, programId, wallet }) => {
  const [program, setProgram] = useState();

  useEffect(() => {
    updateProgram();
  }, [connection, programId, wallet]);

  const updateProgram = async () => {
    const provider = new anchor.Provider(connection, wallet, {
      preflightCommitment: "recent"
      //   commitment: "processed"
    });
    console.log("provider", provider);

    const idl = await anchor.Program.fetchIdl(programId, provider);
    console.log("idl", idl);

    const program = new anchor.Program(idl, programId, provider);

    setProgram(program);
  };

  return {
    program
  };
};
