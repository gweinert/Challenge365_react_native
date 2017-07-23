import React, { Component } from 'react'
import { 
    StyleSheet, 
    Text,
    View, 
    TextInput, 
    Picker, 
    Button, 
    TouchableOpacity,
    Image
}                           from 'react-native'
import PropTypes            from 'prop-types';
import GooglePlacesModal    from '../GooglePlaces/AutoComplete'
import ImagePicker          from '../ImagePicker/ImagePicker'

import {
    postChallengeIfNotPosting
} from '../../Actions'

const styles = require('./Style')

export default class ChallengeForm extends Component {

    static propTypes = {
        auth: PropTypes.shape({
            isLoggedIn: PropTypes.bool,
            profile: PropTypes.shape({
                id: PropTypes.string,
                name: PropTypes.string
            })
        })
    }

    static defaultProps = {
        auth: {
            isLoggedIn: false,
            profile: {
                id: '',
                name: ''
            }
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            category: 'Snowboard',
            photoData: {uri: '', data: ''},
            lat: '',
            long: '',
            locationLat: '',
            locationLong: '',
            locationName: 'Location',
            pickerHeight: 0,
            modalOpen: false
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude
            const long = position.coords.longitude
            this.setState({ lat, long })
        })
    }

    _createChallenge = () => {
        const { dispatch, auth } = this.props
        let formData = new FormData()
        const challenge = {
            Name: this.state.title,
            Description: this.state.description,
            Category: this.state.category,
            UserID: auth.profile.id,
            Username: auth.profile.name,
            Latitude: this.state.locationLat,
            Longitude: this.state.locationLong,
            locationName: this.state.locationName,
        }

        const image = {
            uri: this.state.photoData.uri,
            type: 'image/jpeg',
            name: `${this.state.title.split(" ").join("_")}_Image.jpg`
        }
        
        Object.keys(challenge).forEach( (key, i) => {
            formData.append(key, challenge[key])
        })

        formData.append(`Image`, image)

        if (auth.profile.id) {
            dispatch(postChallengeIfNotPosting(formData))
        }
    }

    _openGooglePlacesModal = () => {
        this.setState({modalOpen: true})
    }

    _openPicker = () => {
        let pickerHeight = this.state.pickerHeight == 0 ? 200 : 0
        this.setState({ pickerHeight })
    }

    _onPhotoSelect = (source) => {
        // const { uri , data } = source
        this.setState({photoData: source})
    }

    _onLocationSelect = (locationDetails) => {
        this.setState({
            locationName: locationDetails.name,
            locationLat: locationDetails.geometry.location.lat,
            locationLong: locationDetails.geometry.location.lng,
            modalOpen: false
        })
    }

    render() {
        
        return (
            <View
                style={styles.formContainer}
                >
                <TextInput
                    style={[styles.input, styles.inputShort]}
                    onChangeText={(text) => this.setState({title: text})}
                    placeholder={"Title"}
                    value={this.state.title}
                />
                <TextInput
                    style={[styles.input, styles.inputTall]}
                    multiline = {true}
                    numberOfLines = {4}
                    onChangeText={(text) => this.setState({description: text})}
                    placeholder={"Description..."}
                    value={this.state.description}
                />
                <ImagePicker onPhotoSelect={this._onPhotoSelect}/>
                {this.state.photoData.uri ? <Image style={styles.formImage} source={{uri: this.state.photoData.uri}} /> : null}
                <TouchableOpacity
                    style={[styles.button, styles.locationButton]}
                    onPress={() => this._openGooglePlacesModal()}
                    >
                    <Text style={styles.locationButtonText}>{this.state.locationName}</Text>
                </TouchableOpacity>
                <GooglePlacesModal 
                    visible={this.state.modalOpen}
                    onLocationSelect={this._onLocationSelect}
                />
                <TouchableOpacity
                    style={styles.categoryButton}
                    onPress={this._openPicker}
                >
                    <Text style={styles.categoryButtonText}>Category</Text>
                    <Text style={styles.categoryButtonValue}>{this.state.category} ></Text>
                </TouchableOpacity>
                <Picker
                    style={[styles.picker, {height: this.state.pickerHeight}]}
                    selectedValue={this.state.category}
                    onValueChange={(itemValue) => this.setState({category: itemValue})}
                >
                    <Picker.Item label="Snowboard" value="Snowboard" />
                    <Picker.Item label="Ski" value="Ski" />
                    <Picker.Item label="Skate" value="Skate" />
                    <Picker.Item label="Surf" value="Surf" />
                </Picker>
                {/* <PhotoBrowser
                    onPhotoSelect={this._onPhotoSelect}
                /> */}
                <Button
                    onPress={this._createChallenge}
                    title="Create Challenge"
                    color="#841584"
                />
                
            </View>
        )
    }
}