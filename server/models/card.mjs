import mongoose from 'mongoose'

const CardSchema = new mongoose.Schema({
    cardName: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bucketName: {
        type: String,
        required: true
    },
    cardUrl: {
        type: String,
        required: true
    },
    cardDetails: {
        type: String,
    },
}, { timestamps: true })

const Card = mongoose.model("Card", CardSchema)

export { Card }