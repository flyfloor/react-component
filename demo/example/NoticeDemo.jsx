import React, { Component } from 'react';
import {NoticeCenter} from './index';

const handleNoticeClick = (props) => {
    alert('onClick')
    if (props.link) {
        window.open(props.link)
    }
}

let nc = NoticeCenter.init()

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

        nc.addNotice(notice)
    }

    render() {
        return (
            <div>
                <ol>
                    <li>
                        <h4>Show Notice</h4>
                        <pre>
                            <code>
{`
import {NoticeCenter} from 'react-ui-component';

let nc = NoticeCenter.init(options)
// notice center component options
options: {
    className: '', // notice center className hook
    ...
}

// show notice
nc.addNotice(notice)

// remove notice from index
nc.removeNotice(index)
`}
</code>
                        </pre>
                        <button onClick={() => this.showNotice('normal')}>click</button>
                        <pre>
                            <code>
{`
let nc = NoticeCenter.init()
nc.addNotice({
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
let nc = NoticeCenter.init()
nc.addNotice({
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
let nc = NoticeCenter.init()
nc.addNotice({
    title: title,
    content: <p>content</p>,
    delay: 0,
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
let nc = NoticeCenter.init()
nc.addNotice({
    title: title,
    content: <p>content</p>,
    onClick: onClickFunc
})
`}                                 
                            </code>
                        </pre>
                    </li>
                </ol>
            </div>
        );
    }
}
