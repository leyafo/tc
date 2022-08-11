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
const stream_1 = require("@streamflow/stream");
const web3_js_1 = require("@solana/web3.js");
const airdrop_1 = require("./test-lib/airdrop");
const constants_1 = require("./test-lib/constants");
const constants_2 = require("./test-lib/constants");
const requestAirdrop = (wallet, connection) => __awaiter(void 0, void 0, void 0, function* () {
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
function fund_step(network, address) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://api.devnet.solana.com";
        const connection = new web3_js_1.Connection(url, 'confirmed');
        const publicKey = new PublicKey(address);
        const hash = yield connection.requestAirdrop(publicKey, web3_js_1.LAMPORTS_PER_SOL);
        yield connection.confirmTransaction(hash);
        return !!hash;
    });
}
const sClient = new stream_1.StreamClient("https://api.devnet.solana.com", stream_1.Cluster.Devnet, "confirmed");
// const wallet = Wallet.
const createStreamParams = {
    sender: wallet,
    recipient: "4ih00075bKjVg000000tLdk4w42NyG3Mv0000dc0M00",
    mint: "DNw99999M7e24g99999999WJirKeZ5fQc6KY999999gK",
    start: 1643363040,
    depositedAmount: (0, stream_1.getBN)(100, 9),
    period: 1,
    cliff: 1643363160,
    cliffAmount: new stream_1.BN(10),
    amountPerPeriod: (0, stream_1.getBN)(5, 9),
    name: "Transfer to Jane Doe.",
    canTopup: false,
    cancelableBySender: true,
    cancelableByRecipient: false,
    transferableBySender: true,
    transferableByRecipient: false,
    automaticWithdrawal: true,
    withdrawalFrequency: 10,
    partner: null, //  (optional) Partner's wallet address (string | null).
};
try {
    const { ixs, tx, metadata } = await sClient.create(createStreamParams);
}
catch (exception) {
    // handle exception
}
