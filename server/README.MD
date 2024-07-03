# GESTION DE RESTAURANT

#node version 22.1.0

#ajouté un user admin au préalable dans la bdd (requis)

Script de configuration: configs/create_db.js && configs/create_table.js (run with node) [Création de la db et des tables]

Configuration de la base de donnée MySQL ==> .env (IMPORTANT)

Start APP [

    npm init

    npm install

    npm start

]

Structure Modele-Controller-Route de l'application :

### Modèles de Données :

1. **Clients** :

   * client_id
   * nom
   * prenom
   * email
   * password
2. **Réservations** :

   * reservation_id
   * client_id (clé étrangère vers Clients)
   * date
   * heure
   * nombre_personnes
   * status
3. **Menus** :

   * menu_id
   * nom
   * description
   * prix
   * categorie
4. **Commandes** :

   * commande_id
   * client_id (clé étrangère vers Clients)
   * menu_id (clé étrangère vers Menus)
   * genre
   * date (current timestamp)
5. **Stocks** :

   * stock_id
   * menu_id (clé etrangère vers Menus(menu_id))
   * quantite_dispo
   * ...
6. **Employes** :

   * employe_id
   * nom
   * prenom
   * poste
   * salaire
   * email
   * personnel_key

7. **Admin** :

   * username
   * email
   * password

### Contrôleurs et Routes :
routes => /routes

1. **Clients** :
   * Contrôleur : client.controller.js
   * Routes :
     * GET /clients
     * POST /clients
     * GET /clients/:id
     * PUT /clients/:id
     * DELETE /clients/:id
2. **Réservations** :
   * Contrôleur : reservation.controller.js
   * Routes :
     * GET /reservations
     * POST /reservations
     * GET /reservations/:id
     * PUT /reservations/:id
     * DELETE /reservations/:id
3. **Menus** :
   * Contrôleur : menu.controller.js
   * Routes :
     * GET /menus
     * POST /menus
     * GET /menus/:id
     * PUT /menus/:id
     * DELETE /menus/:id
4. **Commandes** :
   * Contrôleur : commande.controller.js
   * Routes :
     * GET /commandes
     * POST /commandes
     * GET /commandes/:id
     * PUT /commandes/:id
     * DELETE /commandes/:id
5. **Stocks** :
   * Contrôleur : stock.controller.js
   * Routes :
     * GET /stocks
     * POST /stocks
     * GET /stocks/:id
     * PUT /stocks/:id
     * DELETE /stocks/:id
6. **Employes** :
   * Contrôleur : employe.controller.js
   * Routes :
     * GET /employes
     * POST /employes
     * GET /emlpoyes/:id
     * PUT /employes/:id
     * DELETE /employes/:id
