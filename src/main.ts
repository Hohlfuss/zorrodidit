import express, { Request, Response } from "express";

const app = express();
const port = 3_000;

app.get("/", (req: Request, res: Response) => {
    res.send("typescript express serveri");
});

app.listen(port, () => {
    console.log(`Serveri pystyssä portissa ${port}`);
});