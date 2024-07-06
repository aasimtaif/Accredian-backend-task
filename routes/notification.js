import express from 'express'
import { getNotifications, getNotification, numberOfUnseenNotifications } from '../controllers/notification.js'

const router = express.Router()

router.get('/user/:id', getNotifications)
router.get('/:id', getNotification)
router.get('/unseen/:id', numberOfUnseenNotifications)

export default router