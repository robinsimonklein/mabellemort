## Messages

### BubbleMessage

Les **BubbleMessage** sont les messages les plus classiques, dans une bulle. 
<br>
On peut spécifier plusieurs textes différents : un seul sera choisit aléatoirement à l'affichage.

```json
"m0" : {
    "type": "message",
    "component": "BubbleMessage",
    "data": {
      "text": [
        "Bienvenue ! Heureuse de te voir ici.",
        "Enchantée. Je me présente, je suis ta mort.",
        "Bonjour ! Je t'attendais. Ma montre est en avance."
      ],
      "sender": "Ma Belle Mort"
    },
    "next": "m1",
    "done": false
  }
```

### ImageMessage

```json
"m11": {
    "type": "message",
    "component": "ImageMessage",
    "data": {
      "src": "/assets/messages/gif/amour.gif",
      "sender": "Ma Belle Mort"
    },
    "next": "m12",
    "done": false
  }
```

### FloatingMessage
#### Sans parallax
```json
  "m81": {
    "type": "message",
    "component": "FloatingMessage",
    "data": {
      "id": "m81",
      "parallax": false,
      "sender": "Ma Belle Mort"
    },
    "next": "m82",
    "done": false
  }
```
#### Avec parallax
```json
  "m81": {
    "type": "message",
    "component": "FloatingMessage",
    "data": {
      "id": "m81",
      "parallax": true,
      "sender": "Ma Belle Mort"
    },
    "next": "m82",
    "done": false
  }
```