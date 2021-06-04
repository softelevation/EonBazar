import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const FlashMessage = (data) => {
  const message = data.data.message;
  return (
    <View
      style={[
        styles.FlashMessageStyle,
        {backgroundColor: message.backgroundColor || '#343A40'},
      ]}>
      <View style={styles.ImageContainer}>
        <Text style={{color: '#fff', textAlign: 'center', fontSize: 16}}>
          {message.message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  FlashMessageStyle: {
    padding: heightPercentageToDP(1.5),
    borderRadius: 10,
    // marginTop: heightPercentageToDP(4),
    width: widthPercentageToDP(80),
    alignSelf: 'center',
  },
  ImageContainer: {
    alignItems: 'center',
    paddingHorizontal: widthPercentageToDP(3),
  },
});
export default FlashMessage;
