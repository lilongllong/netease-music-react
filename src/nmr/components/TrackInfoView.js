import React, { Component } from "react";

export default class TrackInfoView extends Component
{
    static PropTypes = {
        data: React.PropTypes.object.isRequired
    }

    static defaultProps = {
        data: null
    }

    // type 0 null and 1 list, 2 single
    state = {
        data: null
    }

    constructor(props)
    {
        super(props);
        this._initTrack(props.data);
    }

    componentWillReceiveProps(nextProps)
    {
        this._initTrack(nextProps.data);
        this._initTrack(nextProps.data);
    }
    render()
    {
        if (this.state.data === null)
        {
            return (<div className={ this.props.className || ""}> </div>);
        }
        return (<div className={ this.props.className || ""}>
            <div className="track-img"><img src={ this.state.data.imgsrc }/></div>
            <div className="track-info">
                <div className="track-name">
                    <span className="iconfont icon-type-tag2"></span>
                    <label>{this.state.data.type}</label>
                    <span className="track-name-text"> { this.state.data.name } </span>
                </div>
                <div className="track-artists">{ this.state.data.artist }</div>
                <div className="operation-btn">
                    <span className="icon icon-font icon-play-btn"></span>
                </div>
            </div>
        </div>);
    }

    _initTrack(data)
    {
        if (data)
        {
            this.setState({
                data
            });
        }
    }
}
