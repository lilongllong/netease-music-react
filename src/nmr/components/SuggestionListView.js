import React, { Component, PropTypes } from "react";

import ServiceClient from "../service/ServiceClient";

export default class SuggestionListView extends Component
{
    static propTypes = {
        data: PropTypes.array.isRequired,
        handleSearchSelectionChange: PropTypes.func.isRequired,
    }

    static defaultProps = {
        data: [],
        handleSearchSelectionChange: null,
    }

    state = {
        data: this.props.data
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.data && Array.isArray(nextProps.data))
        {
            this.setState({ data: nextProps.data });
        }
        else
        {
            this.setState({ data: [] });
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if (nextProps.data)
        {
            this.setState({data: nextProps.data});
        }
    }

    render()
    {
        let $lis = [];
        if (this.state.data && Array.isArray(this.state.data))
        {
            this.state.data.forEach( (item, index)=> {
                $lis.push(<li
                key={ "nm-item" + index  }
                className="suggestion-list-item"
                onMouseDown={ () => { this._handSelectionChange(item); } }
                >
                    <span className="iconfont icon-music"></span>
                    <span>{item.name}</span>
                    <span>{ item.artists.map(artist => artist.name).join(",")} </span>
                </li>);
            });
        }
        return (<ul className={ this.props.className || "" } >
            <li ref="item-header" className=""><span>搜索歌曲结果</span></li>
            {$lis}
        </ul>);
    }

    async _handSelectionChange(item)
    {
        const songInfo = await ServiceClient.getInstance().fetchSongDetails(item.id);
        this.props.handleSearchSelectionChange(songInfo[0]);
    }
}
