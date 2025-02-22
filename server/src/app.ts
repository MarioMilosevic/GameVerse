import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import usersRouter from "./routes/users";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", usersRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server running");
});

// app.all("*", (req: Request, res: Response, next: NextFunction) => {
//   errorFactory.notFound(res);
// });

export default app;
