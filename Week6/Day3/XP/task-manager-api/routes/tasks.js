import express from "express";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const router = express.Router();
const dataPath = path.join(process.cwd(), "tasks.json");

// Helper function
const readTasks = async () => {
  const data = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(data);
};

const writeTasks = async (tasks) => {
  await fs.writeFile(dataPath, JSON.stringify(tasks, null, 2));
};

// GET /tasks
router.get("/", async (req, res, next) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// GET /tasks/:id
router.get("/:id", async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// POST /tasks
router.post("/", async (req, res, next) => {
  try {
    const { title, completed = false } = req.body;

    if (!title) return res.status(400).json({ error: "Title is required" });

    const newTask = {
      id: uuidv4(),
      title,
      completed,
    };

    const tasks = await readTasks();
    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

// PUT /tasks/:id
router.put("/:id", async (req, res, next) => {
  try {
    const { title, completed } = req.body;
    const tasks = await readTasks();
    const index = tasks.findIndex((t) => t.id === req.params.id);

    if (index === -1) return res.status(404).json({ error: "Task not found" });

    if (title !== undefined) tasks[index].title = title;
    if (completed !== undefined) tasks[index].completed = completed;

    await writeTasks(tasks);
    res.json(tasks[index]);
  } catch (err) {
    next(err);
  }
});

// DELETE /tasks/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const newTasks = tasks.filter((t) => t.id !== req.params.id);

    if (newTasks.length === tasks.length)
      return res.status(404).json({ error: "Task not found" });

    await writeTasks(newTasks);
    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
