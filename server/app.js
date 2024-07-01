// Server principal express

// module dependances
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';


// app module
import clientRouter from './routes/client.route.js';
import employeRouter from './routes/employe.route.js';
import reservationRouter from './routes/reservation.route.js';
import menuRouter from './routes/menus.route.js';
import commandeRouter from './routes/commande.route.js';
import stockRouter from './routes/stock.route.js';
import adminRouter from './routes/admin.route.js';

// create server express
const app = express();
const port= process.env.PORT;

// configuration header information
app.use(cors());
app.disable("x-powered-by");

// parser les données depuis x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : false}));
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
            message: "Welcome to API gestion_resto"
        });
        //console.log(req.session.clientID)
    } catch (error) {
        res.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    };

});

// Utilisation des routes /routes
app.use(clientRouter);
app.use(employeRouter);
app.use(reservationRouter);
app.use(menuRouter);
app.use(commandeRouter);
app.use(stockRouter);
app.use(adminRouter);

// Start Express App
app.listen(port, ()=> {
    console.log(`Express running on http://localhost:${port}`);
});