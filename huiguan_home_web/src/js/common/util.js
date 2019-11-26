import p1 from '../../recources/temp/1.jpg';
import p2 from '../../recources/temp/2.png';
import p3 from '../../recources/temp/3.jpg';

import p1g from '../../recources/temp/1_g.jpg';
import p2g from '../../recources/temp/2_g.jpg';
import p3g from '../../recources/temp/3_g.jpg';
import p4g from '../../recources/temp/4_g.jpg';
import p5g from '../../recources/temp/5_g.png';

const utils = {
    protocol: 'http://',
    baseUrl: 'www.callmedady.com:8080/huiguan/list',
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
        fileToBase64 : (file) => {
            return new Promise(resolve => {
                let reader = new FileReader();
                // Read file content on file loaded event
                reader.onload = (event) => {
                    resolve(event.target.result);
                };
                reader.readAsDataURL(file);
            });
        }
    },
    contact: {
        name: 'Chin Kang Huay Kuan',
        tel: '(65)62235913 & 62231952 ',
        fax: '(65)62278730',
        email: 'chinkang@singnet.com.sg',
        address: '29 Bukit Pasoh Road #04-01 Singapore 089843'
    },
    naviItems: [
        {id: 1, title: '主页', navigation: '/#', sub: [], isRenderList: true},
        {
            id: 2, title: '会馆概况', navigation: '/about', sub: [
                {id: 1, title: '会馆简介', navigation: '/introduction', sub: [], isRenderList: false, articleId: 1},
                {id: 2, title: '会馆章程', navigation: '/rules', sub: [], isRenderList: false, articleId: 2},
                {id: 3, title: '组织结构', navigation: '/structure', sub: [], isRenderList: false, articleId: 3}
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
                {id: 9, title: '妇女部', navigation: '/women', sub: [], isRenderList: true},
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
                {id: 16, title: '联系方式', navigation: '/contact', sub: [], isRenderList: false},
                {id: 17, title: '加入我们', navigation: '/join', sub: [], isRenderList: false},
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
            id: 1,
            title: 'Visa“创无限”创新挑战赛',
            description: '<p>奖金：获奖作品可获得现金 $3000 （如无作品获选，将颁发三份各 $500 的佳作奖）</p><p>所有参赛作品必须于2019年11月29日（星期五）午夜12点之前，通过线上报名表格提交</p>',
            resource: ['https://static01.nyt.com/images/2014/01/13/business/adco/adco-jumbo.jpg?quality=90&auto=webp',
                'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg'],
            resources: [{
                id: 1,
                src: 'https://static01.nyt.com/images/2014/01/13/business/adco/adco-jumbo.jpg?quality=90&auto=webp',
                title: 'Legend 1',
                description: 'cqqcqw'
            },
                {
                    id: 2,
                    src: 'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg',
                    title: 'Legend 2',
                    description: 'fdssfercrqqcqrqrq'
                }],
            time: '06/24/2019',
            content: "<p>Nium, a fast-growing digital cross-border payments platform, is enabling users to make real-time money transfers to Visa debit cardholders across Southeast Asia powered by Visa&rsquo;s real-time1 push payments solution - Visa Direct.</p>\n" +
                "<p>Nium Pte. Ltd. (formerly known as InstaReM Pte. Ltd.) is the first fintech-based money transfer service provider in Southeast Asia to support instant money transfers into recipients&rsquo; bank accounts through their 16-digit Visa debit card numbers. Now live in Singapore, this solution is designed for both peer-to-peer and business-to-business transfers. In the first phase, remittances can be made to various Southeast Asia countries which include Indonesia, Malaysia, Thailand, Vietnam and the Philippines.</p>\n" +
                "<p>Prajit Nanu, co-founder and CEO of Nium said, &ldquo;At Nium, we understand that individuals&rsquo; and businesses&rsquo; need to receive money quickly, especially in markets where there are no instant payment solutions like FAST or IMPS. The partnership using Visa&rsquo;s push payment solution and secure network will allow our consumers to transfer money in a faster, convenient and more secure way.&rdquo;</p>\n" +
                "<p>According to a recent Visa survey2, more than one in three respondents in Singapore make international money transfers at least once a year. The survey findings also indicated that close to half (49 percent) of the respondents expect their funds to be successfully transferred in less than a day, indicating the need for an efficient cross-border money transfer solution.</p>\n" +
                "<p>Kunal Chatterjee, Visa Country Manager for Singapore and Brunei said,&ldquo;Nium is the first Fintech partner from Visa&rsquo;s Fintech Fast Track programme to deliver real-time remittance using our push payment solution Visa Direct. From our survey findings, more than half of respondents usually send international money transfers to either their personal or loved ones&rsquo; bank accounts and one of the most important factors they look at is for money to be transferred in real-time.3 Given that our domestic transfer solutions are already real-time using the FAST infrastructure, it is important to provide consumers the same speed and efficiency for cross border international transfers. We are pleased to work with Nium to leverage Visa&rsquo;s global payments network to bring this seamless and secure payment experience to consumers in this region.,&rdquo; added Kunal.</p>\n" +
                "<p>Nium is a member of Visa&rsquo;s Fintech Fast Track programme. This programme makes it quicker and easier for fintech partners to build and deliver new commerce experiences on Visa&rsquo;s payments network.</p>\n" +
                "<p>1 Actual fund availability depends on receiving financial institution and region. Visa requires fast-funds enabled issuers to make funds available to their recipient cardholders within a maximum of 30 minutes of approving the transaction.</p>\n" +
                "<p>2 Visa commissioned YouGov to interview 1,060 Singaporeans in October 2019 to understand their usage and preference of international money transfers.</p>\n" +
                "<p>3 Visa commissioned YouGov to interview 1,060 Singaporeans in October 2019 to understand their usage and preference of international money transfers.</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>About Visa Inc.</strong></p>\n" +
                "<p>Visa Inc. (NYSE: V) is the world&rsquo;s leader in digital payments. Our mission is to connect the world through the most innovative, reliable and secure payment network - enabling individuals, businesses and economies to thrive. Our advanced global processing network, VisaNet, provides secure and reliable payments around the world, and is capable of handling more than 65,000 transaction messages a second. The company&rsquo;s relentless focus on innovation is a catalyst for the rapid growth of digital commerce on any device for everyone, everywhere. As the world moves from analog to digital, Visa is applying our brand, products, people, network and scale to reshape the future of commerce. For more information, visit www.visa.com.sg</p>\n" +
                "<p><strong>About Nium</strong></p>\n" +
                "<p>Singapore-headquartered Nium (formerly known as InstaReM), is a digital cross-border money transfer platform founded by the team that created InstaReM in 2014.The Nium platform empowers businesses to send , spend &amp; receive across borders, with a mission is to democratize money movement across the globe . Nium is regulated in the U.S., the European Union, Singapore, Canada, Hong Kong, India, Australia and Malaysia, and processes billions of dollars in a year for banks, payments institutions and retail users across the world. Nium&rsquo;s investors include Global Founders Capital, Vertex Ventures, Fullerton Financial Holdings, GSR Ventures, SBI-FMO Emerging Asia Financial Sector Fund, MDI Ventures, Beacon Venture Capital, Vertex Growth Fund and Atinum Investment.</p>"
        },
        {
            id: 2,
            title: '2020年东京残奥会倒计时一周年 Visa持续加大对残奥会选手的支持',
            description: '<p>奖金：获奖作品可获得现金 $3000 （如无作品获选，将颁发三份各 $500 的佳作奖）</p><p>所有参赛作品必须于2019年11月29日（星期五）午夜12点之前，通过线上报名表格提交</p>',
            resource: ['https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg',
                'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg'],
            resources: [{
                id: 1,
                src: 'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg',
                title: 'Legend 1',
                description: 'cqqcqw'
            },
                {
                    id: 2,
                    src: 'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg',
                    title: 'Legend 2',
                    description: 'fdssfercrqqcqrqrq'
                }],
            content: "<p>&bull; Integration of Visa prepaid solution in Razer Pay e-wallet to enable users to make payments at 54 million merchant locations on Visa&rsquo;s global network&nbsp;</p>\n" +
                "<p>&bull; Bringing financial inclusion to Southeast Asia&rsquo;s unbanked and underserved population</p>\n" +
                "<p>Razer&trade;, the leading global lifestyle brand for gamers, and Visa, the world&rsquo;s leader in digital payments, have announced a first of its kind partnership that will transform payments in the gaming industry by bringing the scale and reach of Visa&rsquo;s global network to Razer Pay e-wallet users.&nbsp;&nbsp;</p>\n" +
                "<p>The partnership will see Razer&rsquo;s financial technology arm, Razer Fintech, join Visa&rsquo;s fintech fast-track program, which is designed to make it easier for fintechs to access the global Visa payments network. Here, Razer Fintech and Visa will develop a virtual Visa prepaid solution to be embedded in the Razer Pay e-wallet, that will allow up to 60 million Razer users to make payments wherever Visa is accepted at 54 million merchant locations worldwide.</p>\n" +
                "<p>Chris Clark, Regional President, Asia Pacific, Visa, said: &ldquo;We are pleased to partner with such a forward-looking and innovative company that understands the value and importance of expanding access to digital payments. This announcement reaffirms Visa&rsquo;s commitment to the fast-growing and digitally savvy Southeast Asia region. Together, Visa and Razer Fintech have the opportunity to transform the payments experience for not only the gaming community but many of Southeast Asia&rsquo;s unbanked and underserved consumers as well.&rdquo;</p>\n" +
                "<p>Min-Liang Tan, Co-Founder and CEO of Razer, said: &ldquo;Razer Fintech is a core growth initiative for Razer as we continue to empower digital payments across emerging markets, starting from Southeast Asia. We are incredibly excited with the opportunities that this innovative payment solution serves to millions of consumers, connecting them to an extensive network of merchants globally. This partnership with Visa significantly extends Razer Fintech&rsquo;s position as the largest offline-to-online digital payment network in the region.&rdquo;</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>INTEGRATION OF VISA PREPAID SOLUTION INTO RAZER PAY</strong></p>\n" +
                "<p>Razer Fintech and Visa look to roll out an exclusive Razer-branded Visa prepaid payment solution integrated into Razer Pay via a mini-app, which will cement Razer Pay&rsquo;s position as one of Southeast Asia&rsquo;s leading e-wallet platforms.</p>\n" +
                "<p>By leveraging Visa&rsquo;s global network, Razer Pay users will be able to make payments wherever Visa is accepted. The prepaid solution will complement Razer Pay&rsquo;s existing offerings, which include everyday essentials such as mobile top-ups, leading virtual credits, and entertainment purchases for music and streaming services. Users will also enjoy a slew of exciting benefits and rewards when using their prepaid cards for ecommerce transactions and when they make purchases overseas.&nbsp; &nbsp;</p>\n" +
                "<p>The integrated prepaid card solution will offer users the same convenient top-up and cash-out methods available on Razer Pay, underpinned by an advanced privacy and security framework. Razer Pay has collaborated with innovative partners to amplify its existing offerings by introducing ride-hailing, movie ticketing, and utility payments in streamlined mini-applications.</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>BRINGING FINANCIAL INCLUSION TO SOUTHEAST ASIA&rsquo;S UNBANKED AND UNDERSERVED</strong></p>\n" +
                "<p>Southeast Asia has a large unbanked and underserved population of over 438 million1. The partnership between Razer Fintech and Visa has the potential to extend micro-financial services to this underserved segment. Southeast Asia is also home to a massive youth and millennial population of over 213 million.2</p>\n" +
                "<p>The collaboration between Razer Fintech and Visa aims to empower this segment of early adopters and introduce interactive and straightforward financial planning capabilities with a Razer-gamified twist. These capabilities will help to enhance the financial literacy levels of the Southeast Asia population. Razer Fintech and Visa&rsquo;s partnership will help meet the unmet demands of this sizeable market and provide innovative financial tools for youths and millennials to participate in the global cashless economy.</p>\n" +
                "<p>Razer Fintech and Visa anticipate rolling out these solutions progressively in selected countries across Southeast Asia in the coming months, before expanding globally.</p>\n" +
                "<p>1 KPMG Fintech: Opening the door to the unbanked and underbanked in Southeast Asia, accessed at: https://home.kpmg/xx/en/home/insights/2016/04/fintech-opening-the-door-to-the-unbanked-and-underbanked-in-southeast-asia.html</p>\n" +
                "<p>2 ASEAN&rsquo;s First ASEAN Youth Development Index 2017</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>ABOUT RAZER</strong></p>\n" +
                "<p>Razer&trade; is the world&rsquo;s leading lifestyle brand for gamers. The triple-headed snake trademark of Razer is one of the most recognized logos in the global gaming and esports communities. With a fan base that spans every continent, the company has designed and built the world&rsquo;s largest gamer-focused ecosystem of hardware, software and services.</p>\n" +
                "<p>Razer&rsquo;s award-winning hardware includes high-performance gaming peripherals, Blade gaming laptops and the acclaimed Razer Phone. Razer&rsquo;s software platform, with over 60 million users, includes Razer Synapse (an Internet of Things platform), Razer Chroma (a proprietary RGB lighting technology system), and Razer Cortex (a game optimizer and launcher). In services, Razer Gold is one of the world&rsquo;s largest virtual credit services for gamers, and Razer Pay is the e-wallet designed for youth and millennials.&nbsp;</p>\n" +
                "<p>Founded in 2005 and dual-headquartered in San Francisco and Singapore, Razer has 18 offices worldwide and is recognized as the leading brand for gamers in the USA, Europe and Mainland China. Razer is listed on the Hong Kong Stock Exchange (Stock Code: 1337).</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>ABOUT VISA INC.</strong></p>\n" +
                "<p>Visa Inc. (NYSE: V) is the world&rsquo;s leader in digital payments. Our mission is to connect the world through the most innovative, reliable and secure payment network - enabling individuals, businesses and economies to thrive. Our advanced global processing network, VisaNet, provides secure and reliable payments around the world and is capable of handling more than 65,000 transaction messages a second. The company&rsquo;s relentless focus on innovation is a catalyst for the rapid growth of connected commerce on any device, and a driving force behind the dream of a cashless future for everyone, everywhere. As the world moves from analog to digital, Visa is applying our brand, products, people, network and scale to reshape the future of commerce.</p>"
        },
        {
            id: 3,
            title: 'Visa利用人工智能技术成功防范约250亿美元的年欺诈交易损失',
            description: '<p>从2019年9月1日起，为符合新加坡个人资料保护委员会的身份证件条例，以及为巩固会员个人资料的安全性，福建会馆将不再收集或使用会员的完整身份证号码。</p>',
            resource: ['https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg',
                'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg'],
            resources: [{
                id: 1,
                src: 'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg',
                title: 'Legend 1',
                description: 'cqqcqw'
            },
                {
                    id: 2,
                    src: 'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg',
                    title: 'Legend 2',
                    description: 'fdssfercrqqcqrqrq'
                }],
            content: "<p>Nium, a fast-growing digital cross-border payments platform, is enabling users to make real-time money transfers to Visa debit cardholders across Southeast Asia powered by Visa&rsquo;s real-time1 push payments solution - Visa Direct.</p>\n" +
                "<p>Nium Pte. Ltd. (formerly known as InstaReM Pte. Ltd.) is the first fintech-based money transfer service provider in Southeast Asia to support instant money transfers into recipients&rsquo; bank accounts through their 16-digit Visa debit card numbers. Now live in Singapore, this solution is designed for both peer-to-peer and business-to-business transfers. In the first phase, remittances can be made to various Southeast Asia countries which include Indonesia, Malaysia, Thailand, Vietnam and the Philippines.</p>\n" +
                "<p>Prajit Nanu, co-founder and CEO of Nium said, &ldquo;At Nium, we understand that individuals&rsquo; and businesses&rsquo; need to receive money quickly, especially in markets where there are no instant payment solutions like FAST or IMPS. The partnership using Visa&rsquo;s push payment solution and secure network will allow our consumers to transfer money in a faster, convenient and more secure way.&rdquo;</p>\n" +
                "<p>According to a recent Visa survey2, more than one in three respondents in Singapore make international money transfers at least once a year. The survey findings also indicated that close to half (49 percent) of the respondents expect their funds to be successfully transferred in less than a day, indicating the need for an efficient cross-border money transfer solution.</p>\n" +
                "<p>Kunal Chatterjee, Visa Country Manager for Singapore and Brunei said,&ldquo;Nium is the first Fintech partner from Visa&rsquo;s Fintech Fast Track programme to deliver real-time remittance using our push payment solution Visa Direct. From our survey findings, more than half of respondents usually send international money transfers to either their personal or loved ones&rsquo; bank accounts and one of the most important factors they look at is for money to be transferred in real-time.3 Given that our domestic transfer solutions are already real-time using the FAST infrastructure, it is important to provide consumers the same speed and efficiency for cross border international transfers. We are pleased to work with Nium to leverage Visa&rsquo;s global payments network to bring this seamless and secure payment experience to consumers in this region.,&rdquo; added Kunal.</p>\n" +
                "<p>Nium is a member of Visa&rsquo;s Fintech Fast Track programme. This programme makes it quicker and easier for fintech partners to build and deliver new commerce experiences on Visa&rsquo;s payments network.</p>\n" +
                "<p>1 Actual fund availability depends on receiving financial institution and region. Visa requires fast-funds enabled issuers to make funds available to their recipient cardholders within a maximum of 30 minutes of approving the transaction.</p>\n" +
                "<p>2 Visa commissioned YouGov to interview 1,060 Singaporeans in October 2019 to understand their usage and preference of international money transfers.</p>\n" +
                "<p>3 Visa commissioned YouGov to interview 1,060 Singaporeans in October 2019 to understand their usage and preference of international money transfers.</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>About Visa Inc.</strong></p>\n" +
                "<p>Visa Inc. (NYSE: V) is the world&rsquo;s leader in digital payments. Our mission is to connect the world through the most innovative, reliable and secure payment network - enabling individuals, businesses and economies to thrive. Our advanced global processing network, VisaNet, provides secure and reliable payments around the world, and is capable of handling more than 65,000 transaction messages a second. The company&rsquo;s relentless focus on innovation is a catalyst for the rapid growth of digital commerce on any device for everyone, everywhere. As the world moves from analog to digital, Visa is applying our brand, products, people, network and scale to reshape the future of commerce. For more information, visit www.visa.com.sg</p>\n" +
                "<p><strong>About Nium</strong></p>\n" +
                "<p>Singapore-headquartered Nium (formerly known as InstaReM), is a digital cross-border money transfer platform founded by the team that created InstaReM in 2014.The Nium platform empowers businesses to send , spend &amp; receive across borders, with a mission is to democratize money movement across the globe . Nium is regulated in the U.S., the European Union, Singapore, Canada, Hong Kong, India, Australia and Malaysia, and processes billions of dollars in a year for banks, payments institutions and retail users across the world. Nium&rsquo;s investors include Global Founders Capital, Vertex Ventures, Fullerton Financial Holdings, GSR Ventures, SBI-FMO Emerging Asia Financial Sector Fund, MDI Ventures, Beacon Venture Capital, Vertex Growth Fund and Atinum Investment.</p>"
        },
        {
            id: 4,
            title: '通知：独特会员识别号码',
            description: '<p>从2019年9月1日起，为符合新加坡个人资料保护委员会的身份证件条例，以及为巩固会员个人资料的安全性，福建会馆将不再收集或使用会员的完整身份证号码。</p>',
            resource: [],
            content: "<p>&bull; Integration of Visa prepaid solution in Razer Pay e-wallet to enable users to make payments at 54 million merchant locations on Visa&rsquo;s global network&nbsp;</p>\n" +
                "<p>&bull; Bringing financial inclusion to Southeast Asia&rsquo;s unbanked and underserved population</p>\n" +
                "<p>Razer&trade;, the leading global lifestyle brand for gamers, and Visa, the world&rsquo;s leader in digital payments, have announced a first of its kind partnership that will transform payments in the gaming industry by bringing the scale and reach of Visa&rsquo;s global network to Razer Pay e-wallet users.&nbsp;&nbsp;</p>\n" +
                "<p>The partnership will see Razer&rsquo;s financial technology arm, Razer Fintech, join Visa&rsquo;s fintech fast-track program, which is designed to make it easier for fintechs to access the global Visa payments network. Here, Razer Fintech and Visa will develop a virtual Visa prepaid solution to be embedded in the Razer Pay e-wallet, that will allow up to 60 million Razer users to make payments wherever Visa is accepted at 54 million merchant locations worldwide.</p>\n" +
                "<p>Chris Clark, Regional President, Asia Pacific, Visa, said: &ldquo;We are pleased to partner with such a forward-looking and innovative company that understands the value and importance of expanding access to digital payments. This announcement reaffirms Visa&rsquo;s commitment to the fast-growing and digitally savvy Southeast Asia region. Together, Visa and Razer Fintech have the opportunity to transform the payments experience for not only the gaming community but many of Southeast Asia&rsquo;s unbanked and underserved consumers as well.&rdquo;</p>\n" +
                "<p>Min-Liang Tan, Co-Founder and CEO of Razer, said: &ldquo;Razer Fintech is a core growth initiative for Razer as we continue to empower digital payments across emerging markets, starting from Southeast Asia. We are incredibly excited with the opportunities that this innovative payment solution serves to millions of consumers, connecting them to an extensive network of merchants globally. This partnership with Visa significantly extends Razer Fintech&rsquo;s position as the largest offline-to-online digital payment network in the region.&rdquo;</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>INTEGRATION OF VISA PREPAID SOLUTION INTO RAZER PAY</strong></p>\n" +
                "<p>Razer Fintech and Visa look to roll out an exclusive Razer-branded Visa prepaid payment solution integrated into Razer Pay via a mini-app, which will cement Razer Pay&rsquo;s position as one of Southeast Asia&rsquo;s leading e-wallet platforms.</p>\n" +
                "<p>By leveraging Visa&rsquo;s global network, Razer Pay users will be able to make payments wherever Visa is accepted. The prepaid solution will complement Razer Pay&rsquo;s existing offerings, which include everyday essentials such as mobile top-ups, leading virtual credits, and entertainment purchases for music and streaming services. Users will also enjoy a slew of exciting benefits and rewards when using their prepaid cards for ecommerce transactions and when they make purchases overseas.&nbsp; &nbsp;</p>\n" +
                "<p>The integrated prepaid card solution will offer users the same convenient top-up and cash-out methods available on Razer Pay, underpinned by an advanced privacy and security framework. Razer Pay has collaborated with innovative partners to amplify its existing offerings by introducing ride-hailing, movie ticketing, and utility payments in streamlined mini-applications.</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>BRINGING FINANCIAL INCLUSION TO SOUTHEAST ASIA&rsquo;S UNBANKED AND UNDERSERVED</strong></p>\n" +
                "<p>Southeast Asia has a large unbanked and underserved population of over 438 million1. The partnership between Razer Fintech and Visa has the potential to extend micro-financial services to this underserved segment. Southeast Asia is also home to a massive youth and millennial population of over 213 million.2</p>\n" +
                "<p>The collaboration between Razer Fintech and Visa aims to empower this segment of early adopters and introduce interactive and straightforward financial planning capabilities with a Razer-gamified twist. These capabilities will help to enhance the financial literacy levels of the Southeast Asia population. Razer Fintech and Visa&rsquo;s partnership will help meet the unmet demands of this sizeable market and provide innovative financial tools for youths and millennials to participate in the global cashless economy.</p>\n" +
                "<p>Razer Fintech and Visa anticipate rolling out these solutions progressively in selected countries across Southeast Asia in the coming months, before expanding globally.</p>\n" +
                "<p>1 KPMG Fintech: Opening the door to the unbanked and underbanked in Southeast Asia, accessed at: https://home.kpmg/xx/en/home/insights/2016/04/fintech-opening-the-door-to-the-unbanked-and-underbanked-in-southeast-asia.html</p>\n" +
                "<p>2 ASEAN&rsquo;s First ASEAN Youth Development Index 2017</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>ABOUT RAZER</strong></p>\n" +
                "<p>Razer&trade; is the world&rsquo;s leading lifestyle brand for gamers. The triple-headed snake trademark of Razer is one of the most recognized logos in the global gaming and esports communities. With a fan base that spans every continent, the company has designed and built the world&rsquo;s largest gamer-focused ecosystem of hardware, software and services.</p>\n" +
                "<p>Razer&rsquo;s award-winning hardware includes high-performance gaming peripherals, Blade gaming laptops and the acclaimed Razer Phone. Razer&rsquo;s software platform, with over 60 million users, includes Razer Synapse (an Internet of Things platform), Razer Chroma (a proprietary RGB lighting technology system), and Razer Cortex (a game optimizer and launcher). In services, Razer Gold is one of the world&rsquo;s largest virtual credit services for gamers, and Razer Pay is the e-wallet designed for youth and millennials.&nbsp;</p>\n" +
                "<p>Founded in 2005 and dual-headquartered in San Francisco and Singapore, Razer has 18 offices worldwide and is recognized as the leading brand for gamers in the USA, Europe and Mainland China. Razer is listed on the Hong Kong Stock Exchange (Stock Code: 1337).</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>ABOUT VISA INC.</strong></p>\n" +
                "<p>Visa Inc. (NYSE: V) is the world&rsquo;s leader in digital payments. Our mission is to connect the world through the most innovative, reliable and secure payment network - enabling individuals, businesses and economies to thrive. Our advanced global processing network, VisaNet, provides secure and reliable payments around the world and is capable of handling more than 65,000 transaction messages a second. The company&rsquo;s relentless focus on innovation is a catalyst for the rapid growth of connected commerce on any device, and a driving force behind the dream of a cashless future for everyone, everywhere. As the world moves from analog to digital, Visa is applying our brand, products, people, network and scale to reshape the future of commerce.</p>"
        },
        {
            id: 5,
            title: '通知：独特会员识别号码',
            description: '<p>奖金：获奖作品可获得现金 $3000 （如无作品获选，将颁发三份各 $500 的佳作奖）</p><p>所有参赛作品必须于2019年11月29日（星期五）午夜12点之前，通过线上报名表格提交</p>',
            resource: ['https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg',
                'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg'],
            content: "<p>&bull; Integration of Visa prepaid solution in Razer Pay e-wallet to enable users to make payments at 54 million merchant locations on Visa&rsquo;s global network&nbsp;</p>\n" +
                "<p>&bull; Bringing financial inclusion to Southeast Asia&rsquo;s unbanked and underserved population</p>\n" +
                "<p>Razer&trade;, the leading global lifestyle brand for gamers, and Visa, the world&rsquo;s leader in digital payments, have announced a first of its kind partnership that will transform payments in the gaming industry by bringing the scale and reach of Visa&rsquo;s global network to Razer Pay e-wallet users.&nbsp;&nbsp;</p>\n" +
                "<p>The partnership will see Razer&rsquo;s financial technology arm, Razer Fintech, join Visa&rsquo;s fintech fast-track program, which is designed to make it easier for fintechs to access the global Visa payments network. Here, Razer Fintech and Visa will develop a virtual Visa prepaid solution to be embedded in the Razer Pay e-wallet, that will allow up to 60 million Razer users to make payments wherever Visa is accepted at 54 million merchant locations worldwide.</p>\n" +
                "<p>Chris Clark, Regional President, Asia Pacific, Visa, said: &ldquo;We are pleased to partner with such a forward-looking and innovative company that understands the value and importance of expanding access to digital payments. This announcement reaffirms Visa&rsquo;s commitment to the fast-growing and digitally savvy Southeast Asia region. Together, Visa and Razer Fintech have the opportunity to transform the payments experience for not only the gaming community but many of Southeast Asia&rsquo;s unbanked and underserved consumers as well.&rdquo;</p>\n" +
                "<p>Min-Liang Tan, Co-Founder and CEO of Razer, said: &ldquo;Razer Fintech is a core growth initiative for Razer as we continue to empower digital payments across emerging markets, starting from Southeast Asia. We are incredibly excited with the opportunities that this innovative payment solution serves to millions of consumers, connecting them to an extensive network of merchants globally. This partnership with Visa significantly extends Razer Fintech&rsquo;s position as the largest offline-to-online digital payment network in the region.&rdquo;</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>INTEGRATION OF VISA PREPAID SOLUTION INTO RAZER PAY</strong></p>\n" +
                "<p>Razer Fintech and Visa look to roll out an exclusive Razer-branded Visa prepaid payment solution integrated into Razer Pay via a mini-app, which will cement Razer Pay&rsquo;s position as one of Southeast Asia&rsquo;s leading e-wallet platforms.</p>\n" +
                "<p>By leveraging Visa&rsquo;s global network, Razer Pay users will be able to make payments wherever Visa is accepted. The prepaid solution will complement Razer Pay&rsquo;s existing offerings, which include everyday essentials such as mobile top-ups, leading virtual credits, and entertainment purchases for music and streaming services. Users will also enjoy a slew of exciting benefits and rewards when using their prepaid cards for ecommerce transactions and when they make purchases overseas.&nbsp; &nbsp;</p>\n" +
                "<p>The integrated prepaid card solution will offer users the same convenient top-up and cash-out methods available on Razer Pay, underpinned by an advanced privacy and security framework. Razer Pay has collaborated with innovative partners to amplify its existing offerings by introducing ride-hailing, movie ticketing, and utility payments in streamlined mini-applications.</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>BRINGING FINANCIAL INCLUSION TO SOUTHEAST ASIA&rsquo;S UNBANKED AND UNDERSERVED</strong></p>\n" +
                "<p>Southeast Asia has a large unbanked and underserved population of over 438 million1. The partnership between Razer Fintech and Visa has the potential to extend micro-financial services to this underserved segment. Southeast Asia is also home to a massive youth and millennial population of over 213 million.2</p>\n" +
                "<p>The collaboration between Razer Fintech and Visa aims to empower this segment of early adopters and introduce interactive and straightforward financial planning capabilities with a Razer-gamified twist. These capabilities will help to enhance the financial literacy levels of the Southeast Asia population. Razer Fintech and Visa&rsquo;s partnership will help meet the unmet demands of this sizeable market and provide innovative financial tools for youths and millennials to participate in the global cashless economy.</p>\n" +
                "<p>Razer Fintech and Visa anticipate rolling out these solutions progressively in selected countries across Southeast Asia in the coming months, before expanding globally.</p>\n" +
                "<p>1 KPMG Fintech: Opening the door to the unbanked and underbanked in Southeast Asia, accessed at: https://home.kpmg/xx/en/home/insights/2016/04/fintech-opening-the-door-to-the-unbanked-and-underbanked-in-southeast-asia.html</p>\n" +
                "<p>2 ASEAN&rsquo;s First ASEAN Youth Development Index 2017</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>ABOUT RAZER</strong></p>\n" +
                "<p>Razer&trade; is the world&rsquo;s leading lifestyle brand for gamers. The triple-headed snake trademark of Razer is one of the most recognized logos in the global gaming and esports communities. With a fan base that spans every continent, the company has designed and built the world&rsquo;s largest gamer-focused ecosystem of hardware, software and services.</p>\n" +
                "<p>Razer&rsquo;s award-winning hardware includes high-performance gaming peripherals, Blade gaming laptops and the acclaimed Razer Phone. Razer&rsquo;s software platform, with over 60 million users, includes Razer Synapse (an Internet of Things platform), Razer Chroma (a proprietary RGB lighting technology system), and Razer Cortex (a game optimizer and launcher). In services, Razer Gold is one of the world&rsquo;s largest virtual credit services for gamers, and Razer Pay is the e-wallet designed for youth and millennials.&nbsp;</p>\n" +
                "<p>Founded in 2005 and dual-headquartered in San Francisco and Singapore, Razer has 18 offices worldwide and is recognized as the leading brand for gamers in the USA, Europe and Mainland China. Razer is listed on the Hong Kong Stock Exchange (Stock Code: 1337).</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>ABOUT VISA INC.</strong></p>\n" +
                "<p>Visa Inc. (NYSE: V) is the world&rsquo;s leader in digital payments. Our mission is to connect the world through the most innovative, reliable and secure payment network - enabling individuals, businesses and economies to thrive. Our advanced global processing network, VisaNet, provides secure and reliable payments around the world and is capable of handling more than 65,000 transaction messages a second. The company&rsquo;s relentless focus on innovation is a catalyst for the rapid growth of connected commerce on any device, and a driving force behind the dream of a cashless future for everyone, everywhere. As the world moves from analog to digital, Visa is applying our brand, products, people, network and scale to reshape the future of commerce.</p>"
        },
        {
            id: 6,
            title: '通知：独特会员识别号码',
            description: '<p>从2019年9月1日起，为符合新加坡个人资料保护委员会的身份证件条例，以及为巩固会员个人资料的安全性，福建会馆将不再收集或使用会员的完整身份证号码。</p>',
            resource: [],
            content: "<p>&bull; Integration of Visa prepaid solution in Razer Pay e-wallet to enable users to make payments at 54 million merchant locations on Visa&rsquo;s global network&nbsp;</p>\n" +
                "<p>&bull; Bringing financial inclusion to Southeast Asia&rsquo;s unbanked and underserved population</p>\n" +
                "<p>Razer&trade;, the leading global lifestyle brand for gamers, and Visa, the world&rsquo;s leader in digital payments, have announced a first of its kind partnership that will transform payments in the gaming industry by bringing the scale and reach of Visa&rsquo;s global network to Razer Pay e-wallet users.&nbsp;&nbsp;</p>\n" +
                "<p>The partnership will see Razer&rsquo;s financial technology arm, Razer Fintech, join Visa&rsquo;s fintech fast-track program, which is designed to make it easier for fintechs to access the global Visa payments network. Here, Razer Fintech and Visa will develop a virtual Visa prepaid solution to be embedded in the Razer Pay e-wallet, that will allow up to 60 million Razer users to make payments wherever Visa is accepted at 54 million merchant locations worldwide.</p>\n" +
                "<p>Chris Clark, Regional President, Asia Pacific, Visa, said: &ldquo;We are pleased to partner with such a forward-looking and innovative company that understands the value and importance of expanding access to digital payments. This announcement reaffirms Visa&rsquo;s commitment to the fast-growing and digitally savvy Southeast Asia region. Together, Visa and Razer Fintech have the opportunity to transform the payments experience for not only the gaming community but many of Southeast Asia&rsquo;s unbanked and underserved consumers as well.&rdquo;</p>\n" +
                "<p>Min-Liang Tan, Co-Founder and CEO of Razer, said: &ldquo;Razer Fintech is a core growth initiative for Razer as we continue to empower digital payments across emerging markets, starting from Southeast Asia. We are incredibly excited with the opportunities that this innovative payment solution serves to millions of consumers, connecting them to an extensive network of merchants globally. This partnership with Visa significantly extends Razer Fintech&rsquo;s position as the largest offline-to-online digital payment network in the region.&rdquo;</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>INTEGRATION OF VISA PREPAID SOLUTION INTO RAZER PAY</strong></p>\n" +
                "<p>Razer Fintech and Visa look to roll out an exclusive Razer-branded Visa prepaid payment solution integrated into Razer Pay via a mini-app, which will cement Razer Pay&rsquo;s position as one of Southeast Asia&rsquo;s leading e-wallet platforms.</p>\n" +
                "<p>By leveraging Visa&rsquo;s global network, Razer Pay users will be able to make payments wherever Visa is accepted. The prepaid solution will complement Razer Pay&rsquo;s existing offerings, which include everyday essentials such as mobile top-ups, leading virtual credits, and entertainment purchases for music and streaming services. Users will also enjoy a slew of exciting benefits and rewards when using their prepaid cards for ecommerce transactions and when they make purchases overseas.&nbsp; &nbsp;</p>\n" +
                "<p>The integrated prepaid card solution will offer users the same convenient top-up and cash-out methods available on Razer Pay, underpinned by an advanced privacy and security framework. Razer Pay has collaborated with innovative partners to amplify its existing offerings by introducing ride-hailing, movie ticketing, and utility payments in streamlined mini-applications.</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>BRINGING FINANCIAL INCLUSION TO SOUTHEAST ASIA&rsquo;S UNBANKED AND UNDERSERVED</strong></p>\n" +
                "<p>Southeast Asia has a large unbanked and underserved population of over 438 million1. The partnership between Razer Fintech and Visa has the potential to extend micro-financial services to this underserved segment. Southeast Asia is also home to a massive youth and millennial population of over 213 million.2</p>\n" +
                "<p>The collaboration between Razer Fintech and Visa aims to empower this segment of early adopters and introduce interactive and straightforward financial planning capabilities with a Razer-gamified twist. These capabilities will help to enhance the financial literacy levels of the Southeast Asia population. Razer Fintech and Visa&rsquo;s partnership will help meet the unmet demands of this sizeable market and provide innovative financial tools for youths and millennials to participate in the global cashless economy.</p>\n" +
                "<p>Razer Fintech and Visa anticipate rolling out these solutions progressively in selected countries across Southeast Asia in the coming months, before expanding globally.</p>\n" +
                "<p>1 KPMG Fintech: Opening the door to the unbanked and underbanked in Southeast Asia, accessed at: https://home.kpmg/xx/en/home/insights/2016/04/fintech-opening-the-door-to-the-unbanked-and-underbanked-in-southeast-asia.html</p>\n" +
                "<p>2 ASEAN&rsquo;s First ASEAN Youth Development Index 2017</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>ABOUT RAZER</strong></p>\n" +
                "<p>Razer&trade; is the world&rsquo;s leading lifestyle brand for gamers. The triple-headed snake trademark of Razer is one of the most recognized logos in the global gaming and esports communities. With a fan base that spans every continent, the company has designed and built the world&rsquo;s largest gamer-focused ecosystem of hardware, software and services.</p>\n" +
                "<p>Razer&rsquo;s award-winning hardware includes high-performance gaming peripherals, Blade gaming laptops and the acclaimed Razer Phone. Razer&rsquo;s software platform, with over 60 million users, includes Razer Synapse (an Internet of Things platform), Razer Chroma (a proprietary RGB lighting technology system), and Razer Cortex (a game optimizer and launcher). In services, Razer Gold is one of the world&rsquo;s largest virtual credit services for gamers, and Razer Pay is the e-wallet designed for youth and millennials.&nbsp;</p>\n" +
                "<p>Founded in 2005 and dual-headquartered in San Francisco and Singapore, Razer has 18 offices worldwide and is recognized as the leading brand for gamers in the USA, Europe and Mainland China. Razer is listed on the Hong Kong Stock Exchange (Stock Code: 1337).</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>ABOUT VISA INC.</strong></p>\n" +
                "<p>Visa Inc. (NYSE: V) is the world&rsquo;s leader in digital payments. Our mission is to connect the world through the most innovative, reliable and secure payment network - enabling individuals, businesses and economies to thrive. Our advanced global processing network, VisaNet, provides secure and reliable payments around the world and is capable of handling more than 65,000 transaction messages a second. The company&rsquo;s relentless focus on innovation is a catalyst for the rapid growth of connected commerce on any device, and a driving force behind the dream of a cashless future for everyone, everywhere. As the world moves from analog to digital, Visa is applying our brand, products, people, network and scale to reshape the future of commerce.</p>"
        },
        {
            id: 7,
            title: '通知：独特会员识别号码',
            description: '<p>奖金：获奖作品可获得现金 $3000 （如无作品获选，将颁发三份各 $500 的佳作奖）</p><p>所有参赛作品必须于2019年11月29日（星期五）午夜12点之前，通过线上报名表格提交</p>',
            resource: [],
            content: "<p>&bull; Integration of Visa prepaid solution in Razer Pay e-wallet to enable users to make payments at 54 million merchant locations on Visa&rsquo;s global network&nbsp;</p>\n" +
                "<p>&bull; Bringing financial inclusion to Southeast Asia&rsquo;s unbanked and underserved population</p>\n" +
                "<p>Razer&trade;, the leading global lifestyle brand for gamers, and Visa, the world&rsquo;s leader in digital payments, have announced a first of its kind partnership that will transform payments in the gaming industry by bringing the scale and reach of Visa&rsquo;s global network to Razer Pay e-wallet users.&nbsp;&nbsp;</p>\n" +
                "<p>The partnership will see Razer&rsquo;s financial technology arm, Razer Fintech, join Visa&rsquo;s fintech fast-track program, which is designed to make it easier for fintechs to access the global Visa payments network. Here, Razer Fintech and Visa will develop a virtual Visa prepaid solution to be embedded in the Razer Pay e-wallet, that will allow up to 60 million Razer users to make payments wherever Visa is accepted at 54 million merchant locations worldwide.</p>\n" +
                "<p>Chris Clark, Regional President, Asia Pacific, Visa, said: &ldquo;We are pleased to partner with such a forward-looking and innovative company that understands the value and importance of expanding access to digital payments. This announcement reaffirms Visa&rsquo;s commitment to the fast-growing and digitally savvy Southeast Asia region. Together, Visa and Razer Fintech have the opportunity to transform the payments experience for not only the gaming community but many of Southeast Asia&rsquo;s unbanked and underserved consumers as well.&rdquo;</p>\n" +
                "<p>Min-Liang Tan, Co-Founder and CEO of Razer, said: &ldquo;Razer Fintech is a core growth initiative for Razer as we continue to empower digital payments across emerging markets, starting from Southeast Asia. We are incredibly excited with the opportunities that this innovative payment solution serves to millions of consumers, connecting them to an extensive network of merchants globally. This partnership with Visa significantly extends Razer Fintech&rsquo;s position as the largest offline-to-online digital payment network in the region.&rdquo;</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>INTEGRATION OF VISA PREPAID SOLUTION INTO RAZER PAY</strong></p>\n" +
                "<p>Razer Fintech and Visa look to roll out an exclusive Razer-branded Visa prepaid payment solution integrated into Razer Pay via a mini-app, which will cement Razer Pay&rsquo;s position as one of Southeast Asia&rsquo;s leading e-wallet platforms.</p>\n" +
                "<p>By leveraging Visa&rsquo;s global network, Razer Pay users will be able to make payments wherever Visa is accepted. The prepaid solution will complement Razer Pay&rsquo;s existing offerings, which include everyday essentials such as mobile top-ups, leading virtual credits, and entertainment purchases for music and streaming services. Users will also enjoy a slew of exciting benefits and rewards when using their prepaid cards for ecommerce transactions and when they make purchases overseas.&nbsp; &nbsp;</p>\n" +
                "<p>The integrated prepaid card solution will offer users the same convenient top-up and cash-out methods available on Razer Pay, underpinned by an advanced privacy and security framework. Razer Pay has collaborated with innovative partners to amplify its existing offerings by introducing ride-hailing, movie ticketing, and utility payments in streamlined mini-applications.</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>BRINGING FINANCIAL INCLUSION TO SOUTHEAST ASIA&rsquo;S UNBANKED AND UNDERSERVED</strong></p>\n" +
                "<p>Southeast Asia has a large unbanked and underserved population of over 438 million1. The partnership between Razer Fintech and Visa has the potential to extend micro-financial services to this underserved segment. Southeast Asia is also home to a massive youth and millennial population of over 213 million.2</p>\n" +
                "<p>The collaboration between Razer Fintech and Visa aims to empower this segment of early adopters and introduce interactive and straightforward financial planning capabilities with a Razer-gamified twist. These capabilities will help to enhance the financial literacy levels of the Southeast Asia population. Razer Fintech and Visa&rsquo;s partnership will help meet the unmet demands of this sizeable market and provide innovative financial tools for youths and millennials to participate in the global cashless economy.</p>\n" +
                "<p>Razer Fintech and Visa anticipate rolling out these solutions progressively in selected countries across Southeast Asia in the coming months, before expanding globally.</p>\n" +
                "<p>1 KPMG Fintech: Opening the door to the unbanked and underbanked in Southeast Asia, accessed at: https://home.kpmg/xx/en/home/insights/2016/04/fintech-opening-the-door-to-the-unbanked-and-underbanked-in-southeast-asia.html</p>\n" +
                "<p>2 ASEAN&rsquo;s First ASEAN Youth Development Index 2017</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>ABOUT RAZER</strong></p>\n" +
                "<p>Razer&trade; is the world&rsquo;s leading lifestyle brand for gamers. The triple-headed snake trademark of Razer is one of the most recognized logos in the global gaming and esports communities. With a fan base that spans every continent, the company has designed and built the world&rsquo;s largest gamer-focused ecosystem of hardware, software and services.</p>\n" +
                "<p>Razer&rsquo;s award-winning hardware includes high-performance gaming peripherals, Blade gaming laptops and the acclaimed Razer Phone. Razer&rsquo;s software platform, with over 60 million users, includes Razer Synapse (an Internet of Things platform), Razer Chroma (a proprietary RGB lighting technology system), and Razer Cortex (a game optimizer and launcher). In services, Razer Gold is one of the world&rsquo;s largest virtual credit services for gamers, and Razer Pay is the e-wallet designed for youth and millennials.&nbsp;</p>\n" +
                "<p>Founded in 2005 and dual-headquartered in San Francisco and Singapore, Razer has 18 offices worldwide and is recognized as the leading brand for gamers in the USA, Europe and Mainland China. Razer is listed on the Hong Kong Stock Exchange (Stock Code: 1337).</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>ABOUT VISA INC.</strong></p>\n" +
                "<p>Visa Inc. (NYSE: V) is the world&rsquo;s leader in digital payments. Our mission is to connect the world through the most innovative, reliable and secure payment network - enabling individuals, businesses and economies to thrive. Our advanced global processing network, VisaNet, provides secure and reliable payments around the world and is capable of handling more than 65,000 transaction messages a second. The company&rsquo;s relentless focus on innovation is a catalyst for the rapid growth of connected commerce on any device, and a driving force behind the dream of a cashless future for everyone, everywhere. As the world moves from analog to digital, Visa is applying our brand, products, people, network and scale to reshape the future of commerce.</p>"
        },
        {
            id: 8,
            title: '通知：独特会员识别号码',
            description: '<p>从2019年9月1日起，为符合新加坡个人资料保护委员会的身份证件条例，以及为巩固会员个人资料的安全性，福建会馆将不再收集或使用会员的完整身份证号码。</p>',
            resource: ['https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg'],
            content: "<p>&bull; Integration of Visa prepaid solution in Razer Pay e-wallet to enable users to make payments at 54 million merchant locations on Visa&rsquo;s global network&nbsp;</p>\n" +
                "<p>&bull; Bringing financial inclusion to Southeast Asia&rsquo;s unbanked and underserved population</p>\n" +
                "<p>Razer&trade;, the leading global lifestyle brand for gamers, and Visa, the world&rsquo;s leader in digital payments, have announced a first of its kind partnership that will transform payments in the gaming industry by bringing the scale and reach of Visa&rsquo;s global network to Razer Pay e-wallet users.&nbsp;&nbsp;</p>\n" +
                "<p>The partnership will see Razer&rsquo;s financial technology arm, Razer Fintech, join Visa&rsquo;s fintech fast-track program, which is designed to make it easier for fintechs to access the global Visa payments network. Here, Razer Fintech and Visa will develop a virtual Visa prepaid solution to be embedded in the Razer Pay e-wallet, that will allow up to 60 million Razer users to make payments wherever Visa is accepted at 54 million merchant locations worldwide.</p>\n" +
                "<p>Chris Clark, Regional President, Asia Pacific, Visa, said: &ldquo;We are pleased to partner with such a forward-looking and innovative company that understands the value and importance of expanding access to digital payments. This announcement reaffirms Visa&rsquo;s commitment to the fast-growing and digitally savvy Southeast Asia region. Together, Visa and Razer Fintech have the opportunity to transform the payments experience for not only the gaming community but many of Southeast Asia&rsquo;s unbanked and underserved consumers as well.&rdquo;</p>\n" +
                "<p>Min-Liang Tan, Co-Founder and CEO of Razer, said: &ldquo;Razer Fintech is a core growth initiative for Razer as we continue to empower digital payments across emerging markets, starting from Southeast Asia. We are incredibly excited with the opportunities that this innovative payment solution serves to millions of consumers, connecting them to an extensive network of merchants globally. This partnership with Visa significantly extends Razer Fintech&rsquo;s position as the largest offline-to-online digital payment network in the region.&rdquo;</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>INTEGRATION OF VISA PREPAID SOLUTION INTO RAZER PAY</strong></p>\n" +
                "<p>Razer Fintech and Visa look to roll out an exclusive Razer-branded Visa prepaid payment solution integrated into Razer Pay via a mini-app, which will cement Razer Pay&rsquo;s position as one of Southeast Asia&rsquo;s leading e-wallet platforms.</p>\n" +
                "<p>By leveraging Visa&rsquo;s global network, Razer Pay users will be able to make payments wherever Visa is accepted. The prepaid solution will complement Razer Pay&rsquo;s existing offerings, which include everyday essentials such as mobile top-ups, leading virtual credits, and entertainment purchases for music and streaming services. Users will also enjoy a slew of exciting benefits and rewards when using their prepaid cards for ecommerce transactions and when they make purchases overseas.&nbsp; &nbsp;</p>\n" +
                "<p>The integrated prepaid card solution will offer users the same convenient top-up and cash-out methods available on Razer Pay, underpinned by an advanced privacy and security framework. Razer Pay has collaborated with innovative partners to amplify its existing offerings by introducing ride-hailing, movie ticketing, and utility payments in streamlined mini-applications.</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>BRINGING FINANCIAL INCLUSION TO SOUTHEAST ASIA&rsquo;S UNBANKED AND UNDERSERVED</strong></p>\n" +
                "<p>Southeast Asia has a large unbanked and underserved population of over 438 million1. The partnership between Razer Fintech and Visa has the potential to extend micro-financial services to this underserved segment. Southeast Asia is also home to a massive youth and millennial population of over 213 million.2</p>\n" +
                "<p>The collaboration between Razer Fintech and Visa aims to empower this segment of early adopters and introduce interactive and straightforward financial planning capabilities with a Razer-gamified twist. These capabilities will help to enhance the financial literacy levels of the Southeast Asia population. Razer Fintech and Visa&rsquo;s partnership will help meet the unmet demands of this sizeable market and provide innovative financial tools for youths and millennials to participate in the global cashless economy.</p>\n" +
                "<p>Razer Fintech and Visa anticipate rolling out these solutions progressively in selected countries across Southeast Asia in the coming months, before expanding globally.</p>\n" +
                "<p>1 KPMG Fintech: Opening the door to the unbanked and underbanked in Southeast Asia, accessed at: https://home.kpmg/xx/en/home/insights/2016/04/fintech-opening-the-door-to-the-unbanked-and-underbanked-in-southeast-asia.html</p>\n" +
                "<p>2 ASEAN&rsquo;s First ASEAN Youth Development Index 2017</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>ABOUT RAZER</strong></p>\n" +
                "<p>Razer&trade; is the world&rsquo;s leading lifestyle brand for gamers. The triple-headed snake trademark of Razer is one of the most recognized logos in the global gaming and esports communities. With a fan base that spans every continent, the company has designed and built the world&rsquo;s largest gamer-focused ecosystem of hardware, software and services.</p>\n" +
                "<p>Razer&rsquo;s award-winning hardware includes high-performance gaming peripherals, Blade gaming laptops and the acclaimed Razer Phone. Razer&rsquo;s software platform, with over 60 million users, includes Razer Synapse (an Internet of Things platform), Razer Chroma (a proprietary RGB lighting technology system), and Razer Cortex (a game optimizer and launcher). In services, Razer Gold is one of the world&rsquo;s largest virtual credit services for gamers, and Razer Pay is the e-wallet designed for youth and millennials.&nbsp;</p>\n" +
                "<p>Founded in 2005 and dual-headquartered in San Francisco and Singapore, Razer has 18 offices worldwide and is recognized as the leading brand for gamers in the USA, Europe and Mainland China. Razer is listed on the Hong Kong Stock Exchange (Stock Code: 1337).</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>ABOUT VISA INC.</strong></p>\n" +
                "<p>Visa Inc. (NYSE: V) is the world&rsquo;s leader in digital payments. Our mission is to connect the world through the most innovative, reliable and secure payment network - enabling individuals, businesses and economies to thrive. Our advanced global processing network, VisaNet, provides secure and reliable payments around the world and is capable of handling more than 65,000 transaction messages a second. The company&rsquo;s relentless focus on innovation is a catalyst for the rapid growth of connected commerce on any device, and a driving force behind the dream of a cashless future for everyone, everywhere. As the world moves from analog to digital, Visa is applying our brand, products, people, network and scale to reshape the future of commerce.</p>"
        },
        {
            id: 9,
            title: '通知：独特会员识别号码',
            description: '<p>奖金：获奖作品可获得现金 $3000 （如无作品获选，将颁发三份各 $500 的佳作奖）</p><p>所有参赛作品必须于2019年11月29日（星期五）午夜12点之前，通过线上报名表格提交</p>',
            resource: ['https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg',
                'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg'],
            content: "<p>&bull; Integration of Visa prepaid solution in Razer Pay e-wallet to enable users to make payments at 54 million merchant locations on Visa&rsquo;s global network&nbsp;</p>\n" +
                "<p>&bull; Bringing financial inclusion to Southeast Asia&rsquo;s unbanked and underserved population</p>\n" +
                "<p>Razer&trade;, the leading global lifestyle brand for gamers, and Visa, the world&rsquo;s leader in digital payments, have announced a first of its kind partnership that will transform payments in the gaming industry by bringing the scale and reach of Visa&rsquo;s global network to Razer Pay e-wallet users.&nbsp;&nbsp;</p>\n" +
                "<p>The partnership will see Razer&rsquo;s financial technology arm, Razer Fintech, join Visa&rsquo;s fintech fast-track program, which is designed to make it easier for fintechs to access the global Visa payments network. Here, Razer Fintech and Visa will develop a virtual Visa prepaid solution to be embedded in the Razer Pay e-wallet, that will allow up to 60 million Razer users to make payments wherever Visa is accepted at 54 million merchant locations worldwide.</p>\n" +
                "<p>Chris Clark, Regional President, Asia Pacific, Visa, said: &ldquo;We are pleased to partner with such a forward-looking and innovative company that understands the value and importance of expanding access to digital payments. This announcement reaffirms Visa&rsquo;s commitment to the fast-growing and digitally savvy Southeast Asia region. Together, Visa and Razer Fintech have the opportunity to transform the payments experience for not only the gaming community but many of Southeast Asia&rsquo;s unbanked and underserved consumers as well.&rdquo;</p>\n" +
                "<p>Min-Liang Tan, Co-Founder and CEO of Razer, said: &ldquo;Razer Fintech is a core growth initiative for Razer as we continue to empower digital payments across emerging markets, starting from Southeast Asia. We are incredibly excited with the opportunities that this innovative payment solution serves to millions of consumers, connecting them to an extensive network of merchants globally. This partnership with Visa significantly extends Razer Fintech&rsquo;s position as the largest offline-to-online digital payment network in the region.&rdquo;</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>INTEGRATION OF VISA PREPAID SOLUTION INTO RAZER PAY</strong></p>\n" +
                "<p>Razer Fintech and Visa look to roll out an exclusive Razer-branded Visa prepaid payment solution integrated into Razer Pay via a mini-app, which will cement Razer Pay&rsquo;s position as one of Southeast Asia&rsquo;s leading e-wallet platforms.</p>\n" +
                "<p>By leveraging Visa&rsquo;s global network, Razer Pay users will be able to make payments wherever Visa is accepted. The prepaid solution will complement Razer Pay&rsquo;s existing offerings, which include everyday essentials such as mobile top-ups, leading virtual credits, and entertainment purchases for music and streaming services. Users will also enjoy a slew of exciting benefits and rewards when using their prepaid cards for ecommerce transactions and when they make purchases overseas.&nbsp; &nbsp;</p>\n" +
                "<p>The integrated prepaid card solution will offer users the same convenient top-up and cash-out methods available on Razer Pay, underpinned by an advanced privacy and security framework. Razer Pay has collaborated with innovative partners to amplify its existing offerings by introducing ride-hailing, movie ticketing, and utility payments in streamlined mini-applications.</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>BRINGING FINANCIAL INCLUSION TO SOUTHEAST ASIA&rsquo;S UNBANKED AND UNDERSERVED</strong></p>\n" +
                "<p>Southeast Asia has a large unbanked and underserved population of over 438 million1. The partnership between Razer Fintech and Visa has the potential to extend micro-financial services to this underserved segment. Southeast Asia is also home to a massive youth and millennial population of over 213 million.2</p>\n" +
                "<p>The collaboration between Razer Fintech and Visa aims to empower this segment of early adopters and introduce interactive and straightforward financial planning capabilities with a Razer-gamified twist. These capabilities will help to enhance the financial literacy levels of the Southeast Asia population. Razer Fintech and Visa&rsquo;s partnership will help meet the unmet demands of this sizeable market and provide innovative financial tools for youths and millennials to participate in the global cashless economy.</p>\n" +
                "<p>Razer Fintech and Visa anticipate rolling out these solutions progressively in selected countries across Southeast Asia in the coming months, before expanding globally.</p>\n" +
                "<p>1 KPMG Fintech: Opening the door to the unbanked and underbanked in Southeast Asia, accessed at: https://home.kpmg/xx/en/home/insights/2016/04/fintech-opening-the-door-to-the-unbanked-and-underbanked-in-southeast-asia.html</p>\n" +
                "<p>2 ASEAN&rsquo;s First ASEAN Youth Development Index 2017</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>ABOUT RAZER</strong></p>\n" +
                "<p>Razer&trade; is the world&rsquo;s leading lifestyle brand for gamers. The triple-headed snake trademark of Razer is one of the most recognized logos in the global gaming and esports communities. With a fan base that spans every continent, the company has designed and built the world&rsquo;s largest gamer-focused ecosystem of hardware, software and services.</p>\n" +
                "<p>Razer&rsquo;s award-winning hardware includes high-performance gaming peripherals, Blade gaming laptops and the acclaimed Razer Phone. Razer&rsquo;s software platform, with over 60 million users, includes Razer Synapse (an Internet of Things platform), Razer Chroma (a proprietary RGB lighting technology system), and Razer Cortex (a game optimizer and launcher). In services, Razer Gold is one of the world&rsquo;s largest virtual credit services for gamers, and Razer Pay is the e-wallet designed for youth and millennials.&nbsp;</p>\n" +
                "<p>Founded in 2005 and dual-headquartered in San Francisco and Singapore, Razer has 18 offices worldwide and is recognized as the leading brand for gamers in the USA, Europe and Mainland China. Razer is listed on the Hong Kong Stock Exchange (Stock Code: 1337).</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>ABOUT VISA INC.</strong></p>\n" +
                "<p>Visa Inc. (NYSE: V) is the world&rsquo;s leader in digital payments. Our mission is to connect the world through the most innovative, reliable and secure payment network - enabling individuals, businesses and economies to thrive. Our advanced global processing network, VisaNet, provides secure and reliable payments around the world and is capable of handling more than 65,000 transaction messages a second. The company&rsquo;s relentless focus on innovation is a catalyst for the rapid growth of connected commerce on any device, and a driving force behind the dream of a cashless future for everyone, everywhere. As the world moves from analog to digital, Visa is applying our brand, products, people, network and scale to reshape the future of commerce.</p>"
        },
        {
            id: 10,
            title: '通知：独特会员识别号码',
            description: '<p>从2019年9月1日起，为符合新加坡个人资料保护委员会的身份证件条例，以及为巩固会员个人资料的安全性，福建会馆将不再收集或使用会员的完整身份证号码。</p>',
            resource: ['https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg'],
            content: "<p>&bull; Integration of Visa prepaid solution in Razer Pay e-wallet to enable users to make payments at 54 million merchant locations on Visa&rsquo;s global network&nbsp;</p>\n" +
                "<p>&bull; Bringing financial inclusion to Southeast Asia&rsquo;s unbanked and underserved population</p>\n" +
                "<p>Razer&trade;, the leading global lifestyle brand for gamers, and Visa, the world&rsquo;s leader in digital payments, have announced a first of its kind partnership that will transform payments in the gaming industry by bringing the scale and reach of Visa&rsquo;s global network to Razer Pay e-wallet users.&nbsp;&nbsp;</p>\n" +
                "<p>The partnership will see Razer&rsquo;s financial technology arm, Razer Fintech, join Visa&rsquo;s fintech fast-track program, which is designed to make it easier for fintechs to access the global Visa payments network. Here, Razer Fintech and Visa will develop a virtual Visa prepaid solution to be embedded in the Razer Pay e-wallet, that will allow up to 60 million Razer users to make payments wherever Visa is accepted at 54 million merchant locations worldwide.</p>\n" +
                "<p>Chris Clark, Regional President, Asia Pacific, Visa, said: &ldquo;We are pleased to partner with such a forward-looking and innovative company that understands the value and importance of expanding access to digital payments. This announcement reaffirms Visa&rsquo;s commitment to the fast-growing and digitally savvy Southeast Asia region. Together, Visa and Razer Fintech have the opportunity to transform the payments experience for not only the gaming community but many of Southeast Asia&rsquo;s unbanked and underserved consumers as well.&rdquo;</p>\n" +
                "<p>Min-Liang Tan, Co-Founder and CEO of Razer, said: &ldquo;Razer Fintech is a core growth initiative for Razer as we continue to empower digital payments across emerging markets, starting from Southeast Asia. We are incredibly excited with the opportunities that this innovative payment solution serves to millions of consumers, connecting them to an extensive network of merchants globally. This partnership with Visa significantly extends Razer Fintech&rsquo;s position as the largest offline-to-online digital payment network in the region.&rdquo;</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>INTEGRATION OF VISA PREPAID SOLUTION INTO RAZER PAY</strong></p>\n" +
                "<p>Razer Fintech and Visa look to roll out an exclusive Razer-branded Visa prepaid payment solution integrated into Razer Pay via a mini-app, which will cement Razer Pay&rsquo;s position as one of Southeast Asia&rsquo;s leading e-wallet platforms.</p>\n" +
                "<p>By leveraging Visa&rsquo;s global network, Razer Pay users will be able to make payments wherever Visa is accepted. The prepaid solution will complement Razer Pay&rsquo;s existing offerings, which include everyday essentials such as mobile top-ups, leading virtual credits, and entertainment purchases for music and streaming services. Users will also enjoy a slew of exciting benefits and rewards when using their prepaid cards for ecommerce transactions and when they make purchases overseas.&nbsp; &nbsp;</p>\n" +
                "<p>The integrated prepaid card solution will offer users the same convenient top-up and cash-out methods available on Razer Pay, underpinned by an advanced privacy and security framework. Razer Pay has collaborated with innovative partners to amplify its existing offerings by introducing ride-hailing, movie ticketing, and utility payments in streamlined mini-applications.</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>BRINGING FINANCIAL INCLUSION TO SOUTHEAST ASIA&rsquo;S UNBANKED AND UNDERSERVED</strong></p>\n" +
                "<p>Southeast Asia has a large unbanked and underserved population of over 438 million1. The partnership between Razer Fintech and Visa has the potential to extend micro-financial services to this underserved segment. Southeast Asia is also home to a massive youth and millennial population of over 213 million.2</p>\n" +
                "<p>The collaboration between Razer Fintech and Visa aims to empower this segment of early adopters and introduce interactive and straightforward financial planning capabilities with a Razer-gamified twist. These capabilities will help to enhance the financial literacy levels of the Southeast Asia population. Razer Fintech and Visa&rsquo;s partnership will help meet the unmet demands of this sizeable market and provide innovative financial tools for youths and millennials to participate in the global cashless economy.</p>\n" +
                "<p>Razer Fintech and Visa anticipate rolling out these solutions progressively in selected countries across Southeast Asia in the coming months, before expanding globally.</p>\n" +
                "<p>1 KPMG Fintech: Opening the door to the unbanked and underbanked in Southeast Asia, accessed at: https://home.kpmg/xx/en/home/insights/2016/04/fintech-opening-the-door-to-the-unbanked-and-underbanked-in-southeast-asia.html</p>\n" +
                "<p>2 ASEAN&rsquo;s First ASEAN Youth Development Index 2017</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>ABOUT RAZER</strong></p>\n" +
                "<p>Razer&trade; is the world&rsquo;s leading lifestyle brand for gamers. The triple-headed snake trademark of Razer is one of the most recognized logos in the global gaming and esports communities. With a fan base that spans every continent, the company has designed and built the world&rsquo;s largest gamer-focused ecosystem of hardware, software and services.</p>\n" +
                "<p>Razer&rsquo;s award-winning hardware includes high-performance gaming peripherals, Blade gaming laptops and the acclaimed Razer Phone. Razer&rsquo;s software platform, with over 60 million users, includes Razer Synapse (an Internet of Things platform), Razer Chroma (a proprietary RGB lighting technology system), and Razer Cortex (a game optimizer and launcher). In services, Razer Gold is one of the world&rsquo;s largest virtual credit services for gamers, and Razer Pay is the e-wallet designed for youth and millennials.&nbsp;</p>\n" +
                "<p>Founded in 2005 and dual-headquartered in San Francisco and Singapore, Razer has 18 offices worldwide and is recognized as the leading brand for gamers in the USA, Europe and Mainland China. Razer is listed on the Hong Kong Stock Exchange (Stock Code: 1337).</p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><strong>ABOUT VISA INC.</strong></p>\n" +
                "<p>Visa Inc. (NYSE: V) is the world&rsquo;s leader in digital payments. Our mission is to connect the world through the most innovative, reliable and secure payment network - enabling individuals, businesses and economies to thrive. Our advanced global processing network, VisaNet, provides secure and reliable payments around the world and is capable of handling more than 65,000 transaction messages a second. The company&rsquo;s relentless focus on innovation is a catalyst for the rapid growth of connected commerce on any device, and a driving force behind the dream of a cashless future for everyone, everywhere. As the world moves from analog to digital, Visa is applying our brand, products, people, network and scale to reshape the future of commerce.</p>"
        },
    ],
    temp: {
        id: 5,
        title: 'Visa“创无限”创新挑战赛',
        section: 4,
        description: '<p>奖金：获奖作品可获得现金 $3000 （如无作品获选，将颁发三份各 $500 的佳作奖）</p><p>所有参赛作品必须于2019年11月29日（星期五）午夜12点之前，通过线上报名表格提交</p>',
        resources: [{
            id: 1,
            src: 'https://static01.nyt.com/images/2014/01/13/business/adco/adco-jumbo.jpg?quality=90&auto=webp',
            title: 'Legend 1',
            description: 'cqqcqw'
        },
            {
                id: 2,
                src: 'https://img17.3lian.com/d/file/201702/09/e95f84c4b5a845481f529bfaeca10a98.jpg',
                title: 'Legend 2',
                description: 'fdssfercrqqcqrqrq'
            }],
        time: '06/24/2019',
        content: "<p>Nium, a fast-growing digital cross-border payments platform, is enabling users to make real-time money transfers to Visa debit cardholders across Southeast Asia powered by Visa&rsquo;s real-time1 push payments solution - Visa Direct.</p>\n" +
            "<p>Nium Pte. Ltd. (formerly known as InstaReM Pte. Ltd.) is the first fintech-based money transfer service provider in Southeast Asia to support instant money transfers into recipients&rsquo; bank accounts through their 16-digit Visa debit card numbers. Now live in Singapore, this solution is designed for both peer-to-peer and business-to-business transfers. In the first phase, remittances can be made to various Southeast Asia countries which include Indonesia, Malaysia, Thailand, Vietnam and the Philippines.</p>\n" +
            "<p>Prajit Nanu, co-founder and CEO of Nium said, &ldquo;At Nium, we understand that individuals&rsquo; and businesses&rsquo; need to receive money quickly, especially in markets where there are no instant payment solutions like FAST or IMPS. The partnership using Visa&rsquo;s push payment solution and secure network will allow our consumers to transfer money in a faster, convenient and more secure way.&rdquo;</p>\n" +
            "<p>According to a recent Visa survey2, more than one in three respondents in Singapore make international money transfers at least once a year. The survey findings also indicated that close to half (49 percent) of the respondents expect their funds to be successfully transferred in less than a day, indicating the need for an efficient cross-border money transfer solution.</p>\n" +
            "<p>Kunal Chatterjee, Visa Country Manager for Singapore and Brunei said,&ldquo;Nium is the first Fintech partner from Visa&rsquo;s Fintech Fast Track programme to deliver real-time remittance using our push payment solution Visa Direct. From our survey findings, more than half of respondents usually send international money transfers to either their personal or loved ones&rsquo; bank accounts and one of the most important factors they look at is for money to be transferred in real-time.3 Given that our domestic transfer solutions are already real-time using the FAST infrastructure, it is important to provide consumers the same speed and efficiency for cross border international transfers. We are pleased to work with Nium to leverage Visa&rsquo;s global payments network to bring this seamless and secure payment experience to consumers in this region.,&rdquo; added Kunal.</p>\n" +
            "<p>Nium is a member of Visa&rsquo;s Fintech Fast Track programme. This programme makes it quicker and easier for fintech partners to build and deliver new commerce experiences on Visa&rsquo;s payments network.</p>\n" +
            "<p>1 Actual fund availability depends on receiving financial institution and region. Visa requires fast-funds enabled issuers to make funds available to their recipient cardholders within a maximum of 30 minutes of approving the transaction.</p>\n" +
            "<p>2 Visa commissioned YouGov to interview 1,060 Singaporeans in October 2019 to understand their usage and preference of international money transfers.</p>\n" +
            "<p>3 Visa commissioned YouGov to interview 1,060 Singaporeans in October 2019 to understand their usage and preference of international money transfers.</p>\n" +
            "<p>&nbsp;</p>\n" +
            "<p><strong>About Visa Inc.</strong></p>\n" +
            "<p>Visa Inc. (NYSE: V) is the world&rsquo;s leader in digital payments. Our mission is to connect the world through the most innovative, reliable and secure payment network - enabling individuals, businesses and economies to thrive. Our advanced global processing network, VisaNet, provides secure and reliable payments around the world, and is capable of handling more than 65,000 transaction messages a second. The company&rsquo;s relentless focus on innovation is a catalyst for the rapid growth of digital commerce on any device for everyone, everywhere. As the world moves from analog to digital, Visa is applying our brand, products, people, network and scale to reshape the future of commerce. For more information, visit www.visa.com.sg</p>\n" +
            "<p><strong>About Nium</strong></p>\n" +
            "<p>Singapore-headquartered Nium (formerly known as InstaReM), is a digital cross-border money transfer platform founded by the team that created InstaReM in 2014.The Nium platform empowers businesses to send , spend &amp; receive across borders, with a mission is to democratize money movement across the globe . Nium is regulated in the U.S., the European Union, Singapore, Canada, Hong Kong, India, Australia and Malaysia, and processes billions of dollars in a year for banks, payments institutions and retail users across the world. Nium&rsquo;s investors include Global Founders Capital, Vertex Ventures, Fullerton Financial Holdings, GSR Ventures, SBI-FMO Emerging Asia Financial Sector Fund, MDI Ventures, Beacon Venture Capital, Vertex Growth Fund and Atinum Investment.</p>"
    }
};

export default utils;
