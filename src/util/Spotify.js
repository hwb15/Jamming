let userAccessToken;
const clientId = "8df10c14aa3443bea182010a5e5314c6";
const redirectUri = "http://localhost:3000/";

const Spotify = {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    }

    //Check the access token matches
    const userAccessTokenMatch = window.location.href.match(
      /access_token=([^&]*)/
    );
    const tokenExpiresInMatch = window.location.href.match(
      /expires_in=([^&]*)/
    );

    if (userAccessTokenMatch && tokenExpiresInMatch) {
      userAccessToken = userAccessTokenMatch[1];
      const expiresIn = Number(tokenExpiresInMatch[1]);

      //Clear down the parameters for new access token after expired time
      window.setTimeout(() => (userAccessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return userAccessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then(response => {
        return response.json();
    }).then(jsonResponse => {
        if (!jsonResponse.tracks) {
            return [];
        }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artist[0].name,
            album: track.album.name,
            uri: track.uri
        }));
    });
  },
};

export default Spotify;
