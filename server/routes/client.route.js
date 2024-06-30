// routes/client.route.js

import { Router } from 'express';
import { createClient, getAllClients, getClientById, updateClient, deleteClient, authentificateClient } from '../controllers/client.controller.js';
import { authorizeClient } from '../middlewares/client.auth.js';

const clientRouter = Router();

clientRouter.post('/clients/register', createClient);
clientRouter.get('/clients', getAllClients);
clientRouter.get('/clients/:id', getClientById);
clientRouter.put('/clients/:id', updateClient);
//clientRouter.patch('/clients/:id', patchClient);
clientRouter.delete('/clients/:id', deleteClient);

clientRouter.post('/clients/login', authentificateClient);
clientRouter.get('/profile', authorizeClient, (req, res) => {
    res.send('Bienvenue sur votre profile. Click to <a href="/logout">logout</a>');
});

export default clientRouter;
