const express = require('express')
const uuid = require('uuid')


const api = express.Router();
const Todo = []

api.get('/todo', (req, res) => {
    res.send({
        data: Todo
    })

})

api.get('/todo/:id', (req, res) => {
    const { id, todo, item } = req.params;
    console.log('===============================Get==========================');
    console.log(req.params.id)
    console.log('===============================Get==========================');
    for (var i = 0; i < Todo.length; i++) {
        if (Todo[i].id == id) {
            res.send(Todo[i])
            return;
        }
    }
    res.status(404).send({ message: 'item not found' })
})

api.post('/todo', (req, res) => {
    console.log('===============================Post==========================');
    console.log(req.body)
    console.log('===============================Post==========================');

    const obj = {
        id: uuid(),
        todo: req.body.todo,
        done: false,
        createdAt: new Date()
    };
    Todo.push(obj)
    res.send(obj)
})

api.put('/todo/:id', (req, res) => {
    const { id } = req.params
    console.log('===============================Put==========================');
    console.log(req.body)
    console.log(req.params.id)
    console.log('===============================Put==========================');
    for (var i = 0; i < Todo.length; i++) {
        if (Todo[i].id == id) {
            const todo = { ...Todo[i] }
            todo['todo'] = req.body.todo
            todo['done'] = req.body.done
            todo['UpdatedAt'] = new Date()
            Todo.splice(i, 1, todo)

            res.send(todo)
            return

        }
    }
    res.status(404).send({ message: 'item not found' })


})

api.delete('/todo/:id', (req, res) => {

    const { id } = req.params
    console.log('===============================Delete==========================');
    console.log(req.params.id)
    console.log('===============================Delete==========================');
    let status = false
    for (var i = 0; i < Todo.length; i++) {
        if (Todo[i].id == id) {
            Todo.splice(i, 1)
            status = true
            break;
        }
    }
    if (status) {
        res.send({ message: 'succesfully Deleted' })
    }
    else {
        res.status(404).send({ message: "item not found" })
    }



})

module.exports = api
