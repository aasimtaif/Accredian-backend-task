import { createError } from "../utils/error.js";
import { prisma } from "../config/prisma.config.js";

export const createCourse = async (req, res, next) => {
    const { ...details} = req.body;
    try {
        const course = await prisma.course.create({
            data: details
            
        });
        res.status(200).json(course);
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

export const getCourses = async (req, res, next) => {
    try {
        const courses = await prisma.course.findMany();
        res.status(200).json(courses);
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

export const getCourse = async (req, res, next) => {
    try {
        const course = await prisma.course.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.status(200).json(course);
    } catch (err) {
        console.log(err);
        return next(err);
    }
}