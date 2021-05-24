import React from 'react';
import { ScrollView } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Footer from '../../../common/footer';
import Header from '../../../common/header';
import { Block, Button, Text } from '../../../components';
import { CommonActions, useNavigation } from '@react-navigation/native';


const PaymentSuccess = () => {

    const navigation = useNavigation();

    return (
        <Block color="transparent">
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Block color="##F6F5F1" flex={false} margin={[hp(10), wp(5), 0, wp(5)]}>
                    <Text bold transform="uppercase" center>Thank You! For Your Payment</Text>

                    <Text size={14} center bold margin={[hp(10), 0, hp(10), 0]}>We Have Received Your Payment Successfully !</Text>


                    <Button
                     //   onPress={() => navigation.navigate('DashboardLogo')
                        onPress={() =>  navigation.reset({
                            routes: [{ name: 'DashboardLogo' }],
                          })}
                        color="secondary">
                        CONTINUE SHOPPING
                </Button>

                </Block>
                <Footer images={false} />
            </ScrollView>
        </Block>
    );
};
export default PaymentSuccess;
