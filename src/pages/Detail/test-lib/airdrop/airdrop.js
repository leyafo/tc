"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancel = exports.getTestTokenAirdrop = exports.initialize = void 0;
const anchor_1 = require("@project-serum/anchor");
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const airdrop_1 = __importDefault(require("../idl/airdrop"));
const constants_1 = require("../constants");
const PROGRAM_ID = "Ek6Jpdv5iEEDLXTVQ8UFcntms3DT2ewHtzzwH2R5MpvN";
function initProgram(connection, wallet) {
    const provider = new anchor_1.AnchorProvider(connection, wallet, {});
    return new anchor_1.Program(airdrop_1.default, PROGRAM_ID, provider);
}
function initialize(connection, wallet) {
    return __awaiter(this, void 0, void 0, function* () {
        const program = initProgram(connection, wallet);
        const mint = new web3_js_1.PublicKey(constants_1.AIRDROP_TEST_TOKEN);
        const airdropAccount = new web3_js_1.Keypair();
        const assTokenAccount = (yield (connection === null || connection === void 0 ? void 0 : connection.getTokenAccountsByOwner(wallet === null || wallet === void 0 ? void 0 : wallet.publicKey, {
            mint: mint,
        }))).value[0].pubkey;
        const assAirdropTokAcc = yield spl_token_1.Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, airdropAccount.publicKey);
        const instr = spl_token_1.Token.createAssociatedTokenAccountInstruction(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, assAirdropTokAcc, airdropAccount.publicKey, wallet.publicKey);
        try {
            yield program.rpc.initializeAirdrop(new anchor_1.BN(1000000 * 10 ** 9), new anchor_1.BN(100 * 10 ** 9), {
                accounts: {
                    initializer: wallet === null || wallet === void 0 ? void 0 : wallet.publicKey,
                    initializerDepositTokenAccount: assTokenAccount,
                    airdropAccount: airdropAccount.publicKey,
                    airdropTokenAccount: assAirdropTokAcc,
                    systemProgram: web3_js_1.SystemProgram.programId,
                    tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                },
                signers: [airdropAccount],
                instructions: [instr],
            });
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
exports.initialize = initialize;
function getTestTokenAirdrop(connection, wallet) {
    return __awaiter(this, void 0, void 0, function* () {
        const program = initProgram(connection, wallet);
        const mint = new web3_js_1.PublicKey(constants_1.AIRDROP_TEST_TOKEN);
        const airdropAccount = (yield (connection === null || connection === void 0 ? void 0 : connection.getProgramAccounts(new web3_js_1.PublicKey(PROGRAM_ID))))[0];
        const assTokenAcc = yield spl_token_1.Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, wallet.publicKey);
        const pda = (yield (connection === null || connection === void 0 ? void 0 : connection.getProgramAccounts(program.programId)))[0]
            .pubkey;
        const [_pda] = yield web3_js_1.PublicKey.findProgramAddress([Buffer.from("streamflow-airdrop", "utf-8")], program.programId);
        const assAirdropTokAcc = yield spl_token_1.Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, pda);
        try {
            const tx = yield program.rpc.getAirdrop({
                accounts: {
                    taker: wallet === null || wallet === void 0 ? void 0 : wallet.publicKey,
                    takerReceiveTokenAccount: assTokenAcc,
                    airdropAccount: airdropAccount.pubkey,
                    airdropTokenAccount: assAirdropTokAcc,
                    mint,
                    pdaAccount: _pda,
                    tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                    associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
                    systemProgram: web3_js_1.SystemProgram.programId,
                    rent: web3_js_1.SYSVAR_RENT_PUBKEY,
                },
            });
            return tx;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.getTestTokenAirdrop = getTestTokenAirdrop;
function cancel(connection, wallet) {
    return __awaiter(this, void 0, void 0, function* () {
        const program = initProgram(connection, wallet);
        const mint = new web3_js_1.PublicKey(constants_1.AIRDROP_TEST_TOKEN);
        const airdropAccount = (yield (connection === null || connection === void 0 ? void 0 : connection.getProgramAccounts(new web3_js_1.PublicKey(PROGRAM_ID))))[0];
        const assTokenAcc = yield spl_token_1.Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, wallet.publicKey);
        const pda = (yield (connection === null || connection === void 0 ? void 0 : connection.getProgramAccounts(program.programId)))[0]
            .pubkey;
        const [_pda] = yield web3_js_1.PublicKey.findProgramAddress([Buffer.from("streamflow-airdrop", "utf-8")], program.programId);
        const assAirdropTokAcc = yield spl_token_1.Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, pda);
        try {
            yield program.rpc.cancelAirdrop({
                accounts: {
                    initializer: wallet === null || wallet === void 0 ? void 0 : wallet.publicKey,
                    initializerDepositTokenAccount: assTokenAcc,
                    pdaAccount: _pda,
                    airdropAccount: airdropAccount.pubkey,
                    airdropTokenAccount: assAirdropTokAcc,
                    tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                },
            });
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
exports.cancel = cancel;
