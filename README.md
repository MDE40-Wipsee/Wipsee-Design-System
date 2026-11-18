# Système de design Wipsee — fichiers d'intégration

Export statique du système de design Wipsee : CSS/JS/polices/images réels, sans aucune dépendance au bac à sable Claude. Ouvrez `index.html` dans un navigateur pour voir les 20 composants rendus tels qu'ils apparaîtront une fois intégrés.

## Contenu du dossier

- **`css/tokens.css`** — les variables (couleurs, espacements, rayons, typographie) et les `@font-face` Dosis. À charger en premier.
- **`css/wipsee.css`** — les classes de composants (`wip-btn`, `wip-card`, `wip-alert`, etc.). À charger après `tokens.css`.
- **`js/wipsee.js`** — le comportement des composants interactifs (onglets, accordéon, fenêtre modale, menu mobile, fermeture d'alerte/tag). S'auto-initialise au chargement de la page ; expose aussi `window.Wipsee.initAll(document)` pour réinitialiser du contenu ajouté dynamiquement.
- **`fonts/`** — les 6 graisses Dosis (Light à ExtraBold), référencées par `tokens.css`.
- **`assets/logos/`** — les 4 variantes du logo officiel (couleur, blanc, noir, horizontal).
- **`assets/graphismes/`** — le vocabulaire graphique de la charte (frise, flèches, puces) dans les quatre couleurs de marque.
- **`index.html`** — la vitrine de référence, regroupée comme dans le système de design (Actions, Retour d'information, Données, Formulaires, Navigation, Mise en page, Contenu, Identité Wipsee).

## Intégrer dans une page PHP existante

Dans le `<head>` de la page :

```html
<link rel="stylesheet" href="/chemin/vers/css/tokens.css">
<link rel="stylesheet" href="/chemin/vers/css/wipsee.css">
```

Juste avant `</body>` :

```html
<script src="/chemin/vers/js/wipsee.js"></script>
```

Adaptez les chemins selon l'arborescence du site (portail Synology, wipseeconnect.eu) : le plus simple est de copier les quatre dossiers (`css/`, `js/`, `fonts/`, `assets/`) tels quels dans un répertoire partagé (`/wipsee-ds/` par exemple) et de garder les chemins relatifs entre eux intacts — `tokens.css` référence les polices en `../fonts/…`, et la page affichant le logo ou les motifs graphiques référence `assets/logos/…` et `assets/graphismes/…` par un chemin relatif à cette même racine.

## La convention de classes `wip-`

Toutes les classes CSS sont préfixées `wip-` (`wip-btn`, `wip-badge`, `wip-card`…) pour ne jamais entrer en collision avec les classes déjà présentes sur un site existant. L'espace de nom JavaScript reste `window.Wipsee` (sans trait d'union, c'est le nom de la marque, pas un sélecteur CSS) : `Wipsee.initAccordion()`, `Wipsee.initTabs()`, `Wipsee.initModal()`, `Wipsee.initNav()`, `Wipsee.initDismiss()`, et `Wipsee.initAll(document)` pour tout réinitialiser d'un coup.

Pour le détail de chaque composant (quand l'utiliser, variantes, règles d'accessibilité), consultez le système de design complet publié sur claude.ai — ce dossier n'en est que l'export technique.
