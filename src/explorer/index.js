const sb = require('satoshi-bitcoin')

/**
 * Returns an array showing transaction history for an address.
 * @param bglAddress
 * @returns {Promise<{tx: *[]}>}
 */
const getAddressTxHistory = async (bglAddress) => {
    try {
        // const unconfirmedTx = await _getUnConfirmed(address)

        const txData = []
        const result = await fetch(`https://api.bitaps.com/bgl/v1/blockchain/address/transactions/${bglAddress}`)
        const txInfor = await result.json()
        let count = 0

        for (const key in txInfor.data.list) {
            const value = txInfor.data.list[key]
            count++

            txData.push({
                id: count,
                // to?
                // from?
                tx_id: value.txId,
                timestamp: value.timestamp,
                amount: sb.toBitcoin(value.amount),
                // amountUSD: await _convertToUsd(value.amount),
                confirmations: value.confirmations ? value.confirmations : 'pending',
                block_height: value.blockHeight ? value.blockHeight : 'pending',
                rbf: value.rbf,
                coinbase: value.coinbase,
                fee: sb.toBitcoin(value.fee),
            })
        }
        // txData.push(unconfirmedTx)
        return {tx: txData}
    } catch (error) {
        console.log(`Failed to fetch transaction history for ${bglAddress} ${error}`)
    }
}

module.exports = {
    getAddressTxHistory
}
const main = async () => {
    const {tx} = await getAddressTxHistory('bgl1qh3tsz3a7l3m49xaq4xcdx8aefthchuqagmspcn')
    console.log(`Fetched transaction history for ${tx}:`, tx)
}

main()
    .catch(error=>console.log(error))
