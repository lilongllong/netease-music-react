import React, { Component } from "react";
import SuggestionListView from "./SuggestionListView";

export default class SearchView extends Component
{
    static PropTypes = {
        placeholder: React.PropTypes.string
    }

    static defaultProps = {
        placeholder: "please input"
    }

    state = {
        data: []
    }

    constructor(props)
    {
        super(props);
    }

    componentWillReceiveProps(nextProps)
    {

    }

    render()
    {
        return (<div className={ this.props.className ? this.props.className : "" }>
            <input type="search" placeholder={this.props.placeholder}/>
            <SuggestionListView className="nm-suggestion-list-view" data={ [] } handleSelectionChange={ this.handleSelectionChange.bind(this) } />
        </div>);
    }

    handleSelectionChange(data)
    {
        this.props.handleSelectionChange(data);
    }
}
