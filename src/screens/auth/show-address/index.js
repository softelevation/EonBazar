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
import AntDesign from 'react-native-vector-icons/AntDesign';


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
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';


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

const ShowAddress = ({
    //   route: {
    //     params: { price },
    //   },
}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
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

        /* unsubsribe value */
        const unsubscribe = navigation.addListener('focus', () => {
            getShippingAddress();
        })

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

            console.log("======>>>", res.data.addresses)
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
                addresses: [
                    {
                        customer_id: userData.id,
                        region: {
                            region_code: region,
                            // "region": `${values.region} - ${State}`,
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
                    },
                ],
            },
        };

        dispatch(updateProfileRequest(savedata));
        dispatch(addShippingRequest(data));
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

    const listClick = () => {
        getShippingAddress();
        navigation.navigate('AddAddress')
    };



    const listPress = (item) => {
        navigation.navigate('EditAddress', { itemDetail: item })
    };


    const deleteAddress = async (item) => {

        const token = await AsyncStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        };
        return fetch(
            `${config.Api_Url}/V1/addresses/${item.customer_id}`,
            {
                method: 'DELETE',
                headers: headers,
                body: JSON.stringify(item)
            },
        )
            .then((r) => r.json())
            .then((r) => {
                console.log("deleteAddress====", r)
                getShippingAddress();
            })
            .catch((error) => {
                console.error(error);
                return [];
            });

    }


    return (
        <Block>
            <Header leftIcon={false} />
            <Formik
                enableReinitialize
                initialValues={{
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                    mobile: '',
                    company: '',
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
                        <View style={{ flex: 1 }}>

                            <Text
                                style={{
                                    color: 'black',
                                    fontWeight: 'bold',
                                    fontSize: 22,
                                    marginTop: 20,
                                    marginLeft: 20,
                                    marginRight: 20,
                                }}>
                                Your Addresses </Text>
                            <View
                                style={{
                                    marginTop: 20,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    flexDirection: 'row',
                                    height: 50,
                                    borderRadius: 10,
                                    backgroundColor: '#ffffff',
                                    borderWidth: 1,
                                    borderColor: 'grey',
                                }}>

                                <TouchableOpacity
                                    style={[
                                        stylesPicker.inputBox,
                                        {
                                            borderColor: 'transparent',
                                            flex: 1,
                                            borderWidth: 0,
                                            backgroundColor: listMainColor,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row', paddingLeft: 20, paddingRight: 20
                                        },
                                    ]}
                                    onPress={() => listClick()}>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontSize: 16,
                                            flex: 1
                                        }}>
                                        Add Address </Text>
                                    <AntDesign name="right" size={20} />
                                </TouchableOpacity>
                            </View>


                            <View style={{ flex: 1, marginTop: 10 }}>
                                {shippingAddress ? (
                                    <FlatList
                                        data={shippingAddress}
                                        renderItem={({ item, index }) => (
                                            <View
                                                style={{
                                                    backgroundColor: 'white',
                                                    margin: 20,
                                                    marginTop: 10,
                                                    marginBottom: 10,
                                                    padding: 15,
                                                    borderRadius: 20,
                                                }}>

                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={[stylesPicker.itemStyle, { flex: 1, fontWeight: 'bold' }]}>
                                                        {item.firstname + ' ' + item.lastname}
                                                    </Text>
                                                </View>

                                                <Text style={stylesPicker.itemStyle}>
                                                    Mobile No: {item.telephone}
                                                </Text>
                                                <Text style={stylesPicker.itemStyle}>
                                                    City: {item.city}
                                                </Text>
                                                <Text style={stylesPicker.itemStyle}>
                                                    Street Address: {item.street}
                                                </Text>
                                                <Text style={stylesPicker.itemStyle}>
                                                    Postcode: {item.postcode}
                                                </Text>

                                                <Block margin={[t4, 0, 0, 0]}>


                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Button
                                                            isLoading={isLoad}
                                                            onPress={listPress.bind(this, item)}
                                                            style={buttonStyle}
                                                            color="secondary">
                                                            Edit  </Button>


                                                        <Button
                                                            isLoading={isLoad}
                                                            onPress={deleteAddress.bind(this, item)}
                                                            style={buttonStyle}
                                                            color="secondary">
                                                            Remove  </Button>

                                                    </View>


                                                </Block>
                                            </View>
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

                        </View>
                    );
                }}
            </Formik>
        </Block>
    );
};
const buttonStyle = {
    width: widthPercentageToDP(30),
    alignSelf: 'center',
    margin: widthPercentageToDP(5),
    justifyContent: 'center',
};
const checkboxStyle = { height: 20, width: 20 };
const labelStyle = { marginLeft: w3, fontSize: 12 };
export default ShowAddress;
