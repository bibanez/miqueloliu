/*
 * Catàleg d'obres — dades estàtiques
 *
 * Estructura:
 *   WORKS = [ { id, name: {ca, es, en}, works: [ ...obra ] } ]
 *
 * Camps d'una obra (tots opcionals excepte id i title):
 *   id              slug estable (serveix d'àncora #work-<id>)
 *   title           títol (string, o {ca, es, en} si es tradueix)
 *   years           anys de composició, p.ex. '2024-2025'
 *   subtitle        línia sota el títol, p.ex. 'Sobre poemes d'Antoni Clapés'
 *   instrumentation formació o plantilla orquestral
 *   movements       [ ...títols de moviments ]
 *   duration        durada, p.ex. '12''
 *   details         [ ...línies en ordre: encàrrec, estrena, enregistrament, premi, CD… ]
 *   score           disponibilitat de la partitura: 'ficta' (editada per Ficta)
 *                   o 'contact' (sota demanda, enllaça amb contact.html)
 *   links           { audio, score, info } — URLs; només es mostren si existeixen.
 *                   Un audio acabat en .mp3/.m4a/.ogg/.wav es mostra com a
 *                   reproductor incrustat en lloc d'enllaç extern.
 *   note            nota de programa ({ca, es, en} o string) — es mostra plegada
 *   parts           [ ...sub-peces amb la mateixa estructura ] (p.ex. quaderns)
 *
 * Els camps de text admeten {ca, es, en} amb fallback a 'ca', i el marcatge
 * lleuger *negreta* i _cursiva_.
 */

