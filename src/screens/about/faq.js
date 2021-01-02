import React from 'react';
import {FlatList} from 'react-native';
import Header from '../../common/header';
import {Block, Text} from '../../components';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {t2, w1, w3} from '../../components/theme/fontsize';
const Faq = () => {
  const data = [
    {
      qus: 'Q. How does the site work?',
      ans:
        'You can browse the site or use our search engine to find your desired products. You can then add them to your shopping bag and click on place order. You let us know your address, select a delivery time – and voila, you are done. A eonbazar.com representative will then deliver your order right to your home or office.',
    },
    {
      qus: 'Q. How much do deliveries cost?',
      ans:
        'You can always call +8801755665353 or email us at info@eonfoods.net',
    },
    {
      qus: 'Q. How can I contact you?',
      ans:
        'There is a BDT 45 delivery fee if the order value is BDT 500 or less. If the order value is more than BDT 500, delivery charge will be free.',
    },
    {
      qus: 'Q. How long do the deliveries take?',
      ans:
        'We are delivering in Dhaka metro city only. Delivery timeline is within 48 hours',
    },
    {
      qus: 'Q. What are your delivery hours?',
      ans: 'We deliver from 9 am to 10 pm every day.',
    },
    {
      qus: 'Q. How do I know when my order is here?',
      ans:
        'Eon Foods representative will call you as soon as they are at your house to let you know about your delivery.',
    },
    {
      qus: 'Q. How long do the deliveries take?',
      ans:
        'We are delivering in Dhaka metro city only. Delivery time is within 48 hours',
    },
    {
      qus: 'Q. What are your delivery hours',
      ans: 'We deliver from 9 am to 10 pm every day',
    },
    {
      qus: 'Q. How do I know when my order is here',
      ans:
        'EON Food representive will call you as soon as they are at your house to let you know about your delievery',
    },
  ];
  const _renderItem = ({item}) => {
    return (
      <Block>
        <Text size={16} bold margin={[t2, 0]}>
          {item.qus}
        </Text>
        <Text size={13}>{item.ans}</Text>
      </Block>
    );
  };
  return (
    <Block color="transparent">
      <Header />
      <Block flex={false} margin={[t2, w3]} padding={[0, 0, hp(4), 0]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={_renderItem}
        />
      </Block>
    </Block>
  );
};
export default Faq;
