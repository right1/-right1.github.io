function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

/*An array containing all the pokemon names:*/
var pokemon = [
    "Bulbasaur",
    "Ivysaur",
    "Venusaur",
    "Charmander",
    "Charmeleon",
    "Charizard",
    "Squirtle",
    "Wartortle",
    "Blastoise",
    "Caterpie",
    "Metapod",
    "Butterfree",
    "Weedle",
    "Kakuna",
    "Beedrill",
    "Pidgey",
    "Pidgeotto",
    "Pidgeot",
    "Rattata",
    "Raticate",
    "Spearow",
    "Fearow",
    "Ekans",
    "Arbok",
    "Pikachu",
    "Raichu",
    "Sandshrew",
    "Sandslash",
    "Nidoran-f",
    "Nidorina",
    "Nidoqueen",
    "Nidoran-m",
    "Nidorino",
    "Nidoking",
    "Clefairy",
    "Clefable",
    "Vulpix",
    "Ninetales",
    "Jigglypuff",
    "Wigglytuff",
    "Zubat",
    "Golbat",
    "Oddish",
    "Gloom",
    "Vileplume",
    "Paras",
    "Parasect",
    "Venonat",
    "Venomoth",
    "Diglett",
    "Dugtrio",
    "Meowth",
    "Persian",
    "Psyduck",
    "Golduck",
    "Mankey",
    "Primeape",
    "Growlithe",
    "Arcanine",
    "Poliwag",
    "Poliwhirl",
    "Poliwrath",
    "Abra",
    "Kadabra",
    "Alakazam",
    "Machop",
    "Machoke",
    "Machamp",
    "Bellsprout",
    "Weepinbell",
    "Victreebel",
    "Tentacool",
    "Tentacruel",
    "Geodude",
    "Graveler",
    "Golem",
    "Ponyta",
    "Rapidash",
    "Slowpoke",
    "Slowbro",
    "Magnemite",
    "Magneton",
    "Farfetch’d",
    "Doduo",
    "Dodrio",
    "Seel",
    "Dewgong",
    "Grimer",
    "Muk",
    "Shellder",
    "Cloyster",
    "Gastly",
    "Haunter",
    "Gengar",
    "Onix",
    "Drowzee",
    "Hypno",
    "Krabby",
    "Kingler",
    "Voltorb",
    "Electrode",
    "Exeggcute",
    "Exeggutor",
    "Cubone",
    "Marowak",
    "Hitmonlee",
    "Hitmonchan",
    "Lickitung",
    "Koffing",
    "Weezing",
    "Rhyhorn",
    "Rhydon",
    "Chansey",
    "Tangela",
    "Kangaskhan",
    "Horsea",
    "Seadra",
    "Goldeen",
    "Seaking",
    "Staryu",
    "Starmie",
    "Mr. Mime",
    "Scyther",
    "Jynx",
    "Electabuzz",
    "Magmar",
    "Pinsir",
    "Tauros",
    "Magikarp",
    "Gyarados",
    "Lapras",
    "Ditto",
    "Eevee",
    "Vaporeon",
    "Jolteon",
    "Flareon",
    "Porygon",
    "Omanyte",
    "Omastar",
    "Kabuto",
    "Kabutops",
    "Aerodactyl",
    "Snorlax",
    "Articuno",
    "Zapdos",
    "Moltres",
    "Dratini",
    "Dragonair",
    "Dragonite",
    "Mewtwo",
    "Mew",
    "Chikorita",
    "Bayleef",
    "Meganium",
    "Cyndaquil",
    "Quilava",
    "Typhlosion",
    "Totodile",
    "Croconaw",
    "Feraligatr",
    "Sentret",
    "Furret",
    "Hoothoot",
    "Noctowl",
    "Ledyba",
    "Ledian",
    "Spinarak",
    "Ariados",
    "Crobat",
    "Chinchou",
    "Lanturn",
    "Pichu",
    "Cleffa",
    "Igglybuff",
    "Togepi",
    "Togetic",
    "Natu",
    "Xatu",
    "Mareep",
    "Flaaffy",
    "Ampharos",
    "Bellossom",
    "Marill",
    "Azumarill",
    "Sudowoodo",
    "Politoed",
    "Hoppip",
    "Skiploom",
    "Jumpluff",
    "Aipom",
    "Sunkern",
    "Sunflora",
    "Yanma",
    "Wooper",
    "Quagsire",
    "Espeon",
    "Umbreon",
    "Murkrow",
    "Slowking",
    "Misdreavus",
    "Unown",
    "Wobbuffet",
    "Girafarig",
    "Pineco",
    "Forretress",
    "Dunsparce",
    "Gligar",
    "Steelix",
    "Snubbull",
    "Granbull",
    "Qwilfish",
    "Scizor",
    "Shuckle",
    "Heracross",
    "Sneasel",
    "Teddiursa",
    "Ursaring",
    "Slugma",
    "Magcargo",
    "Swinub",
    "Piloswine",
    "Corsola",
    "Remoraid",
    "Octillery",
    "Delibird",
    "Mantine",
    "Skarmory",
    "Houndour",
    "Houndoom",
    "Kingdra",
    "Phanpy",
    "Donphan",
    "Porygon2",
    "Stantler",
    "Smeargle",
    "Tyrogue",
    "Hitmontop",
    "Smoochum",
    "Elekid",
    "Magby",
    "Miltank",
    "Blissey",
    "Raikou",
    "Entei",
    "Suicune",
    "Larvitar",
    "Pupitar",
    "Tyranitar",
    "Lugia",
    "Ho-Oh",
    "Celebi",
    "Treecko",
    "Grovyle",
    "Sceptile",
    "Torchic",
    "Combusken",
    "Blaziken",
    "Mudkip",
    "Marshtomp",
    "Swampert",
    "Poochyena",
    "Mightyena",
    "Zigzagoon",
    "Linoone",
    "Wurmple",
    "Silcoon",
    "Beautifly",
    "Cascoon",
    "Dustox",
    "Lotad",
    "Lombre",
    "Ludicolo",
    "Seedot",
    "Nuzleaf",
    "Shiftry",
    "Taillow",
    "Swellow",
    "Wingull",
    "Pelipper",
    "Ralts",
    "Kirlia",
    "Gardevoir",
    "Surskit",
    "Masquerain",
    "Shroomish",
    "Breloom",
    "Slakoth",
    "Vigoroth",
    "Slaking",
    "Nincada",
    "Ninjask",
    "Shedinja",
    "Whismur",
    "Loudred",
    "Exploud",
    "Makuhita",
    "Hariyama",
    "Azurill",
    "Nosepass",
    "Skitty",
    "Delcatty",
    "Sableye",
    "Mawile",
    "Aron",
    "Lairon",
    "Aggron",
    "Meditite",
    "Medicham",
    "Electrike",
    "Manectric",
    "Plusle",
    "Minun",
    "Volbeat",
    "Illumise",
    "Roselia",
    "Gulpin",
    "Swalot",
    "Carvanha",
    "Sharpedo",
    "Wailmer",
    "Wailord",
    "Numel",
    "Camerupt",
    "Torkoal",
    "Spoink",
    "Grumpig",
    "Spinda",
    "Trapinch",
    "Vibrava",
    "Flygon",
    "Cacnea",
    "Cacturne",
    "Swablu",
    "Altaria",
    "Zangoose",
    "Seviper",
    "Lunatone",
    "Solrock",
    "Barboach",
    "Whiscash",
    "Corphish",
    "Crawdaunt",
    "Baltoy",
    "Claydol",
    "Lileep",
    "Cradily",
    "Anorith",
    "Armaldo",
    "Feebas",
    "Milotic",
    "Castform",
    "Kecleon",
    "Shuppet",
    "Banette",
    "Duskull",
    "Dusclops",
    "Tropius",
    "Chimecho",
    "Absol",
    "Wynaut",
    "Snorunt",
    "Glalie",
    "Spheal",
    "Sealeo",
    "Walrein",
    "Clamperl",
    "Huntail",
    "Gorebyss",
    "Relicanth",
    "Luvdisc",
    "Bagon",
    "Shelgon",
    "Salamence",
    "Beldum",
    "Metang",
    "Metagross",
    "Regirock",
    "Regice",
    "Registeel",
    "Latias",
    "Latios",
    "Kyogre",
    "Groudon",
    "Rayquaza",
    "Jirachi",
    "Deoxys",
    "Deoxys-Attack",
    "Deoxys-Defense",
    "Deoxys-Speed",
    "Turtwig",
    "Grotle",
    "Torterra",
    "Chimchar",
    "Monferno",
    "Infernape",
    "Piplup",
    "Prinplup",
    "Empoleon",
    "Starly",
    "Staravia",
    "Staraptor",
    "Bidoof",
    "Bibarel",
    "Kricketot",
    "Kricketune",
    "Shinx",
    "Luxio",
    "Luxray",
    "Budew",
    "Roserade",
    "Cranidos",
    "Rampardos",
    "Shieldon",
    "Bastiodon",
    "Burmy",
    "Wormadam",
    "Mothim",
    "Combee",
    "Vespiquen",
    "Pachirisu",
    "Buizel",
    "Floatzel",
    "Cherubi",
    "Cherrim",
    "Shellos",
    "Gastrodon",
    "Ambipom",
    "Drifloon",
    "Drifblim",
    "Buneary",
    "Lopunny",
    "Mismagius",
    "Honchkrow",
    "Glameow",
    "Purugly",
    "Chingling",
    "Stunky",
    "Skuntank",
    "Bronzor",
    "Bronzong",
    "Bonsly",
    "Mime Jr.",
    "Happiny",
    "Chatot",
    "Spiritomb",
    "Gible",
    "Gabite",
    "Garchomp",
    "Munchlax",
    "Riolu",
    "Lucario",
    "Hippopotas",
    "Hippowdon",
    "Skorupi",
    "Drapion",
    "Croagunk",
    "Toxicroak",
    "Carnivine",
    "Finneon",
    "Lumineon",
    "Mantyke",
    "Snover",
    "Abomasnow",
    "Weavile",
    "Magnezone",
    "Lickilicky",
    "Rhyperior",
    "Tangrowth",
    "Electivire",
    "Magmortar",
    "Togekiss",
    "Yanmega",
    "Leafeon",
    "Glaceon",
    "Gliscor",
    "Mamoswine",
    "Porygon-Z",
    "Gallade",
    "Probopass",
    "Dusknoir",
    "Froslass",
    "Rotom",
    "Uxie",
    "Mesprit",
    "Azelf",
    "Dialga",
    "Palkia",
    "Heatran",
    "Regigigas",
    "Giratina",
    "Cresselia",
    "Phione",
    "Manaphy",
    "Darkrai",
    "Shaymin",
    "Arceus",
    "Victini",
    "Snivy",
    "Servine",
    "Serperior",
    "Tepig",
    "Pignite",
    "Emboar",
    "Oshawott",
    "Dewott",
    "Samurott",
    "Patrat",
    "Watchog",
    "Lillipup",
    "Herdier",
    "Stoutland",
    "Purrloin",
    "Liepard",
    "Pansage",
    "Simisage",
    "Pansear",
    "Simisear",
    "Panpour",
    "Simipour",
    "Munna",
    "Musharna",
    "Pidove",
    "Tranquill",
    "Unfezant",
    "Blitzle",
    "Zebstrika",
    "Roggenrola",
    "Boldore",
    "Gigalith",
    "Woobat",
    "Swoobat",
    "Drilbur",
    "Excadrill",
    "Audino",
    "Timburr",
    "Gurdurr",
    "Conkeldurr",
    "Tympole",
    "Palpitoad",
    "Seismitoad",
    "Throh",
    "Sawk",
    "Sewaddle",
    "Swadloon",
    "Leavanny",
    "Venipede",
    "Whirlipede",
    "Scolipede",
    "Cottonee",
    "Whimsicott",
    "Petilil",
    "Lilligant",
    "Basculin",
    "Sandile",
    "Krokorok",
    "Krookodile",
    "Darumaka",
    "Darmanitan",
    "Darmanitan-Zen",
    "Maractus",
    "Dwebble",
    "Crustle",
    "Scraggy",
    "Scrafty",
    "Sigilyph",
    "Yamask",
    "Cofagrigus",
    "Tirtouga",
    "Carracosta",
    "Archen",
    "Archeops",
    "Trubbish",
    "Garbodor",
    "Zorua",
    "Zoroark",
    "Minccino",
    "Cinccino",
    "Gothita",
    "Gothorita",
    "Gothitelle",
    "Solosis",
    "Duosion",
    "Reuniclus",
    "Ducklett",
    "Swanna",
    "Vanillite",
    "Vanillish",
    "Vanilluxe",
    "Deerling",
    "Sawsbuck",
    "Emolga",
    "Karrablast",
    "Escavalier",
    "Foongus",
    "Amoonguss",
    "Frillish",
    "Jellicent",
    "Alomomola",
    "Joltik",
    "Galvantula",
    "Ferroseed",
    "Ferrothorn",
    "Klink",
    "Klang",
    "Klinklang",
    "Tynamo",
    "Eelektrik",
    "Eelektross",
    "Elgyem",
    "Beheeyem",
    "Litwick",
    "Lampent",
    "Chandelure",
    "Axew",
    "Fraxure",
    "Haxorus",
    "Cubchoo",
    "Beartic",
    "Cryogonal",
    "Shelmet",
    "Accelgor",
    "Stunfisk",
    "Mienfoo",
    "Mienshao",
    "Druddigon",
    "Golett",
    "Golurk",
    "Pawniard",
    "Bisharp",
    "Bouffalant",
    "Rufflet",
    "Braviary",
    "Vullaby",
    "Mandibuzz",
    "Heatmor",
    "Durant",
    "Deino",
    "Zweilous",
    "Hydreigon",
    "Larvesta",
    "Volcarona",
    "Cobalion",
    "Terrakion",
    "Virizion",
    "Tornadus",
    "Thundurus",
    "Reshiram",
    "Zekrom ",
    "Landorus",
    "Kyurem",
    "Keldeo",
    "Meloetta",
    "Genesect",
    "Chespin",
    "Quilladin",
    "Chesnaught",
    "Fennekin",
    "Braixen",
    "Delphox",
    "Froakie",
    "Frogadier",
    "Greninja",
    "Bunnelby",
    "Diggersby",
    "Fletchling",
    "Fletchinder",
    "Talonflame",
    "Scatterbug",
    "Spewpa",
    "Vivillon",
    "Litleo",
    "Pyroar",
    "Flabebe",
    "Floette",
    "Florges",
    "Skiddo",
    "Gogoat",
    "Pancham",
    "Pangoro",
    "Furfrou",
    "Espurr",
    "Honedge",
    "Doublade",
    "Aegislash-Blade",
    "Aegislash-Shield",
    "Spritzee",
    "Aromatisse",
    "Swirlix",
    "Slurpuff",
    "Inkay",
    "Malamar",
    "Binacle",
    "Barbaracle",
    "Skrelp",
    "Dragalge",
    "Clauncher",
    "Clawitzer",
    "Helioptile",
    "Heliolisk",
    "Tyrunt",
    "Tyrantrum",
    "Amaura",
    "Aurorus",
    "Sylveon",
    "Hawlucha",
    "Dedenne",
    "Carbink",
    "Goomy",
    "Sliggoo",
    "Goodra",
    "Klefki",
    "Phantump",
    "Trevenant",
    "Pumpkaboo",
    "Gourgeist",
    "Bergmite",
    "Avalugg",
    "Noibat",
    "Noivern",
    "Xerneas",
    "Yveltal",
    "Zygarde",
    "Diancie",
    "Hoopa",
    "Volcanion",
    "Rowlet",
    "Dartrix",
    "Decidueye",
    "Litten",
    "Torracat",
    "Incineroar",
    "Popplio",
    "Brionne",
    "Primarina",
    "Pikipek",
    "Trumbeak",
    "Toucannon",
    "Yungoos",
    "Gumshoos",
    "Grubbin",
    "Charjabug",
    "Vikavolt",
    "Crabrawler",
    "Crabominable",
    "Oricorio",
    "Cutiefly",
    "Ribombee",
    "Rockruff",
    "Lycanroc",
    "Wishiwashi",
    "Wishiwashi-School",
    "Mareanie",
    "Toxapex",
    "Mudbray",
    "Mudsdale",
    "Dewpider",
    "Araquanid",
    "Fomantis",
    "Lurantis",
    "Morelull",
    "Shiinotic",
    "Salandit",
    "Salazzle",
    "Stufful",
    "Bewear",
    "Bounsweet",
    "Steenee",
    "Tsareena",
    "Comfey",
    "Oranguru",
    "Passimian",
    "Wimpod",
    "Golisopod",
    "Sandygast",
    "Palossand",
    "Pyukumuku",
    "Type: Null",
    "Silvally",
    "Komala",
    "Turtonator",
    "Togedemaru",
    "Mimikyu",
    "Bruxish",
    "Drampa",
    "Dhelmise",
    "Jangmo-o",
    "Hakamo-o",
    "Kommo-o",
    "Tapu-Koko",
    "Tapu-Lele",
    "Tapu-Bulu",
    "Tapu-Fini",
    "Cosmog",
    "Cosmoem",
    "Solgaleo",
    "Lunala",
    "Nihilego",
    "Buzzwole",
    "Pheromosa",
    "Xurkitree",
    "Celesteela",
    "Kartana",
    "Guzzlord",
    "Necrozma",
    "Magearna",
    "Marshadow",
    "Abomasnow-Mega",
    "Absol-Mega",
    "Aerodactyl-Mega",
    "Aggron-Mega",
    "Alakazam-Mega",
    "Altaria-Mega",
    "Ampharos-Mega",
    "Audino-Mega",
    "Banette-Mega",
    "Beedrill-Mega",
    "Blastoise-Mega",
    "Blaziken-Mega",
    "Camerupt-Mega",
    "Charizard-Mega-X",
    "Charizard-Mega-Y",
    "Diancie-Mega",
    "Diglett-Alola",
    "Dugtrio-Alola",
    "Exeggutor-Alola",
    "Floette-Eternal",
    "Gallade-Mega",
    "Garchomp-Mega",
    "Gardevoir-Mega",
    "Gengar-Mega",
    "Geodude-Alola",
    "Giratina-Origin",
    "Glalie-Mega",
    "Golem-Alola",
    "Gourgeist-Large",
    "Gourgeist-Small",
    "Gourgeist-Super",
    "Graveler-Alola",
    "Greninja-Ash",
    "Grimer-Alola",
    "Groudon-Primal",
    "Gyarados-Mega",
    "Heracross-Mega",
    "Hoopa-Unbound",
    "Houndoom-Mega",
    "Kangaskhan-Mega",
    "Kyogre-Primal",
    "Kyurem-Black",
    "Kyurem-White",
    "Landorus-Therian",
    "Latias-Mega",
    "Latios-Mega",
    "Lopunny-Mega",
    "Lucario-Mega",
    "Lycanroc-Midnight",
    "Manectric-Mega",
    "Marowak-Alola",
    "Mawile-Mega",
    "Medicham-Mega",
    "Meloetta-Pirouette",
    "Meowstic-Female",
    "Meowstic-Male",
    "Meowth-Alola",
    "Metagross-Mega",
    "Mewtwo-Mega-X",
    "Mewtwo-Mega-Y",
    "Muk-Alola",
    "Ninetales-Alola",
    "Oricorio-Pau",
    "Oricorio-Pom-Pom",
    "Oricorio-Sensu",
    "Persian-Alola",
    "Pidgeot-Mega",
    "Pinsir-Mega",
    "Pumpkaboo-Large",
    "Pumpkaboo-Small",
    "Pumpkaboo-Super",
    "Raichu-Alola",
    "Raticate-Alola",
    "Rattata-Alola",
    "Rayquaza-Mega",
    "Rotom-Fan",
    "Rotom-Frost",
    "Rotom-Heat",
    "Rotom-Mow",
    "Rotom-Wash",
    "Sableye-Mega",
    "Salamence-Mega",
    "Sandshrew-Alola",
    "Sandslash-Alola",
    "Sceptile-Mega",
    "Scizor-Mega",
    "Sharpedo-Mega",
    "Shaymin-Sky",
    "Slowbro-Mega",
    "Steelix-Mega",
    "Swampert-Mega",
    "Thundurus-Therian",
    "Tornadus-Therian",
    "Tyranitar-Mega",
    "Venusaur-Mega",
    "Vulpix-Alola",
    "Wormadam-Sandy",
    "Wormadam-Trash",
    "Zygarde-10",
    "Zygarde-Complete"
];
/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), pokemon);
var ctx = document.getElementById("statsChart");
var statChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Hp', 'Atk', 'Def', 'SpAtk', 'SpDef', 'Speed',],
        datasets: [{
            label: 'Base Stat Value',
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#3e95cd"],
            pointBackgroundColor: 'rgba(' + '0' + ', 0, 255, 1)',
            yAxisID: 'X',
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1]
        }]
    },
    options: {
        responsive:false,
        scales: {
            yAxes: [{
                id: 'X',
                type: 'linear',
                position: 'left',
                ticks: {
                    suggestedMax: 160,
                    min: 0
                }
            }],
            xAxes: [{
                ticks: {
                    autoSkip:false
                }
            }]
        }
    }
});
var requestURL;
var btn = document.getElementById('submit');
btn.onclick = function () {
    
    updateImage();
    var input = document.getElementById('myInput').value;
    var input2 = input[0].toUpperCase() + input.substr(1);
    var pokemon_index = pokemon.indexOf(input);
    var pokemon_index2 = pokemon.indexOf(input2);
    if (pokemon_index2 != -1 && pokemon_index == -1) {
        pokemon_index = pokemon_index2;
        input=input2;
    }
    if(input.includes(': ')){
        input=input.replace(': ','-');
    }
    //pokemon_index++;
    if (pokemon_index != -1) {
        requestURL = 'https://pokeapi.co/api/v2/pokemon/';
        requestURL += input.toLowerCase();
        if(input.toLowerCase()==='landorus' || input.toLowerCase()==='thundurus' || input.toLowerCase()==='tornadus'){
            requestURL+='-incarnate';
        }else if(input.toLowerCase()==='mimikyu'){
            requestURL+='-disguised';
        }else if(input.toLowerCase()==='deoxys'){
            requestURL+='-normal';
        }else if(input.toLowerCase()==='giratina'){
            requestURL+='-altered';
        }else if(input.toLowerCase()==='darmanitan'){
            requestURL+='-standard';
        }else if(input.toLowerCase()==='wishiwashi'){
            requestURL+='-solo';
        }else if(input.toLowerCase()==='gourgeist'){
            requestURL+='-average';
        }
        requestURL+='/'
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        
        console.log(requestURL);
        if(this.innerHTML!='Loading...'){
            this.innerHTML='Loading...';
            this.disabled=true;
            request.send();
        }
        request.onload = function () {
            btn.innerHTML='Submit';
            btn.disabled=false;
            var pokemonData = request.response;
            var pName = document.getElementById('pName');
            var pAbility = document.getElementById('pAbility');
            //var pStats = document.getElementById('pStats');
            var pWeight = document.getElementById('pWeight');
            var pType = document.getElementById('pType');
            pName.innerHTML = 'Name: ' + pokemonData.name;
            var abilities = 'Abilities: ';
            for (var i = 0; i < pokemonData.abilities.length; i++) {
                abilities += pokemonData.abilities[i].ability.name;
                if (i < pokemonData.abilities.length - 1) {
                    abilities += ', ';
                }
            }
            abilities=abilities.replace(/-/g,' ');
            pAbility.innerHTML = abilities;
            var types = 'Type(s): ';
            for (var i = 0; i < pokemonData.types.length; i++) {
                types += pokemonData.types[i].type.name;
                if (i < pokemonData.types.length - 1) {
                    types += ', ';
                }
            }
            types=types.replace(/-/g,' ');
            pType.innerHTML = types;
            var stats = [];
            stats.push(pokemonData.stats[5].base_stat);
            stats.push(pokemonData.stats[4].base_stat);
            stats.push(pokemonData.stats[3].base_stat);
            stats.push(pokemonData.stats[2].base_stat);
            stats.push(pokemonData.stats[1].base_stat);
            stats.push(pokemonData.stats[0].base_stat);
            for(var i=0;i<6;i++){
                var r=350;
                var g=-60;
                var b=0;
                var st=Math.floor(stats[i]*2.7);
                while(st>0){
                    if(g<255){
                        g++;
                        r--;
                    }else if(b<255){
                        b+=2;
                    }
                    st--;
                }
                // while(g>255){
                //     g--;
                //     b++;
                // }
                // while(st<80){
                //     b-=4;
                //     r+=4;
                //     st++;
                // }
                statChart.data.datasets[0].backgroundColor[i]='rgba(' + r + ', '+g+', '+b+', 1)';
            }
            pWeight.innerHTML = 'Weight: ' + pokemonData.weight.toString().substr(0,pokemonData.weight.toString().length-1)+'.'+ pokemonData.weight.toString()[pokemonData.weight.toString().length-1]+ 'kg';
            statChart.data.datasets[0].data=stats;
            statChart.update();
            
        }
        request.onerror=function(){
            btn.innerHTML='Submit';
            btn.disabled=false;
        }
        request.ontimeout=function(){
            btn.innerHTML='Submit';
            btn.disabled=false;
        }
    }
}
var imgbtn=document.getElementById('updateimage');
imgbtn.onclick=function(){
    this.disabled=true;
    updateImage();
    this.disabled=false;
}
function updateImage(){
    document.getElementById('alt-images').innerHTML='';
    document.getElementById('static-images').innerHTML='';
    var input = document.getElementById('myInput').value;
    var input2 = input[0].toUpperCase() + input.substr(1);
    var pokemon_index = pokemon.indexOf(input);
    var pokemon_index2 = pokemon.indexOf(input2);
    if (pokemon_index2 != -1 && pokemon_index == -1) {
        pokemon_index = pokemon_index2;
        input=input2;
    }
    if(input.includes(': ')){
        input=input.replace(': ','-');
    }
    //pokemon_index++;
    if (pokemon_index != -1) {
        var imgURL='https://www.smogon.com/dex/media/sprites/xy/';
        var imgcall=input.toLowerCase();
        if(imgcall.includes('tapu')){
            imgcall=imgcall.replace('tapu-','tapu_');
        }
        if(imgcall.includes('-shield')){
            imgcall=imgcall.replace('-shield','');
        }
        if(imgcall.includes('-null')){
            imgcall=imgcall.replace('-null','_null');
        }
        var imgattackurl='http://www.pokestadium.com/sprites/xy/';
        var imgcall1=imgcall;
        if(imgcall1.includes('-x')){
            imgcall1=imgcall1.replace('-x','x');
        }else if(imgcall1.includes('-y')){
            imgcall1=imgcall1.replace('-y','y');
        }
        imgattackurl+=imgcall1;
        //var imgnumber=2;
        
        var found=true;
        //var imgnumber_=2;
        for(var imgnumber=2;imgnumber<7;imgnumber++){
            //img.src = imgattackurl+'-'+imgnumber+'.gif';\
            testImage(imgattackurl+'-'+imgnumber+'.gif',loadImage);
            if(found==false){
                console.log('broke');
                break;
            }
        }
        imgattackurl='http://www.pokestadium.com/sprites/xy/back/';
        testImage(imgattackurl+imgcall1+'.gif',loadImageStatic);
        imgattackurl='http://www.pokestadium.com/sprites/xy/shiny/';
        testImage(imgattackurl+imgcall1+'.gif',loadImageStatic);
        imgattackurl='http://www.pokestadium.com/sprites/xy/shiny/back/';
        testImage(imgattackurl+imgcall1+'.gif',loadImageStatic);
        function loadImage(url,result){
            if(result==="success"){
                var img = document.createElement('img');
                img.src=url;
                document.getElementById('alt-images').appendChild(img)
                img.onload=function(){
                    img.style.height=(img.clientHeight+30)+'px';
                }
            }else{
                found=false;
            }
        }
        function loadImageStatic(url,result){
            if(result==="success"){
                var img = document.createElement('img');
                img.src=url;
                img.onload=function(){
                    img.style.height=(img.clientHeight+50)+'px';
                    // if(img.clientHeight<150){
                    //     console.log('height<150');
                    //     img.style.height = '175px';
                    // }else{
                    //     console.log('increased height');
                    //     img.style.height+=30;
                    // }
                }
                
                img.classList.add('img-padding');
                document.getElementById('static-images').appendChild(img);
            }else{
                found=false;
            }
        }
        // if(imgcall.includes('-standard')){
        //     imgcall=imgcall.replace('-standard','');
        // }
        // if(imgcall.includes('-solo')){
        //     imgcall=imgcall.replace('-solo','');
        // }
        // if(imgcall.includes('-normal')){
        //     imgcall=imgcall.replace('-normal','');
        // }
        //var imgURL='https://img.pokemondb.net/artwork/';
        //var imgURL='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
        imgURL+=imgcall;
        imgURL+='.gif';
        document.getElementById('pImage').src=imgURL;
    }
}
function testImage(url, callback, timeout) {
    timeout = timeout || 5000;
    var timedOut = false, timer;
    var img = new Image();
    img.onerror = img.onabort = function() {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, "error");
        }
    };
    img.onload = function() {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, "success");
        }
    };
    img.src = url;
    timer = setTimeout(function() {
        timedOut = true;
        callback(url, "timeout");
    }, timeout); 
}