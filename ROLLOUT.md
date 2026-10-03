# Netlify + Decap CMS

Producció: https://miqueloliu.netlify.app
Gestor: https://miqueloliu.netlify.app/admin/
Repositori: `bibanez/miqueloliu`, branca de publicació `main`.

El gestor utilitza el backend GitHub de Decap amb OAuth de Netlify. No utilitza DecapBridge, Netlify Identity, Git Gateway ni el Worker OAuth de Cloudflare. Com que el repositori és públic, el gestor demana l’abast OAuth `public_repo`, sense accés a repositoris privats. Aquest abast no és exclusiu d’un sol repositori: cobreix els repositoris públics als quals el compte tingui accés. Cada editor necessita un compte de GitHub amb accés d’escriptura a aquest repositori. Amb `publish_mode: editorial_workflow`, desar crea o actualitza una branca i una pull request d’esborrany. Publicar fusiona la pull request a `main` i activa el desplegament públic de Netlify.

## Configuració del projecte

`netlify.toml` fixa Node 22, `npm run build` i el directori publicable `dist`. Netlify ha de continuar connectat a aquest repositori i publicar `main`. Les previsualitzacions de pull requests es generen a Netlify; el gestor de les previsualitzacions només mostra un enllaç al gestor de producció.

Manteniu activats els **Deploy Previews** de Netlify per a les pull requests contra `main`, incloses les branques `cms/*`. Decap obté l’URL dels estats de desplegament de GitHub; `show_preview_links: true` i els `preview_path` porten l’editor a la pàgina corresponent. Les obres apunten al catàleg perquè només les que tenen nota generen una pàgina pròpia. Premsa apunta a `/premsa.html` perquè els articles amb només un enllaç extern no generen una pàgina pròpia. No cal afegir un segon desplegament a GitHub Actions.

`admin/preview.js` registra una plantilla per a cada col·lecció de carpeta i cada fitxer editable. El panell fa servir l’entrada actual i `getAsset` per mostrar també fitxers encara no publicats. La compilació copia la versió fixada de MarkdownIt a `dist/admin/` per renderitzar els textos amb les mateixes opcions que el web. Aquest panell funciona abans de desar; els Deploy Previews mostren l’última versió desada.

No canvieu la visibilitat privada/pública sense decidir-ho amb el propietari. Un projecte privat exigeix accés a l’equip de Netlify també per arribar a `/admin/`.

## Inici de sessió: configuració única

1. A GitHub → Settings → Developer settings → OAuth Apps, registreu una aplicació pròpia per al gestor. Homepage URL: `https://miqueloliu.netlify.app`. Authorization callback URL: `https://api.netlify.com/auth/done`.
2. A Netlify → Project configuration → Security → OAuth → Authentication providers → Install provider, seleccioneu GitHub. Introduïu el Client ID i Client Secret d’aquesta aplicació.
3. Manteniu aquests secrets només a Netlify; no els afegiu al repositori, al fitxer públic del gestor ni a les variables de compilació.
4. Afegiu el compte de GitHub de Miquel com a col·laborador del repositori amb accés d’escriptura. Ha d’acceptar la invitació.
5. Obriu `/admin/`, inicieu sessió i comproveu que apareixen les pàgines, obres, categories, textos, Premsa, Enregistraments i el flux de treball. Les regles de protecció de `main` continuen aplicant-se a la publicació: els editors han de poder fusionar les pull requests un cop complerts els requisits del repositori.

Documentació: https://decapcms.org/docs/github-backend/, https://decapcms.org/docs/editorial-workflows/, https://decapcms.org/docs/deploy-preview-links/, https://decapcms.org/docs/customization/ i https://docs.netlify.com/manage/security/secure-access-to-sites/oauth-provider-tokens/.

## Validació

Executeu `npm ci`, `npm test` i `npm run build`. Les proves cobreixen notes noves sense plantilla, publicació i arxivament, canvi de correu de contacte, fitxers invàlids i separació entre producció i previsualitzacions. La compilació conserva les rutes publicades i falla si falta un recurs local referenciat o un identificador fix.

Les proves de previsualització cobreixen entrades buides, canvis sense desar, idiomes i retorn al català, Markdown i poemes, fitxers temporals i rutes de previsualització. Després de desplegar aquesta configuració, comproveu el circuit amb un esborrany: el desament no ha de canviar `main`, Netlify ha de publicar un Deploy Preview i Decap n’ha de mostrar l’enllaç. Aquesta comprovació necessita una sessió autoritzada de GitHub i Netlify; les proves locals no substitueixen aquesta integració.

`content/` és la font de contingut. `templates/` conté l’estructura de les pàgines. Els documents de treball `documentacio/`, els secrets i les eines de desenvolupament no formen part de `dist/`.

## Recuperació

Revisió anterior a la migració: `f6db692934d5cb72b4255617cb3f5ee782e82693`. A Netlify es pot tornar a publicar el desplegament anterior. Revertiu també el canvi corresponent a GitHub per evitar que el següent desplegament torni a publicar contingut incorrecte.

Els fitxers `auth-worker/` i `wrangler.jsonc` són llegat de la preparació anterior; no intervenen en el desplegament de Netlify.
