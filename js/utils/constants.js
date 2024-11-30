// Constants declarations first
const NEGATIVE_PROMPTS = "blurry, bad quality, worst quality, low quality, low resolution, ugly, deformed";
const IMAGE_PRESETS = [
    { label: 'Custom', value: 'custom', w: null, h: null },
    { label: 'Square (512x512)', value: '512x512', w: 512, h: 512 },
    { label: 'Square HD (768x768)', value: '768x768', w: 768, h: 768 },
    { label: 'Square XL (1024x1024)', value: '1024x1024', w: 1024, h: 1024 },
    { label: 'Portrait (768x1024)', value: 'portrait', w: 768, h: 1024 },
    { label: 'Portrait HD (960x1280)', value: 'portraitHD', w: 960, h: 1280 },
    { label: 'Landscape (1024x768)', value: 'landscape', w: 1024, h: 768 },
    { label: 'Landscape HD (1280x960)', value: 'landscapeHD', w: 1280, h: 960 },
    { label: '16:9 (1024x576)', value: '16:9', w: 1024, h: 576 },
    { label: '3:2 (1024x683)', value: '3:2', w: 1024, h: 683 },
    { label: '4:3 (1024x768)', value: '4:3', w: 1024, h: 768 }
];

// Word dictionaries
const nomiDiSoggetti = ["man", "woman", "car", "cat", "dog", "house", "tree", "flower",
    "mountain", "river", "lake", "sea", "ocean", "beach", "city", "town", "village",
    "country", "continent", "planet", "star", "moon", "sun", "cloud", "rain", "snow",
    "storm", "wind", "earthquake", "volcano", "tornado", "hurricane", "flood", "drought",
    "fire", "ice", "sand", "desert", "forest", "jungle", "savannah", "prairie", "tundra",
    "swamp", "marsh", "lake", "river", "stream", "waterfall", "cave", "mountain", "hill",
    "valley", "plateau", "plain", "island", "peninsula", "archipelago", "oasis", "harbor"];
const aggettivi = ["beautiful", "ugly", "big", "small", "large", "tiny", "huge", "giant",
    "massive", "tiny", "microscopic", "enormous", "gigantic", "colossal", "immense",
    "vast", "deep", "shallow", "wide", "narrow", "long", "short", "tall", "high", "low",
    "fast", "slow", "quick", "swift", "rapid", "sudden", "abrupt", "gradual", "steady",
    "constant", "continuous", "intermittent", "frequent", "rare", "occasional", "periodic",
    "regular", "irregular", "random", "sporadic", "usual", "unusual", "strange", "weird",
    "odd", "bizarre", "peculiar", "curious", "mysterious", "secret", "hidden", "unknown",
    "famous", "popular", "well-known", "notorious", "infamous", "celebrated", "renowned",
    "illustrious", "eminent", "distinguished", "prominent", "prestigious", "reputable",
    "respected", "honored", "praised", "admired", "envied", "jealous", "coveted", "desired",
    "wanted", "sought-after", "cherished", "treasured", "valued", "precious", "priceless",
    "invaluable", "irreplaceable", "unique", "rare", "scarce", "uncommon", "unusual",
    "extraordinary", "exceptional", "remarkable", "noteworthy", "memorable", "unforgettable",
    "impressive", "striking", "stunning", "breathtaking", "awe-inspiring", "magnificent",
    "splendid", "glorious", "majestic", "grand", "stately", "dignified", "elegant", "graceful",
    "beautiful", "lovely", "charming", "delightful", "pleasant", "enjoyable", "wonderful",
    "marvelous", "amazing", "astonishing", "astounding", "incredible", "unbelievable",
    "fabulous", "fantastic", "terrific", "tremendous", "awesome", "outstanding", "excellent",
    "superb", "first-rate", "first-class", "top-notch", "high-quality", "superior", "premium",
    "elite", "world-class", "top-of-the-line", "best", "finest", "greatest", "ultimate",
    "perfect", "flawless", "impeccable", "exquisite", "splendid", "magnificent", "grand",
    "majestic", "stunning", "gorgeous", "beautiful", "lovely", "charming", "delightful",
    "pleasant"];
