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
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestAirdrop = void 0;
const web3_js_1 = require("@solana/web3.js");
const airdrop_1 = require("./airdrop");
const constants_1 = require("../constants");
const constants_2 = require("../constants");
const requestAirdrop = (wallet, connection) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(connection)
    if (!(wallet === null || wallet === void 0 ? void 0 : wallet.publicKey) || !connection) {
        return;
    }
    const txSolAirdrop = yield connection.requestAirdrop(wallet.publicKey, constants_1.AIRDROP_AMOUNT * web3_js_1.LAMPORTS_PER_SOL);
    yield connection.confirmTransaction(txSolAirdrop, constants_2.TX_FINALITY_CONFIRMED);
    const txTestTokenAirdrop = yield (0, airdrop_1.getTestTokenAirdrop)(connection, wallet);
    return Promise.all([
        connection.confirmTransaction(txTestTokenAirdrop, constants_2.TX_FINALITY_CONFIRMED),
    ]);
});
exports.requestAirdrop = requestAirdrop;
