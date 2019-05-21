const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./Block.js');
const timeConverter = require('./Contracts.js');
// setting up web3 instance
const Web3 = require('web3');
// const web3 = new Web3("ws://85.214.224.112:8547");
//const web3 = new Web3('https://0001.volta.rpc.eth.events');
const web3 = new Web3('http://ec2-18-194-52-184.eu-central-1.compute.amazonaws.com:8545');

// get current time
function getTime() {
    console.log(timeConverter.timeConverter(new Date().getTime().toString().slice(0, -3)));
}

// blockchain class
class Blockchain {
    constructor() {
        this.db = new LevelSandbox.LevelSandbox();
    }

    // get total blocks in the levelDB
    async getBlocksCount() {
        return await this.db.getBlocksCount();
    }

    // get block by block number
    async getBlock(number) {
        return JSON.parse(await this.db.getLevelDBData(number));
    }

    async addBlock() {
        let newBlock = new Block.Block();
        // get latest block
        let latestBlock = await web3.eth.getBlockNumber();
        // get block count
        let lastSavedBlock = await this.getBlocksCount();
        console.log('Start Block: ' + lastSavedBlock + '\n' + 'End Block: ' + latestBlock);
        console.time('Time Taken');
        //getTime();
        for (let i = lastSavedBlock; i < latestBlock; i++) {
            const block = await web3.eth.getBlock(i, true);
            newBlock.author = block.author;
            newBlock.difficulty = block.difficulty;
            newBlock.extraData = block.extraData;
            newBlock.gasLimit = block.gasLimit;
            newBlock.gasUsed = block.gasUsed;
            newBlock.hash = block.hash;
            newBlock.logsBloom = block.logsBloom;
            newBlock.miner = block.miner;
            newBlock.number = block.number;
            newBlock.parentHash = block.parentHash;
            newBlock.receiptsRoot = block.receiptsRoot;
            newBlock.sealFields = block.sealFields;
            newBlock.sha3Uncles = block.sha3Uncles;
            newBlock.signature = block.signature;
            newBlock.size = block.size;
            newBlock.stateRoot = block.stateRoot;
            newBlock.step = block.step;
            newBlock.timestamp = block.timestamp;
            newBlock.totalDifficulty = block.totalDifficulty;
            newBlock.transactions = block.transactions;
            await this.db.addLevelDBData(newBlock.number, JSON.stringify(newBlock));
        }
        console.timeEnd('Time Taken');
    }

    // validate block by block number
    async validateBlock(number) {
        // get block
        let block = await this.getBlock(number);
        // get parent block
        let nextBlock = await this.getBlock(number + 1);
        return new Promise((resolve, reject) => {
            // get block hash
            let blockHash = block.hash;
            // get parent block hash
            let parentBlockHash = nextBlock.parentHash;
            // compare hashes
            if (blockHash === parentBlockHash) {
                console.log('Block No. ' + number + ' is valid');
                resolve(true);
            } else {
                console.log('Block No. ' + number + ' invalid hash:\n' + blockHash + '-' + parentBlockHash);
                resolve(false);
            }
        })
    }

    // Validate Blockchain
    async validateChain() {
        let errorLog = [];
        const blocksCount = await this.getBlocksCount() - 1;
        for (var i = 0; i < blocksCount; i++) {
            // check block validation
            if (!await this.validateBlock(i)) {
                errorLog.push(i);
            }
        }
        return new Promise((resolve, reject) => {
            if (errorLog.length > 0) {
                console.log('Total errors = ' + errorLog.length);
                console.log('Blocks: ' + errorLog);
                resolve(false);
            } else {
                console.log('No error found, the chain is valid!');
                resolve(true);
            }
        })
    }

}
module.exports.Blockchain = Blockchain;