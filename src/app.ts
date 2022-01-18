import express, { Application, Router } from "express";
import indexRouter from "./routes";

const app: Application = express();
const port: number = 3000;

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Connected on port ${port}`);
});

// The request accepts campainid=number , url=url , clickid= number
// http://localhost:3000/?campaignid=123&url=https://davidkostuchenko.com/&clickid=1231232
