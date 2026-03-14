/**
 * CodeQuest Backend — server.js
 * Node.js + Express REST API
 * Handles: Auth, Progress, Leaderboard, Quests
 */

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'codequest_secret_2024';

// ── MIDDLEWARE ──
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static('../frontend')); // Serve frontend files

// ── IN-MEMORY DATABASE (replace with MongoDB/PostgreSQL in production) ──
const db = {
  users: [
    {
      id: 'u001',
      name: 'Demo Hero',
      email: 'demo@codequest.io',
      password: bcrypt.hashSync('demo1234', 10),
      xp: 1240,
      coins: 320,
      streak: 7,
      level: 5,
      completedLessons: ['py1', 'py2', 'py3', 'js1', 'web1', 'web2'],
      badges: ['gold_coder', 'streak_7'],
      createdAt: new Date().toISOString()
    }
  ],

  leaderboard: [
    { userId: 'u100', name: 'NightCoder_X', avatar: '🦸', xp: 12480, streak: 45 },
    { userId: 'u101', name: 'PyThonMaster', avatar: '🧙', xp: 11320, streak: 30 },
    { userId: 'u102', name: 'AlgoKing', avatar: '👑', xp: 10950, streak: 28 },
    { userId: 'u103', name: 'CodeWizard99', avatar: '🔮', xp: 9800, streak: 22 },
    { userId: 'u104', name: 'JSHero', avatar: '⚡', xp: 9200, streak: 19 },
    { userId: 'u001', name: 'Demo Hero', avatar: '🧙‍♂️', xp: 1240, streak: 7 },
  ],

  quests: {
    daily: [
      { id: 'dq1', title: 'Solve 3 Quizzes', xp: 50, coins: 10, total: 3 },
      { id: 'dq2', title: 'Complete 1 Lesson', xp: 75, coins: 15, total: 1 },
      { id: 'dq3', title: 'Keep Your Streak', xp: 30, coins: 5, total: 1 },
    ],
    weekly: [
      { id: 'wq1', title: 'Finish 5 Chapters', xp: 200, coins: 50, total: 5 },
      { id: 'wq2', title: 'Win 2 Battles', xp: 300, coins: 75, total: 2 },
    ]
  },

  userProgress: {},  // userId -> { quests: {}, lessons: [] }
};

