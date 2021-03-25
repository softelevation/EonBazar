import React, {useState} from 'react';
import {Platform, StyleSheet, TextInput} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Block from './Block';
import Button from './CustomButton';
import Text from './Text';
import {light} from './theme/colors';

const componentStyles = () => {
  return StyleSheet.create({
    label: {
      marginBottom: heightPercentageToDP(0.8),
    },
    input: {
      paddingVertical:
        Platform.OS === 'ios'
          ? heightPercentageToDP(1)
          : heightPercentageToDP(0.3),
      paddingHorizontal: widthPercentageToDP(3),
      borderWidth: 1,
      borderColor: '#C2C2C2',
      fontSize: 14,
      fontWeight: '500',
      color: '#9c9c9c',
      backgroundColor: '#fff',
    },
    toggle: {
      // position: 'absolute',
      // alignItems: 'flex-end',
      // width: 16 * 2,
      // height: 16 * 2,
      // top: 16,
      // right: 0,
    },
  });
};

const Input = ({
  email,
  rightLabel,
  label,
  phone,
  number,
  secure,
  error,
  style,
  rightStyle,
  onRightPress,
  placeholder,
  errorText,
  editable = true,
  center,
  placeholderTextColor,
  ...rest
}) => {
  const styles = componentStyles();
  const [toggleSecure, setToggleSecure] = useState(false);
  const renderLabel = () => (
    <Block flex={false}>
      {label ? (
        <Text
          errorColor={errorText}
          body
          center={center ? true : false}
          style={styles.label}
          black={!error}
          accent={error}
          color="#636363">
          {label}
        </Text>
      ) : null}
    </Block>
  );

  const renderToggle = () => {
    if (!secure) {
      return null;
    }
    return (
      <Button
        style={styles.toggle}
        onPress={() => setToggleSecure({toggleSecure: !toggleSecure})}>
        {/* {rightLabel || (
          <Icon
            color={'#000'}
            size={14}
            name={!toggleSecure ? 'md-eye' : 'md-eye-off'}
          />
        )} */}
      </Button>
    );
  };

  const renderRight = () => {
    if (!rightLabel) {
      return null;
    }

    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}>
        {rightLabel}
      </Button>
    );
  };

  const isSecure = toggleSecure ? false : secure;

  const inputType = email
    ? 'email-address'
    : number
    ? 'numeric'
    : phone
    ? 'phone-pad'
    : 'default';

  const inputStyles = [
    styles.input,
    !editable && {
      backgroundColor: '#e9ecef',
      color: '#9c9c9c',
      borderColor: '#e9ecef',
    },
    error && {borderColor: 'red'},
    style,
  ];
  return (
    <Block flex={false} margin={[heightPercentageToDP(1), 0]}>
      {renderLabel()}
      <TextInput
        placeholder={placeholder}
        style={inputStyles}
        secureTextEntry={isSecure}
        autoComplete="off"
        autoCapitalize="none"
        editable={editable}
        autoCorrect={false}
        keyboardType={inputType}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : '#000000'
        }
        {...rest}
      />
      {errorText && error && (
        <Text size={12} errorColor>
          {errorText}
        </Text>
      )}
      {renderToggle()}
      {renderRight()}
    </Block>
  );
};

export default Input;
