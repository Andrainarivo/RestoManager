import { Router } from "express";
import { createReservation, getReservationById, getAllReservations, updateReservation, deleteReservation, getClientReservation, confirm, makeReservation, getMyReservation, updateMyReservation, deleteMyReservation } from "../controllers/reservation.controller.js";
import { authorizeClient } from "../middlewares/client.auth.js";
import { authorizeChef, authorizeEmploye, authorizeServer } from "../middlewares/employe.auth.js";
import { authentificateToken } from "../middlewares/auth.js";

const reservationRouter = Router();

//----------SERVER-----------
reservationRouter.post('/reservations/new', authentificateToken, authorizeServer || authorizeChef, createReservation);
reservationRouter.get('/reservations/get/:id', authentificateToken, authorizeEmploye, getReservationById);
reservationRouter.get('/reservations/list', authentificateToken, authorizeEmploye, getAllReservations);
reservationRouter.put('/reservations/maj/:id', authentificateToken, authorizeServer || authorizeChef, updateReservation);
reservationRouter.delete('/reservations/cancel/:id', authentificateToken, authorizeChef || authorizeServer, deleteReservation);
reservationRouter.get('/reservations/clients/:id', authentificateToken, authorizeEmploye, getClientReservation);
reservationRouter.put('/reservations/confirm/:id', authentificateToken, authorizeServer, confirm);

//----------CLIENT--------------
reservationRouter.post('/clients/reservations/new', authentificateToken, authorizeClient, makeReservation);
reservationRouter.get('/clients/reservations/get', authentificateToken, authorizeClient, getMyReservation);
reservationRouter.put('/clients/reservations/maj/:id', authentificateToken, authorizeClient, updateMyReservation);
reservationRouter.delete('/clients/reservation/cancel/:id', authentificateToken, authorizeClient, deleteMyReservation);

export default reservationRouter;