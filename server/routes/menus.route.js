import { createMenu, deleteMenu, getAllMenus, getMenuByCat, getMenuById, updateMenu } from '../controllers/menu.controller.js';
import {Router} from 'express';

const menuRouter = Router();

menuRouter.post('/menus', createMenu);
menuRouter.get('/menus', getAllMenus);
menuRouter.get('/menus/:id', getMenuById);
menuRouter.get('/menus/:categorie', getMenuByCat);
menuRouter.put('/menus/:id', updateMenu);
//menuRouter.patch('/menus/:id', patchMenu);
menuRouter.delete('/menus/:id', deleteMenu);

export default menuRouter;