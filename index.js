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
var csvWriter = require('csv-write-stream')
var writer = csvWriter()
writer.pipe(fs.createWriteStream('output.csv', { flags: 'a' }))

/**
 * add block method
 */
// blockchain.addBlock();

/**
 * get block
 */

let count = 0;
const test = '0x7d60e22577ee617d2473fde6a85e8556db297483';
async function addTransaction() {
    let newTransaction = new Transaction();

    for (i = 0; i < 100000; i++) {
        blockchain.getBlock(i).then(block => {
            if (block.transactions.length != 0) {
                block.transactions.forEach(transaction => {
                    if (transaction.to = test) {
                        let functionHash = transaction.input.slice(2, 10);
                        if (functionHash = 'fbab8a38') {
                            newTransaction.blockHash = transaction.blockHash;
                            newTransaction.blockNumber = transaction.blockNumber;
                            newTransaction.chainId = transaction.chainId;
                            newTransaction.from = transaction.from;
                            newTransaction.gas = transaction.gas;
                            newTransaction.gasPrice = transaction.gasPrice;
                            newTransaction.hash = transaction.hash;
                            newTransaction.input = transaction.input;
                            newTransaction.nonce = transaction.nonce;
                            newTransaction.publicKey = transaction.publicKey;
                            newTransaction.to = transaction.to;
                            newTransaction.transactionIndex = transaction.transactionIndex;
                            newTransaction.value = transaction.value;
                            newTransaction.timestamp = block.timestamp;

                            // write csv
                            writer.write(newTransaction)
                        }
                    }

                });

            } else {
                console.log('No Tx');
            }
        })
    }
}

addTransaction();

/**
 * write csv
 */
// fastcsv
//     .write(data, { headers: true })
//     .pipe(ws).on('finish', () => {
//         console.log('done')
//     });

/**
 * get block count
 */
// blockchain.getBlocksCount().then(console.log);

/**
 * validate block
 */
// blockchain.validateBlock(261);

/**
 * validate chain
 */
// blockchain.validateChain().then(console.log);