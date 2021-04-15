import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  Text,
  Block,
  ImageComponent,
  CustomButton,
  Input,
  Button,
} from '../components';
import styled from 'styled-components';
import {t1, t2, t4, w2, w3, w4} from '../components/theme/fontsize';

const CommonModal = ({title, isVisible}) => {
  return (
    <Block borderWidth={[0.5, 0, 0, 0]} borderColorDeafult flex={false} primary>
      <Block center flex={false} row space={'between'} margin={[t2, w3]}>
        <Text transform="uppercase" bold size={24}>
          Cart Subtotal :
        </Text>

        <Text bold secondary>
          BDT{' '}
          {/* {cartlist.reduce((sum, i) => (sum += i.price_copy), 0).toFixed(2)} */}
        </Text>
      </Block>

      <Block row space={'around'} flex={false} margin={[0, w3, t2, w3]}>
        <CartButton
          onPress={() => nav.navigate('Dashboard')}
          textStyle={{textTransform: 'uppercase'}}
          color="primary">
          Continue Shopping
        </CartButton>
        <CartButton
          onPress={() => {
            navigateToShipping();
          }}
          textStyle={{textTransform: 'uppercase'}}
          color="secondary">
          Buy Now
        </CartButton>
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
    height: 100,
    width: '100%',
    backgroundColor: 'red',
  },
  modalView: {
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    width: widthPercentageToDP(100),
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    marginLeft: 20,
  },
});

const CartButton = styled(Button)({
  width: widthPercentageToDP(45),
  borderRadius: 30,
});

export default CommonModal;
