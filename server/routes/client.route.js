// routes/client.route.js

import { Router } from 'express';
import { createClient, getAllClients, getClientById, updateClient, deleteClient, authentificateClient } from '../controllers/client.controller.js';
import { authorizeClient } from '../middlewares/client.auth.js';
import { Validate, loginClientValidation, signupClientValidation, updateClientValidation } from '../middlewares/validate.js';
import { authorizeEmploye } from '../middlewares/employe.auth.js';
import { authorizeAdmin } from '../middlewares/admin.auth.js';

const clientRouter = Router();

//----POST----
clientRouter.post('/clients/register', signupClientValidation, Validate, createClient);
clientRouter.post('/clients/login', loginClientValidation, Validate, authentificateClient);

//----GET-----
clientRouter.get('/clients/list', authorizeEmploye || authorizeAdmin, getAllClients);
clientRouter.get('/clients/:id', authorizeEmploye || authorizeAdmin, getClientById);
clientRouter.get('/clients/profile', authorizeClient, (req, res) => {
    res.send('Bienvenue sur votre profile. Click to <a href="/logout">logout</a>');
});

//----PUT----
clientRouter.put('/clients/update/', authorizeClient, updateClientValidation, Validate, updateClient);
//clientRouter.patch('/clients/:id', patchClient);

//---DELETE----
clientRouter.delete('/clients/del/:id', authorizeAdmin, deleteClient);


export default clientRouter;
