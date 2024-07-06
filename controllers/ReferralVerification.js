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