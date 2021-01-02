import React from 'react';
import {ScrollView} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Footer from '../../../common/footer';
import Header from '../../../common/header';
import {Block, Button, Input, Text} from '../../../components';
import {t1, t2, w3} from '../../../components/theme/fontsize';

const AdvanceSearch = () => {
  return (
    <Block>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex={false} margin={[0, w3]}>
          <Text margin={[t2, 0]} center bold transform="uppercase">
            Advance Search
          </Text>
          <Block white flex={false} padding={[t2, w3]}>
            <Text margin={[t1, 0, 0, 0]} center size={12}>
              Search settings
            </Text>
            <Block
              flex={false}
              margin={[t1, w3]}
              borderColorDeafult
              borderWidth={[0, 0, 1, 0]}
            />
            <Input center label="Product Name" />
            <Input center label="SKU" />
            <Input center label="Description" />
            <Input center label="Short Description" />
            <Text color="#636363" body center>
              Price
            </Text>
            <Block center space={'around'} row flex={false}>
              <Input style={{width: widthPercentageToDP(37)}} />
              <Text>-</Text>
              <Input style={{width: widthPercentageToDP(37)}} center />
              <Text color="#636363" body>
                BDT
              </Text>
            </Block>
            <Button color="secondary">Search</Button>
          </Block>
        </Block>
        <Footer images={false} />
      </ScrollView>
    </Block>
  );
};

export default AdvanceSearch;
