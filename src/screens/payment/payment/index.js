import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Alert, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../../common/header';
import ActivityLoader from '../../../components/activityLoader';
import {createCartRequest} from '../../../redux/action';
import Toast from '../../../common/toast'

const Payment = () => {
  const id = useSelector((state) => state.payment.data);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loader, setloader] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(createCartRequest());
    };
  }, []);

  const handleNavigation = (v) => {
    setloader(v.loading);

    if (
      !v.title &&
      v.url === 'http://stage.eonbazar.com/order/payment/success'
    ) {
      // Alert.alert('Payment Success');
      setTimeout(() => {
        Toast.show('Payment Success');
      }, 1000);
      navigation.navigate('YourOrder');
      dispatch(createCartRequest());
    }
    if (
      v.title === 'SSLCOMMERZ' &&
      v.url === 'http://stage.eonbazar.com/order/payment/fail'
    ) {
      // Alert.alert('Payment Failed');
      setTimeout(() => {
        Toast.show('Payment Failed');
      }, 1000);
      navigation.navigate('YourOrder');
      dispatch(createCartRequest());
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <Header leftIcon={false} />
      {loader && <ActivityLoader />}
      <WebView
        source={{uri: `http://stage.eonbazar.com/order/payment?order_id=${id}`}}
        onNavigationStateChange={handleNavigation}
      />
    </View>
  );
};

export default Payment;
