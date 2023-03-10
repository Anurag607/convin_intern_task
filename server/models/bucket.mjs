import mongoose from 'mongoose'

const BucketSchema = new mongoose.Schema({
    bucketName: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bucketDetails: {
        type: String,
    }
}, { timestamps: true })

const Bucket = mongoose.model("Bucket", BucketSchema)

export { Bucket }