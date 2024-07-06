import { prisma } from "../config/prisma.config.js";
import { createError } from "../utils/error.js";
export const getUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        users.forEach(user => {
            delete user.password;
        });
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                purchaseList: {
                    include: {
                        course: true
                    }
                }
            }
        });
        delete user.password;
        const userInfo = {
            ...user,
            purchaseList: user.purchaseList.map(purchase => {
                return {
                    purchaseId: purchase.id,
                    paid: purchase.price,
                    ReferralUsed: purchase.usedReferral,
                    courseTitle: purchase.course.title,
                    courseId: purchase.course.id
                }
            })
        }
        res.status(200).json(userInfo);
    } catch (err) {
        console.log(err);
        return next(err);

    }
}


