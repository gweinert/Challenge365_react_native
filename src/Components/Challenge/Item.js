import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { 
    StyleSheet, 
    Text, 
    View,
    ImageBackground,
    TouchableHighlight,
    TouchableOpacity
 }    from 'react-native'
import Upvote               from '../Upvote/Upvote'

const gs        = require('../../Styles/Global')
let styles    = require('./Style') 


export default class ChallengeItem extends Component {

    static propTypes = {
        item: PropTypes.object,
        children: PropTypes.node,
        showVotes: PropTypes.bool,
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        styles: PropTypes.object,
    }

    static defaultProps = {
        styles: {},
        showVotes: true,
    }

    constructor(props) {
        super(props)

        this._onPress = this._onPress.bind(this)
        this._onLongPress = this._onLongPress.bind(this)
    }

    _onPress() {
        const { item, onPress } = this.props
        
        onPress && onPress(item)
    }

    _onLongPress() {
        const { item, onLongPress } = this.props

        onLongPress && onLongPress(item)
    } 

    render() {
        const {
            item,
            dispatch,
            children,
            onPress,
            showVotes
        }                   = this.props
        const hightlightNum = item.theme
        const combStyles = {...styles, ...this.props.styles}
        
        return(
            <TouchableHighlight
                activeOpacity={onPress ? 0.8 : 1}
                style={[combStyles.container]}
                onPress={this._onPress}
                onLongPress={this._onLongPress}
                >
                <View style={combStyles.bg}>
                    <ImageBackground 
                        source={{uri: item.image}} 
                        style={combStyles.bgImage}
                    >
                        <View style={combStyles.bgStyle} />
                        <View style={combStyles.bgLeft} />
                    
                        <View>
                            
                            <View style={combStyles.top}>
                                <Text style={combStyles.title}>{item.name}</Text>
                                <View style={combStyles.topInfo}>
                                    <Text style={[combStyles.text]}>{item.username}</Text>
                                    <View style={combStyles.dotSpacer} />
                                    <Text style={[combStyles.text]}>{item.locationName}</Text>
                                </View>
                                <Text style={combStyles.text}>{item.category}</Text>
                            </View>
                            <View style={combStyles.bottom}>
                                {showVotes ? <View style={combStyles.voteContainer}>
                                     <Upvote
                                        type={'challenge'}
                                        id={item._id}
                                    /> 
                                    <Text style={combStyles.text}>{item.votes.length} votes</Text>
                                </View> : null }
                            
                                 {children} 
                            </View>                        
                        </View>
                    </ImageBackground>
                </View>
            </TouchableHighlight>
        )
    }
}

