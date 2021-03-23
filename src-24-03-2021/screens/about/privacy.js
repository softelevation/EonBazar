import React from 'react';
import {ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Footer from '../../common/footer';
import Header from '../../common/header';
import {Block, Text} from '../../components';

const Privacy = () => {
  return (
    <Block color="transparent">
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block color="##F6F5F1" flex={false} margin={[hp(2), wp(5), 0, wp(5)]}>
          <Text bold transform="uppercase" center>
            Privacy Policy
          </Text>
          <Text size={14} margin={[hp(3), 0, 0, 0]}>
            When you use our Website, we collect and store your personal
            information which is provided by you from time to time. Our primary
            goal in doing so is to provide you a safe, efficient, smooth and
            customized experience. This allows us to provide services and
            features that most likely meet your needs, and to customize our
            website to make your experience safer and easier. More importantly,
            while doing so, we collect personal information from you that we
            consider necessary for achieving this purpose.
          </Text>
          <Text size={14} margin={[hp(1), 0, 0, 0]}>
            Below are some of the ways in which we collect and store your
            information:
          </Text>
          <Text size={14} margin={[hp(1), 0, 0, 0]}>
            We receive and store any information you enter on our website or
            give us in any other way. We use the information that you provide
            for such purposes as responding to your requests, customizing future
            shopping for you, improving our stores, and communicating with you.
          </Text>
          <Text size={14} margin={[hp(1), 0, 0, 0]}>
            We also store certain types of information whenever you interact
            with us. For example, like many websites, we use "cookies," and we
            obtain certain types of information when your web browser accesses
            Eon Foods Ltd or advertisements and other content served by or on
            behalf of Eon Foods Ltd on other websites.
          </Text>
          <Text size={14} margin={[hp(1), 0, 0, 0]}>
            To help us make e-mails more useful and interesting, we often
            receive a confirmation when you open e-mail from Eon Foods Ltd if
            your computer supports such capabilities.
          </Text>
          <Text size={14} margin={[hp(1), 0, 0, 0]}>
            Information about our customers is an important part of our
            business, and we are not in the business of selling it to others.
          </Text>
          <Text size={14} margin={[hp(1), 0, 0, 0]}>
            We release account and other personal information when we believe
            release is appropriate to comply with the law; enforce or apply our
            Terms of Use and other agreements; or protect the rights, property,
            or safety of Eon Foods Ltd, our users, or others. This includes
            exchanging information with other companies and organizations for
            fraud protection.
          </Text>
        </Block>
        <Footer images={false} />
      </ScrollView>
    </Block>
  );
};
export default Privacy;
