import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES, icons } from '../../config'

const ButtonQuantityCart = ({ onPress, quantity, disabled = false }) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}
            onPress={onPress}>
            <Image source={icons.cart} style={styles.iconStyle} />
            <View style={styles.badge}>
                <Text style={styles.quantity}>{quantity}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ButtonQuantityCart

const styles = StyleSheet.create({
    quantity: {
        ...FONTS.body5,
        color: COLORS.white,
        fontSize: 10,
        lineHeight: 14
    },

    container: {
        backgroundColor: COLORS.lightOrange2,
        borderRadius: SIZES.radius,
        width: 40,
        height: 40,
    },
    badge: {
        position: 'absolute',
        width: 15,
        height: 15,
        borderRadius: 15,
        backgroundColor: COLORS.primary,
        top: 5,
        right: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconStyle: {
        width: 20,
        height: 20,
        tintColor: COLORS.black
    }
})