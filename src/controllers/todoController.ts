import { Request, Response } from 'express';
import { ITodo } from '../types/types.js';
import Todo from '../models/Todo.js';

class TodoController {
  async getAll(req: Request, res: Response) {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка получения списка задач' });
    }
  }
  async newTodo(req: Request<Record<string, never>, unknown, ITodo>, res: Response<string | { message: string }>) {
    try {
      const { title, body, tags } = req.body;
      const todo = new Todo({
        title: title,
        body: body,
        tags: tags,
      });
      await todo.save();
      return res.json('Новая запись успешно создана!');
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'DB error' });
    }
  }
  async updateTodo(req: Request<{ id: string }, Record<string, never>, ITodo>, res: Response) {
    try {
      const { id } = req.params;
      const todo = req.body;
      if (!id) {
        return res.status(400).json({ message: 'Id не указан' });
      }
      const updatedTodo = await Todo.findByIdAndUpdate(id, todo, { new: true });
      return res.json(updatedTodo);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Не удалось обновить задачу' });
    }
  }
  async deleteTodo(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      console.log(id);
      if (!id) {
        return res.status(400).json({ message: 'Ошибка' });
      }
      const deletedTodo = await Todo.findByIdAndDelete(id);
      return res.json(deletedTodo);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'DB error' });
    }
  }
}
export const controller = new TodoController();
