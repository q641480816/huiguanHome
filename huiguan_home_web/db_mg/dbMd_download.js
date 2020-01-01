'use strict';
 
const fetch = require("node-fetch");
const fetchBase64 = require('fetch-base64');
const uriPrefix = 'http://58.84.43.75/';
const ADODB = require('node-adodb');
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=U:\\Project\\huiguanHome\\huiguan_home_web\\db_mg\\PPXWData.mdb;');

const processDocument = (line) => {
    let doc = null;
    let url = '';
    let name = '';

    let nameRead = true;
    let url_h = 0;
    let url_t = 0;
    if(line.indexOf('<A href') >= 0){
        doc = {};

        for(let i = 0; i < line.length; i++){
            if(line.charAt(i) === '<'){
                nameRead = false;
            }else if(line.charAt(i) === '>'){
                nameRead = true;
                continue;
            }

            if(nameRead){
                name += line.charAt(i);
            }
        }

        url_h = line.indexOf('href="');
        url_t = line.indexOf('" target=_blank>', url_h);

        url = line.substring(url_h + 6, url_t);
        let index_last = url.lastIndexOf('/');
        url = 'PPUploadFile/' + url.substring(index_last + 1);

        let sufixIndex = url.indexOf('.');

        name = (name + url.substring(sufixIndex)).split(' ').join("").replace('(','').replace(')','').replace("（",'').replace("）",'');

        name = name.split("/").join("");

        doc.name = name.split("&nbsp;").join("");
        doc.url = url.split('%20').join(' ');
        
        
    }

    return doc;
}

const upload = (d, index) => {
    // console.log(d);
    let url = "http://58.84.43.75:8080/server/huiguan/file/upload";
    fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'token': 'admin_jinjiang'
        },
        body: JSON.stringify(d)
    }).then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(e => {
            console.log(e);
        });
}

connection
    .query('SELECT * FROM PPInfo where ID = 11')
    .then(data => {
        let dataSet = data[0].Content.split('\r\n');

        // console.log(dataSet)

        let res = [];

        dataSet.forEach(d => {
            if(processDocument(d) !== null){
                res.push(processDocument(d));
            }
        });

        console.log(res);

        // let r = res[3];
        // fetchBase64.local('U:/Project/test/' + r.url).then((data) => {
        //     console.log(data[1]);
        //     upload({
        //                 name: r.name,
        //                 value: data[1]
        //             })
        // }).catch((reason) => {
        //     console.log(reason);
        // });
        let index = 0;
        res.forEach(r => {
            index ++; 
            if(r !== null){
                fetchBase64.local('U:/Project/test/' + r.url).then((data) => {
                    // console.log(data);

                    upload({
                        name: "[" + index + "]" + r.name,
                        value: data[1]
                    }, index)
                }).catch((reason) => {});
            }
        })
    })