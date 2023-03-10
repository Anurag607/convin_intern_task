import express from "express";
import morgan from "morgan";
import {
    createBucket,
    updateBucket,
    deleteBucket,
    getAllBuckets,
    getOneBucket,
    getAllBucketbyUserId
} from "../controllers/bucket.mjs"

const router = express.Router();
router.use(morgan('dev'));
router.use((req, res, next) => {
    console.log("Bucket Router Running!")
    next()
})

router.post('/createBucket', createBucket)
router.put('/updateBucket/:id', updateBucket)
router.delete('/deleteBucket/:id', deleteBucket)
router.get('/getAll', getAllBuckets)
router.get('/getBucket/:id', getOneBucket)
router.get('/getUsersBuckets/:id', getAllBucketbyUserId)

export default router