const verbi = ["run", "walk", "jump", "swim", "fly", "crawl", "climb", "fall", "rise", "sink",
    "float", "drift", "slide", "slip", "skate", "ski", "sail", "row", "paddle", "pedal", "drive",
    "ride", "gallop", "trot", "pace", "tread", "stomp", "stamp", "march", "dance", "skip", "hop",
    "leap", "bound", "spring", "bounce", "jog", "sprint", "dash", "dart", "rush", "hurry",
    "scramble", "scuttle", "scamper", "scurry", "hasten", "hurtle", "bolt", "charge", "plunge",
    "lunge", "dive", "drop", "plummet", "descend", "fall", "tumble", "topple", "slump", "collapse",
    "crumple", "crash", "crack", "break", "shatter", "splinter", "fracture", "burst", "explode",
    "erupt", "ignite", "burn", "melt", "freeze", "thaw", "boil", "steam", "evaporate", "condense",
    "dissolve", "disappear", "vanish", "fade", "dim", "shrink", "wither", "wilt", "shrivel",
    "decay", "rot", "mold", "mildew", "rust", "corrode", "crumble", "disintegrate", "deteriorate",
    "decompose", "putrefy", "fester", "spoil", "taint", "contaminate", "pollute", "infect",
    "infest", "invade", "attack", "assault", "raid", "ambush", "besiege", "blockade", "encircle",
    "surround", "trap", "snare", "entrap", "capture", "ensnare", "enslave", "imprison", "confine",
    "incarcerate", "lock", "shackle", "bind", "tie", "restrain", "restrict", "limit", "constrain",
    "hamper", "hinder", "impede", "obstruct", "block", "bar", "prevent", "prohibit", "forbid",
    "ban", "outlaw", "taboo", "censor", "suppress", "silence", "muzzle", "gag", "stifle", "smother",
    "strangle", "choke", "suffocate", "squelch", "quash", "crush", "squash", "flatten", "smash"];
const congiunzioni = ["and", "or", "but", "so", "because", "although", "though", "even though",
    "while", "whereas", "if", "unless", "until", "since", "after", "before", "when", "whenever",
    "while", "as", "as if", "as though", "than", "whether", "either", "neither", "both", "not only",
    "but also", "as well as", "instead of", "rather than", "in order to", "so that", "such that",
    "in case", "provided that", "assuming that", "given that", "once", "as soon as", "as long as",
    "until", "unless", "whenever", "wherever", "where", "why", "how", "what", "which", "who", "whom",
    "whose", "whichever", "whatever", "whoever", "whomever", "whosever", "however", "wherever"];
const preposizioni = ["in", "on", "at", "by", "with", "about", "of", "to", "from", "into", "onto",
    "upon", "out of", "off", "over", "under", "beneath", "below", "above", "up", "down", "through",
    "across", "around", "along", "against", "toward", "away from", "past", "before", "after",
    "behind", "beside", "between", "among", "within", "without", "outside", "inside", "near",
    "far", "next to", "opposite", "underneath", "inside", "outside", "between", "among", "beyond",
    "throughout", "alongside", "amid", "amidst", "amidst", "amongst", "around", "round", "about"];
const articoli = ["the", "a", "an"];

