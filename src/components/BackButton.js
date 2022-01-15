import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const BackButton = ({onPress, style, color}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.button, ...style}}>
            <Ionicons name="chevron-back" size={30} color={color} />
        </TouchableOpacity>
    )
}

export default BackButton

const styles = StyleSheet.create({
    button: {

    }
})
