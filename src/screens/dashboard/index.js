import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Banner from '../../common/banner';
import Header from '../../common/header';
import {Block, Text} from '../../components';
import Search from '../../components/search';
import Footer from '../../common/footer';
import Cards from '../../common/cards';
import HeaderMenu from '../../common/headerMenu';
const Dashboard = () => {
  const [menu, setmenu] = useState('');
  const sortingMenu = (val) => {
    setmenu(val);
  };
  return (
    <Block>
      <Header />
      <Block flex={false} padding={[0, wp(3), 0, wp(3)]}>
        <Search />
      </Block>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderMenu onPress={sortingMenu} color={menu} />
        <Banner />
        <Block padding={[0, wp(1)]} flex={false}>
          <Text body semibold>
            Top offers this week
          </Text>
          <Cards />
        </Block>
        <Block padding={[hp(1), wp(1)]} flex={false}>
          <Text body semibold>
            Best Seller Products
          </Text>
          <Cards />
        </Block>
        <Block padding={[hp(1), wp(1)]} flex={false}>
          <Text body semibold>
            New Products
          </Text>
          <Cards />
        </Block>
        <Footer />
      </ScrollView>
    </Block>
  );
};
export default Dashboard;