// Artists and styles arrays
const artists = ['Pablo Picasso', 'Vincent van Gogh', 'Leonardo da Vinci', 'Michelangelo', 'Claude Monet',
    'Rembrandt', 'Jackson Pollock', 'Andy Warhol', 'Salvador Dali', 'Georgia O\'Keeffe', 'Frida Kahlo',
    'Edvard Munch', 'Piet Mondrian', 'Henri Matisse', 'Paul Cezanne', 'Rene Magritte', 'Gustav Klimt',
    'Paul Klee', 'Marc Chagall', 'Joan Miro', 'Edgar Degas', 'Camille Pissarro', 'Mary Cassatt', 'Goya',
    'Caravaggio', 'Vermeer', 'Botticelli', 'Raphael', 'Titian', 'Giotto', 'El Greco', 'Rubens', 'Gainsborough',
    'Constable', 'Turner', 'Hogarth', 'Goya', 'Velazquez', 'El Greco', 'Gericault', 'Delacroix', 'Ingres',
    'Corot', 'Daumier', 'Courbet', 'Manet', 'Degas', 'Cezanne', 'Monet', 'Renoir', 'Pissarro', 'Sisley',
    'Morisot', 'Cassatt', 'Seurat', 'Van Gogh', 'Gauguin', 'Toulouse-Lautrec', 'Redon', 'Munch', 'Klimt',
    'Schiele', 'Kandinsky', 'Mondrian', 'Malevich', 'Picasso', 'Braque', 'Leger', 'Miro', 'Dali', 'Magritte',
    //anime and manga artists
    'Hayao Miyazaki', 'Isao Takahata', 'Mamoru Hosoda', 'Makoto Shinkai', 'Satoshi Kon', 'Masaaki Yuasa',
    'Mamoru Oshii', 'Katsuhiro Otomo', 'Hideaki Anno', 'Yoshiyuki Tomino', 'Osamu Tezuka', 'Leiji Matsumoto',
    'Go Nagai', 'Rumiko Takahashi', 'Akira Toriyama', 'Naoko Takeuchi', 'CLAMP', 'Masashi Kishimoto',
    'Eiichiro Oda', 'Hiromu Arakawa', 'Nobuhiro Watsuki', 'Yoshiyiro Togashi', 'Tite Kubo', 'Kentaro Miura',
    'Hajime Isayama', 'Kazuki Takahashi', 'Yoshiyuki Sadamoto',
    //comic book artists
    'Stan Lee', 'Jack Kirby', 'Steve Ditko', 'Bob Kane', 'Bill Finger', 'Jerry Siegel', 'Joe Shuster',
    'Will Eisner', 'Frank Miller', 'Alan Moore', 'Neil Gaiman', 'Grant Morrison', 'Brian K. Vaughan',
    'Robert Kirkman', 'Mark Millar', 'Ed Brubaker', 'Brian Michael Bendis', 'Geoff Johns', 'Jim Lee',
    'Todd McFarlane', 'Rob Liefeld', 'John Romita Sr.', 'John Romita Jr.', 'John Buscema', 'Sal Buscema',
    'John Byrne', 'George Perez', 'Walt Simonson', 'Jim Starlin', 'Mike Mignola', 'Frank Quitely',
    'Dave Gibbons', 'John Cassaday', 'J.H. Williams III', 'Jae Lee', 'Alex Ross', 'Adam Hughes', 'Frank Cho',
    'Amanda Conner', 'Gail Simone',
    //game artists
    'Shigeru Miyamoto', 'Satoru Iwata', 'Hideo Kojima', 'Shinji Mikami', 'Hideki Kamiya', 'Yoko Taro',
    'Yoshitaka Amano', 'Tetsuya Nomura', 'Akira Toriyama', 'Yusuke Naora', 'Yoshitaka Murayama',
    'Yasumi Matsuno',   'Akihiko Yoshida', 'Tetsuya Takahashi', 'Kazuma Kaneko', 
    //concept artists
    'Syd Mead', 'Ralph McQuarrie', 'H.R. Giger', 'Moebius', 'Ron Cobb', 'Geof Darrow', 'Ian McCaig',
    'Doug Chiang', 'Ryan Church', 'Erik Tiemens', 'Iain McCaig', 'Terryl Whitlatch', 'Dermot Power',
    'Jake Lunt Davies', 'Christian Alzmann', 'Feng Zhu', 'Neville Page', 'Aaron Sims', 'Dylan Cole',
    'James Clyne', 'Ryan Meinerding', 'Andy Park', 'Charlie Wen', 'Anthony Francisco', 'Jackson Sze',
    'Rodney Fuentebella', 'John Staub', 'Jama Jurabaev', 'Raphael Lacoste', 'Sparth', 'Paul Chadeisson',
    'Maciej Kuciara', 'Aaron Beck', 'Eytan Zana', 'Kalen Chock', 'Nick Gindraux', 'Brian Matyas',
    'Karla Ortiz', 'Brett Northcutt', 'Sean Hargreaves', 'Hans Bacher', 'Bill Perkins', 'Peter Chan',
    //digital artists
    'Craig Mullins', 'Bobby Chiu', 'Loish', 'Sycra Yasin', 'Noah Bradley', 'Aaron Blaise', 'Nathan Fowkes',
    'James Gurney', 'Ilya Kuvshinov', 'Ross Tran', 'Stan Prokopenko', 'Ahmed Aldoori', 'Jazza',
    'Kienan Lafferty', 'Sinix', 'Alphonso Dunn', 'Marco Bucci', 'Ethan Becker', 'Will Terry',
    'Jake Parker', 'Chris Oatley', 'Stephen Silver', 'Tom Bancroft', 'Brenda Chapman', 'Glen Keane',
    'Peter De Seve', 'Ron Clements', 'John Musker', 'Don Bluth', 'Richard Williams', 'Glen Vilppu',
    'Aaron Blaise', 'Ron Husband', 'Bill Perkins', 'David Colman', 'David Kassan', 'Jeremy Lipking',
    'Casey Baugh', 'Scott Waddell', 'Dan Thompson', 'Jeff Watts', 'Steve Huston', 'Karl Gnass',
    'Ron Lemen', 'Mark Westermoe', 'Charles Hu', 'Rebecca Guay', 'Donato Giancola', 'Brom', 'Justin Sweet'
];
const STYLES = [{
    type: 'anime', prompt: 'Anime style , beautiful, colorful, vibrant, detailed, intricate, complex'
}, {
    type: 'realistic', prompt: 'Realistic style, detailed, intricate, complex, lifelike, realistic, natural'
}, {
    type: 'cartoon', prompt: 'Cartoon style, simple, colorful, vibrant, exaggerated, playful, whimsical'
}, {
    type: 'abstract', prompt: 'Abstract style, colorful, vibrant, detailed, intricate, complex, surreal, dreamlike'
}, {
    type: 'painting', prompt: 'Painting style, colorful, vibrant, detailed, intricate, complex, textured, brush strokes'
}, {
    type: 'sketch', prompt: 'Sketch style, black and white, simple, rough, loose, quick, sketchy'
}, {
    type: 'pixel', prompt: 'Pixel art style, pixelated, blocky, retro, 8-bit, 16-bit, video game'
}, {
    type: 'watercolor', prompt: 'Watercolor style, colorful, vibrant, detailed, intricate, complex, textured, brush strokes'
}, {
    type: 'oil', prompt: 'Oil painting style, colorful, vibrant, detailed, intricate, complex, textured, brush strokes'
}, {
    type: 'pencil', prompt: 'Pencil drawing style, black and white, simple, detailed, intricate, complex, textured, sketchy'
}];
const TECHNIQUES = [{
    type: 'portrait', prompt: 'Portrait, face, head, person, human, character, people, individual, close-up'
}, {
    type: 'landscape', prompt: 'Landscape, scenery, nature, environment, outdoors, view, horizon, mountains, trees, sky'
}, {
    type: 'still life', prompt: 'Still life, objects, items, arrangement, composition, table, room, interior, scene'
}, {
    type: 'abstract', prompt: 'Abstract, non-representational, non-objective, conceptual, experimental, avant-garde'
}, {
    type: 'concept art', prompt: 'Concept art, design, idea, concept, visual development, character design, environment design'
}, {
    type: 'character design', prompt: 'Character design, character, person, human, creature, monster, alien, robot, fantasy'
}, {
    type: 'environment design', prompt: 'Environment design, environment, world, setting, scene, background, location, place'
}, {
    type: 'illustration', prompt: 'Illustration, drawing, image, picture, graphic, visual, artwork, design, composition'
}, {
    type: 'comic', prompt: 'Comic, cartoon, strip, graphic novel, manga, webcomic, comic book, sequential art'
}, {
    type: 'manga', prompt: 'Manga, Japanese, anime, comic, style, art, illustration, cartoon, character, design'
}];
const CATEGORIES = [{
    type: 'fantasy', prompt: 'Fantasy, magical, mystical, enchanted, mythical, fairy tale, legend, folklore, mythology'
}, {
    type: 'sci-fi', prompt: 'Sci-fi, science fiction, futuristic, space, technology, alien, robot, cyberpunk, dystopian'
}, {
    type: 'horror', prompt: 'Horror, scary, spooky, creepy, eerie, macabre, dark, frightening, terrifying, suspenseful'
}, {
    type: 'superhero', prompt: 'Superhero, hero, superpower, comic, cape, mask, villain, sidekick, team, league'
}, {
    type: 'steampunk', prompt: 'Steampunk, Victorian, retro-futuristic, steam-powered, gears, clockwork, brass, copper'
}, {
    type: 'cyberpunk', prompt: 'Cyberpunk, futuristic, high-tech, neon, urban, dystopian, hacker, cyborg, AI, virtual reality'
}, {
    type: 'medieval', prompt: 'Medieval, historical, knight, castle, kingdom, sword, shield, armor, dragon, fantasy'
}, {
    type: 'western', prompt: 'Western, cowboy, gunslinger, sheriff, saloon, horse, desert, frontier, wild west'
}, {
    type: 'pirate', prompt: 'Pirate, swashbuckler, ship, sea, ocean, treasure, captain, crew, adventure, pirate'
}, {
    type: 'space', prompt: 'Space, sci-fi, stars, planets, galaxy, universe, astronaut, spaceship, alien, exploration'
}];

