'use strict';
 
const fetch = require("node-fetch");
const uriPrefix = 'http://58.84.43.75/';
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

  nDes.replace("[/NextPage/]", "");

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
      if(exclude.indexOf(des) === -1 && newDes.length < low && des.length > 0){
        newDes += "<p>" + des + "</p>";
      }
  });

  return newDes;
}

const processSection = (s, title) => {
  let nS = '';

  switch(s){
    case 1:
      //会馆动态
        nS = 4;
        break;
    case 2:
      //会馆纪事
        nS = 4;
        break;
    case 3:
      //会馆会讯
        nS = 4;
        break;
    case 4:
      //理事风采
        nS = 5;
        break;
    case 6:
      //世界晋江
        nS = 15;
        break;
    case 7:
      //会馆新闻
        nS = 4;
        break;
    case 8:
      //会馆活动
        nS = 4;
        break;
    case 9:
      //其它宗乡
        nS = 15;
        break;
    case 10:
      //情源晋江
        nS = 15;
        break;
    case 11:
      //通知公告
        nS = 4;
        break;
    case 15:
      //会馆青年团
        nS = 12;
        break;
    case 16:
      //青年活动
        nS = 12;
        break;
    case 17:
      //慈善义工
        nS = 4;
        break;
    case 18:
      //近期活动
        nS = 4;
        break;
    default:
        nS = 4;
        break;
  }

  if(title.indexOf('互助部') >= 0){
    nS = 8;
  }else if(title.indexOf('妇女组') >= 0){
    nS = 9;
  }else if(title.indexOf('福利股') >= 0){
    nS = 18;
  }else if(title.indexOf('康乐') >= 0){
    nS = 10;
  }else if(title.indexOf('教育股') >= 0){
    nS = 11;
  }

  return nS;
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

const processResUrl = (url) => {
  let nU = '';
  if(url.indexOf('PPEditor') >= 0){
      let index = url.lastIndexOf('/');
      let name = url.substring(index + 1);
      nU = uriPrefix + 'PPUploadFile/' + name;
  }else{
    nU = url;
  }

  return nU;
};

const processContent = (t, res ,content) => {
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

      let url = processResUrl(uriPrefix + s.substr(start + 1, end - start - 1));
      if(url.indexOf('common.gif') < 0){
        // console.log(pre)
        // console.log(url)
        // console.log(tail)

        // console.log(s.charAt(end));

        s = pre + url + tail;

        if(res.length === 0){
          res.push({
              content: url,
              title: '',
              description: t
          });
        }
      }
    }

    if(s.indexOf('PPEditor/images/common.gif') < 0){
      newC += s;
    }
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

        //resources
        nA.resources = [];
        if(a.Img !== null && a.Img.trim().length !== 0){
          nA.resources.push({
              content: uriPrefix + a.Img,
              title: '',
              description: a.Title
          });
        }

        //content
        nA.content = processContent(a.Title, nA.resources, a.Content);
      
        //isDirectUrl
        nA.isDirectUrl = false;

        //isTop
        nA.isTop = false;

        //title
        nA.title = processTitle(a.Title);

        //url
        nA.url = '';

        //description
        let wDes = a.Content.split("\r\n");
        nA.description = processDes(wDes);

        let date = new Date(a.AddTime);
        let time = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

        nA.creationTime = time;
        nA.time = time

        //section
        nA.section = {id: processSection(a.ClassID, nA.title)}

        //res transform
        if(nA.resources.length > 0){
          nA.resources[0].title = 1;
          nA.resources[0].description = nA.title;
          nA.resources[0].content = processResUrl(nA.resources[0].content);
        }
       
        

        let temp;

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
        }).then(response => response.json())
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