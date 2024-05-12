const router = require("express").Router();
const Comment = require("../models/Comment");
const { authenticate, adminCheck } = require("../middleware/authAndAdminCheck");

router.post("/", authenticate, async (req, res) => {
  const newComment = new Comment({
    ...req.body,
    username: req.user.username,
    userId: req.user.id,
  });
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", authenticate, adminCheck, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404).json("Kommentar hittades inte.");
      return;
    }
    if (comment.userId === req.user.id || req.user.isAdmin) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Kommentaren har tagits bort.");
    } else {
      res.status(401).json("Du kan bara radera dina egna kommentarer!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
