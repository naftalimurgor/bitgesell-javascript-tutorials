/**
 * Fetches Unspent Transaction Outputs for an address
 * @param bglAddress
 * @returns {Promise<{utxo}|null>}
 */
const getAccountUTXO = async (bglAddress) => {
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

module.exports = {
    getAccountUTXO
}
/**
 *  An example on fetching UTXOs for an address with UTXOs
 *  Tip: switch with various addresses to see the output
 * @returns {Promise<void>}
 */
const main = async () => {
    const bglAddress = 'bgl1qh3tsz3a7l3m49xaq4xcdx8aefthchuqagmspcn'
    const utxos = await getAccountUTXO(bglAddress)
    console.log(`Fetched utxos for ${bglAddress}:}`)
    console.log(utxos)
}

main()
    .catch(err => console.log(err))
