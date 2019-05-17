const level = require('level');
const chainDB = './private-chain';

class LevelSandbox {
    constructor() {
        this.db = level(chainDB);
    }
    // add data to levelDB
    addLevelDBData(key, value) {
        return new Promise((resolve, reject) => {
            this.db.put(key, value, error => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log('Block ' + key + ' is saved');
                    resolve();
                }
            })
        })
    }
    // get data from levelDB
    getLevelDBData(key) {
        return new Promise((resolve, reject) => {
            this.db.get(key, (error, value) => {
                if (error) {
                    console.log('Block ' + key + ' failed to retrieve', error);
                    reject(error);
                } else {
                    resolve(value);
                }
            })
        })
    }

    // get data count
    getBlocksCount() {
        return new Promise((resolve, reject) => {
            let count = 0;
            this.db.createReadStream().on('data', data => {
                count++;
            }).on('error', error => {
                console.log(error);
                reject(error);
            }).on('close', () => {
                resolve(count);
            })
        })
    }
}

module.exports.LevelSandbox = LevelSandbox;