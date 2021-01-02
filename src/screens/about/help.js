import React from 'react';
import {ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Footer from '../../common/footer';
import Header from '../../common/header';
import {Block, Button, Input, Text} from '../../components';

const Help = () => {
  return (
    <Block>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block
          white
          flex={false}
          padding={[hp(2), 0, hp(2), 0]}
          margin={[hp(2), wp(3), 0, wp(3)]}>
          <Text semibold center>
            Contact Us
          </Text>
          <Block flex={false} margin={[hp(2), wp(3), 0, wp(3)]}>
            <Input label="Name" />
            <Input label="Email Address" />
            <Input label="Phone Number" />
            <Input label="Message" />
            <Button color="secondary">Submit</Button>
          </Block>
        </Block>
        <Footer images={false} />
      </ScrollView>
    </Block>
  );
};
export default Help;
