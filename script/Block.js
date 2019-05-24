class Block {
    constructor() {
        this.author = '';
        this.difficulty = '';
        this.extraData = '';
        this.gasLimit = '';
        this.gasUsed = '';
        this.hash = '';
        this.logsBloom = '';
        this.miner = '';
        this.number = '';
        this.parentHash = '';
        this.receiptsRoot = '';
        this.sealFields = [];
        this.sha3Uncles = '';
        this.signature = '';
        this.size = '';
        this.stateRoot = '';
        this.step = '';
        this.timestamp = '';
        this.totalDifficulty = '';
        this.transactions = []
    }
}

module.exports.Block = Block;