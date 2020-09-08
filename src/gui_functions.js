

//////////////////////////////
//////// Lock Changes ////////
//////////////////////////////


/**
 * Change to GUI to read only mode when the user does not have the lock
 */
function activateReadOnly(){

    //deactivate save button
    w2ui['toolbar'].disable('file:save_sod');
    w2ui['toolbar'].disable('file:release_lock');
    w2ui['toolbar'].enable('file:request_lock');

    //remove buttons in grids
    w2ui.grd_timeline.toolbar.disable("add","remove")
    w2ui.grd_investigated_systems.toolbar.disable("add","remove")
    w2ui.grd_malware.toolbar.disable("add","remove","line_add")
    w2ui.grd_accounts.toolbar.disable("add","remove")
    w2ui.grd_network.toolbar.disable("add","remove")
    w2ui.grd_exfiltration.toolbar.disable("add","remove")
    w2ui.grd_systems.toolbar.disable("add","remove","import")
    w2ui.grd_actions.toolbar.disable("add","remove")
    w2ui.grd_casenotes.toolbar.disable("add","remove")
    w2ui.grd_investigators.toolbar.disable("add","remove")
    w2ui.grd_evidence.toolbar.disable("add","remove")

    //deactivate context menues
    w2ui.grd_investigated_systems.menu.disable("to_tl")



    lockstate = "&#128274; locked"
    $( "#lock" ).html(lockstate)

    //deactivate grid editable

    writeprotect_grid(w2ui.grd_timeline)
    writeprotect_grid(w2ui.grd_investigated_systems)
    writeprotect_grid(w2ui.grd_malware)
    writeprotect_grid(w2ui.grd_accounts)
    writeprotect_grid(w2ui.grd_network)
    writeprotect_grid(w2ui.grd_exfiltration)
    writeprotect_grid(w2ui.grd_systems)
    writeprotect_grid(w2ui.grd_actions)
    writeprotect_grid(w2ui.grd_casenotes)
    writeprotect_grid(w2ui.grd_investigators)
    writeprotect_grid(w2ui.grd_evidence)

    w2ui.grd_timeline.refresh()
    w2ui.grd_investigated_systems.refresh()
    w2ui.grd_malware.refresh()
    w2ui.grd_accounts.refresh()
    w2ui.grd_network.refresh()
    w2ui.grd_exfiltration.refresh()
    w2ui.grd_systems.refresh()
    w2ui.grd_actions.refresh()
    w2ui.grd_casenotes.refresh()
    w2ui.grd_investigators.refresh()
    w2ui.grd_evidence.refresh()





}


/**
 * Change to gui to read only mode when the user does not have the lock
 */
