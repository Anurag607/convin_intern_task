import { Card } from '../models/card.mjs'

const createCard = async (req, res) => {
    try {
        const confirm = await Card.find({ cardName: req.body.cardName })
        if (confirm.length > 0) res.status(400).json({ message: 'this card exist' })
        const saveCard = new Card(req.body)
        const savedCard = await saveCard.save()
        res.status(200).json(savedCard)

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

const updateCard = async (req, res) => {
    try {
        const CardList = await Card.findById(req.params.id)
        if (CardList.userId.valueOf() === req.body.userId) {
            await Card.updateOne({ cardName: CardList.cardName }, { $set: req.body })
            res.status(200).json({ message: 'the Card is updated' })
        } else {
            res.status(403).json({ message: 'you can only update your Card' })
        }

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

const deleteCard = async (req, res) => {
    try {
        const CardList = await Card.findById(req.params.id)
        if (CardList.userId.valueOf() === req.body.userId) {
            await Card.deleteOne({ cardName: req.body.cardName });
            res.status(200).json({ message: 'the Card is deleted' })
        } else {
            res.status(403).json({ message: 'you can only delete your Card' })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).end()
    }
}

const getCardbyBucketId = async (req, res) => {
    try {
        const CardList = await Card.find({ bucketName: req.params.id })
        res.status(200).json(CardList)

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}


export { createCard, updateCard, getCardbyBucketId, deleteCard }