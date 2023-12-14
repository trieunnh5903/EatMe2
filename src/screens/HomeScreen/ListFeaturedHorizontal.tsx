import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Section from './Section';
import {Feature, Restaurant} from '../../types/types';
import {ButtonIcon, VerticalRestaurantCard} from '../../components';
import {COLORS, FONTS, SIZES, icons} from '../../config';

interface ListFeaturedHorizontalProps {
  feature: Feature;
  onRestaurantItemPress: (item: Restaurant) => void;
}
const ListFeaturedHorizontal: React.FC<ListFeaturedHorizontalProps> = ({
  feature,
  onRestaurantItemPress,
}) => {
  return (
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
            index === feature.restaurants.length - 1 ? SIZES.padding : 0;
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
  );
};

export default ListFeaturedHorizontal;

const styles = StyleSheet.create({
  btnWatchAll: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 100,
  },
  popularImage: {
    width: '100%',
    height: 150,
  },
  popularContainer: {width: SIZES.width * 0.4, marginLeft: SIZES.padding},
  footerHorizontalListWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZES.width * 0.4,
    marginRight: SIZES.padding,
  },
});
