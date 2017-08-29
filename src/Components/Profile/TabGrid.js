import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import {
    View,
    FlatList,
    StyleSheet,
    Dimensions
}                           from 'react-native'
import GridItem             from '../../Components/Grid/GridItem'
import TabBar               from '../../Components/Tabs/TabBar'

let { width, height } = Dimensions.get('window')
let styles

export default class TabGrid extends Component {
    
    //data prop needs form of { dataCategory1: [], dataCategory2: []}

    static propTypes = {
        data: PropTypes.object.isRequired,
        onTabPress: PropTypes.func,
        onGridItemPress: PropTypes.func,
        itemStyles: PropTypes.object,
    }

    static defaultProps = {
        itemStyles: {},
    }

    constructor(props) {
        super(props)
        this.state = {
            activeTab: Object.keys(props.data)[0]
        }
        
        this._setActiveTab = this._setActiveTab.bind(this)
    }

    _setActiveTab(tabKey) {
        const { onTabPress } = this.props

        this.setState({activeTab: tabKey}, () => {
            onTabPress && onTabPress(tabKey)
        })
    }

    _onListItemPress(id) {
        const { onGridItemPress } = this.props

        onGridItemPress && onGridItemPress(id)
    }


    _buildGroup(list = [], groupNumber) {
        let groupedlist = []

        list.length && list.forEach((el, i) => {
            if ((i) % groupNumber == 0) {
                groupedlist.push([el])
            } else {
                groupedlist[parseInt(i / groupNumber)].push(el)
            }
        })

        return groupedlist
    }

    render() {

        const { data, itemStyles } = this.props
        const { activeTab } = this.state
        const tabs = Object.keys(data)
        const activeList = this._buildGroup(data[activeTab], 4)

        return (
            <View>
                <TabBar
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabPress={this._setActiveTab}
                />

                <FlatList
                    horizontal={true}
                    data={activeList}
                    extraData={activeList.length}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => (
                        <View style={styles.gridSep}>
                            { item.map((listItem, chalIndex) => {
                                const image = listItem.image || listItem.file

                                return <GridItem
                                            key={listItem._id}
                                            id={listItem._id}
                                            itemStyles={itemStyles}
                                            image={image}
                                            onPress={this._onListItemPress}
                                        />
                            })}
                        </View>
                        
                    )}
                />
            </View>
        )
    }
}

styles = StyleSheet.create({

    gridSep: {
        maxWidth: width - 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
})