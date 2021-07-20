import React from 'react';
import {FlatList, ScrollView} from 'react-native';
import {Block, Button, Input, Text, ImageComponent} from '../../../components';
import {t1, t2, w1, w2, w3, w5} from '../../../components/theme/fontsize';
import Header from '../../../common/header';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Checkbox from '../../../components/checkbox';
import {light} from '../../../components/theme/colors';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Footer from '../../../common/footer';
const PlaceAnOrder = () => {
  const nav = useNavigation();
  const CardsTabs = () => {
    return (
      <FlatList
        horizontal
        data={['Cards', 'Mobile Banking', 'Net Banking']}
        contentContainerStyle={{marginHorizontal: w5}}
        renderItem={({item}) => {
          return (
            <Block
              padding={[t1]}
              center
              style={{width: wp(30)}}
              // color="#8C8C8C"
              color={item === 'Cards' ? '#8C8C8C' : '#ACACA3'}
              flex={false}>
              <Text size={14}>{item}</Text>
            </Block>
          );
        }}
      />
    );
  };
  return (
    <Block>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block padding={[t2, w2]} margin={[t2, w5, 0, w5]} white flex={false}>
          <Block
            center
            margin={[0, 0, t2, 0]}
            row
            space={'between'}
            flex={false}>
            <Text style={{width: wp(7)}} />
            <CenterIcon
              activeOpacity={1}
              flex={false}
              shadow
              white
              center
              middle
              borderRadius={60}>
              <Text secondary semibold size={12}>
                Eonbazar
              </Text>
            </CenterIcon>
            <Icon name="close" size={30} onPress={() => nav.goBack()} />
          </Block>
          <Text height={30} center>
            EonBazar
          </Text>
          <Block flex={false} center>
            <FlatList
              horizontal
              data={['Support', 'FAQ', 'Offers', 'Login']}
              contentContainerStyle={{marginTop: t1, alignItems: 'center'}}
              renderItem={({item}) => {
                return (
                  <Block center flex={false} margin={[0, w2, 0, w2]}>
                    <Block
                      center
                      middle
                      borderRadius={40}
                      color="#ECEDF1"
                      style={{height: 40, width: 40}}
                      flex={false}>
                      <ImageComponent
                        name={`${item}_icon`}
                        height={20}
                        width={20}
                      />
                    </Block>
                    <Text height={24} size={14}>
                      {item}
                    </Text>
                  </Block>
                );
              }}
            />
          </Block>
        </Block>
        {CardsTabs()}
        <Block primary padding={[t2]} margin={[0, w5]}>
          <TextArea
            placeholderTextColor={light.subtitleColor}
            placeholder="Enter Card Number"
          />
          <Block row space={'between'} flex={false}>
            <TextArea
              placeholderTextColor={light.subtitleColor}
              style={{width: wp(39)}}
              placeholder="MM/YY"
            />
            <TextArea
              placeholderTextColor={light.subtitleColor}
              style={{width: wp(39)}}
              placeholder="CVC/CVV"
            />
          </Block>
          <TextArea
            placeholderTextColor={light.subtitleColor}
            placeholder="Cardholder Name"
          />
          <Block
            color="#F1F1F1"
            padding={[hp(0.7)]}
            flex={false}
            borderColorDeafult
            borderWidth={0.3}>
            <Checkbox
              checkboxStyle={{height: 20, width: 20}}
              labelStyle={{color: light.subtitleColor, fontSize: 12}}
              containerStyle={{marginTop: hp(0.3)}}
              label="Save card and remember me"
            />
            <Block
              padding={[hp(0.5), 0, hp(0.5), 0]}
              flex={false}
              borderColorDeafult
              borderWidth={[0, 0, 1, 0]}
            />
            <Text grey size={12} height={17} margin={[t1, w1, 0, w1]}>
              By checking this box you agree to the{' '}
              <Text size={12} link>
                Terms of Service
              </Text>
            </Text>
          </Block>
        </Block>
        <Block flex={false} margin={[0, w5]}>
          <Button disabled color="secondary">
            PAY 710.00 BDT
          </Button>
        </Block>
        <Footer images={false} />
      </ScrollView>
    </Block>
  );
};
const CenterIcon = styled(Block)({
  height: 70,
  width: 70,
});
const TextArea = styled(Input)({
  paddingVertical: hp(1.5),
});
export default PlaceAnOrder;
