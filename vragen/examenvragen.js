/* =========================================================================
   POOM ACADEMIE — EXAMENVRAGEN (proefexamen-vragenbank)
   =========================================================================

   Dit bestand bevat de vragen voor het proefexamen in de app.
   Het is met opzet los gehouden, zodat leraren / examinatoren de vragen
   makkelijk kunnen NAKIJKEN, VERBETEREN of AANVULLEN — zonder de rest van
   de app aan te raken.

   ─────────────────────────────────────────────────────────────────────────
   HOE VOEG JE EEN VRAAG TOE?
   Kopieer een bestaand blok en pas het aan. Elke vraag ziet er zo uit:

     {
       id:        "uniek-kort-label",          // uniek, kleine letters, geen spaties
       categorie: "Theorie",                   // zie de lijst met categorieën hieronder
       vraag:     "Wat betekent 'do'?",        // de vraag
       opties:    ["De weg", "De vuist", ...], // 2 t/m 4 antwoordkeuzes
       antwoord:  "De weg",                    // MOET exact gelijk zijn aan één van de opties
       niveau:    null,                        // null = voor iedereen; "poom2" = pas vanaf 2e poom
       toelichting: ""                         // optioneel: korte uitleg / bron (mag leeg)
     },

   REGELS
   • "antwoord" moet LETTERLIJK overeenkomen met één van de "opties"
     (zelfde spelling, hoofdletters en leestekens). De app controleert dit
     en slaat een vraag met een fout antwoord over (zie de console-melding).
   • Volgorde van de opties maakt niet uit; het juiste antwoord wordt op naam
     gevonden, niet op positie. Je mag opties dus vrij herschikken.
   • Categorieën die de app nu gebruikt:
       Theorie · Poomsae · Standen · Technieken · Termen · Tellen · Commando's · Onderdelen
     (Nieuwe categorie verzinnen mag — hij verschijnt dan vanzelf.)
   • "niveau": laat op null voor geup-leerlingen. Gebruik "poom2" voor vragen
     die pas gesteld mogen worden vanaf de 2e poom (bv. Koryo-theorie).

   Na wijzigen: gewoon opslaan en de app herladen. Geen andere stappen nodig.
   ========================================================================= */

