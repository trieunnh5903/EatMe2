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
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES, icons} from '../config';
import {ButtonText, HorizontalFoodCard, Break} from '../components';
import {useQuery} from '@tanstack/react-query';
import {fetchSearchResults} from '../services/food.service';
import data from '../data';
import {SreachScreenProp} from '../navigation/types';

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

const SearchScreen = ({navigation}: SreachScreenProp) => {
  const [keyword, setKeyword] = useState('');

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
                {data.mostSrearched.map(item => (
                  <Chips
                    key={item.label}
                    label={item.label}
                    onPress={() => console.log('Chips press', item.label)}
                  />
                ))}
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
            ItemSeparatorComponent={() => (
              <Break height={1} marginTop={2 * SIZES.spacing} />
            )}
            keyExtractor={(_item, index) => `${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <HorizontalFoodCard
                  imageStyle={styles.imageCard}
                  onPress={() =>
                    navigation.navigate('DetailFood', {
                      foodItem: {...item, priceTotal: 0, quantity: 0},
                    })
                  }
                  item={item}
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
  },

  horizontalFoodCard: {
    height: 150,
  },

  icon: {
    width: 24,
    height: 24,
    tintColor: COLORS.gray,
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
