// routes /employe.route.js

import { Router } from "express";
import {create, findById, findAll, updateEmploye, deleteEmploye, authentificateEmploye, getMyKey, updateMyKey} from '../controllers/employe.controller.js';
import { authorizeEmploye } from "../middlewares/employe.auth.js";
import { Validate, loginEmployeValidation, signupEmployeValidation, updateEmployeValidation } from "../middlewares/validate.js";
import { authorizeAdmin } from "../middlewares/admin.auth.js";

const employeRouter = Router();

//----POST----
employeRouter.post('/employes/new', authorizeAdmin, signupEmployeValidation, Validate, create);
employeRouter.post('/employes/login', loginEmployeValidation, Validate, authentificateEmploye);

//----GET----
employeRouter.get('/employes/list', authorizeEmploye, findAll);
employeRouter.get('/employes/get/:id', authorizeEmploye, findById);
employeRouter.get('/employes/mypk', authorizeEmploye, getMyKey);

//----PUT----
employeRouter.put('/empoyes/maj/:id', authorizeAdmin, updateEmployeValidation, Validate, updateEmploye);
employeRouter.put('/employes/mypk/maj', authorizeEmploye, updateMyKey);

//---DELETE----
employeRouter.delete('/employes/del/:id', authorizeAdmin, deleteEmploye);


export default employeRouter;