window.POOM_VRAGEN = {
  meta: {
    titel: "Poom Academie — Examenvragenbank",
    versie: "1.0",
    bijgewerkt: "2026-07-24",
    bron: "Samengesteld uit het lesmateriaal; graag laten nakijken door de examencommissie.",
    contact: "Vul hier de naam/e-mail in van wie deze vragen beheert."
  },

  vragen: [

    /* ---------------- THEORIE ---------------- */
    { id: "th-do", categorie: "Theorie",
      vraag: "Wat betekent 'do' in taekwondo?",
      opties: ["De weg", "De vuist", "De voet", "De meester"],
      antwoord: "De weg", niveau: null,
      toelichting: "Tae = voet/springen, kwon = vuist, do = de weg/levenshouding." },

    { id: "th-dobok", categorie: "Theorie",
      vraag: "Wat is een 'dobok'?",
      opties: ["De band", "Het trainingspak", "De zaal", "De trap"],
      antwoord: "Het trainingspak", niveau: null, toelichting: "" },

    { id: "th-dojang", categorie: "Theorie",
      vraag: "Wat betekent 'dojang'?",
      opties: ["Trainingspak", "Oefenzaal", "Band", "Leraar"],
      antwoord: "Oefenzaal", niveau: null, toelichting: "" },

    { id: "th-sabeomnim", categorie: "Theorie",
      vraag: "Wat betekent 'sabeomnim'?",
      opties: ["Leerling", "Leraar / master", "Band", "Groet"],
      antwoord: "Leraar / master", niveau: null, toelichting: "" },

    { id: "th-kihap", categorie: "Theorie",
      vraag: "Wat betekent 'kihap'?",
      opties: ["Groeten", "Strijdkreet", "Stop", "Klaarstaan"],
      antwoord: "Strijdkreet", niveau: null,
      toelichting: "De krachtige schreeuw die spanning en ademhaling bundelt." },

    { id: "th-poom", categorie: "Theorie",
      vraag: "Wat betekent 'poom'?",
      opties: ["Volwassen zwarte band", "Junior zwarte band", "Gele band", "Meester"],
      antwoord: "Junior zwarte band", niveau: null,
      toelichting: "Poom is de jeugd-zwarteband; wordt later omgezet naar dan." },

    { id: "th-poomdan", categorie: "Theorie",
      vraag: "Vanaf welke leeftijd zet je poom om naar dan?",
      opties: ["12 jaar", "15 jaar", "18 jaar", "10 jaar"],
      antwoord: "15 jaar", niveau: null, toelichting: "" },

    /* ---------------- COMMANDO'S ---------------- */
    { id: "cmd-sijak", categorie: "Commando's",
      vraag: "Welk commando betekent 'begin'?",
      opties: ["Geuman", "Sijak", "Junbi", "Baro"],
      antwoord: "Sijak", niveau: null,
      toelichting: "Junbi = klaarstaan, geuman = stoppen, baro = terug." },

    { id: "cmd-charyeot", categorie: "Commando's",
      vraag: "Wat betekent 'charyeot'?",
      opties: ["Groeten", "Stop", "Houding aannemen", "Omdraaien"],
      antwoord: "Houding aannemen", niveau: null,
      toelichting: "Charyeot = op de plaats/aandacht; gevolgd door kyeongnye (groeten)." },

    /* ---------------- TELLEN (Koreaans) ---------------- */
    { id: "tel-3", categorie: "Tellen",
      vraag: "Hoe tel je '3' in het Koreaans?",
      opties: ["Set", "Dul", "Net", "Hana"],
      antwoord: "Set", niveau: null,
      toelichting: "Hana(1) · dul(2) · set(3) · net(4)." },

    { id: "tel-5", categorie: "Tellen",
      vraag: "Hoe tel je '5' in het Koreaans?",
      opties: ["Net", "Daseot", "Yeoseot", "Set"],
      antwoord: "Daseot", niveau: null, toelichting: "" },

    { id: "tel-10", categorie: "Tellen",
      vraag: "Hoe tel je '10' in het Koreaans?",
      opties: ["Ahop", "Yeodeol", "Yeol", "Ilgop"],
      antwoord: "Yeol", niveau: null,
      toelichting: "Ilgop(7) · yeodeol(8) · ahop(9) · yeol(10)." },

    /* ---------------- STANDEN ---------------- */
    { id: "st-apkubi", categorie: "Standen",
      vraag: "Wat is 'ap kubi'?",
      opties: ["Paardrijstand", "Lange voorwaartse stand", "Sluitstand", "Achterwaartse stand"],
      antwoord: "Lange voorwaartse stand", niveau: null, toelichting: "" },

    { id: "st-juchum", categorie: "Standen",
      vraag: "Welke stand is de paardrijstand?",
      opties: ["Dwit kubi", "Ap seogi", "Juchum seogi", "Moa seogi"],
      antwoord: "Juchum seogi", niveau: null, toelichting: "" },

    { id: "st-dwitkubi", categorie: "Standen",
      vraag: "Welke stand is de verdedigingsstand (gewicht achter)?",
      opties: ["Ap kubi", "Dwit kubi", "Juchum seogi", "Moa seogi"],
      antwoord: "Dwit kubi", niveau: null, toelichting: "" },

    /* ---------------- TECHNIEKEN (trappen) ---------------- */
    { id: "tk-dollyo", categorie: "Technieken",
      vraag: "Wat is 'dollyo chagi'?",
      opties: ["Zijtrap", "Voortrap", "Draaitrap", "Bijltrap"],
      antwoord: "Draaitrap", niveau: null, toelichting: "" },

    { id: "tk-naeryo", categorie: "Technieken",
      vraag: "Welke trap gaat recht naar beneden?",
      opties: ["Naeryo chagi", "Ap chagi", "Yeop chagi", "Dwit chagi"],
      antwoord: "Naeryo chagi", niveau: null, toelichting: "Naeryo = bijltrap, van boven naar beneden." },

    { id: "tk-apchagi", categorie: "Technieken",
      vraag: "Wat is 'ap chagi'?",
      opties: ["Zijtrap", "Draaitrap", "Voorwaartse trap", "Achtertrap"],
      antwoord: "Voorwaartse trap", niveau: null, toelichting: "" },

    { id: "tk-yeop", categorie: "Technieken",
      vraag: "Welke trap is 'yeop chagi'?",
      opties: ["Voortrap", "Zijtrap", "Draaitrap", "Bijltrap"],
      antwoord: "Zijtrap", niveau: null, toelichting: "" },

    /* ---------------- TERMEN (lichaam/doel) ---------------- */
    { id: "tm-momtong", categorie: "Termen",
      vraag: "Wat betekent 'momtong'?",
      opties: ["Hoog / gezicht", "Midden / romp", "Laag", "Voet"],
      antwoord: "Midden / romp", niveau: null,
      toelichting: "Eolgul = hoog, momtong = midden, arae = laag." },

    { id: "tm-sonnal", categorie: "Termen",
      vraag: "'Sonnal' is welk deel van het lichaam?",
      opties: ["Vuist", "Knie", "Meshand", "Voet"],
      antwoord: "Meshand", niveau: null, toelichting: "Sonnal = zijkant van de open hand (meshand)." },

    /* ---------------- ONDERDELEN ---------------- */
    { id: "on-ilbo", categorie: "Onderdelen",
      vraag: "Wat is 'ilbo taeryon'?",
      opties: ["Zelfverdediging", "Eén-stap sparren", "Breektest", "Vrij sparren"],
      antwoord: "Eén-stap sparren", niveau: null, toelichting: "" },

    { id: "on-hosinsul", categorie: "Onderdelen",
      vraag: "Wat betekent 'hosinsul'?",
      opties: ["Sparren", "Zelfverdediging", "Breken", "Groeten"],
      antwoord: "Zelfverdediging", niveau: null, toelichting: "" },

    { id: "on-gyeorugi", categorie: "Onderdelen",
      vraag: "Hoe heet vrij sparren?",
      opties: ["Gyeorugi", "Gyeokpa", "Poomsae", "Hosinsul"],
      antwoord: "Gyeorugi", niveau: null, toelichting: "" },

    { id: "on-gyeokpa", categorie: "Onderdelen",
      vraag: "Wat is 'gyeokpa'?",
      opties: ["Breektest", "Vormen", "Sparren", "Tellen"],
      antwoord: "Breektest", niveau: null, toelichting: "" },

    /* ---------------- POOMSAE ---------------- */
    { id: "pm-il-bew", categorie: "Poomsae",
      vraag: "Hoeveel bewegingen heeft Taegeuk 1 (Il jang)?",
      opties: ["12", "18", "20", "27"],
      antwoord: "18", niveau: null, toelichting: "" },

    { id: "pm-il-trig", categorie: "Poomsae",
      vraag: "Welk trigram hoort bij Taegeuk 1?",
      opties: ["Gon (aarde)", "Gam (water)", "Keon (hemel)", "Ri (vuur)"],
      antwoord: "Keon (hemel)", niveau: null, toelichting: "Taegeuk Il Jang = Keon, de hemel." },

    { id: "pm-pal-trig", categorie: "Poomsae",
      vraag: "Welk trigram hoort bij Taegeuk 8?",
      opties: ["Keon (hemel)", "Gon (aarde)", "Gam (water)", "Ri (vuur)"],
      antwoord: "Gon (aarde)", niveau: null, toelichting: "Taegeuk Pal Jang = Gon, de aarde." },

    { id: "pm-pal-bew", categorie: "Poomsae",
      vraag: "Hoeveel bewegingen heeft Taegeuk 8?",
      opties: ["18", "20", "25", "27"],
      antwoord: "27", niveau: null, toelichting: "" },

    { id: "pm-yuk-elem", categorie: "Poomsae",
      vraag: "Welk element hoort bij Taegeuk 6 (Gam)?",
      opties: ["Vuur", "Water", "Wind", "Donder"],
      antwoord: "Water", niveau: null, toelichting: "" },

    { id: "pm-laatste", categorie: "Poomsae",
      vraag: "Welke vorm is de laatste kleurbandvorm?",
      opties: ["Taegeuk 6", "Taegeuk 7", "Taegeuk 8", "Taegeuk 5"],
      antwoord: "Taegeuk 8", niveau: null, toelichting: "" },

    { id: "pm-poom1", categorie: "Poomsae",
      vraag: "Welke poomsae is verplicht op het 1e poom-examen?",
      opties: ["Koryo", "Taegeuk Pal Jang", "Keumgang", "Taegeuk Sa Jang"],
      antwoord: "Taegeuk Pal Jang", niveau: null, toelichting: "" },

    /* --- Vragen vanaf de 2e poom (Koryo) --- */
    { id: "pm-poom2", categorie: "Poomsae",
      vraag: "Welke poomsae is verplicht op het 2e poom-examen?",
      opties: ["Taegeuk Pal Jang", "Keumgang", "Koryo", "Taebaek"],
      antwoord: "Koryo", niveau: "poom2", toelichting: "" },

    { id: "pm-koryo-bet", categorie: "Poomsae",
      vraag: "Wat betekent 'Koryo'?",
      opties: ["Diamant", "De geleerde (seonbi/Goryeo)", "De berg", "Het water"],
      antwoord: "De geleerde (seonbi/Goryeo)", niveau: "poom2", toelichting: "" },

    { id: "pm-koryo-naam", categorie: "Poomsae",
      vraag: "Waar komt de naam 'Koryo' vandaan?",
      opties: ["De Goryeo-dynastie — waar 'Korea' vandaan komt", "Een berg in Korea", "Een oude meester", "Het woord voor diamant"],
      antwoord: "De Goryeo-dynastie — waar 'Korea' vandaan komt", niveau: "poom2", toelichting: "" }

  ]
};
