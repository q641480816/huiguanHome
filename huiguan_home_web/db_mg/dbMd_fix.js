'use strict';
 
const fetch = require("node-fetch");

//id: 1

let url = 'http://www.callmedady.com:8080/huiguan/list/articles/';

let url_1 = url + 1;
let url_3 = url + 3;

fetch(url_1, {
    method: 'get',
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => response.json())
    .then(data => {
        // console.log(data);

        let body = {};
        body.title = data.title;
        body.content = data.content;
        body.section ={id: 1};

        body.resources = [{
            content: 'http://58.84.43.75/PPUploadFile/2010122380062209.jpg',
            title: '1',
            description: body.title
        }]

        fetch("http://58.84.43.75:8080/server/huiguan/list/articles/1", {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'token': 'admin_jinjiang'
            },
            body: JSON.stringify(body)
        }).then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });

    })
    .catch(e => {
        console.log(e);
    });

    fetch(url_3, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            // console.log(data);
    
            let body = {};
            body.title = data.title;
            body.content = data.content;
            body.section ={id: 3};

            body.resources = [];
    
            fetch("http://58.84.43.75:8080/server/huiguan/list/articles/3", {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'token': 'admin_jinjiang'
                },
                body: JSON.stringify(body)
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(e => {
                    console.log(e);
                });
    
        })
        .catch(e => {
            console.log(e);
        });