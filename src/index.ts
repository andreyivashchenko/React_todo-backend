import express, { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import todoRouter from './routes/todoRouter.js';
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.json('hello');
});
app.use('/api', todoRouter);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://Andrey:scx1bDwkn93hcTb5@todo-cluster.0oucxzh.mongodb.net/?retryWrites=true&w=majority',
    );
    app.listen(PORT, () => {
      console.log(`Server started on port = ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};
start().then(() => console.log('db connect'));
