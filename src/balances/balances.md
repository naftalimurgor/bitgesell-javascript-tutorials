# Fetching Bitgesell (BGL) Balances

This guide provides a step-by-step approach to retrieving the balance of a Bitgesell (BGL) address using the Bitaps API.

## 1. Define the Function to Fetch Balance

Use the function below to get the balance details of a given BGL address.

```javascript
const getAddressBalance = async (bglAddress) => {
    try {
        const result = await fetch(`https://api.bitaps.com/bgl/v1/blockchain/address/state/${bglAddress}`);
        const balanceInfo = await result.json();

        return {
            balance: sb.toBitcoin(balanceInfo.data.balance), // Convert to BGL format
            received: sb.toBitcoin(balanceInfo.data.received),
            sent: sb.toBitcoin(balanceInfo.data.sent),
            unconfirmed_balance: sb.toBitcoin(balanceInfo.data.unconfirmedBalance),
            transactions: balanceInfo.data.txCount,
        };
    } catch (error) {
        console.log(`Failed to fetch balance for ${bglAddress}: ${error}`);
    }
};
```

## 2. Call the Function

Execute the function inside an `async` function to retrieve and log the balance details.

```javascript
const main = async () => {
    const bglAddress = "your-bitgesell-address-here"; // Replace with an actual address
    const balance = await getAddressBalance(bglAddress);
    console.log("Balance Info:", balance);
};

main().catch(err => console.log(err));
```

## 3. Expected Output

Once executed, the script will return an object containing:

- `balance`: Current balance in BGL



## Notes

- Ensure that the `bglAddress` used is valid.
- The `sb.toBitcoin(value)` function assumes a utility to convert raw amounts to BGL.
- Unconfirmed transactions are accounted for separately.

This method allows you to retrieve real-time balance information for any Bitgesell address using the Bitaps API.
