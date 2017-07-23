import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { 
    StyleSheet, 
    Text,
    View,
    TouchableOpacity
}                           from 'react-native'


const ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
let imagePickerOptions = {
  title: 'Select Image',
//   customButtons: [
//     {name: 'fb', title: 'Choose Photo from Facebook'},
//   ],
  storageOptions: {
    skipBackup: true,
    path: 'images',
    waitUntilSaved: true
  }
};
let style;

export default class ImagePickerComponent extends Component {

    static propTypes = {
        style: PropTypes.object,
        title: PropTypes.string,
        onPhotoSelect: PropTypes.func,
        mediaType: PropTypes.string,
        maxWidth: PropTypes.number,
        maxHeight: PropTypes.number,
        quality: PropTypes.number,
        videoQuality: PropTypes.string,
        durationLimit: PropTypes.number,
        noData: PropTypes.bool,

    }

    static defaultProps = {
        style: {},
        title: 'Image',
        onPhotoSelect: () => {},
        mediaType: 'mixed',
        maxWidth: 800,
        maxHeight: 600,
        quality: 0.5,
        videoQuality: 'medium',
        durationLimit: 30,
        noData: true
    }
    
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        Object.assign(imagePickerOptions, this.props)
    }

    _showImagePicker = () => {
        ImagePicker.showImagePicker(imagePickerOptions, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            }
            else {
                const source = { 
                    uri: response.uri,
                    fileName: response.fileName || 'unamed.jpg'
                    // data: `data:image/jpeg;base64,${response.data}`
                }

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.props.onPhotoSelect(source)
            }
        })
    }

    render() {

        // console.log("imagePicker props", this.props)

        const { title } = this.props
        
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this._showImagePicker()}
                    >
                    <Text>{title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}