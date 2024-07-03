// controllers /reservation

import {ServerReservation, ClientReservation} from "../models/reservation.model.js";


//-------------SERVER RESERVATION--------------------
// enregistrer une nouvelle reservation
// Champs requis : email, date, heure et nombre_personne
export function createReservation(req, res){

    if (Object.keys(req.body).length < 3) {
        res.status(400).send({error:true, message:'Reinseigner tous les champs requis'});
        return;
    }

    const reservation = {
        client_id: null,
        date: req.body.date,
        heure: req.body.heure,
        nombre_personne: req.body.nombre_personne
    };

    const newReservation = new ServerReservation(reservation);
    ServerReservation.create(req.body.email, newReservation, (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        }
        if (err == 'TypeError') {
            res.send(err);
            return;
        }
        res.status(201).json({error:false, message:'Réservation créer avec succès'});
        return;
    });
}

// Récuperer une reservation par son ID
export function getReservationById(req, res){
    const reservationId = req.params.id;

    ServerReservation.findById(reservationId, (err, reservation) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.json(reservation);
        return;
    });

}

// Récuperer toutes réservations
export function getAllReservations(req, res){
    ServerReservation.findAll((err, reservations) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.json(reservations);
        return;
    });
}

// Méttre à jour une reservation par son id
// champs requis: client_id, date, heure, nombre_personne
export function updateReservation(req, res){
    const reservationId = req.params.id;

    if (Object.keys(req.body).length < 3) {
        res.status(400).send({error:true, message:'Renseigner tous les champs'});
        return;
    }

    const reservation = {
        client_id: req.body.client_id,
        date: req.body.date,
        heure: req.body.heure,
        nombre_personne: req.body.nombre_personne
    };

    ServerReservation.update(reservationId, reservation, (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.status(200).json({error:false, message:'Reservation mise à jour avec succès'});
        return;
    });
}

// Supprimer une reservation par son ID
export function deleteReservation(req, res){
    const reservationId = req.params.id;

    ServerReservation.delete(reservationId, (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.json({message: 'Reservation supprimée avec succès'});
        return;
    })
}

// Récuperer toutes les reservations d'un client par son client_id
export function getClientReservation(req, res){
    const clientId = req.params.id;

    ServerReservation.findClientReservation(clientId, (err, clientReservation) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.json(clientReservation);
        return;
    });
}

// Changer la status à 1 si la reservation  a été confirmé par le client
export function confirm(req, res){
    //
    const reservationId = req.params.id;

    ServerReservation.changeStatus(reservationId, (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.json({message: 'Reservation ' + reservationId + ' confirmée'});
        return;
    });
}

//--------------CLIENT RESERVATION-------------------

// faire une nouvelle reservation
// Champs requis: date, heure, nb_personne
export function makeReservation(req, res) {

    if (Object.keys(req.body).length < 3){
        res.status(400).send({error:true, message:'Reinseigner tous les champs requis'});
        return;
    }; 

    const reservation = {
        client_id: req.session.clientId,
        date: req.body.date,
        heure: req.body.heure,
        nombre_personne: req.body.nombre_personne
    };

    const newReservation = new ServerReservation(reservation);
    ClientReservation.make(newReservation, (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        }
        else{
            res.status(200).json('Votre réservation a été effectué avec succès');
            return;
        };
    });
}

// Méttre à jour une reservation
export function updateMyReservation(req, res){
    const reservationId = req.params.id;

    if (Object.keys(req.body).length < 3) res.status(400).send({error:true, message:'Renseigner tous les champs'});

    const reservation = {
        date: req.body.date,
        heure: req.body.heure,
        nombre_personne: req.body.nombre_personne
    };

    ClientReservation.update(req.session.clientId, reservationId, reservation, (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        } 
        res.status(200).json({error:false, message:'Votre reservation a bien été mise à jour'});
        return;
    });
}

// Supprimer une reservation par son ID
export function deleteMyReservation(req, res){
    const reservationId = req.params.id;

    ClientReservation.delete(req.session.clientId, reservationId, (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.json({message: 'Votre reservation a été annulé'});
        return;
    });
}

// Récuperer toutes les reservations d'un client
export function getMyReservation(req, res){
    const clientId = req.session.clientID;

    ClientReservation.findClientReservation(clientId, (err, clientReservation) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.json(clientReservation);
        return;
    });
}