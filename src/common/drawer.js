import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Block, CustomButton, ImageComponent, Text } from '../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Alert, FlatList } from 'react-native';
import { DrawerData, DrawerGusetUserData } from '../utils/static-data';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, profileFlush } from '../redux/action';
import { strictValidObjectWithKeys } from '../utils/commonUtils';
const DrawerScreen = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile.user);
  // alert(JSON.stringify(user))
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

  const showAlert = async () => {
    Alert.alert(
      '',
      'Are you sure you want to logout?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => logoutFun() },
      ],
      { cancelable: false },
    );
  };

  const logoutFun = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      nav.dispatch(DrawerActions.closeDrawer());
      dispatch(loginSuccess(''));
      dispatch(profileFlush());
      // setTimeout(() => { alert('Logout Successfully...') }, 2000)
      nav.reset({
        routes: [{ name: 'Login' }],
      });
    } catch (error) { }
  };

  const navigateHelpers = async (val) => {
    if (val === 'Logout') {
      showAlert();

      // try {
      //   const keys = await AsyncStorage.getAllKeys();
      //   await AsyncStorage.multiRemove(keys);
      //   nav.dispatch(DrawerActions.closeDrawer());
      //   dispatch(loginSuccess(''));
      //   dispatch(profileFlush());
      //   setTimeout(() => { alert('Logout Successfully...') }, 2000)
      //   nav.reset({
      //     routes: [{ name: 'Login' }],
      //   });
      // } catch (error) { }
    }
    else if (val === 'Profile') {

      if (strictValidObjectWithKeys(user)) {
        nav.dispatch(DrawerActions.closeDrawer());
        nav.reset({
          routes: [{ name: 'Profile' }],
        });

      } else {
        nav.dispatch(DrawerActions.closeDrawer());
        nav.reset({
          routes: [{ name: 'Login' }],
        });
      }
    }


    // else if (val === 'Profile' || val === 'YourOrder' || val === 'Wishlist') {
    else if (val === 'YourOrder' || val === 'Wishlist') {   
      if (strictValidObjectWithKeys(user)) {
        nav.navigate(val);
      } else {
        nav.dispatch(DrawerActions.closeDrawer());
        nav.reset({
          routes: [{ name: 'Login' }],
        });
      }
    }
    else if (val === 'Category'){
      nav.dispatch(DrawerActions.closeDrawer());
      nav.reset({
        routes: [{ name: 'Category' }],
      });
    }
    else {
      nav.navigate(val);
    }
  };
  const _renderLogout = (name, icon, navigation) => {
    return (
      <CustomButton
        onPress={() => navigateHelpers(navigation)}
        row
        center
        flex={false}
        color="transparent"
        padding={[hp(1.5), wp(5), hp(1.5), wp(5)]}>
        <ImageComponent
          name={icon}
          height={renderHeight(icon)}
          width={renderWidth(icon)}
        />
        <Text size={16} semibold margin={[0, wp(8), 0, wp(5)]}>
          {name}
        </Text>
      </CustomButton>
    );
  };

  const _renderItem = ({ item }) => {
    return (
      <CustomButton
        onPress={() => navigateHelpers(item.nav)}
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
          {strictValidObjectWithKeys(user)
            ? user.firstname + ' ' + user.lastname
            : 'Guest User'}
        </Text>
      </Block>
      {strictValidObjectWithKeys(user) ? (
        <FlatList data={DrawerData} renderItem={_renderItem} />
      ) : (
        <FlatList data={DrawerGusetUserData} renderItem={_renderItem} />
      )}
    </Block>
  );
};

export default DrawerScreen;
