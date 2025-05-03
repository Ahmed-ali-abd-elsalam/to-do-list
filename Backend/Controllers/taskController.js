const Task = require('../Models/Task');

exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        const task = new Task({
            UserID: req.userId,
            title: title,
            Completed: "false",
            description: description,
            dueDate: dueDate,
        });
        const savedTask = await task.save();
        res.status(200).json(savedTask);
    } catch (e) {
        console.log("error in createTask", e.message);
        res.status(500).json({ error: "Task can't be created" });
    }
}

exports.editTask = async (req, res) => {
    const id = req.query.id;
    try {
        const { title, description, Completed } = req.body;
        const task = await Task.findByIdAndUpdate(id, { title: title, description: description, Completed: Completed }, { new: true });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        await task.save();
        res.status(200).json(task);
    } catch (e) {
        console.log("error in editTask", e.message);
        res.status(500).json({ error: "Task can't be edited" });
    }
}

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ UserID: req.userId });
        res.status(200).json(tasks);
    } catch (e) {
        console.log("error in getAllTasks", e.message);
        res.status(500).json({ error: "Can't retrieve tasks" });
    }
}

exports.getTask = async (req, res) => {
    const id = req.query.id;
    try {
        const task = await Task.findOne({ id: id, UserID: req.userId });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        } else {
            res.status(200).json(task);
        }
    } catch (e) {
        console.log("error in getTask", e.message);
        res.status(500).json({ error: "Can't retrieve task" });
    }
}

exports.findTaskByTitle = async (req, res) => {
    const title = req.query.title;
    try {
        const tasks = await Task.find({ title: { $regex: title, $options: 'i' }, UserID: req.userId });
        if (!tasks) {
            return res.status(404).json({ error: "Task not found" });
        } else {
            res.status(200).json(tasks);
        }
    } catch (e) {
        console.log("error in findTaskByTitle", e.message);
        res.status(500).json({ error: "Can't retrieve task" });
    }
}

exports.deleteTask = async (req, res) => {
    const title = req.query.title;
    try {
        const task = await Task.findOneAndDelete({ title: title, UserID: req.userId });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        } else {
            res.status(200).json({ message: "Task deleted successfully" });
        }
    } catch (e) {
        console.log("error in deleteTask", e.message);
        res.status(500).json({ error: "Can't delete task" });
    }
}
