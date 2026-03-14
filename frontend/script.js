/**
 * script.js — Main application logic
 * Handles: Auth, Dashboard, Learning Path, Quests, Rewards, Leaderboard, Compete, Profile
 */

// ═══════════════════════════════════════════
// GAME DATA
// ═══════════════════════════════════════════

const LEARNING_PATHS = {
  python: {
    label: 'Python',
    icon: '🐍',
    color: '#3B82F6',
    units: [
      {
        title: 'BEGINNER',
        lessons: [
          { id: 'py1', name: 'Variables', icon: '📦', xp: 50, completed: true },
          { id: 'py2', name: 'Data Types', icon: '🔢', xp: 50, completed: true },
          { id: 'py3', name: 'Strings', icon: '📝', xp: 60, completed: true },
          { id: 'py4', name: 'Lists', icon: '📋', xp: 60, completed: false },
          { id: 'py5', name: 'Dicts', icon: '🗂', xp: 70, completed: false },
        ]
      },
      {
        title: '🏆 MISSION: MINI CALCULATOR',
        isMission: true,
        id: 'mission1',
        xp: 250
      },
      {
        title: 'INTERMEDIATE',
        lessons: [
          { id: 'py6', name: 'Loops', icon: '🔄', xp: 80, completed: false, locked: true },
          { id: 'py7', name: 'Functions', icon: '⚙️', xp: 80, completed: false, locked: true },
          { id: 'py8', name: 'Classes', icon: '🏗', xp: 100, completed: false, locked: true },
          { id: 'py9', name: 'Files I/O', icon: '📂', xp: 90, completed: false, locked: true },
          { id: 'py10', name: 'Exceptions', icon: '🚨', xp: 90, completed: false, locked: true },
        ]
      },
      {
        title: '🏆 MISSION: DEBUG CHALLENGE',
        isMission: true,
        id: 'mission2',
        xp: 350
      },
      {
        title: 'ADVANCED',
        lessons: [
          { id: 'py11', name: 'Decorators', icon: '🎨', xp: 120, completed: false, locked: true },
          { id: 'py12', name: 'Generators', icon: '⚡', xp: 120, completed: false, locked: true },
          { id: 'py13', name: 'Async/Await', icon: '🔮', xp: 150, completed: false, locked: true },
        ]
      }
    ]
  },
  javascript: {
    label: 'JavaScript',
    icon: '⚡',
    units: [
      {
        title: 'FOUNDATIONS',
        lessons: [
          { id: 'js1', name: 'Variables', icon: '📦', xp: 50, completed: true },
          { id: 'js2', name: 'Functions', icon: '⚙️', xp: 60, completed: false },
          { id: 'js3', name: 'Arrays', icon: '📋', xp: 60, completed: false, locked: true },
          { id: 'js4', name: 'Objects', icon: '🗂', xp: 70, completed: false, locked: true },
          { id: 'js5', name: 'DOM', icon: '🌐', xp: 80, completed: false, locked: true },
        ]
      },
      {
        title: '🏆 MISSION: BUILD A QUIZ APP',
        isMission: true,
        id: 'mission_js1',
        xp: 300
      }
    ]
  },
  java: {
    label: 'Java',
    icon: '☕',
    units: [
      {
        title: 'JAVA BASICS',
        lessons: [
          { id: 'java1', name: 'Setup & JVM', icon: '⚙️', xp: 50, completed: false },
          { id: 'java2', name: 'Data Types', icon: '🔢', xp: 60, completed: false, locked: true },
          { id: 'java3', name: 'OOP', icon: '🏗', xp: 80, completed: false, locked: true },
          { id: 'java4', name: 'Collections', icon: '📦', xp: 90, completed: false, locked: true },
        ]
      }
    ]
  },
  cpp: {
    label: 'C++',
    icon: '⚙',
    units: [
      {
        title: 'C++ BASICS',
        lessons: [
          { id: 'cpp1', name: 'Pointers', icon: '👆', xp: 80, completed: false },
          { id: 'cpp2', name: 'Memory', icon: '🧠', xp: 90, completed: false, locked: true },
          { id: 'cpp3', name: 'Templates', icon: '🔮', xp: 100, completed: false, locked: true },
          { id: 'cpp4', name: 'STL', icon: '📚', xp: 100, completed: false, locked: true },
        ]
      }
    ]
  },
  webdev: {
    label: 'Web Dev',
    icon: '🌐',
    units: [
      {
        title: 'HTML & CSS',
        lessons: [
          { id: 'web1', name: 'HTML Basics', icon: '🏗', xp: 40, completed: true },
          { id: 'web2', name: 'CSS Styling', icon: '🎨', xp: 50, completed: true },
          { id: 'web3', name: 'Flexbox', icon: '📐', xp: 60, completed: false },
          { id: 'web4', name: 'Grid Layout', icon: '🔲', xp: 60, completed: false, locked: true },
          { id: 'web5', name: 'Responsive', icon: '📱', xp: 70, completed: false, locked: true },
        ]
      },
      {
        title: '🏆 MISSION: BUILD A LANDING PAGE',
        isMission: true,
        id: 'mission_web1',
        xp: 300
      }
    ]
  },
  dsa: {
    label: 'DSA',
    icon: '🔮',
    units: [
      {
        title: 'DATA STRUCTURES',
        lessons: [
          { id: 'dsa1', name: 'Arrays', icon: '📋', xp: 80, completed: false },
          { id: 'dsa2', name: 'Linked List', icon: '🔗', xp: 90, completed: false, locked: true },
          { id: 'dsa3', name: 'Stacks', icon: '📚', xp: 90, completed: false, locked: true },
          { id: 'dsa4', name: 'Queues', icon: '↔️', xp: 90, completed: false, locked: true },
          { id: 'dsa5', name: 'Trees', icon: '🌳', xp: 110, completed: false, locked: true },
        ]
      },
      {
        title: 'ALGORITHMS',
        lessons: [
          { id: 'dsa6', name: 'Bubble Sort', icon: '🔄', xp: 80, completed: false, locked: true },
          { id: 'dsa7', name: 'Binary Search', icon: '🔍', xp: 90, completed: false, locked: true },
          { id: 'dsa8', name: 'Recursion', icon: '🌀', xp: 100, completed: false, locked: true },
          { id: 'dsa9', name: 'Dynamic Prog.', icon: '🧩', xp: 130, completed: false, locked: true },
        ]
      },
      {
        title: '🏆 MISSION: SORTING PUZZLE',
        isMission: true,
        id: 'mission_dsa1',
        xp: 400
      }
    ]
  }
};

// ═══════════════════════════════════════════
// LESSON CONTENT — Full multi-quiz per chapter
// Each lesson has: content + quizzes[] (5–7 questions)
// ═══════════════════════════════════════════

