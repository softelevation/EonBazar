import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
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
import {config} from '../../utils/config';

const initialState = {
  cards: false,
  cash: false,
};
const PaymentMethod = () => {
  const nav = useNavigation();
  const [discount, setdiscount] = useState(false);
  const [instruction, setinstruction] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(initialState);
  const [terms, setTerms] = useState({});

  const {cards, cash} = toggleCheckBox;

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
      method: 'post',
      url: `${config.Api_Url}/V1/carts/licence`,
      headers,
    }).then((res) => setTerms(res.data));
  };

  console.log('terms', terms);
  const proceedPayment = () => {
    if (cards) {
      nav.navigate('PlaceAnOrder');
    } else {
      nav.navigate('ThankYou');
    }
  };
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
                    checked={a.title === cards}
                    onChange={(newValue) => setToggleCheckBox({cards: a.title})}
                    labelStyle={{fontSize: 12, color: '#818991'}}
                  />
                </Block>

                {a.title === cards && (
                  <>
                    {/* <Block margin={[hp(1), 0]} flex={false}>
                      <Checkbox
                        disabled={false}
                        checkboxStyle={{height: 20, width: 20}}
                        label="My billing and shipping address are the same"
                        checked={billingCheckBox}
                        onChange={(newValue) =>
                          setBillingCheckBox(newValue.checked)
                        }
                        labelStyle={{fontSize: 12, color: '#818991'}}
                      />
                    </Block> */}
                    <Block flex={false} margin={[0, wp(8)]}>
                      <Text height={20} grey size={12}>
                        Michal Johns
                      </Text>
                      <Text height={20} grey size={12}>
                        Dhaka, sector 10, Road 11, Uttara
                      </Text>
                      <Text height={20} grey size={12}>
                        01000000000
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

          <Button onPress={() => proceedPayment()} color="secondary">
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
