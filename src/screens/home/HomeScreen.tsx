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
import {useInfiniteQuery} from '@tanstack/react-query';

import {
  BadgeButton,
  Break,
  ButtonIcon,
  HeaderCustom,
  HorizontalFoodCard,
  VerticalFoodCard,
} from '../../components';
import {nanoid} from '@reduxjs/toolkit';
import {useNavigation} from '@react-navigation/native';
import {FoodArray, FoodObject} from '../types';
import {HomeScreenNavigationProp, HomeScreenProp} from '../../navigation/types';
import FastImage from 'react-native-fast-image';
import {fetchAllFoods} from '../../services/food.service';
import {FlashList} from '@shopify/flash-list';

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
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <VerticalFoodCard
              onPress={() =>
                navigation.navigate('DetailFood', {
                  foodItem: {...item, priceTotal: 0, quantity: 0},
                })
              }
              item={item}
              containerStyle={[
                styles.popularContainer,
                {
                  marginLeft: SIZES.padding,
                  marginRight:
                    index == recommends.length - 1 ? SIZES.padding : 0,
                },
              ]}
              imageStyle={styles.popularImage}
            />
          );
        }}
        ListFooterComponent={
          <View style={styles.footerHorizontalListWrapper}>
            <TouchableOpacity>
              <ButtonIcon
                disabled={true}
                containerStyle={styles.btnWatchAll}
                iconStyle={{tintColor: COLORS.primary}}
                icon={icons.chevron_right}
              />
              <Text style={{color: COLORS.primary, ...FONTS.title_medium}}>
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
        }
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
                navigation.navigate('DetailFood', {
                  foodItem: {...item, priceTotal: 0, quantity: 0},
                })
              }
              item={item}
              containerStyle={[
                styles.popularContainer,
                {
                  marginLeft: SIZES.padding,
                  marginRight: index == data.length - 1 ? SIZES.padding : 0,
                },
              ]}
              imageStyle={styles.popularImage}
            />
          );
        }}
        ListFooterComponent={
          <View style={styles.footerHorizontalListWrapper}>
            <TouchableOpacity>
              <ButtonIcon
                disabled={true}
                containerStyle={styles.btnWatchAll}
                iconStyle={{tintColor: COLORS.primary}}
                icon={icons.chevron_right}
              />
              <Text style={{color: COLORS.primary, ...FONTS.title_medium}}>
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
        }
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
      image: string;
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
          source={{uri: item.image}}
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
          'https://images.foody.vn/res/g2/11349/prof/image-3111762a-200910114155.jpeg',
      };
    }
    return data;
  }, []);
  const [popular, setPopular] = useState<FoodObject[]>(_enerateArray(10));

  const fetchFoodNearYou = async ({pageParam = 1}) => {
    return await fetchAllFoods(pageParam);
  };

  const {
    data: foodNearYou,
    error,
    fetchStatus,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['food'],
    queryFn: fetchFoodNearYou,
    getNextPageParam: (_lastPage, allPage) => {
      return allPage.length + 1;
    },
  });

  if (status === 'error') {
    console.log(error);
  }

  const renderFooter = () => {
    return (
      <ActivityIndicator
        style={styles.indicator}
        size="small"
        color={COLORS.primary}
      />
    );
  };

  console.log(isFetching);

  return (
    <SafeAreaView style={[styles.container]}>
      <FlashList
        ListHeaderComponent={
          <View>
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
              style={{marginTop: SIZES.padding}}
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
            <Break marginVertical={30} />
            {/* list popular */}
            <PopularSection data={popular} />
            <Break marginTop={30} />
            {/* list recommended */}
            <RecommendedSection data={popular} />
            <Break marginTop={30} />
            <Text style={styles.headlineNearYou}>Gần bạn</Text>
          </View>
        }
        estimatedItemSize={150}
        data={foodNearYou?.pages.flat()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Break height={2} />}
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
              containerStyle={styles.horizontalFoodCard}
            />
          );
        }}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  popularContainer: {width: SIZES.width * 0.4},
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
    width: '100%',
    height: 150,
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
  btnWatchAll: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 100,
  },
  headlineNearYou: {
    marginTop: 20,
    marginHorizontal: SIZES.padding,
    fontWeight: 'bold',
    ...FONTS.headline_small,
    color: COLORS.blackText,
  },
  headerContainer: {
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
  },
  footerHorizontalListWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZES.width * 0.4,
    marginRight: SIZES.padding,
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
    marginTop: SIZES.padding,
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
  },

  horizontalFoodCard: {
    height: 150,
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
