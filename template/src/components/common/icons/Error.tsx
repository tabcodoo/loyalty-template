import React from 'react';
import {Dimensions} from 'react-native';
import Svg, {G, Path, Defs, Circle} from 'react-native-svg';

let {height, width} = Dimensions.get('window');
let iconSize = width / 2.3;

function Icon({fill}) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={iconSize}
            height={iconSize}
            viewBox="0 0 150 150">
            <G fill="none" fillRule="nonzero">
                <Path
                    fill="#D0021B"
                    d="M133.386 135.778c-22.924 18.713-94.503 18.713-116.96 0-22.923-18.714-20.584-98.714 0-119.766 20.586-21.053 96.375-21.053 116.96 0 20.585 21.052 22.924 101.052 0 119.766z"></Path>
                <Path
                    fill="#FFF"
                    d="M75.374 103.03c-20.585 16.374-43.509 24.795-65.029 25.262-15.907-27.134-12.632-93.099 6.082-112.28C33.269-1.298 86.135-4.573 116.544 6.187c7.485 30.877-7.953 70.175-41.17 96.842z"
                    opacity="0.2"></Path>
                <Path
                    fill="#FFF"
                    d="M110.462 110.514c-2.807 2.807-7.486 2.807-10.76 0L74.906 85.72l-24.795 24.795c-2.807 2.807-7.953 2.807-10.76 0-2.807-2.806-2.807-7.953 0-10.76L64.614 74.96 39.35 50.163c-2.807-2.806-2.807-7.485 0-10.76 2.807-2.807 7.953-2.807 10.76 0l24.795 25.263 24.796-25.263c2.807-2.807 7.485-2.807 10.76 0 2.807 2.807 2.807 7.954 0 10.76L85.666 74.96l24.796 24.795c3.275 3.275 3.275 7.954 0 10.76z"></Path>
            </G>
        </Svg>
    );
}

export default Icon;
