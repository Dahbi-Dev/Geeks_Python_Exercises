import express from "express";
import tasksRouter from "./routes/tasks.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/tasks", tasksRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
