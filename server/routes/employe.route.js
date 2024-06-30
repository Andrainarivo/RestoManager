// routes /employe.route.js

import { Router } from "express";
import {create, findById, findAll, updateEmploye, deleteEmploye, authentificateEmploye, getMyKey, updateMyKey} from '../controllers/employe.controller.js';
import { authorizeEmploye } from "../middlewares/employe.auth.js";

const employeRouter = Router();

employeRouter.post('/employes/new', create);
employeRouter.post('/employes/login', authentificateEmploye);
employeRouter.get('/employes/get', findAll);
employeRouter.get('/employes/get/:id', findById);
employeRouter.put('/empoyes/maj/:id', updateEmploye);
employeRouter.delete('employes/del/:id', deleteEmploye);

employeRouter.get('/employes/mypk', authorizeEmploye, getMyKey);
employeRouter.put('/employes/mypk/maj', authorizeEmploye, updateMyKey);

export default employeRouter;