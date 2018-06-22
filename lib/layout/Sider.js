/**
 * Created by xzy on 2018/06/10.
 */
import React, { Component } from 'react'
import classNames from 'classnames'

const generateId = (() => {
    let i = 0;
    return () => {
        i += 1;
        return i
    }
})()

export default class Sider extends Component{
    static propTypes = {
        className: React.PropTypes.string,
        collapsed: React.PropTypes.bool,   //当前收起状态
        collapsedWidth: React.PropTypes.oneOfType([  //收缩宽度
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        collapsible: React.PropTypes.bool, //是否可收起
        defaultCollapsed: React.PropTypes.bool, //是否默认收起
        style: React.PropTypes.object,
        trigger: React.PropTypes.oneOfType([ //自定义 trigger，设置为 null 时隐藏 trigger
            React.PropTypes.string,
            React.PropTypes.node,
        ]),
        width: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        onCollapse: React.PropTypes.func, //展开-收起时的回调函数
        theme: React.PropTypes.string, //主题颜色
    }
    static defaultProps = {
        collapsed: false,
        collapsedWidth: 64,
        collapsible: false,
        defaultCollapsed: false,
        width: 200,
        theme: 'light',
    }
    static contextTypes = {
        siderHook: React.PropTypes.object,
    }
    constructor(props, context){
        super(props, context)

        let collapsed = false
        if(props.collapsed){
            collapsed = props.collapsed
        }else if(props.defaultCollapsed){
            collapsed = props.defaultCollapsed
        }

        this.state = {
            collapsed,
            siderId: ''
        }

        this.onCollapse = this.onCollapse.bind(this)
    }
    componentDidMount(){
        let siderId = generateId()
        this.setState({
            siderId
        })
        //将当前sider信息加到父级中
        if(this.context.siderHook){
            this.context.siderHook.addSider(siderId)
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.collapsed){
            this.setState({
                collapsed: nextProps.collapsed,
            })
        }
    }
    //缩放
    onCollapse(){
        const collapsed = !this.state.collapsed
        this.setState({
            collapsed
        })
        //向外暴露onCollapse方法
        this.props.onCollapse && this.props.onCollapse(collapsed)
    }
    componentWillUnmount(){
        //将当前sider信息移除
        if(context.siderHook){
            context.siderHook.removeSider(this.state.siderId)
        }
    }
    render(){
        const {prefixCls, className, width, collapsible, collapsedWidth, theme, style, trigger, children} = this.props
        const newClassName = classNames(className, prefixCls, `${prefixCls}-${theme}`, {
            [`${prefixCls}-collapsed`]: !!this.state.collapsed,
            [`${prefixCls}-has-trigger`]: collapsible && trigger !== null,
        })
        const siderWidth = this.state.collapsed ? collapsedWidth : width
        const siderStyle = {
            ...style,
            flex: `0 0 ${siderWidth}px`,
        }

        return (
            <div className={newClassName} style={siderStyle}>
                <div>{children}</div>
                {
                    collapsible && trigger !== null ? (
                        trigger? (
                            <div className="layout-sider-trigger" onClick={this.onCollapse}>{trigger}</div>
                        ): (
                            <div className="layout-sider-trigger" onClick={this.onCollapse}>
                                {!this.state.collapsed ? <span>&lt;</span> : <span>&gt;</span>}
                            </div>
                        )
                    ): ''
                }
            </div>
        )
    }
}