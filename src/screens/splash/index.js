/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Block, ImageComponent} from '../../components';
import {
  getCurrencyDetailsRequest,
  loginSuccess,
  profileRequest,
  createCartRequest,
} from '../../redux/action';
import {strictValidStringWithMinLength} from '../../utils/commonUtils';

const Splash = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const CallNavigation = async () => {
    const token = await AsyncStorage.getItem('token');
    if (strictValidStringWithMinLength(token)) {
      dispatch(loginSuccess(token));
      dispatch(profileRequest());
      dispatch(createCartRequest());
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
