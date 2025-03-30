const jsbgl = require('@naftalimurgor/jsbgl')

/**
 *  A wrapper ES6 class to work with-
 * **/
class BGLWallet {
    constructor(config) {
        if (!config.bglPrivateKeyOrSeed) {
            throw new Error('No PrivateKey or Seedphrase provided set. Please provide Seed or PrivateKey!');
        }
        this.privateKeyOrSeed = config.bglPrivateKeyOrSeed;
    }

    async createWallet() {
        let wallet
        try {
            await jsbgl.asyncInit(globalThis);
            if (globalThis.isMnemonicCheckSumValid(this.privateKeyOrSeed)) {
                wallet = await this._importWalletFromMnemonic()
                return wallet
            } else if (globalThis.isWifValid(this.privateKeyOrSeed)) {
                wallet = await this._importWalletFromPrivateKey()
                return wallet
            }
        } catch (error) {
            throw new Error(`${error}`)
        }
    }

    async _importWalletFromPrivateKey() {
        try {
            await jsbgl.asyncInit(globalThis);
            const wif = await this._privateKeyToWIF(this.privateKeyOrSeed);
            const privateKeyInstance = new globalThis.PrivateKey(wif);
            const wallet = new globalThis.Address(privateKeyInstance);
            return {
                address: wallet.address,
                wallet: wallet,
                privateKey: wallet.privateKey
            };
        } catch (error) {
            throw new Error(`Failed: ${error}`);
        }
    }

    async _privateKeyToWIF(privatekey) {
        try {
            await jsbgl.asyncInit(globalThis);
            const privateKey = new globalThis.PrivateKey(privatekey);
            return privateKey.wif;
        } catch (error) {
            throw new Error(`Failed: ${error}`);
        }
    }

    async _importWalletFromMnemonic(indexAddress = 0) {
        try {
            await jsbgl.asyncInit(globalThis);
            const wallet = new globalThis.Wallet({from: this.privateKeyOrSeed});
            const address = wallet.getAddress(indexAddress);
            return {
                address: address.address,
                mnemonic: this.privateKeyOrSeed,
                wallet,
                privateKey: address.privateKey
            };
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}

/**
 * Creates an HD wallet(index depth 0-9)
 * @param index
 * @returns {Promise<{mnemonic, address: *, index, privateKey: *}>}
 */
async function createHDWallet(index) {

    try {
        await jsbgl.asyncInit(globalThis)
        const entropy = globalThis.generateEntropy()
        const mnemonic = globalThis.entropyToMnemonic(entropy);
        const HDWallet = new globalThis.Wallet({from: mnemonic});

        const account = HDWallet.getAddress(index)
        return {mnemonic, address: account.address, index, privateKey: account.privateKey}
    } catch (e) {
        console.log(`Failed creatHDwallet: E`, e)
    }
}

/**
 * Import account from a mnemonic/seedphrase
 * @param seedPhrase
 * @returns {Promise<{accounts: *[], success: boolean}>}
 */
async function importWalletFromSeedPhrase(seedPhrase) {
    try {
        if (globalThis.isMnemonicCheckSumValid(seedPhrase)) {
            const hdWallet = new BGLWallet({bglPrivateKeyOrSeed: seedPhrase})

            let accounts = []
            let index = 0

            const account = await hdWallet.createWallet()

            const {address} = account

            accounts.push({
                address,
                index: index,
                privateKey: account.privateKey,
                mnemonic: seedPhrase
            })

            return {accounts: accounts, success: true}
        }
    } catch (e) {
        console.log('Failed importWalletFromSeedPhrase::', e)
    }
}

/**
 * Import an account from a Private Key(in default WIF format)
 * @param privateKeyWif
 * @returns {Promise<{accounts: *[], success: boolean}>}
 */
async function importWalletWIFPrivateKey(privateKeyWif) {
    try {
        if (globalThis.isWifValid(seedOrPkey)) {
            const hdWallet = new BGLWallet({bglPrivateKeyOrSeed: privateKeyWif})
            const wallet = await hdWallet.createWallet()
            let accounts = []

            accounts.push({
                address: wallet.address,
                index: 0,
                privateKey: privateKeyWif,
            })

            return {accounts: accounts, success: true}

        }
    } catch (e) {
        console.log('Failed importWalletWIFPrivateKey::' + e)
    }
}

module.exports = {
    BGLWallet,
    createHDWallet,
    importWalletWIFPrivateKey,
    importWalletFromSeedPhrase
}
const main = async () => {
    const seedPhrase = 'hint someone seed sleep visit retire another circle into zone nut shaft skill knife theory capital tennis plate offer radio cradle return absorb gallery'
    const privateKeyWif = 'L4zQpvgwKLjjtM7j2QQbQ5391ZaJigGgNwt4yxTYrgVLfbvXE9LS'
    // 1. HDWallet
    const hdWallet = await createHDWallet(0)
    console.log('created HDWallet ' +
        '', hdWallet)

    // 2. Import an account from a privateKey WIF format
    const walletFromPrivKey = await importWalletWIFPrivateKey(privateKeyWif)
    console.log(`Created wallet from ${walletFromPrivKey}`, walletFromPrivKey)

    // 3. Import an account from seed phrae choose the depth i.e 0-9 of account to import from the seed
    const walletFromSeed = await importWalletFromSeedPhrase(seedPhrase)
    console.log(`Created wallet from seed ${walletFromSeed}`, walletFromSeed)
}

main()
.catch(err => console.log(err))