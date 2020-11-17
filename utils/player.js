import axios from 'axios';
const YT_API_KEY = process.env.YOUTUBE_API_KEY;


export async function getVideoTitle(videoID) {
    var videoTitle;

    await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${YT_API_KEY}`)
        .then(result => {
            videoTitle = result.data.items[0].snippet.channelTitle;
        })

    return videoTitle;
}

export default { getVideoTitle }