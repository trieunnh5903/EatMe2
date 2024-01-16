import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, {useRef, useEffect, useCallback} from 'react';
import {icons, COLORS, SIZES, FONTS, images} from '../../config';
import {
  BadgeButton,
  Break,
  Carousel,
  CountDown,
  HeaderCustom,
  HorizontalCardSkeleton,
  HorizontalRestaurantCard,
} from '../../components';
import {FlashList} from '@shopify/flash-list';
import {Restaurant} from '../../types/types';
import dummy_data from '../../dummy_data';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenProp} from '../../types/navigation.type';
import {useSelectTotalCart} from '../../redux/hooks';
import {useAppSelector} from '../../redux/store';
import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchAllRestaurant} from '../../services/restaurant.service';
import {ActivityIndicator} from 'react-native';
import {FontAwesome5, Fontisto, Ionicons} from '../../utils';
import ListFeaturedHorizontal from './ListFeaturedHorizontal';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenProp['navigation']>();
  const carouselRef = useRef<FlatList>(null);
  const carouselIndex = useRef(0);
  const carouselIntervalId = useRef<NodeJS.Timeout>();
  const totalIndex = dummy_data.carousel.length - 1;
  const totalCart = useAppSelector(useSelectTotalCart);

  const {
    data: allFoods,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['getAllRestaurants'],
    queryFn: fetchAllRestaurant,
    getNextPageParam: (_lastPage, allPage) => {
      return allPage.length + 1;
    },
  });

  // event
  const onRestaurantItemPress = (item: Restaurant) =>
    navigation.navigate('DetailRestaurant', {
      restaurantId: item.id,
    });

  const onEnterAddressPress = () =>
    navigation.navigate('EnterAddressScreen', {enableGoogleMap: false});

  const onListInvoicesPress = () => navigation.navigate('ListInvoices');

  // carousel event
  const startAutoScrollCarousel = useCallback(() => {
    const id = setInterval(() => {
      if (carouselIndex.current < totalIndex) {
        carouselRef?.current?.scrollToIndex({
          index: carouselIndex.current + 1,
          animated: true,
        });
      } else {
        carouselRef?.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      }
    }, 4000);
    carouselIntervalId.current = id;
  }, [totalIndex]);

  const restartAutoScrollCarousel = useCallback(() => {
    clearInterval(carouselIntervalId.current);
    startAutoScrollCarousel();
  }, [startAutoScrollCarousel]);

  const onCarouselScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      restartAutoScrollCarousel();
      const scrollOffset = event.nativeEvent.contentOffset.x;
      const index = parseInt(
        (scrollOffset / (SIZES.width - 2 * SIZES.padding)).toString(),
        10,
      );
      carouselIndex.current = index;
    },
    [restartAutoScrollCarousel],
  );

  useEffect(() => {
    startAutoScrollCarousel();

    return () => clearInterval(carouselIntervalId.current);
  }, [startAutoScrollCarousel]);

  // render
  const renderFooter = () => {
    return (
      isFetchingNextPage && (
        <ActivityIndicator
          style={styles.indicator}
          size="small"
          color={COLORS.primary}
        />
      )
    );
  };

  const onMenuPress = async () => {};

  const handleEmailPress = () => {
    navigation.navigate('Notification');
  };
  const renderHeader = () => {
    return (
      <View>
        <HeaderCustom
          containerStyle={styles.headerContainer}
          rightComponent={
            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableOpacity onPress={handleEmailPress}>
                <Fontisto name="email" size={18} color={COLORS.black} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onMenuPress}>
                <Ionicons name="menu" size={18} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          }
          leftComponent={
            <TouchableOpacity
              style={[styles.deliveryTo, {gap: 6}]}
              onPress={() => onEnterAddressPress()}>
              <FontAwesome5
                name="map-marker-alt"
                color={COLORS.primary}
                size={16}
              />
              <Text style={styles.deliveryAddress}>
                {dummy_data?.myProfile?.address}
              </Text>
              <Image source={icons.chevron_right} style={styles.icon} />
            </TouchableOpacity>
          }
        />
      </View>
    );
  };

  const renderSearch = () => {
    return (
      <TouchableOpacity style={[styles.searchContainer]}>
        {/* icon */}
        <Image
          source={icons.search}
          style={{width: 16, height: 16}}
          tintColor={COLORS.gray}
        />
        <Text style={[FONTS.body_medium, {color: COLORS.gray}]}>
          Tìm nhà hàng, món ăn
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <FlashList
        ListHeaderComponent={
          <View>
            {/* header */}
            {renderHeader()}

            {/* search */}
            {renderSearch()}
            <View style={{height: SIZES.padding}} />

            {/* carousel */}
            <Carousel innerRef={carouselRef} onScroll={onCarouselScroll} />

            {/* category */}
            {renderCategories()}

            {/* banner */}
            <TouchableOpacity style={{alignItems: 'center'}}>
              <Image
                source={images.banner1}
                resizeMode="contain"
                style={{width: SIZES.width - 32}}
              />
            </TouchableOpacity>

            {/* list popular */}
            {dummy_data.featureCategory.map(feature => {
              return (
                <View key={feature.id}>
                  <Break marginVertical={30} />
                  {feature.title === 'Quán mới khao đến 50%' && (
                    <View style={{marginBottom: 5, marginLeft: 20}}>
                      <CountDown time={7200} />
                    </View>
                  )}
                  <ListFeaturedHorizontal
                    feature={feature}
                    onRestaurantItemPress={onRestaurantItemPress}
                  />
                </View>
              );
            })}
            <Break height={10} marginTop={30} marginBottom={10} />
            <Text style={styles.headlineNearYou}>Quanh đây có gì ngon?</Text>
          </View>
        }
        overScrollMode="never"
        estimatedItemSize={100}
        keyExtractor={item => item.id}
        data={allFoods?.pages.flat()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Break height={1} />}
        renderItem={({item}: {item: Restaurant}) => {
          return (
            <HorizontalRestaurantCard
              onPress={() => onRestaurantItemPress(item)}
              item={item}
              containerStyle={styles.horizontalFoodCard}
              imageStyle={styles.imageRestaurant}
              textWrapperStyle={styles.textRestaurantWrapper}
            />
          );
        }}
        ListEmptyComponent={
          <FlatList
            data={[...Array(4).keys()]}
            ListHeaderComponent={<View style={{height: 10}} />}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            keyExtractor={item => item.toString()}
            renderItem={() => <HorizontalCardSkeleton />}
          />
        }
        onEndReached={() => {
          console.log('onEndReached');
          if (
            allFoods &&
            allFoods?.pages.length > 0 &&
            allFoods.pageParams.length < 4
          ) {
            fetchNextPage();
          }
        }}
        ListFooterComponent={
          <View style={styles.footerWrapper}>{renderFooter()}</View>
        }
        onEndReachedThreshold={0.5}
      />

      {totalCart > 0 && (
        <BadgeButton
          onPress={onListInvoicesPress}
          badgeText={totalCart.toString()}
          icon={icons.cart_fill}
          iconStyle={styles.iconCart}
          containerStyle={styles.btnCart}
          badgeContainerStyle={{width: '38%', height: '38%'}}
        />
      )}
    </SafeAreaView>
  );
};

