import p1 from '../../recources/temp/1.jpg';
import p2 from '../../recources/temp/2.png';
import p3 from '../../recources/temp/3.jpg';

import p1g from '../../recources/temp/1_g.jpg';
import p2g from '../../recources/temp/2_g.jpg';
import p3g from '../../recources/temp/3_g.jpg';
import p4g from '../../recources/temp/4_g.jpg';
import p5g from '../../recources/temp/5_g.png';

const utils = {
    contact: {
        name: 'Chin Kang Huay Kuan',
        tel: '(65)62235913 & 62231952 ',
        fax: '(65)62278730',
        email: 'chinkang@singnet.com.sg',
        address: '29 Bukit Pasoh Road #04-01 Singapore 089843'
    },
    naviItems: [
        {id: 1, title: '主页', navigation: '/', sub: []},
        {
            id: 2, title: '会馆概况', navigation: '/about', sub: [
                {id: 1, title: '会馆简介', navigation: '/about/introduction', sub: []},
                {id: 2, title: '会馆章程', navigation: '/about/rules', sub: []},
                {id: 3, title: '组织结构', navigation: '/about/structure', sub: []}
            ]
        },
        {
            id: 3, title: '会馆新闻', navigation: '/news', sub: [
                {id: 1, title: '会馆动态', navigation: '/news/events', sub: []},
                {id: 2, title: '会馆人物', navigation: '/news/people', sub: []},
                {id: 3, title: '会馆视频', navigation: '/news/videos', sub: []},
                {id: 4, title: '企业动态', navigation: '/news/corporate', sub: []}
            ]
        },
        {
            id: 4, title: '会馆服务', navigation: '/service', sub: [
                {id: 1, title: '互助部', navigation: '/service/help', sub: []},
                {id: 2, title: '妇女部', navigation: '/service/women', sub: []},
                {id: 3, title: '康乐股', navigation: '/service/kangle', sub: []},
                {id: 4, title: '教育股', navigation: '/service/education', sub: []},
                {id: 5, title: '青年团', navigation: '/service/youth', sub: []},
            ]
        },
        {
            id: 5, title: '情缘晋江', navigation: '/history', sub: [
                {id: 1, title: '晋江时事', navigation: '/history/now', sub: []},
                {id: 2, title: '晋江历史', navigation: '/history/past', sub: []},
                {id: 3, title: '世界晋江', navigation: '/history/world', sub: []},
            ]
        },
        {
            id: 6, title: '联系我们', navigation: '/contact', sub: [
                {id: 1, title: '晋江时事', navigation: '/contact/contact', sub: []},
                {id: 2, title: '晋江历史', navigation: '/contact/join', sub: []},
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
        }
    ]
};

export default utils;
