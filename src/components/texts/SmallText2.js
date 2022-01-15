import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Smalltext2 = ({children, style, ...rest }) => {
    const {colors} = useTheme()
    return (
        <View>
            <Text style={{...styles.text, color: colors.border, ...style}} {...rest}>{children}</Text>
        </View>
    )
}

export default Smalltext2

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontFamily: 'metropolis-regular',        
    }
})
