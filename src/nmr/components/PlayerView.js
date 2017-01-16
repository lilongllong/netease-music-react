import React, { Component } from "react";

import TimeUtil from "../util/TimeUtil";

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
        onPlayTrack: null,
        playState: false,
        duration: "/00:00",
        currentTime: "00:00",
        imgSrc: "",
        artistName: "",
        trackName: "未知",
        readyState: "false",
        trackList: []
    }

    componentWillReceiveProps(nextProps)
    {
        this._initPlayer();
        // this.playStateBtn.classList.add("clickDisabled");
        this._initSelectedTrack(nextProps.selectedTrack);

        if (nextProps.trackList)
        {
            this.setState({ trackList: nextProps.trackList });
        }
        else
        {
            this.setState({ trackList: [] });
        }
    }

    componentDidMount()
    {
        this.setState({
            onPlayTrack: this.props.selectedTrack
        });

        this.audio = this.refs["audio"];
        this.playingBar = this.refs["playingBar"];
        this.volumeBar = this.refs["volumeBar"];
        this.playStateBtn = this.refs["playStateBtn"];
        this.processIcon = this.refs["processIcon"];
        this.volumeIcon = this.refs["volumeIcon"];
        this.audio.volume = 0.5;
        this.volumeIcon.style.left =  "42px";
        this.volumeBar.style.width = "50px";

        this.audio.onended = () => {
            this._initPlayer();
            this.audio.play();
            this.setState({ playState : true });
        };

        this.audio.onerror = () => {
            // alert("视频加载出错");
        };

        this.audio.oncanplay = () => {
            this.playStateBtn.classList.remove("icon-play");
            this.playStateBtn.classList.add("icon-pause");
            // this.playStateBtn.classList.remove("clickDisabled");
            this.audio.play();
            this.setState({ playState : true });
            this.forceUpdate();
        };

        this.audio.ontimeupdate = () => {
            const offset = Math.round( this.audio.currentTime * 500 / this.audio.duration );
            this.playingBar.style.width = offset + "px";
            this.processIcon.style.left = (offset - 8) + "px";
            this.setState({ currentTime: TimeUtil.formateTime(this.audio.currentTime * 1000) });
            this.forceUpdate();
        };

        this.volumeIcon.ondragstart = (e) => {
            const parentLeft = e.clientX - this.processIcon.offsetLeft;
            this.processIcon.ondrag = (e1) => {
                let left = e1.clientX - parentLeft;
                let width = 0;
                if (left < 0)
                {
                    left = 0;
                }
                else if (left > 492)
                {
                    left = 492;
                    width =500;
                }
                else
                {
                    width = left + 8;
                }
                this.processIcon.style.left = left + "px";
                this.playingBar.style.width = width + "px";
            };

            this.processIcon.ondragend = (e1) => {
                let left = e1.clientX - parentLeft;
                let width = 0;
                if (left < 0)
                {
                    left = 0;
                }
                else if (left > 492)
                {
                    left = 492;
                    width =500;
                }
                else
                {
                    width = left + 8;
                }
                this.processIcon.style.left = left + "px";
                this.playingBar.style.width = width + "px";

                const currentTime = (Math.round(this.audio.duration * width / 500));
                this.audio.currentTime = currentTime;
            };
        };

        this.volumeIcon.ondragstart = (e) => {
            const parentLeft = e.clientX - this.volumeIcon.offsetLeft;
            this.volumeIcon.ondrag = (e1) => {
                let left = e1.clientX - parentLeft;
                let width = 0;
                if (left < 0)
                {
                    left = 0;
                }
                else if (left > 92)
                {
                    left = 92;
                    width =100;
                }
                else
                {
                    width = left + 8;
                }
                this.volumeIcon.style.left = left + "px";
                this.volumeBar.style.width = width + "px";
            };

            this.volumeIcon.ondragend = (e1) => {
                let left = e1.clientX - parentLeft;
                let width = 0;
                if (left < 0)
                {
                    left = 0;
                }
                else if (left > 92)
                {
                    left = 92;
                    width =100;
                }
                else
                {
                    width = left + 8;
                }
                this.volumeIcon.style.left = left + "px";
                this.volumeBar.style.width = width + "px";

                const volume = width / 100;
                this.audio.volume = volume;

            };
        };
    }

    render()
    {
        return (<div className={ this.props.className }>
            <div className="track-btns">
                <span className="prev iconfont icon-previous" onClick={this._prevTrack.bind(this)}></span>
                <span ref="playStateBtn" className="play iconfont icon-play" onClick={ this._togglePlay.bind(this) }></span>
                <span className="next iconfont icon-next" onClick={ this._nextTrack.bind(this) }></span>
            </div>
            <div className="track-icon"><img src={ this.state.imgSrc } /></div>
            <div className="track-process">
                <div className="head">
                    <a className="track-name">{ this.state.trackName }</a>
                    <a className="track-artist">{ this.state.artistName }</a>
                </div>
                <div className="foot">
                    <div className="track-process">
                        <div ref="playingBar" className="playingBar"></div>
                        <span ref="processIcon" className="point iconfont icon-bar" draggable="true"></span>
                    </div>
                    <div className="track-time">{ this.state.currentTime + this.state.duration }</div>
                </div>
            </div>
            <div className="track-share">
                <a className="favorite iconfont icon-favorite"></a>
                <a className="share iconfont icon-share"></a>
            </div>
            <div className="track-setting">
                    <a className="track-volume iconfont icon-soundplus"></a>
                    <div className="volume-process">
                        <div ref="volumeBar" className="volumeBar"></div>
                        <span ref="volumeIcon" className="point iconfont icon-bar" draggable="true"></span>
                    </div>
            </div>
            <audio ref="audio" className="music-player" src={ this.state.mp3Url } draggable="true" controls="controls">
            </audio>
        </div>);
    }

    _prevTrack()
    {
        const index = this.state.trackList.indexOf(this.state.onPlayTrack);
        if (index === 0)
        {
            alert("the last music not exists!");
        }
        else
        {
            const track = this.state.trackList[index-1 > 0 ? index - 1 : 0 ];
            this.setState({ onPlayTrack:  track });
            this._initSelectedTrack(track);
        }
    }

    _nextTrack()
    {
        const index = this.state.trackList.indexOf(this.state.onPlayTrack);
        if (index === this.state.trackList.length)
        {
            alert("Now it is the lastest music");
        }
        else
        {
            const track = this.state.trackList[index + 1 > 0 ? index + 1 : 0 ];
            this.setState({ onPlayTrack: track });
            this._initSelectedTrack(track);
        }
    }

    _togglePlay()
    {
        if (!this.state.readyState) return ; //效果后续添加
        if (this.state.playState === true)
        {
            this.playStateBtn.classList.remove("icon-pause");
            this.playStateBtn.classList.add("icon-play");
            this.audio.pause();
            this.setState({ playState : false });
        }
        else
        {
            this.playStateBtn.classList.remove("icon-play");
            this.playStateBtn.classList.add("icon-pause");
            this.audio.play();
            this.setState({ playState : true });
        }
    }

    _initPlayer()
    {
        this.setState({ playState: false });
        this.playStateBtn.classList.remove("icon-pause");
        this.playStateBtn.classList.add("icon-play");
        this.playingBar.style.width = "0px";
        this.processIcon.style.left = "0px";
    }

    _initSelectedTrack(track)
    {
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
            this.setState({
                onPlayTrack: track,
                playState: false,
                duration: "/" + TimeUtil.formateTime(duration),
                currentTime: "00:00",
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
                duration: "/00:00",
                currentTime: "00:00",
                imgSrc: "",
                artistName: "",
                trackName: "未知",
                mp3Url: ""
            });
        }
    }
}
