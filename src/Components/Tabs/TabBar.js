import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,

}                           from 'react-native'
import Tab                  from './Tab'

let styles

const TabBar = ({tabs, tabBarStyle, tabStyle, labelStyle, onTabPress, activeTab, children}) => (

    <View style={[styles.tabBar, tabBarStyle]}>
        { tabs ? tabs.map(tab => (
            <Tab
                active={activeTab == tab ? true : false}
                key={tab}
                onPress={onTabPress}
                tab={tab}
                tabStyle={tabStyle}
                labelStyle={labelStyle}
            />
        ) ) : children }
    </View>
)

TabBar.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.string),
    tabBarStyle: PropTypes.object,
    tabStyle: PropTypes.object,
    labelStyle: PropTypes.object,
    onTabPress: PropTypes.func,
    activeTab: PropTypes.string,
    children: PropTypes.node,
}

TabBar.defaultProps = {
    children: null,
    tabBarStyle: {},
    tabStyle: {},
    labelStyle: {},
    onTabPress: () => {},
}

export default TabBar

styles = StyleSheet.create({
    
    tabBar: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10,
    },

})