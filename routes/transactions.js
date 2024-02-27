import express from 'express'
import {getAllTransactionHistory} from '../controllers/allTransaction.js'
import {getTransactionHistory} from '../controllers/Transaction.js'

const router= express.Router()

router.get('/', getAllTransactionHistory);
router.get('/find/:id', getTransactionHistory);

export default router