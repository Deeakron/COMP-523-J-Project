import { GoogleSpreadsheet } from 'google-spreadsheet';

//Test SheetId 194iz66ka28ejiDV6_iHtGyV7V6gK8QSl9eFb8cMC1IM
//Example url: http://localhost:3000?sheetId=194iz66ka28ejiDV6_iHtGyV7V6gK8QSl9eFb8cMC1IM

/* Resources used to access Google Spreadsheet */
//https://github.com/theoephraim/node-google-spreadsheet

/* Resources used to integrate Google Spreadsheet with React */
//https://dev.to/calvinpak/how-to-read-write-google-sheets-with-react-193l


/* Initialize the Google Sheet. This is required before any data can be accessed.
 * Input: sheetId for the Google Sheet
 * Output: doc object. This holds all of the sheet information. */
async function initSheet(sheetId) {
    var doc = new GoogleSpreadsheet(sheetId);

    //Make sure creds.json is up-to-date before using this!
    await doc.useServiceAccountAuth(require('./creds.json'));
    
    await doc.loadInfo();
    return doc;
}

/* Get the title of a Google Sheet.
 * Input: sheetId for the Google Sheet
 * Output: string. This is the Sheet Title. */
export async function getTitle(sheetId) {
    var doc = await initSheet(sheetId);
    return doc.title;
}

/* Get each row that contains a judge.
 * Input: doc object
 * Output: row object. This contains the row information. */
async function getJudgeRows(doc) {
    var sheet = doc.sheetsByIndex[0];
    var rows = await sheet.getRows();
    return rows;
}

/* Get each judge's name.
 * Input: sheetId for the Google Sheet
 * Output: array of strings */
export async function getJudges(sheetId) {
    var doc = await initSheet(sheetId);
    var rows = await getJudgeRows(doc);

    var judgeArray = []
    for (var i = 1; i < rows.length; i++) {
        judgeArray.push(rows[i].Judges);
    }
    return judgeArray;

}

/* Get each column that contains a participant.
 * Input: doc object
 * Output: array of cell objects. This contains the cell information. */
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

/* Get each participant's name.
 * Input: sheetId for the Google Sheet
 * Output: array of strings */
export async function getParticipants(sheetId) {
    var doc = await initSheet(sheetId);
    var cols = await getParticipantCols(doc);

    var participantsArray = []
    for (var i = 0; i < cols.length; i++) {
        participantsArray.push(cols[i].value);
    }
    return participantsArray;
}

/* Vote for 1st, 2nd, and 3rd place.
 * Input: 
    * sheetId for the Google Sheet
    * Judge Name
    * Event name
    * 1st Place participant 
    * 2nd Place participant
    * 3rd Place participant
 * Output: boolean indicating success or failure */
export async function vote(sheetId, judgeName, event, first, second, third) {
    if (first == second || second == third || first == third) {
        console.error("Do not vote for a team multiple times");
        return false;
    }
    if (!event) {
        console.error("Invalid round");
        return false;
    }
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
        console.error("Invalid Judge");
        return false;
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
        console.error("Invalid Participant");
        return false;
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
    return true;


}