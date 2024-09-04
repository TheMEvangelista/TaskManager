require("dotenv").config();

const express = require("express");
const cors = require("cors");
const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const User = require("./Models/user.model");
const Note = require("./Models/note.model");

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

const app = express();
app.use(json());
app.use(
  cors({
    origin: "*",
  }),
);

//Create account
app.post("/create-account", async (request, response) => {
  const { fullName, email, password } = request.body;

  if (!fullName) {
    return response
      .status(400)
      .json({ error: true, message: "Full name is required!" });
  }
  if (!email) {
    return response
      .status(400)
      .json({ error: true, message: "Email is required!" });
  }
  if (!password) {
    return response
      .status(400)
      .json({ error: true, message: "Password is required!" });
  }

  const isUser = await findOne({ email: email });

  if (isUser) {
    return response.json({
      error: true,
      message: "User already exist!",
    });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  return response.json({
    error: false,
    user,
    accessToken,
    message: "Registration Sucessfull!",
  });
});
app.post("/login", async (request, response) => {
  const { email, password } = request.body;

  if (!email) {
    return response.status(400).json({ message: "Email is required!" });
  }
  if (!password) {
    return response.status(400).json({ message: "Password is required!" });
  }

  const userInfo = await findOne({ email: email });
  if (!userInfo) {
    return response.status(400).json({ message: "User not found!" });
  }
  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = sign(user, process.env.ACESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    return response.json({
      error: false,
      message: "Login Sucessfull!",
      email,
      accessToken,
    });
  } else {
    return response.status(400).json({
      error: true,
      message: "Invalid Credentials!",
    });
  }
});

//Get User
app.get("/get-user", authenticateToken, async (request, response) => {
  const { user } = request.user;

  const isUser = await findOne({ _id: user._id });

  if (!user) {
    return response.sendStatus(400);
  }

  return response.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "",
  });
});

//Add Note
app.post("/add-note", authenticateToken, async (request, response) => {
  const { title, content, tags } = request.body;
  const { user } = request.user;

  if (!title) {
    return response.status(400).json({
      error: true,
      message: "Title is required!",
    });
  }
  if (!content) {
    return response.status(400).json({
      error: true,
      message: "Content is required!",
    });
  }
  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    return response.json({
      error: false,
      note,
      message: "Note Added Sucessfull!",
    });
  } catch (error) {
    return response.status(500).json({
      error: true,
      message: "Internal Server Error!",
    });
  }
});

//Edit Note
app.put("/edit-note/:noteId", authenticateToken, async (request, response) => {
  const noteId = request.params.noteId;
  const { title, content, tags, isPinned } = request.body;
  const { user } = request.user;

  if (!title && !content && !tags) {
    return response.status(400).json({
      error: true,
      message: "No changes provided!",
    });
  }

  try {
    const note = await _findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return response
        .status(404)
        .json({ error: true, message: "Note not found!" });
    }
    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();

    return response.json({
      error: false,
      note,
      message: "Note updated sucessfully!",
    });
  } catch (error) {
    return response.status(500).json({
      error: true,
      message: "Internal Server Error!",
    });
  }
});

//Get all notes
app.get("/get-notes/", authenticateToken, async (request, response) => {
  const { user } = request.user;

  try {
    const notes = await find({ userId: user._id }).sort({ isPinned: -1 });

    return response.json({
      error: false,
      notes,
      message: "All notes retrieved sucessfully!",
    });
  } catch (error) {
    return response.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

//Delete note
app.delete(
  "/delete-note/:noteId",
  authenticateToken,
  async (request, response) => {
    const noteId = request.params.noteId;
    const { user } = request.user;

    try {
      const note = await _findOne({ _id: noteId, userId: user._id });
      if (!note) {
        return response
          .status(404)
          .json({ error: true, message: "Note not found!" });
      }

      await deleteOne({ _id: noteId, userId: user._id });

      return response.json({
        error: false,
        message: "Note deleted sucessfully!",
      });
    } catch (error) {
      return response.status(500).json({
        error: true,
        message: "Internal Server Error",
      });
    }
  },
);

//Update isPinned Note
app.put(
  "/note-pinned/:noteId",
  authenticateToken,
  async (request, response) => {
    const noteId = request.params.noteId;
    const { isPinned } = request.body;
    const { user } = request.user;

    try {
      const note = await _findOne({ _id: noteId, userId: user._id });

      if (!note) {
        return response
          .status(404)
          .json({ error: true, message: "Note not found!" });
      }

      note.isPinned = isPinned;

      await note.save();

      return response.json({
        error: false,
        note,
        message: "Note pinned sucessfully!",
      });
    } catch (error) {
      return response.status(500).json({
        error: true,
        message: "Internal Server Error!",
      });
    }
  },
);

app.listen(8000);

module.exports = app;
