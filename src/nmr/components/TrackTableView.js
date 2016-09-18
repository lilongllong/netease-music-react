import React, { Component } from "react";

import TimeUtil from "../util/TimeUtil";

export default class TrackTableView extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { selectedID: props.selectedID };
        this.data = props.data;
        this.className = props.className;
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
        const $trs = this.data.tracks.map(track => {
            const data = {
                id: track.id,
                content: {
                    name: track.name,
                    timer: TimeUtil.formateTime(track.lmusic ? track.lMusic.playTime : track.duration),
                    artists: track.artists.map(artist => artist.name).join(","),
                    album: track.album.name
                }
            };
            return this.createItem(data);
        });
        return (<table className={ this.className }>
                <thead> { $header } </thead>
                <tbody> { $trs } </tbody>
            </table>);
    }

    createItem(data)
    {
        const $tds = [];
        for(const key in data.content)
        {
            $tds.push((<td key={ key + data.id }> { data.content[key] } </td>))
        }
        return ( <tr key={ data.id} ref={ data.id }> { $tds } </tr> );
    }

}
