/**
 * Created by xzy on 2017/12/19.
 */
import React, { Component } from 'react'

export default class TabPane extends Component{
    static propTypes = {
        tab: React.PropTypes.oneOfType([
            React.PropTypes.node,
            React.PropTypes.string
        ]),
        isActive: React.PropTypes.bool.isRequired,
        children: React.PropTypes.oneOfType([
            React.PropTypes.node,
            React.PropTypes.string
        ])
    }
    static defaultProps = {
        tab: '',
        isActive: false,
    }
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className={"tabs-tabpane " + (this.props.isActive ? "tabs-tabpane-active" : '')}>
                {this.props.children}
            </div>
        )
    }

}