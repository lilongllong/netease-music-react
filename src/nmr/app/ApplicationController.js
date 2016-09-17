import React from "react";
import ReactDOM from "react-dom";

import Application from "./Application";

import ServiceClient from "../service/ServiceClient";

import PlayListsView from "../components/PlayListsView";

export default class ApplicationController
{
    constructor(props)
    {
        this.view = this.createView(props.viewOptions);
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
    }
    async _loadAllPlayList()
    {
        const playlists = await ServiceClient.getInstance().getUserPlayLists();
        ReactDOM.render(
            <PlayListsView data={ playlists } className="nm-play-list-view"/>,
            $(".sidebar")[0]
        );
        console.log(playlists);

    }
}
