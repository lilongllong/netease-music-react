import React from "react";

export default class PlayListsView extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = { selectedPlaylist: props.selectedPlaylist, class: props.class };
        this.data = props.data;
        this.className = props.className;
    }

    render()
    {
        const $lis = this.data.map((playlist) => {
            if (playlist.id === this.selectedPlaylist )
            {
                return (<li key={ playlist.id } className="nmr-playlist-item selected">  <span className="icon iconfont icon-music"></span> { playlist.name } </li>);
            }
            else
            {
                return (<li key={ playlist.id } className="nmr-playlist-item"> <span className="icon iconfont icon-music"></span> { playlist.name } </li>);
            }
        });
        return ( <ul className={ this.className } >
            {$lis}
        </ul>);
    }
}

PlayListsView.propTypes = { selectedPlaylist: React.PropTypes.string, data: React.PropTypes.array };
PlayListsView.defaultTypes = { selectedPlaylist: null, data: [] };
