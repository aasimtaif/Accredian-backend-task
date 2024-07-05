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

export const getUser = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.id
            }
        });
        user.forEach(user => {
            delete user.password;
        });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return next(err);

    }
}

export const createReferral = async (req, res,next) => {
    const id  = parseInt(req.params.id);
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
            return next(createError(400, "Referral code already exists!"));
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
