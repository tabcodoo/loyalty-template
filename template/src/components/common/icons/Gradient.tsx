import React from 'react';
import Svg, {G, Path, Use, Defs, LinearGradient, Stop, Rect} from 'react-native-svg';

function Icon({fill, style, imageWidth, imageHeight}) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={imageWidth}
            height={imageWidth / 2.1}
            // viewBox={`0 0 ${imageWidth} ${imageWidth / 2.1}`}
            viewBox={'0 0 163 75'}
            style={style}>
            <Defs>
                <LinearGradient id="8vsp3hcqyb" x1="50%" x2="50%" y1="3.586%" y2="75.166%">
                    <Stop offset="0%"></Stop>
                    <Stop offset="100%" stopOpacity="0"></Stop>
                </LinearGradient>
                <Rect id="940kne2yma" width="163" height="73.5" x="0" y="0.857" rx="8"></Rect>
            </Defs>
            <Use fill="url(#8vsp3hcqyb)" fillRule="evenodd" xlinkHref="#940kne2yma"></Use>
        </Svg>
    );
}

export default Icon;
