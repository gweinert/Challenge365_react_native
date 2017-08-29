import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import {
    TouchableOpacity,
    Text,
    StyleSheet
}                           from 'react-native'

let styles 

export default class Tab extends Component {

    static propTypes = {
        tab: PropTypes.string,
        tabStyle: PropTypes.object,
        labelStyle: PropTypes.object,
        active: PropTypes.bool,
        onPress: PropTypes.func
    }

    static defaultProps = {
        active: false,
        tabStyle: {},
        labelStyle: {},
    }

    _onPress = () => {
        const { onPress, tab } = this.props

        onPress && onPress(tab)
    }

    render() {
        const {
            tabStyle,
            labelStyle,
            tab,
            active,
        } = this.props

        const activeTabStyle = active ? styles.activeTab : {}
        const activeLabelStyle = active ? styles.activeLabel : {}        

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={[styles.tab, tabStyle, activeTabStyle]}
                onPress={this._onPress}
            >
                <Text style={[styles.label, labelStyle, activeLabelStyle]}>{tab}</Text>
            </TouchableOpacity>
        )
    }
}

styles = StyleSheet.create({

    tab: {
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#9e9e9e',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },

    activeTab: {
        backgroundColor: '#757575',
    },

    label: {
        textAlign: 'center',
        fontSize: 16,
        backgroundColor: 'transparent',
        color: '#fff'
    },

    activeLabel: {},

})
