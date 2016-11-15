import React from "react";
import ReactDOM from "react-dom";

import Application from "./Application";

import ServiceClient from "../service/ServiceClient";

import PlayListsView from "../components/PlayListsView";
import TrackTableView from "../components/TrackTableView";

export default class ApplicationController
{
    constructor(props)
    {
        this.view = this.createView(props.viewOptions);
        this.state = { selectedPlayListID: null, selctedTrackID: null };
    }

    createView(props)
    {
        return new Application(props);
    }

    async run()
    {
        try
        {
          await ServiceClient.getInstance().login();
          this._loadAllPlayList();
        }
        catch (e)
        {
          console.error(e);
        }
        $(document.body).append(this.view.$element);
        setInterval(() => {
            console.log(this.state);
        }, 1000);
    }

    async _loadAllPlayList()
    {
        const playlists = await ServiceClient.getInstance().getUserPlayLists();
        ReactDOM.render(
            <PlayListsView data={ playlists } selectedID={ this.state.selectedPlayListID } className="nm-play-list-view"/>,
            $(".sidebar")[0]
        );

        const tracks = await ServiceClient.getInstance().getPlayListDetail(playlists[0].id);
        ReactDOM.render(
            <TrackTableView data={ tracks } selectedID={ this.state.selctedTrackID } className="nm-track-table-view striped"/>,
            $(".content")[0]
        );

    }
}
