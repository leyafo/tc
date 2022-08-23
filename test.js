const solanaWeb3 = require('@solana/web3.js');
let keypair;
programId=new solanaWeb3.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
const establishConnection = async () =>{
   rpcUrl="https://api.devnet.solana.com";
   connection = new solanaWeb3.Connection(rpcUrl, 'confirmed');   
   console.log('Connection to cluster established:', rpcUrl);
}
const connectWallet = async () => {
   let secretKey = Uint8Array.from([192,211,41,49,181,13,39,208,7,47,58,36,239,174,198,69,151,158,219,8,249,131,102,223,199,77,12,211,251,74,180,195,239,26,123,16,73,49,214,38,83,28,199,9,201,32,49,89,101,10,166,184,1,132,79,22,138,51,73,206,214,40,61,118]
 );
   keypair = solanaWeb3.Keypair.fromSecretKey(secretKey);
   console.log('keypair created', keypair.publicKey.toBase58());
}
const createPDAAccount = async () => {
   splaccount = solanaWeb3.Keypair.generate();
   const transaction = new solanaWeb3.Transaction();
   const instruction = solanaWeb3.SystemProgram.createAccount({
      fromPubkey: keypair.publicKey,
      newAccountPubkey: splaccount.publicKey,
      space: 165,
      lamports: 1000,
      programId,
   });
   transaction.add(instruction);
   var signature = await solanaWeb3.sendAndConfirmTransaction(
      connection, 
      transaction, 
      [keypair, splaccount]);
   console.log(signature);
}
const balance = async () => {
   let balance = await connection.getBalance(keypair.publicKey);
   console.log (keypair.publicKey.toString());
   console.log(`balance: ${balance}`);
}
establishConnection();
connectWallet();
balance();
createPDAAccount();
const txAirdrop = connection.requestAirdrop(keypair.publicKey, 100000);
console.log(txAirdrop);