import React from 'react';
import {FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Block, Text, ImageComponent} from '../components';
import Icon from 'react-native-vector-icons/Ionicons';
import {footerContent} from '../utils/static-data';
import PropTypes from 'prop-types';
import {w1} from '../components/theme/fontsize';
const Footer = ({images, footer, cards}) => {
  const renderItem = ({item, index}) => {
    return (
      <Block
        margin={[hp(0.5), w1]}
        style={{width: wp(48)}}
        primary
        center
        padding={[hp(2)]}
        flex={false}>
        <Block
          style={{width: 50, height: 50}}
          borderRadius={30}
          center
          middle
          flex={false}
          color="#F1F3F2">
          <Icon name={item.icon} size={20} />
        </Block>
        <Text margin={[hp(1), 0, 0, 0]} size={13}>
          {item.name}
        </Text>
        <Text height={20} size={13}>
          {item.subtitle}
        </Text>
      </Block>
    );
  };
  return (
    <Block padding={[0, 0, hp(4), 0]} flex={false}>
      {images && (
        <>
          <Block center margin={[hp(2), 0]} flex={false}>
            <ImageComponent name="cnatural" width={380} height={80} />
          </Block>
          <Block
            center
            margin={[hp(1), wp(3)]}
            flex={false}
            row
            space={'between'}>
            <ImageComponent name="bqarah1" width={130} height={70} />
            <ImageComponent name="bqarah2" width={100} height={70} />
            <ImageComponent name="bqarah" width={120} height={70} />
          </Block>
        </>
      )}
      {footer && (
        <FlatList
          data={footerContent}
          contentContainerStyle={flatlistContentStyle}
          numColumns={2}
          renderItem={renderItem}
        />
      )}
      {cards && (
        <Block center padding={[hp(1), 0]}>
          <Text margin={[0, 0, hp(1), 0]} center size={12}>
            © 2020 eonbazar.com
          </Text>
          <ImageComponent name="footerPayment" width={300} height={30} />
        </Block>
      )}
    </Block>
  );
};
const flatlistContentStyle = {
  paddingTop: hp(2),
  justifyContent: 'center',
};
Footer.propTypes = {
  footer: PropTypes.bool,
  cards: PropTypes.bool,
  images: PropTypes.bool,
};
Footer.defaultProps = {
  footer: true,
  cards: true,
  images: true,
};

export default Footer;
