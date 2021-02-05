import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../../common/header';
import {Block, Button, Input, Text} from '../../../components';
import {t2, t3} from '../../../components/theme/fontsize';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useSelector} from 'react-redux';
import {strictValidObjectWithKeys} from '../../../utils/commonUtils';
import Checkbox from '../../../components/checkbox';
import {images} from '../../../assets';
import {heightPercentageToDP} from 'react-native-responsive-screen';
const EditProfile = () => {
  const userData = useSelector((state) => state.user.profile.user);
  const isLoad = useSelector((state) => state.user.profile.loading);
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const mobile =
    strictValidObjectWithKeys(user) &&
    user.custom_attributes.find((v) => v.attribute_code === 'customer_mobile');
  const emailMobile =
    strictValidObjectWithKeys(user) && user.email.replace(/\D/g, '');

  const submitValues = (values) => {
    console.log(values);
  };

  return (
    <Block white>
      <Header leftIcon={false} />
      <KeyboardAwareScrollView>
        <Block white padding={[t3]}>
          <Formik
            enableReinitialize
            initialValues={{
              firstname: user.firstname,
              lastname: user.lastname,
              mobile: mobile.value || emailMobile,
              email: user.email,
              currentpass: '',
              password: '',
              cofirmpassword: '',
              emailCheck: false,
              passwordCheck: false,
            }}
            onSubmit={submitValues}
            validationSchema={yup.object().shape({
              mobile: yup
                .string()
                .min(10)
                .max(15)
                .required('Mobile Number is Required'),
              password: yup.string().min(6).required('Password is Required'),
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
                  checked={values.emailCheck}
                  checkboxStyle={{height: 20, width: 20}}
                  checkedImage={images.checkbox_icon}
                  uncheckedImage={images.uncheckbox_icon}
                  label={'Change Email'}
                  onChange={(newValue) =>
                    setFieldValue('emailCheck', !values.emailCheck)
                  }
                  containerStyle={{marginTop: heightPercentageToDP(1)}}
                />
                <Checkbox
                  checked={values.passwordCheck}
                  checkboxStyle={{height: 20, width: 20}}
                  checkedImage={images.checkbox_icon}
                  uncheckedImage={images.uncheckbox_icon}
                  label={'Change Password'}
                  onChange={(newValue) =>
                    setFieldValue('passwordCheck', !values.passwordCheck)
                  }
                  containerStyle={{marginVertical: heightPercentageToDP(1)}}
                />
                {values.emailCheck && (
                  <Input
                    label="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                    error={touched.email && errors.email}
                    errorText={touched.email && errors.email}
                  />
                )}
                {(values.emailCheck || values.passwordCheck) && (
                  <Input
                    label="Current Password"
                    value={values.currentpass}
                    onChangeText={handleChange('currentpass')}
                    onBlur={() => setFieldTouched('currentpass')}
                    error={touched.currentpass && errors.currentpass}
                    errorText={touched.currentpass && errors.currentpass}
                  />
                )}
                {values.passwordCheck && (
                  <>
                    <Input
                      label="New Password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      error={touched.password && errors.password}
                      errorText={touched.password && errors.password}
                    />
                    <Input
                      label="Confirm New Password"
                      value={values.cofirmpassword}
                      onChangeText={handleChange('cofirmpassword')}
                      onBlur={() => setFieldTouched('cofirmpassword')}
                      error={touched.cofirmpassword && errors.cofirmpassword}
                      errorText={
                        touched.cofirmpassword && errors.cofirmpassword
                      }
                    />
                  </>
                )}
                <Text margin={[t2, 0]} size={20} bold>
                  ADDITIONAL INFORMATION
                </Text>
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
                  style={{marginTop: heightPercentageToDP(2)}}
                  color="secondary">
                  Save
                </Button>
              </>
            )}
          </Formik>
        </Block>
      </KeyboardAwareScrollView>
    </Block>
  );
};

export default EditProfile;
