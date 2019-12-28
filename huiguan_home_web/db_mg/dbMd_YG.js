'use strict';
 
const fetch = require("node-fetch");
const uriPrefix = 'http://www.chinkang.org.sg/';
const ADODB = require('node-adodb');
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=U:\\Project\\huiguanHome\\huiguan_home_web\\db_mg\\PPXWData.mdb;');
const processSingleDes = (des) => {
    let med = 150;
    let high = 200;
    let read = false;
    let nDes = '';
  
    for (let i = 0; i < des.length; i++){
      if(des.charAt(i) === '>'){
        read = true;
        continue;
      }else if(des.charAt(i) === '<'){
        read = false;
      }
  
      if(read){
        nDes += des.charAt(i);
      }
    }
  
    const replace = [':', '：', ';', '；'];
  
    if(replace.indexOf(nDes.charAt(nDes.length - 1)) >= 0){
      nDes = nDes.substr(0, nDes.length - 1) + "。";
    }
  
    if(nDes.length > high){
      let wNDes = nDes.split("。");
      nDes = '';
  
      for(let k = 0; k < wNDes.length; k++){
        let sen = wNDes[k];
        if(nDes.length < med && sen.trim() > 3){
          nDes += sen;
        }
      }
  
    }
  
    return nDes;
  } 
  
  const processDes = (wDes) => {
    let low = 50;
    let newDes = '';
  
    const exclude = ['&nbsp', '&nbsp;', '&nbsp。'];
  
    wDes.forEach(d => {
        let des = processSingleDes(d);
        if(exclude.indexOf(des) === -1 && newDes.length < low){
          newDes += "<p>" + des + "</p>";
        }
    });
  
    return newDes;
  }

const processTitle = (title) => {
    let nT = '';
    let read = true;
  
    for(let i = 0; i < title.length; i++){
      if(title.charAt(i) === '<'){
        read = false;
      }else if(title.charAt(i) === ">"){
        read = true;
        continue;
      }
  
      if(read){
        nT += title.charAt(i);
      }
  
    }
  
    return nT;
  }

connection
    .query('SELECT * FROM PPInfo where ID = 10')
    .then(data => {
        let a = data[0];

        let nA = {};

        //resources
        nA.resources = [];

        //content
        nA.content = a.Content;

        //isDirectUrl
        nA.isDirectUrl = false;

        //isTop
        nA.isTop = true;

        //title
        nA.title = processTitle(a.Title);

        //url
        nA.url = '';

        //description
        let wDes = a.Content.split("\r\n");
        nA.description = processDes(wDes);

        let date = new Date();
        let time = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

        nA.creationTime = time;
        nA.time = time

        //section
        nA.section = {id: 12}

        console.log(nA);

        let body = {
          articles: [nA]
        };

        let url = "http://58.84.43.75:8080/server/huiguan/list/upload";
        //boom
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'token': 'admin_jinjiang'
            },
            body: JSON.stringify(body)
        }).then(response =>{
          response.json();
        })
            .then(data => {
                if(typeof data.httpStatus !== "undefined" && data.httpStatus === 200){
                  console.log("boom liao");
                }else{
                  console.log('fuck');
                }
            })
            .catch(e => {
                console.log(e);
            });
    })