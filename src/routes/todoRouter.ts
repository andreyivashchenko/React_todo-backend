import express from 'express';
import { controller } from '../controllers/todoController.js';

const todoRouter = express.Router();

todoRouter.get('/all', controller.getAll);
todoRouter.post('/new_todo', controller.newTodo);
todoRouter.delete('/todo/:id', controller.deleteTodo);
todoRouter.put('/todo/:id', controller.updateTodo);
export default todoRouter;
