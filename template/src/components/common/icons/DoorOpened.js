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
<svg viewBox="0 0 19.091 17.498" xmlns="http://www.w3.org/2000/svg">
  <g id="room-service-icon" transform="matrix(1, 0, 0, 1, -683.372986, -1142.102051)">
    <rect id="Rectangle_140" data-name="Rectangle 140" width="17.941" height="3.15" rx="1.575" transform="translate(683.948 1155.876)" fill="none" stroke-width="1.15" style="stroke: ${color};"/>
    <path id="Rectangle_141" data-name="Rectangle 141" d="M7.254,0h0a7.254,7.254,0,0,1,7.254,7.254V9.017a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V7.254A7.254,7.254,0,0,1,7.254,0Z" transform="translate(685.665 1146.859)" stroke-width="1.15" style="stroke: ${color}; fill: ${color};"/>
    <circle id="Ellipse_36" data-name="Ellipse 36" cx="1.091" cy="1.091" r="1.091" transform="translate(691.827 1142.677)" fill="none" stroke-width="1.15" style="stroke: ${color};"/>
  </g>
</svg>`;

export default ({fill, width, height}) => (
    <SvgIcon xml={xml} color={fill} width={width} height={height} />
);
