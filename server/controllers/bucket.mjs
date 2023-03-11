import { Bucket } from '../models/bucket.mjs'
import { Card } from '../models/card.mjs'
import mongodb from "mongodb"

const createBucket = async (req, res) => {
    try {
        const confirm = await Bucket.find({ bucketName: req.body.bucketName })
        if (confirm.length > 0) res.status(400).json({ message: 'this bucket exist' })
        const saveBucket = new Bucket(req.body)
        const savedBucket = await saveBucket.save()
        res.status(200).json(savedBucket)

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

const deleteBucketCards = async (bucketName) => {
    try {
        await Card.deleteMany({ bucketName: bucketName })
    } catch (err) {
        console.log(err.message)
    }
}

const deleteBucket = async (req, res) => {
    try {
        const BucketList = await Bucket.findById(req.params.id)
        if (BucketList.userId.valueOf() === req.body.userId) {
            await deleteBucketCards(req.body.bucketName)
            await Bucket.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
            res.status(200).json({ message: 'the Bucket is deleted' })
        } else {
            res.status(403).json({ message: 'you can only delete your Bucket' })
        }

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

const updateBucketCards = async (bucketId, bucketName) => {
    try {
        const BucketList = await Bucket.findById(bucketId)
        await Card.updateMany({ bucketName: BucketList.bucketName }, { $set: { bucketName: bucketName } })
    } catch (error) {
        console.error(error.message)
    }
}

const updateBucket = async (req, res) => {
    try {
        const BucketList = await Bucket.findById(req.params.id)
        if (BucketList.userId.valueOf() === req.body.userId) {
            await updateBucketCards(req.params.id, req.body.bucketName)
            await Bucket.updateOne({ _id: new mongodb.ObjectId(req.params.id) }, { $set: req.body })
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
        const BucketList = await Bucket.find()
        res.status(200).json(BucketList)

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

const getOneBucket = async (req, res) => {
    try {
        const BucketList = await Bucket.findById(req.params.id)
        res.status(200).json(BucketList)

    } catch (error) {
        console.error(error.message)
        res.status(500).end()
    }
}

const getAllBucketbyUserId = async (req, res) => {
    try {
        const BucketList = await Bucket.find({ userId: req.params.id })

        res.status(200).json(BucketList)

    } catch (error) {
        console.error(error.message)
        res.status(500).json([])
    }
}

export { createBucket, updateBucket, deleteBucket, getAllBuckets, getOneBucket, getAllBucketbyUserId }