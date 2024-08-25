const userModel = require("../models/userModel");
const taskModel = require("../models/taskModel");

// methods

const createTask = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const userId = req.validUser.id;

    const newTask = new taskModel({ title, desc });
    const savedTask = await newTask.save();

    const verifyUser = await userModel.findByIdAndUpdate(userId, {
      $push: { tasks: savedTask._id },
    });

    if (!verifyUser) {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "task created",
      data: savedTask,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const id = req.validUser.id;

    const task = await userModel
      .findById(id)
      // .select("tasks")
      .populate({
        path: "tasks",
        options: { sort: { createdAt: -1 } },
      });

    if (!task) {
      console.log(task);
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    const details = task.tasks;

    res.status(200).json({
      success: true,
      message: "all data available",
      data: details,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.validUser.id;

    await taskModel.findByIdAndDelete(id);

    const removeTask = await userModel.findByIdAndUpdate(userId, {
      $pull: { tasks: id },
    });

    if (!removeTask) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "task has been deleted",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.params;

    const tasks = await taskModel.findByIdAndUpdate(id, {
      title,
      desc,
    });

    if (!tasks) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "task updated",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

const updateImportant = async (req, res) => {
  try {
    const { id } = req.params;

    const tasks = await taskModel.findById(id);

    const imp = tasks.important;

    const updatedImp = await taskModel.findByIdAndUpdate(id, {
      important: !imp,
    });

    if (!updatedImp) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "task updated",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

const updateComplete = async (req, res) => {
  try {
    const { id } = req.params;

    const tasks = await taskModel.findById(id);

    const com = tasks.complete;

    const updatedCom = await taskModel.findByIdAndUpdate(id, {
      complete: !com,
    });

    if (!updatedCom) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "task updated",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

const getComplete = async (req, res) => {
  try {
    const id = req.validUser.id;

    const updatedCom = await userModel.findById(id).populate({
      path: "tasks",
      match: { complete: true },
      options: { sort: { createdAt: -1 } },
    });

    if (!updatedCom) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    const completeTask = updatedCom.tasks;

    res.status(200).json({
      success: true,
      message: "details",
      data: completeTask,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

const getImportant = async (req, res) => {
  try {
    const id = req.validUser.id;

    const updatedCom = await userModel.findById(id).populate({
      path: "tasks",
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });

    if (!updatedCom) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    const importantTask = updatedCom.tasks;

    res.status(200).json({
      success: true,
      message: "details",
      impart : importantTask,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  deleteTask,
  updateTask,
  updateImportant,
  updateComplete,
  getComplete,
  getImportant,
};
