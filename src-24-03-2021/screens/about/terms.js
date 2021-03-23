import React from 'react';
import {ScrollView} from 'react-native';
import Footer from '../../common/footer';
import Header from '../../common/header';
import {Block, Text} from '../../components';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const Terms = () => {
  return (
    <Block>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block color="##F6F5F1" flex={false} margin={[hp(2), wp(5), 0, wp(5)]}>
          <Text bold transform="uppercase" center>
            Terms & Conditions
          </Text>

          <Text margin={[hp(3), 0, 0, 0]} size={18} bold>
            Terms & Conditions
          </Text>
          <Text size={14} margin={[hp(2), 0, 0, 0]}>
            Eon Foods Ltd. owns and operates this Website. Access to and use of
            this Website and the products and services available through this
            Website are subject to the following terms, conditions and notices.
            By using the Services, you are agreeing to all of the Terms of
            Service. You should check this page regularly to take notice of any
            changes we may have made to the Terms of Service.
          </Text>
          <Text size={14} margin={[hp(2), 0, 0, 0]}>
            Access to this Website is permitted on a temporary basis, and we
            reserve the right to withdraw or amend the Services without notice.
            We will not be liable if for any reason this Website is unavailable
            at any time or for any period. From time . to time, we may restrict
            access to some parts or this entire Website.
          </Text>
          <Text size={14} margin={[hp(2), 0, 0, 0]}>
            This Website may contain links to other websites, which are not
            operated by Eon Foods Ltd. Eon Foods Ltd has no control over the
            linked sites and accepts no responsibility for them or for any loss
            or damage that may arise from your use of them.
          </Text>
          <Text margin={[hp(2), 0, 0, 0]} size={18} bold>
            Prohibitions
          </Text>
          <Text size={14} margin={[hp(2), 0, 0, 0]}>
            You must not misuse this Website. You will not commit or encourage a
            criminal offense; transmit or distribute a virus, worm, logic bomb
            or any other material which is malicious, technologically harmful,
            in breach of confidence or in any way offensive or obscene; hack
            into any aspect of the Service; corrupt data; cause annoyance to
            other users; infringe upon the rights of any other person’s
            proprietary rights; send any unsolicited advertising or promotional
            material, commonly referred to as “spam”; or attempt to affect the
            performance or functionality of any computer facilities of or
            accessed through this Website. Breaching this provision would
            constitute a criminal offense and Eon Foods Ltd will report any such
            breach to the relevant law enforcement authorities and disclose your
            identity to them.
          </Text>
          <Text size={14} margin={[hp(2), 0, 0, 0]}>
            We will not be liable for any loss or damage caused by a distributed
            denial-of-service attack, viruses or other technologically harmful
            material that may infect your computer equipment, computer programs,
            data or other proprietary material due to your use of this Website
            or to your downloading of any material posted on it, or on any
            website linked to it.
          </Text>
          <Text margin={[hp(2), 0, 0, 0]} size={18} bold>
            Intellectual Property, Software and Content
          </Text>
          <Text size={14} margin={[hp(2), 0, 0, 0]}>
            The Intellectual property, rights all in software and content
            (including photographic image) made available to you on or through
            this website remains the propery of Eon Foods Ltd or its licenseors
            and we are protected by copyright laws and treaties around the
            world. All such right are reserved by Eon Foods Ltd and its
            licensor. you may store print and display the content supplied
            solely for your own personal use. You are not permitted to publish,
            manipulate, distribute or other reproduce, in any format, any of the
            content or copies of the content supplied to you or which appears on
            the website nor may you use any such content in connection with any
            business or commercial enterprise
          </Text>
          <Text size={14} margin={[hp(2), 0, 0, 0]}>
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
export default Terms;
