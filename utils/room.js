import axios from 'axios';
import baseUrl from './baseUrl'
const YT_API_KEY = process.env.YOUTUBE_API_KEY;
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID
const TWITCH_OAUTH_TOKEN = process.env.TWITCH_OAUTH_TOKEN

export async function getVideosInfo(urlList) {
    var res = []

    for (const url of urlList) {
        await getVideoInfo(url).then(result => {
            console.log(result)
            res.push(result)
        })
    }

    console.log(res)
    return res
}

export async function getVideoInfo(url) {
    if (url.includes("youtube")) {
        return getYoutubeVideoInfo(url)
    } else if (url.includes("twitch")) {
        return getTwitchVideoInfo(url)
    } else if (url.includes("fb.watch")) {
        return getFacebookVideoInfo(url)
    } else if (url.includes("dailymotion")) {
        return getDailyMotionVideoInfo(url)
    }
}

async function getYoutubeVideoInfo(url) {

    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["Client-Id"];

    var videoID = url.split('v=')[1];
    var ampersandPosition = videoID.indexOf('&');
    if (ampersandPosition != -1) {
        videoID = videoID.substring(0, ampersandPosition);
    }

    var title,
        author,
        thumbnail;

    await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${YT_API_KEY}`)
        .then(result => {
            title = result.data.items[0].snippet.title
            author = result.data.items[0].snippet.channelTitle;
            thumbnail = result.data.items[0].snippet.thumbnails.medium.url;
        })
        .catch(error => {
            console.log(error)
        })

    return {
        title,
        author,
        url,
        thumbnail
    };
}

async function getTwitchVideoInfo(url) {
    var videoID = url.split('/').pop()

    var title,
        author,
        thumbnail;

    axios.defaults.headers.common["Client-Id"] = TWITCH_CLIENT_ID
    axios.defaults.headers.common["Authorization"] = `Bearer ${TWITCH_OAUTH_TOKEN}`
    await axios.get(`https://api.twitch.tv/helix/videos?id=${videoID}`)
        .then(result => {
            console.log(result)
            title = result.data.data[0].title
            author = result.data.data[0].user_name
            thumbnail = result.data.data[0]["thumbnail_url"]
        })
        .catch(error => {
            console.log(error)
        })

    return {
        title,
        author,
        url,
        thumbnail
    };
}

async function getFacebookVideoInfo(url) {
    var s = url.split('/')
    var videoID = s.pop()
    if (videoID == "") {
        videoID = s.pop()
    }
    console.log(videoID)

    var title,
        author;

    return {
        title,
        author
    }
}

async function getDailyMotionVideoInfo(url) {
    var s = url.split('/')
    var videoID = s.pop()
    if (videoID == "") {
        videoID = s.pop()
    }

    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["Client-Id"];

    var title,
        author,
        thumbnail

    await axios.get(`https://api.dailymotion.com/video/${videoID}&fields=title,owner.screenname,thumbnail_360_url`)
        .then(res => {
            title = res.data.title
            author = res.data["owner.screenname"]
            thumbnail = res.data["thumbnail_360_url"]
        })
        .catch(error => {
            console.log(error)
        })

    return {
        title,
        author,
        url,
        thumbnail
    };

}

export function filterVideoURL(url) {
    if (url.includes("dailymotion") && url.includes("playlist")) {
        url = url.split("?")[0]
    }

    return url
}

export async function getRecommendations(keyword) {
    var resultList = []
    getYoutubeRecommendations(resultList, keyword, 10)
    getDailyMotionRecommendations(resultList, keyword, 10)
    return resultList
}

