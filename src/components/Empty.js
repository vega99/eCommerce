import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MediumTextBold from './texts/MediumTextBold'

const Empty = () => {
    return (
        <View style={styles.container}>
            <MediumTextBold>No hay datos</MediumTextBold>
        </View>
    )
}

export default Empty

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    }
})
