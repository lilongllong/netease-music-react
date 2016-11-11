import React, { Component } from "react";

export default class PlayerView extends Component
{
    constructor(props)
    {
        super(props);
    }

    static propTypes = {
        selectedTrack: React.PropTypes.object
    }

    static defaultProps = {
        selectedTrack: null
    }

    state = {
        onPlayTrack: selectedTrack
    }

    componentWillReceiveProps(nextProps)
    {

    }

    render()
    {
        const track = this.state.onPlayTrack;
        if (track)
        {
            let duration = 0;
            if (track.lMusic)
            {
                duration = track.lMusic.playTime;
            }
            else
            {
                duration = track.duration;
            }
            return (<div className={ this.props.className }>
                <div className="track-btns">
                    <span className="prev iconfont icon-previous" onClick={this._prevTrack}></span>
                    <span className="play iconfont icon-play"></span>
                    <span className="next iconfont icon-next"></span>
                </div>
                <div className="track-icon"><img src={ track.album.blurPicUrl }></div>
                <div className="track-process">
                    <div className="head">
                        <a className="track-name">{ track.name }</a>
                        <a className="track-artist">{ track.artists.map(artist => artist.name).join(",") }</a>
                    </div>
                    <div className="foot">
                        <div className="track-process">
                            <div className="bg"></div>
                            <div className="process">
                                <span className="point iconfont icon-circle"></span>
                            </div>
                        </div>
                        <div className="track-time">{ "00:00/" + TimeUtil.formateTime(duration) }</div>
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
                <audio className="music-player" src={ track.mp3Url } controls="controls">
                </audio>
            </div>);
        }

        return (<div className={ this.props.className }>
            <div className="track-btns">
                <span className="prev iconfont icon-previous" onClick={this._prevTrack}></span>
                <span className="play iconfont icon-play"></span>
                <span className="next iconfont icon-next"></span>
            </div>
            <div className="track-icon"><img src={ track.album.blurPicUrl }></div>
            <div className="track-process">
                <div className="head">
                    <a className="track-name">{ track.name }</a>
                    <a className="track-artist">{ track.artists.map(artist => artist.name).join(",") }</a>
                </div>
                <div className="foot">
                    <div className="track-process">
                        <div className="bg"></div>
                        <div className="process">
                            <span className="point iconfont icon-circle"></span>
                        </div>
                    </div>
                    <div className="track-time">{ "00:00/" + TimeUtil.formateTime(duration) }</div>
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
            <audio className="music-player" src={ track.mp3Url } controls="controls">
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

    _
}