const LESSON_CONTENT = {

  /* ─────────── PYTHON ─────────── */
  py1: {
    icon: '🐍', title: 'Python Variables', subtitle: 'Lesson 1 · Python Basics',
    content: `<strong>Variables</strong> store data values. Python is dynamically typed — no declaration needed.<br><br>
<pre>name     = "CodeQuest"   # str
level    = 5              # int
xp       = 1240.5         # float
is_hero  = True           # bool
_private = "secret"       # valid underscore start</pre>
<strong>Naming rules:</strong> start with letter or <code>_</code>, no spaces, no starting with digits.<br>
<strong>Convention:</strong> use <code>snake_case</code> for variable names.<br><br>
💡 <code>type()</code> returns the type: <code>print(type(level))  # &lt;class 'int'&gt;</code>`,
    quizzes: [
      { q: 'Which variable name is valid in Python?', opts: ['2player', 'my-score', 'player_name', 'class'], ans: 2 },
      { q: 'What does Python infer as the type of `x = 3.14`?', opts: ['int', 'float', 'str', 'double'], ans: 1 },
      { q: 'Which statement correctly assigns an integer in Python?', opts: ['int x = 5', 'x = 5', 'var x = 5', 'x := 5'], ans: 1 },
      { q: 'What is the output of `type("hello")`?', opts: ["<class 'str'>", "<class 'char'>", "<class 'text'>", "<class 'string'>"], ans: 0 },
      { q: 'Which of these follows Python `snake_case` convention?', opts: ['myScore', 'MyScore', 'my_score', 'MYSCORE'], ans: 2 },
      { q: 'Can a variable name start with an underscore in Python?', opts: ['No, never', 'Yes, always valid', 'Only for constants', 'Only in classes'], ans: 1 },
      { q: 'What happens when you reassign `x = 5` then `x = "hello"`?', opts: ['Error — type mismatch', 'x becomes "hello"', 'x stays 5', 'x becomes None'], ans: 1 },
    ]
  },

  py2: {
    icon: '🔢', title: 'Data Types', subtitle: 'Lesson 2 · Python Basics',
    content: `Python's core built-in types:<br><br>
<pre>age      = 25           # int
gpa      = 3.9          # float
name     = "Hero"       # str
active   = True         # bool
scores   = [90,85,95]   # list  (mutable)
coords   = (10, 20)     # tuple (immutable)
tags     = {"py","js"}  # set   (unique values)
player   = {"xp": 500}  # dict  (key-value)</pre>
<strong>Type conversion:</strong> <code>int("42")</code>, <code>str(99)</code>, <code>float("3.14")</code><br>
<strong>Check type:</strong> <code>isinstance(age, int)  # True</code>`,
    quizzes: [
      { q: 'What data type is `scores = [90, 85, 95]`?', opts: ['tuple', 'set', 'list', 'array'], ans: 2 },
      { q: 'Which type is IMMUTABLE in Python?', opts: ['list', 'dict', 'tuple', 'set'], ans: 2 },
      { q: 'What does `int("42")` return?', opts: ['"42"', '42', 'Error', '42.0'], ans: 1 },
      { q: 'What type is `True` in Python?', opts: ['int', 'str', 'bool', 'NoneType'], ans: 2 },
      { q: 'Which collection stores only UNIQUE values?', opts: ['list', 'tuple', 'dict', 'set'], ans: 3 },
      { q: 'What does `isinstance(3.14, float)` return?', opts: ['True', 'False', 'Error', 'None'], ans: 0 },
      { q: 'What is the result of `str(100)`?', opts: ['100', '"100"', 'Error', 'int'], ans: 1 },
    ]
  },

  py3: {
    icon: '📝', title: 'Strings', subtitle: 'Lesson 3 · Python Basics',
    content: `Strings are sequences of characters, immutable in Python.<br><br>
<pre>s = "Hello, CodeQuest!"
print(s.upper())          # HELLO, CODEQUEST!
print(s.lower())          # hello, codequest!
print(s[0:5])             # Hello   (slicing)
print(len(s))             # 18
print(s.replace("Hello","Hi"))  # Hi, CodeQuest!

# f-strings (modern formatting)
name = "Hero"
xp   = 500
print(f"{name} has {xp} XP")   # Hero has 500 XP

# split & join
words = "a,b,c".split(",")     # ['a','b','c']
joined = "-".join(words)        # 'a-b-c'</pre>`,
    quizzes: [
      { q: 'What does `"hello".upper()` return?', opts: ['hello', 'Hello', 'HELLO', 'Error'], ans: 2 },
      { q: 'What is `"CodeQuest"[0:4]`?', opts: ['Code', 'Quest', 'CodeQ', 'Cod'], ans: 0 },
      { q: 'What does `len("Python")` return?', opts: ['5', '6', '7', 'Error'], ans: 1 },
      { q: 'Which creates an f-string?', opts: ['f"Hi {name}"', '"Hi " + name', '"Hi %s" % name', 'format("Hi", name)'], ans: 0 },
      { q: 'What does `"a,b,c".split(",")` return?', opts: ['"a b c"', "['a','b','c']", "('a','b','c')", 'Error'], ans: 1 },
      { q: 'Are strings mutable in Python?', opts: ['Yes', 'No', 'Only Unicode', 'Depends on version'], ans: 1 },
      { q: 'What does `"Hello"[1]` return?', opts: ['H', 'e', 'He', 'Error'], ans: 1 },
    ]
  },

  py4: {
    icon: '📋', title: 'Lists', subtitle: 'Lesson 4 · Python Basics',
    content: `Lists are ordered, mutable sequences. One of Python's most used types.<br><br>
<pre>heroes = ["Alice", "Bob", "Charlie"]
heroes.append("Diana")          # add to end
heroes.insert(0, "Zara")        # insert at index
heroes.remove("Bob")            # remove by value
popped = heroes.pop()           # remove last
heroes.sort()                   # sort in-place
heroes.reverse()                # reverse in-place

# Slicing
print(heroes[1:3])              # index 1 and 2
print(heroes[-1])               # last element

# List comprehension
squares = [x**2 for x in range(5)]  # [0,1,4,9,16]</pre>`,
    quizzes: [
      { q: 'Which method adds an item to the END of a list?', opts: ['insert()', 'add()', 'append()', 'push()'], ans: 2 },
      { q: 'What does `heroes[-1]` return?', opts: ['First item', 'Last item', '-1', 'Error'], ans: 1 },
      { q: 'What does `[1,2,3].pop()` return?', opts: ['1', '2', '3', 'Error'], ans: 2 },
      { q: 'What is `[x*2 for x in range(3)]`?', opts: ['[0,2,4]', '[2,4,6]', '[1,2,3]', '[0,1,2]'], ans: 0 },
      { q: 'Which method sorts a list IN PLACE?', opts: ['sorted()', 'list.sort()', 'order()', 'arrange()'], ans: 1 },
      { q: 'What does `len([1,2,3,4])` return?', opts: ['3', '4', '5', 'Error'], ans: 1 },
      { q: 'How do you access the 2nd element of list `a`?', opts: ['a[2]', 'a[1]', 'a(1)', 'a.get(1)'], ans: 1 },
    ]
  },

  py5: {
    icon: '🗂', title: 'Dictionaries', subtitle: 'Lesson 5 · Python Basics',
    content: `Dictionaries store <strong>key-value pairs</strong>. Keys must be unique and immutable.<br><br>
<pre>player = {"name": "Alex", "xp": 500, "level": 5}

# Access
print(player["name"])         # Alex
print(player.get("coins", 0)) # 0 (default if missing)

# Modify
player["xp"] = 750
player["coins"] = 100         # add new key

# Remove
del player["level"]
popped = player.pop("coins")

# Iterate
for key, val in player.items():
    print(f"{key}: {val}")

# Useful methods
print(player.keys())    # dict_keys(['name', 'xp'])
print(player.values())  # dict_values(['Alex', 750])</pre>`,
    quizzes: [
      { q: 'How do you safely get a value with a default fallback?', opts: ['dict[key]', 'dict.get(key, default)', 'dict.fetch(key)', 'dict.find(key)'], ans: 1 },
      { q: 'What does `del dict["key"]` do?', opts: ['Returns the value', 'Deletes the key-value pair', 'Clears the dict', 'Error'], ans: 1 },
      { q: 'Which are valid dictionary keys?', opts: ['Lists only', 'Any type', 'Strings only', 'Immutable types only'], ans: 3 },
      { q: 'What does `.items()` return?', opts: ['Just keys', 'Just values', 'Key-value pairs', 'A sorted list'], ans: 2 },
      { q: 'What happens if you assign to an existing key?', opts: ['Error', 'Duplicate created', 'Value is updated', 'Returns old value'], ans: 2 },
      { q: 'What does `len({"a":1,"b":2,"c":3})` return?', opts: ['2', '3', '6', 'Error'], ans: 1 },
      { q: 'Which method removes AND returns a key?', opts: ['delete()', 'remove()', 'pop()', 'discard()'], ans: 2 },
    ]
  },

  py6: {
    icon: '🔄', title: 'Loops', subtitle: 'Lesson 6 · Python Intermediate',
    content: `Python has two loops: <code>for</code> and <code>while</code>.<br><br>
<pre># for loop — iterate over sequence
for i in range(5):
    print(i)         # 0 1 2 3 4

# for over list
for hero in ["Alice","Bob"]:
    print(hero)

# while loop
count = 0
while count < 3:
    print(count)
    count += 1

# break & continue
for n in range(10):
    if n == 5: break      # exit loop
    if n % 2 == 0: continue  # skip even
    print(n)              # 1 3

# enumerate
for i, val in enumerate(["a","b","c"]):
    print(i, val)         # 0 a, 1 b, 2 c</pre>`,
    quizzes: [
      { q: 'What does `range(3)` produce?', opts: ['[1,2,3]', '[0,1,2]', '[0,1,2,3]', '[1,2]'], ans: 1 },
      { q: 'Which keyword exits a loop immediately?', opts: ['exit', 'stop', 'break', 'return'], ans: 2 },
      { q: 'Which keyword skips to the next iteration?', opts: ['skip', 'next', 'pass', 'continue'], ans: 3 },
      { q: 'What loop runs while a condition is True?', opts: ['for', 'loop', 'while', 'repeat'], ans: 2 },
      { q: 'What does `enumerate(["a","b"])` yield first?', opts: ['("a",0)', '(0,"a")', '0', '"a"'], ans: 1 },
      { q: 'How many times does `for i in range(2,6)` loop?', opts: ['3', '4', '5', '6'], ans: 1 },
      { q: 'What is `range(0,10,2)` equivalent to?', opts: ['[0,2,4,6,8]', '[0,2,4,6,8,10]', '[2,4,6,8]', '[1,3,5,7,9]'], ans: 0 },
    ]
  },

  py7: {
    icon: '⚙️', title: 'Functions', subtitle: 'Lesson 7 · Python Intermediate',
    content: `Functions are reusable blocks of code defined with <code>def</code>.<br><br>
<pre>def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alex"))           # Hello, Alex!
print(greet("Bob", "Hi"))      # Hi, Bob!

# *args — variable positional args
def total(*nums):
    return sum(nums)

# **kwargs — variable keyword args
def profile(**data):
    for k,v in data.items():
        print(f"{k}: {v}")

profile(name="Alex", xp=500)

# Lambda (anonymous function)
square = lambda x: x ** 2
print(square(4))               # 16</pre>`,
    quizzes: [
      { q: 'What keyword defines a function in Python?', opts: ['func', 'function', 'def', 'fn'], ans: 2 },
      { q: 'What does a function return if no `return` statement?', opts: ['0', 'False', 'None', 'Error'], ans: 2 },
      { q: 'What does `*args` capture?', opts: ['Keyword args', 'Variable positional args', 'Default args', 'Type hints'], ans: 1 },
      { q: 'What is a lambda function?', opts: ['A named function', 'An anonymous one-line function', 'A class method', 'A loop shortcut'], ans: 1 },
      { q: 'What does `greeting="Hello"` in `def greet(name, greeting="Hello")` represent?', opts: ['Required arg', 'Default argument', 'Global variable', 'Return type'], ans: 1 },
      { q: 'What is the output of `(lambda x: x*3)(5)`?', opts: ['3', '5', '15', 'Error'], ans: 2 },
      { q: 'What does `**kwargs` capture in a function?', opts: ['Positional args', 'Keyword args as dict', 'Class methods', 'Module imports'], ans: 1 },
    ]
  },

  py8: {
    icon: '🏗', title: 'Classes & OOP', subtitle: 'Lesson 8 · Python Intermediate',
    content: `Object-Oriented Programming models real-world entities as <strong>classes</strong>.<br><br>
<pre>class Hero:
    species = "Human"          # class attribute

    def __init__(self, name, xp=0):
        self.name = name       # instance attribute
        self.xp = xp

    def greet(self):
        return f"I am {self.name}, XP: {self.xp}"

    def earn_xp(self, amount):
        self.xp += amount

# Inheritance
class Wizard(Hero):
    def __init__(self, name):
        super().__init__(name, xp=100)
        self.spells = []

    def cast(self, spell):
        self.spells.append(spell)
        return f"{self.name} casts {spell}!"

w = Wizard("Merlin")
print(w.cast("Fireball"))      # Merlin casts Fireball!</pre>`,
    quizzes: [
      { q: 'What does `__init__` do in a class?', opts: ['Destroys the object', 'Initializes the object', 'Returns the object', 'Inherits from parent'], ans: 1 },
      { q: 'What is `self` in a method?', opts: ['A keyword like `this`', 'Reference to the current instance', 'A global variable', 'The class itself'], ans: 1 },
      { q: 'What keyword is used for inheritance?', opts: ['extends', 'inherits', 'class Child(Parent)', 'import'], ans: 2 },
      { q: 'What does `super().__init__()` do?', opts: ['Calls parent class constructor', 'Creates a new class', 'Overrides the method', 'Deletes the parent'], ans: 0 },
      { q: 'What is a class attribute vs instance attribute?', opts: ['No difference', 'Class shared by all instances; instance unique per object', 'Instance is global', 'Class attribute is private'], ans: 1 },
      { q: 'What are the four pillars of OOP?', opts: ['CRUD', 'Encapsulation, Inheritance, Polymorphism, Abstraction', 'Functions, Loops, Classes, Modules', 'None of the above'], ans: 1 },
      { q: 'What does polymorphism mean in OOP?', opts: ['Multiple classes', 'One interface, many implementations', 'Hiding data', 'Sharing memory'], ans: 1 },
    ]
  },

  /* ─────────── JAVASCRIPT ─────────── */
  js1: {
    icon: '⚡', title: 'JS Variables', subtitle: 'Lesson 1 · JavaScript Basics',
    content: `JavaScript has three variable keywords: <code>const</code>, <code>let</code>, <code>var</code>.<br><br>
<pre>const PI = 3.14;         // immutable binding
let score = 0;            // block-scoped, reassignable
var legacy = "avoid";     // function-scoped (old)

score = 100;              // ✅ ok
// PI = 3;               // ❌ TypeError

// Destructuring
const [a, b] = [1, 2];
const { name, xp } = { name: "Alex", xp: 500 };

// Template literals
console.log(\`\${name} has \${xp} XP\`);  // Alex has 500 XP</pre>`,
    quizzes: [
      { q: 'Which keyword creates a block-scoped reassignable variable?', opts: ['var', 'let', 'const', 'define'], ans: 1 },
      { q: 'What happens if you try to reassign a `const`?', opts: ['Works fine', 'TypeError', 'Creates new variable', 'Returns undefined'], ans: 1 },
      { q: 'What is the scope of `var`?', opts: ['Block scope', 'Module scope', 'Function scope', 'Global only'], ans: 2 },
      { q: 'What does `` `Hello ${name}` `` use?', opts: ['String concat', 'Template literal', 'f-string', 'sprintf'], ans: 1 },
      { q: 'What is `const [a,b] = [10,20]`?', opts: ['Array mutation', 'Array destructuring', 'Spread operator', 'Type casting'], ans: 1 },
      { q: 'What is `undefined` in JavaScript?', opts: ['A declared but unassigned variable', 'An error type', 'Same as null', 'A string'], ans: 0 },
      { q: 'Which is the modern best practice for variables?', opts: ['Always use var', 'Use const by default, let when needed', 'Only use let', 'Avoid all three'], ans: 1 },
    ]
  },

  js2: {
    icon: '⚙️', title: 'JS Functions', subtitle: 'Lesson 2 · JavaScript Basics',
    content: `Functions in JS: declarations, expressions, and arrows.<br><br>
<pre>// Declaration — hoisted
function add(a, b) { return a + b; }

// Expression — not hoisted
const multiply = function(a, b) { return a * b; };

// Arrow — concise, no own 
const square = x => x * x;
const greet  = (name) => \`Hello, \${name}!\`;

// Default params
const level = (xp, cap = 100) => Math.min(xp, cap);

// Rest params
const sum = (...nums) => nums.reduce((a,b) => a+b, 0);

console.log(sum(1,2,3,4));  // 10</pre>`,
    quizzes: [
      { q: 'Which function type is hoisted in JavaScript?', opts: ['Arrow', 'Expression', 'Declaration', 'Anonymous'], ans: 2 },
      { q: 'What does `x => x * x` do?', opts: ['Returns x twice', 'Returns x squared', 'Mutates x', 'Error'], ans: 1 },
      { q: 'What do `...nums` in a function do?', opts: ['Spread an array', 'Collect remaining args', 'Destructure', 'Copy params'], ans: 1 },
      { q: 'Arrow functions have their own `this`. True or False?', opts: ['True', 'False', 'Only in classes', 'Depends on strict mode'], ans: 1 },
      { q: 'What is `(a, b = 5) => a + b` called?', opts: ['Rest param', 'Default parameter', 'Spread arg', 'Optional chaining'], ans: 1 },
      { q: 'What does `.reduce((a,b) => a+b, 0)` do on `[1,2,3]`?', opts: ['[1,2,3]', '6', '0', '123'], ans: 1 },
      { q: 'Which is a valid one-line arrow function?', opts: ['arrow x => { x }', 'const f = x => x+1', 'fn(x) => x', 'x -> x+1'], ans: 1 },
    ]
  },

  js3: {
    icon: '📋', title: 'JS Arrays', subtitle: 'Lesson 3 · JavaScript Basics',
    content: `Arrays are ordered, zero-indexed, mutable lists.<br><br>
<pre>const heroes = ["Alice", "Bob", "Charlie"];

// Core methods
heroes.push("Diana");          // add to end
heroes.unshift("Zara");        // add to start
const last = heroes.pop();     // remove from end
const first = heroes.shift();  // remove from start

// Iteration
heroes.forEach(h => console.log(h));
const upper = heroes.map(h => h.toUpperCase());
const long  = heroes.filter(h => h.length > 3);
const found = heroes.find(h => h.startsWith("A"));

// Transform
const total = [1,2,3,4].reduce((acc,n) => acc+n, 0); // 10

// Spread / destructuring
const copy = [...heroes];
const [a, b, ...rest] = heroes;</pre>`,
    quizzes: [
      { q: 'Which adds an item to the END of an array?', opts: ['unshift', 'push', 'append', 'add'], ans: 1 },
      { q: 'What does `.map()` return?', opts: ['undefined', 'The original array', 'A new transformed array', 'A single value'], ans: 2 },
      { q: 'What does `.filter()` do?', opts: ['Modifies items', 'Returns items matching condition', 'Sorts the array', 'Removes duplicates'], ans: 1 },
      { q: 'What does `.reduce((acc,n)=>acc+n, 0)` do on `[1,2,3]`?', opts: ['[1,2,3]', '6', '0', 'Error'], ans: 1 },
      { q: 'What is `[...arr1, ...arr2]`?', opts: ['Destructuring', 'Merging two arrays', 'Cloning arr1', 'Error'], ans: 1 },
      { q: 'What does `.find()` return if nothing matches?', opts: ['null', '-1', 'false', 'undefined'], ans: 3 },
      { q: 'What does `heroes[0]` access?', opts: ['Second element', 'Last element', 'First element', 'Length'], ans: 2 },
    ]
  },

  js4: {
    icon: '🗂', title: 'JS Objects', subtitle: 'Lesson 4 · JavaScript Basics',
    content: `Objects are collections of key-value pairs (properties and methods).<br><br>
<pre>const player = {
  name: "Alex",
  xp: 500,
  greet() { return \`Hi, I'm \${this.name}\`; }
};

// Access
console.log(player.name);          // Alex
console.log(player["xp"]);         // 500

// Destructuring
const { name, xp } = player;

// Spread (shallow copy)
const updated = { ...player, xp: 750 };

// Optional chaining
console.log(player?.stats?.level); // undefined (no error)

// Object methods
Object.keys(player);      // ["name","xp","greet"]
Object.values(player);    // ["Alex",500,ƒ]
Object.entries(player);   // [["name","Alex"],...]</pre>`,
    quizzes: [
      { q: 'How do you access `name` from object `p`?', opts: ['p->name', 'p.name or p["name"]', 'p::name', 'p(name)'], ans: 1 },
      { q: 'What does `{ ...obj, key: newVal }` do?', opts: ['Mutates obj', 'Creates shallow copy with override', 'Deep clones obj', 'Deletes key'], ans: 1 },
      { q: 'What does `Object.keys(obj)` return?', opts: ['Values array', 'Keys array', 'Entries array', 'Length'], ans: 1 },
      { q: 'What does `?.` (optional chaining) prevent?', opts: ['Syntax errors', 'TypeError on null/undefined access', 'Infinite loops', 'Type coercion'], ans: 1 },
      { q: 'What is `this` inside a method?', opts: ['The global object', 'The function itself', 'The calling object', 'undefined'], ans: 2 },
      { q: 'What does `const {name} = player` do?', opts: ['Deletes name from player', 'Destructures name into variable', 'Clones player', 'Error'], ans: 1 },
      { q: 'What does `Object.entries()` return?', opts: ['Just keys', 'Just values', 'Array of [key,value] pairs', 'Object length'], ans: 2 },
    ]
  },

  js5: {
    icon: '🌐', title: 'DOM Manipulation', subtitle: 'Lesson 5 · JavaScript Basics',
    content: `The DOM (Document Object Model) lets JS interact with HTML elements.<br><br>
<pre>// Select elements
const btn   = document.getElementById("myBtn");
const items = document.querySelectorAll(".item");
const title = document.querySelector("h1");

// Modify content & style
title.textContent = "New Title";
title.innerHTML   = "&lt;span&gt;Rich&lt;/span&gt; Title";
btn.style.color   = "purple";
btn.classList.add("active");
btn.classList.toggle("hidden");

// Events
btn.addEventListener("click", (e) => {
  console.log("Clicked!", e.target);
});

// Create & insert elements
const div = document.createElement("div");
div.textContent = "Dynamic!";
document.body.appendChild(div);</pre>`,
    quizzes: [
      { q: 'Which selects ALL elements matching a CSS selector?', opts: ['getElementById', 'querySelector', 'querySelectorAll', 'getElement'], ans: 2 },
      { q: 'What does `element.textContent = "x"` do?', opts: ['Adds HTML', 'Sets plain text content', 'Appends text', 'Hides element'], ans: 1 },
      { q: 'What does `classList.toggle("active")` do?', opts: ['Always adds', 'Always removes', 'Adds if absent, removes if present', 'Error'], ans: 2 },
      { q: 'What does `addEventListener` attach?', opts: ['CSS class', 'Event handler', 'Attribute', 'Child element'], ans: 1 },
      { q: 'Which method creates a new DOM element?', opts: ['document.new()', 'document.createElement()', 'DOM.create()', 'element.make()'], ans: 1 },
      { q: 'What does `innerHTML` allow that `textContent` does not?', opts: ['Setting bold text', 'Inserting HTML markup', 'Faster performance', 'Event binding'], ans: 1 },
      { q: 'What does `e.target` refer to in an event handler?', opts: ['The event type', 'The element that triggered the event', 'The window', 'The document'], ans: 1 },
    ]
  },

  /* ─────────── WEB DEV ─────────── */
  web1: {
    icon: '🏗', title: 'HTML Basics', subtitle: 'Lesson 1 · Web Dev',
    content: `<strong>HTML</strong> (HyperText Markup Language) structures web pages with elements.<br><br>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;CodeQuest&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Main Heading&lt;/h1&gt;
    &lt;p&gt;Paragraph text&lt;/p&gt;
    &lt;a href="https://example.com"&gt;Link&lt;/a&gt;
    &lt;img src="hero.png" alt="Hero"&gt;
    &lt;ul&gt;
      &lt;li&gt;Item 1&lt;/li&gt;
      &lt;li&gt;Item 2&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
Elements have <strong>opening tag</strong>, optional <strong>content</strong>, and <strong>closing tag</strong>. Some are <em>self-closing</em> (img, br, input).`,
    quizzes: [
      { q: 'Which tag defines the largest heading?', opts: ['<h6>', '<big>', '<h1>', '<header>'], ans: 2 },
      { q: 'What does `<!DOCTYPE html>` declare?', opts: ['A comment', 'HTML5 document type', 'Server type', 'CSS reset'], ans: 1 },
      { q: 'Which tag creates a hyperlink?', opts: ['<link>', '<href>', '<a>', '<url>'], ans: 2 },
      { q: 'What attribute provides alt text for images?', opts: ['title', 'src', 'alt', 'caption'], ans: 2 },
      { q: 'Which element is self-closing?', opts: ['<p>', '<div>', '<img>', '<section>'], ans: 2 },
      { q: 'Where does page metadata go?', opts: ['<body>', '<footer>', '<head>', '<meta>'], ans: 2 },
      { q: 'Which creates an unordered list?', opts: ['<ol>', '<ul>', '<dl>', '<list>'], ans: 1 },
    ]
  },

  web2: {
    icon: '🎨', title: 'CSS Styling', subtitle: 'Lesson 2 · Web Dev',
    content: `<strong>CSS</strong> (Cascading Style Sheets) controls visual presentation.<br><br>
<pre>/* Selector types */
h1       { color: purple; }         /* element */
.hero    { font-size: 18px; }       /* class */
#main    { background: #0F0A1E; }   /* id */
a:hover  { text-decoration: none; } /* pseudo-class */

/* Box model */
.card {
  width: 300px;
  padding: 20px;    /* inside border */
  border: 2px solid #7C3AED;
  margin: 16px;     /* outside border */
}

/* CSS Variables */
:root {
  --primary: #7C3AED;
  --bg: #0F0A1E;
}
.btn { background: var(--primary); }</pre>`,
    quizzes: [
      { q: 'Which CSS selector targets a class?', opts: ['#hero', '.hero', 'hero', '*hero'], ans: 1 },
      { q: 'What does `padding` control in the box model?', opts: ['Space outside the border', 'Space inside the border', 'Border thickness', 'Element width'], ans: 1 },
      { q: 'Which property sets text color?', opts: ['font-color', 'text-color', 'color', 'foreground'], ans: 2 },
      { q: 'What does `a:hover` target?', opts: ['All links', 'Visited links', 'Links being hovered', 'Active links'], ans: 2 },
      { q: 'How do you use a CSS variable `--primary`?', opts: ['$primary', 'var(--primary)', '@primary', '#primary'], ans: 1 },
      { q: 'What does `margin: auto` do on a block element with fixed width?', opts: ['Removes margin', 'Centers the element horizontally', 'Adds padding', 'Collapses margin'], ans: 1 },
      { q: 'Which selector has highest specificity?', opts: ['element', '.class', '#id', '*'], ans: 2 },
    ]
  },

  web3: {
    icon: '📐', title: 'Flexbox', subtitle: 'Lesson 3 · Web Dev',
    content: `<strong>Flexbox</strong> is a 1D layout system for rows or columns.<br><br>
<pre>.container {
  display: flex;
  flex-direction: row;       /* or column */
  justify-content: center;   /* main axis alignment */
  align-items: center;       /* cross axis alignment */
  gap: 16px;                 /* space between items */
  flex-wrap: wrap;           /* allow wrapping */
}

.item {
  flex: 1;                   /* grow equally */
  flex-grow: 2;              /* grow twice as much */
  flex-shrink: 0;            /* don't shrink */
  align-self: flex-start;    /* override align-items */
}</pre>
<strong>Key values:</strong> <code>justify-content</code>: flex-start | center | flex-end | space-between | space-around`,
    quizzes: [
      { q: 'What CSS property activates Flexbox?', opts: ['layout: flex', 'display: flex', 'flex: true', 'flex-mode: on'], ans: 1 },
      { q: 'Which property aligns items on the MAIN axis?', opts: ['align-items', 'align-content', 'justify-content', 'flex-direction'], ans: 2 },
      { q: 'What does `align-items: center` do?', opts: ['Centers horizontally', 'Centers on cross axis', 'Wraps items', 'Stretches items'], ans: 1 },
      { q: 'What does `flex: 1` mean?', opts: ['Fixed 1px width', 'Item takes equal share of space', 'Item has 1 column', 'Item shrinks to 1px'], ans: 1 },
      { q: 'What does `flex-wrap: wrap` do?', opts: ['Breaks text', 'Allows items to wrap to next line', 'Hides overflow', 'Adds padding'], ans: 1 },
      { q: 'What is the default `flex-direction`?', opts: ['column', 'row-reverse', 'row', 'column-reverse'], ans: 2 },
      { q: 'Which value of `justify-content` spaces items with equal gaps between?', opts: ['space-around', 'space-between', 'space-evenly', 'center'], ans: 1 },
    ]
  },

  /* ─────────── JAVA ─────────── */
  java1: {
    icon: '⚙️', title: 'Java Setup & JVM', subtitle: 'Lesson 1 · Java',
    content: `Java runs on the <strong>JVM</strong> (Java Virtual Machine) — write once, run anywhere.<br><br>
<pre>// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, CodeQuest!");

        // Variables are statically typed
        int level     = 5;
        double xp     = 1240.5;
        String name   = "Hero";
        boolean alive = true;

        System.out.println(name + " is level " + level);
    }
}</pre>
<strong>Compile:</strong> <code>javac HelloWorld.java</code><br>
<strong>Run:</strong> <code>java HelloWorld</code><br><br>
Java is <em>statically typed</em> — you must declare variable types.`,
    quizzes: [
      { q: 'What does JVM stand for?', opts: ['Java Variable Machine', 'Java Virtual Machine', 'Java Visual Manager', 'Just-in-time VM'], ans: 1 },
      { q: 'Which command compiles a Java file?', opts: ['java', 'jvm', 'javac', 'compile'], ans: 2 },
      { q: 'What is Java\'s entry point method signature?', opts: ['void main()', 'public main()', 'public static void main(String[] args)', 'static start()'], ans: 2 },
      { q: 'How do you print in Java?', opts: ['print("x")', 'echo("x")', 'System.out.println("x")', 'console.log("x")'], ans: 2 },
      { q: 'Java is __ typed, Python is __ typed.', opts: ['dynamic / static', 'static / dynamic', 'Both dynamic', 'Both static'], ans: 1 },
      { q: 'What type stores a decimal number in Java?', opts: ['int', 'float (or double)', 'decimal', 'num'], ans: 1 },
      { q: 'What is the file extension for Java source files?', opts: ['.jav', '.java', '.class', '.jvm'], ans: 1 },
    ]
  },

  java2: {
    icon: '🔢', title: 'Java Data Types', subtitle: 'Lesson 2 · Java',
    content: `Java has <strong>primitive</strong> and <strong>reference</strong> types.<br><br>
<pre>// Primitives
int    age    = 25;          // 32-bit integer
long   big    = 9999999999L; // 64-bit
double gpa    = 3.9;         // 64-bit float
float  temp   = 98.6f;       // 32-bit float
char   grade  = 'A';         // single character
boolean win   = true;

// Reference types
String  name  = "Hero";
int[]   scores = {90, 85, 95};

// Type casting
int    x = (int) 9.7;        // 9 (truncates)
double d = (double) 5 / 2;   // 2.5

// Wrapper classes
Integer boxed = Integer.valueOf(42);
int unboxed   = boxed.intValue();</pre>`,
    quizzes: [
      { q: 'Which is NOT a Java primitive type?', opts: ['int', 'String', 'boolean', 'char'], ans: 1 },
      { q: 'What does `(int) 9.7` evaluate to?', opts: ['10', '9', '9.7', 'Error'], ans: 1 },
      { q: 'What suffix denotes a `long` literal?', opts: ['d', 'f', 'L', 'l'], ans: 2 },
      { q: 'What is the default value of an `int` field in Java?', opts: ['null', '1', '0', 'undefined'], ans: 2 },
      { q: 'What is a wrapper class?', opts: ['A class that wraps a file', 'An object form of a primitive', 'A design pattern', 'A collection type'], ans: 1 },
      { q: 'What does `double d = (double)5/2` return?', opts: ['2', '2.0', '2.5', 'Error'], ans: 2 },
      { q: 'Which type stores a single character in Java?', opts: ['String', 'char', 'letter', 'character'], ans: 1 },
    ]
  },

  /* ─────────── C++ ─────────── */
  cpp1: {
    icon: '👆', title: 'Pointers', subtitle: 'Lesson 1 · C++',
    content: `Pointers store <strong>memory addresses</strong> of variables.<br><br>
<pre>#include &lt;iostream&gt;
using namespace std;

int main() {
    int x = 42;
    int* ptr = &x;        // ptr stores address of x

    cout &lt;&lt; x;            // 42      (value)
    cout &lt;&lt; &x;           // 0x...   (address)
    cout &lt;&lt; ptr;          // 0x...   (same address)
    cout &lt;&lt; *ptr;         // 42      (dereference)

    *ptr = 100;           // modifies x via pointer
    cout &lt;&lt; x;            // 100

    // Null pointer
    int* null_ptr = nullptr;
    return 0;
}</pre>`,
    quizzes: [
      { q: 'What does `&x` give you in C++?', opts: ['Value of x', 'Memory address of x', 'Copy of x', 'Reference to x'], ans: 1 },
      { q: 'What does `*ptr` do (where ptr is a pointer)?', opts: ['Gets address', 'Dereferences — gets value at address', 'Multiplies', 'Creates pointer'], ans: 1 },
      { q: 'How do you declare a pointer to int named `p`?', opts: ['int p', 'int& p', 'int* p', 'ptr<int> p'], ans: 2 },
      { q: 'What is `nullptr` in modern C++?', opts: ['0', 'An empty string', 'A null pointer constant', 'Undefined'], ans: 2 },
      { q: 'What does `*ptr = 99` do if ptr points to x?', opts: ['Crashes', 'Copies ptr', 'Sets x to 99', 'Creates new variable'], ans: 2 },
      { q: 'What does a pointer store?', opts: ['The actual value', 'A memory address', 'A type', 'A reference count'], ans: 1 },
      { q: 'Which is the correct way to initialize a null pointer in C++11+?', opts: ['int* p = 0', 'int* p = NULL', 'int* p = nullptr', 'All are valid'], ans: 3 },
    ]
  },

  cpp2: {
    icon: '🧠', title: 'Memory Management', subtitle: 'Lesson 2 · C++',
    content: `C++ gives manual control over heap memory with <code>new</code> and <code>delete</code>.<br><br>
<pre>#include &lt;iostream&gt;
using namespace std;

int main() {
    // Stack allocation (automatic)
    int stack_var = 10;

    // Heap allocation (manual)
    int* heap_var = new int(42);
    cout &lt;&lt; *heap_var;        // 42

    delete heap_var;           // MUST free to avoid leak
    heap_var = nullptr;        // good practice

    // Dynamic array
    int* arr = new int[5];
    arr[0] = 100;
    delete[] arr;              // use delete[] for arrays

    // Smart pointers (modern C++)
    #include &lt;memory&gt;
    auto ptr = make_unique&lt;int&gt;(99); // auto-deletes
    return 0;
}</pre>`,
    quizzes: [
      { q: 'What keyword allocates heap memory in C++?', opts: ['alloc', 'malloc', 'new', 'heap'], ans: 2 },
      { q: 'What happens if you forget `delete` in C++?', opts: ['Crash immediately', 'Memory leak', 'Auto freed', 'Compile error'], ans: 1 },
      { q: 'Which `delete` form is used for arrays?', opts: ['delete arr', 'delete[] arr', 'free(arr)', 'destroy(arr)'], ans: 1 },
      { q: 'What is a smart pointer?', opts: ['Faster raw pointer', 'Auto-manages memory lifetime', 'Pointer with type check', 'Null-safe pointer'], ans: 1 },
      { q: 'What is the difference between stack and heap?', opts: ['No difference', 'Stack is auto-managed; heap is manual', 'Heap is faster', 'Stack is unlimited'], ans: 1 },
      { q: 'What does `make_unique<int>(99)` do?', opts: ['Creates raw pointer', 'Creates a unique_ptr that auto-deletes', 'Allocates array of 99', 'Error'], ans: 1 },
      { q: 'After `delete ptr`, what should you set ptr to?', opts: ['0', 'null', 'nullptr', '-1'], ans: 2 },
    ]
  },

  /* ─────────── DSA ─────────── */
  dsa1: {
    icon: '📋', title: 'Arrays', subtitle: 'Lesson 1 · Data Structures',
    content: `Arrays are fixed-size, contiguous memory blocks with O(1) random access.<br><br>
<pre># Python list (dynamic array)
arr = [10, 20, 30, 40, 50]

# Access — O(1)
print(arr[0])      # 10
print(arr[-1])     # 50

# Search — O(n)
print(10 in arr)   # True

# Insert at end — O(1) amortized
arr.append(60)

# Insert at position — O(n)
arr.insert(2, 99)

# Delete — O(n)
arr.pop(0)         # remove first

# Slice — O(k)
sub = arr[1:4]     # elements 1,2,3</pre>
<strong>Big O:</strong> Access O(1) · Search O(n) · Insert/Delete at end O(1) · Insert/Delete middle O(n)`,
    quizzes: [
      { q: 'What is the time complexity of array random access?', opts: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], ans: 2 },
      { q: 'What is the time complexity of linear search in an unsorted array?', opts: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], ans: 2 },
      { q: 'What is the time complexity of inserting at the BEGINNING of an array?', opts: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], ans: 2 },
      { q: 'Arrays store elements in ____ memory.', opts: ['Random', 'Contiguous', 'Heap-only', 'Linked'], ans: 1 },
      { q: 'What does `arr[-1]` return in Python?', opts: ['Error', 'First element', 'Last element', '-1'], ans: 2 },
      { q: 'What is `arr[1:4]` called?', opts: ['Indexing', 'Splicing', 'Slicing', 'Popping'], ans: 2 },
      { q: 'Which operation is O(1) amortized for dynamic arrays?', opts: ['Insert at start', 'Delete from middle', 'Append to end', 'Search'], ans: 2 },
    ]
  },

  dsa2: {
    icon: '🔗', title: 'Linked Lists', subtitle: 'Lesson 2 · Data Structures',
    content: `A linked list is a chain of <strong>nodes</strong>, each holding data and a pointer to the next node.<br><br>
<pre>class Node:
    def __init__(self, val):
        self.val = val
        self.next = None   # pointer to next node

class LinkedList:
    def __init__(self):
        self.head = None   # start of list

    def append(self, val):
        new = Node(val)
        if not self.head:
            self.head = new; return
        cur = self.head
        while cur.next:    # traverse to end — O(n)
            cur = cur.next
        cur.next = new

    def prepend(self, val):  # O(1)
        new = Node(val)
        new.next = self.head
        self.head = new</pre>
<strong>Big O:</strong> Access O(n) · Prepend O(1) · Append O(n) · Delete head O(1)`,
    quizzes: [
      { q: 'What does each node in a linked list contain?', opts: ['Only data', 'Data and index', 'Data and pointer to next', 'Key and value'], ans: 2 },
      { q: 'What is the time complexity of prepending to a linked list?', opts: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], ans: 1 },
      { q: 'What is the time complexity of accessing the k-th element?', opts: ['O(1)', 'O(log n)', 'O(k) = O(n)', 'O(k²)'], ans: 2 },
      { q: 'What does `head` point to?', opts: ['Last node', 'Middle node', 'First node', 'Null'], ans: 2 },
      { q: 'Linked lists use ____ memory; arrays use ____ memory.', opts: ['contiguous / scattered', 'scattered / contiguous', 'Both contiguous', 'Both scattered'], ans: 1 },
      { q: 'What is a doubly linked list?', opts: ['Two separate lists', 'Nodes with next AND prev pointers', 'List of pairs', 'Circular list'], ans: 1 },
      { q: 'When is a linked list preferred over an array?', opts: ['Random access needed', 'Frequent insertions/deletions at head', 'Memory is limited', 'Sorting required'], ans: 1 },
    ]
  },

  dsa3: {
    icon: '📚', title: 'Stacks', subtitle: 'Lesson 3 · Data Structures',
    content: `A stack is a <strong>LIFO</strong> (Last In, First Out) structure.<br><br>
<pre>stack = []

stack.append(1)   # push — O(1)
stack.append(2)
stack.append(3)
print(stack)       # [1, 2, 3]

top = stack[-1]    # peek — O(1)
print(top)         # 3

popped = stack.pop()  # pop — O(1)
print(popped)      # 3
print(stack)       # [1, 2]

# Real-world uses:
# - Undo/redo operations
# - Call stack (function calls)
# - Bracket matching: ( [ { } ] )
# - Backtracking algorithms</pre>`,
    quizzes: [
      { q: 'What does LIFO stand for?', opts: ['Last In First Out', 'Last In Fixed Order', 'Linear Input First Output', 'Linked Index First Out'], ans: 0 },
      { q: 'Which operation adds to a stack?', opts: ['enqueue', 'push', 'insert', 'add'], ans: 1 },
      { q: 'Which operation removes from a stack?', opts: ['dequeue', 'shift', 'pop', 'remove'], ans: 2 },
      { q: 'What does `peek` do on a stack?', opts: ['Removes top', 'Returns top without removing', 'Clears stack', 'Reverses stack'], ans: 1 },
      { q: 'What is the time complexity of push and pop?', opts: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], ans: 2 },
      { q: 'Which real-world concept uses a stack?', opts: ['Queue system', 'Function call stack', 'Database indexing', 'Round-robin scheduling'], ans: 1 },
      { q: 'If you push 1,2,3 and pop once, what remains on top?', opts: ['1', '2', '3', 'Empty'], ans: 1 },
    ]
  },

  dsa6: {
    icon: '🔄', title: 'Bubble Sort', subtitle: 'Lesson 6 · Algorithms',
    content: `Bubble Sort repeatedly swaps adjacent elements that are out of order.<br><br>
<pre>def bubble_sort(arr):
    n = len(arr)
    for i in range(n):                  # n passes
        swapped = False
        for j in range(0, n-i-1):       # shrinks each pass
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped:                 # already sorted
            break
    return arr

print(bubble_sort([64,34,25,12,22,11,90]))
# [11,12,22,25,34,64,90]</pre>
<strong>Complexity:</strong><br>
Best: O(n) · Average: O(n²) · Worst: O(n²)<br>
Space: O(1) (in-place) · <em>Stable</em> sort`,
    quizzes: [
      { q: 'What is the worst-case time complexity of Bubble Sort?', opts: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], ans: 2 },
      { q: 'What is the best-case time complexity with the optimization?', opts: ['O(n²)', 'O(n)', 'O(log n)', 'O(1)'], ans: 1 },
      { q: 'What optimization stops early if no swaps occurred?', opts: ['Skip flag', 'Break after first pass', 'The `swapped` flag check', 'Recursion limit'], ans: 2 },
      { q: 'Bubble sort is a ____ sort.', opts: ['Unstable', 'Stable', 'Comparison-free', 'Recursive only'], ans: 1 },
      { q: 'What is the space complexity of bubble sort?', opts: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], ans: 3 },
      { q: 'After the first full pass, what is guaranteed?', opts: ['Array is sorted', 'Largest element is at end', 'Smallest is at start', 'Array is halved'], ans: 1 },
      { q: 'Bubble sort is practical for:', opts: ['Large datasets', 'Nearly sorted or tiny arrays', 'All use cases', 'Only strings'], ans: 1 },
    ]
  },

  dsa7: {
    icon: '🔍', title: 'Binary Search', subtitle: 'Lesson 7 · Algorithms',
    content: `Binary Search finds an element in a <strong>sorted</strong> array in O(log n) time.<br><br>
<pre>def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2   # midpoint

        if arr[mid] == target:
            return mid              # found!
        elif arr[mid] < target:
            left = mid + 1          # search right half
        else:
            right = mid - 1         # search left half

    return -1                       # not found

sorted_arr = [2, 5, 8, 12, 16, 23, 38, 56]
print(binary_search(sorted_arr, 23))  # 5 (index)</pre>
<strong>Key requirement:</strong> Array MUST be sorted.<br>
<strong>Complexity:</strong> O(log n) time · O(1) space`,
    quizzes: [
      { q: 'What is the time complexity of Binary Search?', opts: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], ans: 2 },
      { q: 'What is the prerequisite for Binary Search?', opts: ['Array must be reversed', 'Array must be sorted', 'Array must have even length', 'No prerequisite'], ans: 1 },
      { q: 'What does Binary Search return if the element is NOT found?', opts: ['0', 'null', '-1 (by convention)', 'Throws an error'], ans: 2 },
      { q: 'After each step, Binary Search eliminates ____ of the search space.', opts: ['1 element', 'A quarter', 'Half', 'All but 1'], ans: 2 },
      { q: 'How many comparisons for 1024 elements worst-case?', opts: ['1024', '512', '10', '32'], ans: 2 },
      { q: 'What is `mid = (left + right) // 2` computing?', opts: ['Average value', 'Midpoint index', 'Target guess', 'Array length'], ans: 1 },
      { q: 'Binary Search is O(log n) because:', opts: ['It uses recursion', 'It divides the search space in half each time', 'It sorts first', 'It uses hash maps'], ans: 1 },
    ]
  },

}; // end LESSON_CONTENT

