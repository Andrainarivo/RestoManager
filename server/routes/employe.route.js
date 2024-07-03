// routes /employe.route.js

import { Router } from "express";
import {create, findById, findAll, updateEmploye, deleteEmploye, authentificateEmploye, getMyKey, updateMyKey, Emplogout} from '../controllers/employe.controller.js';
import { authorizeEmploye } from "../middlewares/employe.auth.js";
import { Validate, loginEmployeValidation, signupEmployeValidation, updateEmployeValidation } from "../middlewares/validate.js";
import { authorizeAdmin } from "../middlewares/admin.auth.js";
import { authentificateToken } from "../middlewares/auth.js";

const employeRouter = Router();

//----POST----
employeRouter.post('/employes/new', authentificateToken, authorizeAdmin, signupEmployeValidation, Validate, create);
employeRouter.post('/employes/login', loginEmployeValidation, Validate, authentificateEmploye);
employeRouter.post('/employes/logout', authentificateToken, authorizeEmploye, Emplogout);

//----GET----
employeRouter.get('/employes/list', authentificateToken, authorizeEmploye, findAll);
employeRouter.get('/employes/get/:id', authentificateToken, authorizeEmploye, findById);
employeRouter.get('/employes/mypk', authentificateToken, authorizeEmploye, getMyKey);

//----PUT----
employeRouter.put('/empoyes/maj/:id', authorizeAdmin, updateEmployeValidation, Validate, updateEmploye);
employeRouter.put('/employes/mypk/maj', authentificateToken, authorizeEmploye, updateMyKey);

//---DELETE----
employeRouter.delete('/employes/del/:id', authentificateToken, authorizeAdmin, deleteEmploye);


export default employeRouter;