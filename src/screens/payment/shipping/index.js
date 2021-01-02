import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Footer from '../../../common/footer';
import Header from '../../../common/header';
import {Block, Button, Input, Text} from '../../../components';
import Checkbox from '../../../components/checkbox';
import {t1, t2, t4, w3, w5} from '../../../components/theme/fontsize';

const Shipping = () => {
  const nav = useNavigation();
  return (
    <Block>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block margin={[t2, w5]}>
          <Text size={24} height={40} bold>
            Estimated Total
          </Text>
          <Text bold>BDT 240.00</Text>
        </Block>

        <Block white padding={[t2]} margin={[t1, w3]}>
          <Text margin={[t2, 0]} bold transform="uppercase">
            Shipping Address
          </Text>
          <Input label="First Name" />
          <Input label="Last Name" />
          <Input label="Company" />
          <Input label="Street Address" />
          <Input />
          <Input label="City" />
          <Input label="Zip / Postal Code" />
          <Input label="Country" />
          <Input label="Phone Number" />
          <Text size={12}>Please add number without country code</Text>
          <Block margin={[t4, 0, 0, 0]}>
            <Text transform="uppercase" bold>
              Shipping Charge
            </Text>
            <Block margin={[t2, 0, 0, 0]} row space={'between'} center>
              <Checkbox
                checkboxStyle={{height: 20, width: 20}}
                labelStyle={{marginLeft: w3}}
                label="BDT 0.00"
              />
              <Text size={12}>Fixed</Text>
              <Text size={12}>Home Delievery</Text>
            </Block>

            <Block margin={[t2, 0]} row space={'between'} center>
              <Checkbox
                checkboxStyle={{height: 20, width: 20}}
                labelStyle={{marginLeft: w3}}
                label="BDT 0.00"
              />
              <Text size={12}>Fixed</Text>
              <Text size={12}>Home Delievery</Text>
            </Block>
            <Button
              onPress={() => nav.navigate('PaymentMethod')}
              style={{width: widthPercentageToDP(50), alignSelf: 'center'}}
              color="secondary">
              Next
            </Button>
          </Block>
        </Block>
        <Footer images={false} />
      </ScrollView>
    </Block>
  );
};

export default Shipping;
