import * as React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Dashboard from '../screens/dashboard';
import NewCustomer from '../screens/auth/new-customer';
import Login from '../screens/auth/login';
import Splash from '../screens/splash';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTab from '../common/bottom-tab';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerScreen from '../common/drawer';
import Cart from '../screens/cart';
import Category from '../screens/category';
import Faq from '../screens/about/faq';
import Terms from '../screens/about/terms';
import Privacy from '../screens/about/privacy';
import Help from '../screens/about/help';
import AdvanceSearch from '../screens/dashboard/advance-search';
import Wishlist from '../screens/dashboard/wishlist';
import ThankYou from '../screens/common/thankyou';
import Profile from '../screens/auth/profile';
import PaymentMethod from '../screens/payment';
import YourOrder from '../screens/dashboard/your-order';
import Shipping from '../screens/payment/shipping';
import PlaceAnOrder from '../screens/payment/place-an-order';
import Details from '../screens/category/details';
import SeeAllDetails from '../screens/dashboard/all-details';
import {navigationRef} from './NavigationService';
import EditProfile from '../screens/auth/edit-profile';
import SearchList from '../screens/dashboard/advance-search/list';
import Payment from '../screens/payment/payment';
import ForgotPassword from '../screens/auth/forgot/index';
import SubCategory from '../screens/category/subcategory';
import EditAddress from '../screens/auth/edit-address';
import ChangePassword from '../screens/auth/change-password';
import AddAddress from '../screens/auth/add-address';
import ShowAddress from '../screens/auth/show-address';

