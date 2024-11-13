import express from 'express';
import { addProduct, deleteProduct, getProduct, updateProduct } from "../controllers/productController.js";


const router = express.Router();

router.post("/",addProduct);
router.get("/", getProduct);
router.delete("/:id", deleteProduct)
router.put("/:id", updateProduct)

export default router;