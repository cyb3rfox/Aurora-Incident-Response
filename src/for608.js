
function sans_testconnection(){

    server = w2ui.sans_form.record['scoringserver']
    eventid = w2ui.sans_form.record['eventid']
    teamid= w2ui.sans_form.record['teamid']
    teamsecret= w2ui.sans_form.record['teamsecret']


    $.ajaxSetup({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    team = {"teamid":teamid,"teamsecret":teamsecret}

    if(!server.endsWith("/")) server +="/"
    url = server+"scoring/test/"+eventid

    $.ajax(url,
        {

            method:"POST",
            data: JSON.stringify(team),
            timeout: 5000,     // timeout milliseconds
            success: function (data,status,xhr) {
                alert(data)
            },
            error: function (xhr, textStatus, errorMessage) { // error callback

                alert("Error: " + textStatus)

            }

        });

}

function sans_save(){

    case_data.scoringserver = w2ui.sans_form.record['scoringserver']
    case_data.eventid = w2ui.sans_form.record['eventid']
    case_data.team_id = w2ui.sans_form.record['teamid']
    case_data.team_secret = w2ui.sans_form.record['teamsecret']

}

function sans_sync(silent){
    if(!case_data.scoringserver || !case_data.eventid) return; //only if it is set up

    syncAllChanges()

    console.log("synching data to scoring server")


    $.ajaxSetup({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });


    if(!case_data.scoringserver.endsWith("/")) case_data.scoringserver +="/"
    url = case_data.scoringserver+"scoring/score/"+case_data.eventid

    $.ajax(url,
        {
           // dataType: 'json', // type of response data
            method:"POST",
            data: JSON.stringify(case_data),
            timeout: 15000,     // timeout milliseconds
            success: function (data,status,xhr) {

               //todo show that sending worked
                if(!silent) alert(data)
                sans_synch_status = true

            },
            error: function (xhr, textStatus, errorMessage) { // error callback

                alert("Error submitting SOD to the scoring server.Is the URL correct?")
                sans_synch_status = false

            }});

}