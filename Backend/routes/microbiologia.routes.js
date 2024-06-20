import { Router } from "express";
import { getMicriobiologia, addMicriobiologia, deleteMicriobiologia, updateMicriobiologia } from "../controllers/microbiologia.controlles.js";

const router = Router();

router.get("/all",getMicriobiologia);
router.post("/add",addMicriobiologia);
router.delete("/del/:id",deleteMicriobiologia);
router.patch("/upd/:id",updateMicriobiologia);

export default router;