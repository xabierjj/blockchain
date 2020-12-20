const express = require('express')
const bodyParser = require('body-parser')
const uuid = require('uuid/v1')
const BlockChain = require('./blockchain')
const app = express()

const port = process.argv[2]
const nodeAdress = uuid().split('-').join('')

const bitcoin = new BlockChain()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/blockchain', function (req, res) {
    res.send(bitcoin)
})


app.post('/transaction', function (req, res) {

    const { amount, sender, recipient } = req.body
    const block = bitcoin.createNewTransaction(amount, sender, recipient)

    res.json({ ok: true , msg:`Transaction qill be added in block ${block}`})
})


app.get('/mine', function (req, res) {

    const lastBlock = bitcoin.getLastBlock()
    const previousBlockHash = lastBlock['hash']
    const currentBlockData = {
        transaction: bitcoin.pendingTransactions,
        inndex: lastBlock['index'] +1
    }
    const nonce = bitcoin.proofOfWork(previousBlockHash,currentBlockData)

    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce)
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash)

    bitcoin.createNewTransaction(12.5, "00",nodeAdress )

    res.json({ok:true, msg:"block mined succesfully", block:newBlock})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})