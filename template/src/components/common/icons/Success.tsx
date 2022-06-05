import React from 'react';
import {Dimensions} from 'react-native';
import Svg, {G, Path, Defs, Circle} from 'react-native-svg';

let {height, width} = Dimensions.get('window');
let iconSize = width / 2.3;

function Icon({fill = '#8DC640'}) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={iconSize}
            height={iconSize}
            viewBox="0 0 150 150">
            <G fill="none" fillRule="nonzero">
                <Path
                    fill={fill}
                    d="M133.386 135.778c-22.924 18.713-94.503 18.713-116.96 0-22.923-18.714-20.584-98.714 0-119.766 20.586-21.053 96.375-21.053 116.96 0 20.585 21.052 22.924 101.052 0 119.766z"></Path>
                <Path
                    fill="#FFF"
                    d="M75.374 103.03c-20.585 16.374-43.509 24.795-65.029 25.262-15.907-27.134-12.632-93.099 6.082-112.28C33.269-1.298 86.135-4.573 116.544 6.187c7.485 30.877-7.953 70.175-41.17 96.842z"
                    opacity="0.2"></Path>
                <Path
                    fill="#FFF"
                    d="M64.146 116.596c-3.275 0-6.55-1.403-8.421-4.21L29.526 78.702c-3.742-4.679-2.807-11.228 1.872-14.971 4.678-3.743 11.228-2.807 14.97 1.871l17.778 22.924 39.298-50.994c3.743-4.678 10.293-5.614 14.971-1.871 4.678 3.743 5.614 10.292 1.872 14.97l-47.72 61.755c-2.339 2.339-5.146 4.21-8.42 4.21z"></Path>
            </G>
        </Svg>
    );
}

export default Icon;
