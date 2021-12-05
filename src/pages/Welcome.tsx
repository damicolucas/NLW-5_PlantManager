import React from 'react';
import { 
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
    } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import wateringImg from '../assets/watering.png';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

export function Welcome(){

    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIdentification')
    }

    return(
        <SafeAreaView style={styles.container}> 
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                Gerencie{'\n'}suas plantas{'\n'}de forma fácil
                </Text>

            
                <Image source={wateringImg} style={styles.image} />
            

                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas.{'\n'}
                    Nós cuidamos de lembrar você{'\n'}
                    sempre que precisar.
                </Text>
                <TouchableOpacity 
                    style={styles.button} 
                    activeOpacity={0.5}
                    onPress={handleStart}
                >
                        <Feather 
                        name="chevron-right"
                        style={styles.buttonIcon}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 32,
        textAlign: "center",
        fontWeight: "bold",
        color: colors.heading,
        marginTop: 40,
        fontFamily: fonts.heading,
        lineHeight: 38
    },
    subtitle: {
        fontSize: 17,
        textAlign: "center",
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 34
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom:16,
        width: 60,
        height: 60
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 30
    },
    image:{
        width: 292,
        height: 284,

    }
})