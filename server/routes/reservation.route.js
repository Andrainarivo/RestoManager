import { Router } from "express";
import { createReservation, getReservationById, getAllReservations, updateReservation, deleteReservation, getClientReservations, confirmReservation, makeReservation, deleteMyReservation, confirmMyReservation, updateMyReservation, getMyReservations } from "../controllers/reservation.controller.js";
import { authentificateToken } from "../middlewares/auth.js";
import { authorizeRoles } from '../middlewares/roles.auth.js';
import { Validate, serverReservationValidation, clientReservationValidation } from '../middlewares/validate.js';

const reservationRouter = Router();
const allEmployes = ['Chef-Cuisinier', 'Cuisinier', 'Serveur', 'admin'];

// ---------- SERVER -----------
reservationRouter.post('/server/new', authentificateToken, authorizeRoles('Serveur', 'Chef-Cuisinier', 'admin'), serverReservationValidation, Validate, createReservation);
reservationRouter.get('/server/list', authentificateToken, authorizeRoles(...allEmployes), getAllReservations);
reservationRouter.get('/server/get/:reservationId', authentificateToken, authorizeRoles(...allEmployes), getReservationById);
reservationRouter.get('/server/list/:clientId', authentificateToken, authorizeRoles(...allEmployes), getClientReservations);

// Mises à jour serveur
reservationRouter.put('/server/maj/:reservationId', authentificateToken, authorizeRoles('Serveur', 'Chef-Cuisinier', 'admin'), serverReservationValidation, Validate, updateReservation);
reservationRouter.patch('/server/patch/:reservationId', authentificateToken, authorizeRoles('Serveur', 'Chef-Cuisinier', 'admin'), updateReservation);
reservationRouter.put('/server/confirm/:reservationId', authentificateToken, authorizeRoles('Serveur', 'admin'), confirmReservation);

reservationRouter.delete('/server/cancel/:reservationId', authentificateToken, authorizeRoles('Serveur', 'Chef-Cuisinier', 'admin'), deleteReservation);
// ---------- CLIENT --------------
reservationRouter.post('/clients/new', authentificateToken, authorizeRoles('client'), clientReservationValidation, Validate, makeReservation);
reservationRouter.get('/clients/get', authentificateToken, authorizeRoles('client'), getMyReservations);
reservationRouter.put('/clients/maj/:reservationId', authentificateToken, authorizeRoles('client'), clientReservationValidation, Validate, updateMyReservation);
reservationRouter.delete('/clients/cancel/:reservationId', authentificateToken, authorizeRoles('client'), deleteMyReservation);
reservationRouter.put('/clients/confirm/:reservationId', authentificateToken, authorizeRoles('client'), confirmMyReservation);


export default reservationRouter;