const QUESTS = {
  daily: [
    { id: 'dq1', icon: '🧩', title: 'Solve 3 Quizzes', desc: 'Complete any 3 lesson quizzes', xp: 50, coins: 10, progress: 1, total: 3, completed: false },
    { id: 'dq2', icon: '📚', title: 'Complete 1 Lesson', desc: 'Finish any lesson today', xp: 75, coins: 15, progress: 1, total: 1, completed: true },
    { id: 'dq3', icon: '🔥', title: 'Keep Your Streak', desc: 'Log in and complete activity', xp: 30, coins: 5, progress: 1, total: 1, completed: true },
    { id: 'dq4', icon: '⚡', title: 'Earn 100 XP', desc: 'Gain 100 XP in a single session', xp: 50, coins: 10, progress: 60, total: 100, completed: false },
  ],
  weekly: [
    { id: 'wq1', icon: '📖', title: 'Finish 5 Chapters', desc: 'Complete 5 lessons this week', xp: 200, coins: 50, progress: 3, total: 5, completed: false },
    { id: 'wq2', icon: '⚔', title: 'Win 2 Battles', desc: 'Win 2 coding duels', xp: 300, coins: 75, progress: 1, total: 2, completed: false },
    { id: 'wq3', icon: '🏆', title: 'Reach Top 50', desc: 'Climb to top 50 on leaderboard', xp: 500, coins: 100, progress: 1, total: 1, completed: false },
    { id: 'wq4', icon: '🌐', title: '3 Languages', desc: 'Study 3 different languages', xp: 250, coins: 60, progress: 2, total: 3, completed: false },
  ]
};

