import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PlayerSongListPanel from '../components/PlayerSongListPanel';
import PlayerView from '../components/PlayerView';
import PlayListsView from '../components/PlayListsView';
import SearchView from '../components/SearchView';
import ServiceClient from '../service/ServiceClient';
import TrackInfoView from '../components/TrackInfoView';
import TrackTableView from '../components/TrackTableView';

import TrackInfoModel from '../model/TrackInfoModel';

class Application extends Component {
    constructor(props) {
        super(props);
        this.playSelectionChange = this.playSelectionChange.bind(this);
        this.searchSelectionChange = this.searchSelectionChange.bind(this);
        this.songlistAddChange = this.songlistAddChange.bind(this);
        this.songlistClearAllChange = this.songlistClearAllChange.bind(this);
        this.songlistSelectionChange = this.songlistSelectionChange.bind(this);
        this.songProcessTimeChange = this.songProcessTimeChange.bind(this);
        this.togglePlayerLock = this.togglePlayerLock.bind(this);
        this.toggleSonglistOpen = this.toggleSonglistOpen.bind(this);
        this.trackSelectionChange = this.trackSelectionChange.bind(this);
        this.trackInfoChange = this.trackInfoChange.bind(this);
    }

    state = {
        selectedPlaylistId: null,
        selectedTrack: null,
        songlist: [],
        trackInfo: null,
        songlistOpen: true,
        playerLockState: true,
        songProcessTime: null,
    }

    render() {
        return (
            <div className="nm-app">
                <header>
                    <div className="netease-music-logo"></div>
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
                        <TrackInfoView ref="trackInfoView" className="nm-track-info-view"
                                       data={ this.state.trackInfo }
                                       handleSelectionChange={this.trackSelectionChange}
                                       songlistAddChange={this.songlistAddChange}
                        />
                        <TrackTableView className="nm-track-table-view striped"
                                        playlistId={ this.state.selectedPlaylistId }
                                        handleSelectionChange={this.trackSelectionChange}
                                        songlistAddChange={this.songlistAddChange}
                                        handleInfoChange={this.trackInfoChange}
                        />
                    </section>
                </main>
                <footer className={this.state.playerLockState ? "lock" : "unlock"}>
                    <PlayerView className="nm-player-view"
                                lock={this.state.playerLockState}
                                selectedTrack={this.state.selectedTrack}
                                songlist={this.state.songlist}
                                handleSelectionChange={this.trackSelectionChange}
                                handleSonglistOpenChange={this.toggleSonglistOpen}
                                handleSongProcessTime={this.songProcessTimeChange}
                                handleLockChange={this.togglePlayerLock}
                    />
                    <PlayerSongListPanel className="nm-player-songlist-panel"
                    playingTrack={this.state.selectedTrack}
                    songlist={this.state.songlist}
                    open={this.state.songlistOpen}
                    songProcessTime={this.state.songProcessTime}
                    handleToggleChange={this.toggleSonglistOpen}
                    handleSelectionChange={this.songlistSelectionChange}
                    handleSonglistClearAllChange={this.songlistClearAllChange}
                    />
                </footer>
            </div>
        );
    }

    playSelectionChange(playlistId) {
        if (playlistId !== this.state.selectedPlaylistId) {
            $('section.content').animate({opacity: 0}, 200, 'linear', () => {
              $('section.content').scrollTop(0);
              $('.nm-track-info-view').css('opacity', 0);
              $('.nm-track-table-view').css('opacity', 0);
              this.setState({selectedPlaylistId: playlistId}, () => {
                setTimeout(() => {
                  $('section.content').animate({opacity: 1}, 200, 'linear');
                }, 200);
              });
            });
        }
    }

    trackSelectionChange(track) {
        if (track) {
            if (this.state.selectedTrack) {
                if (track.id !== this.state.selectedTrack.id) {
                    this.setState({selectedTrack: track});
                }
            }
            else {
                this.setState({selectedTrack: track});
            }
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
                songlist: [value].concat(this.state.songlist)
            });
        }
    }

    songlistClearAllChange() {
        this.setState({
            songlist: []
        });
    }

    songlistSelectionChange(value) {
        if (!this.state.selectedTrack || (this.state.selectedTrack.id !== value.id)) {
            this.setState({selectedTrack: value});
        }
    }

    songProcessTimeChange(time) {
        this.setState({
            songProcessTime: time,
        });
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
        this.songlistAddChange(trackInfo);
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
}

Application.propTypes = {
    userId: React.PropTypes.string.isRequired
}

Application.defaultProps = {
    userId: ""
}

export default Application;
