import { Router } from "express";
import { getEnfermeria, addEnfermeria, deleteEnfermeria, updateEnfermeria } from "../controllers/enfermeria.controlles.js";

const router = Router();

router.get("/all",getEnfermeria);
router.post("/add",addEnfermeria);
router.delete("/del/:id",deleteEnfermeria);
router.patch("/upd/:id",updateEnfermeria);

export default router;