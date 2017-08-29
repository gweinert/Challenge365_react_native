import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    ImageBackground,
    Dimensions,
}                           from 'react-native'
import Media                from '../Reply/Media'

const { height, width } = Dimensions.get('window')
let styles 

class GridItem extends Component {

    static propTypes = {
        styles: PropTypes.object,
        image: PropTypes.string.isRequired,
        title: PropTypes.string,
        id: PropTypes.string.isRequired,
        onPress: PropTypes.func,
    }
    
    static defaultProps = {
        styles: {},
        title: '',
    }

    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
    }

    _onPress() {
        const { onPress, id } = this.props
        
        onPress && onPress(id)
    }

    render() {
        const {
            itemStyles,
            image,
            title,
            id,
            onPress
        } = this.props

        const mergeStyles = {...styles, ...itemStyles}
        
    
        return (
            <TouchableHighlight
                activeOpacity={onPress ? 0.8 : 1}
                style={[mergeStyles.container]}
                onPress={this._onPress}
                >
                <View style={mergeStyles.bg}>
                    <Media
                        file={image} 
                        style={mergeStyles.bgImage}
                    />                       
                </View>
            </TouchableHighlight>
        )
    }
}

export default GridItem


styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    width: width - 50,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  bg: {
    width: '100%',
    backgroundColor: 'transparent',

  },
  
  bgImage: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'transparent',
  },

});