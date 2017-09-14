import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ServiceClient from '../service/ServiceClient';

class PlayListsView extends Component {
    constructor(props) {
        super(props);
        this._initData();
    }

    state = {
        selectedId: null,
        data: []
    }

    async _initData() {
        const result = await ServiceClient.getInstance().getUserPlayLists(this.props.userId);
        const $target = $(this.refs[result[0].id]);
        $target.addClass('selected');
        this.props.handleSelectionChange(result[0].id);
        this.setState({ data: result, selectedId: result[0].id });
    }
    /* global document $:true */
    _onClick(id) {
        if (id !== this.state.selectedId) {
            const $target = $(this.refs[id]);
            const $oldTarget = $(this.refs[this.state.selectedId]);
            if ($oldTarget) {
                $oldTarget.removeClass('selected');
            }
            $target.addClass('selected');
            this.props.handleSelectionChange(id);
            this.setState({ selectedId: id});
        }
    }

    render() {
        const $lis = this.state.data.map((playlist) => {
            const className = classnames(this.props.className, { selected: playlist.id === this.selectedId });
            return (<li ref={playlist.id} key={playlist.id} className={className} onClick={() => this._onClick(playlist.id)}>
                <span className="icon iconfont icon-music-2" />{ playlist.name }
            </li>);
        });
        return (<ul className={this.props.className} >
            {$lis}
        </ul>);
    }
}

PlayListsView.propTypes = {
    className: PropTypes.string,
    userId: PropTypes.string.isRequired,
    handleSelectionChange: PropTypes.func.isRequired,
};

PlayListsView.defaultProps = {
    className: 'nm-play-list-item',
    userId: '',
    handleSelectionChange: null,
};

export default PlayListsView;
