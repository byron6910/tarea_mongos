const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async(req, res) => {
    const tasks = await Task.find();
    res.render('index', { tasks });
});

router.post('/add', async(req, res) => {
    const data = req.body;
    const newTask = new Task(data);
    await newTask.save();
    //res.redirect('/');
    res.redirect('/');

});

router.get('/delete/:id', async(req, res) => {
    const id = req.params.id;
    await Task.findByIdAndDelete(id);
    res.redirect('/');

});

router.get('/turn/:id', async(req, res) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');

});

router.get('/edit/:id', async(req, res) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    res.render('edit', { task });
});

router.post('/edit/:id', async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    const task = await Task.findByIdAndUpdate(id, data);

    res.redirect('/');

});

module.exports = router;