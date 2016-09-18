import React from "react";

export default class PlayListsView extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = { selectedID: props.selectedID, class: props.class };
        this.data = props.data;
        this.className = props.className;
    }

    render()
    {
        const $lis = this.data.map((playlist) => {
        let className = "nm-playlist-item";
        if (playlist.id === this.selectedID )
        {
            className += " selected";
        }

        return (<li ref={ playlist.id } key={ playlist.id } className={ className } onClick={ () => this._onClick(playlist.id) } > <span className="icon iconfont icon-music"></span> { playlist.name } </li>);
        });
        return ( <ul className={ this.className } >
            {$lis}
        </ul>);
    }

    _onClick(id)
    {
        if (id !== this.selectedID)
        {
            const $target = $(this.refs[id]);
            const $oldTarget = $(this.refs[this.state.selectedID]);
            if ($oldTarget)
            {
                $oldTarget.removeClass("selected");
            }
            $target.addClass("selected");
            this.setState({ selectedID: id})
        }
    }

}

PlayListsView.propTypes = { selectedPlaylist: React.PropTypes.string, data: React.PropTypes.array };
PlayListsView.defaultTypes = { selectedPlaylist: null, data: [] };
