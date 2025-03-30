# Wallet - Accounts, Mnemonic, Private Keys

This tutorial will guide you through creating a Bitgesell (BGL) wallet using the `jsbgl` library in JavaScript. We will cover creating an HD wallet, importing a wallet from a seed phrase, and importing a wallet using a WIF private key.

## Prerequisites

Ensure you have Node.js installed on your system. You also need to install the `jsbgl` package:

```sh
npm install @naftalimurgor/jsbgl
```

Then, import the library in your script:

```javascript
const jsbgl = require('@naftalimurgor/jsbgl');
```

## 1. Creating an HD Wallet

An HD (Hierarchical Deterministic) wallet allows generating multiple addresses from a single mnemonic phrase.

```javascript
async function createHDWallet(index) {
    try {
        await jsbgl.asyncInit(globalThis);
        const entropy = globalThis.generateEntropy();
        const mnemonic = globalThis.entropyToMnemonic(entropy);
        const HDWallet = new globalThis.Wallet({ from: mnemonic });
        
        const account = HDWallet.getAddress(index);
        return { mnemonic, address: account.address, index, privateKey: account.privateKey };
    } catch (e) {
        console.log(`Failed to create HD wallet:`, e);
    }
}
```

### Usage:

```javascript
const hdWallet = await createHDWallet(0);
console.log('Created HD Wallet:', hdWallet);
```

## 2. Importing a Wallet from a Seed Phrase

If you already have a mnemonic seed phrase, you can restore your wallet and derive addresses from it.

```javascript
async function importWalletFromSeedPhrase(seedPhrase) {
    try {
        if (globalThis.isMnemonicCheckSumValid(seedPhrase)) {
            const hdWallet = new BGLWallet({ bglPrivateKeyOrSeed: seedPhrase });
            const account = await hdWallet.createWallet();
            
            return {
                accounts: [{
                    address: account.address,
                    index: 0,
                    privateKey: account.privateKey,
                    mnemonic: seedPhrase
                }],
                success: true
            };
        }
    } catch (e) {
        console.log('Failed to import wallet from seed phrase:', e);
    }
}
```

### Usage:

```javascript
const seedPhrase = 'hint someone sed sleep visit retire another circle into zone nut shaft skill knife theory capital tennis plate offer radio cradle return absorb gallery';
const walletFromSeed = await importWalletFromSeedPhrase(seedPhrase);
console.log('Imported wallet from seed:', walletFromSeed);
```

## 3. Importing a Wallet Using a WIF Private Key

If you have a private key in Wallet Import Format (WIF), you can use it to restore access to your wallet.

```javascript
async function importWalletWIFPrivateKey(privateKeyWif) {
    try {
        if (globalThis.isWifValid(privateKeyWif)) {
            const hdWallet = new BGLWallet({ bglPrivateKeyOrSeed: privateKeyWif });
            const wallet = await hdWallet.createWallet();
            
            return {
                accounts: [{
                    address: wallet.address,
                    index: 0,
                    privateKey: privateKeyWif,
                }],
                success: true
            };
        }
    } catch (e) {
        console.log('Failed to import wallet using WIF private key:', e);
    }
}
```

### Usage:

```javascript
const privateKeyWif = 'L4zQpvgwKLjjtM7j2QQbQ5391ZaJigGgNwt4yxTYrgVLfbvXE9LS';
const walletFromPrivKey = await importWalletWIFPrivateKey(privateKeyWif);
console.log('Imported wallet from private key:', walletFromPrivKey);
```

## Running the Script

You can put everything together and execute your script using Node.js:

```javascript
const main = async () => {
    const seedPhrase = 'hint someone seed sleep visit retire another circle into zone nut shaft skill knife theory capital tennis plate offer radio cradle return absorb gallery';
    const privateKeyWif = 'L4zQpvgwKLjjtM7j2QQbQ5391ZaJigGgNwt4yxTYrgVLfbvXE9LS';
    
    const hdWallet = await createHDWallet(0);
    console.log('Created HD Wallet:', hdWallet);
    
    const walletFromPrivKey = await importWalletWIFPrivateKey(privateKeyWif);
    console.log('Imported wallet from private key:', walletFromPrivKey);
    
    const walletFromSeed = await importWalletFromSeedPhrase(seedPhrase);
    console.log('Imported wallet from seed:', walletFromSeed);
};

main().catch(err => console.log(err));
```

### Run the script:

```sh
node index.js
```

## Conclusion

This tutorial covered:

- Creating an HD Wallet
- Importing a wallet from a seed phrase
- Importing a wallet using a WIF private key

Using these methods, you can manage Bitgesell wallets programmatically using JavaScript and the `jsbgl` library.
