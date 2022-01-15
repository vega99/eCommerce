import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Smalltext from './texts/Smalltext';
import Smalltext2 from './texts/SmallText2';

const InfoItem = ({title, info}) => {
    return (
        <View style={styles.item}>
            <View style={styles.info}>
                <Smalltext2>{title}</Smalltext2>
            </View>
            <View style={styles.info}>
                <Smalltext style={styles.infoText}>{info}</Smalltext>
            </View>            
        </View>
    )
}

export default InfoItem

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 5,
        // alignItems: 'center',
    },
    info: {
        flex: 1
    },
    infoText: {
        textAlign: 'justify',
        lineHeight: 20
    }
})
