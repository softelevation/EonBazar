/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  Modal,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../../common/header';
import {Block, Button, CustomButton, Input, Text} from '../../../components';
import Search from '../../../components/search';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../../../common/footer';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequest} from '../../../redux/action';
import {
  strictValidObjectWithKeys,
  strictValidString,
} from '../../../utils/commonUtils';
import Toast from '../../../common/toast';

const Login = ({route}) => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const isLoad = useSelector((state) => state.user.login.loading);
  const isError = useSelector((state) => state.user.login.error);
  const userProfile = useSelector((state) => state.user.profile.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    global.isLo;
    if (strictValidObjectWithKeys(userProfile)) {
      nav.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Profile'}],
        }),
      );
    }
  }, []);

  const handleForgot = () => {
    if (phoneNumber == null || phoneNumber === '') {
      // Alert.alert('Please enter mobile number');
      setTimeout(() => {
        Toast.show('Please enter mobile number');
      }, 1000);
    } else if (phoneNumber.length < 10 || phoneNumber.length > 15) {
      // Alert.alert('Please enter valid mobile number');
      setTimeout(() => {
        Toast.show('Please enter valid mobile number');
      }, 1000);
    } else {
      // alert(phoneNumber)
      setModalVisible(false);
    }
  };

  const renderNavigations = () => {
    return (
      <Block padding={[hp(2), wp(7), hp(2), wp(7)]} flex={false}>
        {/* <CustomButton
          onPress={() => Alert.alert('Please login first')}
          margin={[hp(0.7), 0, 0, 0]}
          flex={false}
          row
          center>
          <Icon name="heart" size={20} />
          <Text margin={[0, 0, 0, wp(1)]} transform="uppercase" body>
            My Wishlist
          </Text>
        </CustomButton>
        <CustomButton
          onPress={() => Alert.alert('Please login first')}
          margin={[hp(0.7), 0, 0, 0]}
          flex={false}
          row
          center>
          <Icon name="cart-outline" size={20} />
          <Text margin={[0, 0, 0, wp(1)]} transform="uppercase" body>
            My Order
          </Text>
        </CustomButton> */}
        <CustomButton
          onPress={() => nav.navigate('Help')}
          margin={[hp(0.7), 0, 0, 0]}
          flex={false}
          row
          center>
          <Icon name="account" size={20} />
          <Text margin={[0, 0, 0, wp(1)]} transform="uppercase" body>
            Contact us
          </Text>
        </CustomButton>
      </Block>
    );
  };
  const submitValues = async (values) => {
    const username = `${values.mobile}`;
    const password = `${values.password}`;
    const data = {
      username,
      password,
    };
    await dispatch(loginRequest(data));
  };
  return (
    <Block>
      <Formik
        initialValues={{mobile: '', password: ''}}
        onSubmit={submitValues}
        validationSchema={yup.object().shape({
          mobile: yup
            .string()
            .min(10)
            .max(15)
            .required('Mobile Number is Required'),
          password: yup.string().min(1).required('Password is Required'),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          handleSubmit,
          dirty,
        }) => (
          <>
            <Header />
            <Block flex={false} padding={[0, wp(3), hp(2), wp(3)]}>
              <Search />
            </Block>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <Text semibold transform="uppercase" center>
                Customer Login
              </Text>
              <Block
                padding={hp(2)}
                margin={[hp(2), wp(4), hp(2), wp(4)]}
                flex={false}
                primary>
                <Text transform="uppercase" body semibold center>
                  Registered Customers
                </Text>
                <Text margin={[hp(0.5), 0, 0, 0]} body center color="#636363">
                  if you have an account, sign in with your mobile number and
                  password
                </Text>

                <Input
                  keyboardType={'number-pad'}
                  label="Mobile Numer"
                  value={values.mobile}
                  onChangeText={handleChange('mobile')}
                  onBlur={() => setFieldTouched('mobile')}
                  error={touched.mobile && errors.mobile}
                  errorText={touched.mobile && errors.mobile}
                />
                <Text color="#636363" caption>
                  please add number without country code.
                </Text>
                <Input
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  error={touched.password && errors.password}
                  errorText={touched.password && errors.password}
                  secure={true}
                />
                {strictValidString(isError) && (
                  <Text center size={12} errorColor>
                    {isError}
                  </Text>
                )}
                <Button
                  disabled={!dirty}
                  isLoading={isLoad}
                  onPress={handleSubmit}
                  color="secondary">
                  SIGN IN
                </Button>
                <Text
                  right
                  size={16}
                  secondary
                  onPress={() => nav.navigate('ForgotPassword')}>
                  Forgot Password?
                </Text>
              </Block>
              <Block
                margin={[hp(2), 0, 0, 0]}
                padding={[hp(2), wp(7), hp(2), wp(7)]}
                flex={false}
                primary>
                <Text
                  onPress={() => nav.navigate('NewCustomer')}
                  transform="uppercase"
                  center
                  body>
                  New Customer?{' '}
                  <Text
                    onPress={() => nav.navigate('NewCustomer')}
                    secondary
                    center
                    body>
                    Start here
                  </Text>
                </Text>
              </Block>
              {renderNavigations()}
              <Footer images={false} />
            </ScrollView>
          </>
        )}
      </Formik>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setTimeout(() => {
            Toast.show('Modal has been closed.');
          }, 1000);
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginTop: 22,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              margin: 20,
            }}>
            <Text size={16} secondary>
              Mobile Number
            </Text>
            <TextInput
              style={{
                height: 50,
                borderWidth: 1,
                marginTop: 10,
                marginBottom: 50,
              }}
              onChangeText={setPhoneNumber}
              value={phoneNumber}
              placeholder="Enter mobile numer"
              keyboardType="numeric"
            />

            <Button
              // disabled={!dirty}
              // isLoading={isLoad}
              onPress={handleForgot}
              color="secondary">
              Submit
            </Button>
          </View>
        </View>
      </Modal>
    </Block>
  );
};

export default Login;
