import React, { Component, PropTypes } from 'react';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import classnames from 'classnames';
import ServiceClient from '../service/ServiceClient';

export default class LyricComponent extends Component {

    static propTypes = {
        songId: PropTypes.number,
        songProcessTime: PropTypes.number
    };

    static defaultProps = {
        songId: null,
        songProcessTime: null,
    };

    state = {
        data: null,
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
                        data: lyrics.filter(item => item.content !== ""),
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

    componentDidUpdate(prevProps, prevState) {
        if (this._signupNode) {
            console.log('xx');
            this.goToSignupNode();
        }
    }

    createLyricItem(data, nextData) {
        let isActive = false;
        if (this.props.time !== undefined && this.props.time !== null) {
            if (this.props.time < this.handleTimeFormate(nextData.time) && this.props.time > this.handleTimeFormate(data.time)) {
                isActive = true;
            }
        }
        return (<tr
            key={data.time}
            ref={isActive ? this.setSignupNode : data.time}
            className={classnames('lyric-item', { active: isActive })}
        ><td>{data.content}</td></tr>);
    }

    handleTimeFormate(text) {
        if (text) {
            const times = text.split(':');
            const timeNum = parseInt(times[0]) * 60 + parseFloat(times[1]);
            return timeNum;
        }
        return 10000;
    }

    render() {
        if (this.state.data) {
            const $lyrics = this.state.data.map((item, index) => {
                const nextData = this.state.data[index + 1] ? this.state.data[index + 1] : { time: null, content: null };
                return this.createLyricItem(item, nextData);
            });
            return (<div className="nm-lyric">
                <table className="lyric-list"><tbody>{$lyrics}</tbody></table>
            </div>);
        }
        return (<div className="nm-lyric">
            <tabel className="lyric-list"></tabel>
        </div>);
    }

}
