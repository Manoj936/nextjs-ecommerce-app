import express from "express";
import { getProducts, createProduct , updateProduct ,  deleteProduct ,searchProducts} from "../controllers/ProductController";
import { isAuthenticated, isAdmin } from "../middleware/AuthMiddleware";
const router = express.Router();


router.get("/", getProducts);
router.post("/", isAuthenticated, isAdmin, createProduct);
router.put("/:id", isAuthenticated, isAdmin, updateProduct);
router.delete("/:id", isAuthenticated, isAdmin, deleteProduct);
router.get("/search", searchProducts); // Search products API
export default router;
