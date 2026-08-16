// Vocabulaire Supérieur — deck + French conjugator. Loaded in <helmet>, exposes window.DECK / window.FR.
// DECK entry: [english, french, pronunciation, cat]  cat: N noun, V verb, A adjective/adverb, B basics & phrases
// Ordered by frequency tier (≈100 each): introduced in order; the trainer jumps tiers when you're too good.
window.TIER_NAMES = ["Recrue", "Soldat", "Officier", "Général", "Empereur", "Immortel"]; // 200 words per tier (A1-C2)
window.DECK = [
// ── Tier 1 · Recrue — survival French ──
["hello","bonjour","bohn-ZHOOR","B"],["good evening","bonsoir","bohn-SWAHR","B"],["goodbye","au revoir","oh ruh-VWAHR","B"],
["yes","oui","wee","B"],["no","non","nohn","B"],["please","s'il vous plaît","seel voo PLEH","B"],
["thank you","merci","mehr-SEE","B"],["excuse me","excusez-moi","ex-kew-zay-MWAH","B"],["sorry","pardon","par-DOHN","B"],
["how are you?","ça va ?","sah VAH","B"],["my name is…","je m'appelle…","zhuh mah-PELL","B"],["nice to meet you","enchanté","ahn-shahn-TAY","B"],
["I don't understand","je ne comprends pas","zhuh nuh kohn-PRAHN pah","B"],["do you speak English?","parlez-vous anglais ?","par-lay-voo ahn-GLEH","B"],
["where?","où ?","oo","B"],["when?","quand ?","kahn","B"],["why?","pourquoi ?","poor-KWAH","B"],
["how?","comment ?","koh-MAHN","B"],["what?","quoi ?","kwah","B"],["who?","qui ?","kee","B"],
["how much?","combien ?","kohn-BYAN","B"],["and","et","ay","B"],["or","ou","oo","B"],
["but","mais","meh","B"],["because","parce que","parss kuh","B"],["with","avec","ah-VEK","B"],
["without","sans","sahn","B"],["for","pour","poor","B"],["here","ici","ee-SEE","B"],
["there","là-bas","lah-BAH","B"],["now","maintenant","mant-NAHN","B"],["today","aujourd'hui","oh-zhoor-DWEE","B"],
["tomorrow","demain","duh-MAN","B"],["yesterday","hier","ee-YEHR","B"],["always","toujours","too-ZHOOR","B"],
["never","jamais","zhah-MEH","B"],["often","souvent","soo-VAHN","B"],["maybe","peut-être","puh-TETR","B"],
["of course","bien sûr","byan SEWR","B"],["a lot","beaucoup","boh-KOO","B"],["a little","un peu","un PUH","B"],
["too much","trop","troh","B"],["enough","assez","ah-SAY","B"],["also","aussi","oh-SEE","B"],
["water","l'eau (f)","loh","N"],["bread","le pain","luh PAN","N"],["coffee","le café","luh kah-FAY","N"],
["milk","le lait","luh LEH","N"],["wine","le vin","luh VAN","N"],["beer","la bière","lah BYEHR","N"],
["food","la nourriture","lah noo-ree-TEWR","N"],["house","la maison","lah meh-ZOHN","N"],["street","la rue","lah REW","N"],
["city","la ville","lah VEEL","N"],["day","le jour","luh ZHOOR","N"],["night","la nuit","lah NWEE","N"],
["morning","le matin","luh mah-TAN","N"],["evening","le soir","luh SWAHR","N"],["week","la semaine","lah suh-MEN","N"],
["month","le mois","luh MWAH","N"],["year","l'année (f)","lah-NAY","N"],["hour / time","l'heure (f)","LUHR","N"],
["friend","l'ami (m)","lah-MEE","N"],["woman","la femme","lah FAHM","N"],["man","l'homme (m)","LOHM","N"],
["child","l'enfant (m)","lahn-FAHN","N"],["mother","la mère","lah MEHR","N"],["father","le père","luh PEHR","N"],
["family","la famille","lah fah-MEE","N"],["name","le nom","luh NOHN","N"],["money","l'argent (m)","lar-ZHAHN","N"],
["work","le travail","luh trah-VIE","N"],["school","l'école (f)","lay-KOHL","N"],["book","le livre","luh LEEVR","N"],
["car","la voiture","lah vwah-TEWR","N"],["train","le train","luh TRAN","N"],["ticket","le billet","luh bee-YEH","N"],
["hotel","l'hôtel (m)","loh-TEL","N"],["room","la chambre","lah SHAHNBR","N"],["restaurant","le restaurant","luh res-toh-RAHN","N"],
["bill / check","l'addition (f)","lah-dee-SYOHN","N"],["menu","la carte","lah KART","N"],["shop","le magasin","luh mah-gah-ZAN","N"],
["market","le marché","luh mar-SHAY","N"],["pharmacy","la pharmacie","lah far-mah-SEE","N"],["doctor","le médecin","luh mayd-SAN","N"],
["key","la clé","lah KLAY","N"],["door","la porte","lah PORT","N"],["table","la table","lah TAHBL","N"],
["to be","être","ETR","V"],["to have","avoir","ah-VWAHR","V"],["to do / make","faire","FEHR","V"],
["to go","aller","ah-LAY","V"],["to come","venir","vuh-NEER","V"],["to say","dire","DEER","V"],
["to see","voir","VWAHR","V"],["to eat","manger","mahn-ZHAY","V"],["to drink","boire","BWAHR","V"],
["to want","vouloir","voo-LWAHR","V"],["to be able to","pouvoir","poo-VWAHR","V"],["to know (facts)","savoir","sah-VWAHR","V"],
["to speak","parler","par-LAY","V"],["to understand","comprendre","kohn-PRAHNDR","V"],["to take","prendre","PRAHNDR","V"],
["good","bon / bonne","bohn","A"],["bad","mauvais","moh-VEH","A"],["big","grand","grahn","A"],
["small","petit","puh-TEE","A"],["beautiful","beau / belle","boh","A"],["expensive","cher","shehr","A"],
["cheap","pas cher","pah SHEHR","A"],["hot","chaud","shoh","A"],["cold","froid","frwah","A"],
// ── Tier 2 · Soldat — everyday core ──
["to give","donner","doh-NAY","V"],["to buy","acheter","ash-TAY","V"],["to pay","payer","pay-YAY","V"],
["to work","travailler","trah-vie-YAY","V"],["to sleep","dormir","dor-MEER","V"],["to wait","attendre","ah-TAHNDR","V"],
["to look for","chercher","shehr-SHAY","V"],["to find","trouver","troo-VAY","V"],["to open","ouvrir","oo-VREER","V"],
["to close","fermer","fehr-MAY","V"],["to love","aimer","eh-MAY","V"],["to learn","apprendre","ah-PRAHNDR","V"],
["to write","écrire","ay-KREER","V"],["to read","lire","LEER","V"],["to help","aider","eh-DAY","V"],
["to live (reside)","habiter","ah-bee-TAY","V"],["to stay","rester","res-TAY","V"],["to begin","commencer","koh-mahn-SAY","V"],
["to finish","finir","fee-NEER","V"],["to forget","oublier","oo-blee-AY","V"],["to remember","se souvenir","suh soov-NEER","V"],
["to think","penser","pahn-SAY","V"],["to believe","croire","KRWAHR","V"],["to need","avoir besoin de","ah-vwahr buh-ZWAN duh","V"],
["to play","jouer","zhoo-AY","V"],["to run","courir","koo-REER","V"],["to ask","demander","duh-mahn-DAY","V"],
["to answer","répondre","ray-POHNDR","V"],["to call (phone)","appeler","ahp-LAY","V"],["to cook","cuisiner","kwee-zee-NAY","V"],
["to listen","écouter","ay-koo-TAY","V"],["to leave","partir","par-TEER","V"],["to arrive","arriver","ah-ree-VAY","V"],
["cheese","le fromage","luh froh-MAHZH","N"],["meat","la viande","lah VYAHND","N"],["fish","le poisson","luh pwah-SOHN","N"],
["salad","la salade","lah sah-LAHD","N"],["fruit","le fruit","luh FRWEE","N"],["vegetable","le légume","luh lay-GEWM","N"],
["sugar","le sucre","luh SEWKR","N"],["salt","le sel","luh SEL","N"],["oil","l'huile (f)","LWEEL","N"],
["egg","l'œuf (m)","LUFF","N"],["soup","la soupe","lah SOOP","N"],["dessert","le dessert","luh deh-SEHR","N"],
["question","la question","lah kes-TYOHN","N"],["answer","la réponse","lah ray-POHNSS","N"],["word","le mot","luh MOH","N"],
["language","la langue","lah LAHNG","N"],["dog","le chien","luh SHYAN","N"],["cat","le chat","luh SHAH","N"],
["church","l'église (f)","lay-GLEEZ","N"],["square (town)","la place","lah PLAHSS","N"],["sea","la mer","lah MEHR","N"],
["beach","la plage","lah PLAHZH","N"],["island","l'île (f)","LEEL","N"],["mountain","la montagne","lah mohn-TAHN-yuh","N"],
["sun","le soleil","luh soh-LAY","N"],["rain","la pluie","lah PLWEE","N"],["wind","le vent","luh VAHN","N"],
["chair","la chaise","lah SHEZ","N"],["bed","le lit","luh LEE","N"],["window","la fenêtre","lah fuh-NETR","N"],
["bus","le bus","luh BEWSS","N"],["plane","l'avion (m)","lah-VYOHN","N"],["telephone","le téléphone","luh tay-lay-FOHN","N"],
["hospital","l'hôpital (m)","loh-pee-TAHL","N"],["bathroom","la salle de bain","lah sahl duh BAN","N"],["kitchen","la cuisine","lah kwee-ZEEN","N"],
["new","nouveau / nouvelle","noo-VOH","A"],["old","vieux / vieille","vyuh","A"],["young","jeune","zhuhn","A"],
["fast","rapide","rah-PEED","A"],["slow","lent","lahn","A"],["easy","facile","fah-SEEL","A"],
["difficult","difficile","dee-fee-SEEL","A"],["happy","heureux","uh-RUH","A"],["sad","triste","treest","A"],
["tired","fatigué","fah-tee-GAY","A"],["sick","malade","mah-LAHD","A"],["hungry (I'm hungry)","avoir faim","ah-vwahr FAM","B"],
["thirsty (I'm thirsty)","avoir soif","ah-vwahr SWAHF","B"],["open (adj)","ouvert","oo-VEHR","A"],["closed","fermé","fehr-MAY","A"],
["full","plein","plan","A"],["empty","vide","veed","A"],["clean","propre","prohpr","A"],
["dirty","sale","sahl","A"],["important","important","an-por-TAHN","A"],["free (no cost)","gratuit","grah-TWEE","A"],
["left","à gauche","ah GOHSH","B"],["right","à droite","ah DRWAHT","B"],["straight ahead","tout droit","too DRWAH","B"],
["near","près de","preh duh","B"],["far","loin","lwan","B"],["between","entre","AHNTR","B"],
["in front of","devant","duh-VAHN","B"],["behind","derrière","deh-RYEHR","B"],["next to","à côté de","ah koh-TAY duh","B"],
["inside","dedans","duh-DAHN","B"],["outside","dehors","duh-OR","B"],["good luck","bonne chance","bun SHAHNSS","B"],
// ── Tier 3 · Officier — widening the field ──
["person","la personne","lah pehr-SUN","N"],["thing","la chose","lah SHOHZ","N"],["life","la vie","lah VEE","N"],
["world","le monde","luh MOHND","N"],["country","le pays","luh pay-EE","N"],["hand","la main","lah MAN","N"],
["eye","l'œil (m)","LUH-yuh","N"],["head","la tête","lah TET","N"],["heart","le cœur","luh KUR","N"],
["foot","le pied","luh PYAY","N"],["leg","la jambe","lah ZHAHNB","N"],["body","le corps","luh KOR","N"],
["arm","le bras","luh BRAH","N"],["mouth","la bouche","lah BOOSH","N"],["ear","l'oreille (f)","loh-RAY","N"],
["part","la partie","lah par-TEE","N"],["reason","la raison","lah reh-ZOHN","N"],["way / manner","la façon","lah fah-SOHN","N"],
["problem","le problème","luh proh-BLEM","N"],["idea","l'idée (f)","lee-DAY","N"],["opinion","l'avis (m)","lah-VEE","N"],
["truth","la vérité","lah vay-ree-TAY","N"],["strength","la force","lah FORSS","N"],["number","le nombre","luh NOHNBR","N"],
["price","le prix","luh PREE","N"],["color","la couleur","lah koo-LUR","N"],["music","la musique","lah mew-ZEEK","N"],
["movie","le film","luh FEELM","N"],["party","la fête","lah FET","N"],["gift","le cadeau","luh kah-DOH","N"],
["trip","le voyage","luh vwah-YAHZH","N"],["road","la route","lah ROOT","N"],["corner","le coin","luh KWAN","N"],
["beginning","le début","luh day-BEW","N"],["end","la fin","lah FAN","N"],["middle","le milieu","luh mee-LYUH","N"],
["side","le côté","luh koh-TAY","N"],["size","la taille","lah TIE","N"],["paper","le papier","luh pah-PYAY","N"],
["letter","la lettre","lah LETR","N"],["newspaper","le journal","luh zhoor-NAHL","N"],["message","le message","luh meh-SAHZH","N"],
["computer","l'ordinateur (m)","lor-dee-nah-TUR","N"],["cell phone","le portable","luh por-TAHBL","N"],["bank","la banque","lah BAHNK","N"],
["post office","la poste","lah POHST","N"],["police","la police","lah poh-LEESS","N"],["airport","l'aéroport (m)","lah-ay-roh-POR","N"],
["harbor","le port","luh POR","N"],["station","la gare","lah GAR","N"],["weather","le temps","luh TAHN","N"],
["snow","la neige","lah NEZH","N"],["heat","la chaleur","lah shah-LUR","N"],["fire","le feu","luh FUH","N"],
["earth / ground","la terre","lah TEHR","N"],["sky","le ciel","luh SYEL","N"],["tree","l'arbre (m)","LARBR","N"],
["flower","la fleur","lah FLUR","N"],["garden","le jardin","luh zhar-DAN","N"],["animal","l'animal (m)","lah-nee-MAHL","N"],
["bird","l'oiseau (m)","lwah-ZOH","N"],["apartment","l'appartement (m)","lah-par-tuh-MAHN","N"],["floor (storey)","l'étage (m)","lay-TAHZH","N"],
["wall","le mur","luh MEWR","N"],["clothes","les vêtements (m)","lay vet-MAHN","N"],["shoe","la chaussure","lah shoh-SEWR","N"],
["bag","le sac","luh SAHK","N"],["breakfast","le petit-déjeuner","luh puh-tee day-zhuh-NAY","N"],["lunch","le déjeuner","luh day-zhuh-NAY","N"],
["dinner","le dîner","luh dee-NAY","N"],["glass","le verre","luh VEHR","N"],["plate","l'assiette (f)","lah-SYET","N"],
["spoon","la cuillère","lah kwee-YEHR","N"],["fork","la fourchette","lah foor-SHET","N"],["knife","le couteau","luh koo-TOH","N"],
["bottle","la bouteille","lah boo-TAY","N"],["potato","la pomme de terre","lah pum duh TEHR","N"],["tomato","la tomate","lah toh-MAHT","N"],
["onion","l'oignon (m)","loh-NYOHN","N"],["apple","la pomme","lah PUM","N"],["orange","l'orange (f)","loh-RAHNZH","N"],
["lemon","le citron","luh see-TROHN","N"],["yogurt","le yaourt","luh yah-OORT","N"],["honey","le miel","luh MYEL","N"],
["rice","le riz","luh REE","N"],["cake","le gâteau","luh gah-TOH","N"],["ice cream","la glace","lah GLAHSS","N"],
["chicken","le poulet","luh poo-LEH","N"],["ham","le jambon","luh zhahn-BOHN","N"],["butter","le beurre","luh BUR","N"],
["to send","envoyer","ahn-vwah-YAY","V"],["to bring","apporter","ah-por-TAY","V"],["to put","mettre","METR","V"],
["to pull","tirer","tee-RAY","V"],["to push","pousser","poo-SAY","V"],["to show","montrer","mohn-TRAY","V"],
["to explain","expliquer","ex-plee-KAY","V"],["to ask for","demander","duh-mahn-DAY","V"],["to thank","remercier","ruh-mehr-SYAY","V"],
["to hope","espérer","es-pay-RAY","V"],["to fear","avoir peur de","ah-vwahr PUR duh","V"],["to laugh","rire","REER","V"],
// ── Tier 4 · Général — nuance and action ──
["to cry","pleurer","pluh-RAY","V"],["to sing","chanter","shahn-TAY","V"],["to dance","danser","dahn-SAY","V"],
["to travel","voyager","vwah-yah-ZHAY","V"],["to return (go back)","retourner","ruh-toor-NAY","V"],["to meet","rencontrer","rahn-kohn-TRAY","V"],
["to know (people)","connaître","koh-NETR","V"],["to change","changer","shahn-ZHAY","V"],["to try","essayer","eh-say-YAY","V"],
["to succeed","réussir","ray-ew-SEER","V"],["to choose","choisir","shwah-ZEER","V"],["to decide","décider","day-see-DAY","V"],
["to lose","perdre","PEHRDR","V"],["to win","gagner","gah-NYAY","V"],["to use","utiliser","ew-tee-lee-ZAY","V"],
["to clean","nettoyer","neh-twah-YAY","V"],["to wash","laver","lah-VAY","V"],["to break","casser","kah-SAY","V"],
["to repair","réparer","ray-pah-RAY","V"],["to allow","permettre","pehr-METR","V"],["to have to","devoir","duh-VWAHR","V"],
["to cost","coûter","koo-TAY","V"],["to sell","vendre","VAHNDR","V"],["to hear","entendre","ahn-TAHNDR","V"],
["to feel","sentir","sahn-TEER","V"],["to follow","suivre","SWEEVR","V"],["to hold","tenir","tuh-NEER","V"],
["to receive","recevoir","ruh-suh-VWAHR","V"],["to offer","offrir","oh-FREER","V"],["to drive","conduire","kohn-DWEER","V"],
["to walk","marcher","mar-SHAY","V"],["to get up","se lever","suh luh-VAY","V"],["to sit down","s'asseoir","sah-SWAHR","V"],
["to live (be alive)","vivre","VEEVR","V"],["to die","mourir","moo-REER","V"],["to be born","naître","NETR","V"],
["to become","devenir","duhv-NEER","V"],["to enter","entrer","ahn-TRAY","V"],["to go out","sortir","sor-TEER","V"],
["to go up","monter","mohn-TAY","V"],["to go down","descendre","deh-SAHNDR","V"],["to fall","tomber","tohn-BAY","V"],
["happy (content)","content","kohn-TAHN","A"],["angry","fâché","fah-SHAY","A"],["surprised","surpris","sewr-PREE","A"],
["healthy (in shape)","en forme","ahn FORM","A"],["possible","possible","poh-SEEBL","A"],["impossible","impossible","an-poh-SEEBL","A"],
["long","long / longue","lohn","A"],["short","court","koor","A"],["high / tall","haut","oh","A"],
["low","bas","bah","A"],["strong","fort","for","A"],["weak","faible","FEBL","A"],
["heavy","lourd","loor","A"],["light (weight)","léger","lay-ZHAY","A"],["whole / all","tout / toute","too","A"],
["each","chaque","shahk","A"],["other","autre","OHTR","A"],["same","même","mem","A"],
["together","ensemble","ahn-SAHNBL","B"],["alone","seul","suhl","B"],["almost","presque","presk","B"],
["already","déjà","day-ZHAH","B"],["still / yet","encore","ahn-KOR","B"],["only","seulement","suhl-MAHN","B"],
["very","très","treh","B"],["quite / rather","plutôt","plew-TOH","B"],["before","avant","ah-VAHN","B"],
["after","après","ah-PREH","B"],["during","pendant","pahn-DAHN","B"],["early","tôt","toh","B"],
["late","tard","tar","B"],["again","à nouveau","ah noo-VOH","B"],["finally","enfin","ahn-FAN","B"],
["immediately","tout de suite","toot SWEET","B"],["slowly","lentement","lahnt-MAHN","B"],["gladly","volontiers","voh-lohn-TYAY","B"],
["no problem","pas de problème","pah duh proh-BLEM","B"],["excuse me (formal)","je vous prie de m'excuser","zhuh voo PREE duh mex-kew-ZAY","B"],
["it depends","ça dépend","sah day-PAHN","B"],["I agree","je suis d'accord","zhuh swee dah-KOR","B"],
["welcome","bienvenue","byan-vuh-NEW","B"],["cheers!","santé !","sahn-TAY","B"],["have a good meal","bon appétit","bohn ah-pay-TEE","B"],
// ── Tier 5 · Empereur — mastery ──
["government","le gouvernement","luh goo-vehr-nuh-MAHN","N"],["law","la loi","lah LWAH","N"],["war","la guerre","lah GEHR","N"],
["peace","la paix","lah PEH","N"],["history","l'histoire (f)","lees-TWAHR","N"],["story","l'histoire (f)","lees-TWAHR","N"],
["art","l'art (m)","LAR","N"],["painting","le tableau","luh tah-BLOH","N"],["museum","le musée","luh mew-ZAY","N"],
["century","le siècle","luh SYEKL","N"],["king","le roi","luh RWAH","N"],["queen","la reine","lah REN","N"],
["victory","la victoire","lah veek-TWAHR","N"],["defeat","la défaite","lah day-FET","N"],["battle","la bataille","lah bah-TIE","N"],
["army","l'armée (f)","lar-MAY","N"],["flag","le drapeau","luh drah-POH","N"],["horse","le cheval","luh shuh-VAHL","N"],
["health","la santé","lah sahn-TAY","N"],["pain","la douleur","lah doo-LUR","N"],["medicine (drug)","le médicament","luh may-dee-kah-MAHN","N"],
["appointment","le rendez-vous","luh rahn-day-VOO","N"],["meeting","la réunion","lah ray-ew-NYOHN","N"],["company (firm)","l'entreprise (f)","lahn-truh-PREEZ","N"],
["boss","le patron","luh pah-TROHN","N"],["colleague","le collègue","luh koh-LEG","N"],["salary","le salaire","luh sah-LEHR","N"],
["news","les nouvelles (f)","lay noo-VEL","N"],["environment","l'environnement (m)","lahn-vee-run-MAHN","N"],["future","l'avenir (m)","lahv-NEER","N"],
["past","le passé","luh pah-SAY","N"],["memory","le souvenir","luh soov-NEER","N"],["dream","le rêve","luh REV","N"],
["fear","la peur","lah PUR","N"],["joy","la joie","lah ZHWAH","N"],["hope","l'espoir (m)","les-PWAHR","N"],
["luck","la chance","lah SHAHNSS","N"],["mistake","l'erreur (f)","leh-RUR","N"],["success","le succès","luh sewk-SEH","N"],
["choice","le choix","luh SHWAH","N"],["advice","le conseil","luh kohn-SAY","N"],["example","l'exemple (m)","leg-ZAHNPL","N"],
["level","le niveau","luh nee-VOH","N"],["goal","le but","luh BEW","N"],["knowledge","la connaissance","lah koh-neh-SAHNSS","N"],
["to improve","améliorer","ah-may-lyoh-RAY","V"],["to develop","développer","dayv-loh-PAY","V"],["to create","créer","kray-AY","V"],
["to build","construire","kohn-STRWEER","V"],["to destroy","détruire","day-TRWEER","V"],["to defend","défendre","day-FAHNDR","V"],
["to attack","attaquer","ah-tah-KAY","V"],["to conquer","conquérir","kohn-kay-REER","V"],["to protect","protéger","proh-tay-ZHAY","V"],
["to promise","promettre","proh-METR","V"],["to lie","mentir","mahn-TEER","V"],["to forgive","pardonner","par-doh-NAY","V"],
["to discuss","discuter","dees-kew-TAY","V"],["to compare","comparer","kohn-pah-RAY","V"],["to prefer","préférer","pray-fay-RAY","V"],
["to suggest","proposer","proh-poh-ZAY","V"],["to accept","accepter","ahk-sep-TAY","V"],["to refuse","refuser","ruh-few-ZAY","V"],
["to translate","traduire","trah-DWEER","V"],["to pronounce","prononcer","proh-nohn-SAY","V"],["to teach","enseigner","ahn-seh-NYAY","V"],
["to seem","sembler","sahn-BLAY","V"],["to happen","se passer","suh pah-SAY","V"],["to notice","remarquer","ruh-mar-KAY","V"],
["to check","vérifier","vay-ree-FYAY","V"],["to prepare","préparer","pray-pah-RAY","V"],["to organize","organiser","or-gah-nee-ZAY","V"],
["to invite","inviter","an-vee-TAY","V"],["to visit (place)","visiter","vee-zee-TAY","V"],["to rent","louer","loo-AY","V"],
["proud","fier","fyehr","A"],["jealous","jaloux","zhah-LOO","A"],["polite","poli","poh-LEE","A"],
["rude","impoli","an-poh-LEE","A"],["funny","drôle","drohl","A"],["serious","sérieux","say-RYUH","A"],
["strange","bizarre","bee-ZAR","A"],["dangerous","dangereux","dahn-zhuh-RUH","A"],["safe","sûr","sewr","A"],
["famous","célèbre","say-LEBR","A"],["superior","supérieur","sew-pay-RYUR","A"],["excellent","excellent","ek-seh-LAHN","A"],
["useful","utile","ew-TEEL","A"],["useless","inutile","ee-new-TEEL","A"],["deep","profond","proh-FOHN","A"],
["wide","large","larzh","A"],["narrow","étroit","ay-TRWAH","A"],["true","vrai","vreh","A"],
["false","faux","foh","A"],["nevertheless","pourtant","poor-TAHN","B"],["therefore","donc","dohnk","B"],
["however","cependant","suh-pahn-DAHN","B"],["despite","malgré","mahl-GRAY","B"],
// ── Tier 6 · Immortel — émotions, quotidien, connecteurs (expansion plan wave 1) ──
["happiness","le bonheur","luh bo-NUHR","N"],
["sadness","la tristesse","lah tree-STESS","N"],
["anger","la colère","lah koh-LEHR","N"],
["surprise","la surprise","lah sewr-PREEZ","N"],
["love (noun)","l'amour (m)","lah-MOOR","N"],
["feeling","le sentiment","luh sahn-tee-MAHN","N"],
["memory (recollection)","le souvenir","luh soov-NEER","N"],
["decision","la décision","lah day-see-ZYOHN","N"],
["result","le résultat","luh ray-zewl-TAH","N"],
["possibility","la possibilité","lah poh-see-bee-lee-TAY","N"],
["difference","la différence","lah dee-fay-RAHNSS","N"],
["situation","la situation","lah see-tew-ah-SYOHN","N"],
["moment","le moment","luh moh-MAHN","N"],
["story / history","l'histoire (f)","lees-TWAHR","N"],
["lie (untruth)","le mensonge","luh mahn-SOHNZH","N"],
["danger","le danger","luh dahn-ZHAY","N"],
["noise","le bruit","luh BRWEE","N"],
["silence","le silence","luh see-LAHNSS","N"],
["to smile","sourire","soo-REER","V"],
["to continue","continuer","kohn-tee-new-AY","V"],
["to stop","arrêter","ah-reh-TAY","V"],
["to meet (someone)","rencontrer","rahn-kohn-TRAY","V"],
["to visit","visiter","vee-zee-TAY","V"],
["to call (name/phone)","appeler","ahp-LAY","V"],
["to carry / to wear","porter","por-TAY","V"],
["to win / to earn","gagner","gah-NYAY","V"],
["to hate","détester","day-tess-TAY","V"],
["sometimes","parfois","par-FWAH","A"],
["still / again","encore","ahn-KOR","A"],
["soon","bientôt","byan-TOH","A"],
["really","vraiment","vreh-MAHN","A"],
["suddenly","soudain","soo-DAN","A"],
["first (of all)","d'abord","dah-BOR","A"],
["then / next","ensuite","ahn-SWEET","A"],
["if","si","SEE","B"],
["against","contre","KOHNTR","B"],
["several","plusieurs","plew-ZYUHR","B"],
["nothing","rien","RYAN","B"],
["something","quelque chose","kel-kuh-SHOHZ","B"],
["someone","quelqu'un","kel-KUHN","B"],
["nobody","personne (négation)","pehr-SUN","B"],
["everywhere","partout","par-TOO","B"],
["somewhere","quelque part","kel-kuh-PAR","B"],
// ── wave 2 · B1 → C1 expansion (APPENDED only: every existing index and progress key is unchanged) ──
["tooth","la dent","lah DAHN","N"],["skin","la peau","lah POH","N"],["blood","le sang","luh SAHN","N"],
["bone","l'os (m)","LOSS","N"],["back (body)","le dos","luh DOH","N"],["shoulder","l'épaule (f)","lay-POHL","N"],
["knee","le genou","luh zhuh-NOO","N"],["finger","le doigt","luh DWAH","N"],["hair","les cheveux (m)","lay shuh-VUH","N"],
["face","le visage","luh vee-ZAHZH","N"],["living room","le salon","luh sah-LOHN","N"],["bedroom","la chambre à coucher","lah shahnbr ah koo-SHAY","N"],
["roof","le toit","luh TWAH","N"],["stairs","l'escalier (m)","les-kah-LYAY","N"],["elevator","l'ascenseur (m)","lah-sahn-SUR","N"],
["neighbour","le voisin","luh vwah-ZAN","N"],["rent","le loyer","luh lwah-YAY","N"],["building","l'immeuble (m)","lee-MUHBL","N"],
["district","le quartier","luh kar-TYAY","N"],["square (place)","la place","lah PLAHSS","N"],["bridge","le pont","luh POHN","N"],
["park","le parc","luh PARK","N"],["subway","le métro","luh may-TROH","N"],["bike","le vélo","luh vay-LOH","N"],
["luggage","les bagages (m)","lay bah-GAHZH","N"],["suitcase","la valise","lah vah-LEEZ","N"],["passport","le passeport","luh pahss-POR","N"],
["border","la frontière","lah frohn-TYEHR","N"],["map","la carte (plan)","lah KART","N"],["traffic","la circulation","lah seer-kew-lah-SYOHN","N"],
["delay","le retard","luh ruh-TAR","N"],["cloud","le nuage","luh new-AHZH","N"],["storm","l'orage (m)","loh-RAHZH","N"],
["forest","la forêt","lah foh-REH","N"],["river","la rivière","lah ree-VYEHR","N"],["teacher","le professeur","luh proh-feh-SUR","N"],
["student","l'étudiant (m)","lay-tew-DYAHN","N"],["class","le cours","luh KOOR","N"],["exam","l'examen (m)","leg-zah-MAN","N"],
["homework","les devoirs (m)","lay duh-VWAHR","N"],["sentence","la phrase","lah FRAHZ","N"],["phone","le téléphone","luh tay-lay-FOHN","N"],
["screen","l'écran (m)","lay-KRAHN","N"],["file","le fichier","luh fee-SHYAY","N"],["password","le mot de passe","luh moh duh PAHSS","N"],
["to lend","prêter","preh-TAY","V"],["to borrow","emprunter","ahn-prun-TAY","V"],["to repeat","répéter","ray-pay-TAY","V"],
["to count","compter","kohn-TAY","V"],["to measure","mesurer","muh-zew-RAY","V"],["to weigh","peser","puh-ZAY","V"],
["to fill","remplir","rahn-PLEER","V"],["to empty","vider","vee-DAY","V"],["to cut","couper","koo-PAY","V"],
["to add","ajouter","ah-zhoo-TAY","V"],["to remove","enlever","ahnl-VAY","V"],["to keep","garder","gar-DAY","V"],
["to throw","jeter","zhuh-TAY","V"],["to catch","attraper","ah-trah-PAY","V"],["to touch","toucher","too-SHAY","V"],
["to smell","sentir (odeur)","sahn-TEER","V"],["to taste","goûter","goo-TAY","V"],["to rest","se reposer","suh ruh-poh-ZAY","V"],
["to hurry","se dépêcher","suh day-peh-SHAY","V"],["to relax","se détendre","suh day-TAHNDR","V"],["hungry","affamé","ah-fah-MAY","A"],
["thirsty","assoiffé","ah-swah-FAY","A"],["open","ouvert","oo-VEHR","A"],["old (aged)","vieux / vieille","vyuh","A"],
["ready","prêt","preh","A"],["busy","occupé","oh-kew-PAY","A"],["free (available)","libre","LEEBR","A"],
["quiet","calme","kahlm","A"],["society","la société","lah soh-syay-TAY","N"],["citizen","le citoyen","luh see-twah-YAN","N"],
["election","l'élection (f)","lay-lek-SYOHN","N"],["vote","le vote","luh VOHT","N"],["political party","le parti","luh par-TEE","N"],
["president","le président","luh pray-zee-DAHN","N"],["minister","le ministre","luh mee-NEESTR","N"],["state (nation)","l'État (m)","lay-TAH","N"],
["power","le pouvoir","luh poo-VWAHR","N"],["right (entitlement)","le droit","luh DRWAH","N"],["duty","le devoir","luh duh-VWAHR","N"],
["freedom","la liberté","lah lee-behr-TAY","N"],["equality","l'égalité (f)","lay-gah-lee-TAY","N"],["justice","la justice","lah zhews-TEESS","N"],
["court","le tribunal","luh tree-bew-NAHL","N"],["judge","le juge","luh ZHEWZH","N"],["lawyer","l'avocat (m)","lah-voh-KAH","N"],
["crime","le crime","luh KREEM","N"],["prison","la prison","lah pree-ZOHN","N"],["tax","l'impôt (m)","lan-POH","N"],
["debt","la dette","lah DET","N"],["loan","le prêt","luh PREH","N"],["bank account","le compte bancaire","luh kohnt bahn-KEHR","N"],
["invoice","la facture","lah fahk-TEWR","N"],["cost","le coût","luh KOO","N"],["profit","le bénéfice","luh bay-nay-FEESS","N"],
["loss","la perte","lah PEHRT","N"],["market (economy)","le marché (économie)","luh mar-SHAY","N"],["economy","l'économie (f)","lay-koh-noh-MEE","N"],
["industry","l'industrie (f)","lan-dews-TREE","N"],["factory","l'usine (f)","lew-ZEEN","N"],["worker","l'ouvrier (m)","loo-vree-AY","N"],
["employee","l'employé (m)","lahn-plwah-YAY","N"],["employer","l'employeur (m)","lahn-plwah-YUR","N"],["contract","le contrat","luh kohn-TRAH","N"],
["job interview","l'entretien (m)","lahn-truh-TYAN","N"],["application","la candidature","lah kahn-dee-dah-TEWR","N"],["career","la carrière","lah kah-RYEHR","N"],
["skill","la compétence","lah kohn-pay-TAHNSS","N"],["experience","l'expérience (f)","lex-pay-RYAHNSS","N"],["training","la formation","lah for-mah-SYOHN","N"],
["deadline","le délai","luh day-LEH","N"],["project","le projet","luh proh-ZHEH","N"],["team","l'équipe (f)","lay-KEEP","N"],
["report","le rapport","luh rah-POR","N"],["presentation","la présentation","lah pray-zahn-tah-SYOHN","N"],["office","le bureau","luh bew-ROH","N"],
["magazine","le magazine","luh mah-gah-ZEEN","N"],["article","l'article (m)","lar-TEEKL","N"],["headline","le titre","luh TEETR","N"],
["journalist","le journaliste","luh zhoor-nah-LEEST","N"],["television","la télévision","lah tay-lay-vee-ZYOHN","N"],["radio","la radio","lah rah-DYOH","N"],
["advertisement","la publicité","lah pew-blee-see-TAY","N"],["audience","le public","luh pew-BLEEK","N"],["debate","le débat","luh day-BAH","N"],
["argument (reasoning)","l'argument (m)","lar-gew-MAHN","N"],["proof","la preuve","lah PRUHV","N"],["source","la source","lah SOORSS","N"],
["research","la recherche","lah ruh-SHEHRSH","N"],["study (survey)","l'étude (f)","lay-TEWD","N"],["figure (number)","le chiffre","luh SHEEFR","N"],
["percentage","le pourcentage","luh poor-sahn-TAHZH","N"],["average","la moyenne","lah mwah-YEN","N"],["growth","la croissance","lah krwah-SAHNSS","N"],
["operation (surgery)","l'opération (f)","loh-pay-rah-SYOHN","N"],["treatment","le traitement","luh tret-MAHN","N"],["disease","la maladie","lah mah-lah-DEE","N"],
["symptom","le symptôme","luh sanp-TOHM","N"],["fever","la fièvre","lah FYEVR","N"],["wound","la blessure","lah bleh-SEWR","N"],
["nurse","l'infirmier (m)","lan-feer-MYAY","N"],["insurance","l'assurance (f)","lah-sew-RAHNSS","N"],["diet","le régime","luh ray-ZHEEM","N"],
["sleep","le sommeil","luh soh-MAY","N"],["exercise","l'exercice (m)","leg-zehr-SEESS","N"],["stress","le stress","luh STRESS","N"],
["care","le soin","luh SWAN","N"],["recovery","la guérison","lah gay-ree-ZOHN","N"],["climate","le climat","luh klee-MAH","N"],
["pollution","la pollution","lah poh-lew-SYOHN","N"],["waste","les déchets (m)","lay day-SHEH","N"],["energy","l'énergie (f)","lay-nehr-ZHEE","N"],
["fuel","le carburant","luh kar-bew-RAHN","N"],["electricity","l'électricité (f)","lay-lek-tree-see-TAY","N"],["harvest","la récolte","lah ray-KOHLT","N"],
["field (farm)","le champ","luh SHAHN","N"],["species","l'espèce (f)","les-PESS","N"],["nature","la nature","lah nah-TEWR","N"],
["coast","la côte","lah KOHT","N"],["desert","le désert","luh day-ZEHR","N"],["lake","le lac","luh LAHK","N"],
["patience","la patience","lah pah-SYAHNSS","N"],["courage","le courage","luh koo-RAHZH","N"],["pride","la fierté","lah fyehr-TAY","N"],
["shame","la honte","lah OHNT","N"],["guilt","la culpabilité","lah kewl-pah-bee-lee-TAY","N"],["jealousy","la jalousie","lah zhah-loo-ZEE","N"],
["trust","la confiance","lah kohn-FYAHNSS","N"],["doubt","le doute","luh DOOT","N"],["curiosity","la curiosité","lah kew-ryoh-zee-TAY","N"],
["boredom","l'ennui (m)","lahn-NWEE","N"],["relief","le soulagement","luh soo-lahzh-MAHN","N"],["regret","le regret","luh ruh-GREH","N"],
["habit","l'habitude (f)","lah-bee-TEWD","N"],["behaviour","le comportement","luh kohn-por-tuh-MAHN","N"],["character","le caractère","luh kah-rahk-TEHR","N"],
["mood","l'humeur (f)","lew-MUR","N"],["attitude","l'attitude (f)","lah-tee-TEWD","N"],["reason (cause)","la raison","lah reh-ZOHN","N"],
["purpose","l'objectif (m)","lob-zhek-TEEF","N"],["effort","l'effort (m)","leh-FOR","N"],["progress","le progrès","luh proh-GREH","N"],
["to admit","admettre","ahd-METR","V"],["to deny","nier","nee-AY","V"],["to complain","se plaindre","suh PLANDR","V"],
["to apologize","s'excuser","sex-kew-ZAY","V"],["to warn","avertir","ah-vehr-TEER","V"],["to threaten","menacer","muh-nah-SAY","V"],
["to convince","convaincre","kohn-VANKR","V"],["to persuade","persuader","pehr-swah-DAY","V"],["to negotiate","négocier","nay-goh-SYAY","V"],
["to agree (on)","se mettre d'accord","suh METR dah-KOR","V"],["to argue","se disputer","suh dees-pew-TAY","V"],["to solve","résoudre","ray-ZOODR","V"],
["to avoid","éviter","ay-vee-TAY","V"],["to reduce","réduire","ray-DWEER","V"],["to increase","augmenter","ohg-mahn-TAY","V"],
["to replace","remplacer","rahn-plah-SAY","V"],["to depend on","dépendre de","day-PAHNDR duh","V"],["to belong to","appartenir à","ah-par-tuh-NEER ah","V"],
["to concern","concerner","kohn-sehr-NAY","V"],["to influence","influencer","an-flew-ahn-SAY","V"],["to affect","affecter","ah-fek-TAY","V"],
["to expect","s'attendre à","sah-TAHNDR ah","V"],["to assume","supposer","sew-poh-ZAY","V"],["to doubt","douter","doo-TAY","V"],
["to realize","se rendre compte","suh rahndr KOHNT","V"],["to recognize","reconnaître","ruh-koh-NETR","V"],["to consider","considérer","kohn-see-day-RAY","V"],
["to judge","juger","zhew-ZHAY","V"],["to criticize","critiquer","kree-tee-KAY","V"],["to congratulate","féliciter","fay-lee-see-TAY","V"],
["to encourage","encourager","ahn-koo-rah-ZHAY","V"],["to support","soutenir","soot-NEER","V"],["to rely on","compter sur","kohn-TAY sewr","V"],
["to trust (someone)","faire confiance à","fehr kohn-FYAHNSS ah","V"],["to manage (cope)","se débrouiller","suh day-broo-YAY","V"],["to give up","abandonner","ah-bahn-doh-NAY","V"],
["to insist","insister","an-sees-TAY","V"],["to hesitate","hésiter","ay-zee-TAY","V"],["to dare","oser","oh-ZAY","V"],
["to risk","risquer","rees-KAY","V"],["to earn a living","gagner sa vie","gah-NYAY sah VEE","V"],["to save (money)","économiser","ay-koh-noh-mee-ZAY","V"],
["to spend","dépenser","day-pahn-SAY","V"],["to invest","investir","an-ves-TEER","V"],["to hire","embaucher","ahn-boh-SHAY","V"],
["to fire (dismiss)","licencier","lee-sahn-SYAY","V"],["to resign","démissionner","day-mee-syoh-NAY","V"],["to apply (for a job)","postuler","poss-tew-LAY","V"],
["to lead","diriger","dee-ree-ZHAY","V"],["to obey","obéir","oh-bay-EER","V"],["to forbid","interdire","an-tehr-DEER","V"],
["responsible","responsable","res-pohn-SAHBL","A"],["reliable","fiable","fee-AHBL","A"],["honest","honnête","oh-NET","A"],
["generous","généreux","zhay-nay-RUH","A"],["selfish","égoïste","ay-goh-EEST","A"],["shy","timide","tee-MEED","A"],
["confident","confiant","kohn-FYAHN","A"],["ambitious","ambitieux","ahn-bee-SYUH","A"],["lazy","paresseux","pah-reh-SUH","A"],
["hard-working","travailleur","trah-vie-YUR","A"],["patient","patient","pah-SYAHN","A"],["impatient","impatient","an-pah-SYAHN","A"],
["calm (tranquil)","tranquille","trahn-KEEL","A"],["nervous","nerveux","nehr-VUH","A"],["worried","inquiet","an-KYEH","A"],
["disappointed","déçu","day-SEW","A"],["satisfied","satisfait","sah-tees-FEH","A"],["grateful","reconnaissant","ruh-koh-neh-SAHN","A"],
["curious","curieux","kew-RYUH","A"],["stubborn","têtu","teh-TEW","A"],["clever","intelligent","an-teh-lee-ZHAHN","A"],
["kind","gentil","zhahn-TEE","A"],["mean","méchant","may-SHAHN","A"],["discreet","discret","dees-KREH","A"],
["talkative","bavard","bah-VAR","A"],["sensitive","sensible","sahn-SEEBL","A"],["reasonable","raisonnable","reh-zoh-NAHBL","A"],
["fair","juste","zhewst","A"],["unfair","injuste","an-ZHEWST","A"],["necessary","nécessaire","nay-seh-SEHR","A"],
["sufficient","suffisant","sew-fee-ZAHN","A"],["obvious","évident","ay-vee-DAHN","A"],["complicated","compliqué","kohn-plee-KAY","A"],
["simple","simple","SANPL","A"],["common","courant","koo-RAHN","A"],["rare","rare","rar","A"],
["recent","récent","ray-SAHN","A"],["current","actuel","ahk-tew-EL","A"],["ancient","ancien","ahn-SYAN","A"],
["modern","moderne","moh-DEHRN","A"],["local","local","loh-KAHL","A"],["national","national","nah-syoh-NAHL","A"],
["foreign","étranger","ay-trahn-ZHAY","A"],["public","public","pew-BLEEK","A"],["private","privé","pree-VAY","A"],
["available","disponible","dees-poh-NEEBL","A"],["costly","coûteux","koo-TUH","A"],["although","bien que","byan kuh","B"],
["as soon as","dès que","deh kuh","B"],["until","jusqu'à ce que","zhews-KAH suh kuh","B"],["as long as","tant que","tahn kuh","B"],
["in order to","afin de","ah-FAN duh","B"],["so that","pour que","poor kuh","B"],["instead of","au lieu de","oh LYUH duh","B"],
["thanks to","grâce à","grahss AH","B"],["because of","à cause de","ah KOHZ duh","B"],["on the other hand","en revanche","ahn ruh-VAHNSH","B"],
["moreover","de plus","duh PLEWSS","B"],["in fact","en fait","ahn FET","B"],["in short","bref","bref","B"],
["for example","par exemple","par eg-ZAHNPL","B"],["that is to say","c'est-à-dire","seh-tah-DEER","B"],["above all","surtout","sewr-TOO","B"],
["at least","au moins","oh MWAN","B"],["at most","au plus","oh PLEWSS","B"],["by the way","au fait","oh FET","B"],
["in my opinion","à mon avis","ah moh-nah-VEE","B"],["on time","à l'heure","ah LUR","B"],["as usual","comme d'habitude","kohm dah-bee-TEWD","B"],
["little by little","peu à peu","puh ah PUH","B"],["from time to time","de temps en temps","duh tahn-zahn-TAHN","B"],["consequence","la conséquence","lah kohn-say-KAHNSS","N"],
["cause","la cause","lah KOHZ","N"],["condition","la condition","lah kohn-dee-SYOHN","N"],["hypothesis","l'hypothèse (f)","lee-poh-TEZ","N"],
["conclusion","la conclusion","lah kohn-klew-ZYOHN","N"],["approach","l'approche (f)","lah-PROSH","N"],["method","la méthode","lah may-TOHD","N"],
["framework","le cadre","luh KAHDR","N"],["stake (issue)","l'enjeu (m)","lahn-ZHUH","N"],["challenge","le défi","luh day-FEE","N"],
["constraint","la contrainte","lah kohn-TRANT","N"],["gap (shortcoming)","la lacune","lah lah-KEWN","N"],["asset (strength)","l'atout (m)","lah-TOO","N"],
["weakness","la faiblesse","lah feh-BLESS","N"],["scope","la portée","lah por-TAY","N"],["trend","la tendance","lah tahn-DAHNSS","N"],
["turning point","le tournant","luh toor-NAHN","N"],["outcome","l'issue (f)","lee-SEW","N"],["nuance","la nuance","lah new-AHNSS","N"],
["ambiguity","l'ambiguïté (f)","lahn-bee-gwee-TAY","N"],["contradiction","la contradiction","lah kohn-trah-deek-SYOHN","N"],["paradox","le paradoxe","luh pah-rah-DOX","N"],
["prejudice","le préjugé","luh pray-zhew-ZHAY","N"],["consensus","le consensus","luh kohn-sahn-SEWSS","N"],["compromise","le compromis","luh kohn-proh-MEE","N"],
["negotiation","la négociation","lah nay-goh-syah-SYOHN","N"],["agreement","l'accord (m)","lah-KOR","N"],["dispute","le litige","luh lee-TEEZH","N"],
["interest (stake)","l'intérêt (m)","lan-tay-REH","N"],["responsibility","la responsabilité","lah res-pohn-sah-bee-lee-TAY","N"],["oversight (monitoring)","la surveillance","lah sewr-vay-YAHNSS","N"],
["procedure","la procédure","lah proh-say-DEWR","N"],["regulation","le règlement","luh reh-gluh-MAHN","N"],["standard","la norme","lah NORM","N"],
["requirement","l'exigence (f)","leg-zee-ZHAHNSS","N"],["guideline","la directive","lah dee-rek-TEEV","N"],["reform","la réforme","lah ray-FORM","N"],
["measure (policy)","la mesure","lah muh-ZEWR","N"],["policy","la politique","lah poh-lee-TEEK","N"],["budget","le budget","luh bewd-ZHEH","N"],
["funding","le financement","luh fee-nahnss-MAHN","N"],["investment","l'investissement (m)","lan-ves-teess-MAHN","N"],["shareholder","l'actionnaire (m)","lahk-syoh-NEHR","N"],
["merger","la fusion","lah few-ZYOHN","N"],["bankruptcy","la faillite","lah fie-YEET","N"],["supply","l'offre (f)","LOFR","N"],
["demand","la demande","lah duh-MAHND","N"],["competition","la concurrence","lah kohn-kew-RAHNSS","N"],["customer","le client","luh klee-AHN","N"],
["supplier","le fournisseur","luh foor-nee-SUR","N"],["quality","la qualité","lah kah-lee-TAY","N"],["postponement","le report","luh ruh-POR","N"],
["schedule","le calendrier","luh kah-lahn-dree-AY","N"],["priority","la priorité","lah pree-oh-ree-TAY","N"],["know-how","le savoir-faire","luh sah-vwahr-FEHR","N"],
["awareness","la prise de conscience","lah preez duh kohn-SYAHNSS","N"],["mindset","l'état d'esprit (m)","lay-TAH des-PREE","N"],["education (upbringing)","l'éducation (f)","lay-dew-kah-SYOHN","N"],
["heritage","le patrimoine","luh pah-tree-MWAHN","N"],["identity","l'identité (f)","lee-dahn-tee-TAY","N"],["belonging","l'appartenance (f)","lah-par-tuh-NAHNSS","N"],
["community","la communauté","lah koh-mew-noh-TAY","N"],["generation","la génération","lah zhay-nay-rah-SYOHN","N"],["inequality","l'inégalité (f)","lee-nay-gah-lee-TAY","N"],
["poverty","la pauvreté","lah poh-vruh-TAY","N"],["wealth","la richesse","lah ree-SHESS","N"],["migration","la migration","lah mee-grah-SYOHN","N"],
["integration","l'intégration (f)","lan-tay-grah-SYOHN","N"],["solidarity","la solidarité","lah soh-lee-dah-ree-TAY","N"],["influence","l'influence (f)","lan-flew-AHNSS","N"],
["reputation","la réputation","lah ray-pew-tah-SYOHN","N"],["credibility","la crédibilité","lah kray-dee-bee-lee-TAY","N"],["rumour","la rumeur","lah rew-MUR","N"],
["scandal","le scandale","luh skahn-DAHL","N"],["censorship","la censure","lah sahn-SEWR","N"],["privacy","la vie privée","lah vee pree-VAY","N"],
["algorithm","l'algorithme (m)","lahl-goh-REETM","N"],["data","les données (f)","lay doh-NAY","N"],["network","le réseau","luh ray-ZOH","N"],
["software","le logiciel","luh loh-zhee-SYEL","N"],["device","l'appareil (m)","lah-pah-RAY","N"],["update","la mise à jour","lah meez ah ZHOOR","N"],
["backup","la sauvegarde","lah sohv-GARD","N"],["to point out","souligner","soo-lee-NYAY","V"],["to highlight","mettre en avant","METR ahn ah-VAHN","V"],
["to imply","sous-entendre","soo-zahn-TAHNDR","V"],["to state","affirmer","ah-feer-MAY","V"],["to claim","prétendre","pray-TAHNDR","V"],
["to specify","préciser","pray-see-ZAY","V"],["to clarify","clarifier","klah-ree-FYAY","V"],["to summarize","résumer","ray-zew-MAY","V"],
["to set out","exposer","ex-poh-ZAY","V"],["to assess","évaluer","ay-vah-lew-AY","V"],["to estimate","estimer","es-tee-MAY","V"],
["to foresee","prévoir","pray-VWAHR","V"],["to plan","planifier","plah-nee-FYAY","V"],["to implement","mettre en œuvre","METR ahn UVR","V"],
["to carry out","effectuer","ay-fek-tew-AY","V"],["to achieve","atteindre","ah-TANDR","V"],["to exceed","dépasser","day-pah-SAY","V"],
["to strengthen","renforcer","rahn-for-SAY","V"],["to weaken","affaiblir","ah-feh-BLEER","V"],["to maintain","maintenir","mant-NEER","V"],
["to preserve","préserver","pray-zehr-VAY","V"],["to restore","rétablir","ray-tah-BLEER","V"],["to adapt","adapter","ah-dahp-TAY","V"],
["to adjust","ajuster","ah-zhews-TAY","V"],["to reconsider","reconsidérer","ruh-kohn-see-day-RAY","V"],["to postpone","reporter","ruh-por-TAY","V"],
["to cancel","annuler","ah-new-LAY","V"],["to confirm","confirmer","kohn-feer-MAY","V"],["to approve","approuver","ah-proo-VAY","V"],
["to reject","rejeter","ruh-zhuh-TAY","V"],["to require","exiger","eg-zee-ZHAY","V"],["to grant","accorder","ah-kor-DAY","V"],
["to entrust","confier","kohn-FYAY","V"],["to delegate","déléguer","day-lay-GAY","V"],["to supervise","superviser","sew-pehr-vee-ZAY","V"],
["to report (inform)","signaler","see-nyah-LAY","V"],["to disclose","divulguer","dee-vewl-GAY","V"],["to conceal","dissimuler","dee-see-mew-LAY","V"],
["to accuse","accuser","ah-kew-ZAY","V"],["to blame","reprocher","ruh-proh-SHAY","V"],["to prove","prouver","proo-VAY","V"],
["to demonstrate","démontrer","day-mohn-TRAY","V"],["to contradict","contredire","kohn-truh-DEER","V"],["to question (challenge)","remettre en question","ruh-METR ahn kes-TYOHN","V"],
["to undermine","miner","mee-NAY","V"],["to overcome","surmonter","sewr-mohn-TAY","V"],["to cope with","faire face à","fehr FAHSS ah","V"],
["to endure","supporter","sew-por-TAY","V"],["to give in","céder","say-DAY","V"],["to resist","résister","ray-zees-TAY","V"],
["to persevere","persévérer","pehr-say-vay-RAY","V"],["to commit oneself","s'engager","sahn-gah-ZHAY","V"],["to get involved","s'impliquer","sanp-lee-KAY","V"],
["to withdraw","se retirer","suh ruh-tee-RAY","V"],["to take part","participer","par-tee-see-PAY","V"],["to contribute","contribuer","kohn-tree-bew-AY","V"],
["to benefit from","bénéficier de","bay-nay-fee-SYAY duh","V"],["to take advantage of","profiter de","proh-fee-TAY duh","V"],["to make the most of","tirer parti de","tee-RAY par-TEE duh","V"],
["to be worth","valoir","vah-LWAHR","V"],["to matter","importer","an-por-TAY","V"],["to be about","s'agir de","sah-ZHEER duh","V"],
["to turn out","s'avérer","sah-vay-RAY","V"],["thorough","approfondi","ah-proh-fohn-DEE","A"],["accurate","exact","eg-ZAHKT","A"],
["relevant","pertinent","pehr-tee-NAHN","A"],["off-topic","hors sujet","or sew-ZHEH","A"],["significant","significatif","see-nyee-fee-kah-TEEF","A"],
["negligible","négligeable","nay-glee-ZHAHBL","A"],["substantial","considérable","kohn-see-day-RAHBL","A"],["moderate","modéré","moh-day-RAY","A"],
["excessive","excessif","ek-seh-SEEF","A"],["reluctant","réticent","ray-tee-SAHN","A"],["willing","disposé","dees-poh-ZAY","A"],
["cautious","prudent","prew-DAHN","A"],["reckless","imprudent","an-prew-DAHN","A"],["deliberate","délibéré","day-lee-bay-RAY","A"],
["unexpected","inattendu","ee-nah-tahn-DEW","A"],["inevitable","inévitable","ee-nay-vee-TAHBL","A"],["sustainable","durable","dew-RAHBL","A"],
["harmful","nuisible","nwee-ZEEBL","A"],["beneficial","bénéfique","bay-nay-FEEK","A"],["demanding","exigeant","eg-zee-ZHAHN","A"],
["arduous","ardu","ar-DEW","A"],["ambiguous","ambigu","ahn-bee-GEW","A"],["misleading","trompeur","trohn-PUR","A"],
["convincing","convaincant","kohn-van-KAHN","A"],["outstanding","remarquable","ruh-mar-KAHBL","A"],["mediocre","médiocre","may-dee-OKR","A"],
["widespread","répandu","ray-pahn-DEW","A"],["thoughtful","attentionné","ah-tahn-syoh-NAY","A"],["ruthless","impitoyable","an-pee-twah-YAHBL","A"],
["humble","modeste","moh-DEST","A"],["arrogant","arrogant","ah-roh-GAHN","A"],["indifferent","indifférent","an-dee-fay-RAHN","A"],
["enthusiastic","enthousiaste","ahn-too-ZYAHST","A"],["as far as I know","à ma connaissance","ah mah koh-neh-SAHNSS","B"],["in reality","en réalité","ahn ray-ah-lee-TAY","B"],
["all things considered","tout compte fait","too kohnt FEH","B"],["that said","cela dit","suh-lah DEE","B"],["on the contrary","au contraire","oh kohn-TREHR","B"],
["in any case","en tout cas","ahn too KAH","B"],["as a result","par conséquent","par kohn-say-KAHN","B"],["for the time being","pour l'instant","poor lan-STAHN","B"],
["from now on","désormais","day-zor-MEH","B"],["sooner or later","tôt ou tard","toh oo TAR","B"],["on purpose","exprès","ex-PREH","B"],
["by chance","par hasard","par ah-ZAR","B"],["at first sight","à première vue","ah pruh-MYEHR VEW","B"],["in the long run","à long terme","ah lohn TEHRM","B"],
["in the short term","à court terme","ah koor TEHRM","B"],["broadly speaking","dans l'ensemble","dahn lahn-SAHNBL","B"],["roughly / about","environ","ahn-vee-ROHN","B"],
["precisely","précisément","pray-see-zay-MAHN","B"],["hardly","à peine","ah PEN","B"],["just barely","tout juste","too ZHEWST","B"],
["no wonder","pas étonnant","pah ay-toh-NAHN","B"],["it's worth it","ça vaut le coup","sah voh luh KOO","B"],["it doesn't matter","ça n'a pas d'importance","sah nah pah dan-por-TAHNSS","B"],
["to be honest","pour être honnête","poor ETR oh-NET","B"],["as expected","comme prévu","kohm pray-VEW","B"],["against all odds","contre toute attente","KOHNTR toot ah-TAHNT","B"],
["anyway","de toute façon","duh toot fah-SOHN","B"],["step by step","étape par étape","ay-TAHP par ay-TAHP","B"],["on second thought","à la réflexion","ah lah ray-flek-SYOHN","B"]
];

