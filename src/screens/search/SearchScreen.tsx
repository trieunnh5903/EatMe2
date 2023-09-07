import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  GestureResponderEvent,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {COLORS, FONTS, SIZES, icons} from '../../config';
import {useNavigation} from '@react-navigation/native';
import {
  ButtonText,
  HorizontalFoodCard,
  VerticalFoodCard,
  ButtonIcon,
} from '../../components';
import {FoodObject} from '../types';
import {nanoid} from '@reduxjs/toolkit';
import {useQuery} from '@tanstack/react-query';
import {fetchSearchResults} from '../../services/food.service';

interface SearchInputProps {
  keyword?: string;
  onChangeText?: (text: string) => void;
  onDeletePress?: (event: GestureResponderEvent) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  keyword,
  onChangeText,
  onDeletePress,
}) => {
  return (
    <View style={styles.searchContainer}>
      {/* icon */}
      <Image source={icons.search} style={styles.icon} />
      {/* text input */}
      <TextInput
        value={keyword}
        onChangeText={onChangeText}
        cursorColor={COLORS.black}
        placeholder="Tìm kiếm món ăn"
        style={styles.searchInput}
      />
      {/* filter */}
      {keyword && (
        <TouchableOpacity onPress={onDeletePress}>
          <Image source={icons.close} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const Chips = ({
  label,
  onPress,
}: {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
}) => (
  <ButtonText
    onPress={onPress}
    label={label}
    labelStyle={{
      color: COLORS.gray,
      ...FONTS.label_large,
    }}
    containerStyle={styles.chipContainer}
  />
);

const SearchScreen = () => {
  const _enerateArray = useCallback((n: number) => {
    let data = new Array<FoodObject>(n);
    for (let i = 0; i < n; i++) {
      data[i] = {
        id: nanoid(),
        name: `Hamburger ${i}`,
        description: 'Hamburger thịt gà',
        categories: [1, 2],
        priceTotal: 0,
        quantity: 0,
        price: 15.99,
        calories: 78,
        image:
          'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
      };
    }
    return data;
  }, []);
  const [keyword, setKeyword] = useState('');
  const navigation = useNavigation();

  const {data: searchResult} = useQuery({
    queryKey: ['search', keyword],
    queryFn: async () => {
      const data = await fetchSearchResults(keyword);
      return data;
    },
    enabled: !!keyword,
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.headerWrapper}>
        <SearchInput
          keyword={keyword}
          onChangeText={value => setKeyword(value)}
          onDeletePress={() => setKeyword('')}
        />
      </View>
      {/* list */}
      {!searchResult ? (
        // before search
        <TouchableWithoutFeedback
          style={{flex: 1}}
          touchSoundDisabled
          onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <View
              style={{
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.radius,
              }}>
              <Text
                style={{
                  color: COLORS.blackText,
                  ...FONTS.title_medium,
                  marginBottom: SIZES.radius,
                }}>
                Tìm kiếm nhiều
              </Text>
              <View style={styles.chipGroup}>
                <Chips
                  label={'Cơm'}
                  onPress={() => console.log('Chips press')}
                />
                <Chips
                  label={'Bún'}
                  onPress={() => console.log('Chips press')}
                />
                <Chips
                  label={'Bánh mì'}
                  onPress={() => console.log('Chips press')}
                />
                <Chips
                  label={'Pizza'}
                  onPress={() => console.log('Chips press')}
                />
                <Chips
                  label={'Hamburger'}
                  onPress={() => console.log('Chips press')}
                />
                <Chips
                  label={'Bánh ngọt'}
                  onPress={() => console.log('Chips press')}
                />
                <Chips
                  label={'Coca'}
                  onPress={() => console.log('Chips press')}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        // after search
        <>
          <View style={styles.filterContainer}>
            {searchResult.length === 0 ? (
              <Text style={{color: COLORS.gray, ...FONTS.body_medium}}>
                Không tìm thấy sản phẩm
              </Text>
            ) : (
              <Text style={{color: COLORS.gray, ...FONTS.body_medium}}>
                Tìm thấy {searchResult.length}+ sản phẩm
              </Text>
            )}
          </View>
          <FlatList
            data={searchResult}
            keyExtractor={(item, index) => `${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <HorizontalFoodCard
                  imageStyle={styles.imageCard}
                  // onPress={() => navigation.navigate('DetailFood', item)}
                  item={item}
                  containerStyle={styles.horizontalFoodCard}
                />
              );
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  buttonFilterContainer: {
    borderRadius: SIZES.padding,
    borderColor: COLORS.gray3,
    height: 30,
    paddingHorizontal: SIZES.spacing,
    borderWidth: 1,
    marginTop: -SIZES.base,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.padding,
    marginBottom: SIZES.radius,
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  foodItemImage: {
    width: 120,
    height: 120,
    marginTop: SIZES.radius,
  },

  buttonFilterIcon: {
    width: 16,
    height: 16,
    marginRight: SIZES.base,
    tintColor: COLORS.gray,
  },
  foodItemContainer: {
    padding: SIZES.radius,
    width: 210,
  },
  popularHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.radius,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    marginTop: SIZES.radius,
  },

  imageCard: {
    width: 110,
    height: 110,
    marginTop: 20,
  },

  horizontalFoodCard: {
    height: 150,
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.radius,
  },

  icon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
  searchInput: {
    ...FONTS.body_medium,
    flex: 1,
    marginLeft: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 46,
    backgroundColor: COLORS.lightGray2,
    paddingHorizontal: 12,
    borderRadius: SIZES.padding,
    alignItems: 'center',
  },

  chipContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    height: 40,
    marginRight: SIZES.spacing,
    marginBottom: SIZES.spacing,
    borderRadius: SIZES.padding,
    backgroundColor: COLORS.lightGray2,
    paddingHorizontal: SIZES.padding,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.radius,
  },
});
