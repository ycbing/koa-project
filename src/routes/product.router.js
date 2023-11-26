import "babel-polyfill";
import Router from 'koa-router'
import { baseApi } from "../config";
import jwt from "../middlewares/jwt";
import ProductsControllers from '../controllers/product';

const api = 'products';

const router = new Router();

router.prefix(`/${baseApi}/${api}`);

// GET /api/products
router.get('/', ProductsControllers.find);

// POST /api/products
// This route is protected, call POST /api/authenticate to get the token
router.post('/', jwt, ProductsControllers.add);

// GET /api/products/id
// This route is protected, call POST /api/authenticate to get the token
router.get("/:id", jwt, ProductsControllers.findById);

// PUT /api/products/id
// This route is protected, call POST /api/authenticate to get the token
router.put("/:id", jwt, ProductsControllers.update);

// DELETE /api/products/id
// This route is protected, call POST /api/authenticate to get the token
router.delete('/:id', jwt, ProductsControllers.delete)

export default router;
