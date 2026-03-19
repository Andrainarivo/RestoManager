import { Router } from 'express';
import { createMenu, deleteMenu, getAllMenus, getMenuByCat, getMenuById, updateMenu, patchMenu } from '../controllers/menu.controller.js';
import { authentificateToken } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/roles.auth.js';
import { Validate, menuValidation, patchMenuValidation } from '../middlewares/validate.js';

const menuRouter = Router();

// Accès en lecture pour tout le monde (clients + staff)
const everybody = ['Chef-Cuisinier', 'Cuisinier', 'Serveur', 'admin', 'client'];

// ---- POST ----
menuRouter.post('/add', authentificateToken, authorizeRoles('Chef-Cuisinier', 'admin'), menuValidation, Validate, createMenu);

// ---- GET ----
menuRouter.get('/list', authentificateToken, authorizeRoles(...everybody), getAllMenus);
menuRouter.get('/get/:id', authentificateToken, authorizeRoles(...everybody), getMenuById);
menuRouter.get('/cat/:categorie', authentificateToken, authorizeRoles(...everybody), getMenuByCat); // Changé /get/:categorie en /cat/:categorie pour éviter les conflits d'URL

// ---- PUT / PATCH ----
menuRouter.put('/maj/:id', authentificateToken, authorizeRoles('Chef-Cuisinier', 'admin'), menuValidation, Validate, updateMenu);
menuRouter.patch('/patch/:id', authentificateToken, authorizeRoles('Chef-Cuisinier', 'admin'), patchMenuValidation, Validate, patchMenu);

// ---- DELETE ----
menuRouter.delete('/del/:id', authentificateToken, authorizeRoles('Chef-Cuisinier', 'admin'), deleteMenu);

export default menuRouter;