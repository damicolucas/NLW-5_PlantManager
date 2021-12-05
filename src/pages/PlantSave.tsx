import React, { useState } from 'react';
import { 
    Text,
    View,
    Alert,
    Image,
    StyleSheet,
    ScrollView,
    Platform,
    TouchableOpacity,
 } from 'react-native';
import { SvgFromUri } from 'react-native-svg'
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { loadPlant, PlantProps, savePlant } from '../libs/storage';
import { useNavigation } from '@react-navigation/core';

import { format, isBefore } from 'date-fns';

import { Button } from '../components/Button';

import waterdrop from '../assets/waterdrop.png'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
    plant: PlantProps
}

export function PlantSave(){
    const [ selectedDateTime, setSelectedDateTime ] = useState(new Date());
    const [ showDatePicker, setShowDatePicker ] = useState(Platform.OS == 'ios');

    const route = useRoute();
    const { plant } = route.params as Params; 

    const navigation = useNavigation();

    function handleChangeTime (event: Event, dateTime: Date | undefined ) {
        if(Platform.OS === 'android'){
            setShowDatePicker(oldState => !oldState);
        }

        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date());
            return Alert.alert('escolha uma hora futura');
        }

        if(dateTime)
            setSelectedDateTime(dateTime);
    }

    function handleOpenDateTimePickerFromAndroid() {
        setShowDatePicker(oldState => !oldState)
    }

    async function handleSave () {
        const data = await loadPlant();
        console.log(data)

        try { 
            await savePlant ({
                ... plant, 
                dateTimeNotification: selectedDateTime
            });

            navigation.navigate('Confirmation', {
                icon: 'hug,',
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
                nextScreen: 'MyPlants',
                buttonTitle: 'Muito Obrigado'
            });
            
        } catch {
           Alert.alert('Não foi possível salvar');
        }
    }


    


    return (
        <ScrollView
            showsVerticalScrollIndicator = {false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}> 
                <View style={styles.plantInfo}>
                    <SvgFromUri
                    uri={plant.photo}
                    height={150}
                    width={150}
                    />
                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>
                </View>
                <View style={styles.controllers}>
                    <View style={styles.tipConainer}>
                        <Image 
                            source={waterdrop}
                            style={styles.tipImage}
                        />
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>
                    <Text style={styles.artLabel}>
                        Escolha o melhor horário para ser lembrado
                    </Text>

                    {showDatePicker && (
                        <DateTimePicker
                            value= {selectedDateTime}
                            mode="time"
                            display="spinner"
                            onChange={handleChangeTime}
                        />
                    )}

                    {
                        Platform.OS === 'android' && (
                            <TouchableOpacity
                                onPress={handleOpenDateTimePickerFromAndroid}
                                style={styles.dataTimePIckerButton}
                            >
                                <Text style={styles.dataTimePIckerText}>
                                    {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                                </Text>
                            </TouchableOpacity>
                        )
                        
                    }

                    <Button
                        title="Cadastrar planta"
                        onPress={handleSave}
                    />
                </View>
            </View>
        </ScrollView>
    )
 }

 const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        color: colors.shape,
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,

    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        marginTop: 15,
    },
    controllers: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },
    tipConainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60,
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17, 
        textAlign: 'justify',
    },
    artLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12, 
        marginBottom: 5,
    },
    dataTimePIckerButton:{
      width: '100%',
      alignItems: 'center',
      paddingVertical: 40,  
    },
    dataTimePIckerText:{
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text,
    },
 })