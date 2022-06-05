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
<svg viewBox="0 -0.005 212.556 171.704" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
            .cls-1{fill:#973434}.cls-2{fill:#ffd3cf}.cls-3{fill:#ffcec8}.cls-5{fill:#f74343}.cls-6{fill:#fff}.cls-9{fill:#464646}
        </style>
  </defs>
  <g id="successfully-password-reset" transform="matrix(1, 0, 0, 1, -828, -153.589005)">
    <g id="Group_10875" data-name="Group 10875" transform="translate(851.002 153.589)">
      <g id="Layer_1" data-name="Layer 1">
        <path id="Path_3300" data-name="Path 3300" class="cls-1" d="m383.27 1239.231-.063-.091 2.392-17.45c-10.19 3.706-21.463 16.678-21.463 16.678-.236.289-.45.576-.676.863z" transform="translate(-313.61 -1067.896)" style="fill: ${color}; fill-rule: evenodd;"/>
        <path id="Path_3301" data-name="Path 3301" class="cls-2" d="m560.83 885.436.353.807 1.574 3.6 10.581 2.168 5.938-8.265-1.251-2.947-.287-.685z" transform="translate(-478.414 -782.676)" style="fill-rule: evenodd; fill: rgb(255, 208, 204);"/>
        <path id="Path_3302" data-name="Path 3302" class="cls-1" d="M916.91 419.876s-6.717-9.111-16.83-4.092c-.002 0 7.488 10.732 16.83 4.092z" transform="translate(-761.688 -393.703)" style="fill-rule: evenodd;"/>
        <path id="Path_3303" data-name="Path 3303" class="cls-3" d="m936.923 407.691-1.935 5.405-7.537-2.511 2.158-5.386z" transform="translate(-784.542 -386.125)" style="fill-rule: evenodd; fill: rgb(255, 208, 204);"/>
        <path id="Path_3304" data-name="Path 3304" d="M466.232 959.18h45.582c10.009-45.251-12.913-71.548-12.913-71.548l-2.277-1.332 1.119 2.605-5.94 8.261-10.578-2.161-1.929-4.4-2.4 2.247-9.265 42.621s2.625 7.565-1.391 13.279-2.925 9.261-2.925 9.261z" transform="translate(-396.877 -787.844)" style="fill: rgb(37, 35, 58); fill-rule: evenodd;"/>
        <path id="Path_3305" data-name="Path 3305" class="cls-1" d="M109.25 684.255s6.795-8.339 15.6-4.325l-7.1 7.722z" transform="translate(-101.344 -614.613)" style="fill-rule: evenodd;"/>
        <path id="Path_3306" data-name="Path 3306" class="cls-3" d="m126.64 682.841 1.937 5.405 7.535-2.511-2.158-5.386z" transform="translate(-115.864 -615.876)" style="fill-rule: evenodd; fill: rgb(255, 208, 204);"/>
        <path id="Path_3307" data-name="Path 3307" class="cls-3" d="M80.174 570.519a1.84 1.84 0 0 0-2.071 1.155l-1.962 3.491-5.682-10.035a.875.875 0 0 0-1.252-.3.908.908 0 0 0-.315 1.091l2.947 7.362-6.152-7.383a.858.858 0 0 0-1.221-.106.891.891 0 0 0-.117 1.214l.048.068c-.026-.017 5.711 7.41 5.711 7.41l-5.984-6.044a.751.751 0 0 0-.921-.115.751.751 0 0 0-.214 1.1l5.156 6.834-5.724-3.925c-.345-.224-.617-.262-.9.041a.649.649 0 0 0-.139.211.863.863 0 0 0 .218.9l10.51 12.761 7.319-2.492a34.731 34.731 0 0 0-.1-4.163c-.192-2.594.845-9.075.845-9.075z" transform="translate(-61.333 -519.291)" style="fill-rule: evenodd; fill: rgb(255, 208, 204);"/>
        <path id="Path_3308" data-name="Path 3308" class="cls-5" d="M690.557 569.955q-.074.508-.154 1.018h15.165c4.549-36.9-2.5-58.693-2.5-58.693l29.8-86.474a8.672 8.672 0 0 1-1.924.511 7.591 7.591 0 0 1-6.475-2.475 8.566 8.566 0 0 0-8.433-2.124l-34.28 77.127-2.086.579c19.457 31.615 10.887 70.531 10.887 70.531z" transform="translate(-577.646 -399.633)" style="fill: ${color}; fill-rule: evenodd;"/>
        <path id="Path_3309" data-name="Path 3309" class="cls-5" d="m130.632 731.341 37.915 18.15c-2.909 8.753-17.838 27.457-29.573 41.317H154.4a47.988 47.988 0 0 1 6.222-5.711 76.768 76.768 0 0 0 12.1-11.522c14.206-19.143 8.648-49.1 8.648-49.1l-12.2 3.244-31.35-13.589-12.973-29.34s-2.78-1.081-6.486 2.934-9.111 1.391-9.111 1.391l13.441 33.732a15.979 15.979 0 0 0 7.941 8.494z" transform="translate(-101.344 -619.473)" style="fill: ${color}; fill-rule: evenodd;"/>
        <path id="Path_3310" data-name="Path 3310" class="cls-6" d="M 640.723 931.724 C 640.69 931.724 640.657 931.713 640.631 931.693 L 635.531 928.063 C 635.413 928.016 635.39 927.859 635.49 927.78 C 635.559 927.725 635.659 927.735 635.717 927.802 L 640.687 931.341 L 646.047 924.405 C 646.124 924.308 646.153 924.497 646.199 924.612 C 646.22 924.665 646.251 924.809 646.216 924.854 L 640.844 931.663 C 640.814 931.7 640.77 931.722 640.723 931.724 Z" transform="translate(-540.706 -818.607)" style="fill: rgb(248, 248, 248); fill-rule: evenodd;"/>
        <path id="Path_3311" data-name="Path 3311" class="cls-6" d="M562.935 957.1a.194.194 0 0 1-.051-.008L550.763 953a.165.165 0 0 1 .1-.3l11.971 4.041 1.878-5.409a.161.161 0 0 1 .3.106l-1.931 5.559a.165.165 0 0 1-.146.103z" transform="translate(-469.945 -842.055)" style="fill: rgb(248, 248, 248); fill-rule: evenodd;"/>
        <path id="Path_3312" data-name="Path 3312" class="cls-6" d="M623.986 1011.377a.161.161 0 0 1-.076-.3c.7-.38 1.176-2.364 1.632-4.29.495-2.061.957-4.029 1.777-4.658-.231-.076-.285-.165-.3-.249a.208.208 0 0 1 .134-.219.506.506 0 0 1 .234-.031c-.144-.213-.29-.442-.441-.678a9.856 9.856 0 0 0-1.155-1.592.163.163 0 0 1 0-.228c2.053-2.051 2.754-4.854 3.432-7.565.771-15.47-.33-28.244-3.443-40.17a.16.16 0 0 1 .31-.081c3.135 11.959 4.226 24.765 3.448 40.3-.681 2.736-1.379 5.532-3.411 7.634a11.771 11.771 0 0 1 1.087 1.531 12.939 12.939 0 0 0 .813 1.188l.012.013a.165.165 0 0 1 .017.178v.008a.208.208 0 0 1-.05.045l-.033.012a.078.078 0 0 1-.048 0h-.013c-.949 0-1.531 2.453-2.046 4.62-.495 2.082-.96 4.047-1.792 4.495a.165.165 0 0 1-.088.037z" transform="translate(-531.016 -842.032)" style="fill: rgb(248, 248, 248); fill-rule: evenodd;"/>
        <path id="Path_3313" data-name="Path 3313" class="cls-6" d="M630.07 1006.38a.85.85 0 1 0 .85-.85.85.85 0 0 0-.85.85z" transform="translate(-536.229 -887.402)" style="fill: rgb(248, 248, 248); fill-rule: evenodd;"/>
        <circle id="Ellipse_20" data-name="Ellipse 20" class="cls-6" cx=".85" cy=".85" r=".85" transform="translate(94.227 133.107)" style="fill: rgb(248, 248, 248); fill-rule: evenodd;"/>
        <circle id="Ellipse_21" data-name="Ellipse 21" class="cls-6" cx=".85" cy=".85" r=".85" transform="translate(93.763 147.777)" style="fill: rgb(248, 248, 248); fill-rule: evenodd;"/>
        <path id="Path_3314" data-name="Path 3314" class="cls-6" d="M607.14 1296.97a.85.85 0 1 0 .85-.85.85.85 0 0 0-.85.85z" transform="translate(-517.083 -1130.045)" style="fill: rgb(248, 248, 248); fill-rule: evenodd;"/>
        <path id="Path_3315" data-name="Path 3315" d="m560.83 885.453.353.807a10.01 10.01 0 0 0 16.843-5.445l-.287-.685z" transform="translate(-478.414 -782.692)" style="fill: rgb(255, 178, 169); fill-rule: evenodd;"/>
        <path id="Path_3316" data-name="Path 3316" class="cls-2" d="M540.476 810.295a10.017 10.017 0 0 0 5.267-13.152l-4.034-9.423-18.419 7.885 4.034 9.423a10.02 10.02 0 0 0 13.152 5.267z" style="fill-rule: evenodd; fill: rgb(255, 208, 204);" transform="translate(-447.068 -705.53)"/>
        <path id="Path_3317" data-name="Path 3317" class="cls-2" d="M649.969 826.123c.787 1.559 1.34 2.866 2.9 2.079s3.536-3.371 2.749-4.93a3.163 3.163 0 0 0-5.648 2.851z" transform="translate(-552.561 -733.764)" style="fill-rule: evenodd; fill: rgb(255, 208, 204);"/>
        <path id="Path_3318" data-name="Path 3318" class="cls-2" d="M525.223 876.662c.495 1.675 1 3-.675 3.5s-4.886-.017-5.386-1.69a3.163 3.163 0 1 1 6.06-1.815z" transform="translate(-443.51 -777.911)" style="fill-rule: evenodd; fill: rgb(255, 208, 204);"/>
        <path id="Path_3319" data-name="Path 3319" class="cls-1" d="M513.18 734.429a10.221 10.221 0 0 0 .365-6.166 3.987 3.987 0 0 0-4.265-2.927l-.086.01a8.956 8.956 0 0 0-7.219-8.068c-7.026-1.7-9.613 6.757-9.613 6.757a2.435 2.435 0 0 0-2.856-.078 1.85 1.85 0 0 0-.772 2.355s-3.259-1.9-6.448 2.31c-3.937 5.224 5.592 16.419 5.592 16.419a2.884 2.884 0 0 1 3.242-2.086l-2.12-4.516s5.519.888 6.562-4.125c0 0 3.783 3 6.948.734 3.4-2.432 4.475 1.99 7.133.619a3.366 3.366 0 0 1 3.537-1.238z" transform="translate(-412.033 -646.522)" style="fill: rgb(118, 41, 41); fill-rule: evenodd;"/>
        <path id="Path_3320" data-name="Path 3320" class="cls-3" d="M946.947 289.739a.908.908 0 0 1 .315 1.091l-2.94 7.354 6.145-7.369a.858.858 0 0 1 1.221-.106.891.891 0 0 1 .117 1.214l-.048.069a.724.724 0 0 1 .808 0 .769.769 0 0 1 .279.874c-1.559 2.653-3.283 5.656-4.834 8.306l5.724-3.927c.345-.224.617-.262.9.041a.648.648 0 0 1 .139.211.863.863 0 0 1-.218.9l-10.51 12.761-7.314-2.491a34.706 34.706 0 0 1 .1-4.161c.19-2.6-.846-9.085-.846-9.085a1.84 1.84 0 0 1 2.071 1.163l1.962 3.491 5.682-10.035a.876.876 0 0 1 1.252-.307z" transform="translate(-791.665 -289.592)" style="fill: rgb(247, 202, 196); fill-rule: evenodd;"/>
        <path id="Path_3321" data-name="Path 3321" d="M996.1 310.751a.18.18 0 0 1-.109-.036.178.178 0 0 1-.031-.249l5.712-7.415a.177.177 0 0 1 .281.216l-5.712 7.415a.175.175 0 0 1-.141.069z" transform="translate(-841.719 -300.773)" style="fill: rgb(255, 156, 145); fill-rule: evenodd;"/>
        <path id="Path_3322" data-name="Path 3322" class="cls-9" d="M579.2 866.517a.658.658 0 1 0 .262-1.025.765.765 0 0 0-.262 1.025z" transform="translate(-493.686 -770.441)" style="fill-rule: evenodd; fill: rgb(72, 71, 71);"/>
        <path id="Path_3323" data-name="Path 3323" class="cls-6" d="m561.661 857.1-1.211.495a2.511 2.511 0 0 1-3.267-1.381l-.742-1.827 5.866-2.387.742 1.827a2.51 2.51 0 0 1-1.026 3.09 2.642 2.642 0 0 1-.362.183zm-4.739-2.513.6 1.485a2.145 2.145 0 0 0 2.787 1.177l1.211-.495a2.145 2.145 0 0 0 1.177-2.787l-.6-1.485z" transform="translate(-474.748 -759.204)" style="fill-rule: evenodd; fill: rgb(248, 248, 248);"/>
        <path id="Path_3324" data-name="Path 3324" class="cls-9" d="M614.669 852.109a.658.658 0 1 0 .264-1.025.765.765 0 0 0-.264 1.025z" transform="translate(-523.3 -758.41)" style="fill-rule: evenodd; fill: rgb(72, 71, 71);"/>
        <path id="Path_3325" data-name="Path 3325" class="cls-6" d="m606.581 838.892-1.211.495a2.51 2.51 0 0 1-3.267-1.381l-.742-1.827 5.859-2.379.742 1.826a2.506 2.506 0 0 1-1.026 3.09 2.635 2.635 0 0 1-.355.176zm-4.739-2.513.6 1.485a2.145 2.145 0 0 0 2.787 1.177l1.211-.495a2.145 2.145 0 0 0 1.176-2.787l-.6-1.485z" transform="translate(-512.257 -744.007)" style="fill-rule: evenodd; fill: rgb(248, 248, 248);"/>
        <path id="Path_3326" data-name="Path 3326" class="cls-6" d="M603.477 887.28a3.064 3.064 0 0 1-5.717 2.2z" transform="translate(-509.251 -788.663)" style="fill-rule: evenodd; fill: rgb(248, 248, 248);"/>
        <path id="Path_3327" data-name="Path 3327" class="cls-3" d="m592.71 849.22 3.966 4.212-2.094 1.561z" transform="translate(-505.034 -756.883)" style="fill-rule: evenodd;"/>
        <path id="Path_3328" data-name="Path 3328" d="m593.812 854.255.015-.01 2.092-1.561a.183.183 0 0 0 .074-.132.18.18 0 0 0-.049-.142l-3.96-4.214a.185.185 0 0 0-.269.252l3.825 4.064-1.927 1.435a.185.185 0 1 0 .206.307z" transform="translate(-504.168 -755.986)" style="fill: rgb(255, 120, 103); fill-rule: evenodd;"/>
        <path id="Path_3329" data-name="Path 3329" class="cls-9" d="M565.5 845.2a.4.4 0 0 0 .516.15l1.934-.97a.577.577 0 0 0 .2-.792.576.576 0 0 0-.837-.165l-1.7 1.257a.4.4 0 0 0-.106.521z" transform="translate(-482.265 -751.949)" style="fill-rule: evenodd; fill: rgb(72, 71, 71);"/>
        <path id="Path_3330" data-name="Path 3330" class="cls-9" d="M605.67 831.742a.394.394 0 0 1-.236.482l-2.018.781a.576.576 0 0 1-.718-.386.579.579 0 0 1 .439-.733l2.076-.417a.393.393 0 0 1 .457.274z" transform="translate(-513.354 -742.052)" style="fill-rule: evenodd; fill: rgb(72, 71, 71);"/>
        <path id="Path_3331" data-name="Path 3331" d="m557.115 839.292 12.67-5.145a.33.33 0 0 0 .185-.436.33.33 0 0 0-.436-.183l-12.67 5.145a.33.33 0 0 0-.185.436.33.33 0 0 0 .436.183z" transform="translate(-474.927 -743.758)" style="fill: rgb(255, 157, 90); fill-rule: evenodd;"/>
      </g>
    </g>
    <path id="Line_3" data-name="Line 3" transform="translate(828 325.288)" style="fill: none; stroke: rgb(220, 225, 232); stroke-width: 2px; fill-rule: evenodd;" d="M0 0h212.556"/>
  </g>
</svg>
`;

export default ({fill, width, height}) => (
    <SvgIcon xml={xml} color={fill} width={width} height={height} />
);
