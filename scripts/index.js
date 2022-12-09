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

    game.settings.register(MODULE_NAME, 'aaJournalName', {
        name: 'Aventurisches Arsenal Journalname',
        scope: 'world',
        config: true,
        type: String,
        default: 'AA'
    });

    game.settings.register(MODULE_NAME, 'aaOffset', {
        name: 'Aventurisches Arsenal PDF Offset',
        scope: 'world',
        config: true,
        type: Number,
        default: 1
    });

    game.settings.register(MODULE_NAME, 'avalmJournalName', {
        name: 'Aventurischer Almanach Journalname',
        scope: 'world',
        config: true,
        type: String,
        default: 'AvAlm'
    });

    game.settings.register(MODULE_NAME, 'avalmOffset', {
        name: 'Aventurischer Almanach PDF Offset',
        scope: 'world',
        config: true,
        type: Number,
        default: 1
    });

    game.settings.register(MODULE_NAME, 'egJournalName', {
        name: 'Elementare Gewalten Journalname',
        scope: 'world',
        config: true,
        type: String,
        default: 'GA'
    });
    
    game.settings.register(MODULE_NAME, 'egOffset', {
        name: 'Elementare Gewalten PDF Offset',
        scope: 'world',
        config: true,
        type: Number,
        default: 1
    });
    game.settings.register(MODULE_NAME, 'gaJournalName', {
        name: 'Geographica Aventurica Journalname',
        scope: 'world',
        config: true,
        type: String,
        default: 'GA'
    });
    
    game.settings.register(MODULE_NAME, 'gaOffset', {
        name: 'Geographia Aventurica PDF Offset',
        scope: 'world',
        config: true,
        type: Number,
        default: 1
    });

    game.settings.register(MODULE_NAME, 'hkJournalName', {
        name: 'Handelsherr und Kiepenkerl Journalname',
        scope: 'world',
        config: true,
        type: String,
        default: 'H&K'
    });
    
    game.settings.register(MODULE_NAME, 'hkOffset', {
        name: 'Handelsherr und Kiepenkerl PDF Offset',
        scope: 'world',
        config: true,
        type: Number,
        default: 1
    });

    game.settings.register(MODULE_NAME, 'srdJournalName', {
        name: 'Stäbe, Ringe, Dschinnenlampen Journalname',
        scope: 'world',
        config: true,
        type: String,
        default: 'SRD'
    });
    
    game.settings.register(MODULE_NAME, 'srdOffset', {
        name: 'Stäbe, Ringe, Dschinnenlampen PDF Offset',
        scope: 'world',
        config: true,
        type: Number,
        default: 1
    });

    game.settings.register(MODULE_NAME, 'tcdJournalName', {
        name: 'Tractatus contra Daemones Journalname',
        scope: 'world',
        config: true,
        type: String,
        default: 'TcD'
    });

    game.settings.register(MODULE_NAME, 'tcdOffset', {
        name: 'Tractatus contra Daemones PDF Offset',
        scope: 'world',
        config: true,
        type: Number,
        default: 1
    });

    game.settings.register(MODULE_NAME, 'vtuuJournalName', {
        name: 'Von Toten und Untoten Journalname',
        scope: 'world',
        config: true,
        type: String,
        default: 'VTuU'
    });

    game.settings.register(MODULE_NAME, 'vtuuOffset', {
        name: 'Von Toten und Untoten PDF Offset',
        scope: 'world',
        config: true,
        type: Number,
        default: 1
    });

    game.settings.register(MODULE_NAME, 'wdaJournalName', {
        name: 'Wege der Alchimie Journalname',
        scope: 'world',
        config: true,
        type: String,
        default: 'WdA'
    });

    game.settings.register(MODULE_NAME, 'wdaOffset', {
        name: 'Wege der Alchimie PDF Offset',
        scope: 'world',
        config: true,
        type: Number,
        default: 1
    });

    game.settings.register(MODULE_NAME, 'wdzJournalName', {
        name: 'Wege der Zauberei Journalname',
        scope: 'world',
        config: true,
        type: String,
        default: 'WdZ'
    });

    game.settings.register(MODULE_NAME, 'wdzOffset', {
        name: 'Wege der Zauberei PDF Offset',
        scope: 'world',
        config: true,
        type: Number,
        default: 2
    });

    game.settings.register(MODULE_NAME, 'zbaJournalName', {
        name: 'Zoo-Botanica Aventurica Journalname',
        scope: 'world',
        config: true,
        type: String,
        default: 'ZBA'
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
