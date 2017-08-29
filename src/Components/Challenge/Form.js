import React, { Component } from 'react'
import { 
    StyleSheet, 
    Text,
    View, 
    TextInput, 
    Picker, 
    Button, 
    TouchableOpacity,
    Image,
    Keyboard,
    TouchableWithoutFeedback
}                           from 'react-native'
import PropTypes            from 'prop-types';
import ModalDropdown        from 'react-native-modal-dropdown';
import GooglePlacesModal    from '../GooglePlaces/AutoComplete'
import ImagePicker          from '../ImagePicker/ImagePicker'

import { 
    createResourceSafely
}                           from '../../Actions'

const styles = require('./Style')
const OPTIONS = [ 'Adventure', 'Hike', 'Bike', 'Snowboard', 'Skateboard', 'Surf']


export default class ChallengeForm extends Component {

    static propTypes = {
        challenge: PropTypes.object,
        auth: PropTypes.shape({
            isLoggedIn: PropTypes.bool,
            profile: PropTypes.object
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
            name: '',
            description: '',
            category: OPTIONS[0],
            photoData: {uri: '', data: ''},
            lat: '',
            long: '',
            locationLat: '',
            locationLong: '',
            locationName: 'Add Location',
            pickerHeight: 0,
            modalOpen: false,
            errors: []
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude
            const long = position.coords.longitude
            this.setState({ lat, long })
        })
    }

    // on success submission, transition to detail page of new challenge
    componentWillReceiveProps(nextProps) {
        const {
            challenge,
            navigation,
            auth
        } = this.props
        const newChallenges = nextProps.challenge.items
        
        if ((!nextProps.challenge.isPosting && this.props.challenge.isPosting) &&
            (newChallenges.length === challenge.items.length + 1)) {
            this._clearForm()
            const newChallengeIndex = newChallenges.length - 1
            navigation.navigate('Detail', {id: newChallenges[newChallengeIndex]._id, auth})
        }
    }

    _createChallenge = () => {
        const { dispatch, auth } = this.props
        let formData = new FormData()
        let errors = []
        const challenge = {
            Name: this.state.name,
            Description: this.state.description,
            Category: this.state.category,
            UserID: auth.profile._id,
            Username: auth.profile.displayName,
            Latitude: this.state.locationLat,
            Longitude: this.state.locationLong,
            LocationName: this.state.locationName,
            access_token: auth.profile.token
        }

        const image = {
            uri: this.state.photoData.uri || 'https://storage.googleapis.com/snow_challenge/default.jpg',
            type: 'image/jpeg',
            name: `${this.state.name.split(" ").join("_")}_Image.jpg`
        }

        errors = this._validate(challenge)
        
        Object.keys(challenge).forEach( (key, i) => {
            formData.append(key, challenge[key])
        })

        formData.append(`Image`, image)

        if (auth.profile._id && errors.length == 0) {
            dispatch(createResourceSafely('challenge', formData))
        } else if (errors.length) {
            this.setState({errors})
        }
    }

    // returns array of fields with errors
    _validate(challenge) {
        const invalidFields = []
        
        Object.keys(challenge).forEach(key => {
            if (challenge[key] === '' && (key !== 'Latitude' && key !== 'Longitude')) {
                invalidFields.push(key.toLowerCase())
            } else if (key === 'LocationName' && challenge[key] === 'Add Location') {
                invalidFields.push(key.toLowerCase())
            }
        })

        return invalidFields
    }

    _clearForm() {
        this.setState({
            name: '',
            description: '',
            category: OPTIONS[0],
            photoData: {uri: '', data: ''},
            lat: '',
            long: '',
            locationLat: '',
            locationLong: '',
            locationName: 'Add Location',
            pickerHeight: 0,
            modalOpen: false
        })
    }

    _openGooglePlacesModal = () => {
        this.setState({modalOpen: true})
    }
    _openDropdown = () => {
        this.dropdown.show()
    }

    _onPhotoSelect = (source) => {
        // const { uri , data } = source
        this.setState({photoData: source})
    }

    _onLocationSelect = (locationDetails) => {
        const locationErrorIndex = this.state.errors.indexOf('locationname')
        this.state.errors.splice(locationErrorIndex, 1)
        const errors = this.state.errors
        this.setState({
            locationName: locationDetails.name,
            locationLat: locationDetails.geometry.location.lat,
            locationLong: locationDetails.geometry.location.lng,
            modalOpen: false,
            errors
        })
    }

    // returns style if error
    _errorStyles = (field) => {
        if (this._hasError(field)) {
            return { color: "red"}
        } else return {}
    }

    _placeholderColor = (field) => {
        if (this._hasError(field)) {
            return "red"
        } else return "grey"
    }

    _hasError = (field) => {
        const { errors } = this.state
        
        if (errors.length && errors.indexOf(field) > -1) {
            return true
        } else return false
    }

    

    render() {
        
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                    style={styles.formContainer}
                    >
                    <TextInput
                        style={[styles.input, styles.inputShort]}
                        onChangeText={(text) => this.setState({name: text})}
                        placeholder={"Title"}
                        placeholderTextColor={this._placeholderColor('name')}
                        value={this.state.name}
                        onBlur={this._onBlur}
                        //autoFocus={true}
                    />
                    <TextInput
                        style={[styles.input, styles.inputTall]}
                        multiline = {true}
                        numberOfLines = {3}
                        maxLength={240}
                        onChangeText={(text) => this.setState({description: text})}
                        placeholder={"Description..."}
                        placeholderTextColor={this._placeholderColor('description')}                    
                        value={this.state.description}
                    />
                    
                    {this.state.photoData.uri ? 
                        <Image 
                            style={styles.formImage} 
                            source={{uri: this.state.photoData.uri}} 
                        /> : 
                        <View style={styles.imagePickerContainer}>
                       
                            <ImagePicker 
                                text="Add Image"
                                onPhotoSelect={this._onPhotoSelect}
                                buttonImage={require('../../Images/add_image.png')}
                                containerStyles={{
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-end',
                                }}
                                buttonImageStyles={styles.imageIcon}
                            />
                        </View>
                    }
                    <TouchableOpacity
                        style={[styles.button, styles.locationButton]}
                        onPress={() => this._openGooglePlacesModal()}
                        >
                        <Text 
                            style={[
                                styles.locationButtonText,
                                this.state.locationName != 'Add Location' ? {color: '#000'} : null,
                                this._errorStyles('locationname'),
                            ]}
                        >
                            {this.state.locationName}
                        </Text>
                    </TouchableOpacity>
                    <GooglePlacesModal 
                        visible={this.state.modalOpen}
                        onLocationSelect={this._onLocationSelect}
                        lat={this.state.lat}
                        lng={this.state.long}
                    />
                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={this._openDropdown}
                    >
                        <Text style={styles.categoryButtonText}>Add Category</Text>
                        <ModalDropdown 
                            textStyle={styles.categoryButtonValue}
                            ref={(ref) => this.dropdown = ref}
                            options={OPTIONS}
                            defaultValue={OPTIONS[0]}
                            onSelect={(index, value) => this.setState({category: value})}
                        />
                        <Text style={styles.afterDropdown}>></Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={this._createChallenge}
                    >
                        <Text style={styles.submitButtonText}>
                            CREATE CHALLENGE
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}