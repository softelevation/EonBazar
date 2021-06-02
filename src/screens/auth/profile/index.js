import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../common/header';
import {Block, Button, CustomButton, Input, Text} from '../../../components';
import {t3, w1, w3} from '../../../components/theme/fontsize';
import Footer from '../../../common/footer';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ActivityLoader from '../../../components/activityLoader';
import {
  strictValidObject,
  strictValidObjectWithKeys,
} from '../../../utils/commonUtils';
import {Formik} from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {config} from '../../../utils/config';
const Profile = () => {
  const nav = useNavigation();
  const userData = useSelector((state) => state.user.profile.user);
  const isLoad = useSelector((state) => state.user.profile.loading);
  const [editable, setEditable] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log('u========>>>', userData);
    if (!strictValidObjectWithKeys(userData)) {
      nav.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Login'}],
        }),
      );
    }
  }, []);

  useEffect(() => {
    setUser(userData);

    /* unsubsribe value */
    const unsubscribe = nav.addListener('focus', () => {
      getUserDetail();
    });
  }, [userData]);

  const getUserDetail = async () => {
    const token = await AsyncStorage.getItem('token');

    console.log('=======>>>>>', token);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios({
      method: 'get',
      url: `${config.Api_Url}/V1/customers/me`,
      headers,
    }).then((res) => {
      // console.log("======>>>", res.data)
      setUser(res.data);
    });
  };

  if (isLoad) {
    return <ActivityLoader />;
  } else {
    const mobile =
      strictValidObjectWithKeys(user) &&
      user.custom_attributes.find(
        (v) => v.attribute_code === 'customer_mobile',
      );
    const emailMobile =
      strictValidObjectWithKeys(user) && user.email.replace(/\D/g, '');
    return (
      <Block>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            enableReinitialize
            initialValues={{
              name: `${user.firstname} ${user.lastname}`,
              mobile: mobile.value || emailMobile,
              email: `${user.email}`,
            }}
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
              dirty,
            }) => (
              <>
                <Text margin={[hp(1), 0]} semibold transform="uppercase" center>
                  Your Profile
                </Text>
                <Block white padding={[t3]}>
                  <Input
                    label="Name"
                    value={values.name}
                    editable={editable}
                    onChangeText={handleChange('name')}
                    onBlur={() => setFieldTouched('name')}
                    error={touched.name && errors.name}
                    errorText={touched.name && errors.name}
                  />
                  {/* <Input
                    label="Email Address"
                    value={values.email}
                    editable={editable}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                    error={touched.email && errors.email}
                    errorText={touched.email && errors.email}
                  /> */}
                  <Input
                    label="Phone Number"
                    value={values.mobile}
                    editable={editable}
                    onChangeText={handleChange('mobile')}
                    onBlur={() => setFieldTouched('mobile')}
                    error={touched.mobile && errors.mobile}
                    errorText={touched.mobile && errors.mobile}
                  />
                  <Block row flex={false}>
                    <Text
                      onPress={() =>
                        nav.navigate('EditProfile', {
                          firstName: user.firstname,
                          lastName: user.lastname,
                        })
                      }
                      secondary
                      size={16}>
                      Edit Profile
                    </Text>
                    <Text
                      margin={[0, w3]}
                      onPress={() => nav.navigate('ChangePassword')}
                      secondary
                      size={16}>
                      Change Password
                    </Text>
                  </Block>
                </Block>
                <Block padding={[0, wp(8)]}>
                  {/* <Button color="secondary">Address Book</Button> */}
                  <Button
                    margin={[hp(2), 0]}
                    onPress={() => nav.navigate('ShowAddress')}
                    color="primary">
                    Your Addresses
                  </Button>
                  <FlatList
                    data={user.addresses}
                    renderItem={({item}) => {
                      return (
                        <Block
                          margin={[hp(1), 0, hp(0.5)]}
                          row
                          space={'between'}
                          white
                          padding={[hp(1.5)]}>
                          <Text
                            grey
                            size={14}
                            style={{width: wp(70)}}
                            numberOfLines={1}>
                            {item.street[0]}, {item.city}, {item.postcode}
                          </Text>
                          {/* <Text secondary size={14} onPress={() => nav.navigate('EditAddress', { itemDetail: item })}>
                            Edit
                          </Text> */}
                        </Block>
                      );
                    }}
                  />
                  <Button
                    onPress={() => nav.navigate('DashboardLogo')}
                    color="secondary">
                    Start Shopping
                  </Button>
                </Block>
                <Footer images={false} />
              </>
            )}
          </Formik>
        </ScrollView>
      </Block>
    );
  }
};
export default Profile;
