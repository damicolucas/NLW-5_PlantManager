import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/core';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug',
    nextScreen: string;
}

const emojis = {
    hug: '🤗',
    smile: '😃'
}

export function Confirmation(){
    
    const navigation = useNavigation();
    const routes = useRoute();

    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen
    } = routes.params as Params;

    function handleMoveOn(){
        navigation.navigate(nextScreen)
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    🥳
                </Text>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
                <View style={styles.footer}>
                    <Button
                        title = {buttonTitle}
                        onPress = {handleMoveOn}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    emoji: {
        fontSize: 44,
        color: colors.heading
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        lineHeight: 38,
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 15
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 10,
        paddingHorizontal: 30,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 75,
    }

});