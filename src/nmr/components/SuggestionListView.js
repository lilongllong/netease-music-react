import React, { Component } from "react";

export default class SuggestionListView extends Component
{
    static PropTypes = {
        data: React.PropTypes.object.isRequired
    }

    static defaultProps = {
        data: []
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

    constructor(props)
    {
        super(props);

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
                $lis.push(<li key={ "nm-item" + index  }  className="suggestion-list-item" onMouseDown={ () => { this.props.handleSelectionChange(item); } }>
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
}
