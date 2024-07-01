import {Router} from 'express';
import {Validate, loginValidation, signupValidation } from '../middlewares/validate.js';
import { Login, addUserAdmin, getAdminById, getAllAdmins, updateAdmin } from '../controllers/admin.controller.js';
import { authorizeAdmin } from '../middlewares/admin.auth.js';

const adminRouter = Router();
//----POST----
adminRouter.post("/admin/register", authorizeAdmin, signupValidation, Validate, addUserAdmin);
adminRouter.post("/admin/login", loginValidation, Validate, Login);

//----GET----
adminRouter.get("/admin/list", authorizeAdmin, getAllAdmins);
adminRouter.get("/admin/get/:id", authorizeAdmin, getAdminById);

//----PUT----
//adminRouter.put('/admin/update/:id' authorizeProprio, updateAdmin);

//----DELETE----
//adminRouter.delete('/admin/del/:id' authorizeProprio, deleteAdmin);

export default adminRouter;