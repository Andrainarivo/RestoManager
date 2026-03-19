import bcrypt from 'bcrypt';
import dbPool from '../configs/db.config.js';
import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

async function seedAdmin() {
    // Initialisation de l'interface interactive du terminal
    const rl = readline.createInterface({ input, output });

    try {
        console.log("\n🛡️ --- Initialisation du Super Administrateur --- 🛡️\n");

        // 1. Sécurité : Vérifier si un admin existe déjà
        const [rows] = await dbPool.query("SELECT * FROM Admin LIMIT 1"); 
        
        if (rows.length > 0) {
            console.log("⚠️ Opération annulée : Un administrateur existe déjà dans la base de données.");
            process.exit(0);
        }

        // 2. Récupération interactive des identifiants
        const username = await rl.question("👤 Nom d'utilisateur Admin : ");
        const email = await rl.question("✉️  Email de l'Admin : ");
        const password = await rl.question("🔑 Mot de passe (min 8 caractères) : ");

        if (password.length < 8) {
            console.log("\n❌ Erreur : Le mot de passe doit faire au moins 8 caractères.");
            process.exit(1);
        }

        // 3. Hachage du mot de passe
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 4. Insertion sécurisée en base de données
        const sql = "INSERT INTO Admin (Email, Username, Password) VALUES (?, ?, ?)";
        await dbPool.query(sql, [email, username, hashedPassword]);

        console.log("\n✅ Super Administrateur créé avec succès ! Tu peux maintenant te connecter via l'API.");

    } catch (error) {
        console.error("\n❌ Erreur lors de la création :", error.message);
    } finally {
        // Fermeture propre pour rendre la main au terminal
        rl.close();
        await dbPool.end(); 
    }
}

seedAdmin();