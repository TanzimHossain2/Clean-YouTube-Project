import axios from "axios";

const KEY = 'AIzaSyDMRHdXufmiKF6fYoRroM6gXFTqYVMHkw4';


const getPlaylist = async (playlistId, pageToken='', result = []) => {
    const URL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${KEY}&part=contentDetails,snippet,id&maxResults=50&playlistId=${playlistId}&pageToken=${pageToken}`;

    const { data } = await axios.get(URL);
    result = [...result, ...data.items];
    if(data.nextPageToken) {
        result = getPlaylist(playlistId, data.nextPageToken, result );
    }

    return result;


}

export default getPlaylist;

