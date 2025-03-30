const sb = require('satoshi-bitcoin')
/**
 * Shows how to construct, encode (hex format) and sign a transaction
 * @param from BGL sender address
 * @param to BGL recepient address
 * @param fee amount to cover transaction cost: in satoshi units
 * @param privateKey sender address private key to sign the transaction
 * @param amount amount to send(should be converted to Satoshi units beforehand)
 * @returns {Promise<{txObject, balance: number, success: boolean, error: null}>}
 */
const buildTransactionObject = async ({from, to, fee, privateKey, amount}) => {


    await jsbgl.asyncInit(globalThis)
    const txObject = new globalThis.Transaction()

    const utxosData = await _fetchAddressUTxos(from)

    const {utxo: utxos} = utxosData

    const {balance} = await _getBglAddressBalance(from)

    // should already be in Satoshi
    const newBalance = (balance - amount - fee)

    if (utxos.length) {
        for (const key in utxos) {
            const utxo = utxos[key]
            txObject.addInput({
                txId: utxo.txId, vOut: utxo.vOut, address: from,
            })
        }

        txObject.addOutput({
            value: amount, address: to
        })

        if (newBalance > 0) {
            txObject.addOutput({
                value: newBalance, address: from
            })
        }

        let utxoCount = 0
        for (const key in utxos) {
            const utxo = utxos[key]
            txObject.signInput(utxoCount, {
                privateKey: privateKey, value: utxo.amount
            })
            utxoCount++
        }

        // serialize() converts transactions object to hex format
        const newTx = txObject.serialize()
        return {txObject: newTx, balance: newBalance, success: true, error: null}
    } else {
        throw new Error(`${from} address has no spendable utxos.`)
    }
}

async function _getBglAddressBalance(bglAddress) {
    const bglAPIV1Endpoint = 'https://api.bitaps.com/bgl/v1/blockchain'
    try {
        const response = await fetch(`${bglAPIV1Endpoint}/address/state/${bglAddress}`)
        const result = await response.json()
        // @ts-ignore
        return result.data
    } catch (error) {
        console.error(error)
    }
}

async function _fetchAddressUTxos(bglAddress) {
    const bglAPIV1Endpoint = 'https://api.bitaps.com/bgl/v1/blockchain'
    const bglAddressUTXOEndpoint = `${bglAPIV1Endpoint}/address/utxo/${bglAddress}`

    try {
        const res = await fetch(bglAddressUTXOEndpoint)
        const utxo = await res.json()
        return {utxo: utxo.data}
    } catch (error) {
        console.error(error)
        return null
    }
}

async function broadcastbglTransaction(txObject) {
    const BGL_RPC_NODE = 'https://rpc.bglwallet.io'
    const url = new URL(BGL_RPC_NODE)

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: `{"jsonrpc":"1.0","id":"curltext","method":"sendrawtransaction","params":["${txObject}"]}`,
    }

    const res = await fetch(url.origin, {
        body: payload.body,
        headers: payload.headers,
        method: 'POST'
    })
    return await res.json()
}

module.exports = {
    buildTransactionObject,
    broadcastbglTransaction
}
const main = async () => {
    //1. construct a transactions Object
    // Private key signs the inputs and outputs authorizing the spending of the UtXOs
    // the new transactions object computes new balance(before broadcasting) and creates new inputs and outputs based on fee and transaction amount
    // once broadcast and confirmed the sender address has a new updated utxos

    const FEE = sb.toSatoshi(0.0001) //  a minimum proposed fee of 10,000 Satoshis

    // Fill out fields appropriately:
    const fromAddress = ''
    const recepientAddress = ''
    const fee = FEE
    const privateKey = ''
    const amount = '' // should be in Satoshi units

    const txObject = await buildTransactionObject({from: fromAddress, to: recepientAddress, amount, fee})

    console.log('Tx Object::', txObject)

    // 2. broadcast the transaction object to the BGL mainnet for validation and inclusion in the next block
    const txReceipt = await broadcastbglTransaction(txObject)
    console.log('Transaction Broadcast result::', txReceipt)
}

main()
    .catch(err => console.log(err))