// Add new preset combinations
const PRESET_COMBINATIONS = {
    portraits: [
        {
            name: "Classic Portrait",
            prompt: "Professional portrait, studio lighting, high-end camera, shallow depth of field",
            style: "realistic",
            artist: "Steve McCurry"
        },
        // Add more presets...
    ],
    landscapes: [
        {
            name: "Dreamy Landscape",
            prompt: "Ethereal landscape, golden hour, misty atmosphere, panoramic view",
            style: "painting",
            artist: "Thomas Kinkade"
        },
        // Add more presets...
    ],
    // Add more categories...
};

// Add more specific style definitions
const STYLE_DETAILS = {
    lighting: [
        { name: "Natural", params: { brightness: 1, contrast: 1 } },
        { name: "Studio", params: { brightness: 1.2, contrast: 1.1 } },
        // Add more...
    ],
    // Add more categories...
};

// Generator functions
const getLargeListSuggestedPrompts = () => {
    const prompts = [];
    for (let i = 0; i < 20; i++) { // Generate 20 different prompts
        let prompt = '';

        // Add an article
        prompt += articoli[Math.floor(Math.random() * articoli.length)] + ' ';

        // Add 1-2 adjectives
        for (let j = 0; j < 1 + Math.floor(Math.random() * 2); j++) {
            prompt += aggettivi[Math.floor(Math.random() * aggettivi.length)] + ' ';
        }

        // Add a subject
        prompt += nomiDiSoggetti[Math.floor(Math.random() * nomiDiSoggetti.length)] + ' ';

        // Add a verb
        prompt += verbi[Math.floor(Math.random() * verbi.length)] + ' ';

        // Add a preposition
        prompt += preposizioni[Math.floor(Math.random() * preposizioni.length)] + ' ';

        // Add another subject with adjective
        prompt += articoli[Math.floor(Math.random() * articoli.length)] + ' ';
        prompt += aggettivi[Math.floor(Math.random() * aggettivi.length)] + ' ';
        prompt += nomiDiSoggetti[Math.floor(Math.random() * nomiDiSoggetti.length)];

        prompts.push(prompt.trim());
    }

    return prompts;
};

