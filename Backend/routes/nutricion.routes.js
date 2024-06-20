import { Router } from "express";
import { getNutricion, addNutricion, deleteNutricion, updateNutricion } from "../controllers/nutricion.controlles.js";

const router = Router();

router.get("/all",getNutricion);
router.post("/add",addNutricion);
router.delete("/del/:id",deleteNutricion);
router.patch("/upd/:id",updateNutricion);

export default router;