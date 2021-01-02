import React from 'react';
import Header from '../../common/header';
import {FlatList, ScrollView, TextInput} from 'react-native';
import {
  Text,
  Block,
  ImageComponent,
  CustomButton,
  Input,
  Button,
} from '../../components';
import {t1, t2, t4, w3, w4} from '../../components/theme/fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
const Cart = () => {
  const nav = useNavigation();
  const _renderItem = () => {
    return (
      <Block row flex={false} padding={[t4, w4]}>
        <Block flex={false}>
          <CustomButton
            flex={false}
            style={{height: 20, width: 20}}
            center
            middle
            secondary>
            <ImageComponent
              name="close_icon"
              height="15"
              width="15"
              color="#fff"
            />
          </CustomButton>
          <CustomButton
            margin={[t1, 0, 0, 0]}
            flex={false}
            style={{height: 20, width: 20}}
            center
            middle
            secondary>
            <Icon name="edit" size={12} color="#fff" />
          </CustomButton>
        </Block>
        <ImageComponent name="product" />
        <Block flex={false} margin={[0, w3]}>
          <Text style={{width: widthPercentageToDP(40)}} size={10}>
            Country Natural Black Seed Paratha - 12 Pcs (900gm)
          </Text>
        </Block>
        <Block flex={false}>
          <Text bold secondary size={10}>
            BDT 240.00
          </Text>
          <Block row flex={false}>
            <Text margin={[t1, 0]} size={14}>
              Qty:
            </Text>
            <InputArea />
          </Block>
        </Block>
      </Block>
    );
  };
  return (
    <Block>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block white padding={[t4, 0]}>
          <Block center row flex={false}>
            <Text size={14} margin={[t1, w3]} secondary bold>
              Your Cart
            </Text>
            <Text size={12}> {`${['1', '2'].length} item`}</Text>
          </Block>
          <Block
            margin={[t2, 0, 0, 0]}
            borderColorDeafult
            borderWidth={[0, 0, 1, 0]}
          />
          <FlatList data={['1', '2']} renderItem={_renderItem} />
        </Block>
        <Block center flex={false} row space={'between'} margin={[t2, w3]}>
          <Text transform="uppercase" bold size={24}>
            Cart Subtotal :
          </Text>
          <Text bold secondary>
            BDT 480.00
          </Text>
        </Block>
        <Block row space={'around'} flex={false} margin={[0, w3]}>
          <CartButton
            onPress={() => nav.navigate('Dashboard')}
            textStyle={{textTransform: 'uppercase'}}
            color="primary">
            Keep Shopping
          </CartButton>
          <CartButton
            onPress={() => nav.navigate('Shipping')}
            textStyle={{textTransform: 'uppercase'}}
            color="secondary">
            Buy Now
          </CartButton>
        </Block>
      </ScrollView>
    </Block>
  );
};
const CartButton = styled(Button)({
  width: widthPercentageToDP(45),
  borderRadius: 30,
});
const InputArea = styled(TextInput)({
  borderBottomWidth: 1,
  width: widthPercentageToDP(7),
  marginLeft: w3,
});
export default Cart;