const renderCategories = () => (
  <View style={{padding: 16, gap: 16}}>
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity>
        <Image resizeMode="cover" source={icons.mart} style={styles.imgMart} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          resizeMode="cover"
          source={icons.kitchen}
          style={{height: 60, width: 60 * (146 / 52)}}
        />
      </TouchableOpacity>
    </View>
    <View style={styles.categoriesWrapper}>
      {dummy_data.categories.map(item => {
        return (
          <TouchableOpacity key={item.id} style={styles.categoriesItem}>
            <Image source={item.icon} style={styles.categoryImage} />
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
  </View>
);

export default HomeScreen;

const styles = StyleSheet.create({
  imgMart: {
    height: 60,
    width: 60 * (120 / 52),
  },

  footerWrapper: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textRestaurantWrapper: {
    height: SIZES.width * 0.25,
  },
  imageRestaurant: {
    width: SIZES.width * 0.25,
    height: SIZES.width * 0.25,
  },
  btnCart: {
    width: 70,
    height: 70,
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: SIZES.height * 0.1,
    right: SIZES.padding,
    elevation: 5,
  },
  iconCart: {
    tintColor: COLORS.primary,
    width: 35,
    height: 35,
  },
  popularContainer: {width: SIZES.width * 0.4, marginLeft: SIZES.padding},
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
    ...FONTS.title_large,
    color: COLORS.blackText,
  },
  headerContainer: {
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
    height: null,
    paddingVertical: 10,
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
    marginVertical: SIZES.padding,
    marginHorizontal: SIZES.padding,
  },
  categoryImage: {width: 38, height: 38, resizeMode: 'contain'},
  sectionSubtitle: {
    ...FONTS.body_medium,
    color: COLORS.gray,
  },

  sectionHeadline: {
    ...FONTS.title_large,
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
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerWrapper: {
    flex: 1,
    width: SIZES.width,
  },
  profile: {
    width: 24,
    height: 24,
    borderRadius: 24,
  },
  deliveryTo: {
    flexDirection: 'row',
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
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
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
    height: 34,
    backgroundColor: COLORS.lightGray2,
    marginHorizontal: SIZES.padding,
    paddingHorizontal: 12,
    borderRadius: SIZES.padding,
    alignItems: 'center',
    gap: 6,
  },
});
