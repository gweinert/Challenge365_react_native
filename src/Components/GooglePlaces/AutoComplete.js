import React, { Component } from 'react'
import { Modal } from 'react-native'

const {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');

// const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
// const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default class AutoCompleteModal extends Component {

    static PropTypes = {
        visible: React.PropTypes.bool,
        onLocationSelect: React.PropTypes.func
    }

    static DefaultProps = {
        visible: false,
        onLocationSelect: () => {}
    }

    render() {
        return (
            <Modal
                animationType={"slide"} 
                transparent={false}
                visible={this.props.visible}
            >
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={(row) => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        console.log(data);
                        console.log(details);
                        this.props.onLocationSelect(details)
                    }}
                    getDefaultValue={() => {
                        return ''; // text input default value
                    }}
                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyClM6A4TDmRE7499bN7kJHEzkSYlSIXJE0',
                        language: 'en',// language of the results
                        //types: '(cities)', // default: 'geocode'
                    }}
                    styles={{
                        description: {
                        fontWeight: 'bold',
                        },
                        predefinedPlacesDescription: {
                        color: '#1faadb',
                        },
                    }}

                    currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel="Current location"
                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    }}
                    GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance'
                    }}


                    //filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

                    //predefinedPlaces={[homePlace, workPlace]}

                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    //renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
                    //renderRightButton={() => <Text>Custom text after the inputg</Text>}
                />
            </Modal>
        );
    }
}