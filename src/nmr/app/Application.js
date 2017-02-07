import React, {Component} from 'react';

import PlayerSongListPanel from '../components/PlayerSongListPanel';
import PlayerView from '../components/PlayerView';
import PlayListsView from '../components/PlayListsView';
import SearchView from '../components/SearchView';
import ServiceClient from '../service/ServiceClient';
import TrackInfoView from '../components/TrackInfoView';
import TrackTableView from '../components/TrackTableView';

import TrackInfoModel from '../model/TrackInfoModel';

export default class Application extends Component {
    constructor(props) {
        super(props);

        this.playSelectionChange = this.playSelectionChange.bind(this);
        this.searchSelectionChange = this.searchSelectionChange.bind(this);
        this.songlistAddChange = this.songlistAddChange.bind(this);
        this.togglePlayerLock = this.togglePlayerLock.bind(this);
        this.toggleSonglistOpen = this.toggleSonglistOpen.bind(this);
        this.trackSelectionChange = this.trackSelectionChange.bind(this);
        this.trackInfoChange = this.trackInfoChange.bind(this);
    }
    
    static propTypes = {
        userId: React.PropTypes.string.isRequired
    }

    static defaultProps = {
        userId: ""
    }

    /* trackInfo = {
        imgsrc
        name
        artist
        type
        mp3Url
        id
    }
    */

    state = {
        selectedPlaylistId: null,
        selectedTrack: null,
        songlist: [],
        trackInfo: null,
        songlistOpen: false,
        playerLockState: false,
    }

    render() {
        return (
            <div className="nm-app">
                <header>
                    <h1>网易云音乐</h1>
                    <SearchView className="nm-search-view"
                                placeholder="请输入"
                                handleSearchSelectionChange={this.searchSelectionChange}
                    />
                </header>
                <main>
                    <aside className="sidebar">
                        <PlayListsView className="nm-play-list-view"
                                       userId={ this.props.userId }
                                       handleSelectionChange={this.playSelectionChange}
                        />
                    </aside>
                    <section className="content">
                        <TrackInfoView className="nm-track-info-view"
                                       data={ this.state.trackInfo }
                                       handleSelectionChange={this.trackSelectionChange}
                                       songlistAddChange={this.songlistAddChange}
                        />
                        <TrackTableView className="nm-track-table-view striped"
                                        playlistId={ this.state.selectedPlaylistId }
                                        handleSelectionChange={this.trackSelectionChange}
                                        handleInfoChange={this.trackInfoChange}
                        />
                    </section>
                </main>
                <footer className={this.state.playerLockState ? "lock" : "unlock"}>
                    <PlayerView className="nm-player-view"
                                lock={this.state.playerLockState}
                                selectedTrack={this.state.selectedTrack}
                                songlist={this.state.songlist}
                                handleSelectionChange={this.songlistAddChange}
                                handleSonglistOpenChange={this.toggleSonglistOpen}
                                handleLockChange={this.togglePlayerLock}
                    />
                    <PlayerSongListPanel className="nm-player-songlist-panel"
                    playingTrack={this.state.selectedTrack}
                    songlist={this.state.songlist}
                    handleToggleChange={this.toggleSonglistOpen}
                    handleSelectionChange={this.tempFunc}
                    open={this.state.songlistOpen}
                    />
                </footer>
            </div>
        );
    }

    playSelectionChange(playlistId) {
        if (playlistId !== this.state.selectedPlaylistId) {
            this.setState({selectedPlaylistId: playlistId});
        }
    }

    trackSelectionChange(track) {
        if (this.track !== this.state.selectedTrack) {
            this.setState({selectedTrack: track});
            this.songlistAddChange(track);

        }
    }

    songlistAddChange(value) {
        if (value === null || value === undefined) {
            console.log("songlistAddChange params's value cann't be null or undefined!");
            return;
        }
        const sameSong = this.state.songlist.find(item => item.id === value.id);
        if (sameSong === undefined) {
            this.setState({
                songlist: this.state.songlist.concat(value)
            });
        }
    }

// 闲置， 可能会用到
    getPlayingSongIndexOfSonglist() {
        const track = this.state.selectedTrack;
        const index = this.state.songlist.findIndex(item => track.id === item.id);
        return index;
    }

    trackInfoChange(data) {
        if (data instanceof TrackInfoModel) {
            this.setState({
                trackInfo: data
            });
        }
        else {
            console.log("trackInfoChange params data's type is error. ");
        }

    }

    searchSelectionChange(data) {
        const trackInfo = new TrackInfoModel({data, type: '单曲'});
        this.setState({
            selectedPlaylistId: null
        });
        this.trackSelectionChange(data);
        this.trackInfoChange(trackInfo);
    }

    toggleSonglistOpen(state = !this.state.songlistOpen) {
        this.setState({
            songlistOpen: state
        });
    }
    togglePlayerLock(state = !this.state.playerLockState) {
        this.setState({
            playerLockState: state
        });
    }

    tempFunc = () => {
        return null;
    }
}
