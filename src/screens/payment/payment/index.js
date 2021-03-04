import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Alert, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../../common/header';
import {createCartRequest} from '../../../redux/action';
const Payment = () => {
  const id = useSelector((state) => state.payment.data);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleNavigation = (v) => {
    console.log(v, 'pay');
    if (!v.title) {
      if (v.url === 'http://stage.eonbazar.com/order/payment/success') {
        Alert.alert('Payment Success');
        navigation.navigate('YourOrder');
        dispatch(createCartRequest());
      } else if (v.url === 'http://stage.eonbazar.com/order/payment/fail') {
        Alert.alert('Payment Failed');
        dispatch(createCartRequest());
      }
    } else {
      return null;
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <Header leftIcon={false} />
      <WebView
        source={{uri: `http://stage.eonbazar.com/order/payment?order_id=${id}`}}
        onNavigationStateChange={handleNavigation}
      />
    </View>
  );
};

export default Payment;
