import {Ionicons} from "@expo/vector-icons";
import {createBottomTabNavigator} from "react-navigation-tabs";
import React from 'react';
import { Platform, Text } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Colors from "../constants/Colors";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FilterScreen from "../screens/FilterScreen";
import MealDetailScreen from "../screens/MealDetailScreen";

const defaultStackOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  }
};

const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen,
  },
  CategoryMeals: {
    screen: CategoryMealsScreen,
  },
  MealDetail: MealDetailScreen,
},{
  defaultNavigationOptions: defaultStackOptions
});

const FavNavigator = createStackNavigator({
  Favorites: {
    screen: FavoritesScreen,
    navigationOptions: {
      headerTitle: 'Your Favorites'
    },
  },
  MealDetail: MealDetailScreen,
},{
  defaultNavigationOptions: defaultStackOptions
});

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
    }
  }
};

const  MealsFavTabNavigator =  Platform.OS === 'android'
  ? createMaterialBottomTabNavigator(tabScreenConfig, {
      activeColor: 'white',
      shifting: true,
  })
  : createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
      labelStyle: {
        fontFamily: 'open-sans-bold'
      },
      activeTintColor: Colors.accentColor
    }
  });

const FilterNavigator = createStackNavigator({
  Filter: FilterScreen
},{
  navigationOptions: {
    drawerLabel: 'Filters'
  },
  defaultNavigationOptions: defaultStackOptions
});

const MainNavigator = createDrawerNavigator({
  MealsFavs: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    },
  },
  Filters: FilterNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.accentColor,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
});


export default createAppContainer(MainNavigator);