import React, {Component, PropTypes} from 'react';

import ServiceClient from '../service/ServiceClient';
import TimeUtil from '../util/TimeUtil';
import TrackInfoModel from '../model/TrackInfoModel';

export default class TrackTableView extends Component {
    static propTypes = {
        playlistId: PropTypes.number,
        handleSelectionChange: PropTypes.func.isRequired,
        songlistAddChange: PropTypes.func.isRequired,
        handleInfoChange: PropTypes.func.isRequired,
    }

    static defaultProps = {
        playlistId: null,
        handleSelectionChange: null,
        songlistAddChange: null,
        handleInfoChange: null,
    }

    state = {
        selectedTrack: null,
        data: []
    }

    constructor(props) {
        super(props);
        this._initData();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.playlistId !== nextProps.playlistId) {
            if (nextProps.playlistId && nextProps.playlistId !== '') {
                ServiceClient.getInstance().getPlayListDetail(nextProps.playlistId).then((result) => {
                    if (result && result.tracks && result.tracks !== this.state.data) {
                        this.setState({data: result.tracks});
                        this._offerTrackInfo(result, true);
                    }
                });
            }
        }
    }

    render() {
        const headerData = {
            id: "header",
            content: {
                name: "歌曲标题",
                time: "时长",
                artists: "歌手",
                album: "专辑"
            }
        };
        const $header = this.createItem(headerData);
        const $trs = this.state.data.map(track => {
            const data = {
                id: track.id,
                content: {
                    name: track.name,
                    timer: TimeUtil.formateTime(track.lmusic ? track.lMusic.playTime : track.duration),
                    artists: track.artists.map(artist => artist.name).join(","),
                    album: track.album.name
                }
            };
            return this.createItem(data, track);
        });
        return (
            <table className={ this.props.className }>
                <thead>{$header}</thead>
                <tbody>{$trs}</tbody>
            </table>
        );
    }

    createItem(data, track) {
        const $tds = [];
        for (const key in data.content) {
            $tds.push((<td key={ key + data.id }>{data.content[key]}</td>))
        }
        return (
            <tr key={ data.id}
                ref={ data.id }
                className={ this.state.selectedID === data.id ? "selected" : "" }
                onClick={ () => {
                    this._selectedItem(data.id);
                    this.props.handleSelectionChange(track);
                    this.props.songlistAddChange(new TrackInfoModel({data: track, type: '单曲'}));
                }}
            >
                {$tds}
            </tr>
        );
    }

    async _initData() {
        if (this.props.playlistId) {
            const data = await ServiceClient.getInstance().getPlayListDetail(this.props.playlistId);
            this.setState({data: data});
        }
    }

    _selectedItem(id) {
        if (id !== this.state.selectedID && id !== "header") {
            const $oldTarget = $(this.refs[this.state.selectedID]);
            const $curTarget = $(this.refs[id]);

            this.setState({"selectedID": id});

            if ($oldTarget) {
                $oldTarget.removeClass("selected");
            }
            $curTarget.addClass("selected");

        }
    }

    // type false 代表 单曲，TRUE = list
    _offerTrackInfo(data, type) {
        if (type) {
            const trackInfo = new TrackInfoModel();
            trackInfo.value = {
                data: null,
                id: data.id,
                imgsrc: data.coverImgUrl,
                name: data.name,
                artist: data.creator.nickname,
                type: "歌单",
                mp3Url: "",
                time: "00:00"
            };
            this.props.handleInfoChange(trackInfo);
        }
        else {
            const trackInfo = new TrackInfoModel({data, type: '单曲'});
            this.props.handleInfoChange(trackInfo);
        }
    }
}
