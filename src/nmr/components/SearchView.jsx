import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import ServiceClient from '../service/ServiceClient';
import SuggestionListView from './SuggestionListView.jsx';

class SearchView extends Component {
    constructor(props) {
        super(props);
        this.inputTimer = null;
    }

    state = {
        data: [],
        keyword: '',
        show: false
    }

    componentDidMount() {
        this.refs.songInput.onblur = () => this.setState({show: false});
        this.refs.songInput.onfocus = () => this.setState({show: true});
    }

    handleInputChange(event) {
        if (this.inpputTimer) {
            window.clearTimeout(this.inputTimer);
            this.inputTimer = null;
        }
        event.persist();
        this.inputTimer = window.setTimeout(() => {
            const keyword = event.nativeEvent.target.value;
            if (keyword && keyword !== '') {
                if (keyword !== this.state.keyword) {
                    ServiceClient.getInstance().search(keyword, false).then(data => {
                        this.setState({
                            keyword,
                            data: (data ? data : [])
                        });
                    }, (error) => {
                        console.log('search error', error);
                    });
                }
                this.setState({ show: true });
            } else {
                this.setState({
                    keyword: '',
                    data: [],
                    show: false
                });
            }
        }, 300);
    }

    render() {
        return (<div className={this.props.className ? this.props.className : ''}>
            <span className="iconfont icon-search" />
            <input
                ref="songInput"
                type="search"
                placeholder={this.props.placeholder}
                onChange={this.handleInputChange.bind(this)}
            />
            <SuggestionListView
                className={classnames('nm-suggestion-list-view', (this.state.show ? 'nm-show' : 'nm-hide'))}
                data={this.state.data}
                handleSearchSelectionChange={this.props.handleSearchSelectionChange}
            />
        </div>);
    }
}

SearchView.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    handleSearchSelectionChange: PropTypes.func.isRequired,
};

SearchView.defaultProps = {
    className: '',
    placeholder: 'please input',
    handleSearchSelectionChange: null,
};

export default SearchView;
