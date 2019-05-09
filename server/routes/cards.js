const express = require('express')
const db = require('../db/cards')
const router = express.Router()

router.get('/', (req, res) => {
  db.getCards()
    .then(cards => {
      res.send(cards)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('cards/:id', (req, res) => {
  const id = req.params.id
  db.getCard(id)
    .then(card => res.send(card))
    .catch(err => res.status(500).send(err.message))
})
router.put('cards/:id', (req, res) => {
  const id = req.params.id
  const submission = {
    userId: id,
    date_modified: new Date(),
    evidence: req.body.evidence
  }
  db.submitCards(submission)
    .then(() => res.json({ notice: 'evidence has been updated! ' }))
    .catch(err => res.status(500).send(err.message))
})

module.exports = router