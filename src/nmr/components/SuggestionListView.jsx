import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ServiceClient from '../service/ServiceClient';

class SuggestionListView extends Component {
    state = {
        data: this.props.data
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && Array.isArray(nextProps.data)) {
            this.setState({ data: nextProps.data });
        } else {
            this.setState({ data: [] });
        }
    }

    async _handSelectionChange(item) {
        const songInfo = await ServiceClient.getInstance().fetchSongDetails(item.id);
        this.props.handleSearchSelectionChange(songInfo[0]);
    }

    render() {
        let $lis = [];
        if (this.state.data && Array.isArray(this.state.data)) {
            this.state.data.forEach((item, index) => {
                $lis.push(<li
                    key={`nm-item${index}`}
                    className="suggestion-list-item"
                    onMouseDown={() => this._handSelectionChange(item)}
                >
                    <span className="iconfont icon-music" />
                    <span>{item.name}</span>
                    <span>{ item.artists.map(artist => artist.name).join(',')} </span>
                </li>);
            });
        }
        return (<ul className={this.props.className || ''}>
            <li ref="item-header" className="suggestion-item"><span>搜索歌曲结果</span></li>
            {$lis}
        </ul>);
    }
}

SuggestionListView.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array.isRequired,
    handleSearchSelectionChange: PropTypes.func.isRequired,
};

SuggestionListView.defaultProps = {
    className: '',
    data: [],
    handleSearchSelectionChange: null,
};

export default SuggestionListView;
