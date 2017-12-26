import React, { Component, PropTypes, cloneElement } from 'react';
import ReactDOM from 'react-dom';

import Tabs from '../components/Tabs';
import TabPane from '../components/TabPane';
import './style/index.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.handleChangeTab = this.handleChangeTab.bind(this)
        this.handleChangeKey = this.handleChangeKey.bind(this)
        this.handleChangeType = this.handleChangeType.bind(this)
        this.handleChangeTabPosition = this.handleChangeTabPosition.bind(this)

        this.state = {
            activeKey: '0',
            type: 'line',
            tabPosition: 'top',
        }
    }
    /*外部控制传入activeKey*/
    handleChangeKey(e){
        this.setState({
            activeKey: e.target.value
        })
    }
    /*通过onChange的监听改变this.state.activeKey*/
    handleChangeTab(activeKey){
        this.setState({
            activeKey
        })
    }
    /*切换选项卡类型*/
    handleChangeType(e){
        this.setState({
            type: e.target.value
        })
    }
    /*切换选项卡位置*/
    handleChangeTabPosition(e){
        this.setState({
            tabPosition: e.target.value
        })
    }

    render() {
        return (
            <div>
                <div className="operator">
                    <div>
                        <span>切换 Tab：</span>
                        <select onChange={this.handleChangeKey}>
                            <option value="0">tab1</option>
                            <option value="1">tab2</option>
                            <option value="2">tab3</option>
                        </select>
                    </div>
                    <div>
                        <span>切换 Type：</span>
                        <select onChange={this.handleChangeType}>
                            <option value="line">line</option>
                            <option value="card">card</option>
                        </select>
                    </div>
                    <div>
                        <span>切换 TabPosition：</span>
                        <select onChange={this.handleChangeTabPosition}>
                            <option value="top">top</option>
                            <option value="left">left</option>
                            <option value="right">right</option>
                            <option value="bottom">bottom</option>
                        </select>
                    </div>
                </div>
                <br/>
                <Tabs activeKey={this.state.activeKey}
                      defaultActiveKey="1"
                      onChange={this.handleChangeTab}
                      type={this.state.type}
                      tabPosition={this.state.tabPosition}
                >
                    <TabPane tab="tab1" key="1" >这是tab1</TabPane>
                    <TabPane tab="tab2" key="2" >这是tab2</TabPane>
                    <TabPane tab="tab3" key="3" >这是tab3</TabPane>
                </Tabs>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
