import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  SafeAreaView,
  GestureResponderEvent,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
} from 'react-native';
import React, {
  ReactNode,
  useRef,
  useEffect,
  memo,
  useMemo,
  useCallback,
} from 'react';
import {icons, COLORS, SIZES, FONTS, images} from '../config';
import {
  BadgeButton,
  Break,
  ButtonIcon,
  HeaderCustom,
  HorizontalCardSkeleton,
  HorizontalRestaurantCard,
  VerticalRestaurantCard,
} from '../components';
import {FlashList} from '@shopify/flash-list';
import {Restaurant} from '../types/types';
import dummy_data from '../data';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenProp} from '../types/navigation.type';
import {useSelectTotalCart} from '../redux/hooks';
import {useAppSelector} from '../redux/store';

interface SectionProps {
  title: string;
  subtitle: string;
  onPress: (event: GestureResponderEvent) => void;
  children: ReactNode;
  style?: ViewStyle;
}

const HomeScreen = () => {
  console.log('HomeScreen');
  const navigation = useNavigation<HomeScreenProp['navigation']>();
  const carouselRef = useRef<FlatList>(null);
  let carouselIndex = useRef(0);
  const totalIndex = dummy_data.carousel.length - 1;
  const totalCart = useAppSelector(useSelectTotalCart);

  useEffect(() => {
    let timer = setInterval(() => {
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

    return () => clearInterval(timer);
  }, [totalIndex]);

  const getItemLayoutCarousel = useMemo(
    () => (index: number) => {
      let itemWidth;
      if (index === 0) {
        itemWidth = SIZES.width - 2 * SIZES.padding + SIZES.padding;
      } else if (index === dummy_data.carousel.length - 1) {
        itemWidth = SIZES.width - 2 * SIZES.padding + 20;
      } else {
        itemWidth = SIZES.width - 2 * SIZES.padding + 10;
      }
      return {
        length: itemWidth,
        offset: itemWidth * index,
        index,
      };
    },
    [],
  );

  const onCarouselScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollOffset = event.nativeEvent.contentOffset.x;
      const index = parseInt(
        (scrollOffset / (SIZES.width - 2 * SIZES.padding)).toString(),
        10,
      );
      carouselIndex.current = index;
    },
    [],
  );

  const onRestaurantItemPress = (item: Restaurant) =>
    navigation.navigate('DetailRestaurant', {
      restaurant: item,
    });

  const onEnterAddressPress = () =>
    navigation.navigate('EnterAddressScreen', {enableGoogleMap: false});

  const onListCartPress = () => navigation.navigate('ListCart');
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
                    icon={icons.notification}
                    iconStyle={styles.icon}
                    badgeContainerStyle={styles.badgeNotification}
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
                onPress={() => onEnterAddressPress()}
                style={styles.deliveryTo}>
                <Text style={styles.deliveryAddress}>
                  {dummy_data?.myProfile?.address}
                </Text>
                <Image source={icons.down_arrow} style={styles.icon} />
              </TouchableOpacity>
            </View>
            {/* carousel */}
            <FlatList
              onScroll={onCarouselScroll}
              ref={carouselRef}
              data={dummy_data.carousel}
              style={{marginTop: SIZES.padding}}
              keyExtractor={item => `${item.id}`}
              horizontal
              decelerationRate="fast"
              snapToInterval={SIZES.width - 2 * SIZES.padding + 10}
              getItemLayout={(_, index) => getItemLayoutCarousel(index)}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return <CarouselItem item={item} index={index} />;
              }}
            />
            {/* category */}
            <Categories />
            {/* list popular */}
            {dummy_data.featureCategory.map(feature => {
              return (
                <View key={feature.id}>
                  <Break marginVertical={30} />
                  <Section
                    subtitle={feature.subtitle}
                    onPress={() => console.log(feature.title + 'pressed')}
                    title={feature.title}>
                    <FlatList
                      data={feature.restaurants}
                      keyExtractor={item => `${item.id}`}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        const marginRight =
                          index === feature.restaurants.length - 1
                            ? SIZES.padding
                            : 0;
                        return (
                          <VerticalRestaurantCard
                            onPress={() => onRestaurantItemPress(item)}
                            item={item}
                            containerStyle={[
                              styles.popularContainer,
                              {marginRight: marginRight},
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
                            <Text
                              style={{
                                color: COLORS.primary,
                                ...FONTS.title_medium,
                              }}>
                              Xem tất cả
                            </Text>
                          </TouchableOpacity>
                        </View>
                      }
                    />
                  </Section>
                </View>
              );
            })}
            <Break height={10} marginTop={30} marginBottom={10} />
            <Text style={styles.headlineNearYou}>Quanh đây có gì ngon?</Text>
          </View>
        }
        estimatedItemSize={150}
        data={dummy_data.popularRestaurant}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Break height={1} />}
        renderItem={({item}: {item: Restaurant}) => {
          return (
            <HorizontalRestaurantCard
              onPress={() => onRestaurantItemPress(item)}
              item={item}
              containerStyle={styles.horizontalFoodCard}
              imageStyle={{
                width: SIZES.width * 0.25,
                height: SIZES.width * 0.25,
              }}
              textWrapperStyle={{
                height: SIZES.width * 0.25,
              }}
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
        // onEndReached={onEndReached}
        // ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.3}
      />
      {totalCart > 0 && (
        <BadgeButton
          onPress={onListCartPress}
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

const Section: React.FC<SectionProps> = memo(
  ({title, subtitle, onPress, children, style}) => {
    return (
      <Pressable onPress={onPress}>
        <View style={[styles.section, style]}>
          <View style={{flex: 1}}>
            <Text style={styles.sectionHeadline}>{title}</Text>
            <Text style={styles.sectionSubtitle}>{subtitle}</Text>
          </View>
          <Image
            source={icons.chevron_right}
            style={[styles.icon, {marginLeft: SIZES.spacing}]}
          />
        </View>
        {children}
      </Pressable>
    );
  },
);

const Categories = () => (
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
);

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
    const marginRight = index === dummy_data.carousel.length - 1 ? 10 : 0;
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
        {item.image ? (
          <Image
            source={{uri: item.image}}
            resizeMode="cover"
            style={styles.carouselImage}
          />
        ) : (
          <Image source={images.logo_03} />
        )}
      </TouchableOpacity>
    );
  },
);

export default HomeScreen;

const styles = StyleSheet.create({
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
  categoryImage: {width: 48, height: 48, resizeMode: 'contain'},
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
    height: 40,
    backgroundColor: COLORS.lightGray2,
    marginVertical: SIZES.radius,
    marginHorizontal: SIZES.padding,
    paddingHorizontal: 12,
    borderRadius: SIZES.padding,
    alignItems: 'center',
  },
});
