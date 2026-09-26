# Netlify + Decap CMS

Producció: https://miqueloliu.netlify.app
Gestor: https://miqueloliu.netlify.app/admin/
Repositori: `bibanez/miqueloliu`, branca de publicació `main`.

El gestor utilitza el backend GitHub de Decap amb OAuth de Netlify. No utilitza DecapBridge, Netlify Identity, Git Gateway ni el Worker OAuth de Cloudflare. Com que el repositori és públic, el gestor demana l’abast OAuth `public_repo`, sense accés a repositoris privats. Aquest abast no és exclusiu d’un sol repositori: cobreix els repositoris públics als quals el compte tingui accés. Cada editor necessita un compte de GitHub amb accés d’escriptura a aquest repositori. Les publicacions van directament a `main` i activen un desplegament de Netlify.

## Configuració del projecte

`netlify.toml` fixa Node 22, `npm run build` i el directori publicable `dist`. Netlify ha de continuar connectat a aquest repositori i publicar `main`. Les previsualitzacions de pull requests es generen a Netlify; el gestor de les previsualitzacions només mostra un enllaç al gestor de producció.

No canvieu la visibilitat privada/pública sense decidir-ho amb el propietari. Un projecte privat exigeix accés a l’equip de Netlify també per arribar a `/admin/`.

## Inici de sessió: configuració única

1. A GitHub → Settings → Developer settings → OAuth Apps, registreu una aplicació pròpia per al gestor. Homepage URL: `https://miqueloliu.netlify.app`. Authorization callback URL: `https://api.netlify.com/auth/done`.
2. A Netlify → Project configuration → Security → OAuth → Authentication providers → Install provider, seleccioneu GitHub. Introduïu el Client ID i Client Secret d’aquesta aplicació.
3. Manteniu aquests secrets només a Netlify; no els afegiu al repositori, al fitxer públic del gestor ni a les variables de compilació.
4. Afegiu el compte de GitHub de Miquel com a col·laborador del repositori amb accés d’escriptura. Ha d’acceptar la invitació.
5. Obriu `/admin/`, inicieu sessió i comproveu que apareixen les pàgines, obres, categories i textos. Si una regla de protecció de `main` exigeix pull requests, caldrà adaptar el flux de publicació abans que l’editor pugui publicar directament.

Documentació: https://decapcms.org/docs/github-backend/ i https://docs.netlify.com/manage/security/secure-access-to-sites/oauth-provider-tokens/.

## Validació

Executeu `npm ci`, `npm test` i `npm run build`. Les proves cobreixen notes noves sense plantilla, publicació i arxivament, canvi de correu de contacte, fitxers invàlids i separació entre producció i previsualitzacions. La compilació conserva les rutes publicades i falla si falta un recurs local referenciat o un identificador fix.

`content/` és la font de contingut. `templates/` conté l’estructura de les pàgines. Els documents de treball `documentacio/`, els secrets i les eines de desenvolupament no formen part de `dist/`.

## Recuperació

Revisió anterior a la migració: `f6db692934d5cb72b4255617cb3f5ee782e82693`. A Netlify es pot tornar a publicar el desplegament anterior. Revertiu també el canvi corresponent a GitHub per evitar que el següent desplegament torni a publicar contingut incorrecte.

Els fitxers `auth-worker/` i `wrangler.jsonc` són llegat de la preparació anterior; no intervenen en el desplegament de Netlify.
