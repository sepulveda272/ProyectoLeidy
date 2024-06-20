import { Router } from "express";
import { getMedicina, addMedicina, deleteMedicina, updateMedicina } from "../controllers/medicina.controlles.js";

const router = Router();

router.get("/all",getMedicina);
router.post("/add",addMedicina);
router.delete("/del/:id",deleteMedicina);
router.patch("/upd/:id",updateMedicina);

export default router;