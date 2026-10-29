# ONE BY ONE — prova download su GitHub Pages

Pagina nera con un solo pulsante Download. Nessuna installazione, compilazione o dipendenza necessaria.

Questa prova distribuisce ONE BY ONE 1.18.2, build 131, per Mac Apple Silicon (M1/M2/M3/M4 e successivi compatibili), macOS 13 o successivo. Non è una build per Mac Intel o Windows. L'app attualmente distribuita NON contiene ancora il controllo aggiornamenti: lo integreremo dopo aver definito l'URL pubblico.

## 1. Carica il sito

1. Su GitHub crea un nuovo repository pubblico, per esempio `obo-download`. Non caricare il codice sorgente dell'app: questo repository deve contenere soltanto il sito e gli installer nelle Releases.
2. Estrai lo ZIP preparato e apri la cartella `obo-download-test`.
3. Nel repository usa **Add file → Upload files** e carica il CONTENUTO della cartella direttamente alla radice: `index.html`, `download.js`, `updates.json`, `space-grotesk-500.woff2` e questo README. Se riesci includi anche `.nojekyll` (è nascosto; su Mac Cmd+Shift+.). La pagina funziona anche senza questo file.
4. Premi **Commit changes**.
5. Apri **Settings → Pages**.
6. In **Build and deployment**, imposta **Source: Deploy from a branch**, **Branch: main**, cartella **/(root)**. Premi **Save**.
7. Attendi che GitHub mostri il sito pubblicato. L'indirizzo sarà normalmente `https://TUO-USERNAME.github.io/obo-download/`. Usa l'URL indicato da GitHub e mandamelo.

Non serve un dominio personalizzato. Su questo URL GitHub Pages il pulsante individua automaticamente il repository, senza sostituire username nel codice.

## 2. Carica il DMG nella Release

L'installer NON va nella lista dei file del sito e NON va inserito nello ZIP del sito.

1. Usa il DMG già firmato e notarizzato che trovi qui:

   `/Users/pietrocazzago/Desktop/MIXED MEDIA APP/One by One Desktop 1.18.2 Notarized/ONE BY ONE.dmg`

2. Fanne una COPIA e rinomina soltanto la copia `ONE-BY-ONE-macOS-arm64.dmg`. Cambiare il nome esterno del file non modifica il suo contenuto.
3. Nel repository apri **Releases → Draft a new release** (oppure **Create a new release** se è la prima).
4. Crea il tag `v1.18.2`, titolo `ONE BY ONE 1.18.2`.
5. Nel riquadro per gli allegati binari trascina `ONE-BY-ONE-macOS-arm64.dmg`.
6. Aspetta che il caricamento finisca e premi **Publish release**. Per questa versione finale non selezionare “pre-release”.
7. Apri il sito e premi Download: deve scaricare il DMG allegato. Se ricevi 404, controlla che tag e nome dell'allegato corrispondano ESATTAMENTE a quelli di `updates.json`, e che la Release sia pubblicata e non in bozza.

## 3. Come pubblicare un aggiornamento in futuro

1. Prepara e verifica il nuovo installer; su Mac deve essere firmato e notarizzato.
2. Crea una nuova Release con un nuovo tag e allega il nuovo DMG. Conserva le Release precedenti.
3. Solo DOPO aver pubblicato e provato il download, modifica `updates.json` nel repository:
   - `version`: il nome pubblico della nuova versione
   - `build`: il numero intero della nuova build, sempre crescente
   - `minimumSystemVersion`: requisito reale della build
   - `releaseTag`: il tag esatto appena pubblicato
   - `assetName`: il nome esatto del nuovo allegato
4. Salva con **Commit changes** e attendi il completamento della pubblicazione Pages.
5. Il pulsante del sito userà queste informazioni. Dopo la futura integrazione, anche l'app leggerà questo file per proporre aggiornamenti compatibili.

Non inventare una versione/build più alta solo per fare una prova sul pubblico: l'avviso deve corrispondere a un installer reale. Faremo la simulazione del controllo aggiornamenti separatamente.

## Cambiare dominio o repository

Per un dominio personalizzato, valorizza `githubRepository` con `TUO-USERNAME/obo-download`. In alternativa imposta `downloadUrl` con il link HTTPS completo dell'allegato della Release. Quando definiamo l'indirizzo definitivo, aggiorneremo anche il collegamento usato dall'app per aprire la pagina download.

`downloadPage: "./"` indica la stessa cartella del sito; il futuro controllo nell'app dovrà risolverlo rispetto all'URL di `updates.json`. Le sole piattaforme pubblicabili devono essere quelle con un installer effettivamente disponibile e verificato.
