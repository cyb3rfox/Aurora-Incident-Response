



// All events for gui components ("clicks, etc") will be hooked up here


registerComponents = function(){


    //////////////////
    // Main Toolbar //
    //////////////////

    w2ui.toolbar.onClick = function(event){

        switch (event.target) {
            case 'file:new_sod':
                newSOD()
                break;
            case 'file:open_sod':
                openSOD()
                break;
            case 'file:save_sod':
                saveSOD()
                break;
            case 'file:release_lock':
                releaseLock()
                break;
            case 'file:request_lock':
                requestLock()
                break;
            case 'file:open_webdav':
                test_webdav()
                break;
            case 'case_details':
                openCasePopup()
                break;
            case 'help:about':
                openAboutPopup()
                break;
            case 'help:online_help':
                browser_open('https://cyberfox.blog/aurora')
                break;
        }

    }


    /////////////
    // Sidebar //
    /////////////

    //that needs some more work to offload functionality where it needs to be
    w2ui.sidebar.onClick = function(event){


        switch (event.target) {
            case 'timeline':
                syncAllChanges()
                if(lockedByMe) { //only propagate editables when the user can actually pic. when locked the editables will be null objects
                    w2ui.grd_timeline.getColumn('owner').editable.items = case_data.investigators
                    w2ui.grd_timeline.getColumn('event_host').editable.items = case_data.systems
                    w2ui.grd_timeline.getColumn('event_source_host').editable.items = case_data.systems
                    w2ui.grd_timeline.getColumn('direction').editable.items = case_data.direction
                    w2ui.grd_timeline.getColumn('killchain').editable.items = case_data.killchain
                }
                w2ui.main_layout.content('main', w2ui.grd_timeline);
                break;

            case 'investigated_systems':
                syncAllChanges()
                if(lockedByMe) { //only propagate editables when the user can actually pic. when locked the editables will be null objects
                    w2ui.grd_investigated_systems.getColumn('analyst').editable.items = case_data.investigators
                    w2ui.grd_investigated_systems.getColumn('hostname').editable.items = case_data.systems
                }
                w2ui.main_layout.content('main', w2ui.grd_investigated_systems);
                break;

            case 'investigators':
                syncAllChanges()
                w2ui.main_layout.content('main', w2ui.grd_investigators);
                break;

            case 'malware':
                syncAllChanges()
                if(lockedByMe) { //only propagate editables when the user can actually pic. when locked the editables will be null objects
                    w2ui.grd_malware.getColumn('hostname').editable.items = case_data.systems
                }
                w2ui.main_layout.content('main', w2ui.grd_malware);
                break;

            case 'accounts':
                syncAllChanges()
                w2ui.main_layout.content('main', w2ui.grd_accounts);
                break;

            case 'network':
                syncAllChanges()
                if(lockedByMe) { //only propagate editables when the user can actually pic. when locked the editables will be null objects
                    w2ui.grd_network.getColumn('malware').editable.items = case_data.malware
                }
                w2ui.main_layout.content('main', w2ui.grd_network);
                break;

            case 'exfiltration':
                syncAllChanges()
                if(lockedByMe) { //only propagate editables when the user can actually pic. when locked the editables will be null objects
                    w2ui.grd_exfiltration.getColumn('stagingsystem').editable.items = case_data.systems
                    w2ui.grd_exfiltration.getColumn('original').editable.items = case_data.systems
                    w2ui.grd_exfiltration.getColumn('exfil_to').editable.items = case_data.systems
                }
                w2ui.main_layout.content('main', w2ui.grd_exfiltration);
                break;

            case 'systems':
                syncAllChanges()
                w2ui.main_layout.content('main', w2ui.grd_systems);
                break;

            case 'actions':
                syncAllChanges()
                if(lockedByMe) { //only propagate editables when the user can actually pic. when locked the editables will be null objects
                    w2ui.grd_actions.getColumn('owner').editable.items = case_data.investigators
                }
                w2ui.main_layout.content('main', w2ui.grd_actions);
                break;

            case 'casenotes':
                syncAllChanges()
                if(lockedByMe) { //only propagate editables when the user can actually pic. when locked the editables will be null objects
                    w2ui.grd_casenotes.getColumn('owner').editable.items = case_data.investigators
                }
                w2ui.main_layout.content('main', w2ui.grd_casenotes);
                break;

            case 'vis_timeline':
                showTimelineView()
                break;
            case 'lateral':
                showLateralMovement()
                break;

            case 'activity':
                showActivityPlot()
                break;
        }
    }





    //////////////
    // Timeline //
    //////////////

    w2ui.grd_timeline.toolbar.onClick = function(event){

        currentgrid = w2ui.grd_timeline
        switch(event.target) {
            case 'add':
                currentgrid.add({ recid: getNextRECID(currentgrid) });
                break;

            case 'remove':
                currentgrid.remove(currentgrid.getSelection())
                break;
        }
    }




    //////////////////////////
    // Investigated Systems //
    //////////////////////////

    w2ui.grd_investigated_systems.toolbar.onClick = function(event){

        currentgrid = w2ui.grd_investigated_systems
        switch(event.target) {
            case 'add':
                currentgrid.add({ recid: getNextRECID(currentgrid) , date_added: (new Date()).getTime()});
                break;
            case 'remove':
                currentgrid.remove(currentgrid.getSelection())
                break;
        }
    }

    w2ui.grd_investigated_systems.onChange = function(event) {

        w2ui.grd_investigated_systems.records[event.index].date_updated = (new Date()).getTime()

    }

    w2ui.grd_investigated_systems.onMenuClick = function(event) {

        switch (event.menuItem.id) {

            case 'to_tl':
                w2ui.grd_investigated_systems.save()
                hostname = w2ui.grd_investigated_systems.get(event.recid).hostname
                first_compromise = w2ui.grd_investigated_systems.get(event.recid).first_compromise
                summary = w2ui.grd_investigated_systems.get(event.recid).summary
                w2ui.grd_timeline.add({
                    recid: getNextRECID(w2ui.grd_timeline),
                    event_host: hostname,
                    event_data: summary,
                    followup: true,
                    date_time: first_compromise
                });
                w2alert("First compromise of the system has been added to timeline.")
                break;

        }
    }


    /////////////
    // Malware //
    /////////////


    w2ui.grd_malware.toolbar.onClick = function(event){

        currentgrid = w2ui.grd_malware
        switch(event.target) {
            case 'add':
                currentgrid.add({ recid: getNextRECID(currentgrid) , date_added: (new Date()).getTime()});
                break;

            case 'remove':
                currentgrid.remove(currentgrid.getSelection())
                break;
        }
    }

    w2ui.grd_malware.onMenuClick = function(event){

        switch(event.menuItem.id) {

            case 'duplicate':
                w2ui.grd_malware.save()
                hostname = w2ui.grd_malware.get(event.recid).hostname
                filename = w2ui.grd_malware.get(event.recid).text
                filepath = w2ui.grd_malware.get(event.recid).path_on_disk
                md5 = w2ui.grd_malware.get(event.recid).md5

                w2ui.grd_malware.add({
                    recid: getNextRECID(w2ui.grd_malware),
                    hostname: hostname,
                    text: filename,
                    path_on_disk: filepath,
                    md5: md5,
                    date_added: (new Date()).getTime()
                });

                break;

            case 'to_hosts':
                w2ui.grd_malware.save()
                hostname = w2ui.grd_malware.get(event.recid).hostname

                //check if host is there before adding

                for (i = 0; i < w2ui.grd_investigated_systems.records.length; i++) {

                    if (hostname == w2ui.grd_investigated_systems.records[i].hostname) {
                        w2alert("Host already in the Investigated Hosts Tab. Can't add it twice.")
                        return;
                    }

                }

                created = w2ui.grd_malware.get(event.recid).creation_date
                filename = w2ui.grd_malware.get(event.recid).text
                filepath = w2ui.grd_malware.get(event.recid).path_on_disk
                notes = w2ui.grd_malware.get(event.recid).notes
                summary = "Malware created (" + filepath + filename + "). " + notes

                w2ui.grd_investigated_systems.add({
                    recid: getNextRECID(w2ui.grd_investigated_systems),
                    hostname: hostname,
                    summary: summary,
                    first_compromise: created,
                    verdict: "infected",
                    date_added: (new Date()).getTime()
                });
                w2alert("Host has been added to the investigated systems tab.")
                break;

            case 'to_tl':
                w2ui.grd_malware.save()
                hostname = w2ui.grd_malware.get(event.recid).hostname
                created = w2ui.grd_malware.get(event.recid).creation_date
                filename = w2ui.grd_malware.get(event.recid).text
                filepath = w2ui.grd_malware.get(event.recid).path_on_disk
                notes = w2ui.grd_malware.get(event.recid).notes
                summary = "Malware created (" + filepath + filename + "). " + notes

                w2ui.grd_timeline.add({
                    recid: getNextRECID(w2ui.grd_timeline),
                    event_host: hostname,
                    event_type: "Malware",
                    event_data: summary,
                    followup: true,
                    date_time: created
                });

                w2alert("Creation Timestamp of malware has been added to timeline.")
                break;

            case 'misp':
                w2ui.grd_malware.save()
                openMispAddMalwarePopup(event.recid)
                break;

            case 'vt':
                w2ui.grd_malware.save()
                check_vt(w2ui.grd_malware, event.recid)
                break;
        }

    }


    //////////////
    // Accounts //
    //////////////

    w2ui.grd_accounts.toolbar.onClick = function(event){

        console.log("adding to accounts")

        currentgrid = w2ui.grd_accounts
        switch(event.target) {
            case 'add':
                currentgrid.add({ recid: getNextRECID(currentgrid) , date_added: (new Date()).getTime()});
                break;

            case 'remove':
                currentgrid.remove(currentgrid.getSelection())
                break;
        }
    }


    /////////////
    // Network //
    /////////////

    w2ui.grd_network.toolbar.onClick = function(event){


        console.log("adding to network")
        currentgrid = w2ui.grd_network
        switch(event.target) {
            case 'add':
                currentgrid.add({ recid: getNextRECID(currentgrid) , date_added: (new Date()).getTime()});
                break;

            case 'remove':
                currentgrid.remove(currentgrid.getSelection())
                break;
        }
    }

    w2ui.grd_network.onMenuClick = function(event){

        switch(event.menuItem.id) {

            case 'misp':
                w2ui.grd_network.save()
                openMispAddNetworkPopup(event.recid)
                break;
        }

    }



    //////////////////
    // Exfiltration //
    //////////////////

    w2ui.grd_exfiltration.toolbar.onClick = function(event){

        currentgrid = w2ui.grd_exfiltration
        switch(event.target) {
            case 'add':
                currentgrid.add({ recid: getNextRECID(currentgrid) });
                break;

            case 'remove':
                currentgrid.remove(currentgrid.getSelection())
                break;
        }
    }

    w2ui.grd_exfiltration.onMenuClick = function(event){

        switch (event.menuItem.id) {

            case 'to_tl':
                w2ui.grd_exfiltration.save()
                source = w2ui.grd_exfiltration.get(event.recid).stagingsystem
                destination = w2ui.grd_exfiltration.get(event.recid).exfil_to
                filename = w2ui.grd_exfiltration.get(event.recid).filename
                time = filename = w2ui.grd_exfiltration.get(event.recid).exfiltime
                exnotes = filename = w2ui.grd_exfiltration.get(event.recid).exfiltime


                summary = filename + " exfiltrated."

                w2ui.grd_timeline.add({recid: getNextRECID(w2ui.grd_timeline),
                        event_host: source,
                        event_source_host: destination,
                        event_data: summary,
                        followup: true,
                        event_type: "Exfil",
                        notes: exnotes,
                        direction:"",
                        date_time: time});

                w2alert("Exfiltration has been added to timeline.")
                break;
        }
    }

    /////////////
    // Systems //
    /////////////


    w2ui.grd_systems.toolbar.onClick = function(event){

        currentgrid = w2ui.grd_systems
        switch(event.target) {
            case 'add':
                currentgrid.add({ recid: getNextRECID(currentgrid),pin:true });
                break;

            case 'remove':
                currentgrid.remove(currentgrid.getSelection())
                break;
        }
    }

    ///////////////////
    // Investigators //
    ///////////////////

    w2ui.grd_investigators.toolbar.onClick = function(event){

        currentgrid = w2ui.grd_investigators
        switch(event.target) {
            case 'add':
                currentgrid.add({ recid: getNextRECID(currentgrid) });
                break;

            case 'remove':
                currentgrid.remove(currentgrid.getSelection())
                break;
        }
    }


    /////////////
    // Actions //
    /////////////

    w2ui.grd_actions.toolbar.onClick = function(event){

        currentgrid = w2ui.grd_actions
        switch(event.target) {
            case 'add':
                currentgrid.add({ recid: getNextRECID(currentgrid), date_added: (new Date()).getTime()});
                break;

            case 'remove':
                currentgrid.remove(currentgrid.getSelection())
                break;
        }
    }



    ////////////////
    // Case Notes //
    ////////////////

    w2ui.grd_casenotes.toolbar.onClick = function(event){

        currentgrid = w2ui.grd_casenotes
        switch(event.target) {
            case 'add':
                currentgrid.add({ recid: getNextRECID(currentgrid), date_added: (new Date()).getTime()});
                break;

            case 'remove':
                currentgrid.remove(currentgrid.getSelection())
                break;
        }
    }


    /////////////////////
    // MISP attributes //
    /////////////////////

    w2ui.grd_add_misp.toolbar.onClick = function(event){

        currentgrid = w2ui.grd_add_misp
        switch(event.target) {
            case 'send':
                add_attributes_misp(currentgrid,currentgrid.getSelection())
                break;

        }
    }




    ////////////
    // Forms //
    ///////////


    w2ui.case_form.actions.save=function(){

        case_data.case_id =  w2ui.case_form.record['caseid']
        case_data.client = w2ui.case_form.record['client']
        case_data.start_date = w2ui.case_form.record['start_date']
        case_data.summary = w2ui.case_form.record['summary']
        case_data.mispserver = w2ui.case_form.record['mispserver']
        case_data.mispapikey = w2ui.case_form.record['mispapikey']
        case_data.mispeventid = w2ui.case_form.record['mispeventid']
        case_data.vtapikey = w2ui.case_form.record['vtapikey']
        w2popup.close();
    }

    w2ui.case_form.actions.testmispconnection=function(){

        misp_connection_test()
    }

    w2ui.case_form.actions.testvtconnection=function(){

       vt_connection_test()

    }
}




//////////////////////
// Helper Functions //
//////////////////////





