[![Netlify Status](https://api.netlify.com/api/v1/badges/2327550e-3f43-473b-bb55-1a0858936ca5/deploy-status)](https://app.netlify.com/sites/mabellemort/deploys)

# Ma Belle Mort

Ma Belle Mort c'est un moyen d'échanger, pendant un instant, avec sa propre mort 
afin d'embellir la représentation qu'on s'en fait tout en passant un bon moment !
<br>
[Voir le projet](https://mabellemort.netlify.com)

### Pré-requis
	
Pour fonctionner, le projet doit être connecté à un serveur Node.js distant : [mabellemort-server](https://github.com/robinsimonklein/mabellemort-server). 
Installer le serveur et suivre les [instructions](https://github.com/robinsimonklein/mabellemort-server#mabellemort-server) pour le lancer.

## Installer le projet
```
npm install
```
### Configuration
Pour configurer le projet en local, copier le contenu du fichier *.env.example* dans un nouveau fichier *.env* placé à la racine.

## Compiler le projet
### Pour le dévelopment
```
npm run serve
```

Le projet sera disponible à `localhost:8080`.

### Pour la production
```
npm run build
```

## Tests et corrections
<!--
### Lancer les tests
```
npm run test
```
-->

### Lints et corrections
```
npm run lint
```

##  Produciton

Le projet est hébergé sur **Netlify** à l'adresse : [mabellemort.netlify.com](http://mabellemort.netlify.com).
<br>
Pour déployer le projet sur Netlify, il suffit de merger la branche **master** sur la branche **production**.