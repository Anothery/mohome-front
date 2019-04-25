import React, { Component } from "react";
import "./photo.css";
import { withApiService } from "../hoc";

class Photo extends Component {
  state = {
    album: [],
    isExpanded: false
  };
  onExpandToggle = () => {
    this.setState(state => {
      return { isExpanded: !state.isExpanded };
    });
  };
  componentDidMount() {
    this.props.getAlbum().then(res => this.setState({ album: res.ids }));
  }

  render() {
    const { album, isExpanded } = this.state;
    return (
      <div className="photo-section-container container">
        <div className="albums-container">
          <div className="albums-bar  left-right-bar">
            <div className="albums-bar-left">
              <div className="albums-title">
                My albums <span className="albums-count">{album.length}</span>
              </div>
            </div>
            <div className="albums-bar-right">
              <div className="add-album-button">
                <i className="zmdi zmdi-collection-folder-image zmdi-hc-lg" />{" "}
                Add new album
              </div>
              <div className="add-photos-button">
                <i className="zmdi zmdi-camera-add zmdi-hc-lg" /> Add photos
              </div>
            </div>
          </div>
          <div
            className={`albums-panel ${
              album.length > 4 ? "able-to-expanded" : ""
            }`}
          >
            <div className="container">
              <div className="row">
                {album.slice(0, 4).map(e => (
                  <PhotoItem
                    key={e.id}
                    title={e.title}
                    count={e.count}
                    preview={this.props.getPhoto(e.photo_ids[0])}
                  />
                ))}
                {isExpanded
                  ? album
                      .slice(4)
                      .map(e => (
                        <PhotoItem
                          key={e.id}
                          title={e.title}
                          count={e.count}
                          preview={this.props.getPhoto(e.photo_ids[0])}
                        />
                      ))
                  : null}
              </div>
            </div>
          </div>
          {album.length > 4 ? (
            <div
              onClick={this.onExpandToggle}
              title={isExpanded ? "Hide" : "Expand"}
              className="album-expand-btn"
            >
              <span>
                {isExpanded ? (
                  <i className="zmdi zmdi-chevron-up" />
                ) : (
                  <i className="zmdi zmdi-chevron-down" />
                )}
              </span>
            </div>
          ) : null}
        </div>

        <div className="added-photos-container">
          <div className="added-photos-bar left-right-bar">
            <div className="added-photos-bar-left">
              <div className="added-photos-title">Added photos</div>
            </div>
          </div>
          <div className="added-photos-panel panel" />
        </div>
      </div>
    );
  }
}

const PhotoItem = ({ title, count, preview }) => {
  const style = {
    "background-image": `url(${preview})`
  };
  return (
    <div className="album-photo col-3">
      <div style={style} className={"album-photo-item"}>
        <div className="album-info">
          <span title={title} className={"album-title"}>
            {title}
          </span>
          <span className={"album-count"}>{count}</span>
        </div>
      </div>
    </div>
  );
};

const mapMethodToProps = service => {
  return {
    getPhoto: service.getPhoto,
    getAlbum: service.getAlbum
  };
};

export default withApiService(mapMethodToProps)(Photo);