const REWARDS_STORE = [
  { id: 'r1', name: 'Gold Coder', icon: '🥇', type: 'badge', price: 100, owned: true },
  { id: 'r2', name: 'Bug Hunter', icon: '🐛', type: 'badge', price: 150, owned: false },
  { id: 'r3', name: 'Dark Mode Pro', icon: '🌙', type: 'theme', price: 200, owned: false },
  { id: 'r4', name: 'Neon Theme', icon: '💜', type: 'theme', price: 250, owned: false },
  { id: 'r5', name: 'Wizard Avatar', icon: '🧙‍♂️', type: 'avatar', price: 300, owned: false },
  { id: 'r6', name: 'Robot Avatar', icon: '🤖', type: 'avatar', price: 300, owned: false },
  { id: 'r7', name: 'Dragon Badge', icon: '🐉', type: 'badge', price: 500, owned: false },
  { id: 'r8', name: 'Ninja Avatar', icon: '🥷', type: 'avatar', price: 350, owned: false },
  { id: 'r9', name: 'Matrix Theme', icon: '💚', type: 'theme', price: 400, owned: false },
  { id: 'r10', name: 'Champion Badge', icon: '🏆', type: 'badge', price: 600, owned: false },
];

const LEADERBOARD = [
  { rank: 1, name: 'NightCoder_X', avatar: '🦸', xp: 12480, streak: 45, country: '🇺🇸' },
  { rank: 2, name: 'PyThonMaster', avatar: '🧙', xp: 11320, streak: 30, country: '🇮🇳' },
  { rank: 3, name: 'AlgoKing', avatar: '👑', xp: 10950, streak: 28, country: '🇬🇧' },
  { rank: 4, name: 'CodeWizard99', avatar: '🔮', xp: 9800, streak: 22, country: '🇩🇪' },
  { rank: 5, name: 'JSHero', avatar: '⚡', xp: 9200, streak: 19, country: '🇧🇷' },
  { rank: 6, name: 'DataDragon', avatar: '🐉', xp: 8700, streak: 15, country: '🇨🇳' },
  { rank: 7, name: 'BugSlayer', avatar: '🗡️', xp: 8100, streak: 12, country: '🇯🇵' },
  { rank: 8, name: 'StackBoss', avatar: '🧱', xp: 7600, streak: 10, country: '🇰🇷' },
  { rank: 42, name: 'Alex Hero', avatar: '🧙‍♂️', xp: 1240, streak: 7, country: '🇮🇳', isYou: true },
];

