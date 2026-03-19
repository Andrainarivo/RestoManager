import { ServerReservation, ClientReservation } from "../models/reservation.model.js";

// ------------- SERVER SIDE (ADMIN/EMPLOYE) --------------------

export async function createReservation(req, res) {
    try {
        const { email, date, heure, nombre_personne } = req.body;
        if (!email || !date || !heure || !nombre_personne) {
            return res.status(400).json({ status: "error", message: "Champs requis manquants" });
        }

        await ServerReservation.create(email, { date, heure, nombre_personne, status: 0 });
        return res.status(201).json({ status: "success", message: "Réservation créée avec succès" });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

export async function getAllReservations(req, res) {
    try {
        const data = await ServerReservation.findAll();
        return res.status(200).json({ status: "success", data });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

export async function getReservationById(req, res) {
    try {
        const data = await ServerReservation.findById(req.params.reservationId);
        if (!data) return res.status(404).json({ status: "error", message: "Réservation non trouvée" });
        return res.status(200).json({ status: "success", data });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

export async function deleteReservation(req, res) {
    try {
        const result = await ServerReservation.delete(req.params.reservationId);
        if (result.affectedRows === 0) return res.status(404).json({ status: "error", message: "Réservation non trouvée" });
        return res.status(200).json({ status: "success", message: "Réservation supprimée" });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

// PUT & PATCH fusionnés en une seule méthode dans le modèle, mais on peut garder des routes séparées pour la clarté côté client (ex: /reservations/:id pour PUT et /reservations/:id/status pour PATCH de status)
export async function updateReservation(req, res) {
    try {
        const id = req.params.reservationId || req.params.id; // Supporte les deux routes PUT et PATCH
        const allowedFields = ['date', 'heure', 'nombre_personne', 'status'];
        const updates = {};

        Object.keys(req.body).forEach(key => {
            if (allowedFields.includes(key)) updates[key] = req.body[key];
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ status: "error", message: "Aucun champ valide à modifier" });
        }

        const result = await ServerReservation.update(id, updates);
        if (result.affectedRows === 0) return res.status(404).json({ status: "error", message: "Réservation non trouvée" });

        return res.status(200).json({ status: "success", message: "Réservation mise à jour" });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

export async function confirmReservation(req, res) {
    try {
        const result = await ServerReservation.changeStatus(req.params.reservationId, 1);
        if (result.affectedRows === 0) return res.status(404).json({ status: "error", message: "Réservation non trouvée" });
        return res.status(200).json({ status: "success", message: "Réservation confirmée" });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

export async function getClientReservations(req, res) {
    try {
        const clientId = req.params.clientId;
        const data = await ServerReservation.findClientReservations(clientId);
        return res.status(200).json({ status: "success", data });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}


// ------------- CLIENT SIDE --------------------

export async function makeReservation(req, res) {
    try {
        const { date, heure, nombre_personne } = req.body;
        const clientId = req.session.clientID;

        if (!date || !heure || !nombre_personne) {
            return res.status(400).json({ status: "error", message: "Données incomplètes" });
        }

        const newRes = new ClientReservation({ client_id: clientId, date, heure, nombre_personne, status: 1 });
        await ClientReservation.make(newRes);

        return res.status(201).json({ status: "success", message: "Votre réservation est enregistrée" });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

export async function deleteMyReservation(req, res) {
    try {
        const result = await ClientReservation.delete(req.session.clientID, req.params.reservationId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: "error", message: "Réservation introuvable ou ne vous appartient pas" });
        }
        return res.status(200).json({ status: "success", message: "Réservation annulée" });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

export async function updateMyReservation(req, res) {
    try {
        const clientId = req.session.clientID;
        const allowedFields = ['date', 'heure', 'nombre_personne'];
        const updates = {};

        Object.keys(req.body).forEach(key => {
            if (allowedFields.includes(key)) updates[key] = req.body[key];
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ status: "error", message: "Aucun champ valide à modifier" });
        }

        const result = await ClientReservation.update(clientId, req.params.reservationId, updates);
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: "error", message: "Réservation introuvable ou ne vous appartient pas" });
        }

        return res.status(200).json({ status: "success", message: "Réservation mise à jour" });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

export async function confirmMyReservation(req, res) {
    try {
        const result = await ClientReservation.changeStatus(req.session.clientID, req.params.reservationId, 1);
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: "error", message: "Réservation introuvable ou ne vous appartient pas" });
        }
        return res.status(200).json({ status: "success", message: "Réservation confirmée" });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

export async function getMyReservations(req, res) {
    try {
        const clientId = req.session.clientID;
        const data = await ClientReservation.findByClientId(clientId);
        return res.status(200).json({ status: "success", data });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}
