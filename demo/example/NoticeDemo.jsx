import React, { Component } from 'react';
import {NoticeCenter} from './index';

const handleNoticeClick = (e) => {
    console.log(e)
}

export default class NoticeDemo extends Component {
    showNotice(type = ''){
        let notice = {
            content: <p>{type+' content'}</p>,
            title: 'title' + type,
        }
        if (type === 'delay') {
            notice.delay = 2000
        }

        if (type === 'event') {
            notice.onClick = handleNoticeClick
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
                        <button onClick={() => this.showNotice()}>show notice</button>
                    </li>
                    <li>
                        <h4>Hotice Delay</h4>
                        <button onClick={() => this.showNotice('delay')}>show notice</button>
                    </li>
                    <li>
                        <h4>Event</h4>
                        <button onClick={() => this.showNotice('event')}>show notice</button>
                    </li>
                </ol>
                <NoticeCenter ref="ncNode"/>
            </div>
        );
    }
}
