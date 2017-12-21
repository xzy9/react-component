import React, { Component, PropTypes, cloneElement } from 'react';
import ReactDOM from 'react-dom';

import Tabs from './Tabs';
import TabPane from './TabPane';

class App extends Component {
    constructor(props) {
        super(props);

        this.handleChangeTab = this.handleChangeTab.bind(this)
        this.handleChangeKey = this.handleChangeKey.bind(this)

        this.state = {
            activeKey: '0'
        }
    }

    handleChangeKey(e){
        this.setState({
            activeKey: e.target.value
        })
    }

    handleChangeTab(activeKey){
        this.setState({
            activeKey
        })
    }

    render() {
        return (
            <div>
                <div className="operator">
                    <span>切换 Tab：</span>
                    <select onChange={this.handleChangeKey}>
                        <option value="0">tab1</option>
                        <option value="1">tab2</option>
                        <option value="2">tab3</option>
                    </select>
                </div>
                <Tabs activeKey={this.state.activeKey} defaultActiveKey="1" onChange={this.handleChangeTab}>
                    <TabPane tab="tab1" key="1" >这是tab1</TabPane>
                    <TabPane tab="tab2" key="2" >这是tab2</TabPane>
                    <TabPane tab="tab3" key="3" >这是tab3</TabPane>
                </Tabs>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
