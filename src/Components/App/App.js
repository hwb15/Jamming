import React from "react";
import "./App.css";

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);

    this.state = {
      searchResults: [
        { name: "name1", artist: "artist1", album: "album1", id: 1 },
        { name: "name2", artist: "artist2", album: "album2", id: 2 },
      ],
      playlistName: "Test Playlist",
      playlistTracks: [
        {
          name: "Playlistname1",
          artist: "Playlistartist1",
          album: "Playlistalbum1",
          id: 1,
        },
        {
          name: "Playlistname3",
          artist: "Playlistartist3",
          album: "Playlistalbum3",
          id: 3,
        },
        {
          name: "Playlistname4",
          artist: "Playlistartist4",
          album: "Playlistalbum4",
          id: 4,
        },
      ],
    };
  }

  addTrack(track) {
    if (
      this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
    ) {
      return;
    }
    this.state.playlistTracks.push(track);
    this.setState({ playlistTracks: this.state.playlistTracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks.filter(
      (currentTrack) => currentTrack.id !== track.id
    );
    this.setState({ playlistTracks: tracks });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
