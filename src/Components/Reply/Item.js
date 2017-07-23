import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { 
        StyleSheet, 
        Text, 
        View,
        TouchableOpacity
             }              from 'react-native'
import ReplyMedia           from './Media'
import Upvote               from '../Upvote/Upvote'

const styles    = require('./Styles.js')
const gs        = require('../../Styles/Global')


export default class ReplyItem extends Component {

    static propTypes = {
        item: PropTypes.object.isRequired,
        challenge: PropTypes.object.isRequired,
        currentScrollPositionY: PropTypes.number.isRequired,
        onDelete: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {
            play: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.item.measure((fx, fy, width, height, px, py) => {
            if ((py > 50 && py < 200) && !this.state.play) {
                this.setState({play: true})
            } else if ((py < 50 || py > 200) && this.state.play) {
                this.setState({play: false})
            }
        })
    }

    //careful with this
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.play != nextState.play) {
            return true
        } else if (this.props.item.votes.length != nextProps.item.votes.length) {
            return true
        }
        else return false
    }

    // _onPressDelete = () => {
    //     const { item, onDelete } = this.props

    //     onDelete && onDelete(item)
    // }
    
    render() {
        const {
            item,
            challenge,
            style,
            currentScrollPositionY,
        } = this.props

        console.log("this.props replyitem", this.props)

        return(
            <View 
                style={[style]}
                ref={ref => this.item = ref}
            >
                <Text style={[styles.username,  gs[`highlightColor${challenge.theme}`]]}>
                    {item.username}
                </Text>
                <ReplyMedia
                    file={item.file}
                    play={this.state.play}
                />
                <View class="vote-container">
                    <Upvote
                        type="reply"
                        id={challenge._id}
                        subId={item._id}
                    />
                    <View class="votes">
                        <Text>{item.votes.length} votes</Text>
                    </View>
                </View>
            </View>
        )
    }
}