// ── French conjugator: présent · passé composé · futur simple, 6 persons ──
(function(){
const ETRE_VERBS = ["aller","venir","arriver","partir","rester","entrer","sortir","monter","descendre","tomber","retourner","devenir","revenir","rentrer","mourir","naître","passer"];
const IRREG = {
"être":{pr:["suis","es","est","sommes","êtes","sont"],pp:"été",fs:"ser"},
"avoir":{pr:["ai","as","a","avons","avez","ont"],pp:"eu",fs:"aur"},
"aller":{pr:["vais","vas","va","allons","allez","vont"],pp:"allé",fs:"ir"},
"faire":{pr:["fais","fais","fait","faisons","faites","font"],pp:"fait",fs:"fer"},
"dire":{pr:["dis","dis","dit","disons","dites","disent"],pp:"dit"},
"pouvoir":{pr:["peux","peux","peut","pouvons","pouvez","peuvent"],pp:"pu",fs:"pourr"},
"vouloir":{pr:["veux","veux","veut","voulons","voulez","veulent"],pp:"voulu",fs:"voudr"},
"savoir":{pr:["sais","sais","sait","savons","savez","savent"],pp:"su",fs:"saur"},
"venir":{pr:["viens","viens","vient","venons","venez","viennent"],pp:"venu",fs:"viendr"},
"tenir":{pr:["tiens","tiens","tient","tenons","tenez","tiennent"],pp:"tenu",fs:"tiendr"},
"voir":{pr:["vois","vois","voit","voyons","voyez","voient"],pp:"vu",fs:"verr"},
"devoir":{pr:["dois","dois","doit","devons","devez","doivent"],pp:"dû",fs:"devr"},
"prendre":{pr:["prends","prends","prend","prenons","prenez","prennent"],pp:"pris"},
"mettre":{pr:["mets","mets","met","mettons","mettez","mettent"],pp:"mis"},
"boire":{pr:["bois","bois","boit","buvons","buvez","boivent"],pp:"bu"},
"croire":{pr:["crois","crois","croit","croyons","croyez","croient"],pp:"cru"},
"écrire":{pr:["écris","écris","écrit","écrivons","écrivez","écrivent"],pp:"écrit"},
"lire":{pr:["lis","lis","lit","lisons","lisez","lisent"],pp:"lu"},
"rire":{pr:["ris","ris","rit","rions","riez","rient"],pp:"ri"},
"dormir":{pr:["dors","dors","dort","dormons","dormez","dorment"],pp:"dormi"},
"partir":{pr:["pars","pars","part","partons","partez","partent"],pp:"parti"},
"sortir":{pr:["sors","sors","sort","sortons","sortez","sortent"],pp:"sorti"},
"sentir":{pr:["sens","sens","sent","sentons","sentez","sentent"],pp:"senti"},
"mentir":{pr:["mens","mens","ment","mentons","mentez","mentent"],pp:"menti"},
"ouvrir":{pr:["ouvre","ouvres","ouvre","ouvrons","ouvrez","ouvrent"],pp:"ouvert"},
"offrir":{pr:["offre","offres","offre","offrons","offrez","offrent"],pp:"offert"},
"recevoir":{pr:["reçois","reçois","reçoit","recevons","recevez","reçoivent"],pp:"reçu",fs:"recevr"},
"vivre":{pr:["vis","vis","vit","vivons","vivez","vivent"],pp:"vécu"},
"suivre":{pr:["suis","suis","suit","suivons","suivez","suivent"],pp:"suivi"},
"courir":{pr:["cours","cours","court","courons","courez","courent"],pp:"couru",fs:"courr"},
"mourir":{pr:["meurs","meurs","meurt","mourons","mourez","meurent"],pp:"mort",fs:"mourr"},
"naître":{pr:["nais","nais","naît","naissons","naissez","naissent"],pp:"né"},
"connaître":{pr:["connais","connais","connaît","connaissons","connaissez","connaissent"],pp:"connu"},
"conduire":{pr:["conduis","conduis","conduit","conduisons","conduisez","conduisent"],pp:"conduit"},
"construire":{pr:["construis","construis","construit","construisons","construisez","construisent"],pp:"construit"},
"détruire":{pr:["détruis","détruis","détruit","détruisons","détruisez","détruisent"],pp:"détruit"},
"traduire":{pr:["traduis","traduis","traduit","traduisons","traduisez","traduisent"],pp:"traduit"},
"conquérir":{pr:["conquiers","conquiers","conquiert","conquérons","conquérez","conquièrent"],pp:"conquis",fs:"conquerr"},
"asseoir":{pr:["assieds","assieds","assied","asseyons","asseyez","asseyent"],pp:"assis",fs:"assiér"},
"envoyer":{fs:"enverr"}
};
const DERIV = ["prendre","venir","tenir","mettre","ouvrir","offrir","écrire","dire","conduire","connaître","partir","sortir","sentir","naître"];
const AVOIR_PR = IRREG["avoir"].pr, ETRE_PR = IRREG["être"].pr;
const FUT_END = ["ai","as","a","ons","ez","ont"];
const VSTART = /^[aeiouâàéèêëîïôûhœ]/i;

function findIrreg(inf){
  if (IRREG[inf] && IRREG[inf].pr) return {f:IRREG[inf], pre:""};
  for (let i=0;i<DERIV.length;i++){
    const k = DERIV[i];
    if (inf !== k && inf.slice(-k.length) === k) return {f:IRREG[k], pre:inf.slice(0, -k.length)};
  }
  return null;
}
function erPresent(inf){
  const st = inf.slice(0,-2);
  let strong = st; // stem for je/tu/il/ils
  if (/[^é]e[^aeiouéè]+$/.test(st)) strong = st.replace(/e([^aeiouéè]+)$/, "è$1");
  else if (/é[^aeiou]+$/.test(st)) strong = st.replace(/é([^aeiou]+)$/, "è$1");
  else if (/y$/.test(st)) strong = st.slice(0,-1) + "i";
  if (/(el|et)$/.test(st) && ("appeler jeter rappeler".indexOf(inf) >= 0)) strong = st + st.slice(-1);
  const nous = /g$/.test(st) ? st + "e" : (/c$/.test(st) ? st.slice(0,-1) + "ç" : st);
  return [strong+"e", strong+"es", strong+"e", nous+"ons", st+"ez", strong+"ent"];
}
function conjBase(inf){
  const ir = findIrreg(inf);
  let pr, pp, fs;
  if (ir && ir.f.pr){
    pr = ir.f.pr.map(function(x){ return ir.pre + x; });
    pp = ir.pre + ir.f.pp;
    fs = ir.f.fs ? ir.pre + ir.f.fs : null;
  }
  if (!pr){
    if (/er$/.test(inf)){ pr = erPresent(inf); pp = inf.slice(0,-2)+"é"; }
    else if (/ir$/.test(inf)){ const st = inf.slice(0,-2); pr = [st+"is",st+"is",st+"it",st+"issons",st+"issez",st+"issent"]; pp = st+"i"; }
    else if (/re$/.test(inf)){ const st = inf.slice(0,-2); pr = [st+"s",st+"s",st,st+"ons",st+"ez",st+"ent"]; pp = st+"u"; }
    else return null;
  }
  if (!fs){
    if (IRREG[inf] && IRREG[inf].fs) fs = IRREG[inf].fs;
    else if (/er$/.test(inf)){
      const p1 = erPresent(inf)[0]; // reuse stem change: achèter, paier…
      fs = /e$/.test(p1) ? p1.slice(0,-1) + "er" : inf;
      if (fs === inf && /er$/.test(inf)) fs = inf;
    }
    else fs = /re$/.test(inf) ? inf.slice(0,-1) : inf;
  }
  return {pr:pr, pp:pp, fs:fs};
}
window.FR = {
  conj: function(raw){
    let inf = raw, refl = null;
    if (/^se /.test(raw)) { refl = ["me","te","se","nous","vous","se"]; inf = raw.slice(3); }
    else if (/^s'/.test(raw)) { refl = ["m'","t'","s'","nous ","vous ","s'"]; inf = raw.slice(2); }
    if (/ /.test(inf)) return null; // multi-word phrases: no table
    const c = conjBase(inf);
    if (!c) return null;
    const aux = refl ? "être" : (ETRE_VERBS.indexOf(inf) >= 0 ? "être" : "avoir");
    return build(c.pr, refl, c.fs, aux, c.pp, inf);
  }
};
function build(pr, refl, fs, aux, pp, inf){
  const P = ["je","tu","il","nous","vous","ils"];
  const auxPr = aux === "être" ? ETRE_PR : AVOIR_PR;
  return P.map(function(p,i){
    function subj(word){
      let s = p === "je" && VSTART.test(word) ? "j'" : (p === "je" ? "je " : p + " ");
      return s + word;
    }
    function rword(word){
      if (!refl) return word;
      const r = refl[i];
      if (/'$/.test(r)) return VSTART.test(word) ? r + word : r.slice(0,-1) + "e " + word;
      return r + (/ $/.test(r) ? "" : " ") + word;
    }
    const present = subj(rword(pr[i]));
    const futur = fs ? subj(rword(fs + FUT_END[i])) : "—";
    let passe;
    const auxW = rword(auxPr[i]);
    let part = pp;
    if (aux === "être"){ // rough agreement
      if (i === 3) part = pp + "(e)s"; else if (i === 5) part = pp + "s"; else part = pp + "(e)";
    }
    passe = subj(auxW) + " " + part;
    return { person: P[i], present: present, passe: passe, futur: futur };
  });
}
})();
