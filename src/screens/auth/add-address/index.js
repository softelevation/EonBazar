import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Footer from '../../../common/footer';
import Header from '../../../common/header';
import { Block, Button, Input, Text } from '../../../components';
import Checkbox from '../../../components/checkbox';
import { t1, t2, t4, w3, w5 } from '../../../components/theme/fontsize';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import { generateOtpRequest, updateProfileRequest } from '../../../redux/action';

import * as yup from 'yup';
import { Formik } from 'formik';
import {
  searchDistrictRequest,
  searchAreaRequest,
  addShippingRequest,
} from '../../../redux/action';
import {
  strictValidArray,
  strictValidArrayWithLength,
  strictValidNumber,
  strictValidObjectWithKeys,
} from '../../../utils/commonUtils';
import { config } from '../../../utils/config';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { color, onChange } from 'react-native-reanimated';
import * as Navigation from '../../../routes/NavigationService';
import Toast from '../../../common/toast';

global.shippingAddress = '';
const stylesPicker = StyleSheet.create({
  placeholder: {
    color: '#000',
  },
  inputIOS: {
    paddingHorizontal: widthPercentageToDP(3),
    paddingVertical: t1,
    borderWidth: 1,
    borderColor: '#C2C2C2',
  },
  inputAndroid: {
    paddingHorizontal: widthPercentageToDP(3),
    borderWidth: 1,
    borderColor: '#C2C2C2',
    paddingVertical: heightPercentageToDP(0.3),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
  },
  viewContainer: {
    marginTop: t1,
  },
  inputBox: {
    padding: 2,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderRadius: 100,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: '#cccccc',
    height: 45,
    // backgroundColor: ColorConstants.WHITE,
    overflow: 'hidden',
    color: '#999999',
    fontSize: 14,
    marginBottom: 10,
    // fontFamily: FontConstants.NUNITO_SANS_REGULAR,
  },
  itemStyle: {
    padding: 2,
    fontSize: 16,
    height: 'auto',
  },
});

