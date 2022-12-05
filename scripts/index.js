import { JournalLink } from './journallink.js';

// bump this to cause a sync on page load (one time)
const SYNC_VERSION = 1;

const MODULE_NAME = 'dsa-41-compendiums';

Hooks.on("init", () => {
    console.log('dsa-41-compendiums | initializing');

    game.settings.register(MODULE_NAME, 'showCompendiumLinks', {
        name: 'Kompendium Links anzeigen',
        scope: 'world',
        config: true,
        type: Boolean,
        default: true
    });

    game.settings.register(MODULE_NAME, 'aaOffset', {
        name: 'Aventurisches Arsenal PDF Offset',
        scope: 'world',
        config: true,
        type: Number,
        default: 1
    });

    game.settings.register(MODULE_NAME, 'avalmOffset', {
        name: 'Aventurischer Almanach PDF Offset',
        scope: 'world',
        config: true,
        type: Number,
        default: 1
    });
    
    game.settings.register(MODULE_NAME, 'gaOffset', {
        name: 'Geographia Aventurica PDF Offset',
        scope: 'world',
        config: true,
        type: Number,
        default: 1
    });
    
    game.settings.register(MODULE_NAME, 'hkOffset', {
        name: 'Handelsherr und Kiepenkerl PDF Offset',
        scope: 'world',
        config: true,
        type: Number,
        default: 1
    });
    
    game.settings.register(MODULE_NAME, 'srdOffset', {
        name: 'Stäbe, Ringe, Dschinnenlampen PDF Offset',
        scope: 'world',
        config: true,
        type: Number,
        default: 1
    });

    game.settings.register(MODULE_NAME, 'wdaOffset', {
        name: 'Wege der Alchimie PDF Offset',
        scope: 'world',
        config: true,
        type: Number,
        default: 1
    });

    game.settings.register(MODULE_NAME, 'zbaOffset', {
        name: 'Zoo-Botanica Aventurica PDF Offset',
        scope: 'world',
        config: true,
        type: Number,
        default: 1
    });

    let jl = new JournalLink();
    game.dsa41CompendiumsJournalLink = jl;

    // things to run on render
    // https://foundryvtt.com/api/modules/hookEvents.html#renderApplication
    Hooks.on('renderActorSheet', game.dsa41CompendiumsJournalLink.includeActorLinks.bind(jl));
    Hooks.on('renderItemSheet', game.dsa41CompendiumsJournalLink.includeItemLinks.bind(jl));
});
