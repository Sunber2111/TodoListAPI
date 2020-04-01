const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Task = require("../models/tasks");

// @route    post api/product
// @desc     lấy tasks
// @access   public
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route    delte api/product/:_id
// @desc     xóa task theo id
// @access   private
// @auth     admin
router.delete("/:_id", async (req, res) => {
  try {
    const task = await Task.findById({ _id: req.params._id });
    if (task) {
      await Task.findOneAndDelete({ _id: req.params._id });
      return res.status(200).json({ msg: "Xóa Thành Công" });
    } else res.status(404).json({ msg: "Không Tìm Thấy" });
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Không Tìm Thấy" });
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route    post api/product
// @desc     thêm task
// @access   private
// @auth     admin
router.post("/", async (req, res) => {
  try {
    let task = new Task(req.body);

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Server Error" });
  }
});

// @route    post api/product
// @desc     sửa task
// @access   private
// @auth     admin
router.put("/", async (req, res) => {
  const { _id } = req.body;
  try {
    let task = await Task.findOne({ _id });
    if (!task)
      return res.status(404).json({ msg: "Không Tìm Thấy Task Cần Sửa" });

    await Task.findOneAndUpdate(
      { _id },
      { $set: req.body },
      { new: true }
    ).then(task => res.status(202).json(task));
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
