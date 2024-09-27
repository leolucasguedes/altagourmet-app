import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import useShippingStore, { IAddress } from '@/store/shippingStore';
import { StyledText, StyledTextInput, StyledView } from './styleds/components';

export default function ShippingLocationPicker({ close }: { close: () => void }) {
    const [location, setLocation] = useState<any>(null);
    const [address, setAddress] = useState<IAddress>({
        city: '',
        state: '',
        country: '',
        zip_code: '',
        street_address: ['']
    });
    const [errorMsg, setErrorMsg] = useState<any>(null);
    const { addAddress, selectAddress, selectedAddress, addresses } = useShippingStore()
    const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc.coords);

            // Fazer requisição para obter o endereço
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.coords.latitude},${loc.coords.longitude}&key=${GOOGLE_API_KEY}`
            );
            console.log(response.data.results[0])
            const addr: IAddress = {
                city: response.data.results[0].address_components[3].long_name,
                state: response.data.results[0].address_components[4].short_name,
                country: response.data.results[0].address_components[5].short_name,
                zip_code: response.data.results[0].address_components[6].long_name,
                street_address: [`${response.data.results[0].address_components[0].long_name} ${response.data.results[1].address_components[1].long_name}`]
            }
            setAddress(addr);
        })();
    }, []);
    const handleAdd = () => {
        addAddress(address)
        selectAddress(address)
        close()
    }
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <StyledView className='w-full flex flex-row items-center justify-between mb-2'>
                    <StyledText>Adicione um endereço</StyledText>
                    <TouchableOpacity onPress={() => { close() }}>
                        <StyledText className='text-white rounded-full bg-light-green w-8 h-8 text-center font-bold text-xl'>X</StyledText>
                    </TouchableOpacity>
                </StyledView>
                {!location && <ActivityIndicator size="large" color={'#238878'} />}
                {location && (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
                    </MapView>
                )}
                {address && <StyledView className='w-full flex flex-col items-start justify-center pt-3'>
                    <StyledText>Endereço</StyledText>
                    <StyledTextInput className='bg-[#f6f6f6] w-full px-2 border border-[#d4d4d4] rounded mb-2' value={address.street_address[0]}
                        onChange={(e) => setAddress({ ...address, street_address: [e.nativeEvent.text] })} />
                    <StyledText>Cidade</StyledText>
                    <StyledTextInput className='bg-[#f6f6f6] w-full px-2 border border-[#d4d4d4] rounded mb-2' value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.nativeEvent.text })} />
                    <StyledText>Estado</StyledText>
                    <StyledTextInput className='bg-[#f6f6f6] w-full px-2 border border-[#d4d4d4] rounded mb-2' value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.nativeEvent.text })} />
                    <StyledText>Pais</StyledText>
                    <StyledTextInput className='bg-[#f6f6f6] w-full px-2 border border-[#d4d4d4] rounded' value={address.country}
                        onChange={(e) => setAddress({ ...address, country: e.nativeEvent.text })} />
                    <StyledText>CEP</StyledText>
                    <StyledTextInput className='bg-[#f6f6f6] w-full px-2 border border-[#d4d4d4] rounded mb-2' value={address.zip_code}
                        onChange={(e) => setAddress({ ...address, zip_code: e.nativeEvent.text })} />
                    <StyledView className='w-full flex items-center justify-center mt-3'>
                        <TouchableOpacity onPress={() => { handleAdd() }}>
                            <StyledText className='bg-light-green px-4 py-1 w-full rounded text-white'>Selecionar</StyledText>
                        </TouchableOpacity>
                    </StyledView>
                </StyledView>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    inner: {
        backgroundColor: 'white',
        padding: 20,
        width: '100%',
        borderRadius: 10,
    },
    map: {
        width: '100%',
        height: 200,
    },
});