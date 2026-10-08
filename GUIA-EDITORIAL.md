# Guia per editar el web de Miquel Oliu

## Entrar, desar esborranys i publicar

1. Obriu https://miqueloliu.netlify.app/admin/.
2. Premeu **Login with GitHub** i entreu amb el compte autoritzat. Només cal fer servir GitHub per identificar-vos; tota l’edició es fa al gestor.
3. Trieu el contingut i feu els canvis. El panell de previsualització mostra els camps mentre editeu, fins i tot abans de desar. Feu servir els botons d’idioma per revisar les traduccions.
4. Premeu **Guardar** per guardar un esborrany. El web publicat encara no canvia. Podeu tancar el gestor i reprendre’l des de **Flux Editorial**: esborranys, en revisió i llestos per publicar.
5. Després de desar, espereu que es prepari la previsualització i obriu l’enllaç **Comprovar Vista Prèvia** del gestor. Mostra el web complet amb aquell esborrany. Cada esborrany té la seva previsualització; els altres esborranys encara no publicats no s’hi combinen.
6. Quan estigui revisat, marqueu-lo com a llest i trieu **Publicar**. Netlify i Cloudflare preparen el web publicat; els canvis hi apareixen quan acaba el desplegament. Si la compilació falla, es conserva la versió anterior.

Mentre el projecte de Netlify sigui privat, només els membres autoritzats de l’equip de Netlify poden obrir el web i el gestor. L’accés de GitHub al gestor no substitueix aquesta restricció.

## Què mostra cada previsualització

El panell de l’editor mostra els camps de l’entrada actual: imatges, biografia, dades de contacte, fitxa d’obra, notes, poemes, enregistraments, categories i textos. Les traduccions buides fan servir el català, igual que al web. Els idiomes addicionals de les notes de programa també es poden seleccionar. El panell és una vista dels camps; l’enllaç de previsualització permet comprovar el disseny complet del web.

Per a les obres, l’enllaç obre el catàleg, també quan no hi ha una nota de programa. Les obres arxivades es veuen al panell de l’editor però no al catàleg. Per tornar a editar des del web de previsualització, obriu el gestor de producció.

Si l’enllaç encara no està disponible, espereu que acabi la compilació i torneu a obrir l’esborrany. Si continua sense aparèixer, demaneu a l’administrador que comprovi el desplegament de Netlify. L’enllaç mostra l’última versió desada; els canvis sense desar només apareixen al panell de l’editor.

## On és cada contingut

- **Pàgina d’inici:** fotografia de portada, versos, cites, autoria i testimonis addicionals amb traduccions.
- **Pàgines:** fotografies de biografia i contacte; correu de contacte i enllaç de l’editorial. La biografia curta i completa tenen camps separats per idioma i blocs de text amb format.
- **Textos i traduccions:** cites i testimonis de la portada, encapçalaments, menú, peu de pàgina, textos del contacte i etiquetes del reproductor. Els textos estan agrupats per secció. No cal editar codi.
- **Obres:** títol, anys, instrumentació, moviments, durada, detalls, gravacions, partitures i notes de programa.
- **Premsa:** articles amb versions per idioma o enllaços externs. Els arxivats no apareixen a la pàgina pública.
- **Enregistraments:** portades, any de publicació, títols, intèrprets i enllaços de Spotify.
- **Categories:** nom en cada idioma i ordre al catàleg.

## Afegir o actualitzar una obra

Poseu un identificador únic amb minúscules i guions, com `nova-obra`. Un cop publicada, no canvieu l’identificador perquè forma part de l’adreça del web. Trieu la categoria i, al camp **Ordre**, premeu **Posa al principi de la secció** per situar l’obra abans de les altres sense haver de renumerar-les. El botó consulta l’últim catàleg publicat; si hi ha altres esborranys pendents, publiqueu-los i espereu que acabi el desplegament abans de tornar-lo a fer servir en una altra sessió. També podeu escriure un nombre d’ordre manualment: els més petits apareixen primer, inclosos els negatius. Per retirar una obra del catàleg sense perdre’n la informació, marqueu **Arxivada**.

Les traduccions opcionals poden quedar buides; el web mostra el català quan falta una traducció.

## Notes de programa i poemes

Dins de l’obra, desplegueu **Nota de programa i poemes** i afegiu una versió per idioma. Cada versió té un títol i una llista de blocs:

- **Text:** paràgrafs, negreta, cursiva, llistes i enllaços.
- **Poema:** un vers per línia; una línia en blanc separa estrofes. El camp opcional **Atribució** permet posar l’autoria a la primera línia i la font o traducció a les següents; es mostra al final del poema, alineada a la dreta.
- **Separació entre estrofes:** espai entre dos blocs.

Es conserven les versions existents en català, castellà, anglès, francès, alemany i euskera. També podeu crear una nota per a una obra nova: la pàgina es genera automàticament.

## Enllaços de CD, partitura i àudio al catàleg

- **CD:** dins de **Detalls**, obriu la línia que descriu el disc (per exemple, «CD: Mirades sonores (Ficta, 2025)…») i enganxeu l’adreça de compra al camp **Enllaç de la descripció**. La mateixa descripció serà clicable. L’enllaç és compartit per les tres traduccions.
- **Partitura:** trieu **Ficta** al camp **Partitura** i, dins de **Enllaços → Partitura**, enganxeu l’adreça HTTPS de la partitura a l’editorial o pugeu un PDF. «Ficta» serà clicable a la línia de partitura, sense una segona etiqueta.
- **Àudio:** per pujar un fitxer amb títol, intèrpret i durada, feu servir **Enregistraments**. Per afegir només un enllaç, feu servir **Enllaços → Àudio**. Tots dos s’obren dins de **+àudio**. Un enllaç directe a un fitxer sonor mostra el reproductor; un enllaç a una pàgina externa mostra l’accés a aquesta pàgina. La nota de programa (**+info**) mostra el text.

## Entrar textos de Word sense problemes de format

1. Copieu el text de Word i enganxeu-lo **sense format** al bloc **Text** del gestor: **Cmd+Maj+V** al Mac o **Ctrl+Maj+V** a Windows. Si el navegador conserva el format, passeu abans el text per un editor de text pla i torneu-lo a copiar.
2. Reviseu els paràgrafs: no inseriu salts manuals al final de cada línia que veieu a Word. Separeu els paràgrafs amb Enter al gestor; la font i l’interlineat els aplica el web.
3. Apliqueu la cursiva, la negreta i els enllaços amb els botons del gestor. Per als poemes feu servir **Poema**, amb un vers per línia i una línia buida entre estrofes.
4. Reviseu els espais entre paraules, sobretot a les unions de fragments o al costat de cursives. Enganxar sense format no recupera espais que ja falten al document original.
5. Repetiu-ho a cada versió d’idioma i reviseu tant el panell com **Comprovar Vista Prèvia** abans de publicar.

## Fitxers i àudio

Pugeu imatges, PDF o fitxers d’àudio als camps corresponents. El límit de pujada és de 10 MB per fitxer. Per a àudios més grans, enganxeu un enllaç HTTPS al fitxer allotjat externament. Els fitxers pujats es desen a `/uploads/`; no elimineu un fitxer que encara aparegui en alguna pàgina.

## Recuperar un canvi

Demaneu a l’administrador que reverteixi el canvi a GitHub. El següent desplegament de Netlify publicarà la versió corregida. Per recuperar immediatament tot el lloc, l’administrador pot recuperar el desplegament anterior a Netlify i al Worker de Cloudflare del domini públic i després corregir també el contingut del repositori.
