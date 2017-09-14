import classnames from 'classnames';
import React, { Component } from 'react';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import PropTypes from 'prop-types';

import LyricComponent from './LyricComponent.jsx';

class PlayerSongList extends Component {
    constructor(props) {
        super(props);
        this.setSignupNode = (node) => {
            if (node) {
                this._signupNode = node;
            }
        };
        this.goToSignupNode = () => {
            scrollIntoViewIfNeeded(this._signupNode, true, {
                duration: 150,
                easing: 'easeInOut',
            });
        };
    }
    state = {
        open: true,
        songlist: [],
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.open !== nextProps.open) {
            this.setState({open: nextProps.open});
        }
    }

    componentDidUpdate() {
        if (this._signupNode) {
            this.goToSignupNode();
        }
    }

    createSongTable() {
        if (this.props.songlist) {
            const result = this.props.songlist.map(item => {
                let isActive = false;
                if (this.props.playingTrack && this.props.playingTrack.id === item.id) {
                    isActive = true;
                }
                return (<tr
                    key={item.id}
                    ref={isActive ? this.setSignupNode : item.id}
                    data-id={item.id}
                    data-track={JSON.stringify(item.data)}
                    onClick={this.handleSelectionChange}
                    className={classnames('songlist-item', (isActive ? 'active' : ''))}
                >
                    <td key={`${item.id}-icon`} className="playing-icon">
                        <span className={(isActive ? 'iconfont icon-playing-triangle' : '')} />
                    </td>
                    <td key={`${item.id}-name`} className="song-name">{item.name}</td>
                    <td key={`${item.id}-artist`} className="song-artist">{item.artist}</td>
                    <td key={`${item.id}-duration`} className="song-duration">{item.time}</td>
                </tr>);
            });
            return (<table><tbody>{result}</tbody></table>);
        }
        return null;
    }

    handleSelectionChange = (e) => {
        const id = e.currentTarget.dataset.id;
        const data = JSON.parse(e.currentTarget.dataset.track);
        if (id && id !== this.props.playingTrack.id) {
            this.props.handleSelectionChange(data);
        }
    }

    clearAllSonglist = () => {
        this.props.handleSonglistClearAllChange();
    }

    toggle = () => {
        this.props.handleToggleChange();
    }
    render() {
        const songCount = this.props.songlist.length;
        return (<div className={classnames(this.props.className, 'panel', (this.state.open ? 'nm-show' : 'nm-hide'))}>
            <div className="panel-header">
                <div className="panel-title">{`播放列表(${songCount})`}</div>
                <div className="panel-extra">
                    <a className="clearBtn" onClick={this.clearAllSonglist}>
                        <span className="iconfont icon-clear" />
                        <div className="label">清除</div>
                    </a>
                    <span className="song-lyric-name">{this.props.playingTrack ? this.props.playingTrack.name : ''}</span>
                    <a className="songlist-close" onClick={this.toggle}><span className="iconfont icon-close" /></a>
                </div>
            </div>
            <div className="panel-body">
                <div className="songlist-table">
                    {this.createSongTable()}
                </div>
                <div className="song-lyric">
                    <LyricComponent songId={this.props.playingTrack ? this.props.playingTrack.id : null} time={this.props.songProcessTime} />
                </div>
            </div>
        </div>);
    }

}

PlayerSongList.propTypes = {
    className: PropTypes.string,
    playingTrack: PropTypes.object,
    songlist: PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired,
    songProcessTime: PropTypes.number,
    handleToggleChange: PropTypes.func.isRequired,
    handleSelectionChange: PropTypes.func.isRequired,
    handleSonglistClearAllChange: PropTypes.func.isRequired,
};

PlayerSongList.defaultProps = {
    className: null,
    playingTrack: null,
    songlist: null,
    handleToggleChange: null,
    handleSelectionChange: null,
    handleSonglistClearAllChange: null,
};

export default PlayerSongList;
