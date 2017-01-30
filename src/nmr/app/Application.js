import React, {Component} from "react";

import PlayerSongList from '../components/PlayerSongList';
import PlayerView from "../components/PlayerView";
import PlayListsView from "../components/PlayListsView";
import SearchView from "../components/SearchView";
import ServiceClient from "../service/ServiceClient";
import TrackInfoView from "../components/TrackInfoView";
import TrackTableView from "../components/TrackTableView";

export default class Application extends Component {
    constructor(props) {
        super(props);

        this.searchSelectionChange = this.searchSelectionChange.bind(this);
        this.playSelectionChange = this.playSelectionChange.bind(this);
        this.trackSelectionChange = this.trackSelectionChange.bind(this);
        this.trackInfoChange = this.trackInfoChange.bind(this);
        this.songlistAddChange = this.songlistAddChange.bind(this);
        this.toggleSonglistOpen = this.toggleSonglistOpen.bind(this);
    }

    static defaultProps = {
        userId: ""
    }

    static propTypes = {
        userId: React.PropTypes.string.isRequired
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
    }

    render() {
        return (
            <div className="nm-app">
                <header>
                    <h1>网易云音乐</h1>
                    <SearchView className="nm-search-view"
                                placeholder="请输入"
                                songlistAddChange={this.songlistAddChange}
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
                                       songlistAddChange={this.songlistAddChange}
                        />
                        <TrackTableView className="nm-track-table-view striped"
                                        playlistId={ this.state.selectedPlaylistId }
                                        handleSelectionChange={this.trackSelectionChange}
                                        handleInfoChange={this.trackInfoChange}
                        />
                    </section>
                </main>
                <footer>
                    <PlayerView className="nm-player-view"
                                selectedTrack={this.state.selectedTrack}
                                songlist={this.state.songlist}
                                handleSelectionChange={this.songlistAddChange}
                                handleSonglistOpenChange={this.toggleSonglistOpen}
                    />
                    <PlayerSongList className="nm-player-songlist"
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
        console.log(value);
        const sameSong = this.state.songlist.find(item => item.id === value.id);
        if (sameSong === undefined) {
            this.setState({
                songlist: this.state.songlist.concat(value)
            });
        }
    }

    trackInfoChange(data) {
        this.setState({
            trackInfo: data
        });
    }

    searchSelectionChange(data) {
        this.setState({
            trackInfo: {
                imgsrc: data.album.picUrl,
                name: data.name,
                artist: data.artists.map(artist => artist.name).join(","),
                type: "单曲",
                mp3Url: data.mp3Url
            },
            selectedTrack: data,
            selectedPlaylistId: ""
        });
    }

    toggleSonglistOpen(state = !this.state.songlistOpen) {
        this.setState({
            songlistOpen: state
        });
    }

    tempFunc = () => {
        return null;
    }
}
