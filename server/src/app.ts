import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import errorFactory from "./services/responses/errorFactory";
import usersRouter from "./routes/users";
import gamesRouter from "./routes/games";
import consolesRouter from "./routes/consoles";
import genresRouter from "./routes/genres";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/games", gamesRouter);
app.use("/api/v1/consoles", consolesRouter);
app.use("/api/v1/genres", genresRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server running");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  errorFactory.notFound(res);
});

export default app;
