import React, { Component, PropTypes } from 'react';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import classnames from 'classnames';
import ServiceClient from '../service/ServiceClient';

export default class LyricComponent extends Component {

    static propTypes = {
        songId: PropTypes.number,
        time: PropTypes.string.isRequired,
    };

    static defaultProps = {
        lyricData: null,
        time: null,
    };

    state = {
        data: null,
        text: 'x',
    };

    constructor(props) {
        super(props);
        this.setSignupNode = (node) => {
            if (node) {
                this._signupNode = node;
            }
        }
        this.goToSignupNode = () => {
            scrollIntoViewIfNeeded(this._signupNode, true, {
                duration: 150,
                easing: 'easeInOut',
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.songId !== this.props.songId) {
            ServiceClient.getInstance().fetchSongLyric(nextProps.songId).then(result => {
                if (result) {
                    const lyrics = result.lyric.split(/\r?\n/).map(item => {
                        const index = item.indexOf(']');
                        const time = item.slice(1, index);
                        const content = item.slice(index + 1);
                        return {
                            time,
                            content,
                        };
                    });
                    this.setState({
                        data: lyrics,
                    });
                } else {
                    this.setState({
                        data: null,
                    });
                }
                this.forceUpdate();
            });
        }
    }

    // data: time, lyric
    createLyricItem(data) {

        return (<li key={data.time} className={classnames('lyric-item')}>{data.content}</li>);
    }


    render() {
        if (this.state.data) {
            const $lyrics = this.state.data.map(item => this.createLyricItem(item));
            return (<div className="nm-lyric">
                <ol className="lyric-list">{$lyrics}</ol>
            </div>);
        }
        return (<div className="nm-lyric">
            <ol className="lyric-list"></ol>
        </div>);
    }

}
