// Vocabulaire Supérieur — deck + French conjugator. Loaded in <helmet>, exposes window.DECK / window.FR.
// DECK entry: [english, french, pronunciation, cat]  cat: N noun, V verb, A adjective/adverb, B basics & phrases
// Ordered by frequency tier (≈100 each): introduced in order; the trainer jumps tiers when you're too good.
window.TIER_NAMES = ["Recrue", "Soldat", "Officier", "Général", "Empereur", "Immortel"];
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
["however","cependant","suh-pahn-DAHN","B"],["despite","malgré","mahl-GRAY","B"]
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
["somewhere","quelque part","kel-kuh-PAR","B"]
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
