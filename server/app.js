// Server principal express

// module dependances
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';


// app module
import clientRouter from './routes/client.route.js';
import employeRouter from './routes/employe.route.js';
import reservationRouter from './routes/reservation.route.js';
import menuRouter from './routes/menus.route.js';
import commandeRouter from './routes/commande.route.js';
import stockRouter from './routes/stock.route.js';

const app = express();
const port= process.env.PORT;

// parser les données depuis x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// Configuration de express-session
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'very secret'
}));



// Route racine
app.get('/', (req, res) => {
    res.send('Hello World');
    //console.log(req.session.clientID);

});

// Utilisation des routes /routes
app.use(clientRouter);
app.use(employeRouter);
app.use(reservationRouter);
app.use(menuRouter);
app.use(commandeRouter);
app.use(stockRouter);

// Start Express App
app.listen(port, ()=> {
    console.log(`Express running on http://localhost:${port}`);
});