const generateRandomPrompts = () => {
    const prompts = [];
    for (let i = 0; i < 20; i++) {
        let prompt = '';
        prompt += articoli[Math.floor(Math.random() * articoli.length)] + ' ';
        prompt += aggettivi[Math.floor(Math.random() * aggettivi.length)] + ' ';
        prompt += nomiDiSoggetti[Math.floor(Math.random() * nomiDiSoggetti.length)] + ' ';
        prompt += verbi[Math.floor(Math.random() * verbi.length)] + ' ';
        prompt += preposizioni[Math.floor(Math.random() * preposizioni.length)] + ' ';
        prompt += articoli[Math.floor(Math.random() * articoli.length)] + ' ';
        prompt += nomiDiSoggetti[Math.floor(Math.random() * nomiDiSoggetti.length)];
        prompts.push(prompt.trim());
    }
    return prompts;
};

// Helper functions
const getRandomPrompt = () => {
    const prompts = generateRandomPrompts();
    return prompts[Math.floor(Math.random() * prompts.length)];
};

const getArtistPrompt = () => `Art style inspired by ${artists[Math.floor(Math.random() * artists.length)]}`;
const getStylePrompt = () => STYLES[Math.floor(Math.random() * STYLES.length)].prompt;
const getTechniquePrompt = () => TECHNIQUES[Math.floor(Math.random() * TECHNIQUES.length)].prompt;
const getCategoryPrompt = () => CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)].prompt;

const SUGGESTED_PROMPTS = getLargeListSuggestedPrompts();

const getPrompts = () => {
    return SUGGESTED_PROMPTS;
};

const getPresets = () => {
    return IMAGE_PRESETS;
};

const getNegativePrompts = () => {
    return NEGATIVE_PROMPTS;
};

const getApiKey = () => {
    return localStorage.getItem('huggingface_api_key');
};

const setApiKey = (apiKey) => {
    localStorage.setItem('huggingface_api_key', apiKey);
}

export const QUALITY_PRESETS = {
    DEFAULT: ['high quality', 'detailed'],
    HIGH: ['masterpiece', 'high quality', 'detailed', 'sharp focus', '8k'],
    MEDIUM: ['high quality', 'detailed'],
    LOW: ['basic quality']
};

export {
    getPrompts,
    getPresets,
    getNegativePrompts,
    getApiKey,
    setApiKey,
    getArtistPrompt,
    getStylePrompt,
    getTechniquePrompt,
    getCategoryPrompt,
    getRandomPrompt,
    // Add these exports
    STYLES,
    TECHNIQUES,
    CATEGORIES,
    artists,
    nomiDiSoggetti,
    aggettivi,
    verbi,
    preposizioni,
    articoli,
    NEGATIVE_PROMPTS
};