const USER_BADGES = [
  { icon: '🥇', name: 'Gold Coder', owned: true },
  { icon: '🔥', name: 'Streak 7', owned: true },
  { icon: '🐍', name: 'Python Pro', owned: true },
  { icon: '⚡', name: 'Speed Coder', owned: false },
  { icon: '🏆', name: 'Champion', owned: false },
  { icon: '🐉', name: 'Dragon', owned: false },
];

const ARENA_PROBLEMS = [
  'Write a function that returns the sum of all even numbers in an array.',
  'Reverse a string without using built-in reverse methods.',
  'Find the largest number in an array without using Math.max.',
  'Check if a string is a palindrome.',
  'Count the number of vowels in a string.',
  'Write a function to calculate factorial of a number using recursion.',
  'Find the second largest element in an array.',
  'Remove duplicates from an array.',
];

// ═══════════════════════════════════════════
// APP STATE
// ═══════════════════════════════════════════

let appState = {
  user: { name: 'Alex Hero', email: 'alex@codequest.io', avatar: '🧙' },
  xp: 1240,
  coins: 320,
  streak: 7,
  level: 5,
  currentLang: 'python',
  currentPage: 'home',
  battleTimer: null,
  questTimer: null,
};

// Load from localStorage if exists
function loadState() {
  const saved = localStorage.getItem('codequest_state');
  if (saved) {
    try { Object.assign(appState, JSON.parse(saved)); } catch (e) {}
  }
  const savedUser = localStorage.getItem('codequest_user');
  if (savedUser) {
    try { appState.user = JSON.parse(savedUser); } catch (e) {}
  }
}

function saveState() {
  localStorage.setItem('codequest_state', JSON.stringify({
    xp: appState.xp, coins: appState.coins, streak: appState.streak, level: appState.level
  }));
  localStorage.setItem('codequest_user', JSON.stringify(appState.user));
}

// ═══════════════════════════════════════════
// AUTH LOGIC
// ═══════════════════════════════════════════

function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));

  if (tab === 'login') {
    document.getElementById('loginTab').classList.add('active');
    document.getElementById('signupTab').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
  } else if (tab === 'signup') {
    document.getElementById('signupTab').classList.add('active');
    document.getElementById('loginTab').classList.remove('active');
    document.getElementById('signupForm').classList.add('active');
  }
}

function showForgot() {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  document.getElementById('forgotForm').classList.add('active');
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPassword').value;

  if (!email || !pass) { showToast('Please fill all fields', 'error'); return; }

  // Simulate login
  appState.user.email = email;
  appState.user.name = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ') || 'Hero';
  saveState();
  showToast('✅ Logged in! Redirecting...', 'success');
  setTimeout(() => window.location.href = 'dashboard.html', 1200);
}

