import axios from 'axios';
const YT_API_KEY = process.env.YOUTUBE_API_KEY;
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID
const TWITCH_OAUTH_TOKEN = process.env.TWITCH_OAUTH_TOKEN

export async function getVideoInfo(url) {
    if (url.includes("youtube")) {
        return getYoutube(url)
    } else if (url.includes("twitch")) {
        return getTwitch(url)
    }
}

export async function getYoutube(url) {


    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["Client-Id"];

    var videoID = url.split('v=')[1];
    var ampersandPosition = videoID.indexOf('&');
    if (ampersandPosition != -1) {
        videoID = videoID.substring(0, ampersandPosition);
    }

    var title,
        author;

    await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${YT_API_KEY}`)
        .then(result => {
            console.log(result)
            title = result.data.items[0].snippet.title
            author = result.data.items[0].snippet.channelTitle;
        })
        .catch(error => {
            console.log(error)
        })

    return {
        title,
        author
    };
}

export async function getTwitch(url) {
    var videoID = url.split('/').pop()

    var title,
        author;
    axios.defaults.headers.common["Client-Id"] = TWITCH_CLIENT_ID
    axios.defaults.headers.common["Authorization"] = `Bearer ${TWITCH_OAUTH_TOKEN}`
    await axios.get(`https://api.twitch.tv/helix/videos?id=${videoID}`)
        .then(result => {
            console.log(result)
            title = result.data.data[0].title
            author = result.data.data[0].user_name
        })
        .catch(error => {
            console.log(error)
        })

    return {
        title,
        author
    };
}

export async function getRecommendations(val) {
    var resultList = [];
    await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${val}&type=video&key=${YT_API_KEY}`)
        .then(res => {
            const apiList = res.data.items;
            for (var i = 0; i < apiList.length; i++) {
                var info = {};
                var id = apiList[i]["id"]["videoId"];
                var title = apiList[i]["snippet"]["title"];
                var thumbnail = apiList[i]["snippet"]["thumbnails"]["medium"]["url"];
                var publisher = apiList[i]["snippet"]["channelTitle"];

                info["id"] = id;
                info["title"] = decodeHtml(title);
                info["thumbnail"] = thumbnail;
                info["publisher"] = publisher;
                resultList.push(info);
            }
        })

    return resultList;
}

export async function getTrendingVideo() {
    var resultList = [];
    await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=SG&key=${YT_API_KEY}`)
        .then(res => {
            const apiList = res.data.items;
            for (var i = 0; i < apiList.length; i++) {
                var info = {};
                var id = apiList[i]["id"];
                var title = apiList[i]["snippet"]["title"];
                var thumbnail = apiList[i]["snippet"]["thumbnails"]["medium"]["url"];
                var publisher = apiList[i]["snippet"]["channelTitle"];

                info["id"] = id;
                info["title"] = decodeHtml(title);
                info["thumbnail"] = thumbnail;
                info["publisher"] = publisher;
                resultList.push(info);
            }
        })

    return resultList;

}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

export default {
    getVideoInfo,
    getRecommendations,
    getTrendingVideo
}