import { Router } from "express";
import { getFisioterapia, addFisioterapia, deleteFisioterapia, updateFisioterapia } from "../controllers/fisioterapia.controlles.js";

const router = Router();

router.get("/all",getFisioterapia);
router.post("/add",addFisioterapia);
router.delete("/del/:id",deleteFisioterapia);
router.patch("/upd/:id",updateFisioterapia);

export default router;