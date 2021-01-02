import React, {useState} from 'react';
import {FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../common/header';
import {
  Block,
  Button,
  CustomButton,
  ImageComponent,
  Input,
  Text,
} from '../../../components';
import {t1, t2, w1, w2, w3} from '../../../components/theme/fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import Footer from '../../../common/footer';
import {light} from '../../../components/theme/colors';
import {useNavigation} from '@react-navigation/native';

const initialState = {
  reviews: true,
  overview: true,
};
const Details = () => {
  const [action, setAction] = useState(initialState);
  const {reviews, overview} = action;
  const [qty, setQty] = useState(1);
  const nav = useNavigation();
  const renderConditions = () => {
    return (
      <Block margin={[t2, 0]} white padding={[t2]}>
        <Block row flex={false} center>
          <Icon name="call" size={12} />
          <Text size={12} margin={[0, w2]} height={20} regular>
            01755665353
          </Text>
        </Block>

        <Text size={12} height={20} regular>
          Accept money online
        </Text>
        <Text size={12} height={20} regular>
          Money back guarantee
        </Text>
        <Text size={12} height={20} regular>
          Ships items quickly
        </Text>
      </Block>
    );
  };
  const renderReviews = () => {
    return (
      <Block white padding={[t2, w3]}>
        <CustomButton
          onPress={() => setAction({reviews: !reviews})}
          row
          flex={false}
          space="between">
          <Text size={14}>Reviews</Text>
          <ImageComponent
            name={reviews ? 'up_arrow_icon' : 'down_arrow_icon'}
            height="10"
            width="10"
          />
        </CustomButton>
        <Block
          secondary
          padding={[hp(0.5), 0, 0, 0]}
          margin={[t1, 0, 0, 0]}
          flex={false}
          borderWidth={[0, 0, 0, 0]}
        />
        {reviews && (
          <>
            <Block margin={[t1, 0]} row flex={false} center>
              <Text regular margin={[0, w3, 0, 0]} size={22}>
                0
              </Text>
              <StarRating
                disabled={false}
                starSize={15}
                maxStars={5}
                fullStarColor={'#78A942'}
                rating={0}
                containerStyle={{width: wp(20), marginBottom: hp(0.5)}}
              />
              <Text regular margin={[0, 0, 0, w3]} size={12}>
                0 Reviews
              </Text>
            </Block>
            <FlatList
              data={['5', '4', '3', '2', '1']}
              renderItem={({item}) => {
                return (
                  <Block margin={[t1, 0, 0, 0]} row flex={false} center>
                    <Text height={20} margin={[0, w3, 0, 0]} regular size={12}>
                      {item} star
                    </Text>
                    <Block
                      borderColorDeafult
                      flex={false}
                      borderWidth={1}
                      padding={[hp(0.8)]}
                      style={{width: wp(40)}}
                    />
                  </Block>
                );
              }}
            />
            <Block
              flex={false}
              margin={[t2, 0, 0, 0]}
              color="#F6F5F1"
              padding={[t2, w3]}>
              <Text height={20} transform="uppercase" size={12}>
                You're reviewing
              </Text>
              <Text height={20} bold size={12}>
                Country Natural Black Seed Paratha - 12 Pcs (900gm)
              </Text>
              <Block
                padding={[t1, 0, 0, 0]}
                flex={false}
                borderColorDeafult
                borderWidth={[0, 0, 1, 0]}
              />
              <Block margin={[t1, 0]} flex={false}>
                <Text height={20} size={14}>
                  Your Rating
                </Text>
                <FlatList
                  data={['Quality', 'Value', 'Price']}
                  renderItem={({item}) => {
                    return (
                      <Block margin={[t1, 0, 0, 0]} row flex={false} center>
                        <Block flex={false} style={{width: wp(20)}}>
                          <Text height={20} regular size={12}>
                            {item}
                          </Text>
                        </Block>
                        <StarRating
                          disabled={false}
                          starSize={15}
                          maxStars={5}
                          fullStarColor={'#78A942'}
                          rating={0}
                          containerStyle={{
                            width: wp(20),
                            marginBottom: hp(0.5),
                          }}
                        />
                      </Block>
                    );
                  }}
                />
                <Input label="NickName" />
                <Input label="Summary" />
                <Input label="Review" />
                <Button color="secondary">Submit Review</Button>
              </Block>
            </Block>
          </>
        )}
      </Block>
    );
  };
  return (
    <Block>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex={false} padding={[t2]}>
          <Text grey regular size={12}>
            {
              'Home > Breakfast Range > Country Natural Black Seed Paratha - 12 Pcs  (900gm)'
            }
          </Text>
          <Block margin={[t2, 0, 0, 0]} white padding={[t2, w3, 0, w3]}>
            <CustomButton
              onPress={() => setAction({overview: !overview})}
              row
              flex={false}
              space="between">
              <Text size={14}>Overview</Text>
              <ImageComponent
                name={overview ? 'up_arrow_icon' : 'down_arrow_icon'}
                height="10"
                width="10"
              />
            </CustomButton>
            <Block
              secondary
              padding={[hp(0.5), 0, 0, 0]}
              margin={[t1, 0, 0, 0]}
              flex={false}
              borderWidth={[0, 0, 0, 0]}
            />
          </Block>
          <Block white padding={[t2, w2]}>
            {overview && (
              <>
                <Block center flex={false}>
                  <ImageComponent name="product" height="250" width="250" />
                </Block>
                <Block margin={[t2, 0]}>
                  <Text regular size={12} height={20}>
                    Country Natural Black Seed Paratha - 12 Pcs (900gm)
                  </Text>
                  <Text secondary size={12} semibold height={20}>
                    BDT 240.00
                  </Text>
                  <Text transform="uppercase" size={12} height={20}>
                    be the first to review this product
                  </Text>
                  <Block row center flex={false}>
                    <Icon
                      name="checkmark-circle"
                      size={15}
                      color={light.secondary}
                    />
                    <Text
                      transform="uppercase"
                      margin={[0, w1, 0, w1]}
                      size={12}
                      height={20}
                      regular>
                      In Stock
                    </Text>
                  </Block>
                  <Text bold height={20} size={12}>
                    SKU
                  </Text>
                  <Text regular size={12} height={20}>
                    Country Natural Black Seed Paratha - 12 Pcs (900gm)'
                  </Text>
                  <Block
                    padding={[t1, 0, 0, 0]}
                    flex={false}
                    borderColorDeafult
                    borderWidth={[0, 0, 1, 0]}
                  />
                </Block>
                <Block center row flex={false}>
                  <Text bold size={12} height={20}>
                    QTY
                  </Text>
                  <Block
                    style={{width: wp(18)}}
                    center
                    row
                    space={'between'}
                    borderWidth={1}
                    borderRadius={10}
                    margin={[0, w3]}
                    padding={[hp(0.5)]}
                    flex={false}>
                    <TouchableOpacity
                      disabled={qty === 1}
                      onPress={() => setQty(qty - 1)}>
                      <Icon name="ios-remove-outline" size={15} />
                    </TouchableOpacity>

                    <Text size={12}>{qty}</Text>
                    <Icon
                      onPress={() => setQty(qty + 1)}
                      name="add"
                      size={15}
                    />
                  </Block>
                </Block>
                <Block
                  padding={[t1, 0, t1, 0]}
                  flex={false}
                  borderColorDeafult
                  borderWidth={[0, 0, 1, 0]}
                />
              </>
            )}
            <Block
              center
              row
              space={'between'}
              color="#F6F5F1"
              margin={[t1, 0, 0, 0]}
              padding={[hp(1.5)]}>
              <Text size={12} regular>
                Specification
              </Text>
              <Block row flex={false}>
                <Text margin={[0, w1, 0, w1]} size={12} regular>
                  Country Natural Black Seed
                </Text>
                <Icon name="ios-chevron-forward" size={12} />
              </Block>
            </Block>
            <Block
              center
              row
              space={'between'}
              margin={[t1, 0, 0, 0]}
              color="#F6F5F1"
              padding={[hp(1.5)]}>
              <Text size={12} regular>
                Product Condition
              </Text>
              <Icon name="ios-chevron-forward" size={12} />
            </Block>
          </Block>
          <Button onPress={() => nav.navigate('Cart')} color="primary">
            Add to cart
          </Button>
          <Button onPress={() => nav.navigate('Cart')} color="secondary">
            Buy Now
          </Button>
          <Block margin={[t1, 0]} center middle row>
            <CustomButton
              onPress={() => nav.navigate('Wishlist')}
              flex={false}
              borderWidth={2}
              center
              middle
              borderRadius={20}
              margin={[0, w2]}
              borderColor="#78A942"
              padding={[hp(0.6)]}>
              <ImageComponent
                name="wishlist_icon"
                height="20"
                width="20"
                color="#78A942"
              />
            </CustomButton>
            <Block
              flex={false}
              borderWidth={2}
              center
              middle
              borderRadius={20}
              margin={[0, w2]}
              borderColor="#78A942"
              padding={[hp(0.6)]}>
              <Icon name="ios-swap-horizontal-sharp" size={20} />
            </Block>
          </Block>
          {renderConditions()}

          {/* Reviews */}

          {renderReviews()}
          <Footer images={false} />
        </Block>
      </ScrollView>
    </Block>
  );
};

export default Details;
