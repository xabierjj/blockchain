const sha256 = require('sha256')

module.exports = class Blockchain {

    constructor() {
        this.chain = []

        //todas las nuevas transacciones que todavia no se han asignado a un nuevo bloque. Se asingnaran cuanod un nuevo bloque se mine
        this.pendingTransactions = []

        this.createNewBlock(100, '0','0')
    }


    createNewBlock(nonce, previousBlockHash, hash) {

        //hash: El hash de todas las new transactions
        //nonce: Numero de proof of work
        //previousBlockHash: El has del bloque anterior

        const newBlock = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.pendingTransactions,
            nonce: nonce,
            hash: hash,
            previousBlockHash: previousBlockHash
        }

        this.pendingTransactions = []
        this.chain.push(newBlock)

        return newBlock
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1]
    }

    createNewTransaction(amount, sender, recipient) {
        const newTransaction = {
            amount: amount,
            sender: sender,
            recipient: recipient
        }

        this.pendingTransactions.push(newTransaction)

        return this.getLastBlock()['index'] + 1
    }

    hashBlock(previousBlockHash, currentBlockData, nonce) {

        const stringData = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData)

        const hash = sha256(stringData)

        return hash

    }

    proofOfWork(previousBlockHash, currentBlockData) {
        let nonce = 0;

        let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)

        while (hash.substring(0, 4) !== '0000') {
            nonce++
            hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
           
        }

        return nonce

    }
}


