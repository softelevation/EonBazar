import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Footer from '../../../common/footer';
import Header from '../../../common/header';
import {Block, Button, Input, Text} from '../../../components';
import Checkbox from '../../../components/checkbox';
import {t1, t2, t4, w3, w5} from '../../../components/theme/fontsize';
import RNPickerSelect from 'react-native-picker-select';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {Formik} from 'formik';
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
import {config} from '../../../utils/config';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

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
});

const Shipping = ({
  route: {
    params: {price},
  },
}) => {
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

  useEffect(() => {
    strictValidArray(district.items) && selectDistrict(1);
    if (strictValidObjectWithKeys(userData)) {
      getShippingCharge();
    } else {
      getShippingChargeByGuest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const data = {
      addressInformation: {
        shipping_address: {
          region: `${values.region} - ${State}`,
          region_id: region,
          country_id: 'BD',
          street: [values.streetAddress, values.streetAddress2],
          postcode: values.postalCode,
          city: values.city,
          firstname: values.firstname,
          lastname: values.lastname,
          customer_id: 352,
          email: `${values.mobile}${config.domain_name}`,
          telephone: values.mobile,
        },
        billing_address: {
          region: `${values.region} - ${State}`,
          region_id: region,
          country_id: 'BD',
          street: [values.streetAddress, values.streetAddress2],
          postcode: values.postalCode,
          city: values.city,
          firstname: values.firstname,
          lastname: values.lastname,
          customer_id: 352,
          email: `${values.mobile}${config.domain_name}`,
          telephone: values.mobile,
          same_as_billing: 1,
        },
        shipping_carrier_code: 'flatrate',
        shipping_method_code: 'flatrate',
      },
    };
    dispatch(addShippingRequest(data));
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
      <Header />
      <Formik
        enableReinitialize
        initialValues={{
          firstname: '',
          lastname: '',
          mobile: '',
          company: '',
          streetAddress: '',
          streetAddress2: '',
          city: '',
          postalCode: '',
          country: 'Bangladesh',
          district: 1,
          region: '',
          shipping: '',
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
          shipping: yup.string().required('Please choose Shipping method'),
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
          setFieldValue,
          isValid,
          dirty,
        }) => {
          return (
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <Block margin={[t2, w5]}>
                <Text size={24} height={40} bold>
                  Estimated Total
                </Text>
                <Text bold>
                  {currency} {price}
                </Text>
              </Block>

              <Block white padding={[t2]} margin={[t1, w3]}>
                <Text margin={[t2, 0]} bold transform="uppercase">
                  Shipping Address
                </Text>
                <Text margin={[t1, 0, 0]} body color="#636363">
                  {'Select District'}
                </Text>
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
                <Text margin={[t1, 0, 0]} body color="#636363">
                  {'Select Delievery Area'}
                </Text>
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
                ) : (
                  <Text size={12} errorColor>
                    Please choose another District
                  </Text>
                )}
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
                <Input
                  label="Company"
                  value={values.company}
                  onChangeText={handleChange('company')}
                  onBlur={() => setFieldTouched('company')}
                  error={touched.company && errors.company}
                  errorText={touched.company && errors.company}
                />
                <Input
                  label="Street Address"
                  value={values.streetAddress}
                  onChangeText={handleChange('streetAddress')}
                  onBlur={() => setFieldTouched('streetAddress')}
                  error={touched.streetAddress && errors.streetAddress}
                  errorText={touched.streetAddress && errors.streetAddress}
                />
                <Input
                  value={values.streetAddress2}
                  onChangeText={handleChange('streetAddress2')}
                  onBlur={() => setFieldTouched('streetAddress2')}
                  error={touched.streetAddress2 && errors.streetAddress2}
                  errorText={touched.streetAddress2 && errors.streetAddress2}
                />
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
                  <Text transform="uppercase" bold>
                    Shipping Charge
                  </Text>
                  {shipping.map((a) => {
                    return (
                      <Block
                        margin={[t2, 0, 0, 0]}
                        row
                        space={'between'}
                        center>
                        <Checkbox
                          checkboxStyle={checkboxStyle}
                          labelStyle={labelStyle}
                          label={`BDT ${a.amount.toFixed(2)}`}
                          checked={a.carrier_code === values.shipping}
                          onChange={(b) =>
                            setFieldValue('shipping', a.carrier_code)
                          }
                        />
                        <Text size={12}>{a.method_title}</Text>
                        <Text
                          style={{width: widthPercentageToDP(27)}}
                          size={12}>
                          {a.carrier_title}
                        </Text>
                      </Block>
                    );
                  })}
                  {touched.firstname && errors.firstname && (
                    <Text size={12} errorColor>
                      {touched.firstname && errors.firstname}
                    </Text>
                  )}
                  <Button
                    isLoading={isLoad}
                    disabled={!isValid || !dirty}
                    onPress={handleSubmit}
                    style={buttonStyle}
                    color="secondary">
                    Next
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
const buttonStyle = {
  width: widthPercentageToDP(50),
  alignSelf: 'center',
};
const checkboxStyle = {height: 20, width: 20};
const labelStyle = {marginLeft: w3, fontSize: 12};
export default Shipping;