import PaymentSuccess from '../screens/payment/paymentSuccess';
import PaymentError from '../screens/payment/paymentError';
import BillingAddress from '../screens/payment/billingAddress';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Routes() {
  function PaymentModal() {
    return (
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Payment"
          component={Payment}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    );
  }

  const LoginStack = () => {
    return (
      <RootStack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialRouteName="Login"
        headerMode="none">
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="NewCustomer" component={NewCustomer} />
        <RootStack.Screen name="Faq" component={Faq} />
        <RootStack.Screen name="Terms" component={Terms} />
        <RootStack.Screen name="Privacy" component={Privacy} />
        <RootStack.Screen name="Help" component={Help} />
        <RootStack.Screen name="AdvanceSearch" component={AdvanceSearch} />
        <RootStack.Screen name="Wishlist" component={Wishlist} />
        <RootStack.Screen name="Profile" component={ProfileStack} />
        <RootStack.Screen name="YourOrder" component={YourOrder} />
        <RootStack.Screen name="Shipping" component={Shipping} />
        <RootStack.Screen name="PlaceAnOrder" component={PlaceAnOrder} />
        <RootStack.Screen name="Details" component={Details} />
        <RootStack.Screen name="SeeAllDetails" component={SeeAllDetails} />
        <RootStack.Screen name="SubCategory" component={SubCategory} />
        <RootStack.Screen name="SearchList" component={SearchList} />
        <RootStack.Screen name="PaymentMethod" component={PaymentMethod} />
        <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
        <RootStack.Screen name="DashboardLogo" component={DashboardStack} />
        <RootStack.Screen name="Payment" component={PaymentModal} />
        <RootStack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        <RootStack.Screen name="PaymentError" component={PaymentError} />
        <RootStack.Screen name="BillingAddress" component={BillingAddress} />
        <RootStack.Screen name="Dashboard" component={Dashboard} />
        <RootStack.Screen name="EditProfile" component={EditProfile} />
        <RootStack.Screen name="EditAddress" component={EditAddress} />
        <RootStack.Screen name="AddAddress" component={AddAddress} />
        <RootStack.Screen name="ShowAddress" component={ShowAddress} />
        <RootStack.Screen name="ChangePassword" component={ChangePassword} />
      </RootStack.Navigator>
    );
  };
  const ProfileStack = () => {
    return (
      <RootStack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialRouteName="Profile"
        headerMode="none">
        <RootStack.Screen name="Profile" component={Profile} />
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="NewCustomer" component={NewCustomer} />
        <RootStack.Screen name="Faq" component={Faq} />
        <RootStack.Screen name="Terms" component={Terms} />
        <RootStack.Screen name="Privacy" component={Privacy} />
        <RootStack.Screen name="Help" component={Help} />
        <RootStack.Screen name="AdvanceSearch" component={AdvanceSearch} />
        <RootStack.Screen name="Wishlist" component={Wishlist} />
        <RootStack.Screen name="YourOrder" component={YourOrder} />
        <RootStack.Screen name="Shipping" component={Shipping} />
        <RootStack.Screen name="PlaceAnOrder" component={PlaceAnOrder} />
        <RootStack.Screen name="Details" component={Details} />
        <RootStack.Screen name="SeeAllDetails" component={SeeAllDetails} />
        <RootStack.Screen name="SubCategory" component={SubCategory} />
        <RootStack.Screen name="EditProfile" component={EditProfile} />
        <RootStack.Screen name="EditAddress" component={EditAddress} />
        <RootStack.Screen name="AddAddress" component={AddAddress} />
        <RootStack.Screen name="ShowAddress" component={ShowAddress} />
        <RootStack.Screen name="ChangePassword" component={ChangePassword} />
        <RootStack.Screen name="SearchList" component={SearchList} />
        <RootStack.Screen name="Payment" component={PaymentModal} />
        <RootStack.Screen name="DashboardLogo" component={DashboardStack} />
        <RootStack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        <RootStack.Screen name="PaymentError" component={PaymentError} />
        <RootStack.Screen name="BillingAddress" component={BillingAddress} />
        <RootStack.Screen name="Dashboard" component={Dashboard} />
      </RootStack.Navigator>
    );
  };
  const DashboardStack = () => {
    return (
      <RootStack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialRouteName="Dashboard"
        headerMode="none">
        <RootStack.Screen name="Dashboard" component={Dashboard} />
        <RootStack.Screen name="NewCustomer" component={NewCustomer} />
        <RootStack.Screen name="Faq" component={Faq} />
        <RootStack.Screen name="Terms" component={Terms} />
        <RootStack.Screen name="Privacy" component={Privacy} />
        <RootStack.Screen name="Help" component={Help} />
        <RootStack.Screen name="AdvanceSearch" component={AdvanceSearch} />
        <RootStack.Screen name="Wishlist" component={Wishlist} />
        <RootStack.Screen name="Profile" component={ProfileStack} />
        <RootStack.Screen name="YourOrder" component={YourOrder} />
        <RootStack.Screen name="Shipping" component={Shipping} />
        <RootStack.Screen name="PlaceAnOrder" component={PlaceAnOrder} />
        <RootStack.Screen name="Details" component={Details} />
        <RootStack.Screen name="SeeAllDetails" component={SeeAllDetails} />
        <RootStack.Screen name="SubCategory" component={SubCategory} />
        <RootStack.Screen name="SearchList" component={SearchList} />
        <RootStack.Screen name="Payment" component={PaymentModal} />
        <RootStack.Screen name="PaymentMethod" component={PaymentMethod} />
        <RootStack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        <RootStack.Screen name="PaymentError" component={PaymentError} />
        <RootStack.Screen name="BillingAddress" component={BillingAddress} />
      </RootStack.Navigator>
    );
  };
  const CartStack = () => {
    return (
      <RootStack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialRouteName="Cart"
        headerMode="none">
        <RootStack.Screen name="Cart" component={Cart} />
        <RootStack.Screen name="NewCustomer" component={NewCustomer} />
        <RootStack.Screen name="Faq" component={Faq} />
        <RootStack.Screen name="Terms" component={Terms} />
        <RootStack.Screen name="Privacy" component={Privacy} />
        <RootStack.Screen name="Help" component={Help} />
        <RootStack.Screen name="AdvanceSearch" component={AdvanceSearch} />
        <RootStack.Screen name="Wishlist" component={Wishlist} />
        <RootStack.Screen name="ThankYou" component={ThankYou} />
        <RootStack.Screen name="Profile" component={ProfileStack} />
        <RootStack.Screen name="PaymentMethod" component={PaymentMethod} />
        <RootStack.Screen name="YourOrder" component={YourOrder} />
        <RootStack.Screen name="Shipping" component={Shipping} />
        <RootStack.Screen name="PlaceAnOrder" component={PlaceAnOrder} />
        <RootStack.Screen name="Details" component={Details} />
        <RootStack.Screen name="SeeAllDetails" component={SeeAllDetails} />
        <RootStack.Screen name="SubCategory" component={SubCategory} />
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="SearchList" component={SearchList} />
        <RootStack.Screen name="Payment" component={PaymentModal} />
        <RootStack.Screen name="DashboardLogo" component={DashboardStack} />
        <RootStack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        <RootStack.Screen name="PaymentError" component={PaymentError} />
        <RootStack.Screen name="BillingAddress" component={BillingAddress} />
        <RootStack.Screen name="Dashboard" component={Dashboard} />
      </RootStack.Navigator>
    );
  };
  const CategoryStack = () => {
    return (
      <RootStack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialRouteName="Category"
        headerMode="none">
        <RootStack.Screen name="Category" component={Category} />
        <RootStack.Screen name="NewCustomer" component={NewCustomer} />
        <RootStack.Screen name="Faq" component={Faq} />
        <RootStack.Screen name="Terms" component={Terms} />
        <RootStack.Screen name="Privacy" component={Privacy} />
        <RootStack.Screen name="Help" component={Help} />
        <RootStack.Screen name="AdvanceSearch" component={AdvanceSearch} />
        <RootStack.Screen name="Wishlist" component={Wishlist} />
        <RootStack.Screen name="Profile" component={ProfileStack} />
        <RootStack.Screen name="YourOrder" component={YourOrder} />
        <RootStack.Screen name="Shipping" component={Shipping} />
        <RootStack.Screen name="PlaceAnOrder" component={PlaceAnOrder} />
        <RootStack.Screen name="Details" component={Details} />
        <RootStack.Screen name="SeeAllDetails" component={SeeAllDetails} />
        <RootStack.Screen name="SubCategory" component={SubCategory} />
        <RootStack.Screen name="SearchList" component={SearchList} />
        <RootStack.Screen name="Payment" component={PaymentModal} />
        <RootStack.Screen name="PaymentMethod" component={PaymentMethod} />
        <RootStack.Screen name="DashboardLogo" component={DashboardStack} />
        <RootStack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        <RootStack.Screen name="PaymentError" component={PaymentError} />
        <RootStack.Screen name="BillingAddress" component={BillingAddress} />
        <RootStack.Screen name="Dashboard" component={Dashboard} />
      </RootStack.Navigator>
    );
  };
  const WishlistStack = () => {
    return (
      <RootStack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialRouteName="Wishlist"
        headerMode="none">
        <RootStack.Screen name="Wishlist" component={Wishlist} />
        <RootStack.Screen name="NewCustomer" component={NewCustomer} />
        <RootStack.Screen name="Faq" component={Faq} />
        <RootStack.Screen name="Terms" component={Terms} />
        <RootStack.Screen name="Privacy" component={Privacy} />
        <RootStack.Screen name="Help" component={Help} />
        <RootStack.Screen name="AdvanceSearch" component={AdvanceSearch} />
        <RootStack.Screen name="Profile" component={ProfileStack} />
        <RootStack.Screen name="YourOrder" component={YourOrder} />
        <RootStack.Screen name="Shipping" component={Shipping} />
        <RootStack.Screen name="PlaceAnOrder" component={PlaceAnOrder} />
        <RootStack.Screen name="Details" component={Details} />
        <RootStack.Screen name="SeeAllDetails" component={SeeAllDetails} />
        <RootStack.Screen name="SubCategory" component={SubCategory} />
        <RootStack.Screen name="SearchList" component={SearchList} />
        <RootStack.Screen name="Payment" component={PaymentModal} />
        <RootStack.Screen name="PaymentMethod" component={PaymentMethod} />
        <RootStack.Screen name="DashboardLogo" component={DashboardStack} />
        <RootStack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        <RootStack.Screen name="PaymentError" component={PaymentError} />
        <RootStack.Screen name="BillingAddress" component={BillingAddress} />
        <RootStack.Screen name="Dashboard" component={Dashboard} />
      </RootStack.Navigator>
    );
  };
  const TabNav = () => {
    return (
      <Tab.Navigator
        initialRouteName="DashboardLogo"
        tabBar={(props) => <BottomTab {...props} />}>
        <Tab.Screen
          options={{unmountOnBlur: true}}
          name="Wishlist"
          component={WishlistStack}
        />
        <Tab.Screen
          // options={{unmountOnBlur: true}}
          name="Category"
          component={CategoryStack}
        />
        <Tab.Screen
          name="DashboardLogo"
          options={{unmountOnBlur: true}}
          component={DashboardStack}
        />
        <Tab.Screen
          options={{unmountOnBlur: true}}
          name="Cart"
          component={CartStack}
        />
        <Tab.Screen
          options={{unmountOnBlur: true}}
          name="Login"
          component={LoginStack}
        />
      </Tab.Navigator>
    );
  };
  function HomeDrawer() {
    return (
      <Drawer.Navigator
        drawerType="front"
        drawerStyle={{width: widthPercentageToDP(70)}}
        drawerContent={(props) => <DrawerScreen {...props} />}>
        <Drawer.Screen name="Controls" component={TabNav} />
        <Drawer.Screen name="Faq" component={Faq} />
        <Drawer.Screen name="Terms" component={Terms} />
        <Drawer.Screen name="Privacy" component={Privacy} />
        <Drawer.Screen name="Help" component={Help} />
        <Drawer.Screen name="AdvanceSearch" component={AdvanceSearch} />
        <Drawer.Screen name="YourOrder" component={YourOrder} />
      </Drawer.Navigator>
    );
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#78A942'}}>
        <StatusBar barStyle="light-content" />
        <RootStack.Navigator
          screenOptions={{
            cardStyleInterpolator:
              CardStyleInterpolators.forScaleFromCenterAndroid,
          }}
          initialRouteName="Splash"
          headerMode="none">
          <RootStack.Screen name="Home" component={HomeDrawer} />
          <RootStack.Screen name="Splash" component={Splash} />
        </RootStack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default Routes;
