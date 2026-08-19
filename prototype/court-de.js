// BuddyLingo — GERMAN for the Lover / Affirmation content.
//
// An OVERLAY, not a second deck: court-deck.js declares the structure once and
// asks this file first for every field it can translate. A scenario listed under
// `scenarios` is served in German; one that is not stays fully English, so the
// app is never half-translated mid-round.
//
// Translation notes for anything added here: German banter is not English banter
// with German words. Keep the du form throughout, keep sentences short, and let
// the joke sit at the end of the sentence where German wants it. Where a line is
// funnier as an idiom than as a translation, take the idiom.
//
// A translated scenario MUST keep the structure it overrides: same step order,
// same `k` and `lvl`, same `ok` values, same slot count. Only the words change.
window.COURT_DE = (function () {
  var concepts = {
    ll: {
      notice: "Aufmerksamkeit", specificity: "Konkret werden", angle: "Den Winkel finden",
      twist: "Die Wendung", thread: "Den Faden geben", playfulness: "Spielfreude",
      calibration: "Dosierung", reciprocity: "Gegenleistung",
      restraint: "Wissen, wann Schluss ist", callback: "Rückgriff"
    },
    wa: {
      notice: "Aufmerksamkeit", effort: "Mühe", consistency: "Verlässlichkeit",
      courage: "Mut", thoughtfulness: "Achtsamkeit", competence: "Können",
      specificity: "Konkret werden", impact: "Wirkung benennen", restraint: "Weniger sagen",
      care: "Fürsorge"
    }
  };

  var verdicts = {
    npc: ["NPC", "Die letzten achtzehn Männer haben genau das geschrieben."],
    npc2: ["NPC", "Formal ein Gespräch. Gefühlt Raufasertapete."],
    dead: ["SACKGASSE", "Schöne Aussage. Sie hat jetzt exakt nichts, worauf sie antworten könnte."],
    interview: ["VERHÖRMODUS", "Frage vier. Sie fragt sich langsam, ob das der Zoll ist."],
    tryhard: ["ZU BEMÜHT", "Man hört beim Lesen, wie du eine Augenbraue hochgezogen hast."],
    sauce: ["ZU VIEL SOSSE", "Sie hat geflirtet. Du hast einen Heiratsantrag gemacht."],
    creep: ["AUF KEINEN FALL", "Nein."],
    fine: ["GEHT SO", "Nichts falsch daran. Nichts besonders lebendig daran."],
    near: ["GUTER WINKEL. SCHLECHTE LANDUNG.", "Du hast es gesehen. Und dann draufgetreten."],
    closed: ["GUT, ABER ZU", "Schöne Zeile. Gibt ihr nichts zurück."],
    also: ["GEHT AUCH. ANDERE ENERGIE.", "Hätte ich nicht gemacht. Kann ich schwer widerlegen."],
    sharp: ["DA IST ES", "Konkret, und nur über sie."],
    thread: ["FADEN GEFUNDEN", "Das kann sie in einem Atemzug beantworten."],
    spicy: ["GUTE SOSSE", "Frech und richtig dosiert. Seltene Kombination."],
    saw: ["DU HAST ES GESEHEN", "Alle anderen haben auf das Kleid geschaut."],
    pulse: ["ENDLICH. EIN PULS.", "Komisch. Komisch ist gut."],
    callback: ["RÜCKGRIFF", "Du hast dir was gemerkt. Wunder passieren."],
    restraint: ["RICHTIG: GAR NICHTS", "Nichts tun ist ein Zug. Neuerdings dein liebster."],
    cold: ["ZU KÜHL", "Du hast geklungen wie ihre Hausverwaltung."],
    potato: ["KARTOFFEL", "Du hast erfolgreich mitgeteilt, dass es schön war."],
    linkedin: ["LINKEDIN", "Gratulation zu ihrer persönlichen Entwicklungsreise."],
    target: ["FALSCHES ZIEL", "Sie wurde befördert. Du hast ihre Haare gelobt."],
    hallmark: ["GRÜSSKARTE", "So hat noch nie jemand gesprochen, der nicht bedruckt war."],
    much: ["ZU VIEL", "Sie hat dir Tee gemacht. Keine Niere gespendet."],
    beautiful: ["SCHÖN", "Konkret. Wahr. Sie weiß genau, was du meinst."],
    seen: ["SIE FÜHLT SICH GESEHEN", "Du hast den Teil benannt, von dem sie dachte, keiner merkt ihn."]
  };

  // Same pools, same probabilities — court-deck.js keeps the dice. The trailing
  // number is the outcome weight and must not be translated away.
  var replies = {
    laugh: [["Ok, das hat mir in der Bahn ein echtes Lachen entrissen.", 1],
      ["Damit hab ich nicht gerechnet. Gut gemacht.", 1],
      ["Gut, du bist witzig. Nervig.", 1]],
    build: [["Richtig, und er weiß es genau. Er überweist die Miete.", 2],
      ["Vorsicht, ich eskaliere das sofort.", 2],
      ["Ok, aber jetzt bist du in der Nummer drin, also weiter.", 2]],
    warm: [["Das ist eine deutlich bessere Frage als üblich.", 1],
      ["Ok, du hast dir eine richtige Antwort verdient, warte.", 1],
      ["Das hat mich noch keiner gefragt. Gib mir eine Sekunde.", 1]],
    poke: [["Große Worte für jemanden mit zwei Fotos und einem Gruppenbild.", 1],
      ["Starke Eröffnung. Mal sehen, ob du das hältst.", 1]],
    polite: [["Haha ja! War lustig 😊", 0], ["Danke! Ja, ein bisschen mach ich das.", 0],
      ["Das ist in Portugal 🙂", 0]],
    flat: [["haha", 0], ["ja", 0], ["lol", 0]],
    none: [["", -1]],
    tangent: [["Random, aber kennst du irgendwo, wo man Fahrradbremsen richten lässt", 0],
      ["Sorry, Chaostag. Wo waren wir", 0]]
  };

  var tiers = {
    ll: ["Schreibt „Hey“", "Fahrschüler", "Stellt echte Fragen", "Führt ein Gespräch",
      "Tatsächlich charmant", "Gefährlich souverän", "Großmeister des Geplauders"],
    wa: ["Sagt „schön“", "Übt noch", "Wird konkret", "Benennt Wirkung",
      "Sieht den Menschen", "Sagt es rechtzeitig", "Großmeister der Anerkennung"]
  };

  // ── Scenario translations, keyed by the id in court-deck.js ────────────────
  var scenarios = {

    ll_dog: {
      pack: "HUNDEMENSCH",
      sit: "Ihr Profil besteht hauptsächlich aus dem Hund. Sie steht im Hintergrund ihrer eigenen Fotos.",
      card: { photo: "Golden Retriever auf dem Beifahrersitz, mit ihrer Sonnenbrille. Sie ist irgendwo dahinter.",
        prompt: "Meine kleinen Freuden", line: "Ein Hund, der mich ignoriert, und ein Kaffee, der das nicht tut." },
      steps: [
        { k: "hook", lvl: "12", q: "Drei Männer haben schon „süßer Hund“ geschrieben. Was übersehen die alle?", o: [
          { t: "Der Hund ist sehr süß", ok: 0, w: "Da fangen alle an. Die meisten bleiben da." },
          { t: "Der Hund führt offensichtlich den Haushalt", ok: 1, w: "Das ist der Witz, den sie geschrieben hat und den keiner aufgehoben hat." },
          { t: "Sie sieht gut aus auf dem Foto", ok: 0, w: "Du hast ihr Aussehen bewertet. Gratulation." },
          { t: "Sie mag wahrscheinlich Tiere", ok: 0, w: "Erstaunliche Detektivarbeit." }
        ] },
        { k: "npc", lvl: "12", q: "Welche davon hat sie heute schon elf Mal gelesen?", o: [
          { t: "Süßer Hund! Wie heißt er?", ok: 1, w: "Richtig. Das ist die Tapete." },
          { t: "Der Hund hat dieses Profil geschrieben und ich glaube, du weißt nicht, dass du drauf bist.", ok: 0, w: "Nein. Die lebt." },
          { t: "Wer ignoriert dich mehr, er oder der Kaffee?", ok: 0, w: "Nein — die benutzt ihre eigene Zeile gegen sie." }
        ] },
        { k: "angle", lvl: "123", q: "Dein Zug. Welcher Weg rein?", o: [
          { t: "FRAGEN", d: "Wie heißt er, welche Rasse", ok: 0, w: "Du hast die Warteschlange gewählt." },
          { t: "SCHEINERNSTE ANKLAGE", d: "Der Hund ist der mit dem Profil", ok: 1, w: "Ja. Und jetzt dabei bleiben." },
          { t: "KOMPLIMENT", d: "Sag ihr, der Hund ist schön", ok: 0, w: "Du hast den Hund gelobt. Er kann nicht antworten." },
          { t: "ROLLENTAUSCH", d: "Beim Hund um Erlaubnis bitten", ok: 2, w: "Andere Note, gleicher Instinkt. Passt." }
        ] },
        { k: "build", lvl: "23", q: "Baue es. Beobachtung, Wendung, dann ein Weg zurück zu ihr.", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "Der Hund ist auf vier dieser Fotos und du auf zwei", ok: 1 },
            { t: "Dein Hund ist so süß", ok: 0 },
            { t: "Schöne Fotos", ok: 0 }
          ] },
          { label: "WENDUNG", o: [
            { t: "was dafür spricht, dass er das Profil angelegt hat", ok: 1 },
            { t: "und ich mag Hunde auch", ok: 0 },
            { t: "du musst ihn sehr lieben", ok: 0 }
          ] },
          { label: "FADEN", o: [
            { t: "und was hat er dir über mich erzählt?", ok: 1 },
            { t: "wie war deine Woche?", ok: 0 },
            { t: "er hat Glück.", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "Der Hund ist auf vier dieser Fotos und du auf zwei, was dafür spricht, dass er das Profil angelegt hat. Und was hat er dir über mich erzählt?",
        why: "Eine echte Beobachtung, ein absurder Schluss, eine Frage, die nur sie beantworten kann. Das ist die ganze Grammatik." }
    },

    ll_fish: {
      pack: "HINGE-KLASSIKER",
      sit: "Elegantes Kleid. Enormer Fisch. Keine Erklärung.",
      card: { photo: "Bodenlanges grünes Seidenkleid, Absätze versinken im Bootssteg, in den Armen ein Hecht von der Größe eines Kleinkinds.",
        prompt: "Zwei Wahrheiten und eine Lüge", line: "Ich war im Fernsehen, ich kann nicht schwimmen, ich habe mal im Cocktailkleid das Abendessen gefangen." },
      steps: [
        { k: "hook", lvl: "123", q: "Auf diesem Foto ist genau eine Sache interessant.", o: [
          { t: "Das Kleid", ok: 0, w: "Wie bei den letzten vier Männern." },
          { t: "Sie ist attraktiv", ok: 0, w: "Atemberaubend." },
          { t: "Der Kontrast — dieses Outfit, dieser Fisch", ok: 1, w: "Die Absurdität IST der Haken. Immer." },
          { t: "Wo das Foto entstanden ist", ok: 0, w: "Geografie. Ihr Lieblingsthema." }
        ] },
        { k: "npc", lvl: "12", q: "Erschieß die NPC-Zeile.", o: [
          { t: "Wow, wo war das?", ok: 1, w: "Ja. In den Müll." },
          { t: "So zieht sich keiner aus Versehen an und so fängt keiner aus Versehen. Was war zuerst?", ok: 0, w: "Die ist gut, lass die stehen." },
          { t: "Ich brauche die ganze Geschichte, und zwar in der richtigen Reihenfolge.", ok: 0, w: "Funktioniert. Nicht die NPC." }
        ] },
        { k: "angle", lvl: "123", q: "Wähle den Zugang.", o: [
          { t: "KLEINE FIKTION", d: "Erzähl, was danach passiert ist", ok: 1, w: "Erfinde die acht Sekunden nach dem Auslöser. Sie wird dich korrigieren, und das ist eine Antwort." },
          { t: "FRAGEN", d: "Wo, wann, welcher Fisch", ok: 0, w: "Du hast mit Papierkram eröffnet." },
          { t: "KOMPLIMENT", d: "Sie sieht fantastisch aus", ok: 0, w: "Du hast ein Foto von einer Frau mit einem Hecht und redest über den Stoff." },
          { t: "HARMLOSE HERAUSFORDERUNG", d: "Zieh die Lüge aus ihren drei heraus", ok: 2, w: "Auch gut. Du hast den Prompt benutzt statt ihn zu ignorieren." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "Das Kleid sagt Hochzeit, der Fisch sagt Survival-Sendung", ok: 1 },
            { t: "Das ist ein großer Fisch!", ok: 0 },
            { t: "Du siehst super aus hier", ok: 0 }
          ] },
          { label: "WENDUNG", o: [
            { t: "und über die Absätze reden wir beide jetzt einfach nicht", ok: 1 },
            { t: "ich angle auch gerne", ok: 0 },
            { t: "du bist bestimmt viel draußen", ok: 0 }
          ] },
          { label: "FADEN", o: [
            { t: "Also: wessen Idee war das?", ok: 1 },
            { t: "Wie ist dein Sonntag?", ok: 0 },
            { t: "Beeindruckend.", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "Das Kleid sagt Hochzeit, der Fisch sagt Survival-Sendung, und über die Absätze reden wir beide jetzt einfach nicht. Also: wessen Idee war das?",
        why: "Du hast den Kontrast gesehen, ihn lustiger gemacht und eine kleine Frage übrig gelassen, die sie sofort beantworten kann." }
    },

    ll_hey: {
      pack: "HINGE-KLASSIKER",
      sit: "Ihr habt ein Match. Deine Daumen sind leer.",
      card: { photo: "Drei Fotos: ein Dach, eine sehr alte Katze, ein halbfertiges Tattoo.",
        prompt: "So gewinnst du mich", line: "Hab eine Meinung. Zu irgendwas." },
      steps: [
        { k: "npc", lvl: "123", q: "Sie hat um eine Meinung gebeten. Welcher davon ist der NPC-Zug?", o: [
          { t: "Hey, wie gehts?", ok: 1, w: "Du wusstest es. Und hast es historisch trotzdem geschickt." },
          { t: "Meinung: diese Katze hat Dinge gesehen und wird darüber nicht sprechen.", ok: 0, w: "Das ist eine Meinung. Seltsam. Gut." },
          { t: "Starker Prompt. Meine: Tattoos sollten im selben Jahrzehnt fertig werden.", ok: 0, w: "Frech, konkret, benutzt ihr eigenes Foto. Lass die." }
        ] },
        { k: "hook", lvl: "12", q: "Worum hat sie eigentlich gebeten?", o: [
          { t: "Um einen Gesprächsanfang", ok: 0, w: "Fast. Zu vage." },
          { t: "Um eine Position. Irgendeine, laut ausgesprochen.", ok: 1, w: "Richtig. Also nimm eine ein, zu etwas aus ihren Fotos." },
          { t: "Um ein Kompliment", ok: 0, w: "Genau darum hat sie ausdrücklich nicht gebeten." },
          { t: "Um jemanden mit Selbstbewusstsein", ok: 0, w: "Wahr und nutzlos. Selbstbewusstsein ist kein Satz." }
        ] },
        { k: "build", lvl: "23", q: "Eine Meinung, zu etwas von ihr.", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "Meinung, du hast gefragt:", ok: 1 },
            { t: "Hey!", ok: 0 },
            { t: "Du wirkst cool,", ok: 0 }
          ] },
          { label: "WENDUNG", o: [
            { t: "ein unfertiges Tattoo ist das Vertrauenswürdigste auf einem Profil", ok: 1 },
            { t: "du bist echt hübsch", ok: 0 },
            { t: "ich mag deine Fotos", ok: 0 }
          ] },
          { label: "FADEN", o: [
            { t: "Wie lange sitzt es schon so da?", ok: 1 },
            { t: "Wie läuft deine Woche?", ok: 0 },
            { t: "Also 😄", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "Meinung, du hast gefragt: ein unfertiges Tattoo ist das Vertrauenswürdigste auf einem Profil. Wie lange sitzt es schon so da?",
        why: "Sie wollte eine Meinung und hat eine bekommen, gerichtet auf etwas, das nur sie hat." }
    },

    ll_pasta: {
      pack: "FOODIE",
      sit: "„Ich mache unglaubliche Pasta.“ Schriftlich. Öffentlich.",
      card: { photo: "Küchentheke, Mehl überall, ein Nudelholz und eine extrem selbstbewusste Schüssel Tagliatelle.",
        prompt: "Ich flippe aus für", line: "Pasta, die ich selbst gemacht habe. Ich bin da nicht bescheiden." },
      steps: [
        { k: "hook", lvl: "12", q: "Was hat sie dir gerade gegeben?", o: [
          { t: "Ein gemeinsames Interesse an Essen", ok: 0, w: "Du bist kurz davor, „ich koche auch gerne“ zu schreiben. Ich spüre es." },
          { t: "Eine Behauptung. Aktenkundig. Unbelegt.", ok: 1, w: "Genau. Sie hat dir etwas gegeben, worauf du drücken kannst." },
          { t: "Ein Hobby zum Nachfragen", ok: 0, w: "Frage eins von vier, oder?" },
          { t: "Belege, dass sie Heiratsmaterial ist", ok: 0, w: "Pack das weg." }
        ] },
        { k: "angle", lvl: "123", q: "Welcher Zug?", o: [
          { t: "SPIELERISCHES MISSVERSTEHEN", d: "Behandle die Behauptung als juristische Aussage", ok: 1, w: "Ja. Nimm sie ernst, aber im falschen Register." },
          { t: "FRAGEN", d: "Welche Pasta machst du?", ok: 0, w: "Zeile eins der Warteschlange." },
          { t: "HARMLOSE HERAUSFORDERUNG", d: "Lass sie das Gericht nennen, auf das sie wettet", ok: 2, w: "Geht auch. Etwas direktere Energie." },
          { t: "KOMPLIMENT", d: "Sag ihr, das ist beeindruckend", ok: 0, w: "Warm. Zu. Weiter." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "„Unglaublich“ ist eine schwere Anschuldigung, wenn man sie aufschreibt", ok: 1 },
            { t: "Die Pasta sieht super aus", ok: 0 },
            { t: "Ich liebe Pasta auch", ok: 0 }
          ] },
          { label: "WENDUNG", o: [
            { t: "und ich fürchte, das muss überprüft werden", ok: 1 },
            { t: "du bist bestimmt eine super Köchin", ok: 0 },
            { t: "ich koche auch ganz gut", ok: 0 }
          ] },
          { label: "FADEN", o: [
            { t: "Nenn das Gericht, auf das du deinen Ruf setzt.", ok: 1 },
            { t: "Kochst du viel?", ok: 0 },
            { t: "Wir sollten mal zusammen kochen 😉", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "„Unglaublich“ ist eine schwere Anschuldigung, wenn man sie aufschreibt, und ich fürchte, das muss überprüft werden. Nenn das Gericht, auf das du deinen Ruf setzt.",
        why: "Scheinernst, und am Ende eine Frage, die sie gerne beantwortet. Sie darf prahlen — du hast die Erlaubnis gegeben." }
    },

    ll_board: {
      pack: "HINGE-KLASSIKER",
      sit: "„Ich bin bei Brettspielen unangenehm ehrgeizig.“",
      card: { photo: "Verwackeltes Foto eines Carcassonne-Bretts mitten im Streit. Zwei Hände im Bild, keine davon freundlich.",
        prompt: "Mit mir zu daten ist wie", line: "Lustig, bis die Brettspiele rauskommen." },
      steps: [
        { k: "angle", lvl: "123", q: "Vier Wege rein. Wähle einen.", o: [
          { t: "FRAGEN", d: "Welche Spiele?", ok: 0, w: "Du hast eine Drohung in eine Umfrage verwandelt." },
          { t: "ROLLENTAUSCH", d: "Behandle es als offiziell eingegangene Warnung", ok: 1, w: "Ja. Sie hat eine Warnung geschrieben — bearbeite sie wie eine." },
          { t: "KOMPLIMENT", d: "Ehrgeiz ist attraktiv", ok: 0, w: "Man hört die Augenbraue." },
          { t: "ABSURDE ESKALATION", d: "Überbiete ihre Behauptung", ok: 2, w: "Auch lebendig. Riskanter, lustiger, wenn sie anbeißt." }
        ] },
        { k: "npc", lvl: "12", q: "Welche Antwort stirbt in ihrem Postfach?", o: [
          { t: "Haha ich auch, was spielst du?", ok: 1, w: "Zwei tote Züge zum Preis von einem." },
          { t: "Zur Kenntnis genommen. Worauf trainiere ich hier genau?", ok: 0, w: "Das ist die gute." },
          { t: "Ich sage ehrlich: ich habe bei Carcassonne noch nie verloren und plane das auch nicht.", ok: 0, w: "Kühn. Und ein Faden." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "Du hast eine Wettkampfwarnung ausgesprochen", ok: 1 },
            { t: "Ich liebe Brettspiele", ok: 0 },
            { t: "Das ist so lustig", ok: 0 }
          ] },
          { label: "WENDUNG", o: [
            { t: "und wir haben uns noch nicht mal getroffen", ok: 1 },
            { t: "ich bin auch ehrgeizig", ok: 0 },
            { t: "was süß ist", ok: 0 }
          ] },
          { label: "FADEN", o: [
            { t: "worauf trainiere ich hier also genau?", ok: 1 },
            { t: "welche Spiele magst du?", ok: 0 },
            { t: "das werden wir noch sehen.", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "Du hast eine Wettkampfwarnung ausgesprochen, und wir haben uns noch nicht mal getroffen. Worauf trainiere ich hier also genau?",
        why: "Rollentausch: du hast ihren Witz ernst genommen und den nächsten Zug direkt zurückgegeben." }
    },

    ll_ski: {
      pack: "HINGE-KLASSIKER",
      sit: "Skifoto. Mitten am Hang. Stöcke in einem Winkel, den kein Lehrer abzeichnen würde.",
      card: { photo: "Bluebird-Tag, rote Jacke, ein Ski deutlich weiter vorne als der andere.",
        prompt: "Meine irrationale Angst", line: "Sessellifte. Was unpraktisch ist." },
      steps: [
        { k: "hook", lvl: "12", q: "In den zwei Dingen, die sie dir gegeben hat, sitzt ein Witz.", o: [
          { t: "Sie fährt viel Ski", ok: 0, w: "Ja. Das ist das Foto. Gut gemacht." },
          { t: "Sie hat Angst vor Sesselliften und fährt trotzdem ständig mit", ok: 1, w: "Der Widerspruch ist das Material. Immer." },
          { t: "Die Aussicht ist schön", ok: 0, w: "Du möchtest einem Berg ein Kompliment machen." },
          { t: "Sie ist sportlich", ok: 0, w: "Tapete." }
        ] },
        { k: "angle", lvl: "123", q: "Zug?", o: [
          { t: "KLEINE FIKTION", d: "Datiere das Foto acht Sekunden vor einem Zwischenfall", ok: 1, w: "Kleine erfundene Welt. Sie will sich verteidigen." },
          { t: "FRAGEN", d: "Wo fährst du normalerweise?", ok: 0, w: "Gratulation, ein Formular." },
          { t: "BEWUSSTE ÜBERGENAUIGKEIT", d: "Diagnostiziere genau, wie viel Angst sie hat", ok: 2, w: "Geht auch, und es ist ein richtiger Faden." },
          { t: "KOMPLIMENT", d: "Sie sieht toll aus in Skiklamotten", ok: 0, w: "Nein." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "Das wurde etwa acht Sekunden vor etwas Teurem aufgenommen", ok: 1 },
            { t: "Super Skifoto!", ok: 0 },
            { t: "Du siehst aus wie ein Profi", ok: 0 }
          ] },
          { label: "WENDUNG", o: [
            { t: "und hochgekommen bist du mit einem Sessellift, vor dem du offenbar Todesangst hast", ok: 1 },
            { t: "ich fahre auch gern Ski", ok: 0 },
            { t: "das war bestimmt ein schöner Urlaub", ok: 0 }
          ] },
          { label: "FADEN", o: [
            { t: "Bei welchem Teil hast du geschrien?", ok: 1 },
            { t: "Wo war das?", ok: 0 },
            { t: "Sieht super aus.", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "Das wurde etwa acht Sekunden vor etwas Teurem aufgenommen — und hochgekommen bist du mit einem Sessellift, vor dem du offenbar Todesangst hast. Bei welchem Teil hast du geschrien?",
        why: "Du hast beide Dinge benutzt, die sie dir gegeben hat, und daraus eine kleine Geschichte gemacht, in die sie einsteigen kann." }
    },

    ll_coffee: {
      pack: "HINGE-KLASSIKER",
      sit: "„Ich flippe aus für guten Kaffee.“ Mehr gibt es nicht.",
      card: { photo: "Latte Art von oben, in einem Café mit Sichtbackstein und ohne Karte.",
        prompt: "Meine kleinen Freuden", line: "Guter Kaffee. Ich bin da unerträglich." },
      steps: [
        { k: "npc", lvl: "12", q: "Eine davon schickt jeder.", o: [
          { t: "Ooh, was ist deine Kaffeebestellung?", ok: 1, w: "Ja. Barista-Smalltalk." },
          { t: "Wie unerträglich bist du beim Kaffee — Supermarkt-Cappuccino, oder besitzt du eine kleine Waage?", ok: 0, w: "Das ist die gute. Zwei Optionen, beide lustig, beide leicht." },
          { t: "Sie hat unerträglich gesagt, also lass sie das beweisen.", ok: 0, w: "Auch lebendig." }
        ] },
        { k: "angle", lvl: "123", q: "Zugang.", o: [
          { t: "BEWUSSTE ÜBERGENAUIGKEIT", d: "Gib ihr zwei extrem präzise Optionen", ok: 1, w: "Genauigkeit ist der ganze Trick. Mach die Wahl absurd und leicht." },
          { t: "FRAGEN", d: "Was ist dein Lieblingscafé?", ok: 0, w: "Das hätte Google auch fragen können." },
          { t: "KOMPLIMENT", d: "Guter Geschmack", ok: 0, w: "Lob ohne Tür drin." },
          { t: "SELBSTIRONIE", d: "Gib zu, dass du Pulverkaffee trinkst", ok: 2, w: "Ehrlich, lustig, gibt ihr einen Grund, entsetzt zu sein. Funktioniert." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "Du hast unerträglich gesagt, also brauche ich die genaue Stufe", ok: 1 },
            { t: "Ich liebe Kaffee auch", ok: 0 },
            { t: "Das sieht nach gutem Kaffee aus", ok: 0 }
          ] },
          { label: "WENDUNG", o: [
            { t: "Supermarkt-Cappuccino, oder besitzt du eine kleine Waage", ok: 1 },
            { t: "was ist deine Bestellung?", ok: 0 },
            { t: "ich bin ein großer Kaffeetyp", ok: 0 }
          ] },
          { label: "FADEN", o: [
            { t: "Sei ehrlich. Ich richte mein Verhalten danach.", ok: 1 },
            { t: "Wie war dein Tag?", ok: 0 },
            { t: "😄", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "Du hast unerträglich gesagt, also brauche ich die genaue Stufe: Supermarkt-Cappuccino, oder besitzt du eine kleine Waage? Sei ehrlich, ich richte mein Verhalten danach.",
        why: "Zwei absurd konkrete Optionen und ein ernstes Gesicht. Da kann niemand widerstehen." }
    },

    ll_travel: {
      pack: "REISEPROFIL",
      sit: "Fünf Länder, vier Cocktails, ein Wahrzeichen, null Kontext.",
      card: { photo: "Dachterrasse irgendwo im Warmen, Aperol zur goldenen Stunde, im Hintergrund arbeitet eine Kathedrale.",
        prompt: "Beste Reisegeschichte", line: "Zu lang für hier. Frag mich." },
      steps: [
        { k: "hook", lvl: "12", q: "Sie hat wörtlich zu etwas eingeladen. Zu was?", o: [
          { t: "Zu einer Frage über Reisen", ok: 0, w: "Zu breit. Sie antwortet wie ein Zollbeamter." },
          { t: "Zur Geschichte. Sie sagt, sie ist lang, und bittet dich zu fragen.", ok: 1, w: "Also frag richtig danach, nicht höflich." },
          { t: "Zu einem Kompliment über das Foto", ok: 0, w: "Nein." },
          { t: "Zu Empfehlungen", ok: 0, w: "Du hast dich zum Reisebüro gemacht." }
        ] },
        { k: "npc", lvl: "123", q: "Welche ist Tapete?", o: [
          { t: "Wow, wo war das?", ok: 1, w: "Die häufigste Nachricht Europas." },
          { t: "Das sieht aus wie der beste Urlaub deines Lebens oder der Anfang eines sehr teuren Fehlers.", ok: 0, w: "Lass die. Das ist die Zeile." },
          { t: "Du hast eine lange Geschichte angeteasert und bist dann gegangen. Ich möchte die unzensierte Fassung.", ok: 0, w: "Geht auch." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "Das sieht aus wie der beste Urlaub deines Lebens", ok: 1 },
            { t: "Wahnsinnsfoto!", ok: 0 },
            { t: "Ich reise auch gerne", ok: 0 }
          ] },
          { label: "WENDUNG", o: [
            { t: "oder wie der Anfang eines sehr teuren Fehlers", ok: 1 },
            { t: "du hast so ein Glück", ok: 0 },
            { t: "da war ich auch schon", ok: 0 }
          ] },
          { label: "FADEN", o: [
            { t: "Du hast gesagt, ich soll fragen, also: was von beidem?", ok: 1 },
            { t: "Wo war das?", ok: 0 },
            { t: "Sieht super aus.", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "Das sieht aus wie der beste Urlaub deines Lebens oder wie der Anfang eines sehr teuren Fehlers. Du hast gesagt, ich soll fragen, also: was von beidem?",
        why: "Du hast die Einladung angenommen, die sie tatsächlich geschrieben hat, und ihr zwei lustige Türen gegeben statt eines offenen Feldes." }
    },

    ll_gym: {
      pack: "GYM-ÄRA",
      sit: "Sie hat erwähnt, dass sie seit Januar dreimal pro Woche trainiert.",
      card: { photo: "Gym-Spiegelselfie, Handy deckt bewusst die halbe Gesichtshälfte ab, Magnesia an der Stange.",
        prompt: "Ein Lebensziel von mir", line: "Mein eigenes Körpergewicht heben. Fast." },
      steps: [
        { k: "heat", lvl: "123", q: "Gleiche Situation, drei Temperaturen. Welche landet?", o: [
          { t: "Schön, weiter so 💪", ok: 0, w: "Du hast geklungen wie eine Fitness-App-Benachrichtigung." },
          { t: "Von Januar bis jetzt ohne Pause ist der Teil, den fast keiner schafft. Wie fast ist fast?", ok: 1, w: "Warm, konkret, und es fragt. Richtige Temperatur." },
          { t: "Du siehst inzwischen bestimmt unfassbar aus", ok: 0, w: "Sie hat dir von Disziplin erzählt. Du hast ihren Körper bewertet." },
          { t: "Respekt. Was ist die Zahl, hinter der du her bist?", ok: 2, w: "Kühler, immer noch gut. Andere Energie." }
        ] },
        { k: "hook", lvl: "12", q: "Was ist hier benennbar?", o: [
          { t: "Ihre Ergebnisse", ok: 0, w: "Ihre Ergebnisse siehst du nicht. Ihren Kalender schon." },
          { t: "Dass sie acht Monate durchgezogen hat", ok: 1, w: "Verlässlichkeit. Der unsichtbare Teil. Benenne den." },
          { t: "Ihre Hingabe an Fitness allgemein", ok: 0, w: "Du hast ihr eine Leistungsbeurteilung geschrieben." },
          { t: "Dass sie gut aussieht", ok: 0, w: "Nein." }
        ] }
      ],
      reveal: { line: "Von Januar bis jetzt ohne Pause ist der Teil, den fast keiner schafft. Wie fast ist fast?",
        why: "Lobe die Serie, nicht den Körper, und schließe mit einer Frage. Sie nennt dir die Zahl, und sie meint sie ernst." }
    },

    ll_one_word: {
      pack: "TROCKENE TIPPERIN",
      sit: "BOSSKAMPF — DIE EINWORTANTWORTERIN. Deine letzten drei Nachrichten haben „haha“, „ja“, „lol“ bekommen.",
      card: { photo: "Chatverlauf: drei lange Nachrichten von dir, drei kurze von ihr.",
        prompt: "Aktueller Status", line: "haha" },
      steps: [
        { k: "hook", lvl: "12", q: "Was passiert hier eigentlich?", o: [
          { t: "Sie hat kein Interesse", ok: 0, w: "Vielleicht. Du weißt es nicht, und du bist kurz davor, so zu tun als ob." },
          { t: "Du trägst das ganze Gespräch und sie lässt dich", ok: 1, w: "Richtig. Also hör auf zu tragen." },
          { t: "Du hast etwas Falsches gesagt", ok: 0, w: "Das ist Angst, kein Beleg." },
          { t: "Sie hat viel zu tun", ok: 0, w: "Auch möglich. Auch nicht dein Problem, das für sie zu lösen." }
        ] },
        { k: "angle", lvl: "123", q: "Dein Zug. Vorsichtig.", o: [
          { t: "NOCH EINE FRAGE STELLEN", d: "Halte es am Leben", ok: 0, w: "Frage fünf. Sie beginnt zu ahnen, dass das der Zoll ist." },
          { t: "EIN LETZTER AUFSCHLAG, DANN AUFHÖREN", d: "Etwas Leichtes, dann liegen lassen", ok: 1, w: "Ein Aufschlag. Dann Hände weg vom Ball." },
          { t: "SAGEN, DASS DU ES MERKST", d: "„Alles ok? Fühlt sich an, als mache ich die ganze Arbeit“", ok: 0, w: "Du hast deine Angst in ihr Postfach gelegt und sie gebeten, sie abzulegen." },
          { t: "GAR NICHTS", d: "Handy weglegen", ok: 2, w: "Ernsthaft vertretbar. Langweilig zu spielen, im Leben richtig." }
        ] },
        { k: "build", lvl: "23", q: "Ein Aufschlag. Mach ihn billig zurückzuspielen.", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "Gut, ich versuche eine Sache", ok: 1 },
            { t: "Du bist still geworden", ok: 0 },
            { t: "Sorry, falls ich nerve", ok: 0 }
          ] },
          { label: "WENDUNG", o: [
            { t: "und wenn das scheitert, nehme ich das Urteil mit Würde an", ok: 1 },
            { t: "weil ich echt gern mit dir schreibe", ok: 0 },
            { t: "ich verspreche, danach bin ich still", ok: 0 }
          ] },
          { label: "FADEN", o: [
            { t: "Das Beste, was dir diese Woche passiert ist. Los.", ok: 1 },
            { t: "Wie war dein Tag?", ok: 0 },
            { t: "Bist du noch da?", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "Gut, ich versuche eine Sache, und wenn das scheitert, nehme ich das Urteil mit Würde an. Das Beste, was dir diese Woche passiert ist. Los.",
        why: "Leicht, kein Vorwurf, eine einfache Frage — und du hast ihr leise gesagt, dass du nicht betteln wirst. Wenn es stirbt, stirbt es." }
    },

    ll_interview: {
      pack: "HINGE-KLASSIKER",
      sit: "BOSSKAMPF — DAS VERHÖR. Du hast vier Fragen hintereinander gestellt. Sie antwortet wie eine Zeugin.",
      card: { photo: "Chatverlauf: vier Fragezeichen in einer Spalte, drei kurze Antworten.",
        prompt: "Ihre letzte Nachricht", line: "Berlin, ja. Seit etwa sechs Jahren." },
      steps: [
        { k: "hook", lvl: "12", q: "Warum stirbt das hier?", o: [
          { t: "Sie ist langweilig", ok: 0, w: "Du hast ihr vier Fragen aus dem Meldeamt gestellt. Schau nach innen." },
          { t: "Du entnimmst Informationen statt sie zu tauschen", ok: 1, w: "Ja. Nichts von dir ist in diesem Gespräch." },
          { t: "Falsche Fragen", ok: 0, w: "Teilweise. Das größere Problem ist die Richtung." },
          { t: "Schlechter Zeitpunkt", ok: 0, w: "Praktisch." }
        ] },
        { k: "angle", lvl: "123", q: "Fluchtweg.", o: [
          { t: "EINE BESSERE FRAGE STELLEN", d: "Etwas Interessanteres", ok: 0, w: "Immer noch Zoll. Schönere Uniform." },
          { t: "UNGEFRAGT ETWAS GEBEN", d: "Gib ihr ein Stück von dir zum Reagieren", ok: 1, w: "Tauschen, nicht entnehmen. Dann hat sie etwas in der Hand." },
          { t: "MEME SCHICKEN", d: "Medium wechseln", ok: 0, w: "Du hast die Stille gefüllt und ihr nichts gegeben." },
          { t: "BENENNEN UND ÜBER DICH LACHEN", d: "„Ich habe dich hier verhört“", ok: 2, w: "Geht auch, wenn danach wirklich etwas Echtes kommt." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "Ich habe dir vier Fragen hintereinander gestellt wie ein Grenzbeamter", ok: 1 },
            { t: "Was machst du sonst so?", ok: 0 },
            { t: "Sorry, ich rede zu viel", ok: 0 }
          ] },
          { label: "WENDUNG", o: [
            { t: "also hier etwas Ungefragtes: ich bin für einen Job hergezogen, den ich nach fünf Monaten hingeworfen habe", ok: 1 },
            { t: "ich wohne auch schon ewig in Berlin", ok: 0 },
            { t: "sechs Jahre sind ja auch lang", ok: 0 }
          ] },
          { label: "FADEN", o: [
            { t: "Du bist dran, mich anzuklagen.", ok: 1 },
            { t: "Was machst du beruflich?", ok: 0 },
            { t: "Schön.", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "Ich habe dir vier Fragen hintereinander gestellt wie ein Grenzbeamter, also hier etwas Ungefragtes: ich bin für einen Job hergezogen, den ich nach fünf Monaten hingeworfen habe. Du bist dran, mich anzuklagen.",
        why: "Gegenleistung. Du hast zuerst gegeben, es leicht unvorteilhaft gemacht, und die Übergabe ist spielerisch statt wieder eine Frage." }
    },

    ll_perfect: {
      pack: "HINGE-KLASSIKER",
      sit: "BOSSKAMPF — DAS PERFEKTE PROFIL. Gute Fotos, witzige Prompts, kein offensichtlicher Weg rein. Jeder Instinkt sagt dir: auftreten.",
      card: { photo: "Sechs Fotos, alle gut, keins bemüht. Ein Hund, ein Gipfel, ein Buch, ein Geburtstag, eine Küche, ein Lachen.",
        prompt: "Ändere meine Meinung über", line: "Camping. Mir wurde gesagt, ich liege falsch." },
      steps: [
        { k: "hook", lvl: "123", q: "Die Falle hier ist die Vorstellung. Also was tust du?", o: [
          { t: "Auf ihr Niveau gehen — beste Zeile, die du hast", ok: 0, w: "Sie riecht die Mühe durch den Bildschirm." },
          { t: "Eine kleine Sache nehmen und wie ein Mensch reden", ok: 1, w: "Ja. Ein Winkel. Kein Vorsprechen." },
          { t: "Zugeben, dass das Profil gut ist", ok: 0, w: "„Super Profil!“ Du bist jetzt Kritiker." },
          { t: "Mit dem stärksten Witz eröffnen", ok: 0, w: "Du eröffnest mit deinem Schlussgag. Klassiker." }
        ] },
        { k: "angle", lvl: "123", q: "Ein Winkel. Wähle.", o: [
          { t: "ABSURDE ESKALATION", d: "Nimm die Camping-Debatte viel zu ernst", ok: 1, w: "Sie wollte umgestimmt werden. Mach den Job mit ernstem Gesicht." },
          { t: "DAS PROFIL LOBEN", d: "Sag ihr, es ist das beste, das du gesehen hast", ok: 0, w: "Du hast sie bewertet, von unten." },
          { t: "ALLES ABFRAGEN", d: "Hund, Gipfel, Buch, alles", ok: 0, w: "Sechs Fragen. Sie beantwortet zwei und geht." },
          { t: "GERADE AUFRICHTIGKEIT", d: "Sag das Ehrliche einfach", ok: 2, w: "Auch richtig, und mutiger als es aussieht." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "Du möchtest beim Thema Camping umgestimmt werden", ok: 1 },
            { t: "Dein Profil ist echt das beste, das ich gesehen habe", ok: 0 },
            { t: "Hey, du wirkst super", ok: 0 }
          ] },
          { label: "WENDUNG", o: [
            { t: "also möchte ich hiermit formell argumentieren, dass Schlafen auf Steinen keinerlei Charakter bildet", ok: 1 },
            { t: "ich liebe Camping, das Beste überhaupt", ok: 0 },
            { t: "ich würde gern mit dir campen gehen", ok: 0 }
          ] },
          { label: "FADEN", o: [
            { t: "Nach wie vielen Nächten hast du es zugegeben?", ok: 1 },
            { t: "Campst du viel?", ok: 0 },
            { t: "Sag Bescheid 😄", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "Du möchtest beim Thema Camping umgestimmt werden, also möchte ich hiermit formell argumentieren, dass Schlafen auf Steinen keinerlei Charakter bildet. Nach wie vielen Nächten hast du es zugegeben?",
        why: "Du hast getan, worum sie gebeten hat, in einer Nummer, ohne vorzusprechen. So sieht es aus, wenn man nicht auftritt." }
    },

    ll_double: {
      pack: "TROCKENE TIPPERIN",
      sit: "BOSSKAMPF — DOPPELTEXT-PANIK. Sechs Stunden. Keine Antwort. Der Boss ist deine eigene Angst.",
      card: { photo: "Eine gesendete Nachricht. Gelesen um 14:02. Es ist jetzt 20:11.",
        prompt: "Deine Daumen", line: "..." },
      steps: [
        { k: "angle", lvl: "123", q: "Sechs Stunden. Wähle.", o: [
          { t: "??", ok: 0, w: "Zwei Zeichen reiner Druck." },
          { t: "„Bist wohl beschäftigt 😂“", ok: 0, w: "Passive Aggression mit Lachemoji-Hut." },
          { t: "Nichts. Handy weglegen.", ok: 1, w: "Sechs Stunden sind kein Signal. Das ist ein Nachmittag." },
          { t: "Ein Meme schicken, um es wieder aufzumachen", ok: 0, w: "Besser als „??“, aber immer noch deine Nerven in ihrem Postfach." }
        ] },
        { k: "hook", lvl: "12", q: "Wofür sind sechs Stunden ein Beleg?", o: [
          { t: "Sie hat das Interesse verloren", ok: 0, w: "Erfunden." },
          { t: "Für nichts. Es sind sechs Stunden.", ok: 1, w: "Richtig. Setz dich." },
          { t: "Du hast etwas Falsches gesagt", ok: 0, w: "Auch erfunden." },
          { t: "Du hättest etwas Besseres schicken sollen", ok: 0, w: "Die Zeile war gut. Das Warten ist die Fähigkeit." }
        ] }
      ],
      reveal: { line: "[nichts gesendet]",
        why: "Der Zug ist kein Zug. Sie antwortet heute Abend, oder morgen, oder nicht — und keines dieser Ergebnisse wird durch ein Fragezeichen besser." }
    },

    ll_callback: {
      pack: "HINGE-KLASSIKER",
      sit: "Vor zwei Tagen hat sie dich gewarnt, dass sie bei Brettspielen ehrgeizig ist. Jetzt fragt sie, was du so machst.",
      card: { photo: "Chatverlauf, zwei Tage auseinander. Die Warnung ist oben noch zu sehen.",
        prompt: "Ihre Nachricht", line: "Was machst du dieses Wochenende?" },
      steps: [
        { k: "hook", lvl: "12", q: "Was steht dir zur Verfügung, das keinem anderen zur Verfügung steht?", o: [
          { t: "Deine echten Wochenendpläne", ok: 0, w: "Zutreffend. Beige." },
          { t: "Alles, was sie dir schon erzählt hat", ok: 1, w: "Vor zwei Tagen hat sie dir eine Nummer gegeben. Benutz sie." },
          { t: "Eine Chance, ein Treffen vorzuschlagen", ok: 0, w: "Möglich, aber du hast das Geschenk übersprungen." },
          { t: "Ein Kompliment", ok: 0, w: "Immer dein Rückfall, oder?" }
        ] },
        { k: "angle", lvl: "123", q: "Zug.", o: [
          { t: "RÜCKGRIFF", d: "Hol die Brettspielwarnung zurück", ok: 1, w: "So klingt Flüssigkeit. Sie merkt es sofort." },
          { t: "GERADE ANTWORTEN", d: "Erzähl die Pläne", ok: 0, w: "Nichts falsch. Nichts merkbar." },
          { t: "NEUER WITZ", d: "Fang etwas Neues an", ok: 0, w: "Warum neu bauen, wenn sie dir ein Fundament gegeben hat?" },
          { t: "ZURÜCKFRAGEN", d: "„Und du?“", ok: 0, w: "Ein Wort Mühe und ein zurückgespielter Ball. Schwach." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "Hauptsächlich erhole ich mich von der Brettspielwarnung", ok: 1 },
            { t: "Nicht viel, und du?", ok: 0 },
            { t: "Nur Freunde treffen", ok: 0 }
          ] },
          { label: "WENDUNG", o: [
            { t: "die ich beschlossen habe als Vorbereitungstraining zu behandeln", ok: 1 },
            { t: "die hat mich zum Lachen gebracht", ok: 0 },
            { t: "du bist witzig", ok: 0 }
          ] },
          { label: "FADEN", o: [
            { t: "Was spielen wir, und wie hoch verliere ich?", ok: 1 },
            { t: "Und du?", ok: 0 },
            { t: "Also 😄", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "Hauptsächlich erhole ich mich von der Brettspielwarnung, die ich beschlossen habe als Vorbereitungstraining zu behandeln. Was spielen wir, und wie hoch verliere ich?",
        why: "Ein Rückgriff beweist, dass du vor zwei Tagen zugehört hast, und schmuggelt ein Date rein, ohne danach zu fragen." }
    },

    ll_pass_empty: {
      pack: "HINGE-KLASSIKER",
      sit: "Zwei Gruppenfotos, ein verwackelter Sonnenuntergang, Bio: „Frag einfach.“",
      card: { photo: "Drei Leute auf einer Hochzeit. Unklar, welche sie ist. Sonnenuntergang. Ein Auto.",
        prompt: "Über mich", line: "Frag einfach x" },
      steps: [
        { k: "hook", lvl: "123", q: "Du hast ANTWORTEN gedrückt. Gut. Was ist hier?", o: [
          { t: "Ehrlich gesagt nicht viel", ok: 1, w: "Richtig, und das darf man zugeben. Passen kostet dich nichts." },
          { t: "Die Hochzeit", ok: 0, w: "Wessen Hochzeit? Du siehst sie nicht." },
          { t: "Der Sonnenuntergang", ok: 0, w: "Du bist kurz davor, dem Wetter ein Kompliment zu machen." },
          { t: "Du könntest fragen, was sie mag", ok: 0, w: "In ihrer Bio stand „frag einfach“ und du hast beschlossen zu gehorchen." }
        ] }
      ],
      reveal: { line: "[gepasst]",
        why: "In drei Gruppenfotos versteckt sich keine kluge Zeile. Du schuldest nicht jedem Profil einen Witz — genau dieser Instinkt ist der Grund, warum Männer elf davon am Tag verschicken." }
    },

    ll_pass_dry: {
      pack: "TROCKENE TIPPERIN",
      sit: "Super Fotos. Jeder Prompt mit einem Wort beantwortet. „Sonntag: schlafen.“",
      card: { photo: "Vier ausgezeichnete Fotos, in keinem davon Kontext.",
        prompt: "Typischer Sonntag", line: "schlafen" },
      steps: [
        { k: "hook", lvl: "123", q: "Du hast ANTWORTEN gedrückt. Womit arbeitest du eigentlich?", o: [
          { t: "Ein Wort und vier Fotos", ok: 1, w: "Du kannst es versuchen. Nur: du lieferst dann beide Hälften des Gesprächs." },
          { t: "Eine Chance, der witzigste Mann in ihren Matches zu sein", ok: 0, w: "Ah. Das Vorsprechen." },
          { t: "Ihre Fotos", ok: 0, w: "Also ein Kommentar über ihr Aussehen. Kühn." },
          { t: "Eine gemeinsame Liebe zum Schlafen", ok: 0, w: "Du und jeder Mensch." }
        ] }
      ],
      reveal: { line: "[gepasst]",
        why: "Ein Profil, das dir ein Wort gibt, antwortet meist mit einem Wort. Passen ist keine Niederlage — es ist der ganze Sinn von Geschmack." }
    },

    // ── Markierte Profile ─────────────────────────────────────────────────────
    ll_trap_forever: {
      pack: "LIES DIE KARTE",
      sit: "Herzlich, freundlich, drei Ausrufezeichen. Irgendwas an der Zeitrechnung stimmt nicht.",
      card: { photo: "Sonniges Selfie, echtes Lächeln, eine Tasse mit der Aufschrift BESTE FREUNDIN.",
        prompt: "Meine Liebessprache ist", line: "Gemeinsame Zeit!! Also ALLE!! Mir wird gesagt, ich sei intensiv, aber ich kümmere mich einfach sehr 🥰" },
      flag: { kind: "trap", title: "Sie hat euren Kindern schon Namen gegeben.",
        tells: [
          "„ALLE“, in Großbuchstaben, und zwar deine Zeit.",
          "„Mir wird gesagt, ich sei intensiv“ — von wem, und von wie vielen.",
          "Die Tasse ist älter als du. Die hat jemand für jemanden gekauft."
        ],
        onRespond: "Du hast Hallo gesagt. Es ist 3 Uhr nachts und du erklärst per Videocall, wo du zwischen 19 und 21 Uhr warst.",
        onPass: "Du hast gemerkt, dass „intensiv“ in diesem Satz sehr viel Arbeit macht. Gut.",
        cta: "Rückzug" },
      steps: [],
      reveal: { line: "[nichts]", why: "Die Wärme ist nicht die Warnung. Die Menge ist es." }
    },
    ll_trap_snakes: {
      pack: "LIES DIE KARTE",
      sit: "Interessant, draußen unterwegs, ein Hobby, das sie leicht erwähnt und nicht erklärt.",
      card: { photo: "Lesen im Bett, warme Lampe, gemusterte Decke. Das Muster bewegt sich.",
        prompt: "Zwei Wahrheiten und eine Lüge", line: "Ich war nie in Rom · in meiner Wohnung leben 11 · ich hasse Camping" },
      flag: { kind: "trap", title: "Elf Bewohner. Sie wohnt allein.",
        tells: [
          "Elf Bewohner, ein Schlafzimmer, keine Mitbewohner erwähnt.",
          "„Ich hasse Camping“ ist die Lüge. Sie schläft wärmer als im Zelt — mit Gesellschaft.",
          "Diese Decke hat Schuppen."
        ],
        onRespond: "Das zweite Date ist bei ihr. Irgendwas ist offen. Sie sagt, das ist normal. Sie sagt, sie kommen immer zurück.",
        onPass: "Du hast gerechnet, bevor du geflirtet hast. Das ist die richtige Reihenfolge.",
        cta: "Rückzug" },
      steps: [],
      reveal: { line: "[nichts]", why: "Was jemand liebt, erzählt er dir. Was jemand besitzt, musst du zählen." }
    },
    ll_trap_ex: {
      pack: "LIES DIE KARTE",
      sit: "Scharf, witzig, offensichtlich klug. Jeder Witz hat dasselbe Ziel.",
      card: { photo: "Dachterrasse, Glas Rotwein, lacht über etwas außerhalb des Bildes.",
        prompt: "Schreib mir nicht, wenn", line: "du irgendwie wie Daniel bist. Oder Tom. Oder der andere Daniel. Ich erklär's beim Date, es ist wirklich lustig" },
      flag: { kind: "trap", title: "Du bewirbst dich für eine Rolle in einem Prozess.",
        tells: [
          "Drei Männer namentlich genannt, bevor du ein Wort gesagt hast.",
          "„Ich erklär's beim Date“ — das Date IST die Erklärung.",
          "„Es ist wirklich lustig“ sagen Leute, wenn es das nicht ist."
        ],
        onRespond: "Vier Stunden über Daniel. Beide Daniels. Dir wurde keine einzige Frage gestellt.",
        onPass: "Du hast gemerkt, dass das Profil von anderen Leuten handelt. Nichts darin war über sie.",
        cta: "Rückzug" },
      steps: [],
      reveal: { line: "[nichts]", why: "Ein Profil, das seine Vergangenheit verhandelt, erzählt dir den Plan für den Abend." }
    },
    ll_trap_project: {
      pack: "LIES DIE KARTE",
      sit: "Schöne Fotos. Freundliches Gesicht. Eine Zeile darüber, was sie sucht.",
      card: { photo: "Bauernmarkt, Leinen, hält Koriander wie einen Brautstrauß.",
        prompt: "Ich suche", line: "jemanden mit Potenzial. Ich sehe sehr gut, was aus Menschen werden könnte 💫" },
      flag: { kind: "trap", title: "Du bist das Projekt.",
        tells: [
          "„Potenzial“ ist kein Kompliment. Das ist ein Sanierungsangebot.",
          "„Was aus Menschen werden KÖNNTE“ — die Gegenwart fehlt komplett.",
          "Sie ist „sehr gut“ darin, also hat sie es schon oft gemacht."
        ],
        onRespond: "Monat drei. Deine Freunde sind falsch für dich, deine Jacke ist falsch für dich, und du bist fast fertig.",
        onPass: "Du hast gemerkt, dass in diesem Satz niemand so gemocht wird, wie er gerade ist.",
        cta: "Rückzug" },
      steps: [],
      reveal: { line: "[nichts]", why: "Gesehen werden und saniert werden fühlt sich etwa sechs Wochen lang identisch an." }
    },
    ll_trap_chaos: {
      pack: "LIES DIE KARTE",
      sit: "Lustig. Wirklich lustig. Und sechs Städte in vierzehn Monaten.",
      card: { photo: "Flughafenboden, drei Taschen, 2-Uhr-Energie, begeistert.",
        prompt: "Ein Fakt, den ich liebe", line: "Ich bin seit letztem Frühling 6 Mal umgezogen. Jedes Mal neuer Job! Irgendwann wird mir alles langweilig 🙃" },
      flag: { kind: "trap", title: "Du stehst auf der Liste der Dinge.",
        tells: [
          "Sechs Umzüge, sechs Jobs, vierzehn Monate.",
          "„Irgendwann wird mir ALLES langweilig.“ Sie hat dir das Ende erzählt.",
          "Das umgedrehte Lächeln macht die Entschuldigung."
        ],
        onRespond: "Elf Wochen. Dann eine sehr freundliche Nachricht darüber, dass sie gerade nicht in der Lage ist, ein Mensch zu sein.",
        onPass: "Sie hat das Ende ins Profil geschrieben und du hast es gelesen. Mehr braucht es nie.",
        cta: "Rückzug" },
      steps: [],
      reveal: { line: "[nichts]", why: "Menschen verstecken das Muster selten. Sie führen es als lustigen Fakt." }
    },

    ll_gem_goth: {
      pack: "VERSTECKTES JUWEL",
      sit: "Schwarz auf schwarz, kein Lächeln, ein Foto. Die meisten Männer wischen aus Prinzip weiter.",
      card: { photo: "Türrahmen, alles schwarz, gerader Pony, ausdruckslos. In der Hand ein Bibliotheksausweis.",
        prompt: "So gewinnst du mich", line: "korrekte Verwendung eines Semikolons. Ich leite einen Buchclub. Er hat zwei Regeln und eine davon ist Pünktlichkeit" },
      flag: { kind: "gem", title: "Freak in the sheets.",
        tells: [
          "Sie leitet etwas. Organisiert, und sagt es dir ohne Umschweife.",
          "Zwei Regeln, eine über Pünktlichkeit — sie hat Standards und findet sie selbst komisch.",
          "„Korrekte Verwendung eines Semikolons“ ist eine Einladung, und eine niedrige Hürde."
        ],
        onRespond: "Richtig. Ausdruckslos ist nicht kalt, sondern ein Filter — und du bist gerade durch.",
        onPass: "Du bist an der interessantesten Person im Stapel vorbeigewischt, weil sie nicht gelächelt hat.",
        cta: "Los, Soldat" },
      steps: [
        { k: "hook", lvl: "123", q: "Eine Zeile. Worauf gehst du tatsächlich?", o: [
          { t: "Auf die andere Regel des Buchclubs", ok: 2, v: "sharp", w: "Sie hat absichtlich eine Lücke gelassen. Du bist reingegriffen." },
          { t: "Auf das Semikolon", ok: 1, v: "saw", w: "Gut, und etwa elf Männer versuchen das." },
          { t: "Auf ihr Outfit", ok: 0, v: "npc", w: "Du hast die Optik besprochen. Kennt sie." },
          { t: "Fragen, was sie liest", ok: 0, v: "interview", w: "Frage eins eines Zollformulars." }
        ] }
      ],
      reveal: { line: "Was ist die zweite Regel, und wie viele wurden deswegen schon rausgeworfen?",
        why: "Du hast die bewusste Lücke genommen und ihr eine Geschichte zum Erzählen gegeben." }
    },
    ll_gem_admin: {
      pack: "VERSTECKTES JUWEL",
      sit: "Beige. Wirklich beige. Drei Fotos auf Hochzeiten, die nicht ihre sind.",
      card: { photo: "Hochzeitsgast, vernünftiges Kleid, zwei Getränke in den Händen, blickt direkt in die Linse.",
        prompt: "Meine umstrittenste Meinung", line: "das Buffet ist der einzige Teil einer Hochzeit, der zählt, und ich werde es bewerten" },
      flag: { kind: "gem", title: "Freak in the sheets.",
        tells: [
          "„Ich werde es bewerten“ — Gegenwart, absolut ernst, komplett ein Witz.",
          "Zwei Getränke. Eins ist nicht ihres, oder beide sind es.",
          "Beige Kleidung, unbeiger Satz. Lies den Satz."
        ],
        onRespond: "Richtig. Langweilige Fotos, dreckiger Humor. Die Fotos sind die Tarnung.",
        onPass: "Du hast vier Fotos bewertet und die einzige Zeile im Stapel mit einer Pointe übersprungen.",
        cta: "Los, Soldat" },
      steps: [
        { k: "hook", lvl: "123", q: "Sie hat dir eine Nummer hingelegt. Was machst du damit?", o: [
          { t: "Nach ihrer niedrigsten Buffetnote fragen", ok: 2, v: "sharp", w: "Du hast die Bewertung ernst genommen, und genau das ist der Witz." },
          { t: "Zustimmen, dass Buffets zählen", ok: 1, v: "closed", w: "Zustimmung ohne Eskalation. Sie wartet noch." },
          { t: "Sagen, dass du Hochzeiten liebst", ok: 0, v: "npc", w: "Niemand liebt Hochzeiten." },
          { t: "Das Kleid loben", ok: 0, v: "target", w: "Da war ein Witz, und du hast den Stoff gelobt." }
        ] }
      ],
      reveal: { line: "Niedrigste Note, die du je vergeben hast, und was haben die dafür getan?",
        why: "Du hast ihre Nummer ernst genommen. Das ist der ganze Trick bei trockenen Menschen." }
    },
    ll_gem_quiet: {
      pack: "VERSTECKTES JUWEL",
      sit: "Zwei Fotos, praktisch keine Bio, eine Antwort geschrieben wie eine Nachricht, die sie fast gelöscht hätte.",
      card: { photo: "Küche, Morgenlicht, hält ein sehr großes und leicht absurdes Messer.",
        prompt: "Ich bin seltsam gut in", line: "einzuschätzen, wie lange irgendwas dauert. Frag mich. Ich liege nie falsch und es nervt alle" },
      flag: { kind: "gem", title: "Freak in the sheets.",
        tells: [
          "„Frag mich“ — sie hat dir deine Eröffnung geschrieben und auf den Tisch gelegt.",
          "„Es nervt alle“: sie weiß, dass sie viel ist, und entschuldigt sich nicht.",
          "Das ist ein Profimesser. Den Job hat sie nicht erwähnt."
        ],
        onRespond: "Richtig. Leises Profil, extrem laute Person. Die Bio war lieblos, weil sie nicht deswegen hier ist.",
        onPass: "Sie hat zwei Fotos und eine Anweisung geschrieben. Die Anweisung war FRAG MICH.",
        cta: "Los, Soldat" },
      steps: [
        { k: "hook", lvl: "123", q: "Sie sagt, du sollst fragen. Was fragst du?", o: [
          { t: "Wie lange dieses Gespräch dauert", ok: 2, v: "sharp", w: "Du hast ihr eigenes Geschenk auf sie angewendet. Unschlagbar." },
          { t: "Wie lange ein Braten braucht", ok: 1, v: "thread", w: "Folgt der Anweisung. Etwas wörtlich." },
          { t: "Was sie beruflich macht", ok: 0, v: "interview", w: "Das Messer hat es dir gesagt. Du hast trotzdem gefragt." },
          { t: "Nichts, die Küche loben", ok: 0, v: "npc", w: "Sie gab dir eine Anweisung und du hast die Fliesen bewundert." }
        ] }
      ],
      reveal: { line: "Wie lange dauert dieses Gespräch, und liegst du bei sowas mal falsch?",
        why: "Du hast ihren Partytrick auf die Party angewendet. Sie muss antworten, und sie will es." }
    },

    // ── Zweite Tranche ────────────────────────────────────────────────────────
    ll_marathon: {
      pack: "SECHS MONATE TRAINING",
      sit: "Sie hat gerade ein Ziellinienfoto gepostet. Jede Antwort bisher ist das Wort „Gratulation“.",
      card: { photo: "Ziellinie, Rettungsdecke, absolut zerstört und begeistert.",
        prompt: "Ich bin gerade besessen von", line: "der Tatsache, dass ich 42 km gelaufen bin und am Ende nur an ein bestimmtes Sandwich gedacht habe" },
      steps: [
        { k: "hook", lvl: "12", q: "Elf Männer haben Gratulation geschrieben. Was steht wirklich in dem Satz?", o: [
          { t: "Das Sandwich", ok: 2, v: "sharp", w: "Sie hat den Witz ans Ende gelegt und du hast ihn ausgegraben." },
          { t: "Die 42 km", ok: 1, v: "npc", w: "Dazu gratulieren alle. Es ist auch der langweilige Teil." },
          { t: "Wie fit sie sein muss", ok: 0, v: "target", w: "Sie hat einen Witz gemacht und du hast ihren Körper bewertet." },
          { t: "Nach ihrer Zielzeit fragen", ok: 0, v: "interview", w: "Du hast einen Witz in ein Formular verwandelt." }
        ] }
      ],
      reveal: { line: "Nenn das Sandwich. Wenn es keine 42 km wert ist, bin ich sehr enttäuscht von dir.",
        why: "Die Leistung war der Aufbau. Das Sandwich war die Pointe, und du warst der Einzige, der zugehört hat." }
    },
    ll_bad_photo: {
      pack: "SIE WEISS ES",
      sit: "Vier gute Fotos und ein wirklich schlechtes, das sie offensichtlich absichtlich drin gelassen hat.",
      card: { photo: "Verwackelt, mitten im Niesen, Augen zu, hält ohne erkennbaren Grund einen Verkehrshütchen.",
        prompt: "Warum dieses Foto", line: "meine Freunde haben abgestimmt, es zu behalten. Ich habe aufgehört zu kämpfen" },
      steps: [
        { k: "hook", lvl: "123", q: "Sie hat das aufgebaut. Was ist der Zug?", o: [
          { t: "Sich auf die Seite der Freunde stellen", ok: 2, v: "spicy", w: "Du bist der Nummer gegen sie beigetreten, und genau das war die Einladung." },
          { t: "Sagen, es ist ein großartiges Foto", ok: 1, v: "closed", w: "Freundlich. Und beendet es." },
          { t: "Nach dem Verkehrshütchen fragen", ok: 1, v: "thread", w: "Legitim. Etwas die offensichtliche Tür." },
          { t: "Sagen, auf den anderen sieht sie besser aus", ok: 0, v: "target", w: "Du hast fünf Fotos laut bewertet." }
        ] }
      ],
      reveal: { line: "Deine Freunde haben recht und du solltest aufhören zu kämpfen. Was ist aber die Geschichte mit dem Hütchen.",
        why: "Stell dich gegen sie auf ihre Seite und lass danach die Tür offen. Zwei Züge, eine Zeile." }
    },
    ll_two_days: {
      pack: "SIE IST ZURÜCK",
      sit: "Zwei Tage Funkstille nach einem guten Austausch. Dann ein Foto von einem katastrophal geparkten Auto, ohne Text.",
      card: { photo: "Ein Kleinwagen quer über zwei Parkbuchten und ein Stück Bordstein.",
        prompt: null, line: "[kein Text — nur das Foto]" },
      steps: [
        { k: "hook", lvl: "123", q: "Kein Text. Was macht sie hier eigentlich?", o: [
          { t: "Sie führt einen Witz von vor zwei Tagen weiter", ok: 2, v: "callback", w: "Richtig. Das würde sie nie kalt schicken. Geh zurück und finde ihn." },
          { t: "Sie testet, ob du noch da bist", ok: 1, v: "saw", w: "Auch wahr. Aber es gibt einen konkreten Bezug zu fangen." },
          { t: "Sie fragt nach Parkplätzen", ok: 0, v: "dead", w: "Sie fragt nicht nach Parkplätzen." },
          { t: "Nichts, ihr ist langweilig", ok: 0, v: "npc", w: "Wem langweilig ist, der schickt nichts, nicht das." }
        ] }
      ],
      reveal: { line: "Du suchst dieses Auto seit zwei Tagen, oder?",
        why: "Ein Foto ohne Text ist immer ein Rückgriff. Antworte auf den Bezug, nicht auf das Bild." }
    },
    ll_overshare: {
      pack: "ZU VIEL, ZU FRÜH",
      sit: "Nachricht vier, und sie hat dir gerade etwas ziemlich Schweres über ihr Jahr erzählt.",
      card: { photo: null, prompt: "Ihre Nachricht", line: "sorry, das war viel für einen Dienstag. anyway. wie war DEINE woche 😅" },
      steps: [
        { k: "hook", lvl: "123", q: "Sie entschuldigt sich und reicht dir einen Ausgang. Nimmst du ihn?", o: [
          { t: "Den Ausgang ablehnen, kurz", ok: 2, v: "seen", w: "Ein Satz, der sagt, es war nicht zu viel, dann weiter. Keine Therapiesitzung." },
          { t: "Den Ausgang nehmen und über deine Woche reden", ok: 1, v: "fine", w: "Sicher. Sie merkt, dass du die Tür genommen hast." },
          { t: "Mit etwas Schwererem kontern", ok: 0, v: "sauce", w: "Jetzt ist es ein Wettbewerb und die gewinnt keiner." },
          { t: "Ihr sagen, dass sie so stark ist", ok: 0, v: "hallmark", w: "Direkt vom Kühlschrankmagneten." }
        ] }
      ],
      reveal: { line: "Es war nicht viel, und du musst das 😅 nicht machen. Meine Woche war hauptsächlich ein Streit mit einem Drucker.",
        why: "Lehne die Entschuldigung in einem halben Satz ab und mach es dann selbst leichter. Das ist Dosierung." }
    },
    ll_voice_note: {
      pack: "SIE HAT AUDIO GESCHICKT",
      sit: "Eine Sprachnachricht, 14 Sekunden. Sie lacht darin. Jetzt musst du entscheiden, was du bist.",
      card: { photo: null, prompt: "Ihre Sprachnachricht", line: "[14s — sie ist im Bus, erklärt sehr schlecht, warum sie zu spät ist, und verliert es auf der Hälfte]" },
      steps: [
        { k: "hook", lvl: "123", q: "Sie hat das Medium eskaliert. Und jetzt?", o: [
          { t: "Eine zurückschicken, schlechter", ok: 2, v: "pulse", w: "Eskalation annehmen und absichtlich verlieren. Das ist das Spiel." },
          { t: "Etwas Witziges zurückschreiben", ok: 1, v: "fine", w: "Gut, aber du bist eine Stufe runtergegangen und sie merkt es." },
          { t: "„haha das war super“ schreiben", ok: 0, v: "flat", w: "Eine Quittung für eine Sprachnachricht." },
          { t: "Anmerken, dass man sie schlecht versteht", ok: 0, v: "cold", w: "Technisches Feedback auf ein Geschenk." }
        ] }
      ],
      reveal: { line: "[Sprachnachricht] — gleiche Länge, schlechtere Geschichte, hörbar schlechterer Bus",
        why: "Wer das Medium anhebt, bittet dich, es auch anzuheben. Zahl in derselben Währung." }
    },
    ll_group_photo: {
      pack: "WELCHE IST SIE",
      sit: "Jedes Foto ist ein Gruppenfoto. Du weißt wirklich nicht, welche sie ist.",
      card: { photo: "Sechs Leute auf einem Hügel, alle in identischen Regenjacken, Gesichter größtenteils Kapuze.",
        prompt: "Geh nicht mit mir aus, wenn", line: "du mich erkennen musst. Kann keiner. Ist ein ganzes Thema" },
      steps: [
        { k: "hook", lvl: "123", q: "Sie hat den Witz vorweggenommen. Also mach ihn nicht. Was stattdessen?", o: [
          { t: "Selbstbewusst raten und dabei bleiben", ok: 2, v: "spicy", w: "Falsche Antwort, richtige Energie. Sie MUSS dich korrigieren, und das ist eine Antwort." },
          { t: "Sagen, dass du es nicht erkennst", ok: 0, v: "npc", w: "Das ist der Witz, den sie schon gemacht hat. Du bist Zweiter." },
          { t: "Fragen, welche sie ist", ok: 1, v: "fine", w: "Vernünftig. Null Risiko, null Rendite." },
          { t: "Die Gruppe loben", ok: 0, v: "dead", w: "Du hast fünf Fremden und einem Hügel ein Kompliment gemacht." }
        ] }
      ],
      reveal: { line: "Dritte von links, und ich möchte festhalten, dass ich das beim ersten Versuch hatte.",
        why: "Wenn jemand einen Witz vorwegnimmt, erzähl ihn nicht — mach das, wovor der Witz die Person schützen sollte." }
    },
    ll_one_line: {
      pack: "NICHTS ZUM ARBEITEN",
      sit: "Leere Bio. Ein Foto. Eine Antwort, drei Wörter lang.",
      card: { photo: "Im Türrahmen, mitten im Schulterzucken, völlig neutraler Ausdruck.",
        prompt: "Meine kleinen Freuden", line: "früher gehen" },
      steps: [
        { k: "hook", lvl: "123", q: "Zwei Wörter. Ist da irgendwas drin?", o: [
          { t: "Ja — das ist ein Geständnis, behandle es so", ok: 2, v: "sharp", w: "Beide Wörter arbeiten. Die meisten sehen eine Leerstelle." },
          { t: "Fragen, was sie meint", ok: 1, v: "thread", w: "Öffnet es. Gibt ihr die Arbeit etwas zurück." },
          { t: "Nichts da, nach dem Foto fragen", ok: 0, v: "npc", w: "Da war reichlich." },
          { t: "Sagen, du gehst auch gern früher", ok: 0, v: "flat", w: "Zwei Menschen, die sich über Türen einig sind." }
        ] }
      ],
      reveal: { line: "Früher gehen ist das Ehrlichste, was hier jemand geschrieben hat. Was war das Früheste, das du je verlassen hast?",
        why: "Eine kurze Antwort ist keine leere. Zwei sorgfältig gewählte Wörter schlagen einen Absatz." }
    },
    ll_she_asked: {
      pack: "SIE HAT ZUERST GEFRAGT",
      sit: "Sie hat eröffnet. Es ist eine gute Eröffnung, und sie handelt von etwas, das du tatsächlich geschrieben hast.",
      card: { photo: null, prompt: "Ihre Eröffnung", line: "ok erklär mir die „strukturell optimistische“ Wohnung, ich denke seit Dienstag darüber nach" },
      steps: [
        { k: "hook", lvl: "123", q: "Sie denkt seit Dienstag darüber nach. Was sagt dir das?", o: [
          { t: "Richtig antworten und ihr den nächsten Haken geben", ok: 2, v: "sharp", w: "Sie hat drei Tage investiert. Zahl voll zurück und lass ihr dann etwas." },
          { t: "Die Frage beantworten", ok: 1, v: "closed", w: "Vollständig. Und ein Punkt." },
          { t: "Witzig ausweichen", ok: 0, v: "tryhard", w: "Sie hat echt gefragt. Ausweichen heißt wegwerfen." },
          { t: "„haha lange Geschichte“", ok: 0, v: "dead", w: "Du hast ein Geschenk abgelehnt, schriftlich." }
        ] }
      ],
      reveal: { line: "Der Boden hängt so schräg, dass ich alles Runde in einer Ecke lagere. Drei Tage über meine Wohnung nachzudenken ist mehr Einsatz als mein Vermieter je gezeigt hat.",
        why: "Antworte vollständig und gib dann etwas zurück, das sie aufheben kann. Nie mit einem Punkt enden, wenn sie sich vorgelehnt hat." }
    }
  };


  // ── Words of Affirmation ──────────────────────────────────────────────────
  // Same rule as the Lover cards: keep the structure, change only the words.
  // German praise is plainer than English praise — "schön" and "toll" are the
  // potato here, and the whole skill is trading them for one observed detail.
  var waScenarios = {

    wa_gym: {
      sit: "Sie geht seit zwei Monaten dreimal pro Woche morgens ins Gym.",
      steps: [
        { k: "notice", lvl: "123", q: "Was ist hier eigentlich bemerkenswert?", o: [
          { t: "Sie sieht besser aus", ok: 0, v: "target", w: "Du hast das Ergebnis bewertet. Die Arbeit hat sie gemacht." },
          { t: "Sie ist zwei Monate dabeigeblieben", ok: 1, v: "seen", w: "Das ist der unsichtbare Teil, und der schwere." },
          { t: "Sie mag das Gym", ok: 0, v: "dead", w: "Tut sie nicht besonders. Genau das macht es beeindruckend." },
          { t: "Sie ist von Natur aus sportlich", ok: 0, v: "target", w: "Du hast ihr gerade gesagt, es war umsonst." }
        ] },
        { k: "name", lvl: "123", q: "Benenne die Eigenschaft darunter.", o: [
          { t: "VERLÄSSLICHKEIT", ok: 1, v: "seen", w: "Ja. Zwei Monate unglamouröse Morgen." },
          { t: "DISZIPLIN", ok: 2, v: "also", w: "Naher Verwandter. Im Mund etwas kälter." },
          { t: "AMBITION", ok: 0, v: "linkedin", w: "Du hast aus ihrem Gymbesuch einen Karriereplan gemacht." },
          { t: "KÖNNEN", ok: 0, v: "fine", w: "Falsche Schublade. Hier prüft keiner ihre Fähigkeit." }
        ] },
        { k: "pick", lvl: "12", q: "Welche davon landet wirklich?", o: [
          { t: "Du siehst fantastisch aus.", ok: 0, v: "target", w: "Freundlich. Komplett aufs Falsche gezielt." },
          { t: "Gut gemacht, weiter so!", ok: 0, v: "potato", w: "Du hast erfolgreich Ermutigung im Allgemeinen mitgeteilt." },
          { t: "Zwei Monate, und du tauchst immer noch auf. Das ist der Teil, den die meisten nicht schaffen.", ok: 1, v: "beautiful", w: "Konkret, wahr, und es geht um ihre Entscheidungen." },
          { t: "Du bist jetzt offiziell ein Gym-Girl.", ok: 0, v: "fine", w: "Ein Etikett, kein Kompliment." }
        ] },
        { k: "impact", lvl: "23", q: "Und jetzt der Teil, den Männer überspringen: was hat es mit dir gemacht?", o: [
          { t: "Ehrlich, es bringt mich dazu, weniger faul sein zu wollen.", ok: 1, v: "beautiful", w: "Wirkung, und es kostet dich etwas. Gut." },
          { t: "Ich bin stolz auf dich.", ok: 2, v: "also", w: "Passt. Etwas elterlich, wenn es alles ist, was du hast." },
          { t: "Das ist beeindruckend.", ok: 0, v: "closed", w: "Ein Urteil. Mit einem Urteil kann sie nichts machen." },
          { t: "Deine Resilienz auf dieser Reise war wirklich—", ok: 0, v: "linkedin", w: "Hör auf." }
        ] },
        { k: "build", lvl: "23", q: "Sag es. Beobachtung, Eigenschaft, Wirkung.", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "Zwei Monate 6 Uhr morgens und du gehst immer noch", ok: 1 },
            { t: "Du siehst zurzeit super aus", ok: 0 },
            { t: "Gut gemacht mit dem Gym", ok: 0 }
          ] },
          { label: "EIGENSCHAFT", o: [
            { t: "und das ist der Teil, den die meisten leise sein lassen", ok: 1 },
            { t: "du bist so disziplinärt", ok: 0 },
            { t: "du bist eben sportlich", ok: 0 }
          ] },
          { label: "WIRKUNG", o: [
            { t: "und es bringt mich leise dazu, mich auch mal zu sortieren", ok: 1 },
            { t: "weiter so!", ok: 0 },
            { t: "Ich bin stolz auf dich.", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "Zwei Monate 6 Uhr morgens und du gehst immer noch — und das ist der Teil, den die meisten leise sein lassen. Es bringt mich leise dazu, mich auch mal zu sortieren.",
        why: "Du hast die Verlässlichkeit benannt, nicht den Körper, und ihr gesagt, was es mit dir gemacht hat. Diese zweite Hälfte ist der Grund, warum es ankommt." }
    },

    wa_meeting: {
      sit: "Sie hat dir um 8 Uhr geschrieben und dir Glück für das Meeting gewünscht, das du letzte Woche erwähnt hast.",
      steps: [
        { k: "notice", lvl: "123", q: "Was ist bemerkenswert?", o: [
          { t: "Sie hat ein gutes Gedächtnis", ok: 0, v: "fine", w: "Fast. Gedächtnis ist nicht der Punkt — es zu benutzen schon." },
          { t: "Sie hat sich eine Kleinigkeit gemerkt, die dir wichtig war", ok: 1, v: "seen", w: "Genau. Klein, absichtlich, leicht zu übergehen." },
          { t: "Sie hat früh geschrieben", ok: 0, v: "dead", w: "Zeitmanagement." },
          { t: "Sie mag dich", ok: 0, v: "fine", w: "Wahr und völlig unkonkret." }
        ] },
        { k: "name", lvl: "123", q: "Die Eigenschaft?", o: [
          { t: "ACHTSAMKEIT", ok: 1, v: "seen", w: "Ja. Aufmerksamkeit, absichtlich ausgegeben." },
          { t: "FREUNDLICHKEIT", ok: 2, v: "also", w: "Auch wahr. Etwas breiter." },
          { t: "VERLÄSSLICHKEIT", ok: 0, v: "fine", w: "Anderes Wort. Sie hat keine Pflicht erfüllt." },
          { t: "GROßZÜGIGKEIT", ok: 0, v: "fine", w: "Hier wurde nichts verschenkt außer Aufmerksamkeit." }
        ] },
        { k: "pick", lvl: "12", q: "Welche Version fühlt sie?", o: [
          { t: "Danke! 🙏", ok: 0, v: "potato", w: "Du hast den Eingang bestätigt." },
          { t: "Das ist so süß von dir.", ok: 0, v: "fine", w: "Nichts falsch. Auch das, was du einem Kollegen sagst." },
          { t: "Ich habe das einmal erwähnt, letzte Woche. Du hast es dir gemerkt. Das hat meinen Morgen gemacht.", ok: 1, v: "beautiful", w: "Konkret, und es benennt die Wirkung." },
          { t: "Deine emotionale Aufmerksamkeit ist wirklich bemerkenswert.", ok: 0, v: "hallmark", w: "So hat noch nie jemand gesprochen, der nicht bedruckt war." }
        ] },
        { k: "impact", lvl: "23", q: "Was hat es gemacht?", o: [
          { t: "Ich habe mich richtig versorgt gefühlt.", ok: 1, v: "beautiful", w: "Einfache Worte, echtes Gefühl. Das ist das Ziel." },
          { t: "Das war nett.", ok: 0, v: "potato", w: "Nett. Das vergesslichste Wort der Sprache." },
          { t: "Es hat mich runtergebracht, bevor ich reingegangen bin.", ok: 2, v: "also", w: "Auch ausgezeichnet — konkret, was sogar besser ist." },
          { t: "Du bist die Beste.", ok: 0, v: "fine", w: "Eine Trophäe, kein Satz." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "Ich habe das Meeting einmal im Vorbeigehen erwähnt", ok: 1 },
            { t: "Danke für die Nachricht", ok: 0 },
            { t: "Du bist so lieb", ok: 0 }
          ] },
          { label: "EIGENSCHAFT", o: [
            { t: "und du warst die Einzige, die sich daran erinnert hat", ok: 1 },
            { t: "du bist sehr aufmerksam", ok: 0 },
            { t: "du hast ein super Gedächtnis", ok: 0 }
          ] },
          { label: "WIRKUNG", o: [
            { t: "Ich habe mich heute Morgen richtig versorgt gefühlt.", ok: 1 },
            { t: "Also danke!", ok: 0 },
            { t: "Du bist die Beste 😊", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "Ich habe das Meeting einmal im Vorbeigehen erwähnt, und du warst die Einzige, die sich daran erinnert hat. Ich habe mich heute Morgen richtig versorgt gefühlt.",
        why: "Kleine Sache, genau benannt, plus was sie mit dir gemacht hat. Sie merkt, dass du auch aufgepasst hast." }
    },

    wa_potato: {
      sit: "RETTE DIE KARTOFFEL. Sie hat dir gerade gezeigt, woran sie drei Wochen gearbeitet hat. Du hast gesagt: „schön“.",
      steps: [
        { k: "potato", lvl: "123", q: "Die Kartoffel hat gesprochen. Verbessere sie.", o: [
          { t: "Schön, gut gemacht!", ok: 0, v: "potato", w: "Du hast ein Adverb hinzugefügt. Die Kartoffel bleibt eine Kartoffel." },
          { t: "Drei Wochen Abende, und es funktioniert wirklich. Ich hätte in Woche eins aufgegeben.", ok: 1, v: "beautiful", w: "Konkret, bewundernd, leicht selbstironisch. Gut." },
          { t: "Das ist unglaublich, du bist so talentiert!!", ok: 0, v: "much", w: "Lautstärke ist keine Genauigkeit." },
          { t: "Ich bin wirklich stolz auf dich dafür.", ok: 2, v: "also", w: "Wärmer als schön. Immer noch kein Detail drin." }
        ] },
        { k: "notice", lvl: "12", q: "Was hättest du daran tatsächlich sehen können?", o: [
          { t: "Dass es gut aussieht", ok: 0, v: "potato", w: "Zurück zur Kartoffel." },
          { t: "Den konkreten schweren Teil, den sie gelöst hat", ok: 1, v: "seen", w: "Ja. Finde die schwierige Stelle und benenne sie." },
          { t: "Dass sie talentiert ist", ok: 0, v: "hallmark", w: "Du hast ihr ein Etikett gegeben statt eines Spiegels." },
          { t: "Dass sie hart gearbeitet hat", ok: 0, v: "fine", w: "Näher, immer noch vage. Welcher Teil war schwer?" }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "Du sitzt seit drei Wochen daran", ok: 1 },
            { t: "Das ist echt schön", ok: 0 },
            { t: "Wow!", ok: 0 }
          ] },
          { label: "EIGENSCHAFT", o: [
            { t: "und die fummelige Stelle in der Mitte ist die, bei der du nicht getrickst hast", ok: 1 },
            { t: "du bist so talentiert", ok: 0 },
            { t: "du bist unglaublich gut darin", ok: 0 }
          ] },
          { label: "WIRKUNG", o: [
            { t: "Ich hätte am zweiten Tag die Abkürzung genommen.", ok: 1 },
            { t: "Gut gemacht!!", ok: 0 },
            { t: "So stolz 🥰", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "Du sitzt seit drei Wochen daran, und die fummelige Stelle in der Mitte ist die, bei der du nicht getrickst hast. Ich hätte am zweiten Tag die Abkürzung genommen.",
        why: "Ein Detail schlägt drei Adjektive. Den schweren Teil zu benennen beweist, dass du hingeschaut hast." }
    },

    wa_promo: {
      sit: "FALSCHES ZIEL. Sie wurde befördert. Sie erzählt es dir beim Abendessen, noch in Arbeitskleidung.",
      steps: [
        { k: "target", lvl: "123", q: "Vier Dinge, die du loben könntest. Nur eins ist der Punkt.", o: [
          { t: "Wie gut sie beim Feiern aussieht", ok: 0, v: "target", w: "Sie wurde befördert. Du hast ihr Outfit gelobt." },
          { t: "Die Ausdauer, die es gebraucht hat", ok: 1, v: "beautiful", w: "Das, was sie tatsächlich getan hat. Lobe das." },
          { t: "Das neue Gehalt", ok: 0, v: "fine", w: "Du hast dem Budget ihres Arbeitgebers gratuliert." },
          { t: "Dass sie es endlich gemerkt haben", ok: 0, v: "target", w: "Du hast es zu deren Urteil gemacht, nicht zu ihrer Arbeit." }
        ] },
        { k: "name", lvl: "123", q: "Welches Wort passt zu dem, was sie getan hat?", o: [
          { t: "AUSDAUER", ok: 1, v: "seen", w: "Achtzehn Monate davon, das meiste unsichtbar." },
          { t: "KÖNNEN", ok: 2, v: "also", w: "Auch wahr. Etwas kühler, kommt trotzdem an." },
          { t: "GLÜCK", ok: 0, v: "target", w: "Erstaunliche Wahl." },
          { t: "AMBITION", ok: 0, v: "linkedin", w: "Jetzt ist sie eine Wachstumsgeschichte." }
        ] },
        { k: "impact", lvl: "23", q: "Und du?", o: [
          { t: "Ich habe dir anderthalb Jahre zugesehen, wie du nicht aufgegeben hast.", ok: 1, v: "beautiful", w: "Zeugenaussage. Die kann ihr niemand sonst geben." },
          { t: "Gratulation!", ok: 0, v: "potato", w: "Korrekt. Auch das, was ihr Zahnarzt sagen wird." },
          { t: "Wir sollten feiern.", ok: 2, v: "also", w: "Guter Instinkt. Sag zuerst das andere." },
          { t: "Ich wusste immer, dass du es kriegst.", ok: 0, v: "fine", w: "Macht deine Prognose zur Schlagzeile und löscht die Schwierigkeit." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "Ich habe dir achtzehn Monate zugesehen, wie du wieder rangegangen bist", ok: 1 },
            { t: "Gratulation!", ok: 0 },
            { t: "Du siehst heute Abend super aus", ok: 0 }
          ] },
          { label: "EIGENSCHAFT", o: [
            { t: "einschließlich der zwei Male, wo es klar nicht passieren würde", ok: 1 },
            { t: "du bist so ambitioniert", ok: 0 },
            { t: "du hast es verdient", ok: 0 }
          ] },
          { label: "WIRKUNG", o: [
            { t: "Du hast so hart dafür gearbeitet. Ich bin stolz auf dich.", ok: 1 },
            { t: "Jetzt großes Gehalt! 😄", ok: 0 },
            { t: "Ich wusste es immer.", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "Ich habe dir achtzehn Monate zugesehen, wie du wieder rangegangen bist, einschließlich der zwei Male, wo es klar nicht passieren würde. Du hast so hart dafür gearbeitet. Ich bin stolz auf dich.",
        why: "Am Ende absichtlich einfache Sprache. Sie braucht keine Eloquenz, sie braucht einen Zeugen." }
    },

    wa_dinner: {
      sit: "Sie hat gekocht, nach einem Tag, der sie sichtbar zerlegt hat.",
      steps: [
        { k: "notice", lvl: "123", q: "Was ist bemerkenswert?", o: [
          { t: "Das Essen ist gut", ok: 0, v: "potato", w: "Du hast eine Mahlzeit bewertet." },
          { t: "Sie hat es gemacht, obwohl sie komplett leer war", ok: 1, v: "seen", w: "Der Preis ist der Punkt. Benenne den Preis." },
          { t: "Sie kocht gerne", ok: 0, v: "dead", w: "Heute Abend nicht." },
          { t: "Sie hat auch aufgeräumt", ok: 0, v: "fine", w: "Auch wahr. Kleiner." }
        ] },
        { k: "pick", lvl: "12", q: "Welche fühlt sie wirklich?", o: [
          { t: "Danke, war lecker.", ok: 0, v: "potato", w: "Morgen weiß sie das nicht mehr." },
          { t: "Das hättest du nicht machen müssen.", ok: 0, v: "fine", w: "Du hast ihre Freundlichkeit in einen Fehler verwandelt." },
          { t: "Danke fürs Kochen — ich weiß, du warst komplett durch und hast es trotzdem gemacht.", ok: 1, v: "beautiful", w: "Benennt, was sie getan hat und was es gekostet hat. Diese zweite Hälfte ist der ganze Trick." },
          { t: "Du bist echt der fürsorglichste Mensch, den ich kenne.", ok: 0, v: "hallmark", w: "Grüßkarte. Und klingt leicht nach Stellenbeschreibung." }
        ] },
        { k: "impact", lvl: "23", q: "Füge die Wirkung hinzu. Nicht übertreiben.", o: [
          { t: "Nach meinem eigenen Tag nach Hause zu kommen und das zu sehen war das Beste daran.", ok: 1, v: "beautiful", w: "Angemessen und konkret." },
          { t: "Ich weiß nicht, was ich ohne dich machen würde.", ok: 0, v: "much", w: "Sie hat Pasta gemacht. Keine Niere gespendet." },
          { t: "Weiß ich wirklich zu schätzen.", ok: 2, v: "also", w: "Klein und ehrlich. Passt für eine kleine Sache." },
          { t: "Du bist zu gut zu mir.", ok: 0, v: "fine", w: "Jetzt muss sie dich beruhigen. Wieder." }
        ] }
      ],
      reveal: { line: "Danke fürs Kochen — ich weiß, du warst komplett durch und hast es trotzdem gemacht. Nach Hause zu kommen und das zu sehen war das Beste an meinem Tag.",
        why: "Mühe plus Preis plus Wirkung, in normalen Worten. Nichts hier braucht ein Wörterbuch." }
    },

    wa_boss: {
      sit: "Sie erzählt dir, dass sie ihrer Chefin endlich das Schwierige gesagt hat. Ihre Hände zittern noch etwas.",
      steps: [
        { k: "notice", lvl: "123", q: "Was ist hier passiert?", o: [
          { t: "Sie hat einen Streit gewonnen", ok: 0, v: "fine", w: "Nicht der Punkt, und möglicherweise nicht wahr." },
          { t: "Sie hat etwas getan, das ihr Angst gemacht hat", ok: 1, v: "seen", w: "Ja. Die zitternden Hände sind die Geschichte." },
          { t: "Ihre Chefin ist schwierig", ok: 0, v: "dead", w: "Du hast es zu ihrer Chefin gemacht." },
          { t: "Sie ist durchsetzungsstark", ok: 0, v: "linkedin", w: "Sprache aus der Leistungsbeurteilung." }
        ] },
        { k: "name", lvl: "123", q: "Das Wort.", o: [
          { t: "MUT", ok: 1, v: "seen", w: "Richtig, und Erwachsenen sagt man das selten laut." },
          { t: "SELBSTBEWUSSTSEIN", ok: 0, v: "fine", w: "Falsches Wort. Selbstbewusstsein hätte nicht gezittert." },
          { t: "RESILIENZ", ok: 0, v: "linkedin", w: "Du hast in die LinkedIn-Schublade gegriffen." },
          { t: "EHRLICHKEIT", ok: 2, v: "also", w: "Auch vertretbar. Verfehlt die Angst leicht." }
        ] },
        { k: "impact", lvl: "23", q: "Und dann?", o: [
          { t: "Du hattest Angst und hast es trotzdem gemacht. Das ist die ganze Definition.", ok: 1, v: "beautiful", w: "Du hast die Angst benannt statt sie wegzuwischen." },
          { t: "Siehst du, war doch nicht so schlimm!", ok: 0, v: "fine", w: "Du hast für sie entschieden, wie schlimm es war." },
          { t: "Gut für dich!", ok: 0, v: "potato", w: "Die Kartoffel spricht." },
          { t: "Ich hätte das vor Wochen gesagt.", ok: 0, v: "target", w: "Gratulation zu deiner eigenen eingebildeten Tapferkeit." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "Deine Hände haben noch gezittert, als du es mir erzählt hast", ok: 1 },
            { t: "Gut, dass du was gesagt hast", ok: 0 },
            { t: "Das sind super Neuigkeiten", ok: 0 }
          ] },
          { label: "EIGENSCHAFT", o: [
            { t: "was heißt, du hattest Angst und hast es trotzdem gemacht", ok: 1 },
            { t: "du bist so resilient", ok: 0 },
            { t: "du bist mutiger als ich", ok: 0 }
          ] },
          { label: "WIRKUNG", o: [
            { t: "Ich schiebe seit einem Monat etwas Kleineres vor mir her.", ok: 1 },
            { t: "So stolz auf dich!", ok: 0 },
            { t: "Siehst du? War nicht so schlimm.", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "Deine Hände haben noch gezittert, als du es mir erzählt hast, was heißt, du hattest Angst und hast es trotzdem gemacht. Ich schiebe seit einem Monat etwas Kleineres vor mir her.",
        why: "Bei Mut muss die Angst drin bleiben. Nimmt man die Angst raus, nimmt man das Kompliment raus." }
    },

    wa_piano: {
      sit: "Sie übt seit sechs Wochen fast jeden Abend Klavier. Sie ist noch schlecht.",
      steps: [
        { k: "notice", lvl: "123", q: "Vorsicht. Was verdient Anerkennung?", o: [
          { t: "Sie wird schnell besser", ok: 0, v: "fine", w: "Wird sie nicht, und sie weiß es. Lüg nicht herzlich." },
          { t: "Sechs Wochen Abende mit fast nichts vorzuweisen", ok: 1, v: "seen", w: "Das ist schwerer als Talent und dafür lobt sie keiner." },
          { t: "Sie ist musikalisch", ok: 0, v: "target", w: "Schmeichelei aufs Falsche gerichtet." },
          { t: "Schönes Hobby", ok: 0, v: "potato", w: "Schön. Da ist es wieder." }
        ] },
        { k: "name", lvl: "123", q: "Dasselbe Wort wie bei der Gym-Karte, falls du aufgepasst hast.", o: [
          { t: "VERLÄSSLICHKEIT", ok: 1, v: "seen", w: "Ja. Andere Situation, gleiches Konzept. Das ist der Übertrag." },
          { t: "TALENT", ok: 0, v: "target", w: "Das Gegenteil von dem, was passiert." },
          { t: "GEDULD", ok: 2, v: "also", w: "Auch richtig, und hier vermutlich freundlicher." },
          { t: "KREATIVITÄT", ok: 0, v: "fine", w: "Nach ihrer eigenen Aussage ist noch nichts Kreatives passiert." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "Sechs Wochen fast jeden Abend üben", ok: 1 },
            { t: "Du wirst richtig gut", ok: 0 },
            { t: "Du bist so musikalisch", ok: 0 }
          ] },
          { label: "EIGENSCHAFT", o: [
            { t: "mit fast nichts vorzuweisen, und genau da hören alle auf", ok: 1 },
            { t: "du hast echtes Talent", ok: 0 },
            { t: "es klingt schön", ok: 0 }
          ] },
          { label: "WIRKUNG", o: [
            { t: "Ich mag, dass du etwas machst, worin du nicht sofort gut bist.", ok: 1 },
            { t: "Weiter so!", ok: 0 },
            { t: "Gut gemacht.", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "Sechs Wochen fast jeden Abend üben, mit fast nichts vorzuweisen — genau da hören alle auf. Ich mag, dass du etwas machst, worin du nicht sofort gut bist.",
        why: "Gleiches Konzept wie die Gym-Karte in komplett anderer Haut. Wenn du es erkannt hast, wird es zum Reflex." }
    },

    wa_sayless: {
      sit: "SAG WENIGER. Sie hat gerade etwas abgeschlossen, das ein Jahr gedauert hat. Du hast eine Rede vorbereitet.",
      steps: [
        { k: "pick", lvl: "123", q: "Vier Versuche. Einer ist ein Mensch.", o: [
          { t: "Deine bewiesene Resilienz auf dieser gesamten Reise war wirklich inspirierend zu beobachten.", ok: 0, v: "linkedin", w: "Du hast sie für einen Preis nominiert, den keiner ausgeschrieben hat." },
          { t: "Du hast so hart dafür gearbeitet. Ich bin stolz auf dich.", ok: 1, v: "beautiful", w: "Kurz. Wahr. Nichts steht im Weg." },
          { t: "Worte können nicht ausdrücken, wie stolz ich auf die Frau bin, die du geworden bist.", ok: 0, v: "hallmark", w: "So hat noch nie jemand gesprochen, der nicht bedruckt war." },
          { t: "Nice!", ok: 0, v: "potato", w: "Ein Jahr Arbeit, vier Buchstaben." }
        ] },
        { k: "notice", lvl: "12", q: "Warum gewinnt die einfache Version?", o: [
          { t: "Sie ist kürzer", ok: 0, v: "fine", w: "Länge ist nicht der Mechanismus." },
          { t: "Nichts darin führt sich auf", ok: 1, v: "seen", w: "Richtig. Schmuck liest sich als Distanz." },
          { t: "Sie ist männlicher", ok: 0, v: "dead", w: "Nein." },
          { t: "Sie ist leichter zu sagen", ok: 0, v: "fine", w: "Ist sie eigentlich nicht. Das ist ziemlich genau der Punkt." }
        ] }
      ],
      reveal: { line: "Du hast so hart dafür gearbeitet. Ich bin stolz auf dich.",
        why: "Emotionales Vokabular ist dafür, das Richtige zu finden, nicht um es zu verzieren. Wenn das Gefühl groß ist, werden die Worte kleiner." }
    },

    wa_tea: {
      sit: "MASS HALTEN. Sie hat dir einen Tee gebracht, während du gearbeitet hast.",
      steps: [
        { k: "pick", lvl: "123", q: "Es ist ein Tee. Dosiere.", o: [
          { t: "Ehrlich, du kümmerst dich so gut um mich. Ich verdiene dich nicht.", ok: 0, v: "much", w: "Sie hat dir Tee gemacht. Keine Niere gespendet." },
          { t: "Du bist die Beste. Und perfektes Timing.", ok: 1, v: "beautiful", w: "Kleine warme Antwort auf eine kleine warme Sache. Maß zählt." },
          { t: "Danke.", ok: 0, v: "potato", w: "Passt. Auch das, was du einem Barista sagst." },
          { t: "Danke — du merkst immer, wann ich feststecke.", ok: 2, v: "also", w: "Auch schön, und es bemerkt ein Muster. Funktioniert." }
        ] },
        { k: "notice", lvl: "12", q: "Was ist hier die Lektion?", o: [
          { t: "Immer konkret sein", ok: 0, v: "fine", w: "Meistens. Auf dieser Karte nicht die Lektion." },
          { t: "Die Größe der Antwort an die Größe der Sache anpassen", ok: 1, v: "seen", w: "Ja. Kleine Dinge zu überhöhen entwertet die Währung." },
          { t: "Öfter danke sagen", ok: 0, v: "potato", w: "Wieder Lautstärke." },
          { t: "Den Menschen loben, nicht die Handlung", ok: 0, v: "fine", w: "Nicht hier. Hier sagst du etwas Warmes und arbeitest weiter." }
        ] }
      ],
      reveal: { line: "Du bist die Beste. Und perfektes Timing.",
        why: "Wenn jede Freundlichkeit einen Monolog bekommt, bedeutet keine mehr etwas. Spar die großen Worte für die großen Dinge." }
    },

    wa_haircut: {
      sit: "Sie war beim Friseur und prüft ständig ihr Spiegelbild in Schaufenstern.",
      steps: [
        { k: "notice", lvl: "123", q: "Lies erst den Raum. Was läuft hier?", o: [
          { t: "Sie will ein Kompliment", ok: 0, v: "fine", w: "Fast, aber faul. Jeder will ein Kompliment." },
          { t: "Sie ist unsicher und sucht eine ehrliche Einschätzung", ok: 1, v: "seen", w: "Richtig. Vages Lob erreicht das nicht." },
          { t: "Sie mag ihren neuen Schnitt", ok: 0, v: "dead", w: "Dann warum das Schaufenster." },
          { t: "Sie fischt nach Aufmerksamkeit", ok: 0, v: "fine", w: "Unfreundlich, und es sickert in deine Stimme." }
        ] },
        { k: "pick", lvl: "123", q: "Welche klärt es?", o: [
          { t: "Ja, sieht schön aus.", ok: 0, v: "potato", w: "Sie hört den Punkt." },
          { t: "Kürzer als erwartet.", ok: 0, v: "fine", w: "Wahr, und ihr gerade komplett nutzlos." },
          { t: "Das steht dir wirklich — du siehst damit noch mehr nach dir aus.", ok: 1, v: "beautiful", w: "Konkret genug, um geglaubt zu werden, warm genug, um zu helfen." },
          { t: "Du siehst absolut atemberaubend aus, echt unglaublich.", ok: 0, v: "much", w: "Lautstärke, wo sie Genauigkeit brauchte. Sie glaubt es nicht." }
        ] }
      ],
      reveal: { line: "Das steht dir wirklich — du siehst damit noch mehr nach dir aus.",
        why: "Beruhigung funktioniert nur, wenn sie wie eine Beobachtung klingt. Lautstärke runter, Genauigkeit rauf." }
    },

    wa_reliable: {
      sit: "Sie hat diesen Monat dreimal für dich eingesprungen, ohne es ein einziges Mal zu erwähnen.",
      steps: [
        { k: "notice", lvl: "123", q: "Das übersieht man leicht komplett. Was ist es?", o: [
          { t: "Sie ist hilfsbereit", ok: 0, v: "potato", w: "Ein Wort aus dem Zeugnis." },
          { t: "Dreimal, und nie hat sie sich dafür etwas abgeholt", ok: 1, v: "seen", w: "Das Nicht-Erwähnen ist das Kompliment. Benenne das." },
          { t: "Sie ist organisiert", ok: 0, v: "fine", w: "Komplett falsche Eigenschaft." },
          { t: "Sie ist nett zu dir", ok: 0, v: "dead", w: "Enorme Unschärfe." }
        ] },
        { k: "name", lvl: "123", q: "Wort?", o: [
          { t: "VERLÄSSLICHKEIT", ok: 1, v: "seen", w: "Unglamourös, selten gelobt, tief gefühlt." },
          { t: "GROßZÜGIGKEIT", ok: 2, v: "also", w: "Auch fair. Etwas größer als die Sache." },
          { t: "FREUNDLICHKEIT", ok: 2, v: "also", w: "Vertretbar. Etwas weich für das, was sie getan hat." },
          { t: "LOYALITÄT", ok: 0, v: "much", w: "Du hast aus einem Dienstplan einen Blutschwur gemacht." }
        ] },
        { k: "impact", lvl: "123", q: "Bring es an.", o: [
          { t: "Ich habe alle drei gemerkt, und ich habe gemerkt, dass du keins davon erwähnt hast.", ok: 1, v: "beautiful", w: "Unaufgefordert gesehen zu werden ist das Seltenste auf dieser Liste." },
          { t: "Danke für alles, was du machst.", ok: 0, v: "hallmark", w: "Eine Karte aus der Abschiedssammlung." },
          { t: "Du bist so ein guter Mensch.", ok: 0, v: "fine", w: "Ein Etikett. Ein Etikett kann sie nicht fühlen." },
          { t: "Sag Bescheid, wenn du mal was brauchst.", ok: 2, v: "also", w: "Anständig. Gegenleistung, keine Anerkennung. Mach beides." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "BEOBACHTUNG", o: [
            { t: "Du bist diesen Monat dreimal für mich eingesprungen", ok: 1 },
            { t: "Danke für deine Hilfe", ok: 0 },
            { t: "Du bist so lieb", ok: 0 }
          ] },
          { label: "EIGENSCHAFT", o: [
            { t: "und du hast keins davon ein einziges Mal erwähnt", ok: 1 },
            { t: "du bist so verlässlich", ok: 0 },
            { t: "du bist ein guter Mensch", ok: 0 }
          ] },
          { label: "WIRKUNG", o: [
            { t: "Ich hab's gemerkt. Alle drei.", ok: 1 },
            { t: "Nochmal danke!", ok: 0 },
            { t: "Du bist die Beste 🥰", ok: 0 }
          ] }
        ] }
      ],
      reveal: { line: "Du bist diesen Monat dreimal für mich eingesprungen und hast keins davon ein einziges Mal erwähnt. Ich hab's gemerkt. Alle drei.",
        why: "Die ganze Anerkennung steckt in den letzten drei Worten. Leise Mühe will einen Zeugen, keine Rede." }
    }
  };
  // one flat table — court-deck.js looks scenarios up by id regardless of mode
  Object.keys(waScenarios).forEach(function (k) { scenarios[k] = waScenarios[k]; });

  return { concepts: concepts, verdicts: verdicts, replies: replies, tiers: tiers, scenarios: scenarios };
})();
