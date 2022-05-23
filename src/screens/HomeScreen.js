/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import generalStyles from '../styles/generalStyles';
import Geolocation from '@react-native-community/geolocation';
import { mapStyle } from '../styles/mapStyles';
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

let HomeScreen = ({ navigation }) => {
    const [region, setRegion] = useState();
    const [marker, setMarker] = useState();
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionSheetData, setActionSheetData] = useState();

    let fetchData = (lat, lon) => {
        console.log('Trayendo Data');
        setRegion({
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.00922 * 1.5,
            longitudeDelta: 0.00421 * 1.5,
        });
        setMarker({
            latitude: lat,
            longitude: lon,
        });
        getPlaces(lat, lon);
        setLoading(true);
    };

    let getUrlPlaces = (lat, lon, radius, type, API) => {
        let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
        const location = `location=${lat},${lon}&radius=${radius}`;
        const typeData = `&type=${type}`;
        const key = `&key=${API}`;

        return url + location + typeData + key;
    };

    let getPlaces = (lat, lon) => {
        let url = getUrlPlaces(lat, lon, 1500, 'restaurant', '');
        fetch(url)
            .then((data) => data.json())
            .then((res) => {
                let placesMarkers = [];
                res.results.map(result => {
                    placesMarkers.push({
                        location: {
                            latitude: result.geometry.location.lat,
                            longitude: result.geometry.location.lng
                        },
                        title: result.name,
                        icon: result.icon
                    });
                });
                setPlaces(placesMarkers);
            })
    };

    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => fetchData(position.coords.latitude, position.coords.longitude),
            (error) => console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
    }, []);

    let getRegion = loading ? region : { latitude: 10.271586, longitude: -67.9879187, latitudeDelta: 0.0922, longitudeDelta: 0.0421 };

    let MapOrView = () => {
        if (loading) {
            return (
                <MapView
                    customMapStyle={mapStyle}
                    provider={PROVIDER_GOOGLE}
                    style={generalStyles.map}
                    region={getRegion}
                >
                    <StatusBar barStyle="dark-content" backgroundColor="#8e44ad" />
                    {places ? places.map((place, key) => <Marker onPress={() => SheetManager.show("helloworld_sheet", {title: place.title, place: place, region: region})} key={key} title={place.title} coordinate={place.location} />) : null}
                </MapView>
            );
        } else {
            return (
                <View>
                    <StatusBar barStyle="dark-content" backgroundColor="#8e44ad" />
                    <Text>Cargando la información</Text>
                </View>
            );
        }

    }

    return (
        <>
            <MapOrView />
            <ActionSheet 
                id="helloworld_sheet"
                onBeforeShow={(data) => {
                    setActionSheetData(data);
                }}
            >
                <View style={generalStyles.actionSheet}>
                    <Text style={generalStyles.title}>{actionSheetData ? actionSheetData.title : 'Titulo'}</Text>
                    {
                        actionSheetData ?
                        <Text>
                            Esta es la descripción de un evento
                        </Text>
                        : null
                    }
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('DetailEvent', {
                                place: actionSheetData.place,
                                region: region
                            });
                        }}
                        style={generalStyles.button}
                    >
                        <Text style={generalStyles.buttonText}>Asistiré</Text>
                    </TouchableOpacity>
                </View>
            </ActionSheet>
        </>

    );
};

export default HomeScreen;