function deactivateReadOnly(){

    //deactivate save button
    w2ui['toolbar'].enable('file:save_sod');
    w2ui['toolbar'].enable('file:release_lock');
    w2ui['toolbar'].disable('file:request_lock');

    //remove buttons in grids
    w2ui.grd_timeline.toolbar.enable("add","remove")
    w2ui.grd_investigated_systems.toolbar.enable("add","remove")
    w2ui.grd_malware.toolbar.enable("add","remove","line_add")
    w2ui.grd_accounts.toolbar.enable("add","remove")
    w2ui.grd_network.toolbar.enable("add","remove")
    w2ui.grd_exfiltration.toolbar.enable("add","remove")
    w2ui.grd_systems.toolbar.enable("add","remove","import")
    w2ui.grd_actions.toolbar.enable("add","remove")
    w2ui.grd_casenotes.toolbar.enable("add","remove")
    w2ui.grd_investigators.toolbar.enable("add","remove")
    w2ui.grd_evidence.toolbar.enable("add","remove")

    lockstate = "&#128272; open"
    $( "#lock" ).html(lockstate)

    //activate grid editable

    writeenable_grid(w2ui.grd_timeline,config.grd_timeline)
    writeenable_grid(w2ui.grd_investigated_systems,config.grd_investigated_systems)
    writeenable_grid(w2ui.grd_malware,config.grd_malware)
    writeenable_grid(w2ui.grd_accounts,config.grd_accounts)
    writeenable_grid(w2ui.grd_network,config.grd_network)
    writeenable_grid(w2ui.grd_exfiltration,config.grd_exfiltration)
    writeenable_grid(w2ui.grd_systems,config.grd_systems)
    writeenable_grid(w2ui.grd_actions,config.grd_actions)
    writeenable_grid(w2ui.grd_casenotes,config.grd_casenotes)
    writeenable_grid(w2ui.grd_investigators,config.grd_investigators)
    writeenable_grid(w2ui.grd_evidence,config.grd_evidence)

    //repropagate dropdowns
    w2ui.grd_timeline.getColumn('owner').editable.items = case_data.investigators
    w2ui.grd_timeline.getColumn('event_host').editable.items = case_data.systems
    w2ui.grd_timeline.getColumn('event_source_host').editable.items = case_data.systems
    w2ui.grd_timeline.getColumn('direction').editable.items = case_data.direction
    w2ui.grd_investigated_systems.getColumn('analyst').editable.items = case_data.investigators
    w2ui.grd_investigated_systems.getColumn('hostname').editable.items = case_data.systems
    w2ui.grd_malware.getColumn('hostname').editable.items = case_data.systems
    w2ui.grd_network.getColumn('malware').editable.items = case_data.malware
    w2ui.grd_exfiltration.getColumn('stagingsystem').editable.items = case_data.systems
    w2ui.grd_exfiltration.getColumn('original').editable.items = case_data.systems
    w2ui.grd_exfiltration.getColumn('exfil_to').editable.items = case_data.systems
    w2ui.grd_actions.getColumn('owner').editable.items = case_data.investigators
    w2ui.grd_casenotes.getColumn('owner').editable.items = case_data.investigators

    w2ui.grd_timeline.refresh()
    w2ui.grd_investigated_systems.refresh()
    w2ui.grd_malware.refresh()
    w2ui.grd_accounts.refresh()
    w2ui.grd_network.refresh()
    w2ui.grd_exfiltration.refresh()
    w2ui.grd_systems.refresh()
    w2ui.grd_actions.refresh()
    w2ui.grd_casenotes.refresh()
    w2ui.grd_investigators.refresh()
    w2ui.grd_evidence.refresh()

    //TODO: Make case data editable


}


////////////////////////
//////// Popups ////////
////////////////////////

/**
 * Open the about popup
 */
function openAboutPopup() {

    w2popup.open({
        title: 'About Auroa IR',
        width: 900,
        height: 600,
        showMax: true,
        body: about_content,      //specified in gui_definitions to keep logic and gui as separate as possible
        onToggle: function (event) {
            event.onComplete = function () {
                w2ui.popup_layout.resize();
            }
        }
    });
}


/**
 * Show case Details
 */
function openCasePopup() {
    w2ui.case_form.record['caseid']=case_data.case_id
    w2ui.case_form.record['client']=case_data.client
    w2ui.case_form.record['start_date']=case_data.start_date
    w2ui.case_form.record['summary']=case_data.summary
    w2ui.case_form.record['mispserver']=case_data.mispserver
    w2ui.case_form.record['mispapikey']=case_data.mispapikey
    w2ui.case_form.record['mispeventid']=case_data.mispeventid
    w2ui.case_form.record['vtapikey']=case_data.vtapikey

    w2popup.open({
        title: 'Case Details',
        width: 550,
        height: 400,
        showMax: true,
        body: '<div id="main"></div>',
        onOpen: function (event) {
            event.onComplete = function () {
                $('#w2ui-popup #main').w2render('popup_layout')
                w2ui.popup_layout.content('main', w2ui.case_form);
            };
        },
        onToggle: function (event) {
            event.onComplete = function () {
                w2ui.popup_layout.resize();
            }
        }
    });
}


/**
 * Prepare and open teh popup for malware misp transfer
 * @param recid -record id of right clicked record.
 */
function openMispAddMalwarePopup(recid) {

    filename = w2ui.grd_malware.get(recid).text
    path= w2ui.grd_malware.get(recid).path_on_disk

    if(!path) path = ""

    fullpath= ""

    if (path.endsWith("\\")){
        fullpath = path+filename
    }
    else{
        fullpath = path + "\\" + filename
    }
    hash = w2ui.grd_malware.get(recid).md5
    notes = w2ui.grd_malware.get(recid).notes

    //check what type of hash it is
    hashtype = "md5"
    if(hash.length == 40) hashtype = "sha1"
    if(hash.length == 64) hashtype = "sha256"


    records = [ {recid:1, aurora_field_type:"Filename",misp_field_type:"filename",value:filename,comment:notes},
                {recid:2, aurora_field_type:"Fullpath",misp_field_type:"filename",value:fullpath,comment:notes},
                {recid:3, aurora_field_type:"Hash",misp_field_type:hashtype,value:hash,comment:notes},
    ]

    w2ui.grd_add_misp.records = records
    w2ui.grd_add_misp.refresh()


    w2popup.open({
        title: 'Add to MISP',
        width: 550,
        height: 400,
        showMax: true,
        body: '<div id="main"></div>',
        onOpen: function (event) {
            event.onComplete = function () {
                $('#w2ui-popup #main').w2render('popup_layout')
                //render grid into form
                w2ui.popup_layout.content('main', w2ui.grd_add_misp);

            };
        },
        onToggle: function (event) {
            event.onComplete = function () {
                w2ui.popup_layout.resize();
            }
        }
    });
}



