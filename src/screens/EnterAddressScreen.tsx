import {Image, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, FONTS, icons} from '../config';
import {HeaderCustom} from '../components';
import {EnterAddressScreenProps} from '../navigation/types';
import SearchInput from '../components/SearchInput';
import {FlashList} from '@shopify/flash-list';
import {useAppSelector} from '../utils/hooks';

const EnterAddressScreen = ({navigation}: EnterAddressScreenProps) => {
  const [keyAddress, setKeyAddress] = useState('');
  const {address} = useAppSelector(state => state.user);
  return (
    <View style={styles.container}>
      {/* header */}
      <HeaderCustom
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.arrow_back} style={styles.iconHeader} />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity>
            <Image source={icons.map} style={styles.iconHeader} />
          </TouchableOpacity>
        }
        title={'Nhập địa chỉ'}
      />

      <SearchInput
        keyword={keyAddress}
        onDeletePress={() => setKeyAddress('')}
        onChangeText={value => setKeyAddress(value)}
        placeholder="Địa điểm hiện tại của bạn ở đâu"
      />

      {/* my address */}
      <View style={styles.myAddressWrapper}>
        <Text style={styles.textTitle}>Địa chỉ của tôi</Text>
        <TouchableOpacity>
          <Text style={styles.textEdit}>Chỉnh sửa</Text>
        </TouchableOpacity>
      </View>
      <FlashList
        data={address}
        keyExtractor={item => item.name}
        estimatedItemSize={70}
        ListEmptyComponent={<View />}
        ListFooterComponent={
          <TouchableOpacity style={styles.listFooter}>
            <Image source={icons.add_wght700} style={styles.icon} />
            <Text style={styles.textAdd}>Thêm địa chỉ</Text>
          </TouchableOpacity>
        }
        renderItem={({item}) => {
          return (
            <View>
              <Text>{item.name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default EnterAddressScreen;

const styles = StyleSheet.create({
  listFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
  },

  textAdd: {
    marginLeft: SIZES.spacing,
    color: COLORS.primary,
    ...FONTS.label_large,
  },

  myAddressWrapper: {
    marginTop: 2 * SIZES.spacing,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textTitle: {
    color: COLORS.blackText,
    ...FONTS.label_large,
  },

  textEdit: {
    color: COLORS.primary,
    ...FONTS.label_large,
  },

  icon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary,
  },

  iconHeader: {
    width: 30,
    height: 30,
    tintColor: COLORS.black,
  },

  headerRight: {
    width: 30,
    height: 30,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.spacing,
  },
});
