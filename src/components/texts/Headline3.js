import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Headline3 = ({children, style, ...rest}) => {
    const {colors} = useTheme()
    return (
        <View>
            <Text style={{...styles.text, color: colors.text, ...style}} {...rest}>{children}</Text>
        </View>
    )
}

export default Headline3

const styles = StyleSheet.create({
    text: {
        fontFamily: 'metropolis-semibold',
        fontSize: 18,    
    }
})
