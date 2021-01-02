import React from 'react';
import {FlatList, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import Header from '../../../common/header';
import {
  Block,
  Button,
  CustomButton,
  ImageComponent,
  Text,
} from '../../../components';
import {t1, t2, w2, w3, w4} from '../../../components/theme/fontsize';
import StarRating from 'react-native-star-rating';
import Footer from '../../../common/footer';
const Wishlist = () => {
  const _renderItem = () => {
    return (
      <Block row white padding={[t1, t1, 0, t1]} margin={[t1, 0]} flex={false}>
        <Block row padding={[t1, 0]}>
          <ImageComponent name="product" height="100" width="100" />
          <Block margin={[t1, w4]}>
            <Text color="#000000" size={10}>
              Country Natural Dressed Chicken-13 Cut (Without Skin) 1 kg
            </Text>
            <Text size={10} body margin={[t1, 0, 0, 0]} semibold>
              BDT 300.00
            </Text>
            <LineAboveText
              body
              size={10}
              color="grey"
              margin={[hp(0.2), 0, 0, 0]}>
              BDT 450.00
            </LineAboveText>
            <Block margin={[t1, 0]} flex={false}>
              <StarRating
                disabled={false}
                starSize={15}
                maxStars={5}
                fullStarColor={'#78A942'}
                rating={5}
                containerStyle={{width: wp(20)}}
              />
            </Block>
          </Block>
          <Block flex={false}>
            <CustomButton
              flex={false}
              style={{height: 20, width: 20}}
              center
              middle
              secondary>
              <ImageComponent
                name="close_icon"
                height="15"
                width="15"
                color="#fff"
              />
            </CustomButton>
            <Block alignSelf="center" middle margin={[-hp(2), 0, 0, 0]}>
              <ImageComponent
                name="right_arrow_icon"
                height="10"
                width="10"
                color="#707070"
              />
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };
  return (
    <Block>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block row middle center margin={[t2, 0]}>
          <Block
            flex={false}
            borderWidth={1}
            center
            middle
            borderRadius={20}
            margin={[0, w2]}
            borderColor="#78A942"
            padding={[hp(0.6)]}>
            <ImageComponent
              name="wishlist_icon"
              height="15"
              width="15"
              color="#78A942"
            />
          </Block>
          <Text bold transform="uppercase">
            Wish list
          </Text>
        </Block>
        <Block margin={[t1, w3]}>
          <FlatList data={['1', '2']} renderItem={_renderItem} />
          <Button style={{marginTop: t2}} color="secondary">
            Start Shopping
          </Button>
        </Block>
        <Footer images={false} />
      </ScrollView>
    </Block>
  );
};
const LineAboveText = styled(Text)({
  textDecorationLine: 'line-through',
  textDecorationStyle: 'solid',
});
export default Wishlist;
