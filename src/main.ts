import express, { Request, Response } from "express";
import path from "path";

const app = express();
const port = process.env.PORT ||3_000;

app.get("/", (req: Request, res: Response) => {
    res.send("typescript express serveri");
});

app.get("./register.html", (req: Request, res: Response) => {
    res.send(path.join(__dirname, "../src/register.html"));
})

app.listen(port, () => {
    console.log(`Serveri pystyssä portissa ${port}`);
});