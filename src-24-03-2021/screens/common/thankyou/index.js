import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Footer from '../../../common/footer';
import Header from '../../../common/header';
import {Block, Button, Text} from '../../../components';
import {t1, t2, t4, w3, w5} from '../../../components/theme/fontsize';

const ThankYou = () => {
  const nav = useNavigation();
  return (
    <Block>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block margin={[t4, w3, 0, w3]} white padding={[t4, w5]}>
          <Text center bold size={22}>
            Thank you for your purchase!
          </Text>
          <Text center size={14} margin={[t1, 0, 0, 0]}>
            Your order number is : 000001571
          </Text>
          <Text center margin={[t1, 0, 0, 0]} size={14}>
            Please click here to track your order
          </Text>
          <Button
            onPress={() => nav.navigate('Dashboard')}
            style={{marginVertical: t4}}
            color="secondary">
            Continue Shopping
          </Button>
        </Block>
        <Footer images={false} />
      </ScrollView>
    </Block>
  );
};

export default ThankYou;
