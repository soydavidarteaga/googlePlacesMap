/* eslint-disable prettier/prettier */
import React from "react";
import {View, StatusBar} from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import generalStyles from "../styles/generalStyles";

let DetailEventScreen = (props) => {
    let { route } = props;
    let {params} = route;
    let {region, place} = params;
    let origin = { latitude: region.latitude, longitude: region.longitude };
    let destination = { latitude: place.location.latitude, longitude: place.location.longitude };
    return (
        <MapView region={region} style={[generalStyles.map]}>
            <StatusBar barStyle="dark-content" backgroundColor="#f39c12" />
            <Marker coordinate={origin}>
                <View style={{backgroundColor: '#8e44ad', borderRadius: 50, width: 20, height: 20}}></View>
            </Marker>
            <Marker coordinate={destination}></Marker>
            <MapViewDirections 
                origin={origin}
                destination={destination}
                apikey=''
                strokeWidth={5}
                strokeColor="hotpink"
            />
        </MapView>
    );
}

export default DetailEventScreen;