'use strict';
 
const fetch = require("node-fetch");
const uriPrefix = 'http://www.chinkang.org.sg/';
const ADODB = require('node-adodb');
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=U:\\Project\\huiguanHome\\huiguan_home_web\\db_mg\\PPXWData.mdb;');
const processSingleDes = (des) => {
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

const processContent = (content) => {
  let wC = content.split("\r\n");
  let newC = '';

  for(let k = 0; k < wC.length; k++){
    let s = wC[k];
    if(s.indexOf('IMG') >= 0 && s.indexOf("src") >= 0){
      let srcIndex = s.indexOf("src=");

      let start = s.indexOf('"', srcIndex);
      let end = s.indexOf('"', start + 1);

      let pre = s.substr(0, start + 1);
      let tail = s.substr(end);


      let url = uriPrefix + s.substr(start + 1, end - start - 1);
      // console.log(pre)
      // console.log(url)
      // console.log(tail)

      // console.log(s.charAt(end));

      s = pre + url + tail;
    }

    newC += s;
  }

  newC.replace("[/NextPage/]", "");

  return newC;
}

let article = {
  content: "<p></p>",
  description: "",
  isDirectUrl: false,
  isTop: false,
  resources: [],
  section: {
    id: 0
  },
  time: "2019-12-18",
  title: "打算",
  url: "",
}

let rs = {
  content: '',
  description: '',
  title: ''
}

connection
    .query('SELECT * FROM PPNews')
    .then(data => {
    //   console.log(JSON.stringify(data, null, 2));

      let nAs = [];
      for(let l = 0; l < data.length; l++){
        let a = data[l];
        let nA = {};
        // console.log(data);
        //content
        nA.content = processContent(a.Content);
      
        //isDirectUrl
        nA.isDirectUrl = false;

        //isTop
        nA.isTop = false;

        //time
        nA.time = "2019-12-18";

        //title
        nA.title = a.Title,

        //url
        nA.url = '';

        //description
        let wDes = a.Content.split("\r\n");
        nA.description = processDes(wDes);

        //section
        nA.section = {id: a.ClassID <= 3 ? a.ClassID + 2 : a.ClassID}

        
        //resources
        nA.resources = [];
        if(a.Img !== null && a.Img.trim().length !== 0){
          nA.resources.push({
              content: uriPrefix + a.Img,
              title: '',
              description: a.Title
          });
        }

        let temp

        let body = {
          articles: [nA]
        };

        let url = "http://www.callmedady.com:8080/huiguan/list/upload";
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

        nAs.push(nA);
      }

      // console.log(JSON.stringify(body))

      
     })
    .catch(error => {
      console.error(error);
    });