function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const pass = document.getElementById('signupPassword').value;
  if (!name || !email || !pass) { showToast('Please fill all fields', 'error'); return; }
  appState.user = { name, email, avatar: '🧙' };
  saveState();
  showToast('🎉 Account created! Welcome, ' + name, 'success');
  setTimeout(() => window.location.href = 'dashboard.html', 1200);
}

function demoLogin() {
  appState.user = { name: 'Demo Hero', email: 'demo@codequest.io', avatar: '🧙' };
  saveState();
  showToast('🎮 Demo mode activated!', 'success');
  setTimeout(() => window.location.href = 'dashboard.html', 1000);
}

function sendReset() {
  showToast('📨 Reset link sent to your email!', 'success');
}

function togglePassword(id) {
  const el = document.getElementById(id);
  el.type = el.type === 'password' ? 'text' : 'password';
}

// Password strength meter
const pwInput = document.getElementById('signupPassword');
if (pwInput) {
  pwInput.addEventListener('input', () => {
    const val = pwInput.value;
    const fill = document.getElementById('strengthFill');
    const text = document.getElementById('strengthText');
    let strength = 0;
    if (val.length >= 8) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    const map = [
      { pct: '25%', color: '#EF4444', label: 'Weak' },
      { pct: '50%', color: '#F59E0B', label: 'Fair' },
      { pct: '75%', color: '#3B82F6', label: 'Good' },
      { pct: '100%', color: '#10B981', label: 'Strong 💪' },
    ];
    if (fill && strength > 0) {
      fill.style.width = map[strength - 1].pct;
      fill.style.background = map[strength - 1].color;
      text.textContent = map[strength - 1].label;
    } else if (fill) {
      fill.style.width = '0';
      text.textContent = 'Password strength';
    }
  });
}

// ═══════════════════════════════════════════
// DASHBOARD INIT
// ═══════════════════════════════════════════

function initDashboard() {
  loadState();
  updateHeader();
  updateSidebar();
  renderLearningPath('python');
  renderQuests();
  renderRewards('all');
  renderLeaderboard('global');
  renderProfile();
  startQuestTimer();
}

function updateHeader() {
  const name = appState.user.name || 'Hero';
  if (document.getElementById('welcomeName')) document.getElementById('welcomeName').textContent = name.split(' ')[0];
  if (document.getElementById('wbStreak')) document.getElementById('wbStreak').textContent = appState.streak + '-day';
  if (document.getElementById('xpDisplay')) document.getElementById('xpDisplay').textContent = appState.xp.toLocaleString();
  if (document.getElementById('coinsDisplay')) document.getElementById('coinsDisplay').textContent = appState.coins.toLocaleString();
  if (document.getElementById('streakCount')) document.getElementById('streakCount').textContent = appState.streak;
  if (document.getElementById('totalXP')) document.getElementById('totalXP').textContent = appState.xp.toLocaleString();
  if (document.getElementById('totalCoins')) document.getElementById('totalCoins').textContent = appState.coins.toLocaleString();
  if (document.getElementById('userRank')) document.getElementById('userRank').textContent = '42';
}

function updateSidebar() {
  const name = appState.user.name || 'Alex Hero';
  if (document.getElementById('sidebarUsername')) {
    document.getElementById('sidebarUsername').textContent = name;
  }
  if (document.getElementById('avatarInitialSidebar')) {
    document.getElementById('avatarInitialSidebar').textContent = name[0].toUpperCase();
  }
  if (document.getElementById('sidebarLevel')) {
    document.getElementById('sidebarLevel').textContent = appState.level;
  }
  const xpPct = ((appState.xp % 1000) / 1000 * 100).toFixed(0);
  if (document.getElementById('sidebarXPBar')) document.getElementById('sidebarXPBar').style.width = xpPct + '%';
  if (document.getElementById('sidebarXPText')) {
    document.getElementById('sidebarXPText').textContent = `${appState.xp % 1000}/1000 XP`;
  }
}

// ═══════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════

function setPage(page, el) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  appState.currentPage = page;

  const titles = {
    home: '🏠 Home', quests: '📜 Quests', rewards: '🎁 Rewards',
    leaderboard: '🏆 Leaderboard', compete: '⚔ Compete', profile: '🧙 Profile',
    avatar: '🎭 Avatar Customizer'
  };
  if (document.getElementById('pageTitle')) {
    document.getElementById('pageTitle').textContent = titles[page] || page;
  }

  // Close sidebar on mobile
  if (window.innerWidth < 768) {
    document.getElementById('sidebar').classList.remove('open');
  }

  // Re-draw avatar when switching to that page
  if (page === 'avatar') {
    requestAnimationFrame(() => {
      try {
        if (typeof initAvatar === 'function') initAvatar();
      } catch(e) { console.warn('Avatar page switch:', e); }
    });
  }

  return false;
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

function logout() {
  localStorage.removeItem('codequest_state');
  localStorage.removeItem('codequest_user');
  window.location.href = 'login.html';
}

// ═══════════════════════════════════════════
// LEARNING PATH
// ═══════════════════════════════════════════

function selectLang(lang, el) {
  document.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  appState.currentLang = lang;
  renderLearningPath(lang);
}

function renderLearningPath(lang) {
  const container = document.getElementById('learningPath');
  if (!container) return;
  const path = LEARNING_PATHS[lang];
  if (!path) return;

  container.innerHTML = '';

  path.units.forEach((unit, unitIdx) => {
    if (unit.isMission) {
      // Mission node
      const missionWrap = document.createElement('div');
      missionWrap.className = 'path-unit';
      missionWrap.innerHTML = `
        <div class="mission-separator">
          <span class="mission-badge">⚔ MISSION UNLOCK</span>
        </div>
        <div class="path-nodes" style="padding: 20px 0">
          <div class="path-node-wrapper" style="justify-content:center!important;padding:0!important">
            <div class="path-node" onclick="startMission('${unit.id}')">
              <div class="node-circle mission">⚔</div>
              <div class="node-label" style="color:var(--accent);font-weight:700">${unit.title.replace('🏆 MISSION: ', '')}</div>
              <div class="node-xp" style="background:rgba(245,158,11,0.15);color:var(--accent)">+${unit.xp} XP</div>
            </div>
          </div>
        </div>
      `;
      container.appendChild(missionWrap);
    } else {
      const unitEl = document.createElement('div');
      unitEl.className = 'path-unit';

      const label = document.createElement('div');
      label.className = 'unit-label';
      label.textContent = unit.title;
      unitEl.appendChild(label);

      const nodesEl = document.createElement('div');
      nodesEl.className = 'path-nodes';

      unit.lessons.forEach((lesson, i) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'path-node-wrapper';
        wrapper.style.animationDelay = (i * 0.05) + 's';

        const circleClass = lesson.locked ? 'locked' : lesson.completed ? 'completed' : '';
        const clickable = !lesson.locked ? `onclick="openLesson('${lesson.id}')"` : '';

        wrapper.innerHTML = `
          <div class="path-node" ${clickable} style="${lesson.locked ? '' : 'cursor:none'}">
            <div class="node-circle ${circleClass}">${lesson.completed ? '✅' : lesson.locked ? '🔒' : lesson.icon}</div>
            <div class="node-label">${lesson.name}</div>
            <div class="node-xp">+${lesson.xp} XP</div>
          </div>
        `;
        nodesEl.appendChild(wrapper);
      });

      unitEl.appendChild(nodesEl);
      container.appendChild(unitEl);
    }
  });
}

// ═══════════════════════════════════════════
// LESSON MODAL
// ═══════════════════════════════════════════

// ═══════════════════════════════════════════
// LESSON MODAL — Multi-question quiz engine
// ═══════════════════════════════════════════

let currentLesson   = null;
let quizState       = { idx: 0, score: 0, answers: [], total: 0 };

function openLesson(id) {
  const data = LESSON_CONTENT[id];
  const modal = document.getElementById('lessonModal');
  if (!modal) return;

  // Look up path data for XP value
  let lessonData = null;
  for (const lang of Object.values(LEARNING_PATHS)) {
    for (const unit of lang.units) {
      if (!unit.isMission && unit.lessons) {
        const found = unit.lessons.find(l => l.id === id);
        if (found) { lessonData = found; break; }
      }
    }
  }

  // Fallback content for lessons without explicit content
  const defaultContent = {
    icon: lessonData?.icon || '📚',
    title: lessonData?.name || 'Lesson',
    subtitle: 'Complete this lesson to earn XP',
    content: `<strong>${lessonData?.name || 'Lesson'}</strong><br><br>
This lesson covers fundamental concepts. Study the material and answer the quiz questions!<br><br>
<pre>// Example
function solve(input) {
  // Your logic here
  return input;
}</pre>`,
    quizzes: [
      { q: 'What does a function return if no return statement exists?', opts: ['"" (empty string)', '0', 'Nothing / undefined / None', 'Error'], ans: 2 },
      { q: 'Which symbol starts a comment in most languages?', opts: ['//', '**', '##', '<<'], ans: 0 },
      { q: 'What does DRY stand for in programming?', opts: ["Don't Repeat Yourself", 'Define Reliable Yield', 'Dynamic Runtime Yield', 'Debug Run Yell'], ans: 0 },
    ]
  };

  const content = data || defaultContent;
  currentLesson = { id, xp: lessonData?.xp || 50, data: content };

  // Init quiz state
  const qs = content.quizzes || [];
  quizState = { idx: 0, score: 0, answers: new Array(qs.length).fill(null), total: qs.length };

  // Render modal header and content
  document.getElementById('modalIcon').textContent = content.icon;
  document.getElementById('modalTitle').textContent = content.title;
  document.getElementById('modalSubtitle').textContent = content.subtitle;
  document.getElementById('lessonContent').innerHTML = content.content;

  // Render quiz panel
  renderQuizQuestion();

  // Update action button
  const nextBtn = document.getElementById('lessonNextBtn');
  if (nextBtn) {
    nextBtn.textContent = 'Submit Answer ➜';
    nextBtn.onclick = advanceQuiz;
  }

  modal.classList.add('open');
}

/* ── Render one question ── */
function renderQuizQuestion() {
  const quizEl = document.getElementById('lessonQuiz');
  if (!quizEl) return;

  const qs = currentLesson.data.quizzes || [];
  if (!qs.length) { quizEl.innerHTML = ''; return; }

  const { idx, total, score } = quizState;

  if (idx >= total) {
    renderQuizResults();
    return;
  }

  const q = qs[idx];
  const answered = quizState.answers[idx] !== null;

  quizEl.innerHTML = `
    <div class="quiz-header">
      <div class="quiz-progress-row">
        <span class="quiz-counter">Question ${idx + 1} / ${total}</span>
        <span class="quiz-score-live">⚡ ${score}/${idx} correct</span>
      </div>
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width:${(idx/total)*100}%"></div>
      </div>
    </div>

    <div class="quiz-question-card">
      <div class="quiz-q-number">Q${idx + 1}</div>
      <p class="quiz-question-text">${q.q}</p>
    </div>

    <div class="quiz-options">
      ${q.opts.map((opt, i) => {
        let cls = 'quiz-option';
        if (answered) {
          if (i === q.ans) cls += ' correct';
          else if (i === quizState.answers[idx] && i !== q.ans) cls += ' wrong';
          else cls += ' dimmed';
        }
        return `<button class="${cls}" onclick="answerQuiz(${i})" ${answered ? 'disabled' : ''}>
          <span class="opt-letter">${String.fromCharCode(65+i)}</span>
          <span class="opt-text">${opt}</span>
          ${answered && i === q.ans ? '<span class="opt-badge correct-badge">✓</span>' : ''}
          ${answered && i === quizState.answers[idx] && i !== q.ans ? '<span class="opt-badge wrong-badge">✗</span>' : ''}
        </button>`;
      }).join('')}
    </div>

    ${answered ? `
      <div class="quiz-feedback ${quizState.answers[idx] === q.ans ? 'feedback-correct' : 'feedback-wrong'}">
        ${quizState.answers[idx] === q.ans
          ? '🎯 Correct! Well done.'
          : `❌ Not quite. The correct answer is <strong>${String.fromCharCode(65+q.ans)}. ${q.opts[q.ans]}</strong>`}
      </div>
    ` : ''}
  `;

  // Update button text
  const nextBtn = document.getElementById('lessonNextBtn');
  if (nextBtn) {
    if (!answered) {
      nextBtn.textContent = 'Submit Answer ➜';
      nextBtn.style.opacity = '0.5';
    } else {
      nextBtn.style.opacity = '1';
      nextBtn.textContent = idx + 1 < total ? 'Next Question →' : 'See Results 🏆';
    }
  }
}

