import React, { Component } from "react";

import PlayerView from "../components/PlayerView";
import PlayListsView from "../components/PlayListsView";
import SearchView from "../components/SearchView";
import ServiceClient from "../service/ServiceClient";
import TrackInfoView from "../components/TrackInfoView";
import TrackTableView from "../components/TrackTableView";

export default class Application extends Component
{
    constructor(props)
    {
        super(props);
    }

    static defaultProps = {
        userId: ""
    }

    static propTypes = {
        userId: React.PropTypes.string.isRequired
    }


    state = {
        selectedPlaylistId: null,
        selectedTrack: null,
        trackList: [],
        trackInfo: null
    }

    componentWillUpdate()
    {

    }

    componentWillReceiveProps(nextProps)
    {

    }


    render()
    {
        console.log("1.1", this.state.selectedPlaylistId);
        return (<div className="nm-app">
        <header>
        <h1>网易云音乐</h1>
        <SearchView className="nm-search-view" placeholder="请输入" handleSelectionChange={ this.handleSearchSelectedChange.bind(this) }/>
        </header>
        <main>
            <aside className="sidebar"> <PlayListsView className="nm-play-list-view" userId={ this.props.userId } handleSelectionChange={ this.playSelectionChange.bind(this) } /> </aside>
            <section className="content">
                <TrackInfoView className="nm-track-info-view" data={ this.state.trackInfo } handleSelectionChange={ this.trackSelectionChange.bind(this) } />
                <TrackTableView className="nm-track-table-view striped" playlistId={ this.state.selectedPlaylistId } handleSelectionChange={ this.trackSelectionChange.bind(this) } handleInfoChange={ this.trackInfoChange.bind(this) }/>
            </section>
        </main>
        <footer><PlayerView className="nm-player-view" selectedTrack={ this.state.selectedTrack } trackList={ this.state.trackList } handleSelectionChange={ this.tracklistAddChange.bind(this) }/></footer>
        </div>);
    }

    playSelectionChange(playlistId)
    {
        if (playlistId !== this.state.selectedPlaylistId)
        {
            this.setState({ selectedPlaylistId: playlistId });
        }
    }

    trackSelectionChange(track)
    {
        if (this.track !== this.state.selectedTrack )
        {
            this.setState({ selectedTrack: track });
            this.state.trackList.push(track);
        }
    }

    handleSearchSelectedChange(value)
    {
        if (value && value !== "")
        {
            ServiceClient.getInstance().search(value).then(data => {

            });
        }
    }

    tracklistAddChange(value)
    {
        if ( this.state.trackList.indexOf(value) < -1 )
        {
            this.state.push(value);
        }
    }

    trackInfoChange(data)
    {
        this.setState({
            trackInfo: data
        });
    }
}
