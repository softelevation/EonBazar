import React, {useEffect, useRef, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../../common/header';
import {Block, Button, Input, Text} from '../../../components';
import {t2, t3} from '../../../components/theme/fontsize';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {strictValidObjectWithKeys} from '../../../utils/commonUtils';
import Checkbox from '../../../components/checkbox';
import {images} from '../../../assets';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {generateOtpRequest, updateProfileRequest} from '../../../redux/action';
import {eventType} from '../../../utils/static-data';
import {config} from '../../../utils/config';
const ForgotPassword = () => {
  const userData = useSelector((state) => state.user.profile.user);
  const isOtpLoad = useSelector((state) => state.user.otp.loading);
  const [generate, setGenerate] = useState(false);
  const formikRef = useRef();
  const isLoad = useSelector((state) => state.user.profile.loading);
  const [resend, setResend] = useState(0);

  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const mobileNumber =
    strictValidObjectWithKeys(user) &&
    user.custom_attributes.find((v) => v.attribute_code === 'customer_mobile');
  const emailMobile =
    strictValidObjectWithKeys(user) && user.email.replace(/\D/g, '');

  const submitValues = (values) => {
    const data = {
      password: values.cofirmpassword,
      otp: values.otp || '',
      mobile: values.mobile,
      websiteId: 1,
    };
    dispatch(
      updateProfileRequest({data: data, type: 'customerpasseditwithotp'}),
    );
  };

  const generateOtp = () => {
    if (formikRef.current) {
      const {mobile} = formikRef.current.values;
      const data = {
        resend,
        mobile,
        eventType: eventType.forgot_password_otp,
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
        eventType: eventType.forgot_password_otp,
      };
      setResend(resend + 1);
      dispatch(generateOtpRequest(data));
      setGenerate(true);
    }
  };

  return (
    <Block white>
      <Header leftIcon={false} />
      <KeyboardAwareScrollView>
        <Block white padding={[t3]}>
          <Formik
            innerRef={formikRef}
            enableReinitialize
            initialValues={{
              firstname: user.firstname,
              lastname: user.lastname,
              mobile: mobileNumber.value || emailMobile,
              email: user.email,
              currentpass: '',
              password: '',
              cofirmpassword: '',
              emailCheck: false,
              passwordCheck: false,
              otp: '',
            }}
            onSubmit={submitValues}
            validationSchema={yup.object().shape({
              mobile: yup
                .string()
                .min(10)
                .max(15)
                .required('Mobile Number is Required'),
              password: yup.string().min(6),
              cofirmpassword: yup.string().when('password', {
                is: (val) => (val && val.length > 0 ? true : false),
                then: yup
                  .string()
                  .oneOf(
                    [yup.ref('password')],
                    'Both password need to be the same',
                  ),
              }),
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
                  label="Phone Number"
                  value={values.mobile}
                  onChangeText={handleChange('mobile')}
                  onBlur={() => setFieldTouched('mobile')}
                  error={touched.mobile && errors.mobile}
                  errorText={touched.mobile && errors.mobile}
                />
                <Text size={12}>Please add number without country code.</Text>
                <Button
                  isLoading={isOtpLoad}
                  disabled={generate}
                  onPress={() => generateOtp()}
                  style={{width: widthPercentageToDP(30)}}
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
                      maxLength={5}
                    />
                    <Button
                      onPress={() => resendOtp()}
                      style={{width: widthPercentageToDP(30)}}
                      color="secondary">
                      RESEND OTP
                    </Button>
                  </>
                )}
                <Input
                  label="New Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  error={touched.password && errors.password}
                  errorText={touched.password && errors.password}
                  secure={true}
                />
                <Input
                  label="Confirm New Password"
                  value={values.cofirmpassword}
                  onChangeText={handleChange('cofirmpassword')}
                  onBlur={() => setFieldTouched('cofirmpassword')}
                  error={touched.cofirmpassword && errors.cofirmpassword}
                  secure={true}
                  errorText={touched.cofirmpassword && errors.cofirmpassword}
                />

                <Button
                  isLoading={isLoad}
                  disabled={!dirty}
                  onPress={handleSubmit}
                  style={{marginTop: heightPercentageToDP(2)}}
                  color="secondary">
                  Change Password
                </Button>
              </>
            )}
          </Formik>
        </Block>
      </KeyboardAwareScrollView>
    </Block>
  );
};

export default ForgotPassword;
