import React, {Component, PropTypes} from 'react';

import TrackInfoModel from '../model/TrackInfoModel';
import ServiceClient from '../service/ServiceClient';

export default class TrackInfoView extends Component
{
    static PropTypes = {
        data: PropTypes.object.isRequired,
        handleSelectionChange: PropTypes.func.isRequired,
        songlistAddChange: PropTypes.func.isRequired,
    }

    static defaultProps = {
        data: null,
        handleSelectionChange: null,
        songlistAddChange: null,
    }

    // type 0 null and 1 list, 2 single
    state = {
        data: this.props.data
    }

    constructor(props){
        super(props);
        this.signUpRootNode = (node) => {
            if (node) {
                this._rootNode = node;
            }
        };
    }

    componentWillReceiveProps(nextProps)
    {
      $(this._rootNode).css('opacity', 0);
      this.setState({
        data: nextProps.data
      }, () => {
        $(this._rootNode).animate({opacity: 1}, 500, "linear");
      });
    }

    render()
    {
        if (this.state.data === null)
        {
            return (<div className={ this.props.className || ""}> </div>);
        }
        return (<div ref={this.signUpRootNode} className={ this.props.className || ""}>
            <div className="track-img"><img src={ this.state.data.imgsrc }/></div>
            <div className="track-info">
                <div className="track-name">
                    <div className="iconfont icon-type-tag2"><label>{this.state.data.type}</label></div>
                    <span className="track-name-text"> { this.state.data.name } </span>
                </div>
                <div className="track-artists">{ this.state.data.artist }</div>
                <div className="operation-btn">
                    <a className="icon icon-font icon-play-btn" onClick={this.playPlaylist}>播放全部</a>
                </div>
            </div>
        </div>);
    }

    playPlaylist = async () => {
        if (this.state.data.type === "单曲") {
            this.props.songlistAddChange(this.state.data);
        }
        else {
            const result = await ServiceClient.getInstance().getPlayListDetail(this.state.data.id);
            if (result) {
                result.tracks.map((item, index) => {
                    if (index === 0) {
                        this.props.handleSelectionChange(item);
                    }
                    const trackInfo = new TrackInfoModel({data: item, type: '单曲'});
                    this.props.songlistAddChange(trackInfo);
                });
            }
        }
    }
}
