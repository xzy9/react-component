/**
 * Created by xzy on 2017/12/19.
 */
import React, { Component } from 'react'
import classNames from 'classnames'

export default class TabNav extends Component{
    static propTypes = {
        activeKey: React.PropTypes.string.isRequired,
        tabBarStyle: React.PropTypes.object,
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node
        ]),
        onTabClick: React.PropTypes.func
    }
    static defaultProps = {
        tabBarStyle: {}
    }
    constructor(props){
        super(props)
    }
    //点击tab后触发
    onTabClick(activeKey){
        this.props.onTabClick(activeKey)
    }
    /*
     * 渲染TabNav
     * - 循环children属性，每个child都对应有一个tabNav并且tabNav的内容为child.props.tab
     * */
    getTabNav(){
        return (
            React.Children.map(this.props.children, (child) => {
                //动态添加class
                let className = classNames({
                    'tabs-tab': true,
                    'tabs-tab-active': this.props.activeKey === child.key,
                    'tabs-tab-disabled': child.props.disabled
                })

                //绑定事件
                let events = {}
                if(!child.props.disabled){
                    events.onClick = this.onTabClick.bind(this, child.key)
                }

                return (
                    <div key={child.key}
                         className={className}
                         {...events}
                    >
                        {child.props.tab}
                    </div>
                )
            })
        )
    }
    render(){
        return (
            <div className="tabs-bar" style={this.props.tabBarStyle}>
                <div className="tabs-nav">
                    {this.getTabNav()}
                </div>
            </div>
        )
    }

}