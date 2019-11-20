import p1 from '../../recources/temp/1.jpg';
import p2 from '../../recources/temp/2.png';
import p3 from '../../recources/temp/3.jpg';

import p1g from '../../recources/temp/1_g.jpg';
import p2g from '../../recources/temp/2_g.jpg';
import p3g from '../../recources/temp/3_g.jpg';
import p4g from '../../recources/temp/4_g.jpg';
import p5g from '../../recources/temp/5_g.png';

const utils = {
    uiConfig:{
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
    contact: {
        name: 'Chin Kang Huay Kuan',
        tel: '(65)62235913 & 62231952 ',
        fax: '(65)62278730',
        email: 'chinkang@singnet.com.sg',
        address: '29 Bukit Pasoh Road #04-01 Singapore 089843'
    },
    naviItems: [
        {id: 1, title: '主页', navigation: '/', sub: [], isRenderList: true},
        {
            id: 2, title: '会馆概况', navigation: '/about', sub: [
                {id: 1, title: '会馆简介', navigation: '/introduction', sub: [], isRenderList: true},
                {id: 2, title: '会馆章程', navigation: '/rules', sub: [], isRenderList: true},
                {id: 3, title: '组织结构', navigation: '/structure', sub: [], isRenderList: true}
            ]
        },
        {
            id: 3, title: '会馆新闻', navigation: '/news', sub: [
                {id: 1, title: '会馆动态', navigation: '/events', sub: [], isRenderList: true},
                {id: 2, title: '会馆人物', navigation: '/people', sub: [], isRenderList: true},
                {id: 3, title: '会馆视频', navigation: '/videos', sub: [], isRenderList: true},
                {id: 4, title: '企业动态', navigation: '/corporate', sub: [], isRenderList: true}
            ]
        },
        {
            id: 4, title: '会馆服务', navigation: '/service', sub: [
                {id: 1, title: '互助部', navigation: '/help', sub: [], isRenderList: true},
                {id: 2, title: '妇女部', navigation: '/women', sub: [], isRenderList: true},
                {id: 3, title: '康乐股', navigation: '/kangle', sub: [], isRenderList: true},
                {id: 4, title: '教育股', navigation: '/education', sub: [], isRenderList: true},
                {id: 5, title: '青年团', navigation: '/youth', sub: [], isRenderList: true},
            ]
        },
        {
            id: 5, title: '情缘晋江', navigation: '/history', sub: [
                {id: 1, title: '晋江时事', navigation: '/now', sub: [], isRenderList: true},
                {id: 2, title: '晋江历史', navigation: '/past', sub: [], isRenderList: true},
                {id: 3, title: '世界晋江', navigation: '/world', sub: [], isRenderList: true},
            ]
        },
        {
            id: 6, title: '联系我们', navigation: '/contact', sub: [
                {id: 1, title: '晋江时事', navigation: '/contact', sub: [], isRenderList: false},
                {id: 2, title: '晋江历史', navigation: '/join', sub: [], isRenderList: false},
            ]
        }
    ],
    events: [
        {name: 'Event 1', id: 3, location: 'Lor Rong Ah Soo 20C'},
        {
            name: 'NATIONAL PRIMARY SCHOOLS CHINESE STORY-TELLING COMPETITION 2019',
            id: 1,
            location: 'Lor Rong Ah Soo 20C'
        },
        {
            name: '17TH SHHK LITERARY AWARDS CUM THF ARTS & CULTURAL AWARD PRIZE PRESENTATION CEREMONY',
            id: 2,
            location: 'Lor Rong Ah Soo 20C'
        },
        {name: 'JOURNEYS OF HERITAGE & FAITH 2019', id: 4, location: 'Lor Rong Ah Soo 20C'}
    ],
    properties: [
        {
            id: 1,
            name: 'Chin Kang Huay Kuan',
            address: '29 Bukit Pasoh Road #04-01 Singapore 089843',
            direction: 'https://www.google.com/maps/place/Chin+Kang+Huay+Kuan/@1.279336,103.8384165,17z/data=!3m1!4b1!4m5!3m4!1s0x31da196d8d403705:0x959ce1707e4a0a76!8m2!3d1.279336!4d103.8406052'
        },
        {
            id: 2,
            name: 'Privé Clarke Quay',
            address: 'Blk 3C River Valley Road, Clarke Quay, #01-09A, Singapore 179019',
            direction: 'https://www.google.com/maps/place/Priv%C3%A9+Clarke+Quay/@1.290359,103.8434303,17z/data=!3m1!4b1!4m5!3m4!1s0x31da19a03d3d2cb1:0x934e803b56241cf4!8m2!3d1.290359!4d103.845619'
        }
    ],
    homeCarousel: [
        {
            id: 1,
            src: p1,
            legend: 'Legend 1'
        },
        {
            id: 2,
            src: p2,
            legend: 'Legend 2'
        },
        {
            id: 3,
            src: p3,
            legend: 'Legend 3'
        }
    ],
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
    dummyArticlesShort: [
        {
            id:1,
            title: '通知：独特会员识别号码',
            description: '<p>奖金：获奖作品可获得现金 $3000 （如无作品获选，将颁发三份各 $500 的佳作奖）</p><p>所有参赛作品必须于2019年11月29日（星期五）午夜12点之前，通过线上报名表格提交</p>',
            resource: 'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg'
        },
        {
            id:2,
            title: '通知：独特会员识别号码',
            description: '<p>奖金：获奖作品可获得现金 $3000 （如无作品获选，将颁发三份各 $500 的佳作奖）</p><p>所有参赛作品必须于2019年11月29日（星期五）午夜12点之前，通过线上报名表格提交</p>',
            resource: 'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg'
        },
        {
            id:3,
            title: '通知：独特会员识别号码',
            description: '<p>从2019年9月1日起，为符合新加坡个人资料保护委员会的身份证件条例，以及为巩固会员个人资料的安全性，福建会馆将不再收集或使用会员的完整身份证号码。</p>',
            resource: 'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg'
        },
        {
            id:4,
            title: '通知：独特会员识别号码',
            description: '<p>从2019年9月1日起，为符合新加坡个人资料保护委员会的身份证件条例，以及为巩固会员个人资料的安全性，福建会馆将不再收集或使用会员的完整身份证号码。</p>',
            resource: 'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg'
        },
        {
            id:5,
            title: '通知：独特会员识别号码',
            description: '<p>奖金：获奖作品可获得现金 $3000 （如无作品获选，将颁发三份各 $500 的佳作奖）</p><p>所有参赛作品必须于2019年11月29日（星期五）午夜12点之前，通过线上报名表格提交</p>',
            resource: 'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg'
        },
        {
            id:6,
            title: '通知：独特会员识别号码',
            description: '<p>从2019年9月1日起，为符合新加坡个人资料保护委员会的身份证件条例，以及为巩固会员个人资料的安全性，福建会馆将不再收集或使用会员的完整身份证号码。</p>',
            resource: 'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg'
        },
        {
            id:7,
            title: '通知：独特会员识别号码',
            description: '<p>奖金：获奖作品可获得现金 $3000 （如无作品获选，将颁发三份各 $500 的佳作奖）</p><p>所有参赛作品必须于2019年11月29日（星期五）午夜12点之前，通过线上报名表格提交</p>',
            resource: 'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg'
        },
        {
            id:8,
            title: '通知：独特会员识别号码',
            description: '<p>从2019年9月1日起，为符合新加坡个人资料保护委员会的身份证件条例，以及为巩固会员个人资料的安全性，福建会馆将不再收集或使用会员的完整身份证号码。</p>',
            resource: 'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg'
        },
        {
            id:9,
            title: '通知：独特会员识别号码',
            description: '<p>奖金：获奖作品可获得现金 $3000 （如无作品获选，将颁发三份各 $500 的佳作奖）</p><p>所有参赛作品必须于2019年11月29日（星期五）午夜12点之前，通过线上报名表格提交</p>',
            resource: 'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg'
        },
        {
            id:10,
            title: '通知：独特会员识别号码',
            description: '<p>从2019年9月1日起，为符合新加坡个人资料保护委员会的身份证件条例，以及为巩固会员个人资料的安全性，福建会馆将不再收集或使用会员的完整身份证号码。</p>',
            resource: 'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg'
        },
    ]
};

export default utils;
