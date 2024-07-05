import { createError } from "../utils/error.js";
import { prisma } from "../config/prisma.config.js";

export const createPurchase = async (req, res, next) => {
    const { userId, courseId, referralUser, ...otherDetails } = req.body;
    try {
        const courseExists = await prisma.course.findUnique({
            where: {
                id: courseId
            }
        });
        if (!courseExists) {
            return next(createError(404, "Course not found!"));
        }
        const purchase = await prisma.$transaction([
            prisma.purchaseItem.create({
                data: {
                    ...otherDetails,
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                    course: {
                        connect: {
                            id: courseId
                        }
                    }
                }
            }),
            prisma.user.update({
                where: {
                    id: referralUser
                },
                data: {
                    coin: referralUser
                }
            })
        ]);
        res.status(200).json(purchase);
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

export const getPurchases = async (req, res, next) => {
    try {
        const purchases = await prisma.purchase.findMany(
            {
                include: {
                    user: true,
                    course: true
                }
            }
        );
        res.status(200).json(purchases);
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

export const getPurchase = async (req, res, next) => {
    try {
        const purchase = await prisma.purchase.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                user: true,
                course: true
            }
        });
        res.status(200).json(purchase);
    } catch (err) {
        console.log(err);
        return next(err);
    }
}