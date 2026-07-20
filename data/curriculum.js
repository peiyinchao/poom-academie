/* ============================================================
   Mijn Poom Academie — Leerinhoud (TBN / Kukkiwon-standaard)
   ------------------------------------------------------------
   Dit bestand bevat ALLE lesstof. Je mag het vrij aanpassen:
   corrigeer teksten, voeg stappen toe of verander de volgorde.
   Elke term met "ko" (Hangul) kan hardop worden uitgesproken.
   Laat details door je trainer bevestigen — scholen verschillen.
   ============================================================ */
window.CURRICULUM = {
  meta: {
    doel: "Eerste & tweede poom",
    bron: "Gebaseerd op de Kukkiwon / World Taekwondo-standaard die Taekwondo Bond Nederland volgt.",
    bijgewerkt: "2026"
  },

  /* -------------------- NIVEAUS (poom) -------------------- */
  levels: {
    "1": { naam: "1e poom", vorm: "Koryo", vormId: "koryo",
      omschrijving: "Je kent alle Taegeuk 1–8 uit je hoofd en leert je eerste zwarteband-vorm: Koryo." },
    "2": { naam: "2e poom", vorm: "Keumgang", vormId: "keumgang",
      omschrijving: "Bovenop Taegeuk 1–8 en Koryo komt de tweede zwarteband-vorm: Keumgang." }
  },

  /* -------------------- MINDSET-QUOTES -------------------- */
  quotes: [
    "Vallen mag. Opstaan is taekwondo.",
    "Een zwarte band is een witte band die nooit stopte.",
    "Discipline is doen wat moet, ook als niemand kijkt.",
    "Langzaam is soepel, en soepel wordt snel.",
    "Respect begint bij de buiging.",
    "Kracht zonder controle is geen taekwondo.",
    "Elke meester was ooit een beginner.",
    "Adem in, blijf rustig, en richt zuiver.",
    "Je grootste tegenstander ben jij van gisteren.",
    "Herhaling maakt de meester.",
    "Moed is doorgaan als het moeilijk wordt.",
    "Een rustige geest draagt een sterke stand."
  ],

  /* -------------------- POOMSAE: Taegeuk 1–8 -------------------- */
  poomsae: [
    {
      id: "il", nr: 1, sino: "Il", video: "esocvXAtf-E", level: 0, korean: "Taegeuk Il Jang", hangul: "태극 1장",
      trigram: "☰", trigramNaam: "Keon", trigramHangul: "건",
      element: "Hemel", kup: "8e kup", band: "Geel", bewegingen: 18,
      betekenis: "Keon staat voor de hemel en het licht — het begin van alles. De eerste vorm legt de basis: rechte standen en de meest voorkomende technieken.",
      focus: ["Rechte lijnen in de diagram (het pad vormt een + )", "Rustig en groot bewegen", "Kihap op de laatste beweging"],
      nieuw: [
        { ko: "아래 막기", roman: "Arae makgi", nl: "Lage blok" },
        { ko: "몸통 지르기", roman: "Momtong jireugi", nl: "Middenstoot" },
        { ko: "몸통 안막기", roman: "Momtong an-makgi", nl: "Midden binnenwaartse blok" },
        { ko: "앞차기", roman: "Ap chagi", nl: "Voorwaartse trap" }
      ],
      standen: ["Ap seogi", "Ap kubi"]
    },
    {
      id: "i", nr: 2, sino: "I", video: "YvjZaW6Qm7Y", level: 0, korean: "Taegeuk I Jang", hangul: "태극 2장",
      trigram: "☱", trigramNaam: "Tae", trigramHangul: "태",
      element: "Meer", kup: "7e kup", band: "Geel-groen", bewegingen: 18,
      betekenis: "Tae is het meer: vreugde en innerlijke stevigheid. De vorm voegt hoge blokken toe en meer trappen.",
      focus: ["Hoge blok (eolgul makgi) zuiver plaatsen", "Trap en stoot vloeiend koppelen", "Blik altijd eerst in de richting"],
      nieuw: [
        { ko: "얼굴 막기", roman: "Eolgul makgi", nl: "Hoge / gezichtsblok" },
        { ko: "앞차기 몸통 지르기", roman: "Ap chagi – momtong jireugi", nl: "Trap gevolgd door middenstoot" }
      ],
      standen: ["Ap seogi", "Ap kubi"]
    },
    {
      id: "sam", nr: 3, sino: "Sam", video: "r7gI13Nl380", level: 0, korean: "Taegeuk Sam Jang", hangul: "태극 3장",
      trigram: "☲", trigramNaam: "Ri", trigramHangul: "리",
      element: "Vuur", kup: "6e kup", band: "Groen", bewegingen: 20,
      betekenis: "Ri is het vuur: warmte en enthousiasme. Hier komt de achterstand en de meshand erbij.",
      focus: ["Dwit kubi (achterstand) laag en stabiel", "Meshand-slag met scherpe stop", "Ritme: snel–langzaam afwisselen"],
      nieuw: [
        { ko: "손날 막기", roman: "Sonnal makgi", nl: "Meshand-blok (in achterstand)" },
        { ko: "손날 목치기", roman: "Sonnal mok chigi", nl: "Meshand-slag naar de nek" }
      ],
      standen: ["Ap seogi", "Ap kubi", "Dwit kubi"]
    },
    {
      id: "sa", nr: 4, sino: "Sa", video: "FWmRMg9ZYuw", level: 0, korean: "Taegeuk Sa Jang", hangul: "태극 4장",
      trigram: "☳", trigramNaam: "Jin", trigramHangul: "진",
      element: "Donder", kup: "5e kup", band: "Groen-blauw", bewegingen: 20,
      betekenis: "Jin is de donder: kracht en moed, maar met beheersing. Deze vorm heeft de meeste nieuwe technieken.",
      focus: ["Speerhand en zwaluw-slag netjes richten", "Zijtrap (yeop chagi) met de mesvoet", "Stevig blijven na de donderende technieken"],
      nieuw: [
        { ko: "손날 몸통 막기", roman: "Sonnal momtong makgi", nl: "Dubbele meshand middenblok" },
        { ko: "편손끝 세워찌르기", roman: "Pyeonsonkeut sewo jjireugi", nl: "Speerhand-steek" },
        { ko: "제비품 목치기", roman: "Jebipoom mok chigi", nl: "Zwaluwvorm nekslag + blok" },
        { ko: "옆차기", roman: "Yeop chagi", nl: "Zijtrap" },
        { ko: "등주먹 앞치기", roman: "Deung jumeok ap chigi", nl: "Rugvuist-slag naar voren" }
      ],
      standen: ["Ap kubi", "Dwit kubi"]
    },
    {
      id: "o", nr: 5, sino: "O", video: "RyB9u3F70No", level: 0, korean: "Taegeuk O Jang", hangul: "태극 5장",
      trigram: "☴", trigramNaam: "Seon", trigramHangul: "손",
      element: "Wind", kup: "4e kup", band: "Blauw", bewegingen: 20,
      betekenis: "Seon is de wind: zacht maar soms machtig. Hamervuist en elleboog geven de vorm pit.",
      focus: ["Juchum seogi (paardrijstand) breed en laag", "Elleboogslag draait vanuit de heup", "Hamervuist ontspannen, dan hard"],
      nieuw: [
        { ko: "메주먹 내려치기", roman: "Me jumeok naeryo chigi", nl: "Hamervuist neerwaarts" },
        { ko: "팔굽 돌려치기", roman: "Palkup dollyo chigi", nl: "Draaiende elleboogslag" },
        { ko: "거들어 막기", roman: "Geodeureo makgi", nl: "Ondersteunde blok" }
      ],
      standen: ["Ap kubi", "Dwit kubi", "Juchum seogi"]
    },
    {
      id: "yuk", nr: 6, sino: "Yuk", video: "WZcE8Yhsasc", level: 0, korean: "Taegeuk Yuk Jang", hangul: "태극 6장",
      trigram: "☵", trigramNaam: "Gam", trigramHangul: "감",
      element: "Water", kup: "3e kup", band: "Blauw-rood", bewegingen: 19,
      betekenis: "Gam is het water: het stroomt om obstakels heen. Hier verschijnt de draaitrap.",
      focus: ["Dollyo chagi (draaitrap) met de wreef", "Handpalm-blok soepel", "Vloeiend blijven, zoals water"],
      nieuw: [
        { ko: "돌려차기", roman: "Dollyo chagi", nl: "Draaitrap (roundhouse)" },
        { ko: "한손날 얼굴 바깥막기", roman: "Hansonnal eolgul bakkat makgi", nl: "Enkele meshand hoge buitenblok" },
        { ko: "바탕손 막기", roman: "Batangson makgi", nl: "Handpalm-blok" }
      ],
      standen: ["Ap seogi", "Ap kubi", "Juchum seogi"]
    },
    {
      id: "chil", nr: 7, sino: "Chil", video: "9_4HQkM4f3o", level: 0, korean: "Taegeuk Chil Jang", hangul: "태극 7장",
      trigram: "☶", trigramNaam: "Gan", trigramHangul: "간",
      element: "Berg", kup: "2e kup", band: "Rood", bewegingen: 25,
      betekenis: "Gan is de berg: stevig en standvastig. Veel korte, krachtige technieken en de kniestoot.",
      focus: ["Beom seogi (tijgerstand) licht op de voorvoet", "Schaarblok met beide armen tegelijk", "Kniestoot met een greep ervoor"],
      nieuw: [
        { ko: "손날 아래막기", roman: "Sonnal arae makgi", nl: "Meshand lage blok" },
        { ko: "가위 막기", roman: "Gawi makgi", nl: "Schaarblok" },
        { ko: "무릎 치기", roman: "Mureup chigi", nl: "Kniestoot" },
        { ko: "주춤 두번지르기", roman: "Juchum dubeon jireugi", nl: "Dubbele stoot in paardrijstand" }
      ],
      standen: ["Ap seogi", "Beom seogi", "Juchum seogi"]
    },
    {
      id: "pal", nr: 8, sino: "Pal", video: "1pYia9d5tUY", level: 0, korean: "Taegeuk Pal Jang", hangul: "태극 8장",
      trigram: "☷", trigramNaam: "Gon", trigramHangul: "곤",
      element: "Aarde", kup: "1e kup", band: "Rood-zwart", bewegingen: 27,
      betekenis: "Gon is de aarde: de basis waarop alles rust. De laatste kleurbandvorm — daarna volgt de eerste poom.",
      focus: ["Sprongtrap (dubbele voortrap) met hoogte", "Alles wat je leerde samenbrengen", "Kracht, controle én ademhaling"],
      nieuw: [
        { ko: "두발 당성 앞차기", roman: "Dubal dangseong ap chagi", nl: "Springende dubbele voortrap" },
        { ko: "엇걸어 아래막기", roman: "Eotgeoreo arae makgi", nl: "Gekruiste lage blok" },
        { ko: "팔굽 돌려치기", roman: "Palkup dollyo chigi", nl: "Draaiende elleboogslag" }
      ],
      standen: ["Ap kubi", "Dwit kubi", "Juchum seogi"]
    },
    {
      id: "koryo", nr: 9, sino: "", video: "", level: 1, korean: "Koryo", hangul: "고려",
      trigram: "士", trigramNaam: "Seonbi", trigramHangul: "선비",
      element: "De geleerde", kup: "1e poom / 1e dan", band: "Zwart (poom)", bewegingen: 30,
      betekenis: "Koryo is vernoemd naar de Goryeo-dynastie — waar het woord 'Korea' vandaan komt. Het teken 士 staat voor de seonbi: een geleerde, sterke geest die niet buigt voor onrecht. Dit is je eerste zwarteband-vorm.",
      focus: ["Zijtrap (yeop chagi) en blok scherp koppelen", "Bewuste, volwassen kracht — geen haast", "Sonnal-technieken met een duidelijke stop"],
      nieuw: [
        { ko: "칼재비", roman: "Kaljaebi", nl: "Duim-keelgreep / -stoot" },
        { ko: "한손날 바깥막기", roman: "Han sonnal bakkat makgi", nl: "Enkele meshand buitenblok" },
        { ko: "무릎 꺾기", roman: "Mureup kkeokki", nl: "Kniebreuk-techniek" },
        { ko: "바탕손 눌러막기", roman: "Batangson nullo makgi", nl: "Handpalm drukblok" },
        { ko: "옆차기", roman: "Yeop chagi", nl: "Zijtrap (herhaald, krachtig)" }
      ],
      standen: ["Ap kubi", "Dwit kubi", "Juchum seogi"]
    },
    {
      id: "keumgang", nr: 10, sino: "", video: "", level: 2, korean: "Keumgang", hangul: "금강",
      trigram: "山", trigramNaam: "Berg / diamant", trigramHangul: "산",
      element: "Onbreekbare kracht", kup: "2e poom / 2e dan", band: "Zwart (poom)", bewegingen: 27,
      betekenis: "Keumgang betekent 'diamant' — te hard om te breken — en verwijst naar de Keumgang-berg en de Keumgang-krijger die het kwaad verjaagt. De vorm is langzaam, machtig en vol balans.",
      focus: ["Kraanstand (hakdari seogi): stil en in balans op één been", "Langzame, zware bewegingen met ademhaling", "Berg- en diamantblok breed en stevig"],
      nieuw: [
        { ko: "금강막기", roman: "Keumgang makgi", nl: "Diamantblok (hoog + laag samen)" },
        { ko: "산틀막기", roman: "Santeul makgi", nl: "Bergblok" },
        { ko: "학다리서기", roman: "Hakdari seogi", nl: "Kraanstand (op één been)" },
        { ko: "큰돌쩌귀", roman: "Keun doljjeogwi", nl: "Grote scharnier-beweging" },
        { ko: "바탕손 턱치기", roman: "Batangson teok chigi", nl: "Handpalm-slag naar de kin" }
      ],
      standen: ["Ap kubi", "Juchum seogi", "Hakdari seogi"]
    }
  ],

  /* -------------------- STANDEN (Seogi) -------------------- */
  standen: [
    { ko: "모아 서기", roman: "Moa seogi", nl: "Sluitstand", gewicht: "50 / 50", uitleg: "Voeten tegen elkaar, rechtop. De rustpositie voor en na een vorm." },
    { ko: "나란히 서기", roman: "Naranhi seogi", nl: "Parallelstand", gewicht: "50 / 50", uitleg: "Voeten op schouderbreedte, parallel. De basis-klaarstand (junbi)." },
    { ko: "앞 서기", roman: "Ap seogi", nl: "Korte loopstand", gewicht: "50 / 50", uitleg: "Natuurlijke stap vooruit, beide knieën licht. Gebruikt voor snelle technieken." },
    { ko: "앞굽이", roman: "Ap kubi", nl: "Lange voorwaartse stand", gewicht: "70 voor / 30 achter", uitleg: "Voorste knie boven de voet gebogen, achterste been gestrekt. De sterke aanvalsstand." },
    { ko: "뒷굽이", roman: "Dwit kubi", nl: "Achterwaartse stand", gewicht: "30 voor / 70 achter", uitleg: "Gewicht op het achterste been, voeten in een L-vorm. De verdedigingsstand." },
    { ko: "주춤 서기", roman: "Juchum seogi", nl: "Paardrijstand", gewicht: "50 / 50", uitleg: "Breed en laag, alsof je op een paard zit. Voor kracht opzij." }
  ],

  /* -------------------- TECHNIEKEN -------------------- */
  technieken: [
    { cat: "Blokken (Makgi)", items: [
      { ko: "아래 막기", roman: "Arae makgi", nl: "Lage blok" },
      { ko: "몸통 막기", roman: "Momtong makgi", nl: "Middenblok (buitenwaarts)" },
      { ko: "몸통 안막기", roman: "Momtong an-makgi", nl: "Midden binnenwaartse blok" },
      { ko: "얼굴 막기", roman: "Eolgul makgi", nl: "Hoge / gezichtsblok" },
      { ko: "손날 막기", roman: "Sonnal makgi", nl: "Meshand-blok" }
    ]},
    { cat: "Stoten (Jireugi)", items: [
      { ko: "몸통 지르기", roman: "Momtong jireugi", nl: "Middenstoot" },
      { ko: "얼굴 지르기", roman: "Eolgul jireugi", nl: "Hoge stoot" },
      { ko: "두번 지르기", roman: "Dubeon jireugi", nl: "Dubbele stoot" }
    ]},
    { cat: "Slagen (Chigi)", items: [
      { ko: "손날 목치기", roman: "Sonnal mok chigi", nl: "Meshand-slag naar de nek" },
      { ko: "등주먹 앞치기", roman: "Deung jumeok ap chigi", nl: "Rugvuist-slag" },
      { ko: "팔굽 치기", roman: "Palkup chigi", nl: "Elleboogslag" },
      { ko: "메주먹 내려치기", roman: "Me jumeok naeryo chigi", nl: "Hamervuist neerwaarts" }
    ]},
    { cat: "Trappen (Chagi)", items: [
      { ko: "앞차기", roman: "Ap chagi", nl: "Voorwaartse trap" },
      { ko: "돌려차기", roman: "Dollyo chagi", nl: "Draaitrap (roundhouse)" },
      { ko: "옆차기", roman: "Yeop chagi", nl: "Zijtrap" },
      { ko: "내려차기", roman: "Naeryo chagi", nl: "Neerwaartse / bijltrap" },
      { ko: "뒤차기", roman: "Dwit chagi", nl: "Achterwaartse trap" }
    ]}
  ],

  /* -------------------- TERMINOLOGIE -------------------- */
  termen: [
    { groep: "Commando's", items: [
      { ko: "차렷", roman: "Charyeot", nl: "Houding aannemen / attentie" },
      { ko: "경례", roman: "Kyeongnye", nl: "Groeten (buigen)" },
      { ko: "준비", roman: "Junbi", nl: "Klaarstaan / gereed" },
      { ko: "시작", roman: "Sijak", nl: "Begin" },
      { ko: "그만", roman: "Geuman", nl: "Stop" },
      { ko: "바로", roman: "Baro", nl: "Terug naar de uitgangspositie" },
      { ko: "쉬어", roman: "Swieo", nl: "Op de plaats rust" },
      { ko: "뒤로 돌아", roman: "Dwiro dora", nl: "Omdraaien" },
      { ko: "기합", roman: "Kihap", nl: "Strijdkreet" }
    ]},
    { groep: "Tellen (1–10)", items: [
      { ko: "하나", roman: "Hana", nl: "1" },
      { ko: "둘", roman: "Dul", nl: "2" },
      { ko: "셋", roman: "Set", nl: "3" },
      { ko: "넷", roman: "Net", nl: "4" },
      { ko: "다섯", roman: "Daseot", nl: "5" },
      { ko: "여섯", roman: "Yeoseot", nl: "6" },
      { ko: "일곱", roman: "Ilgop", nl: "7" },
      { ko: "여덟", roman: "Yeodeol", nl: "8" },
      { ko: "아홉", roman: "Ahop", nl: "9" },
      { ko: "열", roman: "Yeol", nl: "10" }
    ]},
    { groep: "Doelgebieden & lichaam", items: [
      { ko: "얼굴", roman: "Eolgul", nl: "Hoog / gezicht" },
      { ko: "몸통", roman: "Momtong", nl: "Midden / romp" },
      { ko: "아래", roman: "Arae", nl: "Laag" },
      { ko: "주먹", roman: "Jumeok", nl: "Vuist" },
      { ko: "손날", roman: "Sonnal", nl: "Meshand" },
      { ko: "팔목", roman: "Palmok", nl: "Onderarm / pols" },
      { ko: "발", roman: "Bal", nl: "Voet" },
      { ko: "무릎", roman: "Mureup", nl: "Knie" }
    ]},
    { groep: "Algemeen", items: [
      { ko: "태권도", roman: "Taekwondo", nl: "De weg van hand en voet" },
      { ko: "도장", roman: "Dojang", nl: "Oefenzaal" },
      { ko: "도복", roman: "Dobok", nl: "Trainingspak" },
      { ko: "띠", roman: "Ti", nl: "Band / riem" },
      { ko: "사범님", roman: "Sabeomnim", nl: "Leraar / master" },
      { ko: "품새", roman: "Poomsae", nl: "Vormen" },
      { ko: "겨루기", roman: "Kyorugi", nl: "Sparren" },
      { ko: "품", roman: "Poom", nl: "Junior zwarte band-graad" }
    ]}
  ],

  /* -------------------- THEORIE -------------------- */
  theorie: [
    { id: "wat", titel: "Wat is taekwondo?", body:
      "Taekwondo (태권도) betekent letterlijk <b>de weg van hand en voet</b>: <b>tae</b> = voet / schoppen, <b>kwon</b> = vuist / hand, <b>do</b> = de weg. Het is een Koreaanse vechtkunst en sinds 2000 een olympische sport. Je traint niet alleen techniek, maar ook respect, discipline en doorzettingsvermogen." },
    { id: "taegeuk", titel: "De taegeuk & de vlag", body:
      "Het merk van deze app is de <b>taegeuk</b> uit de Koreaanse vlag: de rood-blauwe cirkel staat voor <b>eum en yang</b> — evenwicht tussen tegengestelde krachten. De vier tekens op de vlag zijn <b>trigrammen</b> (Geon, Ri, Gam, Gon). Niet toevallig heten de acht kleurbandvormen <b>Taegeuk 1–8</b>, elk verbonden aan een trigram." },
    { id: "poom", titel: "Poom of dan?", body:
      "Ben je <b>jonger dan 15 jaar</b> en haal je je zwarte band? Dan krijg je een <b>poom</b> (junior zwarte band) met een rood-zwarte band. Vanaf je 15e kun je die laten omzetten naar een <b>dan</b> (volwassen zwarte band). Deze app werkt naar je <b>eerste en tweede poom</b> toe." },
    { id: "etiquette", titel: "Etiquette in de dojang", body:
      "<b>Buig</b> als je de dojang (zaal) binnenkomt en verlaat. Groet je trainer en je trainingspartners. Draag een <b>schone dobok</b> met je band goed geknoopt. Wees op tijd, luister goed en help elkaar. Respect staat altijd voorop." },
    { id: "waarden", titel: "De waarden van taekwondo", body:
      "Taekwondo rust op vijf waarden: <b>hoffelijkheid</b> (ye-ui), <b>integriteit</b>, <b>doorzettingsvermogen</b>, <b>zelfbeheersing</b> en een <b>onbuigzame geest</b>. Deze horen niet alleen in de zaal, maar ook op school en thuis." }
  ],

  /* -------------------- EXAMENONDERDELEN -------------------- */
  onderdelen: [
    { ko: "일보 대련", roman: "Ilbo Taeryon", nl: "Eén-stap sparren",
      icon: "step",
      uitleg: "Afgesproken oefening met een partner. Je partner doet één stap naar voren met een stoot; jij blokt en counters met een nette, gecontroleerde techniek. Het traint afstand, timing en zuivere technieken zonder echt gevecht.",
      tips: ["Begin op de juiste afstand en groet je partner", "Blok eerst, dan pas de counter", "Stop de techniek met controle — raak niet vol"] },
    { ko: "호신술", roman: "Hosinsul", nl: "Zelfverdediging",
      icon: "shield",
      uitleg: "Praktische verdediging tegen grepen en omklemmingen: losmaken uit een polsgreep, een omklemming of een greep bij de kleding, en jezelf veilig bevrijden. Techniek en rust gaan boven kracht.",
      tips: ["Blijf rustig en houd balans", "Gebruik het zwakke punt van een greep (de duim)", "Maak jezelf los en creëer afstand"] },
    { ko: "겨루기", roman: "Gyeorugi", nl: "Sparren (vrij gevecht)",
      icon: "spar",
      uitleg: "Vrij sparren met een partner, mét bescherming (hogu, helm). Je scoort met gecontroleerde trappen en stoten op romp en hoofd. Respect en controle staan altijd voorop.",
      tips: ["Draag altijd je beschermers", "Blijf bewegen op je voorvoeten", "Controle boven hard raken"] },
    { ko: "격파", roman: "Gyeokpa", nl: "Breektest",
      icon: "break",
      uitleg: "Het breken van een plank (of testplank) met een trap of slag om kracht, precisie en focus te tonen. Kinderen gebruiken vaak herbruikbare kunststof-planken. Alleen onder begeleiding van je trainer.",
      tips: ["Richt je kracht dóór de plank heen", "Adem uit en kiai op het moment van raken", "Alleen doen met toestemming van je trainer"] }
  ],

  /* -------------------- QUIZ -------------------- */
  quiz: [
    { v: "Wat betekent 'do' in taekwondo?", o: ["De weg", "De vuist", "De voet", "De meester"], a: 0 },
    { v: "Welk commando betekent 'begin'?", o: ["Geuman", "Sijak", "Junbi", "Baro"], a: 1 },
    { v: "Hoeveel bewegingen heeft Taegeuk 1 (Il jang)?", o: ["12", "18", "20", "27"], a: 1 },
    { v: "Welk trigram hoort bij Taegeuk 1?", o: ["Gon (aarde)", "Gam (water)", "Keon (hemel)", "Ri (vuur)"], a: 2 },
    { v: "Wat is 'ap kubi'?", o: ["Paardrijstand", "Lange voorwaartse stand", "Sluitstand", "Achterwaartse stand"], a: 1 },
    { v: "Hoe tel je '3' in het Koreaans?", o: ["Set", "Dul", "Net", "Hana"], a: 0 },
    { v: "Wat is 'dollyo chagi'?", o: ["Zijtrap", "Voortrap", "Draaitrap", "Bijltrap"], a: 2 },
    { v: "Wat betekent 'momtong'?", o: ["Hoog / gezicht", "Midden / romp", "Laag", "Voet"], a: 1 },
    { v: "Welke stand is de paardrijstand?", o: ["Dwit kubi", "Ap seogi", "Juchum seogi", "Moa seogi"], a: 2 },
    { v: "Wat is een 'dobok'?", o: ["De band", "Het trainingspak", "De zaal", "De trap"], a: 1 },
    { v: "Vanaf welke leeftijd zet je poom om naar dan?", o: ["12 jaar", "15 jaar", "18 jaar", "10 jaar"], a: 1 },
    { v: "Wat betekent 'charyeot'?", o: ["Groeten", "Stop", "Houding aannemen", "Omdraaien"], a: 2 },
    { v: "Welke trap gaat recht naar beneden?", o: ["Naeryo chagi", "Ap chagi", "Yeop chagi", "Dwit chagi"], a: 0 },
    { v: "'Sonnal' is welk deel van het lichaam?", o: ["Vuist", "Knie", "Meshand", "Voet"], a: 2 },
    { v: "Welke vorm is de laatste kleurbandvorm?", o: ["Taegeuk 6", "Taegeuk 7", "Taegeuk 8", "Taegeuk 5"], a: 2 },
    { v: "Welke vorm is de eerste zwarteband-vorm (1e poom)?", o: ["Keumgang", "Koryo", "Taegeuk 8", "Taebaek"], a: 1 },
    { v: "Wat betekent 'Koryo'?", o: ["Diamant", "De geleerde (Goryeo)", "De berg", "Het water"], a: 1 },
    { v: "Welke vorm hoort bij de 2e poom?", o: ["Koryo", "Keumgang", "Taegeuk 7", "Pyongwon"], a: 1 },
    { v: "Wat betekent 'Keumgang'?", o: ["Diamant / onbreekbaar", "Hemel", "Wind", "Meer"], a: 0 },
    { v: "Welke stand balanceert op één been (in Keumgang)?", o: ["Juchum seogi", "Hakdari seogi", "Ap kubi", "Moa seogi"], a: 1 },
    { v: "Wat is 'ilbo taeryon'?", o: ["Zelfverdediging", "Eén-stap sparren", "Breektest", "Vrij sparren"], a: 1 },
    { v: "Wat betekent 'hosinsul'?", o: ["Sparren", "Zelfverdediging", "Breken", "Groeten"], a: 1 },
    { v: "Hoe heet vrij sparren?", o: ["Gyeorugi", "Gyeokpa", "Poomsae", "Hosinsul"], a: 0 },
    { v: "Wat is 'gyeokpa'?", o: ["Breektest", "Vormen", "Sparren", "Tellen"], a: 0 },
    { v: "Hoe tel je '5' in het Koreaans?", o: ["Net", "Daseot", "Yeoseot", "Set"], a: 1 },
    { v: "Hoe tel je '10' in het Koreaans?", o: ["Ahop", "Yeodeol", "Yeol", "Ilgop"], a: 2 },
    { v: "Wat betekent 'kihap'?", o: ["Groeten", "Strijdkreet", "Stop", "Klaarstaan"], a: 1 },
    { v: "Welke stand is de verdedigingsstand (gewicht achter)?", o: ["Ap kubi", "Dwit kubi", "Juchum seogi", "Moa seogi"], a: 1 },
    { v: "Wat is 'ap chagi'?", o: ["Zijtrap", "Draaitrap", "Voorwaartse trap", "Achtertrap"], a: 2 },
    { v: "Welk trigram hoort bij Taegeuk 8?", o: ["Keon (hemel)", "Gon (aarde)", "Gam (water)", "Ri (vuur)"], a: 1 },
    { v: "Wat betekent 'dojang'?", o: ["Trainingspak", "Oefenzaal", "Band", "Leraar"], a: 1 },
    { v: "Wat betekent 'sabeomnim'?", o: ["Leerling", "Leraar / master", "Band", "Groet"], a: 1 },
    { v: "Hoeveel bewegingen heeft Taegeuk 8?", o: ["18", "20", "25", "27"], a: 3 },
    { v: "Welk element hoort bij Taegeuk 6 (Gam)?", o: ["Vuur", "Water", "Wind", "Donder"], a: 1 },
    { v: "Wat betekent 'poom'?", o: ["Volwassen zwarte band", "Junior zwarte band", "Gele band", "Meester"], a: 1 },
    { v: "Welke trap is 'yeop chagi'?", o: ["Voortrap", "Zijtrap", "Draaitrap", "Bijltrap"], a: 1 }
  ]
};
