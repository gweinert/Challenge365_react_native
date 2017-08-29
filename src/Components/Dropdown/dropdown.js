import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet
}                           from 'react-native'

let styles

export default class Dropdown extends Component {

    static PropTypes = {
        defaultValue: PropTypes.string,
        children: PropTypes.node,
        onSelect: PropTypes.func,
        anchor: PropTypes.string,
        textStyles: PropTypes.object,
        buttonStyles: PropTypes.object,
        buttonTextStyles: PropTypes.object,
        containerStyles: PropTypes.object,
        listContainerStyles: PropTypes.object,
        arrow: PropTypes.bool,
    }

    static defaultProps = {
        defaultValue: '. . .',
        onSelect: () => {},
        anchor: 'top',
        textStyles: {},
        buttonStyles: {},
        buttonTextStyles: {},
        containerStyles: {},
        listContainerStyles: {},
        arrow: false,
    }

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            selected: ''
        }
    }

    _toggle = () => {
        this.setState({open: !this.state.open})
    }

    _onSelect = (child) => {
        this._toggle()
        this.setState({selected: child})
        this.props.onSelect(child)
    }

    _renderChildren(children) {
        if(children.length && typeof children[0] === "string") {
            return children.map((child, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => this._onSelect(child)}
                    >
                        <Text style={[styles.listItemTextStyle, this.props.textStyles]}>{child}</Text>
                    </TouchableOpacity>
                )
            )
        } else return children
    }

    render() {
        const {
            children,
            defaultValue,
            anchor,
            textStyles,
            buttonStyles,
            buttonTextStyles,
            arrow,
            containerStyles,
            listContainerStyles,
        } = this.props

        const openStyles = this.state.open ? {} : {height: 0, overflow: 'hidden'}
        const anchorStyles = anchor == 'top' ? {bottom: 20} : {top: 20}

        return (
            <View style={[styles.container, containerStyles]}>
                <TouchableOpacity style={[styles.button, buttonStyles]} onPress={this._toggle}>
                    <View>
                        <Text style={[styles.buttonText, buttonTextStyles]}
                        >
                            {this.state.selected || defaultValue}
                        </Text>
                    </View>
                    {arrow ? <View style={styles.arrow}/> : null }
                </TouchableOpacity>
                <View style={[styles.listContainer, listContainerStyles, openStyles, anchorStyles]}>
                    <View style={styles.list}>
                        {this._renderChildren(children)}
                    </View>
                </View>
            </View>
        )
    }
}

styles = StyleSheet.create({
    container: {
        height: 20,
        position: 'relative',
        zIndex: 1000000,
    },

    button: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10,
        backgroundColor: 'transparent',
    },

    buttonText: {
        fontSize: 24,
    },

    arrow: {
        width: 0,
        height: 0,
        marginLeft: 10,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderBottomWidth: 6,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#fff',
        transform: [
            {rotate: '180deg'}
        ]
    },
    
    listContainer: {
        position: 'absolute',
        backgroundColor: '#fff',
        left: 10,
        // flex: 1,
        flexDirection: 'column',
        flexWrap: 'nowrap',
        maxWidth: 250,
    },

    list: {
        padding: 5,
    },

    listItemTextStyle: {
        fontSize: 18,
        marginBottom: 4,
    }
})