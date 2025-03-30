```markdown
# Bitgesell RPC Endpoint

## Overview

This module provides a stable Bitgesell RPC endpoint for interacting with the Bitgesell blockchain.

## RPC Endpoint

```js
/**
 * Stable Bitgesell RPC endpoint to interact with.
 * @type {string}
 */
const BGL_RPC_NODE = 'https://rpc.bglwallet.io';

module.exports = { BGL_RPC_NODE };
```

## Usage

You can import and use the RPC endpoint in your project as follows:

```js
const { BGL_RPC_NODE } = require('./path/to/rpc');

console.log(`Connecting to Bitgesell RPC at: ${BGL_RPC_NODE}`);
```

## License

This module is provided under the MIT License.
```