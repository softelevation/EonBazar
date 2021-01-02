import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Block, CustomButton, ImageComponent, Text} from '../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatList} from 'react-native';
import {DrawerData} from '../utils/static-data';
import {useNavigation} from '@react-navigation/native';
const DrawerScreen = () => {
  const nav = useNavigation();

  const renderHeight = (type) => {
    switch (type) {
      case 'your_order_drawer_icon':
        return 22;
      case 'wishlist_icon':
        return 18;
      default:
        return 20;
    }
  };
  const renderWidth = (type) => {
    switch (type) {
      case 'your_order_drawer_icon':
        return 16.5;
      case 'wishlist_icon':
        return 22;
      default:
        return 20;
    }
  };

  const _renderItem = ({item}) => {
    return (
      <CustomButton
        onPress={() => nav.navigate(item.nav)}
        row
        center
        flex={false}
        color="transparent"
        padding={[hp(1.5), wp(5), hp(1.5), wp(5)]}>
        <ImageComponent
          name={item.icon}
          height={renderHeight(item.icon)}
          width={renderWidth(item.icon)}
        />
        <Text size={16} semibold margin={[0, wp(8), 0, wp(5)]}>
          {item.name}
        </Text>
      </CustomButton>
    );
  };
  return (
    <Block>
      <Block
        row
        center
        flex={false}
        color="#373131"
        padding={[hp(2), 0, hp(2), wp(5)]}>
        <AntDesign name="user" size={20} color="#fff" />
        <Text semibold margin={[0, wp(8), 0, wp(5)]} white>
          Michal John
        </Text>
      </Block>
      <FlatList data={DrawerData} renderItem={_renderItem} />
    </Block>
  );
};

export default DrawerScreen;
