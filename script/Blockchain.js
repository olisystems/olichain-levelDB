const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./Block.js');
const util = require('util')
// const web3 = require('./Contracts.js');
const Web3 = require('web3');
const web3 = new Web3("ws://85.214.224.112:8547");

class Blockchain {
    constructor() {
        this.db = new LevelSandbox.LevelSandbox();
    }

    async addBlock() {
        let newBlock = new Block.Block();
        for (let i = 0; i < 641768; i++) {
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
    }

    async getBlock(height) {
        return JSON.parse(await this.db.getLevelDBData(height));
    }
}
let blockchain = new Blockchain();
//blockchain.addBlock();

blockchain.db.getBlocksCount().then(console.log);
blockchain.getBlock(11263).then(obj => {
    console.log(obj.timestamp)
});
