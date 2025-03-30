# Fetching Spendable UTXOs

This guide provides a step-by-step approach to retrieving spendable UTXOs (Unspent Transaction Outputs) for a Bitgesell (BGL) address using the Bitaps API. This is useful for constructing transactions that can be signed and broadcasted to the BGL mainnet.

## Fetching UTXOs

Use the function below to retrieve the UTXO set for a given BGL address.

### 1. Define the Function to Fetch UTXOs

```javascript
const getAccountUTXO = async (bglAddress) => {
    const bglAPIV1Endpoint = 'https://api.bitaps.com/bgl/v1/blockchain';
    const bglAddressUTXOEndpoint = `${bglAPIV1Endpoint}/address/utxo/${bglAddress}`;

    try {
        const res = await fetch(bglAddressUTXOEndpoint);
        const utxo = await res.json();
        return { utxo: utxo.data };
    } catch (error) {
        console.error(`Failed to fetch UTXOs for ${bglAddress}:`, error);
        return null;
    }
};
```

### 2. Call the Function

Execute the function inside an `async` function to retrieve UTXOs for a given BGL address.

```javascript
const main = async () => {
    const bglAddress = 'your-bitgesell-address-here'; // Replace with an actual address
    const utxos = await getAccountUTXO(bglAddress);
    console.log(`Fetched UTXOs for ${bglAddress}:`, utxos);
};

main().catch(err => console.log(err));
```

### 3. Expected Output

Once executed, the script will return an array of UTXO objects, each containing:

- `txId`: The transaction ID where the UTXO was created.
- `index`: The index position of the UTXO in the transaction.
- `amount`: The amount of BGL available in the UTXO.
- `script`: The locking script (scriptPubKey) associated with the UTXO.
- `confirmations`: The number of confirmations the UTXO has received.

### Notes

- Ensure that the `bglAddress` you use is valid.
- UTXOs are essential for constructing transactions and determining spendable balances.
- This method enables seamless retrieval of UTXOs for any Bitgesell address using the Bitaps API.
