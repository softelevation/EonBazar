import {Formik} from 'formik';
import React from 'react';
import {ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Footer from '../../common/footer';
import Header from '../../common/header';
import {Block, Button, Input, Text} from '../../components';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {strictValidObjectWithKeys} from '../../utils/commonUtils';
import {contactUsRequest} from '../../redux/action';
const Help = () => {
  const user = useSelector((state) => state.user.profile.user);
  const loading = useSelector((state) => state.contact.loading);
  const dispatch = useDispatch();
  const mobileValue =
    strictValidObjectWithKeys(user) &&
    user.custom_attributes.find((v) => v.attribute_code === 'customer_mobile');
  const submitValues = (values, {resetForm}) => {
    const {name, email, mobile, message} = values;
    const data = {
      name: name,
      email: email,
      telephone: mobile,
      comment: message,
    };
    dispatch(contactUsRequest(data));
    resetForm();
  };
  return (
    <Block>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block
          white
          flex={false}
          padding={[hp(2), 0, hp(2), 0]}
          margin={[hp(2), wp(3), 0, wp(3)]}>
          <Text semibold center>
            Contact Us
          </Text>
          <Formik
            enableReinitialize={true}
            initialValues={{
              mobile: mobileValue.value || '',
              name: '',
              message: '',
              email: '',
            }}
            onSubmit={submitValues}
            validationSchema={yup.object().shape({
              mobile: yup
                .string()
                .min(10)
                .max(15)
                .required('Mobile Number is Required'),
              name: yup.string().min(1).required(),
              message: yup.string().min(1).required(),
              email: yup.string().email().required(),
            })}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              handleSubmit,
              dirty,
              isValid,
            }) => (
              <Block flex={false} margin={[hp(2), wp(3), 0, wp(3)]}>
                <Input
                  label="Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                  error={touched.name && errors.name}
                  errorText={touched.name && errors.name}
                />
                <Input
                  label="Email Address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  error={touched.email && errors.email}
                  errorText={touched.email && errors.email}
                />
                <Input
                  label="Phone Number"
                  value={values.mobile}
                  onChangeText={handleChange('mobile')}
                  onBlur={() => setFieldTouched('mobile')}
                  error={touched.mobile && errors.mobile}
                  errorText={touched.mobile && errors.mobile}
                />
                <Input
                  label="Message"
                  value={values.message}
                  onChangeText={handleChange('message')}
                  onBlur={() => setFieldTouched('message')}
                  error={touched.message && errors.message}
                  errorText={touched.message && errors.message}
                />
                <Button
                  disabled={!isValid || !dirty}
                  isLoading={loading}
                  onPress={handleSubmit}
                  color="secondary">
                  Submit
                </Button>
              </Block>
            )}
          </Formik>
        </Block>
        <Footer images={false} />
      </ScrollView>
    </Block>
  );
};
export default Help;
