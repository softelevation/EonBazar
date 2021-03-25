import React from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { images } from '../assets';
import { Block, CustomButton, ImageComponent, Text } from '../components';
import { light } from '../components/theme/colors';
import { t1, w3 } from '../components/theme/fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
const HeaderMenu = ({ color, onPress }) => {
  const category = useSelector(
    (state) => state.category.categoryList.data.children_data,
  );
  const _renderItem = ({ item }) => {
    //  alert(JSON.stringify(item.children_data[0].name))
    return (
      <Block
        center
        margin={[hp(1), wp(1)]}
      //style={{width: '100%'}}
      >
        <CustomButton
          color={color === item.id ? light.warning : light.secondary}
          flex={false}
          borderRadius={60}
          onPress={() => onPress(item)}
          center
          middle
          margin={[0, w3]}
          style={{ height: 40, width: 40 }}>
          {item.image ? (
            <ImageComponent
              isURL
              name={`http://stage.eonbazar.com/${item.image}`}
              height="30"
              width="30"
            />
          ) : (
            <Icon name="bookmark-outline" size={22} color="#fff" />
          )}
        </CustomButton>

        <Text
          center
          margin={[hp(0.5), 0, 0, 0]}
          style={{ marinLeft: 50 }}
          height={16}
          transform="uppercase"
          size={10}>
          {item.name}
        </Text>
        {
          item.children_data.map((element, index) => {
            return <TouchableOpacity onPress={() => onPress(element)} style={{ flex: 1, borderRadius: 20, height: 80, marginTop: 10, borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5, height: 50, width: 300, backgroundColor: 'gray' }}>
              <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', top: 10 }}> {element.name} </Text>
            </TouchableOpacity>
          })
        }

      </Block>
    );
  };
  
  return (
    <Block white margin={[0, w3]} padding={[hp(0.5), 0]} flex={false}>
     
      <FlatList
        contentContainerStyle={flatlistStyle}
        data={category}
        // horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={_renderItem}
      />
    </Block>
  );
};
const flatlistStyle = {
  //  flexDirection: 'row',
};

export default HeaderMenu;
