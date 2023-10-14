module.exports = {
    require: 'chai/register-should', // Charger le module Chai pour les assertions
    spec: 'test/**/*.js', // Spécifie les fichiers de test à exécuter (utilise les chemins corrects)
    timeout: 5000, // Optionnel : définir le délai d'attente pour les tests en millisecondes
};
