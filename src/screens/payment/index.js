import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {images} from '../../assets';
import Footer from '../../common/footer';
import Header from '../../common/header';
import {
  Block,
  Button,
  CustomButton,
  ImageComponent,
  Input,
  Text,
} from '../../components';
import Checkbox from '../../components/checkbox';
import {paymentRequest} from '../../redux/action';
import {
  strictValidArray,
  strictValidArrayWithLength,
} from '../../utils/commonUtils';
import {config} from '../../utils/config';

const initialState = {
  cards: false,
  cash: false,
};
const PaymentMethod = ({
  route: {
    params: {item},
  },
}) => {
  const nav = useNavigation();
  const [discount, setdiscount] = useState(false);
  const [instruction, setinstruction] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(initialState);
  const [terms, setTerms] = useState([]);
  const [termsToggle, setTermsToggle] = useState(false);
  const isLoad = useSelector((state) => state.payment.loading);
  const dispatch = useDispatch();

  const {cards, cash} = toggleCheckBox;
  console.log(item, 'item');
  const {addressInformation} = item;
  const {shipping_address} = addressInformation;
  const paymentMethod = useSelector(
    (v) => v.shipping.shippingDetails.data.payment_methods,
  );

  useEffect(() => {
    termsCondition();
  }, []);

  const termsCondition = async () => {
    const token = '5q0h1829ixf2vdm57k6g3qtzd88wkvr2';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    axios({
      method: 'get',
      url: 'http://stage.eonbazar.com/rest/V1/carts/licence',
      headers,
    }).then((res) => setTerms(res.data));
  };

  const proceedPayment = () => {
    if (cards) {
      nav.navigate('PlaceAnOrder');
    } else {
      nav.navigate('ThankYou');
    }
  };

  const onSubmit = () => {
    const data = {
      method: cards,
      po_number: '',
      agreement_id: terms[0].agreement_id,
    };

    dispatch(paymentRequest(data));
  };
  console.log(terms, 'terms');
  return (
    <Block>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text margin={[hp(2), 0, 0, 0]} semibold transform="uppercase" center>
          Payment Method
        </Text>
        <Block white padding={[hp(3)]} margin={[hp(2), wp(5)]}>
          {paymentMethod.map((a) => {
            return (
              <>
                <Block margin={[hp(1), 0, 0]} row center flex={false}>
                  <Checkbox
                    checkboxStyle={{height: 20, width: 20}}
                    label={a.title}
                    checked={a.code === cards}
                    onChange={(newValue) => setToggleCheckBox({cards: a.code})}
                    labelStyle={{fontSize: 12, color: '#818991'}}
                  />
                </Block>

                {a.code === cards && (
                  <>
                    <Block flex={false} margin={[0, wp(8)]}>
                      <Text height={20} grey size={12}>
                        {shipping_address.firstname} {shipping_address.lastname}
                      </Text>
                      <Text height={20} grey size={12}>
                        {shipping_address.street[0]}{' '}
                        {shipping_address.street[1] || ''}
                      </Text>
                      <Text height={20} grey size={12}>
                        {shipping_address.telephone}
                      </Text>
                    </Block>
                    <CustomButton
                      onPress={() => setinstruction(!instruction)}
                      center
                      row
                      margin={[hp(1), 0]}
                      flex={false}>
                      <Text
                        height={20}
                        margin={[0, wp(1), 0, 0]}
                        grey
                        size={12}>
                        Special Instruction
                      </Text>
                      <ImageComponent
                        name={instruction ? 'up_arrow_icon' : 'down_arrow_icon'}
                        height="10"
                        width="10"
                      />
                    </CustomButton>
                    {instruction && (
                      <>
                        <Input
                          placeholder="Enter Your comment"
                          multiline={true}
                          numberOfLines={4}
                          style={{height: hp(8)}}
                        />
                      </>
                    )}
                  </>
                )}
              </>
            );
          })}
          {strictValidArrayWithLength(terms) && (
            <Block margin={[hp(1), 0, 0]} row center flex={false}>
              <Checkbox
                checkboxStyle={{height: 20, width: 20}}
                label={terms[0].checkbox_text}
                checked={termsToggle}
                onChange={(newValue) => setTermsToggle(!termsToggle)}
                labelStyle={{fontSize: 12, color: '#818991'}}
                checkedImage={images.checkbox_icon}
                uncheckedImage={images.uncheckbox_icon}
              />
            </Block>
          )}

          <Button
            disabled={!termsToggle || !cards}
            isLoading={isLoad}
            onPress={() => onSubmit()}
            color="secondary">
            Place Order
          </Button>
          <CustomButton
            row
            center
            onPress={() => setdiscount(!discount)}
            flex={false}>
            <Text margin={[0, wp(1), 0, 0]} grey size={12}>
              Apply Discount Code
            </Text>
            <ImageComponent
              name={discount ? 'up_arrow_icon' : 'down_arrow_icon'}
              height="10"
              width="10"
            />
          </CustomButton>
          {discount && (
            <>
              <Input label="Discount Coupon" />
              <Button color="secondary">Apply Discount</Button>
            </>
          )}
        </Block>
        <Footer images={false} />
      </ScrollView>
    </Block>
  );
};

export default PaymentMethod;
