<img src="Icon.png" style="height: 60px;"/>

Welcome to updated Bitgesell JavaScript tutorials for the web, Nodejs:

Prerequisites

- Node.js installed - `v22.0.0` is highly recommended.

- Basic knowledge of JavaScript and async functions

- An internet connection to access the Bitaps API

## Introduction

This tutorials cover the following areas:
1. ### Wallet
[Wallet](./src/wallet/wallet.md)
    - Creating a wallet - Seedphrases
    - Importing a wallet from Seedphrase (account 0 - account 9)
    - Importing a wallet from WIF privatekey
    
2. ### Transactions
[Transtactions](./src/transactions/transactions.md)
    - Transaction fees
    - Creating Transaction Objects
    - Signing a Transaction with a Private Key
    - Encoding Transaction objects into Hex format
    - Decoding Transaction objects to JSON format
    - Broadcasting signed Transactions to the Bitgesell Mainnet
    
3. ### UTXOs
[UTXOs](./src/utxos/utxos.md)
    - Fetching address UTXOs
    - Adding UTXOs to a Transaction object
    
4. ### Balances
[Balances](./src/balances/balances.md)
    - Fetching address Balances for address
    - Handling BGL units with bgl-units library/satoshi-bitcoin library
    
5. ### Explorer:
[Explorer](./src/explorer/explorer.md)
    - Fetching Transaction History for and address- using axios/fetch http library
    - Displaying Transaction list

6. ### RPC
    - RPC Nodes for Bitgesell
    - A basic example interacting with RPC


## Examples

All examples are under the `src/`, each tutorial is provided under same path name eg for Wallet, `wallet.md`

### How to run each example
To run any example, ensure the following are installed:
1. Node
2. NPM(comes bundled with any Nodejs version so extra work is needed)

Running an example is as follows:
1. `cd` tutorial directory eg:

```sh
cd src/wallet
# run the example:
node index.js
```

2. Also, tinker and play around with the functions to see the outputs to the console, i.e all outputs are print to the standard output(`console.log(output)`)
