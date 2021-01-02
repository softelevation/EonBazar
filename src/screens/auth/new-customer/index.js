import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
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
const NewCustomer = () => {
  const [generate, setGenerate] = useState(false);
  const nav = useNavigation();
  const submitValues = (values) => {
    console.log(values);
  };
  return (
    <Block>
      <Header leftIcon={false} />
      <Block flex={false} padding={[0, wp(3), hp(2), wp(3)]}>
        <Search />
      </Block>
      {/* <Banner /> */}
      <Formik
        initialValues={{email: '', password: '', check: false}}
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
          handleSubmit,
          setFieldValue,
        }) => {
          const {check} = values;
          return (
            <ScrollView showsVerticalScrollIndicator={false}>
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
                <Input label="First Name" />
                <Input label="Last Name" />
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
                  <Input label="Email" />
                  <Input label="Customer Mobile" />
                  <Text color="#636363" body>
                    please add number without counry code
                  </Text>
                  <Button
                    onPress={() => setGenerate(true)}
                    style={{width: wp(30)}}
                    color="secondary">
                    GENERATE OTP
                  </Button>
                  {generate && (
                    <>
                      <Input label="Verify Otp" />
                      <Button style={{width: wp(30)}} color="secondary">
                        Verify OTP
                      </Button>
                    </>
                  )}
                  <Input label="Password" />
                  <Input label="Confirm Password" />
                  <Button color="secondary">Create an acount</Button>
                  <Button onPress={() => nav.goBack()} color="secondary">
                    Back
                  </Button>
                </Block>
              </Block>
              <Footer images={false} />
            </ScrollView>
          );
        }}
      </Formik>
    </Block>
  );
};

export default NewCustomer;
