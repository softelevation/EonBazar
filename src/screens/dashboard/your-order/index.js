/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Block, Button, Text} from '../../../components';
import Header from '../../../common/header';
import {FlatList, ScrollView} from 'react-native';
import {t1, t2, w4} from '../../../components/theme/fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {myOrderRequest} from '../../../redux/action';
import ActivityLoader from '../../../components/activityLoader';
import moment from 'moment';
import EmptyFile from '../../../components/emptyFile';
import Icon from 'react-native-vector-icons/AntDesign';

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

  const setIconUpDownFun = (value) => {
    setIconUpDown(value);
  };

  const renderTopWithBorder = (title, subtitle) => {
    return (
      <Block
        borderColorDeafult
        borderWidth={1}
        center
        row
        space="between"
        flex={false}>
        <Block
          flex={false}
          padding={[hp(1), 0]}
          borderWidth={[0, 1, 0, 0]}
          style={{width: wp(42)}}>
          <Text semibold margin={[0, wp(2)]} size={12}>
            {title}
          </Text>
        </Block>
        <Block
          padding={[hp(1), 0]}
          center
          middle
          style={{width: wp(41)}}
          flex={false}>
          <Text uppercase size={12}>
            {subtitle}
          </Text>
        </Block>
      </Block>
    );
  };
  const renderThreeRow = (title, qty, price, bold = false) => {
    return (
      <Block
        borderColorDeafult
        borderWidth={1}
        center
        row
        space="between"
        flex={false}>
        <Block
          flex={false}
          padding={[hp(1), 0]}
          borderWidth={[0, 1, 0, 0]}
          style={{width: wp(40)}}>
          <Text numberOfLines={1} bold={bold} margin={[0, wp(2)]} size={12}>
            {title}
          </Text>
        </Block>
        <Block
          padding={[hp(1), 0]}
          borderWidth={[0, 1, 0, 0]}
          style={{width: wp(20)}}
          flex={false}>
          <Text bold={bold} center uppercase size={12}>
            {qty}
          </Text>
        </Block>
        <Block
          padding={[hp(1), 0]}
          center
          middle
          style={{width: wp(20)}}
          flex={false}>
          <Text bold={bold} uppercase size={12}>
            {price}
          </Text>
        </Block>
      </Block>
    );
  };

  const _renderItem = ({item}) => {
    console.log(item, 'item');
    const {extension_attributes, billing_address} = item;
    const {
      shipping_assignments,
      payment_additional_info,
    } = extension_attributes;
    const {shipping} = shipping_assignments[0];
    const {address} = shipping;
    return (
      <Block white padding={[t2]} margin={[t1, w4]} shadow>
        <Block flex={false} space={'between'}>
          <Block flex={false}>
            <Block
              borderColorDeafult
              borderWidth={1}
              center
              row
              space="between"
              flex={false}>
              <Block
                flex={false}
                padding={[hp(1), 0]}
                borderWidth={[0, 1, 0, 0]}
                style={{width: wp(42)}}>
                <Text margin={[0, wp(2)]} size={16}>
                  Order Status :
                </Text>
              </Block>
              <Block
                padding={[hp(1), 0]}
                center
                middle
                color={item.status === 'completed' ? '#78A942' : '#FF0000'}
                style={{width: wp(41)}}
                flex={false}>
                <Text capitalize white size={16}>
                  {item.status}
                </Text>
              </Block>
            </Block>
            <Block flex={false} margin={[hp(2), 0, 0]}>
              {renderTopWithBorder('Order ID', `#${item.entity_id}`)}

              {renderTopWithBorder(
                'Order Date',
                `${formatDate(item.created_at)}, ${formatTime(
                  item.created_at,
                )}`,
              )}
              {renderTopWithBorder(
                'Subtotal',
                `${item.store_currency_code} ${item.subtotal}`,
              )}
              {renderTopWithBorder(
                'Discount',
                `${item.store_currency_code} ${item.discount_amount}`,
              )}
              {renderTopWithBorder(
                'Shipping & Handling',
                `${item.store_currency_code} ${item.shipping_tax_amount}`,
              )}
              {renderTopWithBorder(
                'Grand Total',
                `${item.store_currency_code} ${item.grand_total}`,
              )}
            </Block>
          </Block>
        </Block>
        {toggle === item.entity_id && (
          <>
            <Block margin={[hp(2), 0]} flex={false}>
              {renderThreeRow('Product Name', 'Qty', 'Price', true)}
              <FlatList
                data={item.items}
                renderItem={({item}) => {
                  const qty = `${item.qty_ordered} QTY`;
                  return (
                    <>
                      {renderThreeRow(
                        item.sku,
                        qty,
                        `${currency} ${item.row_total_incl_tax}`,
                      )}
                    </>
                  );
                }}
              />
            </Block>
            <Block flex={false} margin={[hp(1), 0, hp(1)]}>
              <Text bold size={18}>
                Shipping Address
              </Text>
              <Block flex={false} margin={[hp(0.5), 0]}>
                <Text margin={[hp(0.5), 0, 0]} size={16}>
                  {address.firstname} {address.lastname}
                </Text>
                <Text margin={[hp(0.5), 0, 0]} size={16}>
                  {address.street[0]} {address.street[1]}
                </Text>
                <Text margin={[hp(0.5), 0, 0]} size={16}>
                  {address.city} {address.postcode}
                </Text>
                <Text margin={[hp(0.5), 0, 0]} size={16}>
                  {address.country_id === 'BD' ? 'Bangladesh' : ''}
                </Text>
                <Text margin={[hp(0.5), 0, 0]} size={16}>
                  {address.telephone}
                </Text>
              </Block>
            </Block>
            <Block flex={false} margin={[hp(1), 0, hp(1)]}>
              <Text bold size={18}>
                Billing Address
              </Text>
              <Block flex={false} margin={[hp(0.5), 0]}>
                <Text margin={[hp(0.5), 0, 0]} size={16}>
                  {billing_address.firstname} {billing_address.lastname}
                </Text>
                <Text margin={[hp(0.5), 0, 0]} size={16}>
                  {billing_address.street[0]} {billing_address.street[1]}
                </Text>
                <Text margin={[hp(0.5), 0, 0]} size={16}>
                  {billing_address.city} {billing_address.postcode}
                </Text>
                <Text margin={[hp(0.5), 0, 0]} size={16}>
                  {billing_address.country_id === 'BD' ? 'Bangladesh' : ''}
                </Text>
                <Text margin={[hp(0.5), 0, 0]} size={16}>
                  {billing_address.telephone}
                </Text>
              </Block>
            </Block>
            <Block flex={false} margin={[hp(1), 0, hp(1)]}>
              <Text bold size={18}>
                Shipping Method
              </Text>
              <Block flex={false} margin={[hp(0.5), 0]}>
                <Text margin={[hp(0.5), 0, 0]} size={16}>
                  {item.shipping_description}
                </Text>
              </Block>
            </Block>
            <Block flex={false} margin={[hp(1), 0, hp(1)]}>
              <Text bold size={18}>
                Payment Method
              </Text>
              <Block flex={false} margin={[hp(0.5), 0]}>
                <Text margin={[hp(0.5), 0, 0]} size={16}>
                  {payment_additional_info[0].value}
                </Text>
              </Block>
            </Block>
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
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Block
          padding={[0, wp(3)]}
          space="between"
          flex={false}
          row
          center
          middle>
          <Text
            margin={[t2, 0]}
            style={{width: wp(10)}}
            center
            bold
            transform="uppercase"
          />
          <Text margin={[t2, 0]} center bold transform="uppercase">
            My Orders
          </Text>

          {upDownIcon ? (
            <Icon
              onPress={() => setIconUpDownFun(!upDownIcon)}
              name="arrowdown"
              size={30}
            />
          ) : (
            <Icon
              onPress={() => setIconUpDownFun(!upDownIcon)}
              name="arrowup"
              size={30}
            />
          )}
        </Block>

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
export default YourOrder;
