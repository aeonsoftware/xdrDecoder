var StellarBase = require('stellar-base');
StellarBase.Network.useTestNetwork();
var rp = require('request-promise');

//DISTRIBUTING ACCOUNT
var pubKey1 = "GAXZBCFL4RXPJJVU73TGKC5U5S6DFWI2SRZ6QIXYDRA64FJMOHE7OGGN"
//ISSUING ACCOUNT
var pubKey2 = "GCU5RXP4QR2CD562DYKZARNQGVCUMMMD6DPC2RGDTZELQOYVYA3RX2WA"

rp('https://horizon-testnet.stellar.org/accounts/'+pubKey1).then(function ( response) {
  result = JSON.parse(response)
 var account=new StellarBase.Account(pubKey1,result.sequence);
  var sourceSecretKey = 'SDZRPU7VDI6AHGA4VNS65SQ3XCVOCHIULU66RMJR4L4TWDBSTZKH3PVY';
  
  // Derive Keypair object and public key (that starts with a G) from the secret
  var sourceKeypair = StellarBase.Keypair.fromSecret(sourceSecretKey);
  var sourcePublicKey = sourceKeypair.publicKey();
  
 
  
  
  var transaction = new StellarBase.TransactionBuilder(account)
          // add a set options operation to the transaction
          .addOperation(StellarBase.Operation.changeTrust({
            asset : new StellarBase.Asset("BRIAN","GCU5RXP4QR2CD562DYKZARNQGVCUMMMD6DPC2RGDTZELQOYVYA3RX2WA")
        }))
                // add a payment operation to the transaction
                .addOperation(StellarBase.Operation.payment({
                  destination: "GAXZBCFL4RXPJJVU73TGKC5U5S6DFWI2SRZ6QIXYDRA64FJMOHE7OGGN",
                  asset: new StellarBase.Asset("BRIAN","GCU5RXP4QR2CD562DYKZARNQGVCUMMMD6DPC2RGDTZELQOYVYA3RX2WA"),
                  amount: "100.50"  // 100.50 XLM
              }))
          .build();
  transaction.sign(sourceKeypair);
  console.log(transaction.toEnvelope().toXDR('base64'));
  
  
  toString(result.sequence + 1)

})



rp('https://horizon-testnet.stellar.org/accounts/'+pubKey2).then(function ( response) {
  result = JSON.parse(response)
    // ISSUING ACCOUNT
    var account2=new StellarBase.Account("GCU5RXP4QR2CD562DYKZARNQGVCUMMMD6DPC2RGDTZELQOYVYA3RX2WA",result.sequence);
    // The source account is the account we will be signing and sending from.
    var sourceSecretKey2 = 'SAJCVYY4A5T3ZFSGCOTRLCXHE7J4YKRJ5WRP3BYWPGB433FE7MIU26XO';
    var sourceKeypair2 = StellarBase.Keypair.fromSecret(sourceSecretKey2);
    var sourcePublicKey2 = sourceKeypair2.publicKey();
  
var transaction2 = new StellarBase.TransactionBuilder(account2)
// add a set options operation to the transaction
      // add a payment operation to the transaction
      .addOperation(StellarBase.Operation.payment({
        destination: "GAXZBCFL4RXPJJVU73TGKC5U5S6DFWI2SRZ6QIXYDRA64FJMOHE7OGGN",
        asset: new StellarBase.Asset("BRIAN","GCU5RXP4QR2CD562DYKZARNQGVCUMMMD6DPC2RGDTZELQOYVYA3RX2WA"),
        amount: "100.50"  // 100.50 XLM
    }))
.build();
transaction2.sign(sourceKeypair2);
console.log(transaction2.toEnvelope().toXDR('base64'));
})

