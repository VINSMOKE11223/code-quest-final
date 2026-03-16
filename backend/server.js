/**
 * CodeQuest Backend — server.js
 * Node.js + Express REST API
 */

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "codequest_secret_2024";

// ─────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────

app.use(cors());
app.use(express.json());

// Serve frontend folder correctly
const FRONTEND_PATH = path.join(__dirname, "../frontend");
app.use(express.static(FRONTEND_PATH));

// Root route → open login page
app.get("/", (req, res) => {
  res.sendFile(path.join(FRONTEND_PATH, "login.html"));
});

// ─────────────────────────────────────
// IN-MEMORY DATABASE
// ─────────────────────────────────────

const db = {
  users: [
    {
      id: "u001",
      name: "Demo Hero",
      email: "demo@codequest.io",
      password: bcrypt.hashSync("demo1234", 10),
      xp: 1240,
      coins: 320,
      streak: 7,
      level: 5,
      completedLessons: ["py1", "py2", "py3"],
      badges: ["gold_coder", "streak_7"],
      createdAt: new Date().toISOString()
    }
  ],

  leaderboard: [
    { userId: "u100", name: "NightCoder_X", avatar: "🦸", xp: 12480, streak: 45 },
    { userId: "u101", name: "PyThonMaster", avatar: "🧙", xp: 11320, streak: 30 },
    { userId: "u102", name: "AlgoKing", avatar: "👑", xp: 10950, streak: 28 },
    { userId: "u001", name: "Demo Hero", avatar: "🧙‍♂️", xp: 1240, streak: 7 }
  ],

  quests: {
    daily: [
      { id: "dq1", title: "Solve 3 Quizzes", xp: 50, coins: 10 },
      { id: "dq2", title: "Complete 1 Lesson", xp: 75, coins: 15 }
    ],
    weekly: [
      { id: "wq1", title: "Finish 5 Chapters", xp: 200, coins: 50 }
    ]
  }
};

// ─────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────

function findUser(email) {
  return db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(auth.split(" ")[1], JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// ─────────────────────────────────────
// AUTH ROUTES
// ─────────────────────────────────────

// Signup
app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  if (findUser(email)) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const newUser = {
    id: "u" + Date.now(),
    name,
    email,
    password: await bcrypt.hash(password, 10),
    xp: 0,
    coins: 50,
    streak: 0,
    level: 1,
    completedLessons: [],
    badges: [],
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);

  const token = generateToken(newUser.id);

  const { password: _, ...userSafe } = newUser;

  res.json({
    message: "Signup successful",
    token,
    user: userSafe
  });
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = findUser(email);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = generateToken(user.id);

  const { password: _, ...userSafe } = user;

  res.json({
    message: "Login successful",
    token,
    user: userSafe
  });
});

// Get current user
app.get("/api/auth/me", authMiddleware, (req, res) => {
  const user = db.users.find(u => u.id === req.userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const { password: _, ...userSafe } = user;

  res.json(userSafe);
});

// ─────────────────────────────────────
// PROGRESS
// ─────────────────────────────────────

app.post("/api/progress/lesson", authMiddleware, (req, res) => {
  const { lessonId } = req.body;

  const user = db.users.find(u => u.id === req.userId);

  if (!user.completedLessons.includes(lessonId)) {
    user.completedLessons.push(lessonId);
    user.xp += 50;
    user.coins += 10;

    const newLevel = Math.floor(user.xp / 1000) + 1;
    user.level = newLevel;

    res.json({
      success: true,
      xp: user.xp,
      coins: user.coins,
      level: user.level
    });
  } else {
    res.json({ message: "Lesson already completed" });
  }
});

// ─────────────────────────────────────
// LEADERBOARD
// ─────────────────────────────────────

app.get("/api/leaderboard", (req, res) => {

  const sorted = [...db.leaderboard]
    .sort((a, b) => b.xp - a.xp)
    .map((p, i) => ({
      rank: i + 1,
      ...p
    }));

  res.json(sorted);
});

// ─────────────────────────────────────
// QUESTS
// ─────────────────────────────────────

app.get("/api/quests", authMiddleware, (req, res) => {
  res.json(db.quests);
});

// ─────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "⚔ CodeQuest API is running",
    users: db.users.length
  });
});

// ─────────────────────────────────────
// START SERVER
// ─────────────────────────────────────

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║  ⚔ CodeQuest API Server             ║
║  🚀 Backend: http://localhost:${PORT}/api/health
║  🌐 Frontend: http://localhost:${PORT}
╚══════════════════════════════════════╝
`);
});