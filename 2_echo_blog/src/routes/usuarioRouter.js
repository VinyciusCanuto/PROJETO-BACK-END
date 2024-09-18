import { Router } from "express";

import {} from "../controllers/usuarioController.js"

const router = Router()

router.post("/registro", usuarioPost)
router.post("/login", usuarioLogin)
router.put("/:id", usuarioPut)
router.get("/usuarios", usuarioGet)
router.delete("/usuarios/:id", usuarioDelete)
router.patch("/usuarios/:id/papel", usuarioPapel)


