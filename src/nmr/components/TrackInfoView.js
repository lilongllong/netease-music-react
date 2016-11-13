import React, { Component } from "react";

export default class TrackInfoView extends Component
{
    static PropTypes = {

    }

    static defaultProps = {

    }

    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (<div className={ this.props.className || ""}>
            <div className="track-img">歌曲详细信息</div>
            <div className="track-info">

            </div>
        </div>);
    }
}
