import { prisma } from '../config/prisma.config.js'
import { createError } from '../utils/error.js'

export const getNotifications = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        await prisma.notification.updateMany({
            where: {
                userId
            },
            data: {
                seen: true
            },
        });

        const updatedNotifications = await prisma.notification.findMany({
            where: {
                userId,
            }
        });

        res.status(200).json(updatedNotifications);
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

export const getNotification = async (req, res, next) => {
    try {
        const notification = await prisma.notification.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                seen: true,
                opened: true
            },
            include: {
                user: true
            }
        });
        const updatedNotification = await prisma.notification.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(200).json(updatedNotification);
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

export const numberOfUnseenNotifications = async (req, res, next) => {
    try {
        const notifications = await prisma.notification.count({
            where: {
                userId: parseInt(req.params.id),
                seen: false
            }
        });
        res.status(200).json(notifications);
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

// export const updateSeen = async (req, res, next) => {
//     const { id } = req.body;
//     try {
//         const notification = await prisma.notification.update({
//             where: {
//                 id
//             },
//             data: {
//                 seen: true
//             }
//         });
//         res.status(200).json(notification);
//     } catch (err) {
//         console.log(err);
//         return next(err);
//     }
// }

// export const updateOpened = async (req, res, next) => {
//     const { id } = req.body;
//     try {
//         const notification = await prisma.notification.update({
//             where: {
//                 id
//             },
//             data: {
//                 opened: true
//             }
//         });
//         res.status(200).json(notification);
//     } catch (err) {
//         console.log(err);
//         return next(err);
//     }
// }