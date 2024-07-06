
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import { prisma } from "../config/prisma.config.js";


export const register = async (req, res, next) => {
    const { password, ...details } = req.body;
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user = await prisma.user.create({
            data: {
                ...details,
                password: hash
            }
        });

        res.status(200).json({ message: "User has been created.",
             user 

        });
    } catch (err) {
        console.log(err)
        next(err);
    }
};
export const login = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });
        if (!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
        if (!isPasswordCorrect)
            return next(createError(400, "Wrong password or username!"));

        const token = jwt.sign(
            { id: user._id, },
            process.env.JWT
        );

        const { password, isAdmin, ...otherDetails } = user;
        res
            .status(200)
            .json({  ...otherDetails , isAdmin, token });
    } catch (err) {
        console.log(err)
        next(err);
    }
};
