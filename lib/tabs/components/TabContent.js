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
        tabPosition: 'top'
    }
    constructor(props){
        super(props)

        this.getMarginLeft = this.getMarginLeft.bind(this)
    }

    /*
     * 渲染TabPane
     * - 循环tabs的children属性，每个child都对应有一个tabNav并且tabNav的内容为child.tab
     * */
    getTabPane(){
        return (
            React.Children.map(this.props.children, (child) => {
                return (
                    <TabPane key={child.key}
                             isActive={this.props.activeKey === child.key}
                             children={child.props.children}
                    />
                )
            })
        )
    }

    /*根据this.props.activeKey计算容器的marginLeft值*/
    getMarginLeft(){
        let style = {}
        if(this.props.tabPosition == 'top' || this.props.tabPosition == 'bottom'){
            let index = 0
            React.Children.forEach(this.props.children, (child, i) => {
                if(this.props.activeKey === child.key){
                    index = i
                    return
                }
            })

            style = {marginLeft: `${-index*100}%`}
        }
        return style
    }

    render(){

        return (
            <div className="tabs-content" style={this.getMarginLeft()}>
                {this.getTabPane()}
            </div>
        )
    }

}