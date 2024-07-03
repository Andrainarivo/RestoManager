import {Router} from 'express';
import {Validate, loginValidation, signupValidation } from '../middlewares/validate.js';
import { Admlogout, Login, addUserAdmin, getAdminById, getAllAdmins, updateAdmin } from '../controllers/admin.controller.js';
import { authorizeAdmin } from '../middlewares/admin.auth.js';
import { authentificateToken } from '../middlewares/auth.js';

const adminRouter = Router();
//----POST----
adminRouter.post("/admin/register", authentificateToken, authorizeAdmin, signupValidation, Validate, addUserAdmin); // seul un admin peut ajouter un autre admin
adminRouter.post("/admin/login", loginValidation, Validate, Login);
adminRouter.post('/admin/logout', authentificateToken, authorizeAdmin, Admlogout);

//----GET----
adminRouter.get("/admin/list", authentificateToken, authorizeAdmin, getAllAdmins);
adminRouter.get("/admin/get/:id", authentificateToken, authorizeAdmin, getAdminById);

//----PUT----
//adminRouter.put('/admin/update/:id' authorizeProprio, updateAdmin);

//----DELETE----
//adminRouter.delete('/admin/del/:id' authorizeProprio, deleteAdmin);

export default adminRouter;