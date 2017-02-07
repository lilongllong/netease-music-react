import React from "react";

import ServiceClient from "../service/ServiceClient";

export default class PlayListsView extends React.Component
{
    constructor(props)
    {
        super(props);
        this._initData();
    }

    static defaultProps = {
        userId: ""
    }

    static propTypes = {
        userId: React.PropTypes.string.isRequired
    }

    state = {
        selectedId: null,
        data: []
    }

    render()
    {
        const $lis = this.state.data.map((playlist) => {
        let className = "nm-play-list-item";
        if (playlist.id === this.selectedId )
        {
            className += " selected";
        }

        return (<li ref={ playlist.id } key={ playlist.id } className={ className } onClick={ () => this._onClick(playlist.id) } > <span className="icon iconfont icon-music-2"></span> { playlist.name } </li>);
        });
        return ( <ul className={ this.props.className } >
            {$lis}
        </ul>);
    }

    async _initData()
    {
         const result = await ServiceClient.getInstance().getUserPlayLists(this.props.userId);
         const $target = $(this.refs[result[0].id]);
         $target.addClass("selected");
         this.props.handleSelectionChange(result[0].id);
         this.setState({ data: result, selectedId: result[0].id });
    }

    _onClick(id)
    {
        if (id !== this.state.selectedId)
        {
            const $target = $(this.refs[id]);
            const $oldTarget = $(this.refs[this.state.selectedId]);
            if ($oldTarget)
            {
                $oldTarget.removeClass("selected");
            }
            $target.addClass("selected");
            this.props.handleSelectionChange(id);
            this.setState({ selectedId: id});
        }
    }

}
