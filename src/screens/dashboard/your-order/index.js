import React, {useState} from 'react';
import {Block, Button, ImageComponent, Text} from '../../../components';
import Header from '../../../common/header';
import {FlatList, ScrollView} from 'react-native';
import {t1, t2, w3, w4, w5} from '../../../components/theme/fontsize';
import StarRating from 'react-native-star-rating';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
const YourOrder = () => {
  const [toggle, setToggle] = useState();
  const nav = useNavigation();
  const _renderItem = ({item}) => {
    return (
      <Block white padding={[t2]} margin={[t1, w4]} shadow>
        <Block row flex={false} space={'between'}>
          <Block flex={false}>
            <StatusButton
              textStyle={item.status === 'cancelled' && {color: '#fff'}}
              color={item.status === 'completed' ? 'secondary' : 'accent'}>
              {item.status}
            </StatusButton>
            <Text height={22} size={12} body>
              Order{'  '}
              <Text size={12} semibold>
                #2198439{' '}
              </Text>
            </Text>
            <Text height={22} size={12} body>
              ${' '}
              <Text size={12} semibold>
                240.00
              </Text>
            </Text>
          </Block>
          <Block right flex={false}>
            <StarRating
              disabled={false}
              starSize={15}
              maxStars={5}
              fullStarColor={'#78A942'}
              rating={0}
              containerStyle={{width: wp(20), marginBottom: hp(0.5)}}
            />
            <Text height={22} body>
              2198439
            </Text>
            <Text height={22} body>
              03/11/2020
            </Text>
            <Text height={22} body>
              11:00AM-12:00PM
            </Text>
          </Block>
        </Block>
        {toggle === item.id && (
          <>
            <Block margin={[t2, 0]} flex={false}>
              <Text center semibold body>
                Delivery Address
              </Text>
              <Text margin={[t1, 0, 0, 0]} center semibold size={12}>
                Uttara, Sector-10, Road-11, House-18, Lift-2, Flat-2/A
              </Text>
              <Block
                borderColorDeafult
                borderWidth={[0, 0, 1, 0]}
                padding={[t1, 0, 0, 0]}
              />
              <Block margin={[t2, 0, 0, 0]} flex={false} row space={'between'}>
                <Text size={12} semibold>
                  2198439
                </Text>
                <Text size={12}>03/11/2020, 11:00 AM-12:00PM</Text>
              </Block>
            </Block>
            <Block center margin={[t1, 0]} row flex={false}>
              <ImageComponent name="product" height={60} width={60} />
              <Block margin={[0, w3]}>
                <Text size={12} semibold>
                  Country Natural Black Seed Paratha - 12 Pcs
                </Text>
                <Block margin={[t1, 0, 0, 0]} row space={'between'}>
                  <Text size={12}>(900gm)</Text>
                  <Text size={12}>Qty. 1</Text>
                  <Text size={12}>Tk. 240.00</Text>
                </Block>
              </Block>
            </Block>
          </>
        )}

        {toggle === item.id ? (
          <Button onPress={() => setToggle('')} color="secondary">
            Hide Details
          </Button>
        ) : (
          <Button onPress={() => setToggle(item.id)} color="secondary">
            View Details
          </Button>
        )}
      </Block>
    );
  };
  return (
    <Block>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text margin={[t2, 0]} center bold transform="uppercase">
          My Orders
        </Text>

        <FlatList
          data={[
            {
              status: 'completed',
              id: 1,
            },
            {
              status: 'cancelled',
              id: 2,
            },
          ]}
          renderItem={_renderItem}
        />
        <Block margin={[t1, w4]}>
          <Button onPress={() => nav.navigate('Dashboard')} color="secondary">
            Start Shopping
          </Button>
        </Block>
      </ScrollView>
    </Block>
  );
};
const StatusButton = styled(Button)({
  paddingVertical: hp(0.5),
  marginTop: 0,
  borderRadius: 0,
});
export default YourOrder;
