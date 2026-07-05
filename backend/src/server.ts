import express, { Request, Response } from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT ||3_000;

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors({
    origin: "https://zorrodidit.uk"
}));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("typescript express serveri");
});

app.post("/api/register", async(req: Request, res: Response) =>{
    //1. extract the payloadd sent from vue
    const { username, password } = req.body;
    
    console.log("Received new registration request:");
    console.log(`Username: ${username}`);

    //2. basic backed validation
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }

    try {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const { data, error } = await supabase
            .from("users")
            .insert([
                {
                    username: username,
                    password_hash: passwordHash
                }
            ])
            .select();

            if (error) {
                console.error("datbase error", error);
                return res.status(500).json({ success: false, message: error.message });
            }

            console.log("käyttäjä tallnnettu", data);
            return res.status(201).json({ success: true, message: "käyttäjä tallenettu onnistuneesti"});
        } catch (error) {
            console.error("server error", error);
            res.status(500).json({ success: false, message: "internal server error"});
        }
    }
);

app.listen(port, () => {
    console.log(`Serveri pystyssä portissa ${port}`);
});