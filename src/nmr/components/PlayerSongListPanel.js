import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import TrackInfoModel from '../model/TrackInfoModel';

import ServiceClient from "../service/ServiceClient";

export default class PlayerSongList extends Component {
    static propTypes = {
        className: PropTypes.string,
        songlist: PropTypes.array.isRequired,
        playingTrack: PropTypes.object,
        handleToggleChange: PropTypes.func.isRequired,
        handleSelectionChange: PropTypes.func.isRequired,
        AddedSong: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
        open: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        className: null,
        songlist: null,
        playingTrack: null,
        handleToggleChange: null,
        handleSelectionChange: null,
        AddedSong: null,
    }

    state = {
        open: true,
        songlist: [],
    }

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
        if (nextProps && nextProps.AddedSong) {
            // add song to player's songlist
        }

        if (this.state.open !== nextProps.open) {
            this.setState({open: nextProps.open});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this._signupNode) {
            this.goToSignupNode();
        }
    }




    render() {
        const songCount = this.props.songlist.length;
        return (<div className={classnames(this.props.className, 'panel', (this.state.open ? "nm-show" : "nm-hide"))}>
            <div className="panel-header">
                <div className="panel-title">{`播放列表(${songCount})`}</div>
                <div className="panel-extra">
                    <a className="clearBtn">
                        <span className="iconfont icon-clear"></span>
                        <div className="label">清除</div>
                    </a>
                    <span className="song-lyric-name">{this.props.playingTrack ? this.props.playingTrack.name : ""}</span>
                    <a className="songlist-close" onClick={this.toggle}><span className="iconfont icon-close"></span></a>
                </div>
            </div>
            <div className="panel-body">
                <div className="songlist-table">
                    {this.createSongTable()}
                </div>
                <div className="song-lyric"></div>
            </div>
        </div>);
    }

    createSongTable() {
        if (this.props.songlist) {
            const result = this.props.songlist.map(item => {
                let isActive = false;
                if (this.props.playingTrack && this.props.playingTrack.id === item.id) {
                    isActive = true;
                }
                return (<tr
                key={item.id}
                ref={isActive ? this.setSignupNode : item.id}
                data-id={item.id}
                data-track={JSON.stringify(item.data)}
                onClick={this.handleSelectionChange}
                className={ classnames("songlist-item", (isActive ? "active" : ""))}
                >
                    <td key={`${item.id}-icon`} className="playing-icon"><span className={(isActive ? "iconfont icon-playing-triangle" : "")}></span></td>
                    <td key={`${item.id}-name`} className="song-name">{item.name}</td>
                    <td key={`${item.id}-artist`} className="song-artist">{item.artist}</td>
                    <td key={`${item.id}-duration`} className="song-duration">{item.time}</td>
                </tr>);
            });
            return (<table><tbody>{result}</tbody></table>)
        }
        return null;
    }

    handleSelectionChange = (e) => {
        const id = e.currentTarget.dataset.id;
        const data = JSON.parse(e.currentTarget.dataset.track);
        if (id && id !== this.props.playingTrack.id) {
            this.props.handleSelectionChange(data);
        }
    }

    toggle = () => {
        this.props.handleToggleChange();
    }

}
