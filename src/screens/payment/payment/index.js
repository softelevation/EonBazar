import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Alert, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../../common/header';
import ActivityLoader from '../../../components/activityLoader';
import {createCartRequest, getCartDetailsRequest} from '../../../redux/action';
import {Toast} from '../../../common/toast';
import {light} from '../../../components/theme/colors';
import {orientationRequest} from '../../../redux/orientation/action';

const Payment = () => {
  const id = useSelector((state) => state.payment.data);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loader, setloader] = useState(false);

  useEffect(() => {
    dispatch(getCartDetailsRequest());
    dispatch(createCartRequest());

    return () => {
      dispatch(createCartRequest());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavigation = (v) => {
    setloader(v.loading);
    if (v.url === 'http://stage.eonbazar.com/order/payment/success') {
      // Alert.alert('Payment Success');
      Toast('Payment Success');
      navigation.navigate('YourOrder');
      dispatch(createCartRequest());
      dispatch(orientationRequest(false));
    }
    if (v.url === 'http://stage.eonbazar.com/order/payment/fail') {
      Toast('Payment Failed');
      navigation.navigate('YourOrder');
      dispatch(orientationRequest(false));

      dispatch(createCartRequest());
    }
  };
  const navType = () => {
    dispatch(orientationRequest(false));
    const pushAction = StackActions.push('DashboardLogo');
    navigation.dispatch(pushAction);
    setTimeout(() => {
      Toast('Your order was not complete', light.danger);
    }, 1000);
  };
  const AlertOptions = () => {
    Alert.alert(
      '',
      'Are you sure you want to cancel this order? ',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes, do it',
          onPress: () => navType(),
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <Header
        cartIcon={false}
        customPress
        onPress={() => AlertOptions()}
        leftIcon={false}
      />
      {loader && <ActivityLoader />}
      <WebView
        source={{uri: `http://stage.eonbazar.com/order/payment?order_id=${id}`}}
        onNavigationStateChange={handleNavigation}
      />
    </View>
  );
};

export default Payment;
