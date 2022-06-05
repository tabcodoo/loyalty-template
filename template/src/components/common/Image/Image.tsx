import * as React from 'react';

import {useTheme} from 'react-native-paper';
import ProgressiveFastImage from '@freakycoder/react-native-progressive-fast-image';

const ImageComponent = (props) => {
    const {style = {}, transitionDuration = 200, tint = 'light', uri = ''} = props;
    const {colors, customFonts} = useTheme();

    return (
        <ProgressiveFastImage
            thumbnailSource={{uri: `${uri ? uri : ''}`}}
            source={{uri: `${uri ? uri : ''}`}}
            style={style}
        />
    );
};

export default ImageComponent;
