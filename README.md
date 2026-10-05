# VIRTUASSIST

Site internet de VIRTUASSIST — assistance administrative externalisée pour les TPE, PME et
indépendants, en France métropolitaine et à La Réunion.

**En ligne** : https://cleis69.github.io/virtuassist-fr/

## Développement

```sh
bun install
bun run dev
```

## Publication

Chaque envoi sur `main` publie automatiquement le site sur GitHub Pages
(`.github/workflows/pages.yml`).

## Contenu

- Textes, tarifs, services, FAQ : `src/content/site.ts`
- Photographies : `src/content/images.ts`
- Logo et favicons : `public/brand/`, d'après la charte graphique
