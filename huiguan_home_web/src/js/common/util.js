import p1 from '../../recources/temp/1.jpg';
import p2 from '../../recources/temp/2.png';
import p3 from '../../recources/temp/3.jpg';

import p1g from '../../recources/temp/1_g.jpg';
import p2g from '../../recources/temp/2_g.jpg';
import p3g from '../../recources/temp/3_g.jpg';
import p4g from '../../recources/temp/4_g.jpg';
import p5g from '../../recources/temp/5_g.png';

const utils = {
    username: 'admin',
    token: 'admin_jinjiang',
    protocol: 'http://',
    baseUrl: 'www.callmedady.com:8080/huiguan/list',
    emailUrl: 'www.callmedady.com:8080/huiguan/email',
    uiConfig: {
        topNavigator: {
            heightMd: '135px',
            heightSm: '90px'
        }
    },
    colorScheme: {
        primary: '#D91E2E',
        secondary: '#F21B54',
        tertiary: '#FFEFE5',
        back: '#FFFFFF',
        reflect: '#000000',
        text: '#5A5A5A'
    },
    common: {
        fileToBase64: (file) => {
            return new Promise(resolve => {
                let reader = new FileReader();
                // Read file content on file loaded event
                reader.onload = (event) => {
                    resolve(event.target.result);
                };
                reader.readAsDataURL(file);
            });
        },
        getRatioHeight:(width) => {
            return width/2;
        },
        sortArticles: (as) => {
            console.log(as);
            // as.sort((a1, a2) => {
            //     if(a1.isTop && a2.isTop){
            //
            //     }else if(a1.isTop) {
            //         return -1;
            //     }else if(a2.isTop){
            //         return 1;
            //     }else{
            //
            //     }
            // })
            return as;
        }
    },
    contact: {
        name: 'Singapore Chin Kang Huay Kuan',
        tel: '(65)62235913 & 62231952 ',
        fax: '(65)62278730',
        email: 'chinkang@singnet.com.sg',
        address: {
            title: '29 Bukit Pasoh Road #04-01 Singapore 089843',
            url: 'https://www.google.com/maps/place/Chin+Kang+Huay+Kuan/@1.279336,103.8384165,17z/data=!3m1!4b1!4m5!3m4!1s0x31da196d8d403705:0x959ce1707e4a0a76!8m2!3d1.279336!4d103.8406052'
        }
    },
    naviItems: [
        {id: 1, title: '主页', navigation: '/b', sub: [], isRenderList: true},
        {
            id: 2, title: '会馆概况', navigation: '/about', sub: [
                {
                    id: 1,
                    title: '会馆简介',
                    navigation: '/introduction',
                    sub: [],
                    isRenderList: false,
                    articleId: 1,
                    isSpecial: false
                },
                {
                    id: 2,
                    title: '会馆章程',
                    navigation: '/rules',
                    sub: [],
                    isRenderList: false,
                    articleId: 2,
                    isSpecial: false
                },
                {
                    id: 3,
                    title: '组织结构',
                    navigation: '/structure',
                    sub: [],
                    isRenderList: false,
                    articleId: 3,
                    isSpecial: false
                }
            ]
        },
        {
            id: 3, title: '会馆新闻', navigation: '/news', sub: [
                {id: 4, title: '会馆动态', navigation: '/events', sub: [], isRenderList: true},
                {id: 5, title: '会馆人物', navigation: '/people', sub: [], isRenderList: true},
                {id: 6, title: '会馆视频', navigation: '/videos', sub: [], isRenderList: true},
                {id: 7, title: '企业动态', navigation: '/corporate', sub: [], isRenderList: true}
            ]
        },
        {
            id: 4, title: '会馆服务', navigation: '/service', sub: [
                {id: 8, title: '互助部', navigation: '/help', sub: [], isRenderList: true},
                {id: 9, title: '妇女组', navigation: '/women', sub: [], isRenderList: true},
                {id: 18, title: '福利股', navigation: '/benefit', sub: [], isRenderList: true},
                {id: 10, title: '康乐股', navigation: '/kangle', sub: [], isRenderList: true},
                {id: 11, title: '教育股', navigation: '/education', sub: [], isRenderList: true},
                {id: 12, title: '青年团', navigation: '/youth', sub: [], isRenderList: true},
            ]
        },
        {
            id: 5, title: '情缘晋江', navigation: '/history', sub: [
                {id: 13, title: '晋江时事', navigation: '/now', sub: [], isRenderList: true},
                {id: 14, title: '晋江历史', navigation: '/past', sub: [], isRenderList: true},
                {id: 15, title: '世界晋江', navigation: '/world', sub: [], isRenderList: true},
            ]
        },
        {
            id: 6, title: '联系我们', navigation: '/contact', sub: [
                {id: 16, title: '联系方式', navigation: '/contact', sub: [], isRenderList: false, isSpecial: true},
                {id: 17, title: '加入我们', navigation: '/join', sub: [], isRenderList: false, isSpecial: true},
            ]
        },
        // {
        //     id: 7, title: '搜索文章', navigation: '/b/search', sub: []
        // }
    ],
    getSection: (id) => {
        let ss = {};
        utils.naviItems.forEach(p => {
            p.sub.forEach(s => {
                ss[s.id] = s;
            })
        });
        return ss[id];
    },
    gallery: [
        {
            id: 1,
            src: p1g,
            title: 'Legend 1',
            description: 'cqqcqw'
        },
        {
            id: 2,
            src: p2g,
            title: 'Legend 2',
            description: 'fdssfercrqqcqrqrq'
        },
        {
            id: 3,
            src: p3g,
            title: 'Legend 3',
            description: 'njqcjhqnqnc hnqhqiwiq eq'
        },
        {
            id: 4,
            src: p4g,
            title: 'Legend 4',
            description: 'enq xnqjnxjq eqxxqqx'
        },
        {
            id: 5,
            src: p5g,
            title: 'Legend 5',
            description: 'xeqewxqn qwe'
        },
    ],
    cancelJoinUs: null,
    previewArticle: null,
    previewUrl: "http://www.callmedady.com/#/preview"
};

export default utils;
