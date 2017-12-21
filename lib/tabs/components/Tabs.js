/**
 * Created by xzy on 2017/12/19.
 */
import React, { Component } from 'react'
import TabNav from './TabNav'
import TabContent from './TabContent'
import '../style/tabs.scss'

export default class Tabs extends Component{
    static propTypes = {
        defaultActiveKey: React.PropTypes.string,
        activeKey: React.PropTypes.string,
        onChange: React.PropTypes.func,
        onTabClick: React.PropTypes.func,
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node
        ])
    }

    constructor(props){
        super(props)

        this.handleTabClick = this.handleTabClick.bind(this);

        let activeKey = '0';
        if('activeKey' in this.props){
            activeKey = this.props.activeKey
        }else if('defaultActiveKey' in this.props){
            activeKey = this.props.defaultActiveKey
        }
        this.state = {
            activeKey, //当前激活的tab
        }
    }
    /*功能点：（所有关于切换的事件都在这里处理，因为涉及到index的传递）
    * 1.点击tabNav进行切换(激活的tab不变则不发生响应)，同时暴露onChange方法
    * 2.接收defaultActiveKey和activeKey, activeKey优先级大于defaultActiveKey
    * */
    componentWillReceiveProps(nextProps){
        if('activeKey' in nextProps && nextProps.activeKey !== this.state.activeKey){
            this.setState({
                activeKey: nextProps.activeKey, //外部传入activeKey更新
            })
        }
    }

    //点击tabNav进行切换
    handleTabClick(activeKey, e){
        let prevKey = this.state.activeKey

        /*
        * 1.激活的tab 和 当前激活的tab 不是同一个
        * 2.如果组件外部传入activeKey,那么这里将不做更新, 但是 会触发onChange
        */
        if(!(prevKey == activeKey)){
            if(!('activeKey' in this.props)){
                this.setState({
                    activeKey,
                })
            }
            //暴露onChange
            if(this.props.onChange){
                this.props.onChange(activeKey, e)
            }
        }
        //暴露onTabClick
        if(this.props.onTabClick){
            this.props.onTabClick(activeKey, e)
        }
    }

    //渲染TabNav
    getTabNav(){
        return (
            <TabNav activeKey={this.state.activeKey}
                    children={this.props.children}
                    onTabClick={this.handleTabClick}
            />
        )
    }
    /*
     * 渲染TabContent
     * - tabs的children会作为tabContent的children
     * */
    getTabContent(){
        return (
            <TabContent activeKey={this.state.activeKey}
                        children={this.props.children}
            />
        )
    }

    render(){
        return (
            <div className="tabs">
                { this.getTabNav() }
                { this.getTabContent() }
            </div>
        )
    }

}