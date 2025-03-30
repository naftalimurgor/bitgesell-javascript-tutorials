<img src="Icon.png" style="height: 60px;" />

# Welcome to updated Bitgesell JavaScript tutorials for the web, Node.js

## Prerequisites

- Node.js installed - `v22.0.0` is highly recommended.
- Basic knowledge of JavaScript and async functions.
- An internet connection to access the Bitaps API.

## Introduction

This tutorial covers the following areas:

### 1. Wallet  
[Wallet](./src/wallet/wallet.md)  

- Creating a wallet - Seedphrases  
- Importing a wallet from Seedphrase (account 0 - account 9)  
- Importing a wallet from WIF private key  

### 2. Transactions  
[Transactions](./src/transactions/transactions.md)  

- Transaction fees  
- Creating Transaction Objects  
- Signing a Transaction with a Private Key  
- Encoding Transaction objects into Hex format  
- Decoding Transaction objects to JSON format  
- Broadcasting signed Transactions to the Bitgesell Mainnet  

### 3. UTXOs  
[UTXOs](./src/utxos/utxos.md)  

- Fetching address UTXOs  
- Adding UTXOs to a Transaction object  

### 4. Balances  
[Balances](./src/balances/balances.md)  

- Fetching address Balances for an address  
- Handling BGL units with `bgl-units` library / `satoshi-bitcoin` library  

### 5. Explorer  
[Explorer](./src/explorer/explorer.md)  

- Fetching Transaction History for an address using `axios` / `fetch` HTTP library  
- Displaying Transaction list  

### 6. RPC  

- RPC Nodes for Bitgesell  

## Examples  

All examples are under the `src/` directory. Each tutorial is provided under the same path name. For example, for Wallet: `wallet.md`.  

### How to run each example  

To run any example, ensure the following are installed:  
1. Node.js  
2. NPM (bundled with Node.js, so no extra installation is needed)  

#### Running an example  

```sh
cd src/wallet
# Run the example:
node index.js
```

You can also tinker with and play around with the functions to see their outputs in the console.  
All outputs are printed to the standard output using:

```js
console.log(output);
```