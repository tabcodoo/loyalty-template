import {Platform} from 'react-native';
const DEV_API = 'https://dev-api.tabco.ba/api/v1/';
const PROD_API = 'https://api.tabco.ba/api/v1/';

export const API = PROD_API;

export default {
    // demo6 appId -> PROD
    // applicationId: '0732b1a5-b434-46d1-9eac-93c22b1d16a9',
    // appId za testiranje modula
    // demo3 appId: e39d045a-072c-42c9-8297-db5e5c999af6 //DEV
    // Demo3 appId -> DEV
    // Demo10 (roomService) : 496d8866-2f82-427c-910d-6bda253917fd
    applicationId: '0732b1a5-b434-46d1-9eac-93c22b1d16a9',
    webClientId: '432375925797-g90qjh38ek4a6ek9hg87vj70ln1qcpmt.apps.googleusercontent.com', //GoogleWebClient ID - FIREBASE
    moduleId: 5,
    API,
    appName: 'Loyalty Demo',
    topic: 'demo',
    currency: 'KM',
    primaryColor: '#248bd6',
    headerColor: '#191c39',
    googleLoginColor: '#c53829',
    smsLoginColor: '#0b3039',
    termsAndConditions: 'https://www.google.com',
    FACEBOOK_P1: `fb://${Platform.OS === 'ios' ? 'profile' : 'page'}/100129505044904`,
    FACEBOOK_P2: 'https://www.facebook.com/impereadoo',
    INSTAGRAM_P1: 'instagram://user?username=imperea_software',
    INSTAGRAM_P2: 'https://www.instagram.com/imperea_software/',
    aboutUs: {
        p1: {
            type: 'regular',
            text:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        p2: {
            type: 'header2',
            text: 'Zašto smo najbolji?',
        },
        p3: {
            type: 'regular',
            text:
                "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        },
    },
};
