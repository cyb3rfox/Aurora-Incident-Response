
import_lines = []
import_fieldset = []
import_grid = null

function show_import_dialog(grid){

    // open file
    const {remote} = require('electron')
    const {dialog} = remote
    const path = dialog.showOpenDialog({filters:[{name:"CSV File"}]});

    if(path == undefined) return;

    var fs = require('fs');

    w2utils.lock($( "#main" ),"Loading File...",true)

    var filebuffer = fs.readFileSync(path.toString());

    fieldset = []
    import_fieldset = []
    import_grid = grid

    for(var i=0;i<grid.columns.length;i++){
        fieldset.push(grid.columns[i].caption)
        import_fieldset.push(grid.columns[i].field)
    }

    filebuffer= filebuffer.toString()
    import_lines = filebuffer.split(/(?:\r\n|\n)+/)
    w2utils.unlock($( "#main" ))
    openImportPopup(fieldset,import_lines)

}

function import_data() {
    if (import_lines.length < 1) {
        alert("Could not import. Empty file.")
        w2popup.close()
        return
    }
    w2utils.lock($( "#main" ),"Parsing data...",true)
    //build import data
    for(var i=0;i<import_lines.length;i++){
        fields = CSVtoArray(import_lines[i])
        var import_object = {}
        if(!fields) continue
        import_object["recid"]=getNextRECID(import_grid)
        for(var j=0;j<fields.length;j++){
            import_object[import_fieldset[j]]=fields[j]
        }
        import_grid.add(import_object)

    }

    console.log("exited loop, added everything")
    import_grid.refresh()
    w2utils.unlock($( "#main" ))
    w2popup.close()
}