# 📝 Fiche de révision : Chargement et Affichage Dynamique de Données (JSON & DOM)

Salut ! Ravi de t'accompagner sur ce projet. En tant que développeur senior, mon rôle est de te donner les clés non seulement pour que ton composant de graphique fonctionne, mais pour que tu comprennes **le pourquoi du comment** et que tu puisses réutiliser ces concepts dans toutes tes futures applications !

Tu as fourni un super travail de recherche et de logique sur ce composant de dépenses. Voici la synthèse de nos échanges, structurée pour tes notes personnelles.

---

### 1. L'analogie : Le Fichier JSON, c'est ta base de données locale

Imagine que ton site internet est une **boutique physique**. 
- Ton fichier `data.json` est le **registre ou le catalogue des stocks** rangé dans un tiroir à l'arrière-boutique.
- Ton fichier `main.js` est le **vendeur** qui a besoin de lire ce registre pour afficher les prix en rayon.
- Le problème, c'est que pour des raisons de sécurité, le vendeur n'a pas le droit d'ouvrir les tiroirs directement avec ses mains libres (sécurité du navigateur contre l'accès direct aux fichiers). Il doit faire une **demande formelle** pour qu'on lui apporte le registre. C'est le rôle de `fetch()`.

---

### 2. Étape 1 : Récupérer des données locales avec `fetch()`

Pour importer `data.json` dans ton fichier `main.js` de manière standard dans le navigateur, on effectue une requête réseau asynchrone.

```javascript
fetch("/data.json")
  .then(response => response.json())
  .then(data => {
    // C'est ici que la magie opère !
    // 'data' contient maintenant ton tableau d'objets JavaScript.
  });
```

**Explication mot par mot :**
- **`fetch("/data.json")`** : Demande au serveur local (comme Live Server) d'aller chercher le fichier. Cela renvoie une **Promise** (une promesse que les données vont arriver).
- **`.then(response => response.json())`** : Dès que la réponse brute arrive, on la convertit en format utilisable (un objet/tableau JavaScript).
- **`.then(data => { ... })`** : On récupère enfin notre tableau propre et on peut l'utiliser pour construire notre graphique.

---

### 3. Étape 2 : Éviter l'écrasement des données avec `innerHTML` (La boucle)

Quand tu as voulu afficher tous tes jours avec `.map(displayDay)`, au début, seul le dernier jour ("sun") s'affichait.

**Le piège :**
```javascript
charts.innerHTML = `<li>${item.day}</li>` // ❌ Écrase le contenu à chaque tour !
```
L'opérateur `=` remplace l'intégralité du contenu existant. À chaque itération de la boucle, le jour précédent était effacé pour être remplacé par le nouveau.

**La solution :**
```javascript
charts.innerHTML += `<li id="${item.day}">${item.day}</li>` //  Ajoute à la suite !
```
L'opérateur d'addition-affectation `+=` prend le contenu déjà présent dans l'élément HTML et lui **ajoute** le nouveau code HTML à la fin.

---

### 4. Défi 1 : Donner une hauteur dynamique (Style en ligne vs Classes)

Pour que tes barres de graphique aient des hauteurs proportionnelles aux dépenses (`item.amount`), tu ne pouvais pas utiliser de classes Tailwind fixes (comme `h-32`), car chaque montant est unique et change constamment.

**Le concept clé :**
On utilise l'attribut HTML `style="..."` pour appliquer du CSS pur dynamique calculé par JavaScript (à l'intérieur de ton Template Literal `` ` ``), et on garde les classes Tailwind pour le reste du style (largeur, arrondis, transitions).

```javascript
// On multiplie par un facteur (ex: 2.8) pour que la hauteur en pixels soit bien visible à l'écran !
`<div style="height: ${item.amount * 2.8}px;" class="bg-[#EC755D] w-10 rounded-md"></div>`
```

**Ce qu'il faut retenir pour le debugging :**
- En CSS classique, une propriété numérique sans unité est ignorée par le navigateur. Écrire `height: 50` ne fonctionne pas. Il faut toujours coller l'unité : `height: ${valeur}px`.
- Inspecte toujours tes éléments dans les **DevTools** (clic droit -> Inspecter) pour vérifier que l'attribut HTML généré ressemble bien à `style="height: 48.86px;"`.

---

### 5. Défi 2 : Mettre en valeur le jour actuel (Aujourd'hui !)

Pour colorer différemment la barre correspondant au jour d'aujourd'hui, nous avions deux problèmes :
1. `new Date().getDay()` renvoie un chiffre de `0` (dimanche) à `6` (samedi).
2. Ton fichier JSON utilise du texte (`"mon"`, `"tue"`, etc.).

#### Étape A : Traduire le chiffre en texte
On crée un tableau ordonné des jours de la semaine (en commençant par le dimanche pour correspondre aux index de `getDay()`) et on récupère le jour actuel grâce à l'index numérique.

```javascript
const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
let today = new Date().getDay(); 
let currentDayName = weekDays[today]; // Si on est lundi (1), contient "mon"
```

#### Étape B : L'opérateur ternaire pour le choix de la couleur
Au lieu d'écrire de grosses conditions complexes, on utilise l'opérateur ternaire `(condition) ? si_vrai : si_faux` pour définir la classe Tailwind de couleur de fond de façon chirurgicale :

```javascript
// On compare le jour de l'élément en cours (item.day) avec le jour d'aujourd'hui (currentDayName)
let bgClass = (item.day === currentDayName) ? 'bg-[#76B5BC]' : 'bg-[#EC755D]';
```

#### Étape C : Injecter la classe dans le Template Literal
Ensuite, on injecte cette variable de classe directement dans l'attribut `class` de notre div :

```javascript
charts.innerHTML += `
  <li id="${item.day}">
    ...
    <div style="height: ${item.amount * 2.8}px" class="${bgClass} w-10 rounded-md transition duration-300 hover:bg-[#FF9B87]">
    </div>
    ...
  </li>
`;
```

---

### 💡 Conseils pour tes futurs projets

1. **La séparation des données** : Stocker tes données dans un fichier `.json` séparé est une excellente pratique professionnelle. Cela permet de modifier les données du site sans jamais toucher au code JavaScript ou HTML !
2. **Utiliser les DevTools** : En cas de doute ou si un élément disparaît, inspecte-le ! C'est le meilleur moyen de voir si une classe est mal orthographiée ou si un attribut `style` contient une syntaxe invalide.
3. **Penser "Mobile-First"** : Quand tu multiplies ta hauteur de barre, assure-toi que le graphique ne dépasse pas de la carte sur les petits écrans de smartphones !

---

### 🚀 Mots-clés à chercher pour progresser :

- *JavaScript Array reduce()* (pour calculer des sommes cumulées)
- *JavaScript Template Literals / Backticks* (pour mélanger HTML et JS proprement)
- *Ternary Operator JavaScript* (pour écrire des conditions simples sur une seule ligne)
- *CSS Custom Properties / Variables* (pour des designs encore plus dynamiques)

Tu construis d'excellents réflexes et ta progression est super impressionnante. Continue sur cette lancée ! 💪
