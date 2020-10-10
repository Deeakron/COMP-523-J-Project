import { GoogleSpreadsheet } from 'google-spreadsheet';

// spreadsheet key is the long id in the sheets URL
//const doc = new GoogleSpreadsheet('194iz66ka28ejiDV6_iHtGyV7V6gK8QSl9eFb8cMC1IM');

//https://dev.to/calvinpak/how-to-read-write-google-sheets-with-react-193l
//https://github.com/theoephraim/node-google-spreadsheet

async function initSheet(sheetId) {  
    var doc = new GoogleSpreadsheet(sheetId);
    await doc.useServiceAccountAuth(require('./creds.json'));
    await doc.loadInfo();
    return doc;
}

export async function getTitle(sheetId) {
    var doc = await initSheet(sheetId);
    return doc.title;
}

async function getJudgeRows(doc) {
    var sheet = doc.sheetsByIndex[0];
    var rows = await sheet.getRows();
    return rows;
}

export async function getJudges(sheetId) {
    var doc = await initSheet(sheetId);
    var rows = await getJudgeRows(doc);

    var judgeArray = []
    for (var i = 1; i < rows.length; i++) {
        judgeArray.push(rows[i].Judges);
    }
    return judgeArray;

}

async function getParticipantCols(doc) {
    var sheet = doc.sheetsByIndex[0];
    await sheet.loadCells('C2:Z2');
    var cols = []
    for (var i = 2; i < 24; i++) {
        var cell = sheet.getCell(1,i);
        var participant = cell.value;
        if (participant !== null) {
            cols.push(cell);
        }
    }
    return cols;
}

export async function getParticipants(sheetId) {
    var doc = await initSheet(sheetId);
    var cols = await getParticipantCols(doc);

    var participantsArray = []
    for (var i = 0; i < cols.length; i++) {
        participantsArray.push(cols[i].value);
    }
    return participantsArray;
}

export async function vote(sheetId, judgeName, event, first, second, third) {
    var doc = await initSheet(sheetId);
    var rows = await getJudgeRows(doc);
    var cols = await getParticipantCols(doc);

    var row;
    var hit = 0;
    for (var i in rows) {
        if (rows[i].Judges == judgeName) {
            hit = 1;
            row = rows[i].rowNumber-1;
        }
    }
    if (hit !== 1) {
        console.error("Duplicate or invalid Judge");
        return;
    }

    var col1;
    var col2;
    var col3;
    hit = 0;
    for (var j = 0; j < cols.length; j++) {
        var cell = cols[j];
        var participant = cell.value;
        if (participant == first) {
            hit++;
            col1 = cell.columnIndex;
        } else if (participant == second) {
            hit++;
            col2 = cell.columnIndex;
        } else if (participant == third) {
            hit++;
            col3 = cell.columnIndex;
        }
    }
    if (hit !== 3) {
        console.error("Duplicate or invalid Participant");
        return;
    }

    
    var sheet = doc.sheetsByIndex[0];
    var range = 'A'+row-+':Z'+row;
    await sheet.loadCells(range);
    sheet.getCell(row,1).value = event;

    for (j = 0; j < cols.length; j++) {
        var index = j+2;
        if (index == col1) {
            hit++;
            sheet.getCell(row,col1).value = "#1";
        } else if (index == col2) {
            hit++;
            sheet.getCell(row,col2).value = "#2";
        } else if (index == col3) {
            hit++;
            sheet.getCell(row,col3).value = "#3";
        } else {
            sheet.getCell(row,index).value = "";
        }
    }
    await sheet.saveUpdatedCells();

}

export async function dostuff() {
    var doc = new GoogleSpreadsheet('194iz66ka28ejiDV6_iHtGyV7V6gK8QSl9eFb8cMC1IM');
    // OR load directly from json file if not in secure environment
    await doc.useServiceAccountAuth(require('./creds.json'));

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    var sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
    console.log(sheet.title);
    console.log(sheet.rowCount);

    await sheet.loadCells('C2:Z2');
    for (var i = 2; i < 24; i++) {
        var participant = sheet.getCell(1,i).value;
        if (participant !== null) {
            console.log(participant);
        }
    }

    var rows = await sheet.getRows();
    console.log(rows[3].Judges); // 'Larry Page'
    rows[3].Round = 'test'; // update a value
    await rows[3].save(); // save updates
}