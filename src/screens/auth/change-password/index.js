import React, {useRef, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../../common/header';
import {Block, Button, Input, Text} from '../../../components';
import {t2, t3} from '../../../components/theme/fontsize';
import {Formik} from 'formik';
import * as yup from 'yup';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {config} from '../../../utils/config';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {loginSuccess, profileFlush} from '../../../redux/action';
import {useDispatch} from 'react-redux';
const ChangePassword = () => {
  const formikRef = useRef();
  const [isLoad, setLoader] = useState(0);
  const dispatch = useDispatch();
  const nav = useNavigation();

  const logoutFun = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      dispatch(loginSuccess(''));
      dispatch(profileFlush());
      // setTimeout(() => { alert('Logout Successfully...') }, 2000)
      nav.navigate('Login');
    } catch (error) {}
  };

  const submitValues = async (values) => {
    setLoader(true);
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    const res = await axios({
      method: 'put',
      url: 'http://stage.eonbazar.com/rest/default/V1/customers/me/password',
      headers,
      data: values,
    });
    if (res) {
      logoutFun();
      Alert.alert('Password changed successfully. Please login again');
      setLoader(false);
    } else {
      setLoader(false);
      Alert.alert(res.data.message);
    }
  };

  return (
    <Block white>
      <Header leftIcon={false} />
      <KeyboardAwareScrollView>
        <Block white padding={[t3]}>
          <Block row middle center margin={[t2, 0]}>
            <Text bold transform="uppercase">
              Change Password
            </Text>
          </Block>
          <Formik
            innerRef={formikRef}
            enableReinitialize
            initialValues={{
              currentPassword: '',
              newPassword: '',
            }}
            onSubmit={submitValues}
            validationSchema={yup.object().shape({
              currentPassword: yup
                .string()
                .min(8)
                .max(15)
                .required('Current Password is Required'),
              newPassword: yup
                .string()
                .min(8)
                .max(15)
                .required('New Password is Required'),
            })}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              setFieldValue,
              handleSubmit,
              dirty,
            }) => (
              <>
                <Input
                  label="Current Password"
                  value={values.currentPassword}
                  onChangeText={handleChange('currentPassword')}
                  onBlur={() => setFieldTouched('currentPassword')}
                  error={touched.currentPassword && errors.currentPassword}
                  errorText={touched.currentPassword && errors.currentPassword}
                  secure={true}
                />
                <Input
                  label="New Password"
                  value={values.newPassword}
                  onChangeText={handleChange('newPassword')}
                  onBlur={() => setFieldTouched('newPassword')}
                  error={touched.newPassword && errors.newPassword}
                  secure={true}
                  errorText={touched.newPassword && errors.newPassword}
                />

                <Button
                  isLoading={isLoad}
                  disabled={!dirty}
                  onPress={handleSubmit}
                  style={{marginTop: heightPercentageToDP(2)}}
                  color="secondary">
                  Update Password
                </Button>
              </>
            )}
          </Formik>
        </Block>
      </KeyboardAwareScrollView>
    </Block>
  );
};

export default ChangePassword;
// http://stage.eonbazar.com/rest/default/V1/customers/me/password
