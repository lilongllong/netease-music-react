import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import ServiceClient from "../service/ServiceClient";

export default class PlayerSongList extends Component {
    static propTypes = {
        className: PropTypes.string,
        playingTrack: PropTypes.shape({
            
        }),
        handleToggleChange: PropTypes.func.isRequired,
        handleSelectionChange: PropTypes.func.isRequired,
        AddedSong: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
        open: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        className: null,
        handleToggleChange: null,
        handleSelectionChange: null,
        AddedSong: null,
    }

    state = {
        open: true,
        songlist: [],
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.AddedSong) {
            // add song to player's songlist
        }

        if (this.state.open !== nextProps.open) {
            this.setState({open: nextProps.open});
        }
    }

    render() {
        const songCount = this.state.songlist.length;
        return (<div className={classNames(this.props.className, 'panel', (this.state.open ? "nm-show" : "nm-hide"))}>
            <div className="panel-header">
                <div className="panel-title">{`播放列表(${songCount})`}</div>
                <div className="panel-extra">
                    <a className="clearBtn">
                        <span className="iconfont icon-clear"></span>
                        <div className="label">清除</div>
                    </a>
                    <span className="song-lyric-name"></span>
                    <a onClick={this.toggle}><span className="iconfont icon-close"></span></a>
                </div>
            </div>
            <div className="panel-body">
                <div className="songlist-table"></div>
                <div className="song-lyric"></div>
            </div>
        </div>);
    }

    async createSongTable() {

    }

    /**
    * songData: {
    *   songId,
    *   songName,
    *   songArtist,
    *   time
    *    }
    **/
    AddSongToHistory = (songData) => {
        // TODO
        // Add songData to history
    }

    AddSongToList = (songData) => {
        // TODO
        // Add songData to list
    }

    toggle = () => {
        this.props.handleToggleChange();
    }

}
