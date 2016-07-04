import React, { Component } from 'react';
import {NoticeCenter} from './index';

const handleNoticeClick = (props) => {
    if (props.link) {
        window.open(props.link)
    }
}

export default class NoticeDemo extends Component {
    showNotice(type = ''){
        let notice = {
            title: 'Notice: ' + type,
            link: 'http://braavos.me',
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
                        <pre>
                            <code>{`<NoticeCenter ref="ncNode"/>`}</code>
                        </pre>
                        <button onClick={() => this.showNotice('normal')}>click</button>
                        <pre>
                            <code>
{`
this.refs.ncNode.addNotice({
    title: title,
    content: <p>content</p>,
    ...
})
`}                            
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Notice Delay time</h4>
                        <button onClick={() => this.showNotice('delay')}>delay: 1000 ms</button>
                        <pre>
                            <code>
{`
this.refs.ncNode.addNotice({
    title: title,
    content: <p>content</p>,
    delay: 1000,
})
`}                                 
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Manually close</h4>
                        <button onClick={() => this.showNotice('manually')}>click</button>
                        <pre>
                            <code>
{`
this.refs.ncNode.addNotice({
    title: title,
    content: <p>content</p>,
    delay: 0,
    ...
})
`}                                 
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>onClick</h4>
                        <button onClick={() => this.showNotice('onClick')}>click</button>
                        <pre>
                            <code>
{`
this.refs.ncNode.addNotice({
    title: title,
    content: <p>content</p>,
    onClick: onClickFunction,
    ...
})
`}                                 
                            </code>
                        </pre>
                    </li>
                </ol>
                <NoticeCenter ref="ncNode"/>
            </div>
        );
    }
}
