// not yet used
const roles = [
    '1 - Tank',
    '2 - Healer',
    '3 - DPS'
]
// not yet used
const keystones = [
"1 - DOS",
"2 - HOA",
"3 - MISTS",
"4 - NW",
"5 - PF",
"6 - SD",
"7 - SOA",
"8 - TOP"
]
// not yet used
const regions = [
    "1 - Americas & Oceanic",
    "2 - Europe [not supported yet]",
    "3 - Korea [not supported yet",
    "4 - Taiwan [not supported yet]"
]

const americas_and_oceanic_realms = [
"Aegwynn",
"Aerie Peak",
"Agamaggan",
"Aggramar",
"Akama",
"Alexstrasza",
"Alleria",
"Altar of Storms",
"Alterac Mountains",
"Aman'Thul",
"Andorhal",
"Anetheron",
"Antonidas",
"Anub'arak",
"Anvilmar",
"Arathor",
"Archimonde",
"Area 52",
"Argent Dawn",
"Arthas","Arygos",
"Auchindoun",
"Azgalor",
"Azjol-Nerub",
"Azralon",
"Azshara",
"Azuremyst",
"Baelgun",
"Balnazzar",
"Barthilas",
"Black Dragonflight",
"Blackhand",
"Blackrock",
"Blackwater Raiders",
"Blackwing Lair",
"Blade's Edge",
"Bladefist",
"Bleeding Hollow",
"Blood Furnace",
"Bloodhoof",
"Bloodscalp",
"Bonechewer",
"Borean Tundra",
"Boulderfist",
"Bronzebeard",
"Burning Blade",
"Burning Legion",
"Caelestrasz",
"Cairne",
"Cenarion Circle",
"Cenarius",
"Cho'gall",
"Chromaggus",
"Coilfang",
"Crushridge",
"Daggerspine",
"Dalaran",
"Dalvengyr",
"Dark Iron",
"Darkspear",
"Darrowmere",
"Dath'Remar",
"Dawnbringer",
"Deathwing",
"Demon Soul",
"Dentarg",
"Destromath",
"Dethecus",
"Detheroc",
"Doomhammer",
"Draenor",
"Dragonblight",
"Dragonmaw",
"Drak'Tharon",
"Drak'thul",
"Draka",
"Drakkari",
"Dreadmaul",
"Drenden",
"Dunemaul",
"Durotan",
"Duskwood",
"Earthen Ring",
"Echo Isles",
"Eitrigg",
"Eldre'Thalas",
"Elune",
"Emerald Dream",
"Eonar",
"Eredar",
"Executus",
"Exodar",
"Farstriders",
"Feathermoon",
"Fenris",
"Firetree",
"Fizzcrank",
"Frostmane",
"Frostmourne",
"Frostwolf",
"Galakrond",
"Gallywix",
"Garithos",
"Garona",
"Garrosh",
"Ghostlands",
"Gilneas",
"Gnomeregan",
"Goldrinn",
"Gorefiend",
"Gorgonnash",
"Greymane",
"Grizzly Hills",
"Gul'dan",
"Gundrak",
"Gurubashi",
"Hakkar",
"Haomarush",
"Hellscream",
"Hydraxis",
"Hyjal",
"Icecrown",
"Illidan",
"Jaedenar",
"Jubei'Thos",
"Kael'thas",
"Kalecgos",
"Kargath",
"Kel'Thuzad",
"Khadgar",
"Khaz Modan",
"Khaz'goroth",
"Kil'jaeden",
"Kilrogg",
"Kirin Tor",
"Korgath",
"Korialstrasz",
"Kul Tiras",
"Laughing Skull",
"Lethon",
"Lightbringer",
"Lightning's Blade",
"Lightninghoof",
"Llane",
"Lothar",
"Madoran",
"Maelstrom",
"Magtheridon",
"Maiev",
"Mal'Ganis",
"Malfurion",
"Malorne",
"Malygos",
"Mannoroth",
"Medivh",
"Misha",
"Mok'Nathal",
"Moon Guard",
"Moonrunner",
"Mug'thol",
"Muradin",
"Nagrand",
"Nathrezim",
"Nazgrel",
"Nazjatar",
"Nemesis",
"Ner'zhul",
"Nesingwary",
"Nordrassil",
"Norgannon",
"Onyxia",
"Perenolde",
"Proudmoore",
"Quel'Thalas",
"Quel'dorei",
"Ragnaros",
"Ravencrest",
"Ravenholdt",
"Rexxar",
"Rivendare",
"Runetotem",
"Sargeras",
"Saurfang",
"Scarlet Crusade",
"Scilla",
"Sen'jin",
"Sentinels",
"Shadow Council",
"Shadowmoon",
"Shadowsong",
"Shandris",
"Shattered Halls",
"Shattered Hand",
"Shu'halo",
"Silver Hand",
"Silvermoon",
"Sisters of Elune",
"Skullcrusher",
"Skywall",
"Smolderthorn",
"Spinebreaker",
"Spirestone",
"Staghelm",
"Steamwheedle Cartel",
"Stonemaul",
"Stormrage",
"Stormreaver",
"Stormscale",
"Suramar",
"Tanaris",
"Terenas",
"Terokkar",
"Thaurissan",
"The Forgotten Coast",
"The Scryers",
"The Underbog",
"The Venture Co",
"Thorium Brotherhood",
"Thrall",
"Thunderhorn",
"Thunderlord",
"Tichondrius",
"Tol Barad",
"Tortheldrin",
"Trollbane",
"Turalyon",
"Twisting Nether",
"Uldaman",
"Uldum",
"Undermine",
"Ursin",
"Uther",
"Vashj",
"Vek'nilash",
"Velen",
"Warsong",
"Whisperwind",
"Wildhammer",
"Windrunner",
"Winterhoof"
]

