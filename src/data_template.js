


// Main Data Template for new files

storage_format_version = 3

data_template  = {
    "storage_format_version": storage_format_version,
    "locked":true,
    "case_id":"XXX",
    "client":"",
    "start_date":"",
    "summary":"",
    "timeline":[],
    "investigated_systems":[],
    "malware":[],
    "compromised_accounts":[],
    "network_indicators":[],
    "exfiltration":[],
    "hosts":[],
    "investigators":[],
    "actions":[],
    "casenotes":[],
    "event_types":[
        {id:1,text:"EventLog"},
        {id:2,text:"File"},
        {id:3,text:"Human"},
        {id:4,text:"Engagement"},
        {id:5,text:"Lateral Movement"},
        {id:6,text:"Exfil"},
        {id:7,text:"Tanium Trace"},
        {id:8,text:"Malware"},
        {id:9,text:"eMail"},
        {id:10,text:"Misc"}
    ],
    "verdicts":[
        {id:1,text:"Infected"},
        {id:2,text:"Accessed"},
        {id:3,text:"Commodity"},
        {id:3,text:"Clean"},
    ],
    "status":[
        {id:1,text:"Assigned"},
        {id:2,text:"In Progress"},
        {id:3,text:"Completed"},
    ],
    "direction":[
        {id:1,text:"<-"},
        {id:2,text:"->"},
    ],

}


misp_attribute_types = [

    { id: 1, text: 'filename' },
    { id: 2, text: 'domain' },
    { id: 3, text: 'ip-dst' },
    { id: 4, text: 'ip-dst|port' },
    { id: 5, text: 'ip-src' },
    { id: 6, text: 'ip-src|port' },
    { id: 7, text: 'md5' },
    { id: 8, text: 'url' },
    { id: 9, text: 'domain|ip' },
];