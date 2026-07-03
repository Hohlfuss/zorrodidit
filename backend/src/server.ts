import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT ||3_000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("typescript express serveri");
});

app.post("/api/register", (req: Request, res: Response) =>{
    //1. extract the payloadd sent from vue
    const { username, email, password } = req.body;
    
    console.log("Received new registration request:");
    console.log(`Username: ${username}, Email: ${email}`);

    //2. basic backed validation
    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }

    //3. TODO hash the pawwword and save it to a database

    //4. Send back success response back to vue
    res.status(201).json({
        success: true,
        message: "User registered successfully!"
    });
});

app.listen(port, () => {
    console.log(`Serveri pystyssä portissa ${port}`);
});