import React, {useState, useEffect, useRef} from 'react';
import {View, Image, Dimensions, StyleSheet, Keyboard} from 'react-native';
import {useTheme, TextInput} from 'react-native-paper';
import {useHeaderHeight} from '@react-navigation/stack';
import Text from '../Text';

/**
  To use this component you will need to combine it with the
  RadioButton.Group from React native paper
*/

let {width, height} = Dimensions.get('window');
let halfHeight = height / 2;
let halfWidth = width / 2;

export function useKeyboardStatus() {
  const [isOpen, setIsOpen] = useState(false);
  const keyboardShowListener = useRef(null);
  const keyboardHideListener = useRef(null);

  useEffect(() => {
    keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () =>
      setIsOpen(true),
    );
    keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () =>
      setIsOpen(false),
    );

    return () => {
      keyboardShowListener.current.remove();
      keyboardHideListener.current.remove();
    };
  });

  return isOpen;
}

const Background = (props) => {
  const {colors, customFonts} = useTheme();
  let isOpen = useKeyboardStatus();
  let headerHeight = useHeaderHeight();
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      }}>
      <Image
        style={{position: 'absolute', top: halfHeight, left: halfWidth}}
        source={require('assets/images/background-layover.png')}
        resizeMode="cover"
      />
      {/* TOP RIGHT CORNER */}
      <Image
        style={{
          position: 'absolute',
          bottom: isOpen ? 8 : halfHeight - headerHeight,
          left: halfWidth,
        }}
        source={require('assets/images/background-layover.png')}
        resizeMode="cover"
      />
      {/* TOP LEFT CORNER */}
      <Image
        style={{
          position: 'absolute',
          top: halfHeight - headerHeight,
          right: halfWidth,
        }}
        source={require('assets/images/background-layover.png')}
        resizeMode="cover"
      />
      {/* BOTTOM LEFT CORNER */}
      <Image
        style={{
          position: 'absolute',
          bottom: isOpen ? 8 : halfHeight,
          right: halfWidth,
        }}
        source={require('assets/images/background-layover.png')}
        resizeMode="cover"
      />
      {props.children}
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({});
