import { Router } from "express";
import {getAll, create, getTarefa, updateTarefa, updateStatusTarefa, getTarefaPorSituacao} from "../controllers/tarefaController.js"

const router = Router();

router.get("/", getAll);
router.post("/", create);
router.get("/:id", getTarefa);
router.put("/:id", updateTarefa);
router.patch("/:id/status", updateStatusTarefa);
router.get("/:id/status", getTarefaPorSituacao);

export default router;