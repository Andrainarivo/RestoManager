import { createMenu, deleteMenu, getAllMenus, getMenuByCat, getMenuById, updateMenu } from '../controllers/menu.controller.js';
import {Router} from 'express';
import { authorizeChef, authorizeEmploye } from '../middlewares/employe.auth.js';
import { authorizeClient } from '../middlewares/client.auth.js';
import { authentificateToken } from '../middlewares/auth.js';

const menuRouter = Router();

//----POST----
menuRouter.post('/menus/add', authentificateToken, authorizeChef, createMenu);

//----GET----
menuRouter.get('/menus/list', authentificateToken, authorizeEmploye || authorizeClient, getAllMenus);
menuRouter.get('/menus/get/:id', authentificateToken, authorizeEmploye || authorizeClient, getMenuById);
menuRouter.get('/menus/get/:categorie', authentificateToken, authorizeEmploye || authorizeClient, getMenuByCat);

//----PUT----
menuRouter.put('/menus/maj/:id', authentificateToken, authorizeChef, updateMenu);
//menuRouter.patch('/menus/:id', patchMenu);

//----DELETE----
menuRouter.delete('/menus/del/:id', authentificateToken, authorizeChef, deleteMenu);


export default menuRouter;