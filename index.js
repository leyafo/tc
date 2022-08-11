const { StreamClient, Cluster } = require("@streamflow/stream");

const streamClient = new StreamClient(
  "https://api.mainnet-beta.solana.com",
  Cluster.Mainnet,
  "confirmed"
);

console.log("streamClient:", streamClient);
