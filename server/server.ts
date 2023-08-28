import express from 'express';
import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import { z } from 'zod';

// expressの初期化
const app = express();
const port = 5001;

// CORSの設定
app.use(cors());
// サーバーの起動確認
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// TRPCの初期化
const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

type Todo = {
  id: string;
  content: string;
};

// サンプルデータ
const todoList: Todo[] = [
  {
    id: "1",
    content: "Learn TRPC",
  },
  {
    id: "2",
    content: "Learn React",
  },
];

// 関数の定義する
const appRouter = router({
  getTodos: publicProcedure.query(() => {
    return todoList;
  }),
  addTodo: publicProcedure.input(z.string()).mutation((req) => {
    const id = `${Math.random()}`;
    const todo = {
      id,
      content: req.input,
    };
    todoList.push(todo);
    return todoList;
  }),
  deleteTodo: publicProcedure.input(z.string()).mutation((req) => {
    const idTodoDelete = req.input;
    const indexToDelete = todoList.findIndex((todo) => todo.id === idTodoDelete);
    todoList.splice(indexToDelete, 1);
    return todoList;
  }),
});

// expressのミドルウェアとしてエンドポイントを登録する
app.use("/trpc", trpcExpress.createExpressMiddleware({ router: appRouter }));

app.listen(port);

//　関数の型をexportする
export type AppRouter = typeof appRouter;