let blockchain = new Blockchain();
//web3.eth.getBlockNumber().then(console.log);

// blockchain.getBlock(391175).then(console.log);


blockchain.addBlock();

// let totalBlocks = 0;
// blockchain.db.getBlocksCount().then(count => {
//     totalBlocks = count;
//     console.log('Total blocks are: ' + totalBlocks);
// });


// for (var i = 0; i < 11; i++) {
//     blockchain.getBlock(i).then(obj => {
//         console.log(timeConverter.timeConverter(obj.timestamp));
//     })
// }

//blockchain.db.getBlocksCount().then(console.log);

function test() {
    let fullBlocks = 0;
    let emptyBlocks = 0;
    for (var i = 0; i < 292746; i++) {
        blockchain.getBlock(i).then(obj => {

            if (obj.transactions.length != 0) {
                fullBlocks++;
                console.log('Full blocks are: ' + fullBlocks);
                // obj.transactions.forEach(tx => {
                //     console.log(timeConverter.timeConverter(obj.timestamp), tx.from)
                // });
                console.log(obj.transactions)
            } else {
                emptyBlocks++;
                //console.log('Empty blocks are: ' + emptyBlocks);
            }
        });

    }
}
//test();