const AddAddress = (
  {
    // route: {
    //     params: { itemDetail },
    // },
  },
) => {
  const dispatch = useDispatch();
  const [State, setState] = useState('');
  const [region, setregion] = useState(null);
  const [shipping, setShipping] = useState([]);
  const currency = useSelector(
    (state) => state.currency.currencyDetail.data.base_currency_code,
  );
  const district = useSelector((state) => state.area.district.data);
  const city = useSelector((state) => state.area.cities.data);
  const isLoad = useSelector((state) => state.shipping.shippingDetails.loading);
  const userData = useSelector((state) => state.user.profile.user);
  const [selectTab, setSelectTab] = useState('Shipping');
  const [listMainColor, setListMainColor] = useState('#ffffff');
  const [listTextColor, setListTextColor] = useState('#7D7F86');
  const [shippingMainColor, setShippingMainColor] = useState('#78A942');
  const [shippingTextColor, setShippingTextColor] = useState('#ffffff');
  const [shippingAddress, setShippingAddress] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [carrier, setCarrier] = useState('');
  const [method, setMethod] = useState('');

  useEffect(() => {
    strictValidArray(district.items) && selectDistrict(1);

    if (strictValidObjectWithKeys(userData)) {
      getShippingCharge();
    } else {
      getShippingChargeByGuest();
    }

    getShippingAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getShippingAddress = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios({
      method: 'get',
      url: `${config.Api_Url}/V1/customers/me`,
      headers,
    }).then((res) => {
      setShippingAddress(res.data.addresses);
    });
  };

  const getShippingCharge = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    axios({
      method: 'post',
      url: `${config.Api_Url}/V1/carts/mine/estimate-shipping-methods`,
      headers,
      data: {
        address: {
          region_id: '0',
          country_id: 'BD',
        },
      },
    }).then((res) => setShipping(res.data));
  };
  const getShippingChargeByGuest = async () => {
    const guest = await AsyncStorage.getItem('guest-token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${guest}`,
    };
    axios({
      method: 'post',
      url: `${config.Api_Url}/V1/guest-carts/${guest}/estimate-shipping-methods`,
      headers,
      data: {
        address: {
          region_id: '0',
          country_id: 'BD',
        },
      },
    }).then((res) => setShipping(res.data));
  };

  const submitValues = (values) => {

    if (userData.addresses.length > 0) {

      const savedata = {
        customer_id: userData.addresses[0].customer_id,
        region: {
          region_code: null,
          region: null,
          region_id: 0,
        },
        region_id: 0,
        country_id: 'BD',
        street: ['Test'],
        telephone: values.mobile,
        postcode: values.postalCode,
        city: values.city,
        firstname: values.firstname,
        lastname: values.lastname,
        default_shipping: true,
        default_billing: true,
        custom_attributes: [
          {
            attribute_code: 'sa_area_id',
            value: '0',
          },
        ],
      }
      var userAddress = userData.addresses;
      var joined = userAddress.concat(savedata);

      const submitData = {
        customer: {
          email: `${values.mobile}${config.domain_name}`,
          firstname: values.firstname,
          lastname: values.lastname,
          store_id: 1,
          website_id: 1,
          id: userData.addresses[0].customer_id,
          addresses: joined,
        },
      };

      // console.log('======>>>>', JSON.stringify(submitData));
      addNewAddress(submitData);
    }
    else {

      const submitData = {
        customer: {
          email: `${values.mobile}${config.domain_name}`,
          firstname: values.firstname,
          lastname: values.lastname,
          store_id: 1,
          website_id: 1,
          id: userData.addresses[0].customer_id,
          addresses: [
            {
              customer_id: userData.addresses[0].customer_id,
              region: {
                region_code: null,
                region: null,
                region_id: 0,
              },
              region_id: 0,
              country_id: 'BD',
              street: ['Test'],
              telephone: values.mobile,
              postcode: values.postalCode,
              city: values.city,
              firstname: values.firstname,
              lastname: values.lastname,
              default_shipping: true,
              default_billing: true,
              custom_attributes: [
                {
                  attribute_code: 'sa_area_id',
                  value: '0',
                },
              ],
            },
          ],
        },
      };


      // console.log('======>>>>else  ', JSON.stringify(submitData));
      addNewAddress(submitData);

    }

  };

  const addNewAddress = async (editData) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return fetch(`${config.Api_Url}/V1/customers/me/ `, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(editData),
    })
      .then((r) => r.json())
      .then((r) => {
        console.log('add address====>>>', r);
        Navigation.goBack();
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  };

  const selectDistrict = (value) => {
    dispatch(searchAreaRequest(value));
    const getStates =
      strictValidArray(district.items) &&
      district.items.filter((v) => v.id === value);
    getStates.map((c) => setState(c.name));
  };
  const selectCity = (val) => {
    const getStates =
      strictValidArray(city.items) && city.items.filter((v) => v.name === val);
    getStates.map((c) => setregion(c.id));
  };

  return (
    <Block>
      <Header leftIcon={false} />
      <Formik
        enableReinitialize
        initialValues={{
          firstname: '',
          lastname: '',
          mobile: '',
          // company: '',
          streetAddress: '',
          city: '',
          postalCode: '',
          // streetAddress: '',
          // streetAddress2: '',
          // city: '',
          // postalCode: '',
          country: 'Bangladesh',
          district: '',
          region: '',
          // shipping: '',
          // carrier_code: '',
          // method_code: '',
        }}
        onSubmit={submitValues}
        validationSchema={yup.object().shape({
          mobile: yup
            .string()
            .min(10)
            .max(15)
            .required('Mobile Number is Required'),
          firstname: yup.string().min(3).required('First Name is Required'),
          lastname: yup.string().min(1).required('Last Name is Required'),
          streetAddress: yup.string().required('Street Address is Required'),
          city: yup.string().required('City is Required'),
          // shipping: yup.string().required('Please choose Shipping method'),
          postalCode: yup
            .string()
            .min(3)
            .max(6)
            .required('Zip/Postal Code is Required'),
          country: yup.string().required('Country is Required'),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          handleSubmit,
          // setFieldValue,
          // isValid,
          // dirty,
        }) => {
          return (
            <View style={{ flex: 1 }}>
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <Block white padding={[t2]} margin={[t1, w3]}>
                  <Text margin={[t2, 0]} bold transform="uppercase">
                    Add Address
                  </Text>
                  {strictValidNumber(values.district) ? (
                    <Text margin={[t1, 0, 0]} body color="#636363">
                      {'Select District'}
                    </Text>
                  ) : null}
                  {strictValidNumber(values.district) ? (
                    <RNPickerSelect
                      placeholder={
                        {
                          // label: '',
                        }
                      }
                      useNativeAndroidPickerStyle={false}
                      value={values.district}
                      mode="dropdown"
                      style={stylesPicker}
                      onValueChange={(value) => {
                        setFieldValue('district', value);
                        selectDistrict(value);
                      }}
                      items={
                        strictValidArray(district.items) &&
                        district.items.map((v) => ({
                          label: v.name,
                          value: v.id,
                        }))
                      }
                    />
                  ) : null}
                  {strictValidNumber(values.district) ? (
                    <Text margin={[t1, 0, 0]} body color="#636363">
                      {'Select Delievery Area'}
                    </Text>
                  ) : null}
                  {strictValidNumber(values.district) &&
                    strictValidArrayWithLength(city.items) ? (
                    <>
                      <RNPickerSelect
                        placeholder={
                          {
                            // label: 'Select City',
                          }
                        }
                        useNativeAndroidPickerStyle={false}
                        style={stylesPicker}
                        value={values.region}
                        onValueChange={(value) => {
                          setFieldValue('region', value);
                          selectCity(value);
                        }}
                        items={
                          strictValidArray(city.items) &&
                          city.items.map((a) => ({
                            label: `${a.name} - ${State}`,
                            value: `${a.name}`,
                          }))
                        }
                      />
                    </>
                  ) : strictValidNumber(values.district) ? (
                    <Text size={12} errorColor>
                      Please choose another District
                    </Text>
                  ) : null}
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
                  {/* <Input
                                        label="Company"
                                        value={values.company}
                                        onChangeText={handleChange('company')}
                                        onBlur={() => setFieldTouched('company')}
                                        error={touched.company && errors.company}
                                        errorText={touched.company && errors.company}
                                    /> */}
                  <Input
                    label="Street Address"
                    value={values.streetAddress}
                    onChangeText={handleChange('streetAddress')}
                    onBlur={() => setFieldTouched('streetAddress')}
                    error={touched.streetAddress && errors.streetAddress}
                    errorText={touched.streetAddress && errors.streetAddress}
                  />
                  {/* <Input
                    value={values.streetAddress2}
                    onChangeText={handleChange('streetAddress2')}
                    onBlur={() => setFieldTouched('streetAddress2')}
                    error={touched.streetAddress2 && errors.streetAddress2}
                    errorText={
                      touched.streetAddress2 && errors.streetAddress2
                    }
                  /> */}
                  <Input
                    label="City"
                    value={values.city}
                    onChangeText={handleChange('city')}
                    onBlur={() => setFieldTouched('city')}
                    error={touched.city && errors.city}
                    errorText={touched.city && errors.city}
                  />
                  <Input
                    label="Zip / Postal Code"
                    value={values.postalCode}
                    onChangeText={handleChange('postalCode')}
                    onBlur={() => setFieldTouched('postalCode')}
                    error={touched.postalCode && errors.postalCode}
                    errorText={touched.postalCode && errors.postalCode}
                    keyboardType="number-pad"
                  />
                  <Input
                    label="Country"
                    value={values.country}
                    onChangeText={handleChange('country')}
                    onBlur={() => setFieldTouched('country')}
                    error={touched.country && errors.country}
                    errorText={touched.country && errors.country}
                    editable={false}
                  />
                  <Input
                    label="Phone Number"
                    value={values.mobile}
                    onChangeText={handleChange('mobile')}
                    onBlur={() => setFieldTouched('mobile')}
                    error={touched.mobile && errors.mobile}
                    errorText={touched.mobile && errors.mobile}
                    keyboardType="number-pad"
                  />
                  <Text size={12}>Please add number without country code</Text>
                  <Block margin={[t4, 0, 0, 0]}>
                    <Button
                      isLoading={isLoad}
                      // disabled={!isValid || !dirty}
                      onPress={handleSubmit}
                      style={buttonStyle}
                      color="secondary">
                      Save
                    </Button>
                  </Block>
                </Block>
              </KeyboardAwareScrollView>
            </View>
          );
        }}
      </Formik>
    </Block>
  );
};
const buttonStyle = {
  width: widthPercentageToDP(50),
  alignSelf: 'center',
};
const checkboxStyle = { height: 20, width: 20 };
const labelStyle = { marginLeft: w3, fontSize: 12 };

export default AddAddress;
