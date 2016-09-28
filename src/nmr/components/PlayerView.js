import React, { Component } from "react";

export default class PlayerView extends Component
{
    constructor(props)
    {
        super(props);
    }

    static propTypes = {

    }

    static defaultProps = {

    }

    render()
    {
        return (<div className={ this.props.className }>
            <div className="track-btns">
                <span className="prev iconfont icon-previous"></span>
                <span className="play iconfont icon-play"></span>
                <span className="next iconfont icon-next"></span>
            </div>
            <div className="track-icon"></div>
            <div className="track-process">
                <div className="head">
                    <a className="track-name"></a>
                    <a className="track-artist"></a>
                </div>
                <div className="foot">
                    <div className="track-process">
                        <div className="bg"></div>
                        <div className="process">
                            <span className="point iconfont icon-circle"></span>
                        </div>
                    </div>
                    <div className="track-time">00:00/00:00</div>
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
            <audio className="music-player" src="" controls="controls">
            </audio>
        </div>);
    }

}
