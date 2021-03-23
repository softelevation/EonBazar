/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Block, ImageComponent} from '../../components';
import {getCurrencyDetailsRequest, authCheckRequest} from '../../redux/action';

const Splash = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();

  const CallNavigation = async () => {
    const guest_token = await AsyncStorage.getItem('guest-token');
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
      <ImageComponent name="logo" height={75} width={300} />
    </Block>
  );
};
export default Splash;
