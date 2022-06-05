import React from 'react';
// import Svg, {G, Path, Defs, Circle} from 'react-native-svg';
import {SvgXml} from 'react-native-svg';

const SvgIcon = ({color, xml, width, height}) => (
    <SvgXml
        xml={xml({color: color ?? 'black'})}
        width={width ?? '100%'}
        height={height ?? '100%'}
        // style={{backgroundColor: 'red'}}
    />
);

const xml = ({color}) => `
<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 131.507 74.401" xmlns="http://www.w3.org/2000/svg">
  <g data-name="Group 11488">
    <path data-name="Path 3419" d="M133.209 119.182h-28.553v2.2a4.393 4.393 0 1 1-8.785 0v-2.2H10.213a2.2 2.2 0 0 0-2.2 2.2v65.89a2.2 2.2 0 0 0 2.2 2.2h85.658v-2.2a4.393 4.393 0 1 1 8.785 0v2.2h28.553a2.2 2.2 0 0 0 2.2-2.2v-65.89a2.2 2.2 0 0 0-2.2-2.2z" transform="translate(-5.958 -117.123)" style="fill: ${color};"/>
    <path data-name="Path 3420" d="M367.165 182.876a4.393 4.393 0 0 1 4.393 4.393v2.2h28.552a2.2 2.2 0 0 0 2.2-2.2v-65.89a2.2 2.2 0 0 0-2.2-2.2h-28.552v2.2a4.393 4.393 0 0 1-4.393 4.393z" transform="translate(-272.859 -117.123)" style="fill: ${color};"/>
    <path data-name="Path 3421" d="M127.251 0H98.7a2.059 2.059 0 0 0-2.059 2.059v2.2a2.334 2.334 0 0 1-4.667 0v-2.2A2.059 2.059 0 0 0 89.915 0H4.255A4.26 4.26 0 0 0 0 4.255v65.89A4.26 4.26 0 0 0 4.255 74.4h85.658a2.059 2.059 0 0 0 2.059-2.059v-2.2a2.334 2.334 0 1 1 4.667 0v2.2a2.059 2.059 0 0 0 2.059 2.059h28.553a4.26 4.26 0 0 0 4.255-4.255V4.255A4.261 4.261 0 0 0 127.251 0zm.137 70.146a.137.137 0 0 1-.137.137h-26.493v-.137a6.462 6.462 0 0 0-4.393-6.113V61.36a2.059 2.059 0 1 0-4.118 0v2.675a6.462 6.462 0 0 0-4.393 6.113v.137H4.255a.137.137 0 0 1-.137-.137V4.255a.137.137 0 0 1 .137-.137h83.6v.137a6.462 6.462 0 0 0 4.393 6.113v2.673a2.059 2.059 0 0 0 4.118 0v-2.673a6.462 6.462 0 0 0 4.393-6.113v-.137h26.493a.137.137 0 0 1 .137.137v65.89z" style="fill: rgb(0,0,0);"/>
    <path data-name="Path 3422" d="M94.306 19.767a2.059 2.059 0 0 0-2.059 2.059v4.393a2.059 2.059 0 0 0 4.118 0v-4.393a2.059 2.059 0 0 0-2.059-2.059z" style="fill: rgb(0,0,0);"/>
    <path data-name="Path 3423" d="M94.306 32.945a2.059 2.059 0 0 0-2.059 2.059v4.393a2.059 2.059 0 0 0 4.118 0v-4.393a2.059 2.059 0 0 0-2.059-2.059z" style="fill: rgb(0,0,0);"/>
    <path data-name="Path 3424" d="M94.306 46.123a2.059 2.059 0 0 0-2.059 2.059v4.393a2.059 2.059 0 0 0 4.118 0v-4.391a2.059 2.059 0 0 0-2.059-2.061z" style="fill: rgb(0,0,0);"/>
    <path data-name="Path 3425" d="m67.178 17.085-1.082-1.082a1.531 1.531 0 0 0-2.166 0l-6.486 6.486a18.273 18.273 0 0 0-11.254-3.873 18.375 18.375 0 0 0-18.375 18.375 18.273 18.273 0 0 0 3.872 11.255l-6.486 6.486a1.531 1.531 0 0 0 0 2.166l1.082 1.082a1.531 1.531 0 0 0 2.166 0l6.486-6.486a18.271 18.271 0 0 0 11.255 3.872 18.375 18.375 0 0 0 18.375-18.375 18.273 18.273 0 0 0-3.873-11.255l6.486-6.486a1.531 1.531 0 0 0 0-2.165zm-34.77 19.906A13.8 13.8 0 0 1 46.19 23.21a13.672 13.672 0 0 1 7.962 2.572L34.98 44.952a13.668 13.668 0 0 1-2.572-7.961zm27.563 0A13.8 13.8 0 0 1 46.19 50.772a13.668 13.668 0 0 1-7.962-2.572l19.17-19.169a13.664 13.664 0 0 1 2.573 7.96z" style="fill: rgb(0,0,0);"/>
  </g>
</svg>`;

export default ({fill, width, height}) => (
    <SvgIcon xml={xml} color={fill} width={width} height={height} />
);
