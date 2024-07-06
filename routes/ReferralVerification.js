import express from 'express'
import { checkReferral, createReferral } from '../controllers/Referral.js'

const router = express.Router()

router.put('/', checkReferral)
router.get("/:userId", createReferral);
export default router