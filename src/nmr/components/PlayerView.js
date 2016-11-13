import React, { Component } from "react";

import TimeUtil from "../util/TimeUtil";

export default class PlayerView extends Component
{
    constructor(props)
    {
        super(props);
        this.setState({
            onPlayTrack: props.selectedTrack
        });
    }

    static propTypes = {
        selectedTrack: React.PropTypes.object
    }

    static defaultProps = {
        selectedTrack: null
    }

    state = {
        onPlayTrack: null,
        playState: false,
        duration: "00:00/00:00",
        imgSrc: "",
        artistName: "",
        trackName: "未知"
    }

    componentWillReceiveProps(nextProps)
    {
        console.log("selectedTrack is :", nextProps.selectedTrack);
        if (nextProps.selectedTrack)
        {
            const track = nextProps.selectedTrack;
            let duration = 0;
            if (track.lMusic)
            {
                duration = track.lMusic.playTime;
            }
            else
            {
                duration = track.duration;
            }
            this.setState({
                onPlayTrack: nextProps.selectedTrack,
                playState: true,
                duration: "00:00/" + TimeUtil.formateTime(duration),
                imgSrc: track.album.blurPicUrl,
                artistName: track.artists.map(artist => artist.name).join(","),
                trackName: track.name,
                mp3Url: track.mp3Url
            });
        }
        else
        {
            this.setState({
                onPlayTrack: null,
                playState: false,
                duration: "00:00/00:00",
                imgSrc: "",
                artistName: "",
                trackName: "未知",
                mp3Url: ""

            });
        }
    }

    render()
    {
        return (<div className={ this.props.className }>
            <div className="track-btns">
                <span className="prev iconfont icon-previous" onClick={this._prevTrack}></span>
                <span className="play iconfont icon-play" onClick={ this._togglePlay }></span>
                <span className="next iconfont icon-next" onClick={ this._nextTrack }></span>
            </div>
            <div className="track-icon"><img src={ this.state.imgSrc } /></div>
            <div className="track-process">
                <div className="head">
                    <a className="track-name">{ this.state.trackName }</a>
                    <a className="track-artist">{ this.state.artistName }</a>
                </div>
                <div className="foot">
                    <div className="track-process">
                        <div className="bg"></div>
                        <div className="process">
                            <span className="point iconfont icon-circle"></span>
                        </div>
                    </div>
                    <div className="track-time">{ this.state.duration }</div>
                </div>
            </div>
            <div className="track-share">
                <a className="favorite iconfont icon-favorite"></a>
                <a className="share iconfont icon-share"></a>
            </div>
            <div className="track-setting">
                    <a className="track-volume iconfont icon-soundplus"></a>
                    <a></a>
                    <a></a>
            </div>
            <audio className="music-player" src={ this.state.mp3Url } controls="controls">
            </audio>
        </div>);
    }

    _prevTrack()
    {
        const index = this.props.trackList.indexOf(this.state.onPlayTrack);
        if (index === 0)
        {
            alert("the last music not exists!");
        }
        else
        {
            this.setState({ onPlayTrack: this.props.trackList[index-1 > 0 ? index - 1 : 0 ] });
        }
    }

    _nextTrack()
    {
        const index = this.props.trackList.indexOf(this.state.onPlayTrack);
        if (index === this.props.trackList.length)
        {
            alert("Now it is the lastest music");
        }
        else
        {
            this.setState({ onPlayTrack: this.props.trackList[index + 1 > 0 ? index + 1 : 0 ] });
        }
    }

    _togglePlay()
    {
        // if (this.state)
    }
}
