import { Bucket } from '../models/Buckets.mjs'

const createBucket = async (req, res) => {
    try {
        const saveBucket = await new Bucket(req.body)
        const savedBucket = await saveBucket.save()
        res.status(200).json(savedBucket)

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

const deleteBucket = async (req, res) => {
    try {
        const Bucket = await Bucket.findById(req.params.id)
        if (Bucket.userId === req.body.userId) {
            await Bucket.delete()
            res.status(200).json({ message: 'the Bucket is deleted' })
        } else {
            res.status(403).json({ message: 'you can only delete your Bucket' })
        }

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

const updateBucket = async (req, res) => {
    try {
        const Bucket = await Bucket.findById(req.params.id)
        if (Bucket.userId === req.body.userId) {
            await Bucket.updateOne({ $set: req.body })
            res.status(200).json({ message: 'the Bucket is updated' })
        } else {
            res.status(403).json({ message: 'you can only update your Bucket' })
        }

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

const getAllBuckets = async (req, res) => {
    try {
        const Buckets = await Bucket.find()
        res.status(200).json(Buckets)

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

const getOneBucket = async (req, res) => {
    try {
        const Bucket = await Bucket.findById(req.params.id)
        res.status(200).json(Bucket)

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

const getAllBucketbyUserId = async (req, res) => {
    try {
        const Bucket = await Bucket.find({ user_id: req.params.id })
        res.status(200).json(Bucket)

    } catch (error) {
        console.error(error.message)
        res.status(500).json([])
    }
}

export { createBucket, updateBucket, deleteBucket, getAllBuckets, getOneBucket, getAllBucketbyUserId }