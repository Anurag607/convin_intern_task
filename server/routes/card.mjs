import express from 'express';
import morgan from 'morgan';
import {
    createCard,
    updateCard,
    getCardbyBucketId,
    deleteCard
} from "../controllers/card.mjs"

const router = express.Router();
router.use(morgan('dev'));
router.use((req, res, next) => {
    console.log("Card Router Running!")
    next()
})

router.post('/createCard', createCard)
router.put('/updateCard/:id', updateCard)
router.delete('/deleteCard/:id', deleteCard)
router.get('/getCardbyBucketId/:id', getCardbyBucketId)
