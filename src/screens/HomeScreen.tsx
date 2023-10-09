import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  SafeAreaView,
  ActivityIndicator,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native';
import React, {ReactNode, memo} from 'react';
import {icons, COLORS, SIZES, FONTS, images} from '../config';
import data from '../data';

import {
  BadgeButton,
  Break,
  ButtonIcon,
  HeaderCustom,
  HorizontalCardSkeleton,
  VerticalCardSkeleton,
  VerticalShopCard,
  HorizontalShopCard,
} from '../components';
import {FlashList} from '@shopify/flash-list';
import useHomeController from '../view-controllers/useHomeController';
import {Shop} from '../types/types';

interface SectionProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  children: ReactNode;
  style?: ViewStyle;
}

interface ShopArray {
  data?: Shop[];
}

const HomeScreen = () => {
  const {
    carouselRef,
    listInvoices,
    getItemLayoutCarousel,
    onCarouselScroll,
    popularShop,
    onShopItemPress,
    shopNearYou,
    isLoading,
    onEndReached,
  } = useHomeController();

  // footer flashlist
  const renderFooter = () => {
    if (isLoading) {
      return;
    }
    if (shopNearYou?.pages && shopNearYou.pages.flat().length < 90) {
      return (
        <ActivityIndicator
          style={styles.indicator}
          size="small"
          color={COLORS.primary}
        />
      );
    }
  };

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
            <DeliveryTo />
            {/* carousel */}
            <FlatList
              onScroll={onCarouselScroll}
              ref={carouselRef}
              data={data.carousel}
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
            <Break marginVertical={30} />
            {/* list popular */}
            <PopularSection data={popularShop?.pages.flat()} />
            <Break marginTop={30} />
            {/* list recommended */}
            <RecommendedSection data={popularShop?.pages.flat()} />
            <Break marginTop={30} />
            <Text style={styles.headlineNearYou}>Gần bạn</Text>
          </View>
        }
        estimatedItemSize={150}
        data={shopNearYou?.pages.flat()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Break height={2} />}
        renderItem={({item}: {item: Shop}) => {
          return (
            <HorizontalShopCard
              onPress={() => onShopItemPress(item)}
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
        onEndReached={onEndReached}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.3}
      />
      {listInvoices?.length > 0 && (
        <BadgeButton
          badgeText={listInvoices.length.toString()}
          icon={icons.cart_fill}
          iconStyle={styles.iconCart}
          containerStyle={styles.btnCart}
          badgeContainerStyle={{width: '38%', height: '38%'}}
        />
      )}
    </SafeAreaView>
  );
};

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

const RecommendedSection: React.FC<ShopArray> = ({data: recommends = []}) => {
  const {onShopItemPress} = useHomeController();
  return (
    <Section
      title={'Gợi ý'}
      onPress={() => console.log('show all recommended')}>
      {recommends.length > 0 === false ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={[...Array(4).keys()]}
          keyExtractor={item => item.toString()}
          horizontal
          renderItem={({item: _item, index}) => (
            <VerticalCardSkeleton
              style={{marginRight: index === 3 ? SIZES.padding : 0}}
            />
          )}
        />
      ) : (
        <FlatList
          data={recommends}
          keyExtractor={item => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <VerticalShopCard
                onPress={() => onShopItemPress(item)}
                item={item}
                containerStyle={[
                  styles.popularContainer,
                  {
                    marginRight:
                      index === recommends.length - 1 ? SIZES.padding : 0,
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
      )}
    </Section>
  );
};

const PopularSection: React.FC<ShopArray> = ({data = []}) => {
  const {onShopItemPress} = useHomeController();
  return (
    <Section
      style={{marginTop: 0}}
      onPress={() => console.log('Popular section')}
      title={'Phổ biến'}>
      {data.length > 0 === false ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[...Array(5).keys()]} // Show 5 placeholder loaders
          keyExtractor={item => item.toString()}
          renderItem={({item: _item, index}) => (
            <VerticalCardSkeleton
              style={{marginRight: index === 4 ? SIZES.padding : 0}}
            />
          )}
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <VerticalShopCard
                onPress={() => onShopItemPress(item)}
                item={item}
                containerStyle={[
                  styles.popularContainer,
                  {
                    marginRight: index === data.length - 1 ? SIZES.padding : 0,
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
      )}
    </Section>
  );
};

const DeliveryTo = () => {
  const {onEnterAddressPress} = useHomeController();
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
        onPress={() => onEnterAddressPress()}
        style={styles.deliveryTo}>
        <Text style={styles.deliveryAddress}>{data?.myProfile?.address}</Text>
        <Image source={icons.down_arrow} style={styles.icon} />
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
    marginTop: 30,
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
