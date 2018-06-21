/**
 * Created by xzy on 2018/06/10.
 */
import React, { Component } from 'react'
import classNames from 'classnames'

import SiderComponent from './Sider'
import './style/index.scss'

function generator(props) {
    return (BasicComponent) => {
        return class Adapter extends React.Component {
            render() {
                const { prefixCls } = props;
                return <BasicComponent prefixCls={prefixCls} {...this.props} />;
            }
        };
    }
}

class Basic extends Component{
    render(){
        let { prefixCls, className, children, ...others } = this.props
        /*className = 默认 + 外部传入class */
        const newClassName = classNames(prefixCls, className)
        return (
            <div className={newClassName} {...others}>
                { children }
            </div>
        )
    }
}
class LayoutComponent extends Component{
    static propTypes = {
        className: React.PropTypes.string,
        style: React.PropTypes.object,
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node
        ])
    }
    static childContextTypes = {
        siderHook: React.PropTypes.object
    }
    constructor(props){
        super(props)
        this.state = {
            siders: []
        }
    }
    /*
    * getChildContext:在父组件中设置context，其所有子组件均可获取到
    *  - getChildContext函数将会在每次state或者props改变时调用
    *  - 注意：必须定义contextType
    *  - 缺点：若任意子组件在中shouldComponentUpdate周期中return false，context将不会更新
    * */
    getChildContext(){
        return {
            siderHook: {
                addSider: (id) => {
                    this.setState({
                        siders: [...this.state.siders, id],
                    });
                },
                removeSider: (id) => {
                    this.setState({
                        siders: this.state.siders.filter(currentId => currentId !== id),
                    });
                },
            }
        }
    }
    render(){
        const { prefixCls, className, children, hasSider, ...others } = this.props;
        const newClassName = classNames(className, prefixCls, {
            [`${prefixCls}-has-sider`]: hasSider || this.state.siders.length > 0,
        });
        return (
            <div className={newClassName} {...others}>
                { children }
            </div>
        )
    }
}

/*let Layout = generator({
    prefixCls: 'layout'
})(LayoutComponent)*/

const Layout = generator({
    prefixCls: 'layout',
})(LayoutComponent);

const Header = generator({
    prefixCls: 'layout-header'
})(Basic)

const Footer = generator({
    prefixCls: 'layout-footer'
})(Basic)

const Content = generator({
    prefixCls: 'layout-content'
})(Basic)

const Sider = generator({
    prefixCls: 'layout-sider'
})(SiderComponent)

Layout.Header = Header
Layout.Footer = Footer
Layout.Content = Content
Layout.Sider = Sider

export default Layout