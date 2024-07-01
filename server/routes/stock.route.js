import {Router} from 'express';
import { createStock, decrement, deleteStock, getAllStocks, getMenuStock, getStockById, increment, updateStock } from '../controllers/stock.controller.js';
import { authorizeChef, authorizeCuisinier, authorizeEmploye } from '../middlewares/employe.auth.js';

const stockRouter = Router();

//----POST----
stockRouter.post('/stocks/new', authorizeChef || authorizeCuisinier, createStock);

//----GET----
stockRouter.get('/stocks/list', authorizeEmploye, getAllStocks);
stockRouter.get('/stocks//get/:id', authorizeEmploye, getStockById);
stockRouter.get('/stocks/menus/:menu_id', authorizeEmploye, getMenuStock);

//----PUT----
stockRouter.put('/stocks/maj/:id', authorizeChef, updateStock);
stockRouter.put('/stocks/:menu_id/plus/:nb', authorizeChef || authorizeCuisinier, increment);
stockRouter.put('/stocks/:menu_id/moins/:nb', authorizeChef, authorizeCuisinier, decrement);

//----DELETE----
stockRouter.delete('/stocks/del/:id', authorizeCuisinier, deleteStock);


export default stockRouter;