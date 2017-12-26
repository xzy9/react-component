/**
 * Created by xzy on 2017/12/19.
 */
import React, { Component } from 'react'
import TabPane from './TabPane'

export default class TabContent extends Component{
    static propTypes = {
        activeKey: React.PropTypes.string.isRequired,
        tabPosition: React.PropTypes.oneOf(['top', 'left', 'right', 'bottom']),
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node
        ])
    }
    static defaultProps = {
        activeKey: 0,
        tabPosition: 'top'
    }
    constructor(props){
        super(props)
    }

    /*
     * 渲染TabPane
     * - 循环tabs的children属性，每个child都对应有一个tabNav并且tabNav的内容为child.tab
     * */
    getTabPane(){
        return (
            React.Children.map(this.props.children, (child, index) => {
                return (
                    <TabPane isActive={this.props.activeKey == index}
                             children={child.props.children}
                    />
                )
            })
        )
    }

    render(){
        let style = {}
        if(this.props.tabPosition == 'top' || this.props.tabPosition == 'bottom'){
            style = {marginLeft: `${-this.props.activeKey*100}%`}
        }

        return (
            <div className="tabs-content" style={style}>
                {this.getTabPane()}
            </div>
        )
    }

}