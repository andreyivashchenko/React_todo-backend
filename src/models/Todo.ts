import { Schema, model } from 'mongoose';
const Todo = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  tags: [{ type: String, required: false }],
});

export default model('Todo', Todo);
