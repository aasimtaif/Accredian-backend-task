import express from 'express'
import { checkReferral } from '../controllers/ReferralVerification.js'

const router = express.Router()

router.post('/', checkReferral)

export default router