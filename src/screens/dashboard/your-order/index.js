import React, { useEffect, useState } from 'react';
import { Block, Button, ImageComponent, Text } from '../../../components';
import Header from '../../../common/header';
import { FlatList, ScrollView, View } from 'react-native';
import { t1, t2, w3, w4, w5 } from '../../../components/theme/fontsize';
import StarRating from 'react-native-star-rating';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { myOrderRequest } from '../../../redux/action';
import ActivityLoader from '../../../components/activityLoader';
import moment from 'moment';
import EmptyFile from '../../../components/emptyFile';
import * as Navigation from '../../../routes/NavigationService';
import Icon from 'react-native-vector-icons/AntDesign';
import { set } from 'react-native-reanimated';


const YourOrder = () => {
  const [toggle, setToggle] = useState();
  const nav = useNavigation();
  const dispatch = useDispatch();
  const isload = useSelector((state) => state.order.list.loading);
  const orderData = useSelector((state) => state.order.list.data);
  const currency = useSelector(
    (v) => v.currency.currencyDetail.data.base_currency_code,
  );


  const [upDownIcon, setIconUpDown] = useState(false);


  useEffect(() => {
    dispatch(myOrderRequest());
  }, []);

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  };
  const formatTime = (date) => {
    return moment(date).format('hh:mm a');
  };


  const setIconUpDownFun =(value)=> {
      setIconUpDown(value)
  }

  const _renderItem = ({ item }) => {
    return (
      <Block white padding={[t2]} margin={[t1, w4]} shadow>
        <Block row flex={false} space={'between'}>
          <Block flex={false}>
            <StatusButton
              textStyle={{ color: '#fff' }}
              color={item.status === 'completed' ? 'secondary' : 'accent'}>
              {item.status}
            </StatusButton>
            <Text height={22} size={12} body>
              Order{'  '}
              <Text size={14} bold>
                #{item.entity_id}
              </Text>
            </Text>
            <Text height={22} size={12} bold body>
              {item.base_currency_code}{' '}
              <Text size={14} bold>
                {item.base_grand_total}
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
              containerStyle={{ width: wp(20), marginBottom: hp(0.5) }}
            />
            <Text height={22} body bold>
              {item.entity_id}
            </Text>
            <Text height={22} body>
              {formatDate(item.created_at)}
            </Text>
            <Text height={22} body>
              {formatTime(item.created_at)}
            </Text>
          </Block>
        </Block>
        {toggle === item.entity_id && (
          <>
            <Block margin={[t2, 0]} flex={false}>
              <Text center semibold body>
                Delivery Address
              </Text>
              <Text margin={[t1, 0, 0, 0]} center semibold size={12}>
                {item.billing_address.city},{' '}
                {item.billing_address.street && item.billing_address.street[0]}
              </Text>
              <Block
                borderColorDeafult
                borderWidth={[0, 0, 1, 0]}
                padding={[t1, 0, 0, 0]}
              />
              <Block margin={[t2, 0, 0, 0]} flex={false} row space={'between'}>
                <Text size={14} bold>
                  #{item.entity_id}
                </Text>
                <Text size={12}>
                  {formatDate(item.created_at)}, {formatTime(item.created_at)}
                </Text>
              </Block>
            </Block>
            <FlatList
              data={item.items}
              renderItem={({ item }) => {
                return (
                  <Block center margin={[t1, 0]} row flex={false}>
                    {/* <ImageComponent name="product" height={60} width={60} /> */}
                    <Block margin={[0, w3]}>
                      <Text size={12} semibold>
                        {item.sku}
                      </Text>
                      <Block margin={[t1, 0, 0, 0]} row space={'between'}>
                        {item.weight ? (
                          <Text regular size={12}>{`(${item.weight}kg)`}</Text>
                        ) : (
                          <Text regular style={{ width: wp(8) }} size={12} />
                        )}
                        <Text regular size={12}>
                          Qty. {item.qty_ordered}
                        </Text>
                        <Text regular size={12}>
                          {currency} {item.row_total_incl_tax}
                        </Text>
                      </Block>
                    </Block>
                  </Block>
                );
              }}
            />
          </>
        )}

        {toggle === item.entity_id ? (
          <Button onPress={() => setToggle('')} color="secondary">
            Hide Details
          </Button>
        ) : (
          <Button onPress={() => setToggle(item.entity_id)} color="secondary">
            View Details
          </Button>
        )}
      </Block>
    );
  };
  return (
    <Block primary>
      <Header />
      {isload && <ActivityLoader />}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ flex: 1 }} margin={[t2, 0]} center bold transform="uppercase">
            My Orders
        </Text>

        {upDownIcon ? <Icon onPress={() => setIconUpDownFun(!upDownIcon)} name="arrowdown" style={{ marginRight: 10 }} size={30} />
        : 
        <Icon onPress={() => setIconUpDownFun(!upDownIcon)} name="arrowup" style={{ marginRight: 10 }} size={30} />}
        </View>

        <FlatList
          data={orderData.items}
          ListEmptyComponent={<EmptyFile />}
          renderItem={_renderItem}
          inverted={upDownIcon}
        />
      </ScrollView>
      <Block flex={false} margin={[t1, w4]}>
        <Button onPress={() => nav.navigate('Dashboard')} color="secondary">
          Start Shopping
        </Button>
      </Block>
    </Block>
  );
};
const StatusButton = styled(Button)({
  paddingVertical: hp(0.5),
  marginTop: 0,
  borderRadius: 0,
});
export default YourOrder;
