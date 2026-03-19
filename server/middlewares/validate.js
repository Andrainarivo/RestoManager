import { validationResult, check } from "express-validator";

//middleware de validation des inputs
export const Validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let error = {};
        errors.array().map((err) => (error[err.param] = err.msg));
        return res.status(422).json({error});
    }
    //les inputs sont validés
    next();
};

//-----------VERIFICATION INPUT(signup& login) FOR USERS (admin, clients et employes)---------------------

// For Admin
export const signupValidation = [
    check('username', 'Username is required').not().isEmpty().trim().escape(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({gmail_remove_dots: true}),
    check('password', 'Password must be 8 or more').isLength({min: 8})
]

export const loginValidation = [
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 8 or more characters').isLength({ min: 8 })
]

// for clients
export const signupClientValidation = [
    check('nom', 'Key nom required on request.body.keys').not(),
    check('nom', 'Votre nom est requis').not().isEmpty().trim().escape(),
    check('prenom').not().isEmpty().withMessage({message: 'Votre prenom est requis'}).trim().escape(),
    check('email').isEmail().withMessage('Entrer une adresse email valide').normalizeEmail(),
    check('password').notEmpty().isLength({min: 6}).withMessage('Devrais etre plus de 6 caractère')
]

export const loginClientValidation = [
    check(['email', 'password'], 'Keys email & password required on req.body.keys').not(),
    check('email').isEmail().normalizeEmail().withMessage('Entrer une adresse email valide'),
    check('password').notEmpty().isLength({min: 6}).withMessage('Entrer un mot de passe valide')
]

// for employes
export const signupEmployeValidation = [
    check(['nom', 'prenom']).not().isEmpty().withMessage('Nom et prenom de l\'employé requis').trim().escape(),
    check('poste').contains(['Chef-Cuisinier', 'Serveur', 'Cuisinier', 'Others']).withMessage('Entrer un poste d\'employé valide').trim().escape(),
    check('salaire').isNumeric().withMessage('Le salaire doit etre un nombre entier'),
    check('email').isEmail().normalizeEmail().withMessage('Entrer une adresse email valide')
]

export const loginEmployeValidation = [
    check('email').isEmail().normalizeEmail().withMessage('Entrer une adresse email valide'),
    check('personnel_key').notEmpty().isLength({min: 6}).withMessage('Entrer un pk valide')
]

//---------------VERIFICATION INPUT FOR PUT USERS(admin, clients et employes)----------------------
// for maj admin
export const updateValidation = [
    check('username', 'Username is required').not().isEmpty().trim().escape(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({gmail_remove_dots: true}),
    check('password', 'Password must be 8 or more').isLength({min: 8})
]

// for maj clients
export const updateClientValidation = [
    check('nom', 'Key nom required on request.body.keys').not(),
    check('nom').not().isEmpty().withMessage('Votre nom est requis').trim().escape(),
    check('prenom').not().isEmpty().withMessage('Votre prenom est requis').trim().escape(),
    check('email').isEmail().withMessage('Entrer une adresse email valide').normalizeEmail(),
    check('password').notEmpty().isLength({min: 6}).withMessage('Devrais etre plus de 6 caractère')
]

// for maj employes
export const updateEmployeValidation = [
    check(['nom', 'prenom']).not().isEmpty().withMessage('Nom et prenom de l\'employé requis').trim().escape(),
    check('poste').contains(['Chef-Cuisinier', 'Serveur', 'Cuisinier', 'Others']).withMessage('Entrer un poste d\'employé valide').trim().escape(),
    check('salaire').isNumeric().withMessage('Le salaire doit etre un nombre entier'),
    check('email').isEmail().normalizeEmail().withMessage('Entrer une adresse email valide')
]

export const updatePkValidation = [
    check('personnel_key').notEmpty().isLength({min: 6}).withMessage('La longueur du pk doit etre plus de 6 caractères'),
    check('personnel_key').not().isEmpty().withMessage('personnel key requis')
]


//-------------VERIFICATION INPUT FOR ADD & MAJ OBJECT(commande, reservation, menu, stock)----------------

// --- MENU ---
export const menuValidation = [
    check('nom').notEmpty().withMessage('Le nom du menu est requis').trim().escape(),
    // isFloat permet d'accepter les décimales (ex: 12.50) et min: 0 empêche les prix négatifs
    check('prix').isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif'),
    // On force la catégorie à faire partie d'une liste stricte
    check('categorie').isIn(['entrée', 'principal', 'dessert', 'boisson']).withMessage('Catégorie invalide (entrée, principal, dessert, boisson)'),
    // La description est facultative, mais si elle est là, on la nettoie
    check('description').optional().trim().escape()
];

export const patchMenuValidation = [
    check('nom').optional().trim().escape(),
    check('prix').optional().isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif'),
    check('categorie').optional().isIn(['entrée', 'principal', 'dessert', 'boisson']).withMessage('Catégorie invalide'),
    check('description').optional().trim().escape()
];

// --- RESERVATION ---
export const serverReservationValidation = [
    check('email').isEmail().normalizeEmail().withMessage('Une adresse email valide est requise'),
    // Vérifie le format de la date (YYYY-MM-DD)
    check('date').isDate({ format: 'YYYY-MM-DD' }).withMessage('Format de date invalide (attendu: YYYY-MM-DD)'),
    // Regex pour valider l'heure au format HH:MM (de 00:00 à 23:59)
    check('heure').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Heure invalide (attendu: HH:MM)'),
    check('nombre_personne').isInt({ min: 1, max: 50 }).withMessage('Le nombre de personnes doit être compris entre 1 et 50')
];

export const clientReservationValidation = [
    // Le client n'envoie pas son email, on le récupère du token/session
    check('date').isDate({ format: 'YYYY-MM-DD' }).withMessage('Format de date invalide (attendu: YYYY-MM-DD)'),
    check('heure').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Heure invalide (attendu: HH:MM)'),
    check('nombre_personne').isInt({ min: 1, max: 50 }).withMessage('Le nombre de personnes doit être compris entre 1 et 50')
];

// --- COMMANDE ---
export const serverCommandeValidation = [
    check('client_id').isInt().withMessage('L\'ID du client doit être un nombre entier'),
    check('menu_id').isInt().withMessage('L\'ID du menu doit être un nombre entier'),
    check('genre').isIn(['Sur place', 'A emporter', 'A livrer']).withMessage('Genre de commande invalide')
];

export const clientCommandeValidation = [
    // Le client_id est récupéré depuis le token, donc pas besoin de le valider dans le body
    check('menu_id').isInt().withMessage('L\'ID du menu doit être un nombre entier'),
    check('genre').isIn(['Sur place', 'A emporter', 'A livrer']).withMessage('Genre de commande invalide')
];

// --- STOCK ---
export const stockValidation = [
    check('menu_id').isInt().withMessage('L\'ID du menu doit être un nombre entier'),
    check('quantite_dispo').isInt({ min: 0 }).withMessage('La quantité disponible ne peut pas être négative')
];