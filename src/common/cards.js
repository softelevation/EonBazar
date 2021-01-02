import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {Block, Text, ImageComponent, CustomButton} from '../components';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const Cards = () => {
  const nav = useNavigation();
  const renderItem = ({item}) => {
    return (
      <CustomButton
        activeOpacity={1}
        onPress={() => nav.navigate('Details')}
        style={{width: wp(45)}}
        padding={[hp(2)]}
        margin={[hp(0.5), wp(1.8)]}
        primary
        flex={false}>
        <Icon name="ios-heart-outline" size={15} />
        <Icon name="ios-shuffle" size={15} />
        <Block margin={[hp(1), 0, 0, 0]} center flex={false}>
          <ImageComponent name="product" />
          <Text size={12} center margin={[hp(2), 0, 0, 0]} body>
            Country Natural Dressed Chicken{' '}
          </Text>
          <Text size={12} body margin={[hp(1), 0, 0, 0]} semibold>
            BDT 300.00
          </Text>
          <LineAboveText
            body
            size={12}
            color="grey"
            margin={[hp(0.2), 0, 0, 0]}>
            BDT 450.00
          </LineAboveText>
        </Block>
        <Block
          margin={[hp(1), 0, 0, 0]}
          center
          row
          space={'between'}
          flex={false}>
          <Block
            style={{width: wp(18)}}
            center
            row
            space={'between'}
            borderWidth={1}
            borderRadius={10}
            padding={[hp(0.5)]}
            borderColorDeafult
            flex={false}>
            <Icon name="ios-remove-outline" size={15} />
            <Text size={12}>1</Text>
            <Icon name="add" size={15} />
          </Block>
          <Block
            secondary
            padding={[hp(1)]}
            borderRadius={20}
            center
            middle
            flex={false}>
            <MaterialIcon name="shopping-bag" size={20} color="#fff" />
          </Block>
        </Block>
      </CustomButton>
    );
  };
  return (
    <FlatList
      contentContainerStyle={flatlistContentStyle}
      data={['1', '2', '3', '4']}
      renderItem={renderItem}
    />
  );
};
const LineAboveText = styled(Text)({
  textDecorationLine: 'line-through',
  textDecorationStyle: 'solid',
});
const flatlistContentStyle = {
  flexWrap: 'wrap',
  flexDirection: 'row',
  paddingTop: hp(2),
};
export default Cards;
