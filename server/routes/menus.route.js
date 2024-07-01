import { createMenu, deleteMenu, getAllMenus, getMenuByCat, getMenuById, updateMenu } from '../controllers/menu.controller.js';
import {Router} from 'express';
import { authorizeChef, authorizeEmploye } from '../middlewares/employe.auth.js';
import { authorizeClient } from '../middlewares/client.auth.js';

const menuRouter = Router();

//----POST----
menuRouter.post('/menus/add', authorizeChef, createMenu);

//----GET----
menuRouter.get('/menus/list', authorizeEmploye || authorizeClient, getAllMenus);
menuRouter.get('/menus/get/:id', authorizeEmploye || authorizeClient, getMenuById);
menuRouter.get('/menus/get/:categorie', authorizeEmploye || authorizeClient, getMenuByCat);

//----PUT----
menuRouter.put('/menus/maj/:id', authorizeChef, updateMenu);
//menuRouter.patch('/menus/:id', patchMenu);

//----DELETE----
menuRouter.delete('/menus/del/:id', authorizeChef, deleteMenu);


export default menuRouter;