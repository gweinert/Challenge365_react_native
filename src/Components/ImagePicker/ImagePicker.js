import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { 
    StyleSheet, 
    Text,
    View,
    TouchableOpacity,
    Image
}                           from 'react-native'


const ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
let imagePickerOptions = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
    waitUntilSaved: true
  }
};
let styles

export default class ImagePickerComponent extends Component {

    static propTypes = {
        style: PropTypes.object,
        text: PropTypes.string,
        onPhotoSelect: PropTypes.func,
        mediaType: PropTypes.string,
        maxWidth: PropTypes.number,
        maxHeight: PropTypes.number,
        quality: PropTypes.number,
        videoQuality: PropTypes.string,
        durationLimit: PropTypes.number,
        noData: PropTypes.bool,
        buttonImage: PropTypes.number,
        text: PropTypes.string,
        containerStyles: PropTypes.object,
        buttonImageStyles: PropTypes.oneOf(PropTypes.object, PropTypes.number),
        textStyles: PropTypes.object

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
        noData: true,
        text: '',
        containerStyles: {},
        buttonImageStyles: {},
        textStyles: {},
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

        const { text, 
                buttonImage,
                containerStyles,
                buttonImageStyles,
                textStyles
        } = this.props
        
        return (
            <TouchableOpacity
                style={[styles.button, containerStyles]}
                onPress={() => this._showImagePicker()}
            >
                {buttonImage ? <Image
                        style={[styles.buttonImage, buttonImageStyles]}
                        source={buttonImage}
                    /> : null 
                }
                <Text style={[styles.text, textStyles]}>{text}</Text>
            </TouchableOpacity>
        )
    }
}

styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    buttonImage: {
        width: 50,
        height: 50,
    },

    text: {
        color: 'gray',
        fontSize: 16
    },
})