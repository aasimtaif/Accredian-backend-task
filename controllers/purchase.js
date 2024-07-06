import { createError } from "../utils/error.js";
import { prisma } from "../config/prisma.config.js";

export const createPurchase = async (req, res, next) => {
    const { userId, courseId, usedReferral, coinsUsed, price } = req.body;
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
                    usedReferral: usedReferral.toString(),
                    price: parseInt(coinsUsed) - parseInt(price),
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
                    id: userId
                },
                data: {
                    coins: {
                        decrement: coinsUsed
                    }
                }
            })
        ]);
        if (usedReferral) {
            if (usedReferral === userId) {
                return next(createError(400, "Users cannot refer themselves! "));
            }
            const updateCoinsANdNOtification = await prisma.$transaction([
                prisma.user.update({
                    where: {
                        id: usedReferral
                    },
                    data: {
                        coins: {
                            increment: (courseExists.price * courseExists.refrerralDiscount) / 100
                        }
                    }
                }),
                prisma.notification.create({
                    data: {
                        user: {
                            connect: {
                                id: usedReferral
                            }
                        },
                        message: `You have received ${courseExists.price * courseExists.refrerralDiscount / 100} coins for referring a user to purchase a course`
                    }
                })
            ]);
            res.status(200).json({ purchase, updateCoinsANdNOtification, message: "Purchase successful! and the referal coins are added to the user" });
        }
        else {
            res.status(200).json({ purchase, message: "Purchase successful!" });
        }
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