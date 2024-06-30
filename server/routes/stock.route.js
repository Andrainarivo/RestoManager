import {Router} from 'express';
import { createStock, decrement, deleteStock, getAllStocks, getMenuStock, getStockById, increment, updateStock } from '../controllers/stock.controller.js';

const stockRouter = Router();

stockRouter.post('/stocks', createStock);
stockRouter.get('/stocks', getAllStocks);
stockRouter.get('/stocks/:id', getStockById);
stockRouter.get('/stocks/menus/:menu_id', getMenuStock);
stockRouter.put('/stocks/:id', updateStock);
stockRouter.put('/stocks/:menu_id/plus/:nb', increment);
stockRouter.put('/stocks/:menu_id/moins/:nb', decrement);
stockRouter.delete('/stocks/:id', deleteStock);

export default stockRouter;