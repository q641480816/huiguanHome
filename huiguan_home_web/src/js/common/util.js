import p1 from '../../recources/temp/1.jpg';
import p2 from '../../recources/temp/2.png';
import p3 from '../../recources/temp/3.jpg';

const utils = {
    contact: {
        name: 'Chin Kang Huay Kuan',
        tel: '(65)62235913 & 62231952 ',
        fax: '(65)62278730',
        email: 'chinkang@singnet.com.sg',
        address: '29 Bukit Pasoh Road #04-01 Singapore 089843'
    },
    naviItems: [
        {id: 1, title: 'HOME', navigation: '/'},
        {id: 2, title: 'ABOUT US', navigation: '/'},
        {id: 3, title: 'EVENT', navigation: '/'},
        {id: 4, title: 'BOARD', navigation: '/'},
        {id: 5, title: 'RESOURCES', navigation: '/'},
        {id: 6, title: 'JOIN US', navigation: '/'},
        {id: 7, title: 'CONTACT US', navigation: '/'},
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
    ]
};

export default utils;
