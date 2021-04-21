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
const HeaderCatgoryMenu = ({ color, onPress }) => {
  const category = useSelector(
    (state) => state.category.categoryList.data.children_data,
  );
  const _renderItem = ({ item }) => {
    //  alert(JSON.stringify(item.children_data[0].name))
    return (
      <Block
        //    center
        margin={[hp(1), wp(1)]}
        style={{ margin: 10, }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
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
            onPress={() => onPress(item)}
            left
            margin={[hp(0.5), 0, 0, 0]}
            style={{ color: 'black', fontSize: 15, }}
            height={16}
            transform="uppercase"
            size={10}>
            {item.name}
          </Text>
        </View>
        {
          item.children_data.map((element, index) => {
            return <TouchableOpacity onPress={() => onPress(element)} style={{ flex: 1, with: '100%', margin: 1, padding: 3, }}>
              <Text style={{ color: 'black', fontSize: 12, textAlign: 'left', left: 60 }}> {element.name} </Text>
            </TouchableOpacity>
          })
        }
        <View style={{ borderWidth: 1, borderColor: '#d3d3d3', marginTop: 2 }}></View>


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

export default HeaderCatgoryMenu;