const express = require("express");
const cors = require("cors");
const { getDB, saveDB } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Helper to convert sql.js result rows into array of objects
function toObjects(result) {
  if (result.length === 0) return [];
  const { columns, values } = result[0];
  return values.map((row) => {
    const obj = {};
    columns.forEach((col, i) => {
      obj[col] = col === "tags" ? JSON.parse(row[i]) : row[i];
    });
    return obj;
  });
}

// GET all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const db = await getDB();
    const result = db.exec("SELECT * FROM tasks");
    res.json(toObjects(result));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST - add a new task
app.post("/api/tasks", async (req, res) => {
  try {
    const { task, status, tags } = req.body;
    if (!task) return res.status(400).json({ error: "task is required" });

    const db = await getDB();
    db.run("INSERT INTO tasks (task, status) VALUES (?, ?)", [
      task,
      status || "todo",
      JSON.stringify(tags || []),
    ]);
    saveDB();

    // Get the last inserted row using max(id) — works reliably in sql.js
    const result = db.exec("SELECT * FROM tasks WHERE id = (SELECT MAX(id) FROM tasks)");
    const newTask = toObjects(result)[0];

    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE - remove a task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const db = await getDB();
    db.run("DELETE FROM tasks WHERE id = ?", [req.params.id]);
    saveDB();
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// PATCH - update task status
app.patch("/api/tasks/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const db = await getDB();
    db.run("UPDATE tasks SET status = ? WHERE id = ?", [status, req.params.id]);
    saveDB();
    res.json({ message: "Task updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));