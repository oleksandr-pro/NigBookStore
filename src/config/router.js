/* @flow */

import {
  StackNavigator,
  NavigationActions,
  DrawerNavigator,
  TabNavigator,
  TabBarBottom
} from "react-navigation";

import Home from "../components/home";
import Profile from "../components/profile";
import Settings from "../components/settings";
import Login from "../components/login";
import ForgotPassword from "../components/forgotpassword";
import Myshelf from "../components/screens/Myshelf";
import Website from "../components/screens/Website";
import StoreView from "../components/screens/StoreView";
import ContactUs from "../components/screens/ContactUs";

import * as COLOR from "./colors";

import DrawerContainer from "../components/drawer";

const HomeItem = StackNavigator({
  Home: {
    screen: Home
  }
});

const ProfileItem = StackNavigator({
  Profile: {
    screen: Profile
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
    ProfileItem: {
      screen: ProfileItem
    },
    SettingsItem: {
      screen: SettingsItem
    }
  },
  { contentComponent: DrawerContainer }
);

export const LoginStack = StackNavigator({
  Login: {
    screen: Login
  },
  ForgotPassword: {
    screen: ForgotPassword
  }
});

export const HomeTabs = TabNavigator(
  {
    Myshelf: {
      screen: Myshelf
    },
    Website: {
      screen: Website
    },
    ContactUs: {
      screen: ContactUs
    },
    Store: {
      screen:StoreView
    }
  },
  {
    headerMode: "none",
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    initialRouteName: 'Store',
    tabBarOptions: {
      showLabel: true,
      showIcon:false,
      upperCaseLabel: false,
      activeTintColor: COLOR.HEADER_TINT,
      activeBackgroundColor: COLOR.TAB_ACTIVE,
      inactiveTintColor: COLOR.BACKGROUND,
      inactiveBackgroundColor: COLOR.TAB_INACTIVE,
      style: {
        height: 50,
        backgroundColor: COLOR.HEADER,
        
      },
      indicatorStyle: {
        backgroundColor: COLOR.HEADER_TINT
      },
      labelStyle: {
        fontSize: 17
      },
      tabStyle: {
        alignItems:'center',
        justifyContent: 'center',
      }
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



