import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {images} from '../../../assets';
import Banner from '../../../common/banner';
import Footer from '../../../common/footer';
import Header from '../../../common/header';
import {Block, Button, Input, Text} from '../../../components';
import Checkbox from '../../../components/checkbox';
import Search from '../../../components/search';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {generateOtpRequest} from '../../../redux/auth/otp/action';
import {eventType} from '../../../utils/static-data';
import {registerRequest} from '../../../redux/action';
const NewCustomer = () => {
  const [generate, setGenerate] = useState(false);
  const formikRef = useRef(null);
  const [resend, setResend] = useState(0);
  const dispatch = useDispatch();
  const nav = useNavigation();

  const isLoad = useSelector((state) => state.user.register.loading);
  const isOtpLoad = useSelector((state) => state.user.otp.loading);
  const submitValues = (values) => {
    const data = {
      firstname: values.firstname,
      lastname: values.lastname,
      mobile: values.mobile,
      otp: values.otp,
      password: values.password,
    };
    dispatch(registerRequest(data));
  };
  const generateOtp = () => {
    if (formikRef.current) {
      const {mobile} = formikRef.current.values;
      const data = {
        resend,
        mobile,
        eventType: eventType.customer_signup_otp,
      };
      dispatch(generateOtpRequest(data));
      setGenerate(true);
    }
  };
  const resendOtp = () => {
    if (formikRef.current) {
      const {mobile} = formikRef.current.values;
      const data = {
        resend: resend + 1,
        mobile,
        eventType: eventType.customer_signup_otp,
      };
      setResend(resend + 1);
      dispatch(generateOtpRequest(data));
      setGenerate(true);
    }
  };
  return (
    <Block>
      <Header leftIcon={false} />
      <Block flex={false} padding={[0, wp(3), hp(2), wp(3)]}>
        <Search />
      </Block>
      {/* <Banner /> */}
      <Formik
        innerRef={formikRef}
        initialValues={{
          password: '',
          check: false,
          firstname: '',
          lastname: '',
          mobile: '',
          confirmpass: '',
          otp: '',
        }}
        onSubmit={submitValues}
        validationSchema={yup.object().shape({
          mobile: yup
            .string()
            .min(10)
            .max(15)
            .required('Mobile Number is Required'),
          password: yup.string().min(8).required(),
          firstname: yup.string().min(3).required(),
          lastname: yup.string().min(1).required(),
          otp: yup.string().required(),
          confirmpass: yup
            .string()
            .when('password', {
              is: (val) => (val && val.length > 0 ? true : false),
              then: yup
                .string()
                .oneOf(
                  [yup.ref('password')],
                  'Both password need to be the same',
                ),
            })
            .required(),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          handleSubmit,
          setFieldValue,
          // isValid,
          dirty,
        }) => {
          return (
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <Text semibold transform="uppercase" center>
                Create New Customer Login
              </Text>
              <Block
                margin={[hp(2), 0, 0, 0]}
                padding={[hp(2), wp(7), 0, wp(7)]}
                flex={false}
                primary>
                <Text transform="uppercase" body semibold center>
                  Personal Information
                </Text>
                <Block
                  flex={false}
                  borderColor="#ACACAC"
                  padding={[0, 0, hp(1), 0]}
                  borderWidth={[0, 0, 1, 0]}
                />
                <Input
                  label="First Name"
                  value={values.firstname}
                  onChangeText={handleChange('firstname')}
                  onBlur={() => setFieldTouched('firstname')}
                  error={touched.firstname && errors.firstname}
                  errorText={touched.firstname && errors.firstname}
                />
                <Input
                  label="Last Name"
                  value={values.lastname}
                  onChangeText={handleChange('lastname')}
                  onBlur={() => setFieldTouched('lastname')}
                  error={touched.lastname && errors.lastname}
                  errorText={touched.lastname && errors.lastname}
                />
                <Checkbox
                  checked={values.check}
                  checkboxStyle={{height: 20, width: 20}}
                  checkedImage={images.checkbox_icon}
                  uncheckedImage={images.uncheckbox_icon}
                  label={'sign up for newsletter'}
                  onChange={(newValue) => setFieldValue('check', !values.check)}
                />
                <Block margin={[hp(2), 0, 0, 0]} flex={false} primary>
                  <Text transform="uppercase" body semibold center>
                    Sign-in Information
                  </Text>
                  <Block
                    borderColor="#ACACAC"
                    flex={false}
                    padding={[0, 0, hp(1), 0]}
                    borderWidth={[0, 0, 1, 0]}
                  />
                  <Input
                    keyboardType="number-pad"
                    label="Customer Mobile"
                    value={values.mobile}
                    onChangeText={handleChange('mobile')}
                    onBlur={() => setFieldTouched('mobile')}
                    error={touched.mobile && errors.mobile}
                    errorText={touched.mobile && errors.mobile}
                  />
                  <Text color="#636363" body>
                    please add number without country code
                  </Text>
                  <Button
                    isLoading={isOtpLoad}
                    disabled={!values.mobile || generate}
                    onPress={() => generateOtp()}
                    style={{width: wp(30)}}
                    color="secondary">
                    GENERATE OTP
                  </Button>
                  {generate && (
                    <>
                      <Input
                        label="Verify Otp"
                        keyboardType="number-pad"
                        value={values.otp}
                        onChangeText={handleChange('otp')}
                        onBlur={() => setFieldTouched('otp')}
                        error={touched.otp && errors.otp}
                        errorText={touched.otp && errors.otp}
                        maxLength={4}
                      />
                      <Button
                        onPress={() => resendOtp()}
                        style={{width: wp(30)}}
                        color="secondary">
                        RESEND OTP
                      </Button>
                    </>
                  )}
                  <Input
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    error={touched.password && errors.password}
                    errorText={touched.password && errors.password}
                    label="Password"
                    secureTextEntry={true}
                  />
                  <Input
                    label="Confirm Password"
                    value={values.confirmpass}
                    onChangeText={handleChange('confirmpass')}
                    onBlur={() => setFieldTouched('confirmpass')}
                    error={touched.confirmpass && errors.confirmpass}
                    errorText={touched.confirmpass && errors.confirmpass}
                    secureTextEntry={true}
                  />
                  <Button
                    isLoading={isLoad}
                    onPress={handleSubmit}
                    // disabled={!isValid}
                    color="secondary">
                    Create an Account
                  </Button>
                  <Button onPress={() => nav.goBack()} color="secondary">
                    Back
                  </Button>
                </Block>
              </Block>
              <Footer images={false} />
            </KeyboardAwareScrollView>
          );
        }}
      </Formik>
    </Block>
  );
};

export default NewCustomer;
