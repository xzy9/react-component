/**
 * Created by xzy on 2017/12/19.
 */
import React, { Component } from 'react'
import classNames from 'classnames'

export default class TabPane extends Component{
    static propTypes = {
        className: React.PropTypes.string,
        style: React.PropTypes.object,
        tab: React.PropTypes.any,
        isActive: React.PropTypes.bool.isRequired,
        disabled: React.PropTypes.bool,
        children: React.PropTypes.oneOfType([
            React.PropTypes.node,
            React.PropTypes.string
        ])
    }
    static defaultProps = {
        tab: '',
        isActive: false,
        style: {}
    }
    constructor(props){
        super(props)
    }
    render(){
        const className = classNames("tabs-tabpane", {"tabs-tabpane-active": this.props.isActive}, this.props.className)
        return (
            <div className={className} style={this.props.style}>
                {this.props.children}
            </div>
        )
    }

}