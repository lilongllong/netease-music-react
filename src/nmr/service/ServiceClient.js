import urlencode from "urlencode";

const NM_API_URL = "api";

export default class ServiceClient {
    static _instance = null;
    constructor()
    {
        this._userId = null;
    }

    static getInstance()
    {
        if (ServiceClient._instance === null)
        {
            ServiceClient._instance = new ServiceClient();
        }

        return ServiceClient._instance;
    }

    get userId()
    {
        return this._userId;
    }

    async login()
    {
        await this.__pseudoLogin();
    }

    async __pseudoLogin()
    {
        this._userId = "77680183";
    }

    async getUserPlayLists(uid = this._userId)
    {
        let res = null;
        try{
            res = await $.ajax({
                url: `${NM_API_URL}/user/playlist`,
                data: {
                    uid,
                    limit: 1000,
                    offset: 0
                }
            });
        }
        catch (e)
        {
            console.error(e);
        }

        if (res.code === 200 )
        {
            return res.playlist;
        }
        else
        {
            throw new Error("Response with error code:" + res.code);
        }
    }

    async getPlayListDetail(id)
    {
        let res = null;
        try
        {
            res = await $.ajax({
                url: `${NM_API_URL}/playlist/detail`,
                data: {
                    id
                }
            });
        }
        catch (e)
        {
            throw e;
        }

        if (res.code === 200 )
        {
            return res.result;
        }
        else
        {
            throw new Error("Response with error code:" + res.code);
        }
    }

    async search(keyword, suggest = false)
    {
        let res = null;

        try
        {
            res = await $.ajax({
                    "url": suggest ? `${NM_API_URL}/search/suggest/web` : `${NM_API_URL}/search/get/`,
                    method: "post",
                    data: {
                        s: keyword,
                        type: 1,
                        offset: 0,
                        limit: 100,
                        sub: false
                    }
                });
        }
        catch (e)
        {
            console.error("请求失败");
        }

        if (res)
        {
            res = JSON.parse(res);
        }

        if (res.code === 200)
        {
            if (res.result.songs)
            {
                return res.result.songs;
            }
            else
            {
                return null;
            }

        }
        else
        {
            throw new Error("Response with error code:" + res.code);
        }

    }
    async fetchSongDetails(ids)
    {
        // http://music.163.com/api/song/detail
        // data {"ids": [id1, id2, ...]}
        let params = ids;
        if (!Array.isArray(ids))
        {
            params = [ids];
        }
        return new Promise((resolve, reject) => {
            fetch(`/api/song/detail?ids=${urlencode(JSON.stringify(params))}`).then(response => {
                if (response.ok)
                {
                    response.json().then(data => {
                        if (data.code === 200)
                        {
                            resolve(data.songs);
                        }
                        else
                        {
                            reject("未请求到数据");
                        }
                    });
                }
                else
                {
                    reject("request is failed");
                }

            }).catch(e => {
                reject("network is bad!" + JSON.stringify(e));
            });
        });
    }
    fetchSongLyric(songId) {
         // 'http://music.163.com/api/song/lyric?os=pc&id=' . $music_id . '&lv=-1&kv=-1&tv=-1'
         return new Promise((resolve, reject) => {
             fetch(`/api/song/lyric?os=pc&id=${songId}&lv=-1&kv=-1`).then(response => {
                 if (response.ok) {
                     response.json().then(data => {
                         if (data.code === 200) {
                             resolve(data.lrc);
                         }
                         else {
                             reject('未请求到数据');
                         }
                     });
                 }
                 else {
                     reject('request is failed');
                 }
             });
         });
     }
}
