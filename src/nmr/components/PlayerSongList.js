import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import ServiceClient from "../service/ServiceClient";

export default class PlayerSongList extends Component {
    static propTypes = {
        className: PropTypes.string,
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
        showPanel: 'list',
        songlist: [],
        history: [],
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
        return (<div className={classNames(this.props.className, 'panel')}>
            <div className="panel-header">
                <p>歌曲列表</p>
                <div className="panel-title"></div>
                <div className="panel-extra"></div>
            </div>
            <div className="panel-body">

            </div>
        </div>);
    }

    async createSongTable(type) {
        switch (type) {
            case 'list': return await this._createSongListDom();
            case 'history': return await this._createSongListHistoryDom();
            default: return false;
        }
    }

    async _createSongListDom() {

    }

    async _createSongListHistoryDom() {

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


}
