import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
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
import {
  generateOtpRequest,
  profileRequest,
  updateProfileRequest,
} from '../../../redux/action';

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
  strictValidString,
} from '../../../utils/commonUtils';
import {config} from '../../../utils/config';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {color, onChange} from 'react-native-reanimated';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Toast} from '../../../common/toast';
import SearchableDropdown from 'react-native-searchable-dropdown';
import SearchOptions from '../../../components/searchOptions';

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
    color: '#999999',
  },
  inputAndroid: {
    paddingHorizontal: widthPercentageToDP(3),
    borderWidth: 1,
    borderColor: '#C2C2C2',
    paddingVertical: heightPercentageToDP(0.3),
    color: '#999999',
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

const Shipping = ({
  route: {
    params: {price},
  },
}) => {
  const formikRef = useRef();
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
  const [newItem, setitem] = useState({});

  useEffect(() => {
    dispatch(searchDistrictRequest());
  }, []);

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
    const data = {
      addressInformation: {
        shipping_address: {
          // region: `${values.region} - ${State}`,
          region: State ? State : 'Dhaka',
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
          // region: `${values.region} - ${State}`,
          region: State ? State : 'Dhaka',
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
        shipping_carrier_code: values.shipping,
        shipping_method_code: values.method_code,
      },
    };
    //updateAddress (data);
    // const savedata = {

    const savedata = {
      customer_id: userData.id,
      region: {
        region_code: region,
        region: State ? State : 'Dhaka',
        region_id: region,
      },
      region_id: region,
      country_id: 'BD',
      street: [values.streetAddress, values.streetAddress2],
      telephone: values.mobile,
      postcode: values.postalCode,
      city: values.city,
      firstname: values.firstname,
      lastname: values.lastname,
      default_shipping: true,
      default_billing: true,
    };
    var userAddress = userData.addresses;
    var joined = userAddress.concat(savedata);
    const submitData = {
      customer: {
        group_id: 1,
        default_billing: '2',
        default_shipping: '2',
        created_at: new Date(),
        updated_at: new Date(),
        created_in: 'Default Store View',
        email: `${values.mobile}${config.domain_name}`,
        firstname: values.firstname,
        lastname: values.lastname,
        store_id: 1,
        website_id: 1,
        addresses: joined,
      },
    };
    addNewAddress(submitData);
    dispatch(addShippingRequest(data));
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
        dispatch(profileRequest());
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  };

  const updateAddress = async (data) => {
    // alert(JSON.stringify(data))
    const savedata = {
      customer: {
        id: userData.id,
        email: data.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
        middlename: '',
        gender: 0,
        store_id: 1,
        website_id: 1,
      },
      mobile: '',
      websiteId: 1,

      addresses: [
        {
          id: userData.id,
          customer_id: 352,
          region: region,
          region_id: data.region_id,
          country_id: 'BD',
          street: data.street,
          telephone: data.telephone,
          postcode: data.ps,
          city: data.city,
          firstname: data.firstname,
          lastname: data.lastname,
          default_shipping: true,
          default_billing: true,
        },
      ],
    };
    dispatch(updateProfileRequest(savedata));
  };

  // const selectDistrict = (value) => {
  //   dispatch(searchAreaRequest(value));
  //   formikRef.current?.setFieldValue('district', value);
  //   const getStates =
  //     strictValidArray(district.items) &&
  //     district.items.filter((v) => v.id === value);
  //   getStates.map((c) => setState(c.name));
  // };
  // const selectCity = (val) => {
  //   const getStates =
  //     strictValidArray(city.items) && city.items.filter((v) => v.name === val);
  //   getStates.map((c) => setregion(c.id));
  // };
  const selectDistrict = (value) => {
    dispatch(searchAreaRequest(value));
    formikRef.current?.setFieldValue('district', value);
    const getStates =
      strictValidArray(district.items) &&
      district.items.filter((v) => v.id === value);
    getStates.map((c) => {
      setState(c.name);
    });
  };
  const selectCity = (val) => {
    const getStates =
      strictValidArray(city.items) && city.items.filter((v) => v.name === val);
    getStates.map((c) => setregion(c.id));
  };

  const listClick = () => {
    getShippingAddress();
    setSelectTab('List');
    setListMainColor('#78A942');
    setListTextColor('#ffffff');
    setShippingMainColor('#ffffff');
    setShippingTextColor('#7D7F86');
  };

  const shippingClick = () => {
    setSelectTab('Shipping');
    setListMainColor('#ffffff');
    setListTextColor('#7D7F86');
    setShippingMainColor('#78A942');
    setShippingTextColor('#ffffff');
  };

  const listPress = (item) => {
    if (carrier == null || carrier == '') {
      Toast('Please select payment method');
    } else {
      const data = {
        addressInformation: {
          shipping_address: {
            region: item.region.region,
            region_id: item.region.region_id,
            country_id: item.country_id,
            street: [item.street[0]],
            postcode: item.postcode,
            city: item.city,
            firstname: item.firstname,
            lastname: item.lastname,
            customer_id: item.id,
            email: '',
            telephone: item.telephone,
          },
          billing_address: {
            region: item.region.region,
            region_id: item.region.region_id,
            country_id: item.country_id,
            street: [item.street[0]],
            postcode: item.postcode,
            city: item.city,
            firstname: item.firstname,
            lastname: item.lastname,
            customer_id: item.id,
            email: '',
            telephone: item.telephone,
            same_as_billing: 1,
          },
          shipping_carrier_code: carrier ? carrier : 'freeshipping',
          shipping_method_code: method ? method : 'freeshipping',
        },
      };
      dispatch(addShippingRequest(data));
    }
  };

  return (
    <Block>
      <Header leftIcon={false} />
      <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={{
          firstname: userData.firstname,
          lastname: userData.lastname,
          mobile: '',
          // company: '',
          streetAddress: '',
          streetAddress2: '',
          city: '',
          postalCode: '',
          country: 'Bangladesh',
          district: '',
          region: '',
          shipping: '',
          carrier_code: '',
          method_code: '',
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
            <View style={{flex: 1}}>
              <View
                style={{
                  marginTop: 20,
                  marginLeft: 5,
                  marginRight: 5,
                  flexDirection: 'row',
                  height: 45,
                  borderRadius: 100,
                  backgroundColor: '#ffffff',
                  borderWidth: 0,
                  borderColor: 'red',
                }}>
                <TouchableOpacity
                  style={[
                    stylesPicker.inputBox,
                    {
                      flex: 1,
                      borderWidth: 0,
                      borderColor: 'transparent',
                      backgroundColor: shippingMainColor,
                      justifyContent: 'center',
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                  ]}
                  onPress={() => shippingClick()}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: shippingTextColor,
                      fontSize: 14,
                    }}>
                    Shipping Address
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    stylesPicker.inputBox,
                    {
                      borderColor: 'transparent',
                      flex: 1,
                      borderWidth: 0,
                      backgroundColor: listMainColor,
                      justifyContent: 'center',
                    },
                  ]}
                  onPress={() => listClick()}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: listTextColor,
                      fontSize: 14,
                    }}>
                    Saved Address
                  </Text>
                </TouchableOpacity>
              </View>

              {selectTab === 'Shipping' ? (
                <KeyboardAwareScrollView
                  keyboardShouldPersistTaps="always"
                  showsVerticalScrollIndicator={false}>
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
                    <SearchOptions
                      placeholder="Select district"
                      data={strictValidArray(district.items) && district.items}
                      setResults={(a) => selectDistrict(a.id)}
                      results={State}
                    />
                    {strictValidString(values.district) ||
                    (strictValidNumber(values.district) &&
                      strictValidArrayWithLength(city.items)) ? (
                      <Text margin={[t1, 0, 0]} body color="#636363">
                        {'Select Delievery Area'}
                      </Text>
                    ) : null}
                    {(strictValidString(values.district) ||
                      strictValidNumber(values.district)) &&
                    strictValidArrayWithLength(city.items) ? (
                      <SearchOptions
                        placeholder="Select city"
                        data={strictValidArray(city.items) && city.items}
                        setResults={(a) => selectCity(a.name)}
                      />
                    ) : strictValidString(values.district) ||
                      strictValidNumber(values.district) ? (
                      <Text
                        margin={[heightPercentageToDP(1), 0]}
                        size={12}
                        errorColor>
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
                    <Text size={12}>
                      Please add number without country code
                    </Text>
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
                              onChange={(b) => {
                                setFieldValue('shipping', a.carrier_code);
                                setFieldValue('method_code', a.method_code);
                              }}
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
              ) : (
                <View style={{flex: 1, marginTop: 10}}>
                  <Text center size={16} margin={[heightPercentageToDP(1), 0]}>
                    Please select at least one address
                  </Text>
                  {strictValidArrayWithLength(shippingAddress) ? (
                    <FlatList
                      keyExtractor={(item) => item.id}
                      data={shippingAddress}
                      renderItem={({item, index}) => (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            if (item.id === newItem.id) {
                              setitem({});
                            } else {
                              setitem(item);
                            }
                          }}
                          style={[
                            item.id === newItem.id
                              ? {backgroundColor: '#78A942'}
                              : {backgroundColor: 'white'},
                            {
                              margin: 20,
                              marginTop: 10,
                              marginBottom: 10,
                              padding: 15,
                              borderRadius: 20,
                            },
                          ]}>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              color={item.id === newItem.id ? '#fff' : '#000'}
                              style={[stylesPicker.itemStyle, {flex: 1}]}>
                              {item.firstname + ' ' + item.lastname}
                            </Text>
                            {item.id === newItem.id && (
                              <Text white size={14} secondary semibold>
                                Selected
                              </Text>
                            )}
                          </View>
                          <Text
                            color={item.id === newItem.id ? '#fff' : '#000'}
                            style={stylesPicker.itemStyle}>
                            Mobile No: {item.telephone}
                          </Text>
                          <Text
                            color={item.id === newItem.id ? '#fff' : '#000'}
                            style={stylesPicker.itemStyle}>
                            City: {item.city}
                          </Text>
                          <Text
                            color={item.id === newItem.id ? '#fff' : '#000'}
                            style={stylesPicker.itemStyle}>
                            Street Address: {item.street}
                          </Text>
                          <Text
                            color={item.id === newItem.id ? '#fff' : '#000'}
                            style={stylesPicker.itemStyle}>
                            Postcode: {item.postcode}
                          </Text>
                        </TouchableOpacity>
                      )}
                      // ItemSeparatorComponent={this.renderSeparator}
                    />
                  ) : (
                    <View
                      style={{
                        justifyContent: 'center',
                        flex: 1,
                        alignItems: 'center',
                      }}>
                      <Text>No address found</Text>
                    </View>
                  )}
                </View>
              )}
              {selectTab !== 'Shipping' && strictValidObjectWithKeys(newItem) && (
                <Block
                  primary
                  flex={false}
                  padding={[t2, w3]}
                  margin={[t2, 0, 0, 0]}>
                  <Text transform="uppercase" bold>
                    Shipping Charge
                  </Text>
                  {shipping.map((a) => {
                    return (
                      <Block
                        flex={false}
                        margin={[t2, 0, 0, 0]}
                        row
                        space={'between'}
                        center>
                        <Checkbox
                          checkboxStyle={checkboxStyle}
                          labelStyle={labelStyle}
                          label={`BDT ${a.amount.toFixed(2)}`}
                          checked={a.carrier_code === values.shipping}
                          onChange={(b) => {
                            // if(item.id === )
                            setFieldValue('shipping', a.carrier_code);
                            setFieldValue('method_code', a.method_code);
                            setCarrier(a.carrier_code);
                            setMethod(a.method_code);
                          }}
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
                    disabled={!strictValidString(carrier)}
                    style={{
                      width: widthPercentageToDP(80),
                      borderRadius: 20,
                      alignSelf: 'center',
                      borderWidth: 0,
                    }}
                    onPress={listPress.bind(this, newItem)}
                    color="secondary">
                    Next
                  </Button>
                </Block>
              )}
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
const checkboxStyle = {height: 20, width: 20};
const labelStyle = {marginLeft: w3, fontSize: 12};
const textStyle = {
  padding: 12,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  color: '#999999',
};
const itemstyle = {
  padding: 10,
  marginTop: 5,
  backgroundColor: '#fff',
  borderColor: '#bbb',
  borderWidth: 1,
  borderRadius: 5,
};
export default Shipping;
