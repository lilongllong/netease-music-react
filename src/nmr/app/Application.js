import React, { Component } from "react";

import PlayListsView from "../components/PlayListsView";
import ServiceClient from "../service/ServiceClient";
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
    }

    componentWillUpdate()
    {

    }

    render()
    {
        console.log("1.1", this.state.selectedPlaylistId);
        return (<div className="nm-app">
        <header><h1>网易云音乐</h1></header>
        <main>
            <aside className="sidebar"> <PlayListsView className="nm-play-list-view" userId={ this.props.userId } handleSelectionChange={ this.playSelectionChange.bind(this) } /> </aside>
            <section className="content"><TrackTableView className="nm-track-table-view striped" playlistId={ this.state.selectedPlaylistId } handleSelectionChange={ this.trackSelectionChange.bind(this) }/></section>
        </main>
        <footer></footer>
        </div>);

        //
    }

    playSelectionChange(playlistId)
    {
        if (playlistId !== this.state.selectedPlaylistId)
        {
            console.log("update Id 1", playlistId);
            this.setState({ selectedPlaylistId: playlistId });
        }
    }

    trackSelectionChange(track)
    {
        if (this.track !== this.state.selectedTrack )
        {
            console.log("track", track);
            this.setState({ selectedTrack: track });
        }
    }
}
