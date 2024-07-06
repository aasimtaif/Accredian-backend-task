import { createError } from "../utils/error.js";
import { prisma } from "../config/prisma.config.js";

export const checkReferral = async (req, res, next) => {

    const { referral, userId } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                referral
            }
        });
        if (!user) {
            return next(createError(404, "Referral not found!"));
        }
        if (user.id === userId) {
            return next(createError(400, "Users cannot refer themselves! "));
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

export const createReferral = async (req, res, next) => {
    const id = parseInt(req.params.userId);
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        if (!user) {
            return next(createError(404, "User not found!"));
        }
        if (user.referral) {
            return res.status(200).json(user.referral);;
        }
        const referral = `${user.name}/${user.id}/course-referral`;
        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                referral
            }
        })
        res.status(200).json(updatedUser);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error." });
    }
}