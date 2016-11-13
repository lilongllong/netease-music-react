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

    render()
    {
        let $lis = [];
        if (this.state.data && Array.isArray(this.state.data))
        {
            this.state.data.map( item => {
                return (<li className="suggestion-list-item"></li>);
            });
        }
        return (<ul className={ this.props.className || "" } >
            <li>歌曲列表</li>
            {$lis}
        </ul>);
    }
}