/* ── Answer a question ── */
function answerQuiz(selectedIdx) {
  if (quizState.answers[quizState.idx] !== null) return; // already answered

  const q = currentLesson.data.quizzes[quizState.idx];
  quizState.answers[quizState.idx] = selectedIdx;

  if (selectedIdx === q.ans) {
    quizState.score++;
    if (typeof showToast === 'function') showToast('🎯 Correct!', 'success');
  } else {
    if (typeof showToast === 'function') showToast('❌ Wrong — check the explanation below', 'error');
  }

  renderQuizQuestion();
}

/* ── Next question / trigger results ── */
function advanceQuiz() {
  const { idx, total, answers } = quizState;

  if (answers[idx] === null) {
    // Must answer before advancing
    if (typeof showToast === 'function') showToast('⚠️ Please select an answer first!', 'warning');
    return;
  }

  if (idx + 1 >= total) {
    renderQuizResults();
  } else {
    quizState.idx++;
    renderQuizQuestion();
  }
}

/* ── Results screen ── */
function renderQuizResults() {
  const quizEl = document.getElementById('lessonQuiz');
  if (!quizEl) return;

  const { score, total } = quizState;
  const pct = Math.round((score / total) * 100);
  const grade = pct >= 85 ? '🏆 Excellent!' : pct >= 60 ? '✅ Good Job!' : '📖 Keep Practicing!';
  const gradeColor = pct >= 85 ? 'var(--success)' : pct >= 60 ? 'var(--primary-light)' : 'var(--accent)';

  quizEl.innerHTML = `
    <div class="quiz-results">
      <div class="qr-grade" style="color:${gradeColor}">${grade}</div>
      <div class="qr-score-big">
        <span class="qr-num">${score}</span>
        <span class="qr-denom">/ ${total}</span>
      </div>
      <div class="qr-pct">${pct}% Accuracy</div>
      <div class="qr-bar-wrap">
        <div class="qr-bar-fill" style="width:0%;background:${gradeColor};transition:width 1s ease"></div>
      </div>
      <div class="qr-breakdown">
        ${currentLesson.data.quizzes.map((q, i) => {
          const answered = quizState.answers[i];
          const isCorrect = answered === q.ans;
          return `<div class="qr-row ${isCorrect ? 'qr-row-ok' : 'qr-row-fail'}">
            <span>${isCorrect ? '✅' : '❌'} Q${i+1}: ${q.q.substring(0,50)}${q.q.length>50?'…':''}</span>
            <span class="qr-row-ans">${isCorrect ? 'Correct' : q.opts[q.ans]}</span>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;

  // Animate bar
  requestAnimationFrame(() => {
    const fill = quizEl.querySelector('.qr-bar-fill');
    if (fill) fill.style.width = pct + '%';
  });

  // Update button to complete
  const nextBtn = document.getElementById('lessonNextBtn');
  if (nextBtn) {
    const xpBonus = Math.round(currentLesson.xp * (pct / 100));
    nextBtn.textContent = `Complete & Earn ${xpBonus} XP ⚡`;
    nextBtn.style.opacity = '1';
    nextBtn.onclick = completeLesson;
  }
}

/* ── Complete lesson and award XP ── */
function completeLesson() {
  if (!currentLesson) return;

  const { score, total } = quizState;
  const pct = total > 0 ? score / total : 0.5;
  const xpGain = Math.max(10, Math.round(currentLesson.xp * pct));
  const coinsGain = Math.floor(xpGain / 5);

  appState.xp += xpGain;
  appState.coins += coinsGain;

  // Mark completed in path
  for (const lang of Object.values(LEARNING_PATHS)) {
    for (const unit of lang.units) {
      if (!unit.isMission && unit.lessons) {
        const found = unit.lessons.find(l => l.id === currentLesson.id);
        if (found) {
          found.completed = true;
          const idx = unit.lessons.indexOf(found);
          if (unit.lessons[idx + 1]) unit.lessons[idx + 1].locked = false;
        }
      }
    }
  }

  closeLesson();
  if (typeof showXPGain === 'function') showXPGain(xpGain);
  if (typeof showCoinGain === 'function') showCoinGain(coinsGain);
  updateHeader();
  updateSidebar();
  renderLearningPath(appState.currentLang);
  saveState();

  // Achievement based on score
  const { score: sc, total: tot } = quizState;
  const accuracy = tot > 0 ? sc / tot : 0;
  if (accuracy === 1) {
    if (typeof showAchievement === 'function') showAchievement('🎯', 'Perfect Score!');
  } else if (accuracy >= 0.7) {
    if (typeof showAchievement === 'function') showAchievement('⚡', 'Fast Learner');
  } else {
    if (typeof showAchievement === 'function') showAchievement('📚', 'Knowledge Seeker');
  }
}

function closeLesson() {
  document.getElementById('lessonModal').classList.remove('open');
  currentLesson = null;
}

// ═══════════════════════════════════════════
// MISSIONS
// ═══════════════════════════════════════════

function startMission(id) {
  const missions = {
    mission1: { name: 'Mini Calculator', desc: 'Build a calculator that handles +, -, *, /' },
    mission2: { name: 'Debug Challenge', desc: 'Find and fix 5 bugs in the provided code' },
    mission_js1: { name: 'Quiz App', desc: 'Build a working quiz app with JavaScript' },
    mission_web1: { name: 'Landing Page', desc: 'Create a responsive landing page' },
    mission_dsa1: { name: 'Sorting Puzzle', desc: 'Implement 3 different sorting algorithms' },
  };
  const m = missions[id];
  if (!m) return;

  showToast(`⚔ Mission Started: ${m.name}!`, 'info');
  // Simulate mission completion after 2s
  setTimeout(() => completeMission(id, m.name), 2000);
}

function completeMission(id, name) {
  const score = Math.floor(Math.random() * 30) + 70;
  const mins = Math.floor(Math.random() * 5) + 1;
  const secs = Math.floor(Math.random() * 60);
  const xpGain = 250;
  const coinsGain = 50;

  document.getElementById('mcScore').textContent = score;
  document.getElementById('mcTime').textContent = `${mins}:${secs.toString().padStart(2,'0')}`;
  document.getElementById('mcXP').textContent = '+' + xpGain;
  document.getElementById('mcCoins').textContent = '+' + coinsGain + ' 🪙';

  appState.xp += xpGain;
  appState.coins += coinsGain;
  updateHeader();
  saveState();

  const overlay = document.getElementById('missionOverlay');
  overlay.classList.add('open');
  launchConfetti();
  setTimeout(() => showAchievement('🏅', name + ' Completed!'), 800);
}

function closeMissionComplete() {
  document.getElementById('missionOverlay').classList.remove('open');
  showToast('🎉 Mission XP and Coins credited!', 'success');
}

// ═══════════════════════════════════════════
// QUESTS
// ═══════════════════════════════════════════

function renderQuests() {
  const daily = document.getElementById('dailyQuests');
  const weekly = document.getElementById('weeklyQuests');
  if (!daily || !weekly) return;

  daily.innerHTML = QUESTS.daily.map(q => questCardHTML(q)).join('');
  weekly.innerHTML = QUESTS.weekly.map(q => questCardHTML(q)).join('');
}

function questCardHTML(q) {
  const pct = Math.min((q.progress / q.total) * 100, 100);
  return `
    <div class="quest-card ${q.completed ? 'completed' : ''}" onclick="claimQuest('${q.id}')">
      <div class="quest-icon-wrap">${q.icon}</div>
      <div class="quest-info">
        <div class="quest-title">${q.title} ${q.completed ? '✅' : ''}</div>
        <div class="quest-desc">${q.desc}</div>
        <div class="quest-bar">
          <div class="quest-bar-fill ${q.completed ? 'complete' : ''}" style="width:${pct}%"></div>
        </div>
      </div>
      <div class="quest-reward">
        <span>⚡ ${q.xp} XP</span>
        <span>🪙 ${q.coins}</span>
        <span style="color:var(--text-muted)">${q.progress}/${q.total}</span>
      </div>
    </div>
  `;
}

function claimQuest(id) {
  const allQuests = [...QUESTS.daily, ...QUESTS.weekly];
  const q = allQuests.find(q => q.id === id);
  if (!q) return;
  if (q.completed) { showToast('Already completed!', 'info'); return; }
  if (q.progress < q.total) { showToast('Quest not finished yet!', 'warning'); return; }

  q.completed = true;
  appState.xp += q.xp;
  appState.coins += q.coins;
  showXPGain(q.xp);
  showCoinGain(q.coins);
  updateHeader();
  saveState();
  renderQuests();
  showToast(`🎉 Quest completed! +${q.xp} XP`, 'success');
}

function startQuestTimer() {
  function tick() {
    const el = document.getElementById('questTimer');
    if (!el) return;
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight - now;
    const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    el.textContent = `${h}:${m}:${s}`;
  }
  tick();
  setInterval(tick, 1000);
}

// ═══════════════════════════════════════════
// REWARDS
// ═══════════════════════════════════════════

let currentFilter = 'all';

