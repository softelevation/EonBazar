/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Block, ImageComponent} from '../../components';
import {
  getCurrencyDetailsRequest,
  authCheckRequest,
  guestCheckRequest,
} from '../../redux/action';
import {strictValidStringWithMinLength} from '../../utils/commonUtils';

const Splash = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();

  const CallNavigation = async () => {
    const guest_token = await AsyncStorage.getItem('guest-token');
    const token = await AsyncStorage.getItem('token');
    const res = await dispatch(authCheckRequest());
    // const guestres = await dispatch(guestCheckRequest());
    if (res.res) {
      setTimeout(() => {
        nav.navigate('Home');
      }, 3000);
    } else if (guest_token) {
      setTimeout(() => {
        nav.navigate('Home');
      }, 3000);
    } else {
      nav.navigate('Home');
    }
  };

  useEffect(() => {
    CallNavigation();
  }, []);

  useEffect(() => {
    dispatch(getCurrencyDetailsRequest());
  }, []);
  return (
    <Block primary center middle>
      {/* <Block flex={false} borderWidth={3} borderRadius={5} alignSelf="center"> */}
      <ImageComponent name="logo" height={75} width={300} />
      {/* </Block> */}
    </Block>
  );
};
export default Splash;
