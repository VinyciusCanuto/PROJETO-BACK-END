import { Router } from "express";

import {
    postagemCreate,
    postagemAll,
    postagemGetById,
    postagemAtualizar,
    postagemDelete,
    postagemImages
} from "../controllers/postagemController.js"

const router = Router()

router.post("/", postagemCreate)
router.get("/", postagemAll)
router.get("/:id", postagemGetById)
router.delete("/:id", postagemDelete)
router.put("/:id", postagemAtualizar)
router.post("/:id/imagem",  bodyParser.raw({type: ["image/jpeg", "image/png"], limit: "5mb"}), postagemImages)

export default router;