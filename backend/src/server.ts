import express, { Request, Response } from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT ||3_000;

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

dotenv.config();

app.use(cors({
    origin: "https://zorrodidit.uk"
}));

app.get("/", (req: Request, res: Response) => {
    res.send("typescript express server is running");
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
                if (error.code === "23505" || error.message.includes("user_username_key")) {
                    return res.status(409).json({
                        success: false,
                        message: "That username is already taken. Please choose another one."
                    })
                }
                console.error("datbase error", error);
                return res.status(500).json({ success: false, message: error.message });
            }

            console.log("User created: ", data);
            return res.status(201).json({ success: true, message: "User created successfully"});
        } catch (error) {
            console.error("server error", error);
            res.status(500).json({ success: false, message: "internal server error"});
        }
    }
);

app.post("/api/login", async(req: Request, res: Response) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Missing username or password"});
    }

    try {

        const { data: users, error } = await supabase
            .from("users")
            .select("*")
            .eq("username", username)
            .limit(1);

        if (error || !users || users.length === 0) {
            return res.status(401).json({ success: false, message: "Invalid username or password"});
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMach) {
            return res.status(401).json({ success: false, message: "Invalid username or password"});
        }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            username: user.username
        });
    } catch (error) {
        console.log("Login Error: ", erorror);
        return res.status(500).json({ success: false, message: "Internal server error"});
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});