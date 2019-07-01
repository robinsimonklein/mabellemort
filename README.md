[![Netlify Status](https://api.netlify.com/api/v1/badges/2327550e-3f43-473b-bb55-1a0858936ca5/deploy-status)](https://app.netlify.com/sites/mabellemort/deploys)

# ☠ Ma Belle Mort ☠

Ma Belle Mort c'est un moyen d'échanger, pendant un instant, avec sa propre mort 
afin d'embellir la représentation qu'on s'en fait tout en passant un bon moment !
<br>
[Voir le projet](https://mabellemort.netlify.com)

### Pré-requis
	
Pour fonctionner, le projet doit être connecté à un serveur Node.js distant : [mabellemort-server](https://github.com/robinsimonklein/mabellemort-server). 
Installer le serveur et suivre les [instructions](https://github.com/robinsimonklein/mabellemort-server#mabellemort-server) pour le lancer.

## :package: Installer le projet
```
npm install
```
Copier le contenu du fichier `.env.example` dans un nouveau fichier `.env` placé à la racine.

## :building_construction: Compiler le projet
### Pour le dévelopment
```
npm run serve
```

Le projet sera disponible à `localhost:8080`.

###  Pour la production
```
npm run build
```

## :mag: Tests et corrections
### Mode TEST

Il est possible de désactiver les temps de chargement dans la discussion pour aller plus vite durant la phase de développement.<br>
Pour cela : dans **store.js**, passer la variable 
```js 
{
    ...
    testMode : true
    ...
}
```

### Lancer les tests
```
npm run test
```

### Lints et corrections
```
npm run lint
```

## :rocket: Produciton

Le projet est hébergé sur **Netlify** à l'adresse : [mabellemort.netlify.com](http://mabellemort.netlify.com).
<br>
Pour déployer le projet sur Netlify, il suffit de merger la branche **master** sur la branche **production**.

<br>

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)