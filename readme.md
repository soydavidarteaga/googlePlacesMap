# Restaurants App
Esta aplicacion permite visualizar en un mapa, lugares de google place.

## Configuracion
Debes tener una api key de *google* para hacer funcionar la aplicación
para eso debes colocar el Api key de google en diferentes archivos.

#### HomeScreen.js
``` javascript
let url = getUrlPlaces(lat, lon, 1500, 'restaurant', 'API_KEY_GOOGLE');
```

#### DetailEventScreen.js
``` javascript
<MapViewDirections 
    origin={origin}
    destination={destination}
    apikey=''
    strokeWidth={5}
    strokeColor="hotpink"
/>
```

#### AndroidManifest.xml
``` xml
<meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="API_KEY_GOOGLE"/>  
```

#### google_maps_api.xml
``` xml
<string name="google_maps_key" templateMergeStrategy="preserve" translatable="false">API_KEY_GOOGLE</string>
```

