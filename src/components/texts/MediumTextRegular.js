import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


const MediumTextRegular = ({children, style, ...rest}) => {
    const {colors} = useTheme()
    return (
        <View>
            <Text style={{...styles.text, color: colors.text, ...style}} {...rest}>{children}</Text>
        </View>
    )
}

export default MediumTextRegular

const styles = StyleSheet.create({
    text: {
        fontFamily: "metropolis-regular",
        lineHeight: 20,
        fontSize: 16
    }
})
