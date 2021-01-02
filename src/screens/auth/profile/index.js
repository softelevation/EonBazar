import React from 'react';
import {ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../common/header';
import {Block, Button, CustomButton, Input, Text} from '../../../components';
import {t3, w1} from '../../../components/theme/fontsize';
import Footer from '../../../common/footer';
import {useNavigation} from '@react-navigation/native';
const Profile = () => {
  const nav = useNavigation();
  return (
    <Block>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text margin={[hp(1), 0]} semibold transform="uppercase" center>
          Your Profile
        </Text>
        <Block white padding={[t3]}>
          <Input label="Name" />
          <Block row center flex={false}>
            <Input style={{width: wp(70)}} label="Email Address" />
            <CustomButton
              secondary
              padding={[hp(1.1)]}
              margin={[hp(2.5), 0, 0, 0]}>
              <Text white semibold size={14}>
                VERIFY
              </Text>
            </CustomButton>
          </Block>
          <Input label="Phone Number" />
          <Block row flex={false}>
            <Text secondary size={16}>
              Edit
            </Text>
            <Text secondary size={16} margin={[0, w1]}>
              Change Password
            </Text>
          </Block>
        </Block>
        <Block padding={[0, wp(8)]}>
          <Button color="secondary">Address Book</Button>
          <Button color="primary">New Address</Button>
          <Block
            margin={[hp(2), 0]}
            row
            space={'between'}
            white
            padding={[hp(1.5)]}>
            <Text grey size={14} style={{width: wp(70)}} numberOfLines={1}>
              Sector-10, Road-11, House-18, Lift
            </Text>
            <Text secondary size={14}>
              Edit
            </Text>
          </Block>
          <Button onPress={() => nav.navigate('Dashboard')} color="secondary">
            Start Shopping
          </Button>
        </Block>
        <Footer images={false} />
      </ScrollView>
    </Block>
  );
};
export default Profile;
