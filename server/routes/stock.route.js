import {Router} from 'express';
import { createStock, decrement, deleteStock, getAllStocks, getMenuStock, getStockById, increment, updateStock } from '../controllers/stock.controller.js';
import { authorizeChef, authorizeCuisinier, authorizeEmploye } from '../middlewares/employe.auth.js';
import { authentificateToken } from '../middlewares/auth.js';

const stockRouter = Router();

//----POST----
stockRouter.post('/stocks/new', authentificateToken, authorizeChef || authorizeCuisinier, createStock);

//----GET----
stockRouter.get('/stocks/list', authentificateToken, authorizeEmploye, getAllStocks);
stockRouter.get('/stocks//get/:id', authentificateToken, authorizeEmploye, getStockById);
stockRouter.get('/stocks/menus/:menu_id', authentificateToken, authorizeEmploye, getMenuStock);

//----PUT----
stockRouter.put('/stocks/maj/:id', authentificateToken, authorizeChef, updateStock);
stockRouter.put('/stocks/:menu_id/plus/:nb', authentificateToken, authorizeChef || authorizeCuisinier, increment);
stockRouter.put('/stocks/:menu_id/moins/:nb', authentificateToken, authorizeChef || authorizeCuisinier, decrement);

//----DELETE----
stockRouter.delete('/stocks/del/:id', authentificateToken, authorizeCuisinier, deleteStock);


export default stockRouter;