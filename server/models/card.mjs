import mongoose from 'mongoose'

const CardSchema = new mongoose.Schema({
    cardName: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bucket_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    cardDetails: {
        type: String,
    },
}, { timestamps: true })

const Card = mongoose.model("Card", CardSchema)

export { Card }