function filterRewards(filter, el) {
  currentFilter = filter;
  document.querySelectorAll('.rtab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  renderRewards(filter);
}

function renderRewards(filter) {
  const grid = document.getElementById('rewardsGrid');
  if (!grid) return;

  const filtered = filter === 'all' ? REWARDS_STORE : REWARDS_STORE.filter(r => r.type === filter);

  grid.innerHTML = filtered.map(r => `
    <div class="reward-card ${r.owned ? 'owned' : ''}" onclick="buyReward('${r.id}')">
      <div class="reward-icon">${r.icon}</div>
      <div class="reward-name">${r.name}</div>
      <div class="reward-type">${r.type.charAt(0).toUpperCase() + r.type.slice(1)}</div>
      ${r.owned
        ? '<div class="reward-own-badge">✅ Owned</div>'
        : `<div class="reward-price">🪙 ${r.price}</div>`
      }
    </div>
  `).join('');

  if (document.getElementById('rewardCoinsBalance')) {
    document.getElementById('rewardCoinsBalance').textContent = appState.coins;
  }
}

function buyReward(id) {
  const r = REWARDS_STORE.find(r => r.id === id);
  if (!r) return;
  if (r.owned) { showToast('You already own this!', 'info'); return; }
  if (appState.coins < r.price) { showToast(`Not enough coins! Need 🪙${r.price}`, 'error'); return; }

  appState.coins -= r.price;
  r.owned = true;
  updateHeader();
  saveState();
  renderRewards(currentFilter);
  showToast(`🎉 Unlocked ${r.name}!`, 'success');
  showAchievement(r.icon, r.name + ' Unlocked!');
}

// ═══════════════════════════════════════════
// LEADERBOARD
// ═══════════════════════════════════════════

function filterLB(type, el) {
  document.querySelectorAll('.lbtab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  renderLeaderboard(type);
}

function renderLeaderboard(type) {
  const podium = document.getElementById('podiumRow');
  const list = document.getElementById('lbList');
  if (!podium || !list) return;

  // Podium top 3
  const top3 = LEADERBOARD.slice(0, 3);
  const podiumOrder = [top3[1], top3[0], top3[2]]; // 2nd, 1st, 3rd

  podium.innerHTML = podiumOrder.map((p, i) => {
    const ranks = [2, 1, 3];
    const medals = ['🥈', '🥇', '🥉'];
    return `
      <div class="podium-card rank-${ranks[i]}">
        <div class="podium-avatar">${p.avatar}</div>
        <div class="podium-rank">${medals[i]}</div>
        <div class="podium-name">${p.name}</div>
        <div class="podium-xp">⚡ ${p.xp.toLocaleString()} XP</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px">🔥 ${p.streak} day streak</div>
      </div>
    `;
  }).join('');

  // Rest of leaderboard
  const rest = LEADERBOARD.slice(3);
  list.innerHTML = rest.map(p => `
    <div class="lb-row ${p.isYou ? 'you' : ''}">
      <div class="lb-rank">${p.isYou ? '→' : '#' + p.rank}</div>
      <div class="lb-avatar">${p.avatar}</div>
      <div class="lb-info">
        <div class="lb-name">${p.name} ${p.isYou ? '<span style="color:var(--primary-light);font-size:11px">(You)</span>' : ''}</div>
        <div class="lb-sub">${p.country} 🔥 ${p.streak} streak</div>
      </div>
      <div class="lb-xp">⚡ ${p.xp.toLocaleString()}</div>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════
// COMPETE / BATTLE
// ═══════════════════════════════════════════

let battleSeconds = 300;
let battleInterval = null;

function startBattle(type) {
  const arena = document.getElementById('battleArena');
  if (!arena) return;

  const problem = ARENA_PROBLEMS[Math.floor(Math.random() * ARENA_PROBLEMS.length)];
  document.getElementById('arenaProblem').textContent = problem;
  arena.style.display = 'block';
  arena.scrollIntoView({ behavior: 'smooth', block: 'center' });

  battleSeconds = type === 'quiz' ? 180 : type === 'speed' ? 300 : 480;
  clearInterval(battleInterval);

  battleInterval = setInterval(() => {
    battleSeconds--;
    const mins = Math.floor(battleSeconds / 60);
    const secs = battleSeconds % 60;
    const el = document.getElementById('arenaTimer');
    if (el) el.textContent = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
    if (battleSeconds <= 0) { clearInterval(battleInterval); autoLose(); }
  }, 1000);

  showToast(`⚔ Battle started! Type: ${type}`, 'info');
}

function submitBattle() {
  clearInterval(battleInterval);
  const xpGain = 150;
  const coinsGain = 30;
  appState.xp += xpGain;
  appState.coins += coinsGain;
  updateHeader();
  saveState();
  showXPGain(xpGain);
  showCoinGain(coinsGain);
  showToast('🏆 Solution submitted! Battle won!', 'success');
  showAchievement('⚔', 'Battle Winner!');
  document.getElementById('battleArena').style.display = 'none';
}

function closeBattle() {
  clearInterval(battleInterval);
  document.getElementById('battleArena').style.display = 'none';
  showToast('You forfeited the battle', 'warning');
}

function autoLose() {
  document.getElementById('battleArena').style.display = 'none';
  showToast("⏰ Time's up! Battle lost!", 'error');
}

// ═══════════════════════════════════════════
// PROFILE
// ═══════════════════════════════════════════

function renderProfile() {
  const u = appState.user;
  if (document.getElementById('profileName')) document.getElementById('profileName').textContent = u.name || 'Alex Hero';
  if (document.getElementById('profileEmail')) document.getElementById('profileEmail').textContent = u.email || 'alex@codequest.io';
  if (document.getElementById('profileLevel')) document.getElementById('profileLevel').textContent = 'Lv.' + appState.level;
  if (document.getElementById('psTotalXP')) document.getElementById('psTotalXP').textContent = appState.xp.toLocaleString();
  if (document.getElementById('psCoins')) document.getElementById('psCoins').textContent = appState.coins + ' 🪙';
  if (document.getElementById('psStreak')) document.getElementById('psStreak').textContent = appState.streak + ' 🔥';
  if (document.getElementById('pLevel')) document.getElementById('pLevel').textContent = appState.level;
  if (document.getElementById('pNextLevel')) document.getElementById('pNextLevel').textContent = appState.level + 1;

  const currentLevelXP = appState.xp % 1000;
  const pct = (currentLevelXP / 1000 * 100).toFixed(0);
  if (document.getElementById('pCurrentXP')) document.getElementById('pCurrentXP').textContent = currentLevelXP;
  if (document.getElementById('pNextXP')) document.getElementById('pNextXP').textContent = 1000;
  if (document.getElementById('pXPFill')) document.getElementById('pXPFill').style.width = pct + '%';

  // Render badges
  const badgesEl = document.getElementById('profileBadges');
  if (badgesEl) {
    badgesEl.innerHTML = USER_BADGES.map(b => `
      <div class="badge-item ${b.owned ? '' : 'locked'}" title="${b.name}">
        ${b.icon}
      </div>
    `).join('');
  }

  // Streak calendar (last 28 days)
  const calEl = document.getElementById('streakCalendar');
  if (calEl) {
    calEl.innerHTML = '';
    for (let i = 27; i >= 0; i--) {
      const day = document.createElement('div');
      const active = Math.random() > 0.35;
      const streak = i < appState.streak;
      day.className = `sc-day ${streak ? 'streak' : active ? 'active' : ''}`;
      day.textContent = '';
      calEl.appendChild(day);
    }
  }
}

function editProfile() {
  const name = prompt('Enter your hero name:', appState.user.name);
  if (name && name.trim()) {
    appState.user.name = name.trim();
    saveState();
    renderProfile();
    updateHeader();
    updateSidebar();
    showToast('✅ Profile updated!', 'success');
  }
}

// ═══════════════════════════════════════════
// BOTTOM TOOLBAR TOOLS
// ═══════════════════════════════════════════

const FLASHCARDS = [
  { q: 'What is a variable?', a: 'A container that stores a data value in memory.' },
  { q: 'What is a loop?', a: 'A control structure that repeats a block of code until a condition is false.' },
  { q: 'What is recursion?', a: 'A function calling itself, typically with a base case to prevent infinite loops.' },
  { q: 'What is Big O notation?', a: 'A mathematical notation describing algorithm performance/complexity.' },
  { q: 'What is OOP?', a: 'Object-Oriented Programming — a paradigm using objects/classes to structure code.' },
];

let cardIndex = 0;
let cardFlipped = false;

function openTool(tool) {
  const modal = document.getElementById('toolModal');
  const content = document.getElementById('toolModalContent');
  if (!modal || !content) return;

  if (tool === 'flashcards') {
    cardIndex = 0; cardFlipped = false;
    content.innerHTML = `
      <h3 style="margin-bottom:20px">🃏 Flash Cards</h3>
      <div class="flashcard glass-card" id="flashCard" onclick="flipCard()" style="text-align:center;cursor:none;min-height:200px;display:flex;align-items:center;justify-content:center;flex-direction:column;transition:all 0.3s">
        <div style="font-size:18px;font-weight:700;line-height:1.6" id="flashCardText">${FLASHCARDS[0].q}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:16px">Click to flip</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:16px">
        <button class="btn-ghost" onclick="prevCard()" style="flex:1">← Prev</button>
        <span style="display:flex;align-items:center;font-size:12px;color:var(--text-dim);white-space:nowrap" id="cardCounter">1 / ${FLASHCARDS.length}</span>
        <button class="btn-primary" onclick="nextCard()" style="flex:1">Next →</button>
      </div>
    `;
  } else if (tool === 'revision') {
    content.innerHTML = `
      <h3 style="margin-bottom:20px">📖 Quick Revision</h3>
      <div style="display:flex;flex-direction:column;gap:12px">
        ${['Python: Variables are dynamically typed.', 'JS: Use const by default, let for reassignment.', 'CSS: Flexbox = 1D layout, Grid = 2D layout.', 'DSA: Array access O(1), search O(n).', 'OOP: 4 pillars — Encapsulation, Inheritance, Polymorphism, Abstraction.', 'Big O: O(1) < O(log n) < O(n) < O(n log n) < O(n²)'].map(t => `
          <div class="glass-card" style="padding:14px;font-size:13px;color:var(--text-dim);border-left:3px solid var(--primary)">💡 ${t}</div>
        `).join('')}
      </div>
    `;
  } else if (tool === 'quiz') {
    const q = FLASHCARDS[Math.floor(Math.random() * FLASHCARDS.length)];
    content.innerHTML = `
      <h3 style="margin-bottom:20px">❓ Mini Quiz</h3>
      <div class="glass-card" style="padding:20px;margin-bottom:20px">
        <div style="font-size:16px;font-weight:700">${q.q}</div>
      </div>
      <button class="btn-primary glow-btn" onclick="revealQuizAnswer('${q.a.replace(/'/g, "\\'")}')">Reveal Answer 🔍</button>
      <div id="quizAnswer" style="display:none;margin-top:16px;padding:16px;background:rgba(16,185,129,0.1);border:1px solid var(--success);border-radius:12px;font-size:14px;color:var(--success)"></div>
    `;
  } else if (tool === 'playground') {
    content.innerHTML = `
      <h3 style="margin-bottom:16px">💻 Code Playground</h3>
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px">Write and test your code concepts:</div>
      <div class="code-editor-mini" id="playgroundEditor" contenteditable="true" spellcheck="false" style="min-height:200px">// Write your code here!
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("CodeQuest"));
</div>
      <button class="btn-primary glow-btn" style="margin-top:12px" onclick="runPlayground()">▶ Run Code</button>
      <div id="playgroundOutput" style="display:none;margin-top:12px;background:#0D0A1A;border:1px solid var(--border);border-radius:10px;padding:14px;font-family:var(--font-code);font-size:13px;color:#34D399"></div>
    `;
  }

  modal.classList.add('open');
}

function closeTool() {
  document.getElementById('toolModal').classList.remove('open');
}

function flipCard() {
  cardFlipped = !cardFlipped;
  const el = document.getElementById('flashCardText');
  const card = document.getElementById('flashCard');
  if (!el) return;
  card.style.background = cardFlipped ? 'rgba(124,58,237,0.2)' : '';
  el.textContent = cardFlipped ? FLASHCARDS[cardIndex].a : FLASHCARDS[cardIndex].q;
}

function nextCard() {
  cardIndex = (cardIndex + 1) % FLASHCARDS.length;
  cardFlipped = false;
  const el = document.getElementById('flashCardText');
  const counter = document.getElementById('cardCounter');
  const card = document.getElementById('flashCard');
  if (el) el.textContent = FLASHCARDS[cardIndex].q;
  if (counter) counter.textContent = `${cardIndex + 1} / ${FLASHCARDS.length}`;
  if (card) card.style.background = '';
}

function prevCard() {
  cardIndex = (cardIndex - 1 + FLASHCARDS.length) % FLASHCARDS.length;
  cardFlipped = false;
  const el = document.getElementById('flashCardText');
  const counter = document.getElementById('cardCounter');
  const card = document.getElementById('flashCard');
  if (el) el.textContent = FLASHCARDS[cardIndex].q;
  if (counter) counter.textContent = `${cardIndex + 1} / ${FLASHCARDS.length}`;
  if (card) card.style.background = '';
}

function revealQuizAnswer(answer) {
  const el = document.getElementById('quizAnswer');
  if (!el) return;
  el.style.display = 'block';
  el.textContent = '✅ ' + answer;
  showXPGain(10);
  appState.xp += 10;
  updateHeader();
  saveState();
}

function runPlayground() {
  const code = document.getElementById('playgroundEditor').textContent;
  const output = document.getElementById('playgroundOutput');
  if (!output) return;

  const logs = [];
  const fakeConsole = { log: (...args) => logs.push(args.join(' ')) };

  try {
    const fn = new Function('console', code);
    fn(fakeConsole);
    output.style.display = 'block';
    output.style.color = '#34D399';
    output.textContent = logs.length ? logs.join('\n') : '(No output)';
  } catch (err) {
    output.style.display = 'block';
    output.style.color = '#EF4444';
    output.textContent = '❌ Error: ' + err.message;
  }
}

// ═══════════════════════════════════════════
// NOTIFICATIONS TOGGLE
// ═══════════════════════════════════════════
function toggleNotif() {
  showToast('🔔 No new notifications', 'info');
}

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on the dashboard
  if (document.getElementById('learningPath')) {
    initDashboard();
  }

  // Auth page password strength listener already bound above

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });
});
