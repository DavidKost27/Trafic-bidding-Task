import { Router } from "express";
import auction from "./auction";

const router = Router();

router.use("/", auction);

export default router;
