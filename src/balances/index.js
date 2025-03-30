const sb = require('satoshi-bitcoin')
// get account balance for and address

/**
 *  Returns balance object
 *  Tip: see preceding usage example how to convert bgl to satoshi units.
 * @param bglAddress
 * @returns {Promise<*>}
 */
const getAccountBalance = async (bglAddress) => {
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

module.exports = {
    getAccountBalance
}
const main = async () => {
    const bglAddress = 'bgl1qh3tsz3a7l3m49xaq4xcdx8aefthchuqagmspcn'
    const accountBalanceSats = await getAccountBalance(bglAddress)
    console.log(`Fetch balance for ${bglAddress}, balance: ${accountBalanceSats.balance}`)
    // convert balance to BGL
    const balanceBGL = sb.toBitcoin(accountBalanceSats.balance)
    console.log(`Fetch balance for ${bglAddress}, balance in BGL: ${balanceBGL}`)
}

main()
.catch(err => console.log(err))