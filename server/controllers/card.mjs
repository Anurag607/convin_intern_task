import { Card } from '../models/card.mjs'

const createCard = async (req, res) => {
    try {
        const saveCard = await new Card(req.body)
        const savedCard = await saveCard.save()
        res.status(200).json(savedCard)

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

const updateCard = async (req, res) => {
    try {
        const Card = await Bucket.findById(req.params.id)
        if (Bucket.userId === req.body.userId) {
            await Bucket.updateOne({ $set: req.body })
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
        const Card = await Card.findById(req.params.id)
        if (Card.userId === req.body.userId) {
            await Card.delete()
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
        const Card = await Card.find({ bucket_id: req.params.id })
        res.status(200).json(Card)

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}


export { createCard, updateCard, getCardbyBucketId, deleteCard }