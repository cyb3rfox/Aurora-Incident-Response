
function loadSOD(sqlite_db){

    var fs = require('fs');
    var SQL = require('sql.js');
    var filebuffer = fs.readFileSync(sqlite_db);

// Load the db
    var db = new SQL.Database(filebuffer);

    var stmt = db.prepare("SELECT * FROM timeline");

    while(stmt.step()) { //
        var row = stmt.getAsObject();
        // [...] do something with the row of result
        alert(row)
    }

}