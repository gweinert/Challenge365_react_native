import React, { Component }     from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableHighlight, 
    FlatList,
    ScrollView }                from 'react-native'
import { connect }              from 'react-redux'
import { 
    deleteReplySafely,
    createReplyIfNotPosting 
}                               from '../Actions'
import ChallengeItem            from '../Components/Challenge/Item'
import ReplyItem                from '../Components/Reply/Item'
import ImagePicker              from '../Components/ImagePicker/ImagePicker'

const gs = require('../Styles/Global')

let styles

class Detail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            scrollPositionY: 0
        }
    }

    // static navigationOptions = ({navigation}) => ({
    //     title: `Detail`,
    //     headerRight: (
    //         <ImagePicker
    //             title={'Reply'}
    //             onPhotoSelect={() => this._onPhotoSelect()}
    //         />
    //     )
    // })

    _onScroll = (event) => {
        this.setState({scrollPositionY: event.nativeEvent.contentOffset.y})
    }

    _onPhotoSelect = (imgSource) => {
        console.log("on phopto select", imgSource)
         const {
            state,
            dispatch 
        }  = this.props.navigation
        const { 
            auth, 
            index
        }  = state.params

        const mediaFile = {
            uri: imgSource.uri,
            type: 'image/jpeg',
            name: imgSource.fileName || 'image1'
        }

        let formData = new FormData()
        formData.append("UserID", auth.profile.id)
        formData.append("ChallengeID", this.props.challenges.items[index]._id)
        formData.append("Reply", mediaFile)

        console.log("on phopto select", formData)
        
        dispatch(createReplyIfNotPosting(formData))
    }

    _onDeleteReplyItem = (item) => {
         const { dispatch } = this.props.navigation
         dispatch(deleteReplySafely(item))
    }

    renderDetailHeader() {
        const { challenges } = this.props
        const {
            state,
            dispatch } = this.props.navigation

        const {
            index,
            auth } = state.params

        const challengeItem = challenges.items[index]
        
        return (
            <View style={styles.header}>
                <ChallengeItem 
                    item={challengeItem} 
                    index={index}
                >
                    <View style={styles.margin}>
                        <Text style={styles.description}>{challengeItem.description}</Text>
                    </View>
                    <ImagePicker
                        key={'same'}
                        title={'Reply'}
                        onPhotoSelect={this._onPhotoSelect}
                    />
                </ChallengeItem>
            </View>
        )
    }
    
    render(){

        const { challenges } = this.props
        const {
            state,
            dispatch } = this.props.navigation

        const {
            index,
            auth } = state.params
        
        const challengeItem = challenges.items[index] //semantics in flat list
        
        return (
            <View style={[gs.container, styles.container]}>

                <FlatList
                    onScroll={this._onScroll}
                    scrollEventThrottle={3}
                    ListHeaderComponent={this.renderDetailHeader()}
                    data={challengeItem.replies}
                    keyExtractor={(replyItem) => replyItem._id}
                    renderItem={({item}) => (
                            <ReplyItem 
                                style={{flex: 1}}
                                challenge={challengeItem}
                                item={item}
                                currentScrollPositionY={this.state.scrollPositionY}
                                onDelete={this._onDeleteReplyItem}
                            />
                        )
                    }
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    challenges: state.challenges
})

export default connect(mapStateToProps)(Detail)

styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 10
    },
    header: {
        flex: 0
    },
    margin: {
        marginLeft: 10
    },
    description: {
        fontSize: 18
    }
})