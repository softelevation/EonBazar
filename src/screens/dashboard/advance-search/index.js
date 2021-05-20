import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Footer from '../../../common/footer';
import Header from '../../../common/header';
import {Block, Button, Input, Text} from '../../../components';
import {t1, t2, w3} from '../../../components/theme/fontsize';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {advanceSearchRequest} from '../../../redux/action';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
  
const AdvanceSearch = ({route}) => {
  const isLoad = useSelector((state) => state.advanceSearch.list.loading);
  const dispatch = useDispatch();
  const [data, setData] = useState(route.params);

  const submitValues = (values) => {
    const data = {
      name: values.name,
      fromPrice: values.fromPrice,
      toPrice: values.toPrice,
      sku: values.sku,
      description: values.description,
    };
    dispatch(advanceSearchRequest(data));
  };
  useEffect(() => {


  }, []);
  return (
    <Block>
      <Header />
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Block flex={false} margin={[0, w3]}>
          <Text margin={[t2, 0]} center bold transform="uppercase">
            Advance Search
          </Text>
          <Formik
            initialValues={{
              name: route.params?route.params.data.name:null,
              sku:  route.params?route.params.data.sku:null,
              description: route.params?route.params.data.description:null,
              short_description: '',
              fromPrice: route.params?route.params.data.fromPrice:null,
              toPrice: route.params?route.params.data.toPrice:null,
            }}
            onSubmit={submitValues}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              handleSubmit,
              dirty,
            }) => (
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
                <Input
                  center
                  label="Product Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                />
                <Input
                  center
                  label="SKU"
                  value={values.sku}
                  onChangeText={handleChange('sku')}
                  onBlur={() => setFieldTouched('sku')}
                />
                <Input
                  center
                  label="Description"
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={() => setFieldTouched('description')}
                />
                <Input
                  center
                  label="Short Description"
                  value={values.short_description}
                  onChangeText={handleChange('short_description')}
                  onBlur={() => setFieldTouched('short_description')}
                />
                <Text color="#636363" body center>
                  Price
                </Text>
                <Block center space={'around'} row flex={false}>
                  <Input
                    value={values.fromPrice}
                    onChangeText={handleChange('fromPrice')}
                    onBlur={() => setFieldTouched('fromPrice')}
                    style={{width: widthPercentageToDP(37)}}
                    keyboardType={'number-pad'}
                  />
                  <Text>-</Text>
                  <Input
                    value={values.toPrice}
                    onChangeText={handleChange('toPrice')}
                    onBlur={() => setFieldTouched('toPrice')}
                    style={{width: widthPercentageToDP(37)}}
                    keyboardType={'number-pad'}
                  />
                  <Text color="#636363" body>
                    BDT
                  </Text>
                </Block>
                <Button
                  isLoading={isLoad}
                  onPress={handleSubmit}
                  color="secondary">
                  Search
                </Button>
              </Block>
            )}
          </Formik>
        </Block>
        <Footer images={false} />
      </KeyboardAwareScrollView>
    </Block>
  );
};

export default AdvanceSearch;
