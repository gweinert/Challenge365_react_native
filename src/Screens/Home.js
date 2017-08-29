import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text,
    View,
    ListView,
    FlatList,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    BackgroundImage,
    StatusBar
}                           from 'react-native';
import {
    fetchChallengesIfNeeded,
    fetchUserDetailsIfNeeded,
    login 
}                           from '../Actions'
import { connect }          from 'react-redux'
import ChallengeItem        from '../Components/Challenge/Item'
import Dropdown             from '../Components/Dropdown/dropdown'

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  LoginButton,
  AccessToken
} = FBSDK;


const gs                = require('../Styles/Global')
let styles

const FILTER_OPTIONS = ['All', 'Adventure', 'Hike', 'Bike', 'Snowboard', 'Skateboard', 'Surf']
const SORT_OPTIONS = ['Popular', 'Newest', 'Nearest']


class Home extends Component {

    static navigationOptions = {
        tabBarLabel: 'Home',

        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: (props) => {

            const activeTabStyle = props.focused ? styles.activeTabStyle : {}
            const imgSrc = props.focused ? require('../Images/home_nc_active.png') : require('../Images/home_nc.png')

            return (
                <View style={[styles.navTab, activeTabStyle]}>
                    <Image
                        source={imgSrc}
                        style={[styles.icon]}
                    />
                </View>
            )
        },

        gesturesEnabled: false,
    }

    constructor(props) {
        super(props)
        this.state = {
            position: null,
            filter: FILTER_OPTIONS[0],
            challenges: [],
            sort: SORT_OPTIONS[0],
            curPage: 0
        }
    }

    componentDidMount() {
        this._getPosition(this._getChallenges)
    }

    _getPosition(cb = () => {}) {
        navigator.geolocation.getCurrentPosition((position) => {
            cb(position)
            this.setState({position})
        },
        (error) => {
            console.log("GEOLOCATION ERROR", error)
            cb()
        })
    }

    _getChallenges = (position = '', pagination = 0) => {
        const { dispatch } = this.props
        dispatch(fetchChallengesIfNeeded(position, pagination))
    }

    _onEndReached = (info) => {
        console.log("ON END REACHED", info)
        const { dispatch, challenge } = this.props

        if (challenge.items.length) {
            dispatch(fetchChallengesIfNeeded(this.state.position, challenge.pagination))
        }

    }

    _onChallengeItemPress = (item) => {
        const {
            auth,
            navigation
        } = this.props
        
        navigation.navigate('Detail', {id: item._id, auth})
        
    }

    _onFilterSelect = (filter) => this.setState({filter})

    _onSortSelect = (sort) => this.setState({sort})

    _sortChallenges(a, b) {
        const { sort } = this.state

        switch (sort) {
            case 'Popular':
                return ((b.votes.length - a.votes.length) || (b.replies.length - a.replies.length))
            case 'Newest':        
                return (b.createdAt - a.createdAt)
            case 'Nearest':
                return this._sortByLocation(a, b)
            default:
                return
        }
    }

    _sortByLocation(a, b) {
        const{ position } = this.state

        if (position) {
            let difa = this._pythagorasEquirectangular(position.coords.longitude, position.coords.latitude, a.location[1], a.location[0])
            let difb = this._pythagorasEquirectangular(position.coords.longitude, position.coords.latitude, b.location[1], b.location[0])
            
            return difa - difb
        } else return
    }
  
    _pythagorasEquirectangular(lat1, lon1, lat2, lon2) {

        function Deg2Rad(deg) {
            return deg * Math.PI / 180;        
        }

        lat1 = Deg2Rad(lat1);
        lat2 = Deg2Rad(lat2);
        lon1 = Deg2Rad(lon1);
        lon2 = Deg2Rad(lon2);
        var R = 6371; // km
        var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
        var y = (lat2 - lat1);
        var d = Math.sqrt(x * x + y * y) * R;
        return d;
    }
    
    
    render() {

        const {
            auth,
            challenge
        } = this.props

        let filterChallenges = challenge.items.length && challenge.items.filter(item => {
            return item.category.toLowerCase() === this.state.filter.toLowerCase() || this.state.filter.toLowerCase() === 'all'
        })
        .sort((a, b) => this._sortChallenges(a, b))
        
        return (
            <View style={[gs.container, styles.container]}>
                <StatusBar barStyle="light-content" />
                
                <Image source={require('../Images/bluebg_web.jpg')} style={styles.bgColor1}></Image>
                <Text style={styles.title}>CHALLENGES</Text>
                <View style={styles.optionsContainer}>
                    <Dropdown
                        children={FILTER_OPTIONS}
                        onSelect={this._onFilterSelect}
                        defaultValue={FILTER_OPTIONS[0]}
                        listContainerStyles={{minWidth: 110}}
                        buttonTextStyles={{fontSize: 20, fontWeight: '600', color: '#fff', backgroundColor: 'transparent'}}
                        anchor="bottom"
                        arrow={true}
                        //buttonStyles={{maxWidth: 150}}
                    />
                    <Text style={styles.sortTextLabel}>Sort By</Text>
                    <Dropdown
                        children={SORT_OPTIONS}
                        onSelect={this._onSortSelect}
                        defaultValue={SORT_OPTIONS[0]}
                        buttonTextStyles={{fontSize: 20, fontWeight: '600', color: '#fff', backgroundColor: 'transparent'}}
                        anchor="bottom"
                        arrow={true}
                        listContainerStyles={{minWidth: 90}}                        
                        buttonStyles={{maxWidth: 150}}
                    />
                </View>
                { challenge.isFetching && challenge.items.length === 0 ?
                    <ActivityIndicator /> :
                    <FlatList
                        horizontal={true}
                        data={filterChallenges}
                        extraData={filterChallenges.length}
                        onEndReached={this._onEndReached}
                        onEndReachedThreshold={0}
                        keyExtractor={(item) => item._id}                    
                        renderItem={({item, index}) => (
                            <ChallengeItem 
                                item={item}
                                index={index} 
                                onPress={this._onChallengeItemPress}
                            >
                                <View style={[styles.replyPreview]}>
                                    <Text style={styles.text}>
                                        {item.replies.length} replies
                                    </Text>
                                </View>
                            </ChallengeItem>
                        )}
                    />
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { challenge, auth } = state

    return {
        challenge,
        auth
    }
}

export default connect(mapStateToProps)(Home)

styles = StyleSheet.create({
    
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },

    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 20,
        zIndex: 5000,
    },

    sortTextLabel: {
        backgroundColor: 'transparent',
        color: '#fff',
        marginLeft: 20,
        fontSize: 14,
        fontStyle: 'italic',
        alignSelf: 'flex-end',
    },

    bgColor1: {
        position: 'absolute',
        width: '100%',
        height: '80%',
        backgroundColor: '#00243D',
    },

    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
        backgroundColor: 'transparent',
        marginTop: 30,
        marginLeft: 10,
        marginBottom: 20,
    },
    
    replyPreview: {
        backgroundColor: 'transparent'
    },

    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

    text: {
        color: '#fff',
        margin: 0,
        fontWeight: '500',
        fontSize: 15,
    },

    navTab: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#bdbdbd',
    },

    activeTabStyle: {
        backgroundColor: 'black',
        borderColor: 'black',
    },

    icon: {
        width: 23,
        height: 23,
    },
})