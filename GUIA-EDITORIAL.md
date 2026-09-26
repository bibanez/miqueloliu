# Guia per editar el web de Miquel Oliu

## Entrar i publicar

1. Obriu https://miqueloliu.netlify.app/admin/.
2. Premeu **Login with GitHub** i entreu amb el compte autoritzat. Només cal fer servir GitHub per identificar-vos; tota l’edició es fa al gestor.
3. Trieu el contingut, feu els canvis i premeu **Publica**. No cal passar per esborranys o aprovacions.
4. Netlify prepara automàticament el web. Els canvis apareixen quan acaba el desplegament, habitualment al cap d’una estona. Si hi ha un error, es conserva la versió anterior.

Mentre el projecte de Netlify sigui privat, només els membres autoritzats de l’equip de Netlify poden obrir el web i el gestor. L’accés de GitHub al gestor no substitueix aquesta restricció.

## On és cada contingut

- **Pàgines:** fotografies de la portada, biografia i contacte; correu de contacte i enllaç de l’editorial. La biografia curta i completa tenen camps separats per idioma i blocs de text amb format.
- **Textos i traduccions:** cites i testimonis de la portada, encapçalaments, menú, peu de pàgina, textos del contacte i etiquetes del reproductor. Els textos estan agrupats per secció. No cal editar codi.
- **Obres:** títol, anys, instrumentació, moviments, durada, detalls, gravacions, partitures i notes de programa.
- **Categories:** nom en cada idioma i ordre al catàleg.

## Afegir o actualitzar una obra

Poseu un identificador únic amb minúscules i guions, com `nova-obra`. Un cop publicada, no canvieu l’identificador perquè forma part de l’adreça del web. Trieu la categoria i un nombre d’ordre: els més petits apareixen primer. Per retirar una obra del catàleg sense perdre’n la informació, marqueu **Arxivada**.

Les traduccions opcionals poden quedar buides; el web mostra el català quan falta una traducció.

## Notes de programa i poemes

Dins de l’obra, desplegueu **Nota de programa i poemes** i afegiu una versió per idioma. Cada versió té un títol i una llista de blocs:

- **Text:** paràgrafs, negreta, cursiva, llistes i enllaços.
- **Poema:** un vers per línia; una línia en blanc separa estrofes.
- **Separació entre estrofes:** espai entre dos blocs.

Es conserven les versions existents en català, castellà, anglès, francès, alemany i euskera. També podeu crear una nota per a una obra nova: la pàgina es genera automàticament.

## Fitxers i àudio

Pugeu imatges, PDF o fitxers d’àudio als camps corresponents. El límit de pujada és de 10 MB per fitxer. Per a àudios més grans, enganxeu un enllaç HTTPS al fitxer allotjat externament. Els fitxers pujats es desen a `/uploads/`; no elimineu un fitxer que encara aparegui en alguna pàgina.

## Recuperar un canvi

Demaneu a l’administrador que reverteixi el canvi a GitHub. El següent desplegament de Netlify publicarà la versió corregida. Per recuperar immediatament tot el lloc, l’administrador pot tornar a publicar un desplegament anterior a Netlify i després corregir també el contingut del repositori.
