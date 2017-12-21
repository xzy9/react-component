/**
 * Created by xzy on 2017/12/19.
 */
import React, { Component } from 'react'

export default class TabNav extends Component{
    static propTypes = {
        activeKey: React.PropTypes.string.isRequired,
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node
        ]),
        onTabClick: React.PropTypes.func
    }
    static defaultProps = {
        activeKey: 0
    }
    constructor(props){
        super(props)
    }
    //点击tab后触发
    onTabClick(activeKey){
        this.props.onTabClick(activeKey.toString())
    }
    /*
     * 渲染TabNav
     * - 循环children属性，每个child都对应有一个tabNav并且tabNav的内容为child.props.tab
     * */
    getTabNav(){
        return (
            React.Children.map(this.props.children, (child, index) => {
                return (
                    <li className={"tabs-tab " + (this.props.activeKey == index ? "tabs-tab-active" : '')}
                        onClick={this.onTabClick.bind(this, index)}
                    >
                        {child.props.tab}
                    </li>
                )
            })
        )
    }
    render(){
        return (
            <div className="tabs-bar">
                <ul className="tabs-nav">
                    {this.getTabNav()}
                </ul>
            </div>
        )
    }

}