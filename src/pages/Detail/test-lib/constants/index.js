"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferCancelOptions = exports.DATA_LAYER_VARIABLE = exports.USD_PEGGED_COINS = exports.DEFAULT_GA_PURCHASE_CURRENCY = exports.AFFILIATION = exports.TRANSACTION_VARIANT = exports.EVENT_TYPE = exports.EVENT_LABEL = exports.EVENT_ACTION = exports.EVENT_CATEGORY = exports.timePeriodOptions = exports.PERIOD = exports.ERRORS = exports.DEFAULT_DECIMAL_PLACES = exports.products = exports.PRODUCT_MULTISIG = exports.PRODUCT_MULTIPAY = exports.PRODUCT_STREAMS = exports.PRODUCT_VESTING = exports.ERR_NO_PRIOR_CREDIT = exports.ERR_NO_TOKEN_SELECTED = exports.ERR_NOT_CONNECTED = exports.ERR_NO_STREAM = exports.END = exports.START = exports.TIME_FORMAT = exports.DATE_FORMAT = exports.EXPLORER_TYPE_ADDR = exports.EXPLORER_TYPE_TX = exports.ProgramInstruction = exports.INSTRUCTION_TRANSFER_RECIPIENT = exports.INSTRUCTION_CANCEL_STREAM = exports.INSTRUCTION_WITHDRAW_STREAM = exports.INSTRUCTION_CREATE_STREAM = exports.TX_FINALITY_FINALIZED = exports.TX_FINALITY_CONFIRMED = exports.ALLOWED_PDA_PROGRAMS = exports.AIRDROP_WHITELIST = exports.AIRDROP_TEST_TOKEN = exports.AIRDROP_PDA = exports.AIRDROP_AMOUNT = void 0;
exports.AIRDROP_AMOUNT = 1; // 1 SOL is the cap on the testnet
exports.AIRDROP_PDA = "DRCLpDJUNiMeKuRP9dcnGuibjTMjDGFwbZEXsq1RRgiR";
exports.AIRDROP_TEST_TOKEN = "Gssm3vfi8s65R31SBdmQRq6cKeYojGgup7whkw4VCiQj";
exports.AIRDROP_WHITELIST = [
    "3r1cS6LS7Q5e2XzMhjV4jwuJEyMsPnTFSSEU8HitWYFc",
    "9CTuPR1xDwyAnQmtAY7PawFDta7yjhkyZhLkXXsUQWFS",
    "8HRZui7gdzueWfB1Bgj2GesaPMJFyqLEk4y67TnNXcJd",
    "4pYeM1AhyqCXy63xtwfMtytz8keWxBD2gHWHqdwacK3C",
];
exports.ALLOWED_PDA_PROGRAMS = [
    "GokivDYuQXPZCWRkwMhdH2h91KpDQXBEmpgBgs55bnpH",
];
exports.TX_FINALITY_CONFIRMED = "confirmed";
exports.TX_FINALITY_FINALIZED = "finalized";
exports.INSTRUCTION_CREATE_STREAM = 0;
exports.INSTRUCTION_WITHDRAW_STREAM = 1;
exports.INSTRUCTION_CANCEL_STREAM = 2;
exports.INSTRUCTION_TRANSFER_RECIPIENT = 3;
var ProgramInstruction;
(function (ProgramInstruction) {
    ProgramInstruction[ProgramInstruction["Create"] = 0] = "Create";
    ProgramInstruction[ProgramInstruction["Withdraw"] = 1] = "Withdraw";
    ProgramInstruction[ProgramInstruction["Topup"] = 2] = "Topup";
    ProgramInstruction[ProgramInstruction["Cancel"] = 3] = "Cancel";
    ProgramInstruction[ProgramInstruction["TransferRecipient"] = 4] = "TransferRecipient";
})(ProgramInstruction = exports.ProgramInstruction || (exports.ProgramInstruction = {}));
exports.EXPLORER_TYPE_TX = "tx";
exports.EXPLORER_TYPE_ADDR = "address";
exports.DATE_FORMAT = "yyyy-MM-dd";
exports.TIME_FORMAT = "HH:mm";
exports.START = "start";
exports.END = "end";
//might move to a separate class if it becomes clunky
exports.ERR_NO_STREAM = "Specified stream doesn't exist. Please double check with the sender.";
exports.ERR_NOT_CONNECTED = "There was an issue with the connection - please try to refresh the page.";
exports.ERR_NO_TOKEN_SELECTED = "Please select the token";
exports.ERR_NO_PRIOR_CREDIT = "You don't have enough SOL in your wallet to pay for transaction fees.";
exports.PRODUCT_VESTING = "vesting";
exports.PRODUCT_STREAMS = "streams";
exports.PRODUCT_MULTIPAY = "multipay";
exports.PRODUCT_MULTISIG = "multisig";
exports.products = [
    exports.PRODUCT_VESTING,
    exports.PRODUCT_STREAMS,
    exports.PRODUCT_MULTIPAY,
    exports.PRODUCT_MULTISIG,
];
exports.DEFAULT_DECIMAL_PLACES = 2;
exports.ERRORS = {
    amount_required: "Amount is required.",
    amount_greater_than: "Please provide amount greater than 0.",
    token_required: "Token is required.",
    recipient_required: "You must choose a recipient.",
    not_valid_email: "Must be a valid email.",
    subject_required: "Please provide a subject (title).",
    start_date_required: "Start date is required.",
    start_date_is_in_the_past: "Cannot start stream in the past.",
    start_time_required: "Start time is required.",
    start_time_is_in_the_past: "Should start in future.",
    end_date_required: "End date is required.",
    end_time_required: "End time is required.",
    deposited_amount_required: "Deposited amount is required.",
    amount_too_high: "You don't have enough tokens.",
    invalid_address: "Please enter a valid Solana wallet address.",
    address_is_a_program: "Address cannot be a program.",
    release_amount_greater_than_deposited: "Should be <= deposited amount.",
    end_should_be_after_start: "End should happen after start.",
    cliff_should_be_after_start: "Cliff should happen after start.",
    cliff_should_be_before_end: "Cliff should happen before end.",
    required: "Required.",
    release_frequency_is_too_slow: "Should be smaller or equal to difference between END and CLIFF time.",
    should_be_greater_than_0: "Should be greater than 0.",
    max_year: "Year should be less than 9999.",
    subject_too_long: "It is either too long or there are many complex characters.",
    withdrawal_frequency_too_high: "Withdrawal frequency should be >= release frequency.",
};
exports.PERIOD = {
    SECOND: 1,
    MINUTE: 60,
    HOUR: 3600,
    DAY: 24 * 3600,
    WEEK: 7 * 24 * 3600,
    MONTH: Math.floor(30.4167 * 24 * 3600),
    YEAR: 365 * 24 * 3600, // 365 days
};
exports.timePeriodOptions = [
    { value: exports.PERIOD.SECOND, label: "second" },
    { value: exports.PERIOD.MINUTE, label: "minute" },
    { value: exports.PERIOD.HOUR, label: "hour" },
    { value: exports.PERIOD.DAY, label: "day" },
    { value: exports.PERIOD.WEEK, label: "week" },
    { value: exports.PERIOD.MONTH, label: "month" },
    { value: exports.PERIOD.YEAR, label: "year" },
];
exports.EVENT_CATEGORY = {
    WALLET: "wallet",
    STREAM: "stream",
    VESTING: "vesting",
};
exports.EVENT_ACTION = {
    TRANSFER: "transfer",
    CANCEL: "cancel",
    TOP_UP: "top_up",
    WITHDRAW: "withdraw",
    CONNECT: "connect",
    DISCONNECT: "disconnect",
};
exports.EVENT_LABEL = {
    NONE: "none",
};
exports.EVENT_TYPE = {
    EVENT: "event",
    PAGEVIEW: "pageview",
    PURCHASE: "purchase",
};
exports.TRANSACTION_VARIANT = {
    CREATE_VESTING: "create_vesting",
    CREATE_STREAM: "create_stream",
    TOP_UP_STREAM: "top_up_stream",
};
exports.AFFILIATION = {
    FREE: "free",
    APP: "app",
};
exports.DEFAULT_GA_PURCHASE_CURRENCY = "USD";
exports.USD_PEGGED_COINS = ["USDT", "USDC"];
exports.DATA_LAYER_VARIABLE = {
    WALLET_TYPE: "walletType",
    TOKEN_FEE: "tokenFee",
    TOKEN_SYMBOL: "tokenSymbol",
    STREAM_ADDRESS: "streamAddress",
    TOKEN_WITHDRAW_USD: "tokenWithdrawUsd",
    STREAMFLOW_FEE_USD: "streamflowFeeUsd",
    STREAMFLOW_FEE_TOKEN: "streamflowFeeToken",
    TOTAL_AMOUNT_TOKEN: "totalAmountToken",
    TOTAL_AMOUNT_USD: "totalAmountUsd",
};
exports.transferCancelOptions = [
    {
        value: "recipient",
        label: "Only Recipient",
    },
    {
        value: "sender",
        label: "Only Sender",
    },
    {
        value: "both",
        label: "Both",
    },
    {
        value: "neither",
        label: "Neither",
    },
];
