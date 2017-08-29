import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { 
        StyleSheet, 
        Text, 
        View,
        TouchableOpacity
    }                       from 'react-native'
import ModalDropdown        from 'react-native-modal-dropdown';
import Dropdown             from '../Dropdown/dropdown'
import ReplyMedia           from './Media'
import Upvote               from '../Upvote/Upvote'
import DeleteButton         from '../Buttons/DeleteButton'

const styles    = require('./Styles.js')
const gs        = require('../../Styles/Global')


export default class ReplyItem extends Component {

    static propTypes = {
        item: PropTypes.object.isRequired,
        challenge: PropTypes.object.isRequired,
        currentScrollPositionY: PropTypes.number.isRequired,
        navigation: PropTypes.object,
        onDelete: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {
            play: false
        }
        this._goToUserProfile = this._goToUserProfile.bind(this)
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
        //update if needs to play vide
        if (this.state.play != nextState.play) {
            return true
            //update if received upvote
        } else if (this.props.item.votes.length != nextProps.item.votes.length) {
            return true
            //update if has been deleted
        } else if (this.props.item._id != nextProps.item._id) {
            return true
        }
        else return false
    }

    _goToUserProfile() {
        // console.log("this", this)
        const { navigation, item } = this.props
        navigation && navigation.navigate("UserProfile", {id: item.userID})
    }
    
    render() {
        const {
            item,
            challenge,
            style,
            currentScrollPositionY,
        } = this.props

        return(
            <View 
                style={[styles.itemContainer, style]}
                ref={ref => this.item = ref}
            >
                <ReplyMedia
                    file={item.file}
                    play={this.state.play}
                />
                <View style={styles.topInfo}>
                    <TouchableOpacity
                        onPress={this._goToUserProfile}
                    >
                        <Text style={[styles.username]}>
                            {item.username}
                        </Text>
                    </TouchableOpacity>
                    <Dropdown
                        buttonStyles={{
                            width: 60,
                            paddingBottom: 10,
                            }
                        }
                        buttonTextStyles={{
                            color: '#fff'
                        }}
                    >
                        <DeleteButton
                            id={item._id}
                            resource={"reply"}
                            parent={challenge}
                        />
                    </Dropdown>
                </View>
                
                <View style={styles.voteContainer}>
                    <Upvote
                        type="reply"
                        id={challenge._id}
                        subId={item._id}
                        color="#fff"
                    />
                    <View>
                        <Text style={styles.voteText}>{item.votes.length} votes</Text>
                    </View>
                </View>
                
                
                
            </View>
        )
    }
}