import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native';
import React, {ReactNode, useCallback, useEffect, useState, memo} from 'react';
import {icons, COLORS, SIZES, FONTS, images} from '../../config';
import data from '../../data';
import Carousel from 'react-native-reanimated-carousel';

import {
  BadgeButton,
  HeaderCustom,
  HorizontalFoodCard,
  VerticalFoodCard,
} from '../../components';
import {nanoid} from '@reduxjs/toolkit';
import {useNavigation} from '@react-navigation/native';
import {FoodArray, FoodObject} from '../types';
import {HomeScreenNavigationProp, HomeScreenProp} from '../../navigation/types';
import {useAppDispatch} from '../../utils/hooks';
import FastImage from 'react-native-fast-image';

interface SectionProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  children: ReactNode;
  style?: ViewStyle;
}

const Section: React.FC<SectionProps> = ({title, onPress, children, style}) => {
  return (
    <View>
      <View style={[styles.section, style]}>
        <Text style={styles.sectionHeadline}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={{color: COLORS.primary, ...FONTS.title_medium}}>
            Tất cả
          </Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

const Categories = () => (
  <View style={styles.categoriesWrapper}>
    {data.categories.map(item => {
      return (
        <TouchableOpacity key={item.id} style={styles.categoriesItem}>
          <FastImage source={item.icon} style={styles.categoryImage} />
          <Text
            style={{
              color: COLORS.blackText,
              ...FONTS.label_large,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const RecommendedSection: React.FC<FoodArray> = ({data: recommends}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <Section
      title={'Gợi ý'}
      onPress={() => console.log('show all recommended')}>
      <FlatList
        data={recommends}
        keyExtractor={item => `${item.id}`}
        horizontal
        decelerationRate="fast"
        snapToInterval={SIZES.width * 0.85 + 18}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <HorizontalFoodCard
              onPress={() =>
                navigation.navigate('DetailFood', {foodItem: item})
              }
              imageStyle={styles.recommendImage}
              item={item}
              containerStyle={[
                styles.recommendContainer,
                {
                  marginLeft: index === 0 ? SIZES.padding : 18,
                  marginRight:
                    index === recommends.length - 1 ? SIZES.padding : 0,
                },
              ]}
            />
          );
        }}
      />
    </Section>
  );
};

const PopularSection: React.FC<FoodArray> = ({data}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <Section
      style={{marginTop: 0}}
      onPress={() => console.log('Popular section')}
      title={'Phổ biến'}>
      <FlatList
        data={data}
        keyExtractor={item => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <VerticalFoodCard
              onPress={() =>
                navigation.navigate('DetailFood', {foodItem: item})
              }
              item={item}
              containerStyle={[
                styles.popularContainer,
                {
                  marginLeft: index == 0 ? SIZES.padding : 18,
                  marginRight: index == data.length - 1 ? SIZES.padding : 0,
                },
              ]}
              imageStyle={styles.popularImage}
            />
          );
        }}
      />
    </Section>
  );
};

const DeliveryTo = () => {
  return (
    <View
      style={{
        marginHorizontal: SIZES.padding,
      }}>
      <Text
        style={{
          color: COLORS.primary,
          ...FONTS.title_medium,
        }}>
        GIAO ĐẾN
      </Text>

      <TouchableOpacity
        // onPress={() => navigation.navigate('EnterAddress')}
        style={styles.deliveryTo}>
        <Text style={styles.deliveryAddress}>{data?.myProfile?.address}</Text>
        <Image source={icons.down_arrow} style={{width: 24, height: 24}} />
      </TouchableOpacity>
    </View>
  );
};

const CarouselItem = memo(
  ({
    item,
    index,
  }: {
    item: {
      id: number;
      image: any;
    };
    index: number;
  }) => {
    const marginRight = index === data.carousel.length - 1 ? 10 : 0;
    const marginLeft = index === 0 ? SIZES.padding : 10;
    return (
      <TouchableOpacity
        onPress={() => console.log(item.id)}
        style={{
          width: SIZES.width - 2 * SIZES.padding,
          height: SIZES.width / 2,
          marginRight: marginRight,
          marginLeft: marginLeft,
        }}>
        <FastImage
          source={item.image}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.carouselImage}
        />
      </TouchableOpacity>
    );
  },
);
const HomeScreen = ({navigation}: HomeScreenProp) => {
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
  const [popular, setPopular] = useState<FoodObject[]>(_enerateArray(20));
  // {navigation}: HomeNavigationProps
  // const {navigation} = useNavigation<HomeNavigationProps>();
  //   const dispatch = useDispatch();
  //   const {isLoading, foodList, error} = useSelector(state => state.food);

  //   const navigation = useNavigation();
  //   useEffect(() => {
  //     dispatch({type: 'food/fetchFoodRequested'});
  //   }, [dispatch]);

  //   const handleLoadMore = () => {
  //     // console.log("handleLoadMore");
  //     dispatch({type: 'food/fetchFoodRequested'});
  //   };

  const renderFooter = () => {
    return (
      <ActivityIndicator
        style={styles.indicator}
        size="small"
        color={COLORS.primary}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        {/* header */}
        <View style={styles.headerWrapper}>
          <HeaderCustom
            containerStyle={styles.headerContainer}
            rightComponent={
              <BadgeButton
                // onPress={() => navigation.navigate('Notification')}
                icon={icons.notification}
                iconStyle={styles.icon}
                badgeStyle={styles.badgeNotification}
              />
            }
            leftComponent={
              <View>
                <Image source={images.logo_02} style={styles.logo} />
              </View>
            }
          />
        </View>
        {/* delivery to */}
        <DeliveryTo />
        {/* carousel */}
        <FlatList
          data={data.carousel}
          style={{marginTop: SIZES.radius}}
          keyExtractor={item => `${item.id}`}
          horizontal
          decelerationRate="fast"
          snapToInterval={SIZES.width - 2 * SIZES.padding + 10}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return <CarouselItem item={item} index={index} />;
          }}
        />
        {/* category */}
        <Categories />
        {/* list popular */}
        <PopularSection data={popular} />
        {/* list recommended */}
        <RecommendedSection data={popular} />
        {/* list nearby you*/}
        <Text style={styles.headlineNearYou}>Gần bạn</Text>
        <FlatList
          data={popular}
          style={{flex: 1}}
          contentContainerStyle={{flex: 1}}
          scrollEnabled={false}
          keyExtractor={(item, index) => `${index}`}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <HorizontalFoodCard
                imageStyle={styles.imageCard}
                onPress={() =>
                  navigation.navigate('DetailFood', {foodItem: item})
                }
                item={item}
                containerStyle={styles.horizontalFoodCard}
              />
            );
          }}
          //   onEndReached={handleLoadMore}
          //   onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  popularContainer: {padding: SIZES.radius, width: 210},
  deliveryAddress: {
    ...FONTS.title_medium,
    color: COLORS.blackText,
    fontWeight: 'bold',
  },
  carouselImage: {
    width: null,
    height: null,
    borderRadius: 10,
    flex: 1,
  },
  popularImage: {
    width: 150,
    height: 150,
    marginTop: SIZES.radius,
  },
  recommendImage: {
    marginTop: 35,
    height: 150,
    width: 150,
  },
  recommendContainer: {
    height: 180,
    width: SIZES.width * 0.85,
    paddingRight: SIZES.radius,
    alignItems: 'center',
  },
  headlineNearYou: {
    marginTop: 30,
    marginHorizontal: SIZES.padding,
    marginBottom: 20,
    fontWeight: 'bold',
    ...FONTS.headline_small,
    color: COLORS.blackText,
  },
  headerContainer: {
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
  },
  indicator: {
    alignSelf: 'flex-start',
    marginVertical: SIZES.radius,
    marginHorizontal: SIZES.padding,
  },
  categoryImage: {width: 48, height: 48, resizeMode: 'contain'},
  sectionHeadline: {
    ...FONTS.headline_small,
    fontWeight: 'bold',
    color: COLORS.blackText,
  },

  categoriesItem: {
    minWidth: SIZES.width / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoriesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.radius,
    marginBottom: SIZES.padding,
    rowGap: 10,
    columnGap: 10,
  },

  badgeNotification: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    top: 0,
    right: 0,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerWrapper: {
    flex: 1,
    width: SIZES.width,
    backgroundColor: COLORS.white,
  },
  profile: {
    width: 24,
    height: 24,
    borderRadius: 24,
  },
  deliveryTo: {
    flexDirection: 'row',
    marginTop: SIZES.base,
    alignItems: 'center',
  },
  iconBottomTab: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
    width: 120,
  },

  section: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: SIZES.padding,
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
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
    flex: 1,
    marginLeft: 16,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  searchContainer: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: COLORS.lightGray2,
    marginVertical: SIZES.radius,
    marginHorizontal: SIZES.padding,
    paddingHorizontal: 12,
    borderRadius: SIZES.padding,
    alignItems: 'center',
  },
});
