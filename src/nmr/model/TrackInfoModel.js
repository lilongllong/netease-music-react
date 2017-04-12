import TimeUtil from '../util/TimeUtil';

export default class TrackInfoModel {
    /*
    {
        id: data.id,
        imgsrc: data.album.picUrl,
        name: data.name,
        artist: data.album.artists.map(artist => artist.name).join(","),
        type: "单曲",
        mp3Url: data.mp3Url
    }
    */
    constructor(props) {
        if (props && props.data && props.type) {
            const data = props.data;
            this._data = data;
            this._id = data.id;
            this._imgsrc = data.album.picUrl;
            this._name = data.name;
            this._artist = data.album.artists.map(artist => artist.name).join(",");
            this._type = props.type;
            this._time = TimeUtil.formateTime(data.lmusic ? data.lMusic.playTime : data.duration)
        }
    }

    set value(value) {
        this._data = value.data;
        this._id = value.id;
        this._imgsrc = value.imgsrc;
        this._name = value.name;
        this._artist = value.artist;
        this._type = value.type;
        this._time = value.time;
    }

    get id() {
        return this._id;
    }

    get imgsrc() {
        return this._imgsrc;
    }

    get name() {
        return this._name;
    }

    get artist() {
        return this._artist;
    }

    get type() {
        return this._type;
    }

    get time() {
        return this._time;
    }

    get data() {
        return this._data;
    }

    equal(data) {
        if (data instanceof TrackInfoModel && data.id === this.id) {
            return true;
        }
        return false;
    }
}