const WORKS = [
  {
    id: 'orquestra',
    name: { ca: 'Orquestra', es: 'Orquesta', en: 'Orchestra' },
    works: [
      {
        id: 'pluja',
        title: { ca: 'Pluja', es: 'Pluja (Lluvia)', en: 'Pluja (Rain)' },
        years: '2024-2025',
        instrumentation: '[3.2.3.2.-2.2.2.1.-timp.+3 perc. –arp. -celesta -12.12.10.8.6.]',
        duration: '12’',
        details: [
          {
            ca: 'Encàrrec de L’Auditori de Barcelona – OBC',
            es: 'Encargo de L’Auditori de Barcelona – OBC',
            en: 'Commission of L’Auditori de Barcelona – OBC',
          },
          {
            ca: 'Estrena: Novembre 2025. L’Auditori de Barcelona, Liederhalle Stuttgart, Elbphilharmonie Hamburg, Tonhalle Düsseldorf, Palacio Euskalduna Bilbao, Kursaal Donostia/San Sebastián. OBC, Ludovic Morlot',
            es: 'Estreno: Noviembre 2025. L’Auditori de Barcelona, Liederhalle Stuttgart, Elbphilharmonie Hamburg, Tonhalle Düsseldorf, Palacio Euskalduna Bilbao, Kursaal Donostia/San Sebastián. OBC, Ludovic Morlot',
            en: 'Premiere: November 2025. L’Auditori de Barcelona, Liederhalle Stuttgart, Elbphilharmonie Hamburg, Tonhalle Düsseldorf, Palacio Euskalduna Bilbao, Kursaal Donostia/San Sebastián. OBC, Ludovic Morlot',
          },
        ],
        score: 'ficta',
        links: { info: 'obres/pluja.html' },
      },
      {
        id: 'in-luce-praesenti',
        title: 'In luce praesenti',
        years: '2019-2020',
        instrumentation: '[2.2.2.2.-2.2.2.1.-timp.+3 perc. –arp. -celesta -14.12.10.8.6.]',
        duration: '17’',
        details: [
          {
            ca: 'Encàrrec de L’Auditori de Barcelona – Fundació SGAE-AEOS',
            es: 'Encargo de L’Auditori de Barcelona – Fundación SGAE-AEOS',
            en: 'Commission of L’Auditori de Barcelona – Fundació SGAE-AEOS',
          },
          {
            ca: 'Estrena: Octubre 2021. L’Auditori. OBC, Juanjo Mena',
            es: 'Estreno: Octubre 2021. L’Auditori. OBC, Juanjo Mena',
            en: 'Premiere: October 2021. L’Auditori. OBC, Juanjo Mena',
          },
          {
            ca: 'Enregistrament: Juliol 2022. OBC, Benjamin Schwarz',
            es: 'Grabación: Julio 2022. OBC, Benjamin Schwarz',
            en: 'Recording: July 2022. OBC, Benjamin Schwarz',
          },
        ],
        score: 'ficta',
        links: { info: 'obres/in-luce-praesenti.html' },
      },
      {
        id: 'allegories-de-tardor-orquestra',
        title: {
          ca: 'Al·legories de tardor – Microludis per a orquestra',
          es: 'Al·legories de tardor – Microludis per a orquestra (Alegorías de otoño – Microludios para orquesta)',
          en: 'Al·legories de tardor – Microludis per a orquestra (Autumn allegories – Microludes for orchestra)',
        },
        years: '2012-2013',
        instrumentation: '[2.2.2.2.-2.2.2.1.-3 perc. –arp. -12.10.8.8.6.]',
        duration: '13’',
        details: [
          {
            ca: 'XXXII Premi Reina Sofia de Composició Musical',
            es: 'XXXII Premio Reina Sofía de Composición Musical',
            en: 'XXXII Queen Sofia Composition Prize',
          },
          {
            ca: 'Estrena: Octubre 2015. Teatro Monumental, Madrid. Orquesta de RTVE, Carlos Kalmar',
            es: 'Estreno: Octubre 2015. Teatro Monumental, Madrid. Orquesta de RTVE, Carlos Kalmar',
            en: 'Premiere: October 2015. Teatro Monumental, Madrid. Orquesta de RTVE, Carlos Kalmar',
          },
        ],
        score: 'ficta',
        links: { info: 'obres/allegories-de-tardor-orquestra.html' },
      },
    ],
  },

  {
    id: 'cambra',
    name: { ca: 'Cambra', es: 'Cámara', en: 'Chamber' },
    works: [
      {
        id: 'un-simple-aleteig',
        title: {
          ca: 'Un simple aleteig...',
          es: 'Un simple aleteig... (Un simple aleteo...)',
          en: 'Un simple aleteig... (A simple flutter...)',
        },
        years: '2022-2023',
        instrumentation: {
          ca: 'Trio (violí, violoncel i piano)',
          es: 'Trío (violín, violoncelo y piano)',
          en: 'Trio (violin, violoncello and piano)',
        },
        duration: '12’',
        details: [
          {
            ca: 'Estrena: Novembre 2024. Auditori de St. Josep, Moià. Tempus Trio',
            es: 'Estreno: Noviembre 2024. Auditori de St. Josep, Moià. Tempus Trio',
            en: 'Premiere: November 2024. Auditori de St. Josep, Moià. Tempus Trio',
          },
          'CD: Aeternum (IBS Classical, 2025) – Tempus Trio',
        ],
        score: 'ficta',
        links: { info: 'obres/un-simple-aleteig.html' },
      },
      {
        id: 'set-cants',
        title: {
          ca: 'Set cants',
          es: 'Set cants (Siete cantos)',
          en: 'Set cants (Seven songs)',
        },
        years: '2021',
        subtitle: {
          ca: 'Sobre poemes d’Antoni Clapés',
          es: 'Sobre poemas de Antoni Clapés',
          en: 'Poems by Antoni Clapés',
        },
        instrumentation: {
          ca: 'Soprano i piano',
          es: 'Soprano y piano',
          en: 'Soprano and piano',
        },
        duration: '14’',
        details: [
          {
            ca: 'Encàrrec de l’Associació Joan Manén',
            es: 'Encargo de la Associació Joan Manén',
            en: 'Commission of Associació Joan Manén',
          },
          {
            ca: 'Estrena: Juny 2023. Ateneu Barcelonès. Elena Copons, David Malet',
            es: 'Estreno: Junio 2023. Ateneu Barcelonès. Elena Copons, David Malet',
            en: 'Premiere: June 2023. Ateneu Barcelonès. Elena Copons, David Malet',
          },
          'CD: Una remor de silenci (Ficta, 2024) – Elena Copons, David Malet',
        ],
        score: 'ficta',
        links: { info: 'obres/set-cants.html' },
      },
      {
        id: 'angel-terrible',
        title: {
          ca: 'L’àngel terrible',
          es: 'L’àngel terrible (El ángel terrible)',
          en: 'L’àngel terrible (The terrible angel)',
        },
        years: '2017-2018',
        instrumentation: {
          ca: 'Quartet de corda',
          es: 'Cuarteto de cuerda',
          en: 'String quartet',
        },
        duration: '14’',
        details: [
          {
            ca: 'Encàrrec de Dalia Quartet',
            es: 'Encargo de Dalia Quartet',
            en: 'Commission of Dalia Quartet',
          },
          {
            ca: 'Estrena: Abril 2019. Xarxa de músiques de Joventuts Musicals de Catalunya. Dalia Quartet',
            es: 'Estreno: Abril 2019. Xarxa de músiques de Joventuts Musicals de Catalunya. Dalia Quartet',
            en: 'Premiere: April 2019. Xarxa de músiques de Joventuts Musicals de Catalunya. Dalia Quartet',
          },
        ],
        score: 'ficta',
        links: { info: 'obres/angel-terrible.html' },
      },
      {
        id: 'jardins-del-silenci',
        title: {
          ca: 'Jardins del silenci',
          es: 'Jardins del silenci (Jardines del silencio)',
          en: 'Jardins del silenci (Gardens of silence)',
        },
        years: '2016',
        instrumentation: {
          ca: 'Viola i piano',
          es: 'Viola y piano',
          en: 'Viola and piano',
        },
        duration: '11’',
        details: [
          {
            ca: 'Encàrrec de Joventuts Musicals de Catalunya – Fundació Ferrer-Salat',
            es: 'Encargo de Joventuts Musicals de Catalunya – Fundación Ferrer-Salat',
            en: 'Commission of Joventuts Musicals de Catalunya – Fundació Ferrer-Salat',
          },
          {
            ca: 'Estrena: Xarxa de músiques (2017) i L’Auditori de BCN, sala2 (abril 2018). Agnès Mauri, Benedek Horváth',
            es: 'Estreno: Xarxa de músiques (2017) y L’Auditori de BCN, sala2 (abril 2018). Agnès Mauri, Benedek Horváth',
            en: 'Premiere: Xarxa de músiques (2017) and L’Auditori de BCN, sala2 (April 2018). Agnès Mauri, Benedek Horváth',
          },
          'CD: Mirades sonores (Ficta, 2025) – Mariona Oliu, Miquel Villalba',
        ],
        score: 'ficta',
        links: { info: 'obres/jardins-del-silenci.html' },
      },
      {
        id: 'ofrena-a-ant-negre',
        title: {
          ca: 'Ofrena a Ant Negre',
          es: 'Ofrena a Ant Negre (Ofrenda a Alce Negro)',
          en: 'Ofrena a Ant Negre (Offering to Black Elk)',
        },
        years: '2014-2015',
        instrumentation: {
          ca: 'Ensemble: flauta en sol, corn anglès, clarinet baix, percussió, arpa, piano, violí, viola i violoncel',
          es: 'Ensemble: flauta en sol, corno inglés, clarinete bajo, percusión, arpa, piano, violín, viola y violoncelo',
          en: 'Ensemble: flute in G, English horn, bass clarinet, percussion, harp, piano, violin, viola and violoncello',
        },
        duration: '12’',
        score: 'contact',
        links: { info: 'obres/ofrena-a-ant-negre.html' },
      },
      {
        id: 'inabastable-perfil',
        title: {
          ca: 'L’inabastable perfil – Homenatge E. Chillida',
          es: 'L’inabastable perfil – Homenatge E. Chillida (El inalcanzable perfil – Homenaje a E. Chillida)',
          en: 'L’inabastable perfil – Homenatge E. Chillida (The unattainable profile – Homage to E. Chillida)',
        },
        years: '2013-2014',
        instrumentation: {
          ca: 'Violí i piano',
          es: 'Violín y piano',
          en: 'Violin and piano',
        },
        duration: '8’',
        details: [
          {
            ca: 'Estrena: Juny 2015. Nagoya, Japó. Ensemble Musica QuLacoza',
            es: 'Estreno: Junio 2015. Nagoya, Japón. Ensemble Musica QuLacoza',
            en: 'Premiere: June 2015. Nagoya, Japan. Ensemble Musica QuLacoza',
          },
          'CD: Intertwined Paths (Seed-music, 2016) – Joel Bardolet, Marco Scilironi',
        ],
        score: 'ficta',
        links: { info: 'obres/inabastable-perfil.html' },
      },
      {
        id: 'set-extractes-petit-princep',
        title: {
          ca: 'Set extractes de El Petit Príncep',
          es: 'Set extractes de El Petit Príncep (Siete extractos de El principito)',
          en: 'Set extractes de El Petit Príncep (Seven extracts from The Little Prince)',
        },
        years: '2010',
        instrumentation: {
          ca: 'Flauta de bec i dos percussionistes',
          es: 'Flauta de pico y dos percusionistas',
          en: 'Recorder and two percussionists',
        },
        duration: '25’',
        details: [
          {
            ca: 'Encàrrec del Festival de música de Campllong',
            es: 'Encargo del Festival de música de Campllong',
            en: 'Commission of Festival de música de Campllong',
          },
          {
            ca: 'Estrena: Agost 2010. Campllong. Tiam Goudarzi, Percussions de Barcelona',
            es: 'Estreno: Agosto 2010. Campllong. Tiam Goudarzi, Percussions de Barcelona',
            en: 'Premiere: August 2010. Campllong. Tiam Goudarzi, Percussions de Barcelona',
          },
        ],
        score: 'contact',
        links: { info: 'obres/set-extractes-petit-princep.html' },
      },
      {
        id: 'lament-de-pluja',
        title: {
          ca: 'Lament de pluja',
          es: 'Lament de pluja (Lamento de lluvia)',
          en: 'Lament de pluja (Lament of rain)',
        },
        years: '2008',
        instrumentation: {
          ca: 'Quartet de percussió',
          es: 'Cuarteto de percusión',
          en: 'Percussion quartet',
        },
        duration: '7’',
        details: [
          {
            ca: 'Encàrrec de Percussions de Barcelona',
            es: 'Encargo de Percussions de Barcelona',
            en: 'Commission of Percussions de Barcelona',
          },
          {
            ca: 'Estrena: Juny 2008. Caja Madrid, Barcelona. Percussions de Barcelona',
            es: 'Estreno: Junio 2008. Caja Madrid, Barcelona. Percussions de Barcelona',
            en: 'Premiere: June 2008. Caja Madrid, Barcelona. Percussions de Barcelona',
          },
        ],
        score: 'contact',
        links: { info: 'obres/lament-de-pluja.html' },
      },
    ],
  },

  {
    id: 'solista',
    name: { ca: 'Solista', es: 'Solista', en: 'Solo' },
    works: [
      {
        id: 'album-per-a-la-joventut',
        title: {
          ca: 'Àlbum per a la joventut',
          es: 'Àlbum per a la joventut (Álbum para la juventud)',
          en: 'Àlbum per a la joventut (Album for the young)',
        },
        years: '2024-2026',
        instrumentation: 'Piano',
        duration: '35-40’',
        details: [
          { ca: 'En preparació', es: 'En preparación', en: 'Forthcoming' },
        ],
      },
      {
        id: 'llibre-dhores',
        title: {
          ca: 'Llibre d’hores. Cicle complert de Preludis per a piano, en quatre quaderns',
          es: 'Llibre d’hores (Libro de horas). Ciclo completo de Preludios para piano, en cuatro cuadernos',
          en: 'Llibre d’hores (Book of hours). Complete set of the Preludes for piano, in four volumes',
        },
        years: '2016-2022',
        duration: '45’',
        details: [
          'CD: Llibre d’hores (Ficta, 2023) – Miquel Villalba',
        ],
        score: 'ficta',
        links: { info: 'obres/llibre-dhores.html' },
        parts: [
          {
            id: 'preludis-primer-quadern',
            title: {
              ca: 'Dos preludis per a piano. Primer quadern – Homenatge a Claude Debussy',
              es: 'Dos preludios para piano. Primer cuaderno – Homenaje a Claude Debussy',
              en: 'Two preludes for piano. First volume – Tribute to Claude Debussy',
            },
            years: '2016',
            movements: [
              {
                ca: 'Misteri de nit',
                es: 'Misteri de nit (Misterio de noche)',
                en: 'Misteri de nit (Mystery of the night)',
              },
              {
                ca: 'Misteri de llum',
                es: 'Misteri de llum (Misterio de luz)',
                en: 'Misteri de llum (Mystery of the light)',
              },
            ],
            duration: '10’',
            details: [
              {
                ca: 'Encàrrec de Joventuts Musicals de Catalunya – Fundació Ferrer-Salat',
                es: 'Encargo de Joventuts Musicals de Catalunya – Fundació Ferrer-Salat',
                en: 'Commission of Joventuts Musicals de Catalunya – Fundació Ferrer-Salat',
              },
              {
                ca: 'Estrena: Xarxa de músiques (2017) i L’Auditori de BCN, sala2 (abril 2018). Albert Cano',
                es: 'Estreno: Xarxa de músiques (2017) y L’Auditori de BCN, sala2 (abril 2018). Albert Cano',
                en: 'Premiere: Xarxa de músiques (2017) and L’Auditori de BCN, sala2 (April 2018). Albert Cano',
              },
            ],
          },
          {
            id: 'preludis-segon-quadern',
            title: {
              ca: 'Preludis per a piano. Segon quadern',
              es: 'Preludios para piano. Segundo cuaderno',
              en: 'Preludes for piano. Second volume',
            },
            years: '2018-2019',
            movements: [
              {
                ca: 'Misteri de l’entrega',
                es: 'Misteri de l’entrega (Misterio de la entrega)',
                en: 'Misteri de l’entrega (Mystery of dedication)',
              },
              {
                ca: 'Misteri de l’instant',
                es: 'Misteri de l’instant (Misterio del instante)',
                en: 'Misteri de l’instant (Mystery of the instant)',
              },
            ],
            duration: '11’',
            details: [
              {
                ca: 'Estrena: Setembre 2021. Monestir de St. Daniel, Girona. Miquel Villalba',
                es: 'Estreno: Septiembre 2021. Monestir de St. Daniel, Girona. Miquel Villalba',
                en: 'Premiere: September 2021. Monestir de St. Daniel, Girona. Miquel Villalba',
              },
            ],
          },
          {
            id: 'preludis-tercer-quadern',
            title: {
              ca: 'Preludis per a piano. Tercer quadern',
              es: 'Preludios para piano. Tercer cuaderno',
              en: 'Preludes for piano. Third volume',
            },
            years: '2020-2021',
            movements: [
              {
                ca: 'Misteri del temps',
                es: 'Misteri del temps (Misterio del tiempo)',
                en: 'Misteri del temps (Mystery of time)',
              },
              {
                ca: 'Misteri del dolor',
                es: 'Misteri del dolor (Misterio del dolor)',
                en: 'Misteri del dolor (Mystery of sorrow)',
              },
            ],
            duration: '12’',
            details: [
              {
                ca: 'Encàrrec del Palau de la Música Catalana – Ajuntament de BCN',
                es: 'Encargo del Palau de la Música Catalana – Ajuntament de BCN',
                en: 'Commission of Palau de la Música Catalana – Ajuntament de BCN',
              },
              {
                ca: 'Estrena: Desembre 2023. Miquel Villalba',
                es: 'Estreno: Diciembre 2023. Miquel Villalba',
                en: 'Premiere: December 2023. Miquel Villalba',
              },
            ],
          },
          {
            id: 'preludis-quart-quadern',
            title: {
              ca: 'Preludis per a piano. Quart quadern',
              es: 'Preludios para piano. Cuarto cuaderno',
              en: 'Preludes for piano. Fourth volume',
            },
            years: '2021-2022',
            movements: [
              {
                ca: 'Misteri de la confiança',
                es: 'Misteri de la confiança (Misterio de la confianza)',
                en: 'Misteri de la confiança (Mystery of trust)',
              },
              {
                ca: 'Misteri de pau',
                es: 'Misteri de pau (Misterio de paz)',
                en: 'Misteri de pau (Mystery of peace)',
              },
            ],
            duration: '10’',
            details: [
              {
                ca: 'Estrena: CD Llibre d’hores (Ficta, 2023) – Miquel Villalba',
                es: 'Estreno: CD Llibre d’hores (Ficta, 2023) – Miquel Villalba',
                en: 'Premiere: CD Llibre d’hores (Ficta, 2023) – Miquel Villalba',
              },
            ],
          },
        ],
      },
      {
        id: 'cantic',
        title: {
          ca: 'Càntic',
          es: 'Càntic (Cántico)',
          en: 'Càntic (Canticle)',
        },
        years: '2018-2019',
        instrumentation: { ca: 'Flauta', es: 'Flauta', en: 'Flute' },
        duration: '3’',
        details: [
          {
            ca: 'Encàrrec del festival Mixtur per a Tm+ensemble',
            es: 'Encargo del festival Mixtur para Tm+ensemble',
            en: 'Commission of Festival Mixtur for Tm+ensemble',
          },
          {
            ca: 'Estrena: Abril 2019. Fabra i Coats, Barcelona. Gilles Burgos',
            es: 'Estreno: Abril 2019. Fabra i Coats, Barcelona. Gilles Burgos',
            en: 'Premiere: April 2019. Fabra i Coats, Barcelona. Gilles Burgos',
          },
        ],
        score: 'contact',
        links: { info: 'obres/cantic.html' },
      },
      {
        id: 'fondres',
        title: {
          ca: 'Fondre’s',
          es: 'Fondre’s (Fundirse)',
          en: 'Fondre’s (Melting)',
        },
        years: '2018',
        subtitle: {
          ca: 'Estudi de concert per a vibràfon',
          es: 'Estudio de concierto para vibráfono',
          en: 'Concert study for vibraphone',
        },
        duration: '7’',
        details: [
          {
            ca: 'Encàrrec de Miquel Bernat',
            es: 'Encargo de Miquel Bernat',
            en: 'Commission of Miquel Bernat',
          },
          {
            ca: 'Estrena: Desembre 2019. Évora, Portugal. Miquel Bernat',
            es: 'Estreno: Diciembre 2019. Évora, Portugal. Miquel Bernat',
            en: 'Premiere: December 2019. Évora, Portugal. Miquel Bernat',
          },
        ],
        score: 'ficta',
        links: { info: 'obres/fondres.html' },
      },
      {
        id: 'despertar',
        title: {
          ca: 'Despertar',
          en: 'Despertar (Awakening)',
        },
        years: '2011',
        instrumentation: 'Shakuhachi 2.4',
        duration: '5’',
        details: [
          {
            ca: 'Estrena: Juliol 2013. European Shakuhachi Society Summer School, L’Auditori de Barcelona, Sala4. Jim Franklin',
            es: 'Estreno: Julio 2013. European Shakuhachi Society Summer School, L’Auditori de Barcelona, Sala4. Jim Franklin',
            en: 'Premiere: July 2013. European Shakuhachi Society Summer School, L’Auditori de Barcelona, Sala4. Jim Franklin',
          },
        ],
        score: 'contact',
        links: { info: 'obres/despertar.html' },
      },
      {
        id: 'allegories-de-tardor-piano',
        title: {
          ca: 'Al·legories de tardor – Microludis per a piano',
          es: 'Al·legories de tardor – Microludis per a piano (Alegorías de otoño – Microludios para piano)',
          en: 'Al·legories de tardor – Microludis per a piano (Autumn allegories – Microludes for piano)',
        },
        years: '2010-2011',
        duration: '12’',
        details: [
          {
            ca: 'Estrena: (parcial) Desembre 2011. El Círcol, Reus. Jordi López Roig',
            es: 'Estreno: (parcial) Diciembre 2011. El Círcol, Reus. Jordi López Roig',
            en: 'Premiere: (partial) December 2011. El Círcol, Reus. Jordi López Roig',
          },
          'CD: Llibre d’hores (Ficta, 2023) – Miquel Villalba',
        ],
        score: 'ficta',
        links: { info: 'obres/allegories-de-tardor-piano.html' },
      },
      {
        id: 'meditatio',
        title: 'Meditatio',
        years: '2007',
        instrumentation: {
          ca: 'Clarinet sib',
          es: 'Clarinete sib',
          en: 'Clarinet Bb',
        },
        duration: '5’',
        details: [
          {
            ca: 'Estrena: Maig 2007. Ateneu Barcelonès. Cicle música del segle XX-XXI. Josep Fuster',
            es: 'Estreno: Mayo 2007. Ateneu Barcelonès. Ciclo música del siglo XX-XXI. Josep Fuster',
            en: 'Premiere: May 2007. Ateneu Barcelonès. Cicle música del segle XX-XXI. Josep Fuster',
          },
        ],
        score: 'contact',
      },
      {
        id: 'aunque-es-de-noche',
        title: '...aunque es de noche',
        years: '2005-2006',
        instrumentation: 'Marimba',
        duration: '11’',
        details: [
          {
            ca: 'Estrena: Juny 2008. Caja Madrid, Barcelona. Sebastià Bel',
            es: 'Estreno: Junio 2008. Caja Madrid, Barcelona. Sebastià Bel',
            en: 'Premiere: June 2008. Caja Madrid, Barcelona. Sebastià Bel',
          },
        ],
        score: 'contact',
      },
      {
        id: 'dues-pagines-per-a-viola',
        title: {
          ca: 'Dues pàgines per a viola',
          es: 'Dues pàgines per a viola (Dos páginas para viola)',
          en: 'Dues pàgines per a viola (Two pages for viola)',
        },
        years: '2001',
        duration: '8’',
        details: [
          {
            ca: 'Estrena: Maig 2009. Les Encies (Girona). Mariona Oliu',
            es: 'Estreno: Mayo 2009. Les Encies (Girona). Mariona Oliu',
            en: 'Premiere: May 2009. Les Encies (Girona). Mariona Oliu',
          },
        ],
        score: 'contact',
      },
    ],
  },

  {
    id: 'veu',
    name: { ca: 'Veu', es: 'Voz', en: 'Voice' },
    works: [
      {
        id: 'set-cants-veu',
        title: {
          ca: 'Set cants',
          es: 'Set cants (Siete cantos)',
          en: 'Set cants (Seven songs)',
        },
        years: '2021',
        subtitle: {
          ca: 'Sobre poemes d’Antoni Clapés',
          es: 'Sobre poemas de Antoni Clapés',
          en: 'Poems by Antoni Clapés',
        },
        instrumentation: {
          ca: 'Soprano i piano',
          es: 'Soprano y piano',
          en: 'Soprano and piano',
        },
        duration: '14’',
        details: [
          {
            ca: 'Encàrrec de l’Associació Joan Manén',
            es: 'Encargo de la Associació Joan Manén',
            en: 'Commission of Associació Joan Manén',
          },
          {
            ca: 'Estrena: Juny 2023. Ateneu Barcelonès. Elena Copons, David Malet',
            es: 'Estreno: Junio 2023. Ateneu Barcelonès. Elena Copons, David Malet',
            en: 'Premiere: June 2023. Ateneu Barcelonès. Elena Copons, David Malet',
          },
          'CD: Una remor de silenci (Ficta, 2024) – Elena Copons, David Malet',
        ],
        score: 'ficta',
        links: { info: 'obres/set-cants.html' },
      },
      {
        id: 'sant-josep-va-a-buscar-foc',
        title: 'Sant Josep va a buscar foc',
        years: '2024',
        subtitle: {
          ca: 'Arranjament Nadala tradicional catalana',
          es: 'Adaptación Villancico tradicional catalán',
          en: 'Arrangement of a traditional Catalan carol',
        },
        instrumentation: {
          ca: 'Cor d’infants ad libitum i cor mixt [SSAATTBB]',
          es: 'Coro infantil ad libitum y coro mixto [SSAATTBB]',
          en: 'Children’s choir ad libitum and mixed choir [SSAATTBB]',
        },
        duration: '5’',
        details: [
          {
            ca: 'Encàrrec de l’Emvic',
            es: 'Encargo de la Emvic',
            en: 'Commission of Emvic',
          },
          {
            ca: 'Estrena: Novembre 2024. Vic. Grup d’infants de l’Emvic, Cor Canigó',
            es: 'Estreno: Noviembre 2024. Vic. Grupo infantil de la Emvic, Cor Canigó',
            en: 'Premiere: November 2024. Vic. Children’s choir of Emvic, Cor Canigó',
          },
        ],
        score: 'ficta',
        links: { info: 'obres/sant-josep-va-a-buscar-foc.html' },
      },
      {
        id: 'jo-laimo',
        title: {
          ca: 'Jo l’aimo',
          es: 'Jo l’aimo (Yo la amo)',
          en: 'Jo l’aimo (I love her)',
        },
        years: '2023',
        instrumentation: {
          ca: 'Viola i cor mixt [SSAATTBB]',
          es: 'Viola y coro mixto [SSAATTBB]',
          en: 'Viola and mixed choir [SSAATTBB]',
        },
        duration: '6’',
        details: [
          {
            ca: 'Encàrrec d’Agnès Mauri',
            es: 'Encargo de Agnès Mauri',
            en: 'Commission of Agnès Mauri',
          },
          {
            ca: 'Estrena: Març 2025. Barcelona, Basilea, Cardedeu. Agnès Mauri, Cor Noctes',
            es: 'Estreno: Marzo 2025. Barcelona, Basilea, Cardedeu. Agnès Mauri, Cor Noctes',
            en: 'Premiere: March 2025. Barcelona, Basel, Cardedeu. Agnès Mauri, Cor Noctes',
          },
        ],
        score: 'ficta',
        links: { info: 'obres/jo-laimo.html' },
      },
      {
        id: 'da-pacem',
        title: 'Da pacem',
        years: '2020',
        instrumentation: {
          ca: 'Cor mixt a cappella [SATB]',
          es: 'Coro mixto a cappella [SATB]',
          en: 'Mixed choir a cappella [SATB]',
        },
        duration: '3’',
        details: [
          {
            ca: 'En motiu del centenari de la coral Retorn Planenc',
            es: 'Con motivo del centenario de la coral Retorn Planenc',
            en: 'On occasion of the centenary of the Retorn Planenc choir',
          },
          {
            ca: 'Estrena: Desembre 2021. Les Planes d’Hostoles',
            es: 'Estreno: Diciembre 2021. Les Planes d’Hostoles',
            en: 'Premiere: December 2021. Les Planes d’Hostoles',
          },
        ],
        score: 'ficta',
      },
      {
        id: 'antifona-i-doxologia',
        title: {
          ca: 'Antífona i doxologia',
          es: 'Antífona i doxologia (Antífona y doxología)',
          en: 'Antífona i doxologia (Antiphon and doxology)',
        },
        years: '2017',
        instrumentation: {
          ca: 'Cor mixt a capella (o amb suport d’orgue) [SATB]',
          es: 'Coro mixto a capella (o con soporte de órgano) [SATB]',
          en: 'Mixed choir a cappella (or with organ accompaniment) [SATB]',
        },
        duration: '3’',
        details: [
          {
            ca: 'Encàrrec de Pueri Cantores',
            es: 'Encargo de Pueri Cantores',
            en: 'Commission of Pueri Cantores',
          },
          {
            ca: 'Estrena: Juliol 2018. Monestir de Montserrat',
            es: 'Estreno: Julio 2018. Monestir de Montserrat',
            en: 'Premiere: July 2018. Monestir de Montserrat',
          },
        ],
        score: 'ficta',
      },
    ],
  },

  {
    id: 'pedagogic',
    name: { ca: 'Pedagògic', es: 'Pedagógico', en: 'Pedagogical' },
    works: [
      {
        id: 'album-per-a-la-joventut-pedagogic',
        title: {
          ca: 'Àlbum per a la joventut',
          es: 'Àlbum per a la joventut (Álbum para la juventud)',
          en: 'Àlbum per a la joventut (Album for the young)',
        },
        years: '2024-2026',
        instrumentation: 'Piano',
        duration: '35-40’',
        details: [
          { ca: 'En preparació', es: 'En preparación', en: 'Forthcoming' },
        ],
      },
      {
        id: 'sis-nadales-tradicionals',
        title: {
          ca: 'Sis Nadales tradicionals catalanes',
          es: 'Sis Nadales tradicionals catalanes (Seis Villancicos tradicionales catalanes)',
          en: 'Sis Nadales tradicionals catalanes (Six traditional Catalan carols)',
        },
        instrumentation: {
          ca: 'Saxo i piano. Nivell Elemental',
          es: 'Saxo y piano. Nivel Elemental',
          en: 'Sax and piano. Elementary level',
        },
        details: [
          { ca: 'En preparació', es: 'En preparación', en: 'Forthcoming' },
        ],
      },
      {
        id: 'tres-estudis-vibrafon',
        title: {
          ca: 'Tres estudis per a vibràfon',
          es: 'Tres estudis per a vibràfon (Tres estudios para vibráfono)',
          en: 'Tres estudis per a vibràfon (Three studies for vibraphone)',
        },
        years: '2011',
        duration: '6’',
        details: [
          {
            ca: 'Encàrrec de Percussions de Barcelona',
            es: 'Encargo de Percussions de Barcelona',
            en: 'Commission of Percussions de Barcelona',
          },
        ],
        score: 'contact',
      },
    ],
  },
];
