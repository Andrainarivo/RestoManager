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
    check('salire').isNumeric().withMessage('Le salaire doit etre un nombre entier'),
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
    check('salire').isNumeric().withMessage('Le salaire doit etre un nombre entier'),
    check('email').isEmail().normalizeEmail().withMessage('Entrer une adresse email valide')
]

export const updatePkValidation = [
    check('personnel_key').notEmpty().isLength({min: 6}).withMessage('La longueur du pk doit etre plus de 6 caractères'),
    check('personnel_key').not().isEmpty().withMessage('personnel key requis')
]


//-------------VERIFICATION INPUT FOR ADD & MAJ OBJECT(commande, reservation, menu, stock et payement)----------------

//pass