async function getYoutubeRecommendations(resultList, keyword, maxResults) {
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["Client-Id"];

    await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${keyword}&type=video&key=${YT_API_KEY}`)
        .then(res => {
            const apiList = res.data.items;
            for (var i = 0; i < apiList.length && i < maxResults; i++) {
                var info = {};
                var id = apiList[i]["id"]["videoId"];
                var title = apiList[i]["snippet"]["title"];
                var thumbnail = apiList[i]["snippet"]["thumbnails"]["medium"]["url"];
                var publisher = apiList[i]["snippet"]["channelTitle"];

                info["url"] = `https://www.youtube.com/watch?v=${id}`;
                info["title"] = decodeHtml(title);
                info["thumbnail"] = thumbnail;
                info["publisher"] = publisher;
                info["platform"] = "youtube"
                resultList.push(info);
            }
        })

}

async function getDailyMotionRecommendations(resultList, keyword, maxResults) {
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["Client-Id"];

    await axios.get(`https://api.dailymotion.com/videos&search=${keyword}&sort=visited&limit=${maxResults}&fields=url,title,owner.screenname,thumbnail_360_url`)
        .then(res => {
            const apiList = res.data.list
            for (var i = 0; i < apiList.length && i < maxResults; i++) {
                var info = {}
                var url = apiList[i].url
                var title = apiList[i].title
                var thumbnail = apiList[i]["thumbnail_360_url"]
                var publisher = apiList[i]["owner.screenname"]
                info["url"] = url
                info["title"] = decodeHtml(title)
                info["thumbnail"] = thumbnail
                info["publisher"] = publisher
                info["platform"] = "dailymotion"
                resultList.push(info)
            }

        })
        .catch(error => {
            console.log(error)
        })
}

export async function getTrendingVideo() {
    var resultList = []
    getYoutubeTrendingVideo(resultList, 10)
    getDailyMotionTrendingVideo(resultList, 10)
    return resultList
}

async function getYoutubeTrendingVideo(resultList, maxResults) {
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["Client-Id"];

    await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${maxResults}&regionCode=SG&key=${YT_API_KEY}`)
        .then(res => {
            const apiList = res.data.items;
            for (var i = 0; i < apiList.length && i < maxResults; i++) {
                var info = {};
                var id = apiList[i]["id"];
                var title = apiList[i]["snippet"]["title"];
                var thumbnail = apiList[i]["snippet"]["thumbnails"]["medium"]["url"];
                var publisher = apiList[i]["snippet"]["channelTitle"];

                info["url"] = `https://www.youtube.com/watch?v=${id}`;
                info["title"] = decodeHtml(title);
                info["thumbnail"] = thumbnail;
                info["publisher"] = publisher;
                info["platform"] = "youtube"
                resultList.push(info);
            }
        })

}

async function getDailyMotionTrendingVideo(resultList, maxResults) {
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["Client-Id"];

    await axios.get(`https://api.dailymotion.com/videos&sort=trending&limit=${maxResults}&fields=url,title,owner.screenname,thumbnail_360_url`)
        .then(res => {
            const apiList = res.data.list
            for (var i = 0; i < apiList.length && i < maxResults; i++) {
                var info = {}
                var url = apiList[i].url
                var title = apiList[i].title
                var thumbnail = apiList[i]["thumbnail_360_url"]
                var publisher = apiList[i]["owner.screenname"]
                info["url"] = url
                info["title"] = decodeHtml(title)
                info["thumbnail"] = thumbnail
                info["publisher"] = publisher
                info["platform"] = "dailymotion"
                resultList.push(info)
            }

        })
        .catch(error => {
            console.log(error)
        })
}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

async function updatePlayingIndex(roomID, playingIndex) {
    const url = `${baseUrl}/api/room?type=3`
    const payload = {
        roomID,
        playingIndex
    }

    const response = await axios.post(url, payload)
}

async function insertNewVideo(url, roomID) {
    const api_url = `${baseUrl}/api/room?type=4`

    const result = await getVideoInfo(url)

    const payload = {
        roomID,
        url,
        result
    }

    const response = await axios.post(api_url, payload)

    return response
}

export default {
    getVideosInfo,
    getVideoInfo,
    filterVideoURL,
    getRecommendations,
    getTrendingVideo,
    updatePlayingIndex,
    insertNewVideo
}