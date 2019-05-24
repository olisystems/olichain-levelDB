const Blockchain = require('./script/Blockchain.js');
const blockchain = new Blockchain.Blockchain();
const Transaction = require('./script/Transaction.js');
const timeConverter = require('./script/Contracts.js');
const Web3 = require('web3');
// const web3 = new Web3("ws://85.214.224.112:8547");
//const web3 = new Web3('https://0001.volta.rpc.eth.events');
const web3 = new Web3('http://ec2-18-194-52-184.eu-central-1.compute.amazonaws.com:8545');

// config to write csv
const fs = require('fs');
const csvWriter = require('csv-write-stream')
const writer = csvWriter()
const writableStream = fs.createWriteStream("auw_energyValues.csv", { flags: 'a' });
writableStream.on("finish", () => {
    console.log("DONE!");
});
writer.pipe(writableStream)

/**
 * add block method
 */
// blockchain.addBlock();

const address = '0x7d60e22577ee617d2473fde6a85e8556db297483';
async function addTransaction() {
    let count = 0;
    // create new transaction object
    var newTransaction = new Transaction();
    console.time('Time Taken');
    for (i = 0; i < 3022696; i++) {
        const block = await blockchain.getBlock(i);
        block.transactions.forEach(transaction => {
            var functionHash = transaction.input.slice(2, 10);
            if (functionHash === 'fbab8a38') {
                newTransaction.to = transaction.to;
                newTransaction.from = transaction.from;
                newTransaction.blockNumber = transaction.blockNumber;
                newTransaction.timestamp = timeConverter.timeConverter(block.timestamp);
                newTransaction.energyValue = web3.utils.toDecimal("0x" + transaction.input.slice(transaction.input.length - 6, transaction.input.length));
                newTransaction.blockHash = transaction.blockHash;
                newTransaction.chainId = transaction.chainId;
                newTransaction.gas = transaction.gas;
                newTransaction.gasPrice = transaction.gasPrice;
                newTransaction.hash = transaction.hash;
                newTransaction.input = transaction.input;
                newTransaction.nonce = transaction.nonce;
                newTransaction.publicKey = transaction.publicKey;
                newTransaction.transactionIndex = transaction.transactionIndex;
                newTransaction.value = transaction.value;
                // write csv
                count++;
                writer.write(newTransaction);
            }
        });
    }
    await writer.end();
    await console.log('Total Records Written: ' + count);
    console.timeEnd('Time Taken');
}

addTransaction();

/**
 * get block count
 */
// blockchain.getBlocksCount().then(console.log);

/**
 * get block
 */

// blockchain.getBlock(255247).then(block => {
//     block.transactions.forEach(tx => {
//         console.log(tx.input)
//     });
// });

/**
 * validate block
 */
// blockchain.validateBlock(261);

/**
 * validate chain
 */
// blockchain.validateChain().then(console.log);