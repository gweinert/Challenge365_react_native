// import React, { Component } from 'react'
// import PropTypes            from 'prop-types'
// import {
//     View,
//     Text,
//     FlatList,
//     StyleSheet,
//     Image
// }                           from 'react-native'
// import { connect }          from 'react-redux'
// import { 
//     fetchResourceIfNeeded
// }                           from '../Actions'

// class Leaderboard extends Component {
    
//     static navigationOptions = {
//         tabBarLabel: 'Leaderboard',
//         tabBarIcon: () => (
//             <Image
//                 source={require('../Images/contact_noun.png')}
//                 style={[styles.icon]}
//             />
//         ),
//     }

//     constructor(props) {
//         super(props)
//     }

//     componentDidMount() {
//         const { dispatch } = this.props
//         dispatch(fetchResourceIfNeeded('user'))
//     }
    
//     render() {
//         console.log("leaderboard", this)
//         const leaderboardCategory = 'total'
        
//         return (
//             <View style={styles.container}>
//                 <FlatList
//                     data={this.props.user.items.sort((a, b) => a.points[leaderboardCategory] - b.points[leaderboardCategory])}
//                     keyExtractor={(item) => item._id}                    
//                     renderItem={({item, index}) => (
//                         <View style={styles.item}>
//                             <Text style={styles.rank}>{index + 1}</Text>
//                             <View >
//                                 <Image 
//                                     style={styles.image}
//                                     source={{uri: item.profileImg}}
//                                 />
//                             </View>
//                             <View style={styles.info}>
//                                 <Text class="username">{item.displayName}</Text>
//                                 <Text class="total-points">{item.points[leaderboardCategory]} points</Text>
//                             </View>
//                         </View>
//                     )}
//                 />
//             </View>
//         )
//     }
// }

// const mapStateTopProps = (state) => {
//     const { user, challenge } = state
//     return {
//         user,
//         challenge
//     }
// }

// export default connect(mapStateTopProps)(Leaderboard)

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     item: {
//         flex: 1,
//         flexDirection: 'row',
//         // justifyContent: 'center',
//         alignItems: 'center',
//         borderTopWidth: 1,
//         borderBottomWidth: 1, 
//     },
//     rank: {
//         // lineHeight: 50,
//         fontSize: 15,
//         textAlign: 'center',
//         marginLeft: 10,
//         marginRight: 10,
//     },
//     info: {
//         marginLeft: 10,
//     },
//     image: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//     },
//     icon: {
//         width: 26,
//         height: 26,
//     },
// });