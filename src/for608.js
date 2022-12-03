


function sans_save(silent){

    case_data.scoringserver = w2ui.sans_form.record['scoringserver']
    case_data.eventid = w2ui.sans_form.record['eventid']
    case_data.team_secret = w2ui.sans_form.record['teamsecret']

    if(!silent){
        alert("Credentials saved")
    }

}

function sans_sync(silent){
    if(!case_data.scoringserver) return; //only if it is set up

    syncAllChanges()


    $.ajaxSetup({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-FOR608-AUTH-TOKEN": case_data.team_secret
        }
    });


    if(!case_data.scoringserver.endsWith("/")) case_data.scoringserver +="/"
    url = case_data.scoringserver+"scoring/submit"

    $.ajax(url,
        {
           // dataType: 'json', // type of response data
            method:"POST",
            data: JSON.stringify(case_data),
            timeout: 15000,     // timeout milliseconds
            success: function (data,status,xhr) {

                if(data.error) {
                    if(!silent) alert(data.error)
                    return
                }
                if(!silent) alert(data.info)
                sans_synch_status = true

            },
            error: function (xhr, textStatus, errorMessage) { // error callback

                alert("Error submitting SOD to the scoring server.Is the URL correct and internet working?")
                console.log(textStatus)
                console.log(errorMessage)
                console.log(xhr.responseJSON)

                sans_synch_status = false

            }});

}