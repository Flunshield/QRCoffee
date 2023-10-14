# Scripts disponibles

Avant de lancer le projet, merci de lancer l'installation des packages suivant :

### Lancer le serveur de dev
#### Avec les logs
````
docker compose up
````
#### En mode détaché
````
docker compose up -d
````
#### Pour installer des dépendances
Ce mode va lancer l'image, vous pourrez réaliser les npm install...
````
docker compose run -it app bash
````
##### Pour quitter le mode interractif
````
exit
````

### Migration Mongo
```
migrate-mongo create nom_migation (pour crée une migration)
migrate-mongo up pour monter la migration
migrate-mongo down pour descendre la migration
 
```
### Volume Mongo (Docker)
```
Rename le .env.example en .env et modifier les variables d'environnements
exécuter docker compose up -d 
```

### Lancer les test
````
npm run test
````
