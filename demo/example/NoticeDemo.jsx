import React, { Component } from 'react';
import {NoticeCenter} from './index';

const handleNoticeClick = (e) => {
    console.log(e)
}

export default class NoticeDemo extends Component {
    showNotice(type = ''){
        let notice = {
            title: 'Notice: ' + type,
            content: <div>
                        <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. 
                    </div>,
        }
        if (type === 'delay') {
            notice.delay = 1000
        }

        if (type === 'onClick') {
            notice.onClick = handleNoticeClick
        }
        if (type === 'manually') {
            notice.delay = 0;
        }

        let node = this.refs.ncNode
        node.addNotice(notice)
    }

    render() {
        return (
            <div>
                <ol>
                    <li>
                        <h4>Show Notice</h4>
                        <button onClick={() => this.showNotice('normal')}>click</button>
                    </li>
                    <li>
                        <h4>Notice Delay time</h4>
                        <button onClick={() => this.showNotice('delay')}>delay: 1000 ms</button>
                    </li>
                    <li>
                        <h4>Manually close</h4>
                        <button onClick={() => this.showNotice('manually')}>click</button>
                    </li>
                    <li>
                        <h4>onClick</h4>
                        <button onClick={() => this.showNotice('onClick')}>click</button>
                    </li>
                </ol>
                <NoticeCenter ref="ncNode"/>
            </div>
        );
    }
}