/**
 * Prepare and open teh popup for network misp transfer
 * @param recid -record id of right clicked record.
 */
function openMispAddNetworkPopup(recid) { //TODO: code for network misp



    domainname = w2ui.grd_network.get(recid).domainname
    ip = w2ui.grd_network.get(recid).ip
    port = w2ui.grd_network.get(recid).port
    notes = w2ui.grd_network.get(recid).context

    ip_port = ip+"|"+port

    records = []

    if(domainname) records.push({recid:records.length+1, aurora_field_type:"Domain Name",misp_field_type:"domain",value:domainname,comment:notes})
    if(ip) records.push({recid:records.length+1, aurora_field_type:"IP",misp_field_type:"ip-dst",value:ip,comment:notes})
    if(ip && domainname) records.push({recid:records.length+1, aurora_field_type:"Domain IP",misp_field_type:"domain|ip",value:domainname+"|"+ip,comment:notes})
    if(ip && port) records.push({recid:records.length+1, aurora_field_type:"IP Port",misp_field_type:"ip-dst|port",value:ip+"|"+port,comment:notes})



    w2ui.grd_add_misp.records = records
    w2ui.grd_add_misp.refresh()


    w2popup.open({
        title: 'Add to MISP',
        width: 550,
        height: 400,
        showMax: true,
        body: '<div id="main"></div>',
        onOpen: function (event) {
            event.onComplete = function () {
                $('#w2ui-popup #main').w2render('popup_layout')
                //render grid into form
                w2ui.popup_layout.content('main', w2ui.grd_add_misp);

            };
        },
        onToggle: function (event) {
            event.onComplete = function () {
                w2ui.popup_layout.resize();
            }
        }
    });
}


///////////////////////////////
//////// Timeline View ////////
///////////////////////////////

/**
 * Create Dataset for vis.js timeline view
 * @param tl - timeline object
 * @returns {Array} - vis.js object
 */
function timeline2vis(tl){

    var vis_array=[]

    for(var i=0; i< tl.length;i++) {

        visual = tl[i].visual;
        if (!visual) continue;
        event_data = tl[i].event_data;
        start = tl[i].date_time;

        if(!start) continue; // can't display something without timestamp in a timeline

        classname = ""

        if (tl[i].event_type=="Exfil") {     //TODO: make coloring a settings option
            classname="exfil"
        }
        else if (tl[i].event_type=="Engagement") {

            classname="engagement"
        }

        vis_array.push({id: vis_array.length, content: event_data, start:start.toString(),className:classname})
    }

    return vis_array

}

/**
 * Display a visual timeline in main
 */
function showTimelineView(){

    syncAllChanges()
    w2ui.main_layout.content('main', '<div stlye="padding:10px;padding-top:30px;margin:10px" id="graph"></div>');
    var container = document.getElementById('graph');
    // Configuration for the Timeline
    var options = {};

    data = timeline2vis(case_data.timeline)
    if(data.length==0){
        $('#graph').html("No Timestamps to display. Add Timestamps to the timeline first and mark them as Visualizable")
    }
    var dataset = new vis.DataSet(data)

    // Create a Timeline
    var timeline = new vis.Timeline(container , dataset, options);


}


///////////////////////////////////////
//////// Lateral Movement View ////////
///////////////////////////////////////

/**
 * Generates the data object for vis.js
 * @param data
 * @returns {{nodes: Array, edges: Array}|*}
 */
