import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Headline2 = ({children, style,...rest}) => {
    const {colors} = useTheme()
    return (
        <View>
            <Text style={{...styles.text, color: colors.text, ...style}} {...rest}>{children}</Text>
        </View>
    )
}

export default Headline2

const styles = StyleSheet.create({
    text: {
        fontFamily: 'metropolis-semibold',
        fontSize: 22,    
    }
})
