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
    "1": { naam: "1e poom", vorm: "Taegeuk Pal Jang", vormId: "pal",
      omschrijving: "Voor je 1e poom beheers je alle Taegeuk 1–8. Verplicht op het examen is Taegeuk 8 (Pal Jang); daarnaast een eigen keuze uit Taegeuk 4–7 en een verrassingsvorm uit 1–7. Koryo heb je hier nog niet nodig." },
    "2": { naam: "2e poom", vorm: "Koryo", vormId: "koryo",
      omschrijving: "Voor je 2e poom komt bovenop alle Taegeuk 1–8 je eerste zwarteband-vorm: Koryo — de verplichte poomsae van dit examen. Je theorie loopt nu tot en met Koryo." }
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
      beeld: "Hemel en licht", kernpunt: "Sterke, duidelijke basis. Rustig beginnen en netjes eindigen.",
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
      beeld: "Meer en kalmte", kernpunt: "Adem beheersen en ontspannen kracht gebruiken.",
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
      beeld: "Vuur", kernpunt: "Energie, ritme en duidelijke richtingswisselingen.",
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
      beeld: "Donder", kernpunt: "Krachtig reageren en toch beheerst blijven.",
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
      beeld: "Wind", kernpunt: "Soms zacht en soepel, soms plotseling krachtig.",
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
      beeld: "Water", kernpunt: "Meebewegen, omleiden en weer doorgaan.",
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
      beeld: "Berg", kernpunt: "Stabiel staan, goede balans en stevige houdingen.",
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
      beeld: "Aarde", kernpunt: "Alles uit de vorige vormen verbinden en volwassen uitvoeren.",
      focus: ["Sprongtrap (dubbele voortrap) met hoogte", "Alles wat je leerde samenbrengen", "Kracht, controle én ademhaling"],
      nieuw: [
        { ko: "두발 당성 앞차기", roman: "Dubal dangseong ap chagi", nl: "Springende dubbele voortrap" },
        { ko: "엇걸어 아래막기", roman: "Eotgeoreo arae makgi", nl: "Gekruiste lage blok" },
        { ko: "팔굽 돌려치기", roman: "Palkup dollyo chigi", nl: "Draaiende elleboogslag" }
      ],
      standen: ["Ap kubi", "Dwit kubi", "Juchum seogi"]
    },
    {
      id: "koryo", nr: 9, sino: "", video: "", level: 2, korean: "Koryo", hangul: "고려",
      trigram: "士", trigramNaam: "Seonbi", trigramHangul: "선비",
      element: "De geleerde", kup: "2e poom", band: "Zwart (poom)", bewegingen: 30,
      betekenis: "Koryo is vernoemd naar de Goryeo-dynastie — waar het woord 'Korea' vandaan komt. Het teken 士 staat voor de seonbi: een geleerde, sterke geest die niet buigt voor onrecht. Dit is je eerste zwarteband-vorm en de verplichte poomsae voor je 2e poom-examen.",
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
      id: "keumgang", nr: 10, sino: "", video: "", level: 3, korean: "Keumgang", hangul: "금강",
      trigram: "山", trigramNaam: "Berg / diamant", trigramHangul: "산",
      element: "Onbreekbare kracht", kup: "3e poom", band: "Zwart (poom)", bewegingen: 27,
      betekenis: "Keumgang betekent 'diamant' — te hard om te breken — en verwijst naar de Keumgang-berg en de Keumgang-krijger die het kwaad verjaagt. De vorm is langzaam, machtig en vol balans. Keumgang hoort pas bij je 3e poom, ná Koryo — dus buiten de eisen van deze app.",
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
    { ko: "주춤 서기", roman: "Juchum seogi", nl: "Paardrijstand", gewicht: "50 / 50", uitleg: "Breed en laag, alsof je op een paard zit. Voor kracht opzij." },
    { ko: "범 서기", roman: "Beom seogi", nl: "Tijger-/katstand", gewicht: "10 voor / 90 achter", uitleg: "Bijna al je gewicht op het achterste been; alleen de bal van de voorste voet raakt licht de grond. Klaar om snel te trappen. Komt o.a. in Taegeuk 6–8." },
    { ko: "꼬아 서기", roman: "Koa seogi", nl: "Kruisstand", gewicht: "op standbeen", uitleg: "Eén voet gekruist achter (of voor) de andere, benen dicht bij elkaar. Een overgang, vaak vóór een draai of zijwaartse trap." },
    { ko: "학다리 서기", roman: "Hakdari seogi", nl: "Kraanvogelstand", gewicht: "100 op 1 been", uitleg: "Op één been in balans; de andere voet rust tegen de knie. Balansstand, o.a. in Koryo vóór de zijwaartse trap." }
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
    { groep: "Algemeen", items: [
      { ko: "태권도", roman: "Taekwondo", nl: "De weg/manier van voet en vuist" },
      { ko: "도복", roman: "Dobok", nl: "Taekwondopak" },
      { ko: "도장", roman: "Dojang", nl: "Trainingsruimte" },
      { ko: "기합", roman: "Kiap", nl: "Krachtkreet" },
      { ko: "품새", roman: "Poomsae", nl: "Stijlvorm (vormen)" }
    ]},
    { groep: "Commando's", items: [
      { ko: "차렷", roman: "Charyot", nl: "In de houding staan" },
      { ko: "경례", roman: "Gyeong-rye", nl: "Groeten (buigen)" },
      { ko: "준비", roman: "Junbi", nl: "Klaarstaan" },
      { ko: "시작", roman: "Sijak", nl: "Start" },
      { ko: "그만", roman: "Geuman", nl: "Stop of einde" },
      { ko: "갈려", roman: "Gallyeo", nl: "Onderbreek (uit elkaar)" }
    ]},
    { groep: "Richtingen", items: [
      { ko: "왼", roman: "Oen", nl: "Links" },
      { ko: "오른", roman: "Oreun", nl: "Rechts" },
      { ko: "앞", roman: "Ap", nl: "Voorwaarts" },
      { ko: "뒤", roman: "Dwit", nl: "Achterwaarts" },
      { ko: "옆", roman: "Yeop", nl: "Zijwaarts" },
      { ko: "내려", roman: "Naeryo", nl: "Neerwaarts" },
      { ko: "올려", roman: "Ollyeo", nl: "Opwaarts" },
      { ko: "안", roman: "An", nl: "Binnenwaarts" },
      { ko: "바깥", roman: "Bakat", nl: "Buitenwaarts" },
      { ko: "세워", roman: "Seweo", nl: "Verticaal" },
      { ko: "젖혀", roman: "Jeochyo", nl: "Omgekeerd; handpalm naar boven" },
      { ko: "당겨", roman: "Dangyo", nl: "Trekkend of omgekeerd opwaarts" },
      { ko: "반대", roman: "Bandae", nl: "Tegengesteld gericht" },
      { ko: "바로", roman: "Baro", nl: "Gelijkgericht" },
      { ko: "눌러", roman: "Nooleo", nl: "Drukkend of duwend" },
      { ko: "돌려", roman: "Dollyeo", nl: "Draaiend of cirkelend" },
      { ko: "몸돌려", roman: "Momdollyeo", nl: "Draaien via de rug om de lichaamsas" },
      { ko: "뛰어", roman: "Twieo", nl: "Gesprongen" }
    ]},
    { groep: "Lichaamsdelen", items: [
      { ko: "몸", roman: "Mom", nl: "Lichaam" },
      { ko: "얼굴", roman: "Eolgool", nl: "Hoog (boven de sleutelbeenderen)" },
      { ko: "몸통", roman: "Momtong", nl: "Midden (romp)" },
      { ko: "아래", roman: "Arae", nl: "Laag (onder de navel)" },
      { ko: "턱", roman: "Teok", nl: "Kaak of kin" },
      { ko: "목", roman: "Mok", nl: "Hals of nek" },
      { ko: "등", roman: "Deung", nl: "Rug" },
      { ko: "팔굽", roman: "Palkoop", nl: "Elleboog" },
      { ko: "팔목", roman: "Palmok", nl: "Onderarm" },
      { ko: "안팔목", roman: "An Palmok", nl: "Binnenkant van de onderarm" },
      { ko: "바깥팔목", roman: "Bakat Palmok", nl: "Buitenkant van de onderarm" },
      { ko: "주먹", roman: "Joomeok", nl: "Vuist" },
      { ko: "메주먹", roman: "Me-Joomeok", nl: "Hamervuist" },
      { ko: "등주먹", roman: "Deung-Joomeok", nl: "Vuistrug" },
      { ko: "손", roman: "Son", nl: "Hand" },
      { ko: "손날", roman: "Sonnal", nl: "Meshand" },
      { ko: "손끝", roman: "Sonkeut", nl: "Vingertoppen" },
      { ko: "편손끝", roman: "Pyonsonkeut", nl: "Speerhand" },
      { ko: "무릎", roman: "Mooreup", nl: "Knie" },
      { ko: "발", roman: "Bal", nl: "Voet" },
      { ko: "발날", roman: "Balnal", nl: "Mesvoet" },
      { ko: "발등", roman: "Baldeung", nl: "Wreef" },
      { ko: "앞축", roman: "Apchook", nl: "Bal van de voet" },
      { ko: "뒤축", roman: "Dwichook", nl: "Hieldeel van de voet" }
    ]},
    { groep: "Materiaal", items: [
      { ko: "호구", roman: "Hogu", nl: "Rompbeschermer" }
    ]},
    { groep: "Examen onderdelen", items: [
      { ko: "일보 대련", roman: "Ilbo Taeryon", nl: "Eénstapssparring" },
      { ko: "이보 대련", roman: "Ibo Taeryon", nl: "Tweestapssparring" },
      { ko: "삼보 대련", roman: "Sambo Taeryon", nl: "Driestapssparring" },
      { ko: "겨루기", roman: "Gyeo-rugi", nl: "Sparren" },
      { ko: "격파", roman: "Gye Pa", nl: "Breektest" },
      { ko: "호신술", roman: "Hosinsul", nl: "Zelfverdediging" }
    ]},
    { groep: "Tellen (1–10)", items: [
      { ko: "하나", roman: "Hana / Il", nl: "een" },
      { ko: "둘", roman: "Dul / I", nl: "twee" },
      { ko: "셋", roman: "Set / Sam", nl: "drie" },
      { ko: "넷", roman: "Net / Sa", nl: "vier" },
      { ko: "다섯", roman: "Tasot / O", nl: "vijf" },
      { ko: "여섯", roman: "Yosot / Yuk", nl: "zes" },
      { ko: "일곱", roman: "Ilgop / Chil", nl: "zeven" },
      { ko: "여덟", roman: "Yodol / Pal", nl: "acht" },
      { ko: "아홉", roman: "Ahop / Ku", nl: "negen" },
      { ko: "열", roman: "Yul / Sip", nl: "tien" }
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

  /* -------------------- EXAMENKAART (per poom) -------------------- */
  /* "Jouw examen in één beeld" — exacte TBN-eisen per onderdeel, per poom. */
  examenkaart: {
    "1": {
      slagen: "9 van de 15 theorievragen goed (60%)",
      onderdelen: [
        { id: "poomsae", ko: "품새", roman: "Poomsae", nl: "Poomsae (vormen)",
          eis: "Taegeuk Pal Jang (verplicht) + één eigen keuze uit Taegeuk 4–7 + één verrassingsvorm van de commissie uit Taegeuk 1–7.",
          link: "#/poomsae", linkLabel: "Bekijk vormen" },
        { id: "ilbo", ko: "일보 대련", roman: "Ilbo Taeryon", nl: "Eén-stap sparren",
          eis: "15 stuks: 5 afwerkingen met een handtechniek en 10 met een voettechniek, waarvan minstens 3 gesprongen." },
        { id: "hosinsul", ko: "호신술", roman: "Hosinsul", nl: "Zelfverdediging",
          eis: "12 verdedigingen tegen vasthouden, beetpakken en klemmen — met je eigen partner." },
        { id: "gyeorugi", ko: "겨루기", roman: "Gyeo-rugi", nl: "Sparren",
          eis: "1× 1,5 minuut sparren met volledige bescherming en verschillende taekwondotechnieken." },
        { id: "gyepa", ko: "격파", roman: "Gye Pa", nl: "Breektest",
          eis: "3 categorie-A breektesten: 2 eigen keuzes (min. 1 voettechniek) + 1 aangewezen Yeop-, Dollyeo- of Dwit-chagi." },
        { id: "theorie", roman: "Theorie", nl: "Theorie",
          eis: "±15 meerkeuzevragen over termen, standen en technieken t/m Taegeuk 8. Vanaf 9 goed is voldoende.",
          link: "#/quiz", linkLabel: "Doe de quiz" }
      ]
    },
    "2": {
      slagen: "15 van de 25 theorievragen goed (60%)",
      onderdelen: [
        { id: "poomsae", ko: "품새", roman: "Poomsae", nl: "Poomsae (vormen)",
          eis: "Koryo (verplicht) + één eigen keuze uit Taegeuk 5–8 + één verrassingsvorm van de commissie uit Taegeuk 1–8.",
          link: "#/poomsae", linkLabel: "Bekijk vormen" },
        { id: "ilbo", ko: "일보 대련", roman: "Ilbo Taeryon", nl: "Eén-stap sparren",
          eis: "15 stuks, waarvan minstens 5 aanvallen ánders dan een gewone stoot. 5 hand- en 10 voetafwerkingen, min. 3 gesprongen." },
        { id: "hosinsul", ko: "호신술", roman: "Hosinsul", nl: "Zelfverdediging",
          eis: "12 verdedigingen tegen verschillende stokaanvallen (oefenstok 50–80 cm) — alleen veilig en door de trainer goedgekeurd." },
        { id: "pyojeok", ko: "표적 차기", roman: "Pyojeok Chagi + Gyeo-rugi", nl: "Targetwerk + sparren",
          eis: "1 minuut combinaties op 1–2 targets, direct gevolgd door 1 minuut sparren; volledige wedstrijdbescherming." },
        { id: "gyepa", ko: "격파", roman: "Gye Pa", nl: "Breektest",
          eis: "2 categorie-A breektesten in één sprong, zonder tussentijds te landen; minstens 1 voettechniek." },
        { id: "theorie", roman: "Theorie", nl: "Theorie",
          eis: "±25 meerkeuzevragen over termen, standen en technieken t/m Koryo. Vanaf 15 goed is voldoende.",
          link: "#/quiz", linkLabel: "Doe de quiz" }
      ]
    }
  },

  /* -------------------- BRONNEN -------------------- */
  bronnen: {
    gecontroleerd: "Bronnen gecontroleerd op 19 juli 2026.",
    disclaimer: "Dit is een onafhankelijke, kindvriendelijke leerhulp. De officiële documenten en aanwijzingen van de examencommissie gaan altijd voor.",
    items: [
      { titel: "TBN — Dan- en poomreglement (maart 2023)", org: "Taekwondo Bond Nederland",
        wat: "Technische eisen, wachttijden, beoordeling, partners en breekmateriaal.", url: "https://www.taekwondobond.nl" },
      { titel: "TBN — Koreaanse benamingen voor danexamens (maart 2026)", org: "Taekwondo Bond Nederland",
        wat: "Terminologie voor het theorieonderdeel.", url: "https://www.taekwondobond.nl" },
      { titel: "TBN — Dan- en Poom exameneisen", org: "Taekwondo Bond Nederland",
        wat: "Actuele aandachtspunten voor inschrijving, partner en registratie.", url: "https://www.taekwondobond.nl" },
      { titel: "TBN — Uitschrijving Nationaal danexamen (13 juni 2026)", org: "Taekwondo Bond Nederland",
        wat: "Bevestigt toepassing van het reglement van 29 maart 2023 en praktische voorwaarden.", url: "https://www.taekwondobond.nl" },
      { titel: "World Taekwondo — Competition Rules (per 1 juni 2026)", org: "World Taekwondo",
        wat: "Puntentelling en verboden handelingen bij kyorugi.", url: "https://www.worldtaekwondo.org" },
      { titel: "Kukkiwon — History & Poomsae information", org: "Kukkiwon",
        wat: "Achtergrond van modern Taekwondo en de betekenis van poomsae.", url: "https://www.kukkiwon.or.kr" },
      { titel: "Olympics — Sydney 2000 Taekwondo results", org: "International Olympic Committee",
        wat: "Taekwondo als medaillesport op de Olympische Spelen van Sydney 2000.", url: "https://www.olympics.com" }
    ]
  },

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
    { v: "Welke poomsae is verplicht op het 1e poom-examen?", o: ["Koryo", "Taegeuk Pal Jang", "Keumgang", "Taegeuk Sa Jang"], a: 1 },
    { v: "Welke poomsae is verplicht op het 2e poom-examen?", o: ["Taegeuk Pal Jang", "Keumgang", "Koryo", "Taebaek"], a: 2, lvl: 2 },
    { v: "Wat betekent 'Koryo'?", o: ["Diamant", "De geleerde (seonbi/Goryeo)", "De berg", "Het water"], a: 1, lvl: 2 },
    { v: "Waar komt de naam 'Koryo' vandaan?", o: ["De Goryeo-dynastie — waar 'Korea' vandaan komt", "Een berg in Korea", "Een oude meester", "Het woord voor diamant"], a: 0, lvl: 2 },
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