function getLateralMovement(data){

    var nodes = []
    var edges = []

    var hosts = []
    for(var i=0; i< data.length;i++) {

        if(data[i].event_type=="Lateral Movement" || data[i].event_type=="Exfil"){

            // both hosts need to be set
            if(data[i].event_host == null || data[i].event_source_host == null) continue;

            //add host 1
            host1 = data[i].event_host
            idx1 = hosts.indexOf(host1)
            if(idx1==-1){
                hosts.push(host1)
                idx1 = hosts.length -1
            }

            //add host 2
            host2 = data[i].event_source_host
            idx2 = hosts.indexOf(host2)
            if(idx2==-1){
                hosts.push(host2)
                idx2 = hosts.length -1
            }

            //figure out direction
            direction = data[i].direction
            source = 0;
            destination = 0;
            //from 1 > 2
            if(direction == "->"){


                source = idx1
                destination = idx2
            }
            else{
                //from 2 > 1

                source = idx2
                destination = idx1
            }

            //check if edge exists and add to weight
            existing = false
            for(var j = 0; j< edges.length; j++){

                if(edges[j].from == source && edges[j].to == destination  ) {
                    edges[j].value++;
                    existing = true
                    continue
                }
            }
            if(existing) continue

            //add connection


            // color lateral and exfil diffeerntly
            color="#cccccc"
            if(data[i].event_type=="Exfil"){
                color="#f00000"
            }


            entry = {from:source, to:destination, arrows:{to :true}, value:1 ,color:{color:color}}
            edges.push(entry)
        }
    }

    //build nodes array
    for(var i = 0; i < hosts.length;i++){
        entry = {id: i , label: hosts[i], group:'computer'}
        nodes.push(entry)
    }

    result={nodes:nodes,edges:edges}

    return result
}

/**
 * Prepare and display the lateral movement view
 */
function showLateralMovement(){

    syncAllChanges()
    data = getLateralMovement(case_data.timeline)

    w2ui.main_layout.content('main', '<div stlye="height:100%;width:100%" id="graph"></div>');
    var container = document.getElementById('graph');
    // Configuration for the Timeline
    var options = {
        groups: {
            computer: {
                shape: 'icon',
                icon: {
                    face: '"Font Awesome 5 Free"',
                    code: '\uf108',
                    size: 35,
                    color: '#cccccc'
                }
            }
        }
    }

    var network = new vis.Network(container, data, options);

}



///////////////////////////////
//////// Activity Plot ////////
///////////////////////////////

/**
 * Labels to display in the Activity Plot view
 *
 */
timeseries_labels = ["00:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00", "05:00-06:00","06:00-07:00","07:00-08:00","08:00-09:00","09:00-10:00","10:00-11:00","11:00-12:00","12:00-13:00","13:00-14:00","14:00-15:00","15:00-16:00","16:00-017:00","17:00-18:00","18:00-19:00","19:00-20:00","20:00-21:00","21:00-22:00","22:00-23:00","23:00-24:00",]


/**
 * Create a histogram based on event data, do not include engagement management
 * @param tl - Timeline array
 * @returns {number[]} - Number of events
 */
function getActivity(tl){

    var buckets = [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ]

    for(var i = 0; i < tl.length; i++){

        if(tl[i].event_type == "Engagement Management") continue; // That's not the attacker working, so we don't want to have it in our histogram

        var date = new Date(tl[i].date_time)
        hour = date.getHours()
        buckets[hour]++

    }

    console.log(buckets)

    return buckets

}



/**
 * * Loads the activity plot into main
 */
function showActivityPlot(){


    syncAllChanges()

    w2ui.main_layout.content('main', '<div style="width:100%;height:400px,position: relative" ><canvas id="chart"></canvas></div>');
    var chart = document.getElementById('chart');
    data = getActivity(case_data.timeline)

    var myChart = new Chart(chart, {
        type: 'bar',
        data: {
            labels: timeseries_labels,
            datasets: [{
                label: 'Activity Distribution (Daytime)',
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    })

}



//////////////////////////////////
//////// Helper Functions ////////
//////////////////////////////////

/**
 * This function iterates through all configured columns of the grid and removes the editable object. This leaves all grid fields read only.
 * @param grid - w2ui grid object
 */
function writeprotect_grid(grid) {

    for(i= 0; i< grid.columns.length;i++){ //disable inline editing for all columns of the grid
        grid.columns[i].editable=null
    }
    grid.refresh()
}

/**
 * reactivate inline editing of a grid
 * @param grid - grid to reanable
 * @param template - template to get the editables from
 */
function writeenable_grid(grid,template){

    for(i= 0; i< grid.columns.length;i++){ //disable inline editing for all columns of the grid
        grid.columns[i].editable = template.columns[i].editable
    }
    grid.refresh()
}
