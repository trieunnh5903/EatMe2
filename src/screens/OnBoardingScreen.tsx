import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, images} from '../config';
import data from '../data';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import ButtonText from '../components/button/ButtonText';
import useOnboardingController from '../view-controllers/useOnboardingController';

interface ItemFlatlist {
  id: number;
  backgroundImage: any;
  bannerImage: any;
  title: string;
  description: string;
}

const OnBoardingScreen = () => {
  const {
    flastListRef,
    handleViewableItemsChanged,
    onNextPress,
    onScroll,
    scrollX,
    onSkipPress,
  } = useOnboardingController();

  // render item image flatlist
  const renderItem = ({item}: {item: ItemFlatlist}) => {
    return (
      <View style={styles.itemWrapper}>
        <View style={[styles.bannerImageWrapper]}>
          <Image
            resizeMode="contain"
            style={[styles.bannerImage]}
            source={item.bannerImage}
          />
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* logo */}
      <View style={styles.headerLogo}>
        <Image
          style={styles.logo}
          source={images.logo_02}
          resizeMode="contain"
        />
      </View>

      {/* image */}
      <Animated.FlatList
        ref={flastListRef}
        contentContainerStyle={{
          alignItems: 'flex-end',
        }}
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={{itemVisiblePercentThreshold: 50}}
        pagingEnabled
        horizontal
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        data={data.onboarding_screens}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
      />

      {/* dots */}
      <View
        style={{
          marginTop: SIZES.spacing,
        }}>
        <View style={styles.dotContainer}>
          {data.onboarding_screens.map((item, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const reanimatedStyle = useAnimatedStyle(() => {
              const inputRange = [
                (index - 1) * SIZES.width,
                index * SIZES.width,
                (index + 1) * SIZES.width,
              ];
              const backgroundColor = interpolateColor(
                scrollX.value,
                inputRange,
                [COLORS.lightOrange, COLORS.primary, COLORS.lightOrange],
              );
              const width = interpolate(
                scrollX.value,
                inputRange,
                [10, 30, 10],
                Extrapolate.CLAMP,
              );
              return {
                backgroundColor,
                width,
              };
            });
            return (
              <Animated.View
                key={`${item.id}`}
                style={[styles.dotItem, reanimatedStyle]}
              />
            );
          })}
        </View>
      </View>

      {/* button */}
      <View style={styles.btnSkipContainer}>
        <ButtonText
          onPress={onSkipPress}
          label={'Bỏ qua'}
          labelStyle={[FONTS.title_medium, {color: COLORS.gray}]}
        />
        <ButtonText
          onPress={onNextPress}
          label={'Tiếp tục'}
          labelStyle={[FONTS.title_medium, {color: COLORS.white}]}
          containerStyle={styles.btnNextContainer}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  dotContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnNextContainer: {
    backgroundColor: COLORS.primary,
    height: 60,
    width: SIZES.width * 0.5,
    borderRadius: SIZES.radius,
  },

  dotItem: {
    borderRadius: 10,
    marginHorizontal: SIZES.base,
    width: 10,
    height: 10,
    backgroundColor: COLORS.primary,
  },

  btnSkipContainer: {
    width: SIZES.width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
  itemWrapper: {width: SIZES.width, flex: 1},
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: SIZES.padding,
    padding: SIZES.base,
  },
  itemDescription: {
    color: COLORS.gray,
    textAlign: 'center',
    paddingHorizontal: SIZES.padding,
    marginTop: SIZES.radius,
    ...FONTS.body_large,
  },
  itemTitle: {
    color: COLORS.blackText,
    textAlign: 'center',
    ...FONTS.headline_medium,
  },
  bannerImage: {
    width: SIZES.width * 0.65,
    height: SIZES.width * 0.65,
    marginBottom: -30,
  },
  bannerImageWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.lightOrange2,
  },

  logo: {
    width: SIZES.width * 0.5,
    height: 100,
  },

  headerLogo: {
    width: '100%',
    backgroundColor: COLORS.lightOrange2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
