import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableHighlight } from 'react-native';
import Upvote            from '../Upvote/Upvote'
import DeleteButton      from '../Buttons/DeleteButton'

const gs        = require('../../Styles/Global')
const styles    = require('./Style') 


export default class ChallengeItem extends Component {

    static propTypes = {
        item: React.PropTypes.object,
        index: React.PropTypes.number,
        children: React.PropTypes.node,
        onPress: React.PropTypes.func
        
    }

    static defaultProps = {
    }

    _onPress = () => {
        const {
            item,
            index,
            onPress
        } = this.props
        
        onPress && onPress(item, index)
    }

    render() {
        const {
            item,
            index,
            dispatch,
            children
        }                   = this.props
        const hightlightNum = item.theme
        const trueIndex = (parseInt(index) + 1)
        
        return(
            <View style={styles.container}>
                
                <View style={styles.top}>
                    <View style={[gs.circle, gs[`highlightBg${item.theme}`]]}>
                        <Text 
                            style={[styles.circleText, gs.circleText]}
                        >{trueIndex}
                        </Text>
                    </View>
                    <Text style={[gs.username, , gs[`highlightColor${item.theme}`]]}>{item.username}</Text>
                </View>
                
                <View>
                    <TouchableHighlight 
                        onPress={this._onPress} 
                        style={styles.inner}
                    >
                        <View>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.text}>{item.category}</Text>
                            <Text style={styles.text}>{item.votes.length} votes</Text>
                            <Upvote
                                style={gs[`highlightBorder${item.theme}`]}
                                type={'challenge'}
                                id={item._id}
                            />
                        </View>
                    </TouchableHighlight>
                    <DeleteButton
                        resource="challenge"
                        id={item._id}
                    />
                </View>
                {children}
            </View>
        )
    }
}

