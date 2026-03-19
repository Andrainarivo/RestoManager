import { Router } from "express";
import { create, findById, findAll, updateEmploye, deleteEmploye, authentificateEmploye, getMyKey, updateMyKey, Emplogout } from '../controllers/employe.controller.js';
import { authorizeRoles } from '../middlewares/roles.auth.js';
import { Validate, loginEmployeValidation, signupEmployeValidation, updateEmployeValidation } from "../middlewares/validate.js";
import { authentificateToken } from "../middlewares/auth.js";

const employeRouter = Router();
const allStaff = ['admin', 'Chef-Cuisinier', 'Cuisinier', 'Serveur', 'Others'];

// ---- POST ----
employeRouter.post('/new', authentificateToken, authorizeRoles('admin'), signupEmployeValidation, Validate, create);
employeRouter.post('/login', loginEmployeValidation, Validate, authentificateEmploye);
employeRouter.post('/logout', authentificateToken, authorizeRoles(...allStaff), Emplogout);

// ---- GET ----
employeRouter.get('/list', authentificateToken, authorizeRoles(...allStaff), findAll);
employeRouter.get('/mypk', authentificateToken, authorizeRoles(...allStaff), getMyKey);
employeRouter.get('/get/:id', authentificateToken, authorizeRoles(...allStaff), findById); // Toujours en dernier

// ---- PUT ----
employeRouter.put('/maj/:id', authentificateToken, authorizeRoles('admin'), updateEmployeValidation, Validate, updateEmploye);
employeRouter.put('/mypk/maj', authentificateToken, authorizeRoles(...allStaff), updateMyKey);

// --- DELETE ----
employeRouter.delete('/del/:id', authentificateToken, authorizeRoles('admin'), deleteEmploye);

export default employeRouter;