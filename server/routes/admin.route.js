import { Router } from 'express';
import { Validate, loginValidation, signupValidation, updateValidation } from '../middlewares/validate.js';
import { Admlogout, Login, addUserAdmin, getAdminById, getAllAdmins, updateAdmin, deleteAdmin } from '../controllers/admin.controller.js';
import { authorizeRoles } from '../middlewares/roles.auth.js';
import { authentificateToken } from '../middlewares/auth.js';

const adminRouter = Router();

// ---- POST ----
// Seul un admin existant peut en ajouter un autre
adminRouter.post("/register", authentificateToken, authorizeRoles('admin'), signupValidation, Validate, addUserAdmin); 
adminRouter.post("/login", loginValidation, Validate, Login);
adminRouter.post('/logout', authentificateToken, authorizeRoles('admin'), Admlogout);

// ---- GET ----
adminRouter.get("/list", authentificateToken, authorizeRoles('admin'), getAllAdmins);
adminRouter.get("/get/:id", authentificateToken, authorizeRoles('admin'), getAdminById);

// ---- PUT ----
// Ajout du middleware de validation pour l'update
adminRouter.put('/update/:id', authentificateToken, authorizeRoles('admin'), updateValidation, Validate, updateAdmin);

// ---- DELETE ----
adminRouter.delete('/del/:id', authentificateToken, authorizeRoles('admin'), deleteAdmin);

export default adminRouter;