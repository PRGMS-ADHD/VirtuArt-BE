import express, { Request, Response } from 'express';
import User from "../models/user";

const router = express.Router();

function isQueryError(error: any, errorCode: string): boolean {
    return error && error.code === errorCode;
}

router.post("/users", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        await User.create(email, password);
        res.sendStatus(201);
    } catch (error: any) {
        if (isQueryError(error, "ER_DUP_ENTRY")) {
            return res.sendStatus(409);
        }
        throw error;
    }
});

export default router;
