import React, {useEffect, useCallback} from 'react';
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import DefaultText from "../components/DefaultText";
import {useSelector, useDispatch} from "react-redux";
import {toggleFavorite} from "../store/actions/meals";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  )
};

const MealDetailScreen = (props) => {

  const mealId = props.navigation.getParam('mealId');
  const currentMealsIsFavorite = useSelector(state =>
    state.meals.favoriteMeals.some(meal => meal.id === mealId)
  );
  const availableMeals = useSelector(state => state.meals.meals);
  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() =>{
    props.navigation.setParams({
      toggleFav: toggleFavoriteHandler,
    })
  }, [toggleFavoriteHandler]);

  useEffect(() =>{
    props.navigation.setParams({
      isFav: currentMealsIsFavorite,
    })
  }, [currentMealsIsFavorite]);

  return (
    <ScrollView>
      <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.afford.toUpperCase()}</DefaultText>
      </View>

      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navData) => {
  const mealTitle = navData.navigation.getParam('mealTitle');
  const toggleFav = navData.navigation.getParam('toggleFav');
  const isFavorite = navData.navigation.getParam('isFav');
  return {
    headerTitle: mealTitle,
    headerRight:  () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Favorite'
          iconName={isFavorite ?  'ios-star' : 'ios-star-outline'}
          onPress={toggleFav} />
      </HeaderButtons>
    )
  }
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
});

export default MealDetailScreen;
