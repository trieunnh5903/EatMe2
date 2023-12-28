import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import React, {memo, useMemo} from 'react';
import dummy_data from '../dummy_data';
import {SIZES, images} from '../config';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {ListRenderItem} from 'react-native';
import {FlatList} from 'react-native';

interface CarouselProps {
  innerRef?: React.Ref<FlatList<any>> | undefined;
  data?: any;
  renderItem?: ListRenderItem<any> | null | undefined;
  onScroll?:
    | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
    | undefined;
}
const Carousel: React.FC<CarouselProps> = ({innerRef, onScroll}) => {
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
  return (
    <FlatList
      onScroll={onScroll}
      ref={innerRef}
      data={dummy_data.carousel}
      keyExtractor={item => `carousel ${item.id}`}
      horizontal
      decelerationRate="fast"
      snapToInterval={SIZES.width - 2 * SIZES.padding + 10}
      getItemLayout={(_, index) => getItemLayoutCarousel(index)}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => {
        return <CarouselItem item={item} index={index} />;
      }}
    />
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
    const marginRight = index === dummy_data.carousel.length - 1 ? 10 : 0;
    const marginLeft = index === 0 ? SIZES.padding : 10;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => console.log(item.id)}
        style={{
          width: SIZES.width - 2 * SIZES.padding,
          height: SIZES.width / 2,
          marginRight: marginRight,
          marginLeft: marginLeft,
        }}>
        {item.image ? (
          <Image
            source={item.image}
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
export default Carousel;

const styles = StyleSheet.create({
  carouselImage: {
    width: null,
    height: null,
    borderRadius: 10,
    flex: 1,
  },
});
