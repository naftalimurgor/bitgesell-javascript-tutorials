#

## Transaction History

This guide provides a step-by-step approach to fetching the transaction history for a Bitgesell (BGL) address using the Bitaps API.

## Fetching Transaction History

Use the function below to retrieve transaction details for a given BGL address.

### 1. Define the Function to Fetch Transaction History

```javascript
const getAddressTxHistory = async (bglAddress) => {
    try {
        const txData = [];
        const result = await fetch(`https://api.bitaps.com/bgl/v1/blockchain/address/transactions/${bglAddress}`);
        const txInfor = await result.json();
        let count = 0;

        for (const key in txInfor.data.list) {
            const value = txInfor.data.list[key];
            count++;

            txData.push({
                id: count,
                tx_id: value.txId,
                timestamp: value.timestamp,
                amount: sb.toBitcoin(value.amount),
                confirmations: value.confirmations ? value.confirmations : 'pending',
                block_height: value.blockHeight ? value.blockHeight : 'pending',
                rbf: value.rbf,
                coinbase: value.coinbase,
                fee: sb.toBitcoin(value.fee),
            });
        }
        return { tx: txData };
    } catch (error) {
        console.log(`Failed to fetch transaction history for ${bglAddress}: ${error}`);
    }
};
```

### 2. Call the Function

The function should be executed inside an `async` function.

```javascript
const main = async () => {
    const bglAddress = "your-bitgesell-address-here"; // Replace with an actual address
    const { tx } = await getAddressTxHistory(bglAddress);
    console.log("Transaction History:", tx);
};

main().catch(err => console.log(err));
```

### 3. Expected Output

Once executed, the script will return an array of transaction objects, each containing:

- `tx_id`: Transaction ID
- `timestamp`: Time of the transaction
- `amount`: Transaction amount in BGL
- `confirmations`: Number of confirmations
- `block_height`: Block height where the transaction was confirmed
- `rbf`: Replace-by-fee flag
- `coinbase`: Coinbase transaction flag
- `fee`: Transaction fee in BGL

### Notes

- Ensure that the `bglAddress` you use is valid.
- The function handles unconfirmed transactions by marking them as `pending`.
- The `sb.toBitcoin(value.amount)` function assumes a utility to convert raw amounts to BGL.

This method allows seamless retrieval of transaction data for any Bitgesell address using the Bitaps API.
