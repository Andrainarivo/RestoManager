import { Router } from 'express';
import { createStock, decrement, deleteStock, getAllStocks, getMenuStock, getStockById, increment, updateStock } from '../controllers/stock.controller.js';
import { authorizeRoles } from '../middlewares/roles.auth.js';
import { authentificateToken } from '../middlewares/auth.js';
import { Validate, stockValidation } from '../middlewares/validate.js'; 

const stockRouter = Router();
const allStaff = ['admin', 'Chef-Cuisinier', 'Cuisinier', 'Serveur', 'Others'];

// ---- POST ----
stockRouter.post('/new', authentificateToken, authorizeRoles('admin', 'Chef-Cuisinier', 'Cuisinier'), stockValidation, Validate, createStock);

// ---- GET ----
stockRouter.get('/list', authentificateToken, authorizeRoles(...allStaff), getAllStocks);
stockRouter.get('/menus/:menu_id', authentificateToken, authorizeRoles(...allStaff), getMenuStock);
stockRouter.get('/get/:id', authentificateToken, authorizeRoles(...allStaff), getStockById);

// ---- PUT ----
// J'ai renommé :menu_id en :id car ton contrôleur 'updateStock' fait appel à req.params.id
stockRouter.put('/maj/:id', authentificateToken, authorizeRoles('admin', 'Chef-Cuisinier'), stockValidation, Validate, updateStock); 
stockRouter.put('/:menu_id/plus/:nb', authentificateToken, authorizeRoles('admin', 'Chef-Cuisinier', 'Cuisinier'), increment);
stockRouter.put('/:menu_id/moins/:nb', authentificateToken, authorizeRoles('admin', 'Chef-Cuisinier', 'Cuisinier'), decrement);

// ---- DELETE ----
stockRouter.delete('/del/:id', authentificateToken, authorizeRoles('admin', 'Chef-Cuisinier'), deleteStock);

export default stockRouter;