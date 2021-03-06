import React from 'react';
import {StyleSheet, View} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import DefaultText from "../components/DefaultText";
import MealList from "../components/MealList";
import {useSelector} from "react-redux";

const FavoritesScreen = (props) => {

  const favMeals = useSelector(state => state.meals.favoriteMeals);
  if (!favMeals || !favMeals.length) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorite meals found. Start adding some!</DefaultText>
      </View>
    )
  }

  return (
    <MealList
      listData={favMeals}
      navigation={props.navigation}
    />
  );
};

FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Filters Screen',
    headerLeft:  () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }} />
      </HeaderButtons>
    )
  }
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default FavoritesScreen;
