/**
 * Created by xzy on 2017/12/19.
 */
import React, { Component } from 'react'
import TabPane from './TabPane'

export default class TabContent extends Component{
    static propTypes = {
        activeKey: React.PropTypes.string.isRequired,
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node
        ])
    }
    static defaultProps = {
        activeKey: 0
    }
    constructor(props){
        super(props)

        this.getMarginLeft = this.getMarginLeft.bind(this)

        this.state = {
            moveLength: 0
        }
    }

    componentDidMount(){
        //初始化tabContent的位置
        this.getMarginLeft(this.props.activeKey)
    }

    //当tabNav发生切换时重新计算tabContent的偏移量
    componentWillReceiveProps(nextProps){
        if(nextProps.activeKey !== this.props.activeKey){
            this.getMarginLeft(nextProps.activeKey)
        }
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

    //计算tab-content容器移动的距离，以此来实现面板的切换
    getMarginLeft(activeKey){
        if(!this.tabsContent || !(/[0-9]+/.test(Number(activeKey)))){
            return 0
        }
        let width = this.tabsContent.offsetWidth

        let marginLeft =  -activeKey * width

        this.setState({
            moveLength: marginLeft
        })
    }

    render(){

        return (
            <div className="tabs-content"
                 style={{marginLeft: this.state.moveLength}}
                 ref={(el) => this.tabsContent = el}
            >
                {this.getTabPane()}
            </div>
        )
    }

}