const BlockChain = require('./blockchain')

const bitcoin = new BlockChain()





const previousBlockHash = 'D232DF32F423'

const blockData = [{
    amount: 100,
    sender: 'ALEX01911',
    recipient: 'BEN99202'
},

{
    amount: 21,
    sender: 'ALEX01911',
    recipient: 'BEN99202'
},
{
    amount: 11,
    sender: 'ALEX01911',
    recipient: 'BEN99202'
}
]

//console.log(bitcoin.proofOfWork(previousBlockHash,blockData))

console.log( bitcoin.hashBlock(previousBlockHash,blockData,73946))

