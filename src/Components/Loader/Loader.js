import React        from 'react'
import PropTypes    from 'prop-types'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Animated,
    Easing
}                   from 'react-native'

const { width, height } = Dimensions.get('window')
let styles

export default class Loader extends React.Component {

    static propTypes = {
        show: PropTypes.bool
    }

    static defaultProps = {
        show: false
    }

    constructor(props) {
        super(props)

        this.interval = null
        this.state = {
            anim: new Animated.Value(0)
        }
    }

    componentWillMont() {
        if (this.props.show) {
            this._spin()
            this._setSpinInterval()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.show && nextProps.show) {
            this._spin()
            this._setSpinInterval()
        } else if (!nextProps.show) {
            clearInterval(this.interval)
        }
    }

    _spin() {
        this.state.anim.setValue(0);
        Animated.timing(this.state.anim, {
			toValue: 1,
			duration: 1000,
			easing: Easing.in,
		}).start();
    }

    _setSpinInterval() {
        this.interval = setInterval(this._spin.bind(this), 1000)
    }

    render() {
        const { show } = this.props
        const showStyle = show ? {width: width, height: height} : {}
        const spin = this.state.anim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <View style={[styles.loaderContainer, showStyle]}>
                <Animated.View 
                    style={[styles.loader, {
                        transform: [{
                            rotate: spin
                        }]
                    }]}>
                </Animated.View>
            </View>
        )
    }
}

styles = StyleSheet.create({
    loaderContainer: {
        position: 'absolute',
        zIndex: 5000,
        backgroundColor: 'rgba(0,0,0,0.5)',
        overflow: 'hidden',
        height: 0,
        left: 0,
        top: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    loader: {
        position: 'relative',
        width: 50,
        height: 50,
        borderRadius: 25,
        borderLeftWidth: 3,
        borderTopWidth: 3,
        borderRightWidth: 3,        
        borderColor: 'blue',
        backgroundColor: 'transparent',
    },

    circleSpacer: {
    }
})
