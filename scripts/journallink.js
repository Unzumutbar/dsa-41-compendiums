const MODULE_NAME = 'dsa-41-compendiums';

export class JournalLink {

    includeActorLinks(sheet, html, data) {
        const showLinks = game.settings.get(MODULE_NAME, 'showCompendiumLinks')
        if(!showLinks) {
            return;
        }

        const linksDiv = this.getHtmlLinkDiv(data.actor);
        if(linksDiv === undefined) {
            return;
        }

        let charNameDiv = html[0].getElementsByClassName ('character-name')[0];        
        charNameDiv.appendChild(linksDiv);
    }

    includeItemLinks(sheet, html, data) {
        const showLinks = game.settings.get(MODULE_NAME, 'showCompendiumLinks')
        if(!showLinks) {
            return;
        }

        const linksDiv = this.getHtmlLinkDiv(data.item);
        if(linksDiv === undefined) {
            return;
        }

        let itemControlsDiv = html[0].getElementsByClassName ('item-controls')[0];        
        itemControlsDiv.appendChild(linksDiv);
    }

    getHtmlLinkDiv(entityData) {
        let sourceBook = "";
        let sourceBookPage = "";

        try {
            const bookAndPage = this.getSourceBookAndPage(entityData);
            sourceBook = bookAndPage.sourceBook
            sourceBookPage = bookAndPage.sourceBookPage
        } catch {
            console.log(entityData);
            return undefined;
        }

        if(!this.isSourceBookValid(sourceBook, sourceBookPage)){
            this.log(`Sourcebook is invalid: ${sourceBook}:${sourceBookPage}.`);
            return;
        }

        let linksDiv = $('<div class="journal-backlinks"></div>');
        let link = $(`<a class="content-link" draggable="true"></a>`);
        let icon = 'fas ';
        icon += 'fa-book';

        link.append($('<i class="' + icon + '"></i>'));
        link.append(' Quelle: ' + sourceBook + ' ' + sourceBookPage);

        let p = $('<p></p>');
        p.append(link);

        linksDiv.append(p);
        const linksDivElement = document.createElement('div');
        linksDivElement.innerHTML = linksDiv[0].innerHTML;

        linksDivElement
            .querySelector('a')
            .addEventListener('click', function() { game.dsa41CompendiumsJournalLink.openPdfPage(sourceBook, sourceBookPage) }, false);

        return linksDivElement;
    }

    getSourceBookAndPage(entityData)
    {
        switch (entityData.type) {
            case 'character':
            case 'genericItem':
                return {
                    'sourceBook': entityData.system.sourceBook,
                    'sourceBookPage': entityData.system.sourceBookPage
                };
            case 'meleeWeapon':
            case 'rangedWeapon':
            case 'shield':
            case 'armor':
                return {
                    'sourceBook': 'AA',
                    'sourceBookPage': entityData.system.aaPage
                };
            default:
                return undefined;            
        }
    }

    isSourceBookValid(sourceBook, sourceBookPage) {
        return sourceBook && sourceBookPage && sourceBook.trim() !== ''; 
    }

    openPdfPage(sourceBook, page) {
        const journalName = this.getSourceBookJournalName(sourceBook).trim();
        const bookJournal = game.journal?.find((j) => j.name.trim() == journalName);
        if(!bookJournal) {
            this.log(`Unable to find Journal ${journalName}.`);
            return;
        }

        const pdfSheetId = bookJournal?.pages.contents[0].id;
        const pdfPageSheet = bookJournal?.sheet?.getPageSheet(pdfSheetId);
        const pageOffset = this.getSourceBookOffset(sourceBook);

        pdfPageSheet.page = page + pageOffset;
        pdfPageSheet.autoLoadPDF = true;
        bookJournal.sheet?.render(true, { collapsed: true });
    }

    getSourceBookJournalName(sourceBook) {
        const book = sourceBook.toLowerCase();
        switch (book) {
            case 'aa':
                return game.settings.get(MODULE_NAME, 'aaJournalName');
            case 'avalm':
                return game.settings.get(MODULE_NAME, 'avalmJournalName');
            case 'ga':
                return game.settings.get(MODULE_NAME, 'gaJournalName');
            case 'h&k':
                return game.settings.get(MODULE_NAME, 'hkJournalName');
            case 'srd':
                return game.settings.get(MODULE_NAME, 'srdJournalName');
            case 'wda':
                return game.settings.get(MODULE_NAME, 'wdaJournalName');
            case 'zba':
                return game.settings.get(MODULE_NAME, 'zbaJournalName');
            default:
                this.log(`Missing Option for ${sourceBook} Offset.`);
                return sourceBook;
        }
    }

    getSourceBookOffset(sourceBook) {
        const book = sourceBook.toLowerCase();
        switch (book) {
            case 'aa':
                return game.settings.get(MODULE_NAME, 'aaOffset');
            case 'avalm':
                return game.settings.get(MODULE_NAME, 'avalmOffset');
            case 'ga':
                return game.settings.get(MODULE_NAME, 'gaOffset');
            case 'h&k':
                return game.settings.get(MODULE_NAME, 'hkOffset');
            case 'srd':
                return game.settings.get(MODULE_NAME, 'srdOffset');
            case 'wda':
                return game.settings.get(MODULE_NAME, 'wdaOffset');
            case 'zba':
                return game.settings.get(MODULE_NAME, 'zbaOffset');
            default:
                this.log(`Missing Option for ${book} Offset.`);
                return 0;
        }
    }

    log(text) {
        console.log('dsa41-compendiums | ' + text);
    }
}
