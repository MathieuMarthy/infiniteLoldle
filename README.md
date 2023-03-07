
# Infinite Loldle

/!\ Site en développement 

Ce site s'inspire du site [LoLdle](https://loldle.net).  
Infinite Loldle regroupe plusieurs mini-jeux sur l'univers de League of Legends.  
Le but de ces mini-jeux est de retrouver des personnages en fonction de leurs  
images, spécificités ou de leur voix.

Une API est disponible pour récupérer des données sur les personnages de League of Legends. [Lien vers la documentation](#Documentation-de-lapi)
## Technologies utilisées

**Client:** React, TailwindCSS

**Server:** Node, Hapi, Swagger


## Installer & lancer localement

Cloner le projet

```bash
  git clone https://github.com/MathieuMarthy/infiniteLoldle.git
```

Aller dans le répertoire du projet

```bash
  cd infiniteLoldle
```

### Pour le serveur

Aller dans le répertoire du serveur

```bash
  cd serveur
```

Installer les dépendances

```bash
  npm install
```

Lancer le server

```bash
  npm run start
```

### Pour le client
/!\ le client a besoin du serveur pour fonctionner

Aller dans le répertoire du client

```bash
  cd client
```

Installer les dépendances

```bash
  npm install
```

Lancer le client

```bash
  npm run start
```


## Documentation de l'api

Quand le serveur est lancé en local, la documentation est disponible à l'adresse http://localhost:5000/documentation
