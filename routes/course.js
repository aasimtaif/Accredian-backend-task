import express from 'express';
import { getCourses, getCourse, createCourse } from "../controllers/course.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/", createCourse);

export default router