// Season 3 menu
// const key_menu =
// [
//     {
//         label: 'DOS',
//         description: 'De Other Side',
//         value: 'DOS',
//     },
//     {
//         label: 'GMBT',
//         description: "Tazavesh: So'leah's Gambit",
//         value: 'GMBT',
//     },
//     {
//         label: 'HOA',
//         description: 'Halls of Atonement',
//         value: 'HOA',
//     },
//     {
//         label: 'MISTS',
//         description: 'Mists of Tirna Scithe',
//         value: 'MISTS',
//     },
//     {
//         label: 'NW',
//         description: 'Necrotic Wake',
//         value: 'NW',
//     },
//     {
//         label: 'PF',
//         description: 'Plaguefall',
//         value: 'PF',
//     },
//     {
//         label: 'SD',
//         description: 'Sanguine Depths',
//         value: 'SD',
//     },
//     {
//         label: 'SOA',
//         description: 'Spires of Ascension',
//         value: 'SOA',
//     },
//     {
//         label: 'STRT',
//         description: 'Tazavesh: Streets of Wonder',
//         value: 'STRT',
//     },
//     {
//         label: 'TOP',
//         description: 'Theater of Pain',
//         value: 'TOP',
//     }
// ]

// SL Season 4 menu
const key_menu =
[
    {
        label: 'GD',
        description: 'Grimrail Depot',
        value: 'GD',
    },
    {
        label: 'GMBT',
        description: "Tazavesh: So'leah's Gambit",
        value: 'GMBT',
    },
    {
        label: 'ID',
        description: 'Iron Docks',
        value: 'ID',
    },
    {
        label: 'LOWR',
        description: 'Return to Karazhan: Lower',
        value: 'LOWR',
    },
    {
        label: 'STRT',
        description: 'Tazavesh: Streets of Wonder',
        value: 'STRT',
    },
    {
        label: 'UPPR',
        description: 'Return to Karazhan: Upper',
        value: 'UPPR',
    },
    {
        label: 'WORK',
        description: 'Operation Mechagon: Workshop',
        value: 'WORK',
    },
    {
        label: 'YARD',
        description: 'Operation Mechagon: Junkyard',
        value: 'YARD',
    }
]

const key_level_menu =
[
    {
        label: '+2',
        value: '2',
    },
    {
        label: '+3',
        value: '3',
    },
    {
        label: '+4',
        value: '4',
    },
    {
        label: '+5',
        value: '5',
    },
    {
        label: '+6',
        value: '6',
    },
    {
        label: '+7',
        value: '7',
    },
    {
        label: '+8',
        value: '8',
    },
    {
        label: '+9',
        value: '9',
    },
    {
        label: '+10',
        value: '10',
    },
    {
        label: '+11',
        value: '11',
    },
    {
        label: '+12',
        value: '12',
    },
    {
        label: '+13',
        value: '13',
    },
    {   
        label: '+14',
        value: '14',
    },
    {
        label: '+15',
        value: '15',
    },
    {  
        label: '+16',
        value: '16',
    },
    {  
        label: '+17',
        value: '17',
    },
    {  
        label: '+18',
        value: '18',
    },
    {  
        label: '+19',
        value: '19',
    },
    {  
        label: '+20',
        value: '20',
    },
    {  
        label: '+21',
        value: '21',
    },
    {  
        label: '+22',
        value: '22',
    },
    {  
        label: '+23',
        value: '23',
    },
    {  
        label: '+24',
        value: '24',
    },
    {  
        label: '+25',
        value: '25',
    },
    {  
        label: '(My key is greater than 25)',
        value: '25+++',
    }
    
]

exports.roles = roles;
exports.keystones = keystones;
exports.regions = regions;
exports.americas_and_oceanic_realms = americas_and_oceanic_realms;
exports.key_menu = key_menu;
exports.key_level_menu = key_level_menu;