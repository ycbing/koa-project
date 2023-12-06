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

router.get("/lv1", ProductsControllers.findLv1List)

router.get("/lv2", ProductsControllers.findLv2List)

router.get("/lv3", ProductsControllers.findLv3List)

router.get("/lv4", ProductsControllers.findLv4List)

router.get("/sub_platform", ProductsControllers.findSubPlatformList)

router.get("/sub_platform_stat", ProductsControllers.findStatBySubPlatform)


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
