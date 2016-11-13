import React, { Component } from "react";

import ServiceClient from "../service/ServiceClient";
import TimeUtil from "../util/TimeUtil";

export default class TrackTableView extends Component
{
    static defaultProps = {
        playlistId: null
    }

    static propTypes = {
        playlistId: React.PropTypes.number.isRequired
    }

    state = {
        selectedTrack: null,
        data: []
    }

    constructor(props)
    {
        super(props);
        this._initData();
    }

    shouldComponentUpdate(nextProps, nextState)
    {

        return true
        // if (this.props.playlistId && this.props.playlistId !== "")
        // {

        // }
    }

    componentWillReceiveProps(nextProps)
    {
        console.log("receive props", nextProps);
        if (this.props.playlistId !== nextProps.playlistId)
        {
            if (nextProps.playlistId && nextProps.playlistId !== "")
            {
                ServiceClient.getInstance().getPlayListDetail(nextProps.playlistId).then((result) => {
                    if (result && result.tracks && result.tracks !== this.state.data)
                    {
                        console.log("playlistName", result.name);
                        this.setState({ data: result.tracks});
                    }
                });
            }
        }
    }

    render()
    {

        const headerData = {
            id: "header",
            content: {
                name: "歌曲标题",
                time: "时长",
                artists: "歌手",
                album: "专辑"
            }
        };
        const $header = this.createItem(headerData);
        const $trs = this.state.data.map(track => {
            const data = {
                id: track.id,
                content: {
                    name: track.name,
                    timer: TimeUtil.formateTime(track.lmusic ? track.lMusic.playTime : track.duration),
                    artists: track.artists.map(artist => artist.name).join(","),
                    album: track.album.name
                }
            };
            return this.createItem(data, track);
        });
        return (<table className={ this.props.className }>
                <thead> { $header } </thead>
                <tbody> { $trs } </tbody>
            </table>);
    }

    createItem(data, track)
    {
        const $tds = [];
        for(const key in data.content)
        {
            $tds.push((<td key={ key + data.id }> { data.content[key] } </td>))
        }

        return ( <tr key={ data.id} ref={ data.id } className= { this.state.selectedID === data.id ? "selected" : "" } onClick={ () => { this._selectedItem(data.id);this.props.handleSelectionChange(track) }}> { $tds } </tr> );
    }

    async _initData()
    {
        if (this.props.playlistId)
        {
            const data = await ServiceClient.getInstance().getPlayListDetail(this.props.playlistId);
            this.setState({ data: data });
        }
    }

    _selectedItem(id)
    {
        if (id !== this.state.selectedID && id !== "header")
        {
            const $oldTarget = $(this.refs[this.state.selectedID]);
            const $curTarget = $(this.refs[id]);

            this.setState({"selectedID": id});

            if ($oldTarget)
            {
                $oldTarget.removeClass("selected");
            }
            $curTarget.addClass("selected");

        }
    }
}
