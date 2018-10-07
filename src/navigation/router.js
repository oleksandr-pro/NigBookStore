/* @flow */
import {
  StackNavigator,
  NavigationActions,
  DrawerNavigator,
  TabNavigator,
  TabBarBottom
} from "react-navigation";
import Home from "../components/home";
import ContactUs from "../components/contactus";
import Settings from "../components/settings";
import Login from "../components/login";
import ForgotPassword from "../components/forgotpassword";
import Myshelf from "../components/screens/Myshelf";
import Myaccount from "../components/screens/Myaccount";
import StoreView from "../components/screens/StoreView";
import Categories from "../components/screens/Categories";
import Epubreader from "../epubreader/epubreader";
import Search from "../components/screens/Search";
import * as COLOR from "../config/colors";
import DrawerContainer from "../components/drawer";
//for pay stack
import Subscription from '../components/payscreens/subscription';

export const LoginStack = StackNavigator({
  Login: {
    screen: Login
  },
  ForgotPassword: {
    screen: ForgotPassword
  }
});

export const PayStack = StackNavigator({
  Subscription: {
    screen: Subscription
  }
})

const HomeItem = StackNavigator({
  Home: {
    screen: Home
  },
  Epub: {
    screen:Epubreader
  }
});

const ContactUsItem = StackNavigator({
  ContactUs: {
    screen: ContactUs
  }
});

const SettingsItem = StackNavigator({
  Settings: {
    screen: Settings
  }
});

export const MainStack = DrawerNavigator(
  {
    HomeItem: {
      screen: HomeItem
    },
    ContactUsItem: {
      screen: ContactUsItem
    },
    SettingsItem: {
      screen: SettingsItem
    },
    Search: {
      screen: Search
    }
  },
  { contentComponent: DrawerContainer }
);


export const HomeTabs = TabNavigator(
  {
    Myshelf: {
      screen: Myshelf
    },
    MyAccount: {
      screen: Myaccount
    },
    Categories: {
      screen: Categories
    },
    Store: {
      screen:StoreView
    }
  },
  {
    headerMode: "none",
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    initialRouteName: 'Myshelf',
    tabBarOptions: {
      showLabel: true,
      showIcon:true,
      upperCaseLabel: false,
      activeTintColor: COLOR.HEADER_TINT,
      activeBackgroundColor: COLOR.ACCENT_COLOR,
      inactiveTintColor: COLOR.LIGHT_PRIMARY_COLOR,
      inactiveBackgroundColor: COLOR.DARK_PRIMARY_COLOR,
      style: {
        height: 50,
        backgroundColor: COLOR.HEADER,        
      },
      indicatorStyle: {
        backgroundColor: COLOR.HEADER_TINT
      },
      labelStyle: {
        fontSize: 13
      },
    },
    navigationOptions: {
      swipeEnabled:false
    }
  }
);

const navigateOnce = getStateForAction => (action, state) => {
  const { type, routeName } = action;
  return state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
    ? null
    : getStateForAction(action, state);
};

MainStack.router.getStateForAction = navigateOnce(
  MainStack.router.getStateForAction
);
LoginStack.router.getStateForAction = navigateOnce(
  LoginStack.router.getStateForAction
);