// ── HELPERS ──
function findUser(email) {
  return db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const payload = jwt.verify(auth.slice(7), JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ── AUTH ROUTES ──

// POST /api/auth/signup
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields required' });
  }
  if (findUser(email)) {
    return res.status(409).json({ error: 'Email already registered' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  const newUser = {
    id: 'u' + Date.now(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: await bcrypt.hash(password, 10),
    xp: 0,
    coins: 50, // Signup bonus
    streak: 0,
    level: 1,
    completedLessons: [],
    badges: [],
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  db.leaderboard.push({ userId: newUser.id, name: newUser.name, avatar: '🧙', xp: 0, streak: 0 });

  const token = generateToken(newUser.id);
  const { password: _, ...userSafe } = newUser;

  res.status(201).json({
    message: 'Account created successfully!',
    token,
    user: userSafe
  });
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const user = findUser(email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  // Update daily login streak
  user.streak = (user.streak || 0) + 1;
  if (user.streak % 7 === 0) {
    user.coins = (user.coins || 0) + 50; // Weekly streak bonus
  }

  const token = generateToken(user.id);
  const { password: _, ...userSafe } = user;

  res.json({ message: 'Login successful!', token, user: userSafe });
});

// GET /api/auth/me
app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = db.users.find(u => u.id === req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { password: _, ...userSafe } = user;
  res.json(userSafe);
});

// ── USER PROGRESS ROUTES ──

// GET /api/progress
app.get('/api/progress', authMiddleware, (req, res) => {
  const user = db.users.find(u => u.id === req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({
    xp: user.xp,
    coins: user.coins,
    streak: user.streak,
    level: user.level,
    completedLessons: user.completedLessons,
    badges: user.badges
  });
});

// POST /api/progress/lesson
app.post('/api/progress/lesson', authMiddleware, (req, res) => {
  const { lessonId, xpEarned, coinsEarned } = req.body;
  const user = db.users.find(u => u.id === req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (!user.completedLessons.includes(lessonId)) {
    user.completedLessons.push(lessonId);
    user.xp += xpEarned || 50;
    user.coins += coinsEarned || 10;

    // Level up check (every 1000 XP)
    const newLevel = Math.floor(user.xp / 1000) + 1;
    const leveledUp = newLevel > user.level;
    user.level = newLevel;

    // Update leaderboard
    const lbEntry = db.leaderboard.find(l => l.userId === req.userId);
    if (lbEntry) lbEntry.xp = user.xp;

    res.json({
      success: true,
      xp: user.xp,
      coins: user.coins,
      level: user.level,
      leveledUp,
      xpGained: xpEarned || 50
    });
  } else {
    res.json({ success: false, message: 'Lesson already completed' });
  }
});

// POST /api/progress/mission
app.post('/api/progress/mission', authMiddleware, (req, res) => {
  const { missionId, score, timeTaken } = req.body;
  const user = db.users.find(u => u.id === req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const xpGained = 250;
  const coinsGained = 50;
  user.xp += xpGained;
  user.coins += coinsGained;
  user.level = Math.floor(user.xp / 1000) + 1;

  if (!user.badges.includes('mission_' + missionId)) {
    user.badges.push('mission_' + missionId);
  }

  const lbEntry = db.leaderboard.find(l => l.userId === req.userId);
  if (lbEntry) lbEntry.xp = user.xp;

  res.json({
    success: true,
    xpGained,
    coinsGained,
    score,
    totalXP: user.xp,
    totalCoins: user.coins
  });
});

// ── LEADERBOARD ──

// GET /api/leaderboard?type=global&limit=20
app.get('/api/leaderboard', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const sorted = [...db.leaderboard]
    .sort((a, b) => b.xp - a.xp)
    .slice(0, limit)
    .map((entry, i) => ({ ...entry, rank: i + 1 }));

  res.json(sorted);
});

// ── QUESTS ──

// GET /api/quests
app.get('/api/quests', authMiddleware, (req, res) => {
  const progress = db.userProgress[req.userId] || { completedQuests: [] };
  const questsWithProgress = {
    daily: db.quests.daily.map(q => ({
      ...q,
      completed: progress.completedQuests?.includes(q.id) || false
    })),
    weekly: db.quests.weekly.map(q => ({
      ...q,
      completed: progress.completedQuests?.includes(q.id) || false
    }))
  };
  res.json(questsWithProgress);
});

// POST /api/quests/claim
app.post('/api/quests/claim', authMiddleware, (req, res) => {
  const { questId } = req.body;
  const user = db.users.find(u => u.id === req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (!db.userProgress[req.userId]) db.userProgress[req.userId] = { completedQuests: [] };
  const progress = db.userProgress[req.userId];

  const allQuests = [...db.quests.daily, ...db.quests.weekly];
  const quest = allQuests.find(q => q.id === questId);

  if (!quest) return res.status(404).json({ error: 'Quest not found' });
  if (progress.completedQuests.includes(questId)) {
    return res.status(400).json({ error: 'Quest already claimed' });
  }

  progress.completedQuests.push(questId);
  user.xp += quest.xp;
  user.coins += quest.coins;

  res.json({
    success: true,
    xpGained: quest.xp,
    coinsGained: quest.coins,
    totalXP: user.xp,
    totalCoins: user.coins
  });
});

// ── COMPETE / BATTLE ──

// POST /api/battle/submit
app.post('/api/battle/submit', authMiddleware, (req, res) => {
  const { battleType, solution, timeTaken } = req.body;
  const user = db.users.find(u => u.id === req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  // Simulate scoring (in real app, run tests)
  const passed = solution && solution.length > 20;
  const score = passed ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 40);
  const won = score >= 70;

  if (won) {
    const xpGained = 150;
    const coinsGained = 30;
    user.xp += xpGained;
    user.coins += coinsGained;

    res.json({ won: true, score, xpGained, coinsGained, message: '🏆 You won the battle!' });
  } else {
    res.json({ won: false, score, message: '😔 You lost this one. Try again!' });
  }
});

// ── COINS / REWARDS ──

// POST /api/rewards/buy
app.post('/api/rewards/buy', authMiddleware, (req, res) => {
  const { rewardId, price } = req.body;
  const user = db.users.find(u => u.id === req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (user.coins < price) {
    return res.status(400).json({ error: 'Insufficient coins' });
  }

  user.coins -= price;
  if (!user.badges.includes(rewardId)) user.badges.push(rewardId);

  res.json({ success: true, remainingCoins: user.coins });
});

// ── HEALTH CHECK ──
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: '⚔ CodeQuest API is running!',
    users: db.users.length,
    timestamp: new Date().toISOString()
  });
});

// ── START SERVER ──
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════╗
  ║  ⚔  CodeQuest API Server            ║
  ║  🚀  Running on http://localhost:${PORT} ║
  ║  📚  Frontend: http://localhost:${PORT} ║
  ╚══════════════════════════════════════╝
  `);
});

module.exports = app;
