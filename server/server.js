// Principal express server

// module dependances
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// app module
import clientRouter from './routes/client.route.js';
import employeRouter from './routes/employe.route.js';
import reservationRouter from './routes/reservation.route.js';
import menuRouter from './routes/menus.route.js';
import commandeRouter from './routes/commande.route.js';
import stockRouter from './routes/stock.route.js';
import adminRouter from './routes/admin.route.js';

import { config } from 'dotenv';
config();

// create server express
const app = express();
const port= process.env.PORT;

// configuration header information
app.use(cors());
app.use(cookieParser())
app.disable("x-powered-by");

// parse requests of content-type  - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : false}));
// parse requests of content-type  - application/json
app.use(bodyParser.json());

// Configuration de express-session
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'very secret'
}));

// root route
app.get('/', (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            message: "Welcome to RestoManager API! Explore the endpoints to manage clients, employees, reservations, menus, commandes, stocks, and admins."
        });
        //console.log(req.session)
    } catch (error) {
        res.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    };

});

// Utilisation des routes /routes
app.use("/api/clients", clientRouter);
app.use("/api/employes", employeRouter);
app.use("/api/reservations", reservationRouter);
app.use("/api/menus", menuRouter);
app.use("/api/commandes", commandeRouter);
app.use("/api/stocks", stockRouter);
app.use("/api/admin", adminRouter);

// Start Express App
app.listen(port, ()=> {
    console.log(`Express running on http://localhost:${port}`);
});