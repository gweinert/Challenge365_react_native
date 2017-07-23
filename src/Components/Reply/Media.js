import React, { Component } from 'react';
import PropTypes            from 'prop-types'
import { StyleSheet, 
        Text, 
        View, 
        Image }             from 'react-native';
import Video                from 'react-native-video'

const styles = require('./Styles')

// export default class Media extends Component {

//     static propTypes = {
//         file: PropTypes.string,
//         play: PropTypes.bool
//     }

//     static defaultProps = {
//         play: false
//     }

//     componentDidMount() {
//         console.log("ideo cdm", this.player)
//     }

//     render() {
        // const { file, play } = this.props
const Media = ({file, play}) => {
    
    const isImage = (/\.(gif|jpg|jpeg|tiff|png)$/i).test(file)
    const isVideo = (/\.(avi|AVI|wmv|WMV|flv|FLV|mpg|MPG|mp4|MP4|MOV)$/i).test(file)
    const fileExtention = file.split('.').pop();
    
    // const hidePlay = state.videoPathPlaying == filepath ? "hide" : ""
    return(
        <View style={styles.media}>
            
            {isImage ? 
                <Image
                    style={styles.image} 
                    source={{uri: file}} /> 
                : null 
            }
            
            {isVideo ? 
                <Video
                    source={{uri: file}}
                    paused={!play}
                    //ref={ref => this.player = ref}
                                            // Pauses playback entirely.
                    //resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                    repeat={true}                           // Repeat forever.
                    style={styles.video}
                    //playInBackground={false}                // Audio continues to play when app entering background.
                    playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                    //ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                    //progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                    //onLoadStart={this.loadStart}            // Callback when video starts to load
                    //onLoad={this.setDuration}               // Callback when video loads
                    //onProgress={this.setTime}               // Callback every ~250ms with currentTime
                    //onEnd={this.onEnd}                      // Callback when playback finishes
                    //onError={this.videoError}               // Callback when video cannot be loaded
                    //onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    //onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                /> 
                : null
            }
            
        </View>
    )
}

export default Media