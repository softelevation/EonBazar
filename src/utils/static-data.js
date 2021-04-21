import { images } from '../assets';

export const sliderData = [
  images.banner_icon,
  images.banner_icon1,
  images.banner_icon2,
  // images.banner_icon3,
];
export const footerContent = [
  {
    name: '100 % secured',
    subtitle: 'payment',
    icon: 'lock-closed',
  },
  {
    name: 'Customer service',
    subtitle: '01755665353',
    icon: 'call',
  },
  {
    name: '100 % secured',
    subtitle: 'payment',
    icon: 'ios-swap-horizontal-sharp',
  },
  {
    name: '100 % secured',
    subtitle: '01755665353',
    icon: 'ios-thumbs-up',
  },
];
export const DrawerData = [
  {
    name: 'Home',
    icon: 'home_d_icon',
    nav: 'DashboardLogo',
  },
  {
    name: 'Your Profile',
    icon: 'your_profile_icon',
    nav: 'Profile',
  },
  {
    name: 'Your Orders',
    icon: 'your_order_drawer_icon',
    nav: 'YourOrder',
  },
  {
    name: 'Wish List',
    icon: 'wishlist_icon',
    nav: 'Wishlist',
  },
  {
    name: 'Category',
    icon: 'dashboard_drawer_icon',
    nav: 'Category',
  },
  {
    name: 'Help & More',
    icon: 'help_icon',
    nav: 'Help',
  },
  {
    name: 'Advance Search',
    icon: 'search_icon',
    nav: 'AdvanceSearch',
  },
  {
    name: 'Privacy Policy',
    icon: 'privacy_icon',
    nav: 'Privacy',
  },
  {
    name: 'Terms & Conditions',
    icon: 'terms_icon',
    nav: 'Terms',
  },
  {
    name: 'FAQ',
    icon: 'faq_icon',
    nav: 'Faq',
  },
  {
    name: 'Logout',
    icon: 'logout_icon',
    nav: 'Logout',
  },
];
export const DrawerGusetUserData = [
  {
    name: 'Home',
    icon: 'home_d_icon',
    nav: 'DashboardLogo',
  },
  {
    name: 'Create Account',
    icon: 'your_profile_icon',
    nav: 'NewCustomer',
  },
  {
    name: 'Sign in',
    icon: 'your_profile_icon',
    nav: 'Login',
  },
  {
    name: 'Your Profile',
    icon: 'your_profile_icon',
    nav: 'Profile',
  },
  {
    name: 'Your Orders',
    icon: 'your_order_drawer_icon',
    nav: 'YourOrder',
  },
  {
    name: 'Wish List',
    icon: 'wishlist_icon',
    nav: 'Wishlist',
  },
  {
    name: 'Category',
    icon: 'dashboard_drawer_icon',
    nav: 'Category',
  },
  {
    name: 'Help & More',
    icon: 'help_icon',
    nav: 'Help',
  },
  {
    name: 'Advance Search',
    icon: 'search_icon',
    nav: 'AdvanceSearch',
  },
  {
    name: 'Privacy Policy',
    icon: 'privacy_icon',
    nav: 'Privacy',
  },
  {
    name: 'Terms & Conditions',
    icon: 'terms_icon',
    nav: 'Terms',
  },
  {
    name: 'FAQ',
    icon: 'faq_icon',
    nav: 'Faq',
  },
  // {
  //   name: 'Logout',
  //   icon: 'logout_icon',
  //   nav: 'Logout',
  // },
];
// Signup
// 1. Send otp with eventType “customer_signup_otp”
// 2. Then use the /V1/customersignupwithotp endpoint
// 3. Email must be <mobile_no>@example.com
// Sample request

// {
// "customer": {
// "email": "01719306813@example.com",
// "firstname": "Manas",
// "lastname": "Bala",
// "middlename": "",
// "gender": 0,
// "store_id": 1,
// "website_id": 1,
// "addresses": [],
// "disable_auto_group_change": 0
// },
// "password": "Manas123!",
// "mobile": "01719306813",
// "otp": "4193"
// }

export const eventType = {
  forgot_password_otp: 'forgot_password_otp',
  customer_signup_otp: 'customer_signup_otp',
  customer_login_otp: 'customer_login_otp',
  customer_account_edit_otp: 'customer_account_edit_otp',
};
