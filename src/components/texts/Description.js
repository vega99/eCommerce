import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Description = ({children}) => {
    const {colors} = useTheme()
    return (
        <View>
            <Text style={{...styles.text, color: colors.text}}>{children}</Text>
        </View>
    )
}

export default Description

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        textAlign: 'justify',
        lineHeight: 25,
        fontFamily: 'metropolis-regular'
    }
})
