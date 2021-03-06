import React, { Component } from 'react';
import placeholder from '../../img/photo_placeholder.png';
import AlbumNavigation from '../../components/photo/album-navigation';
import { withApiService } from '../../components/hoc';
import PhotoList from '../../components/photo/photo-list';
import { ConfirmingForm } from '../../components/forms';
import Modal from '../../components/modal';
import routes from '../../routes';
class EditPhotoAlbum extends Component {
  state = {
    coverPhotoName: null,
    description: '',
    title: '',
    photos: [],
    titleValid: true,
    coverPreview: null
  };

  componentDidMount() {
    this._updateAlbum();
  }

  _updateAlbum = async () => {
    const { getAlbumInfo, albumId, getPhotosByAlbumId } = this.props;
    getAlbumInfo(albumId)
      .then(res => {
        const { coverPhotoName, description, name } = res.data.response;
        this.setCoverPreview(coverPhotoName);
        this.setState({ coverPhotoName, description, title: name });
      })
      .catch(err => console.log(err));

    getPhotosByAlbumId({ albumId: +albumId })
      .then(res => {
        this.setState({ photos: res.data.response });
      })
      .catch(err => console.log(err.response));
  };

  setCoverPreview = name => {
    const { getPhoto } = this.props;
    getPhoto(name)
      .then(res => {
        const image = res.data.response;
        this.setState({
          coverPreview: `data:${image.imageType};base64,${image.image}`
        });
      })
      .catch(err => this.setState({ coverPreview: null }));
  };

  onSubmit = () => {
    const { description, title, coverPhotoName } = this.state;
    const { albumId } = this.props;
    this.props
      .changeAlbum(albumId, {
        description,
        albumName: title,
        coverPhotoName
      })
      .then(res => this._updateAlbum())
      .catch(err => console.log(err.response));
  };

  onChange(e, type) {
    this.setState({
      [type]: e.target.value
    });
  }

  onAlbumDelete = () => {
    const { deleteAlbum, albumId, history } = this.props;
    deleteAlbum(albumId).then(() => history.push(routes.app.photo.main.path));
  };

  onUpload = async files => {
    const { albumId, history } = this.props;
    history.push(routes.app.photo.upload.relativePath, {
      albumId,
      files,
      breadCrumbs: [
        {
          text: `My photos`,
          link: routes.app.photo.main.path
        },
        {
          text: `${this.state.title}`,
          link: `${routes.app.photo.main.path}${this.props.albumId}/`
        },
        {
          text: 'Add photos'
        }
      ]
    });
  };

  render() {
    const { title, description, titleValid, photos, coverPreview } = this.state;
    const breadCrumbs = [
      {
        text: `My photos`,
        link: routes.app.photo.main.path
      },
      {
        text: `${this.state.title}`,
        link: `${routes.app.photo.main.path}${this.props.albumId}/`
      },
      {
        text: 'Manage album'
      }
    ];
    return (
      <div>
        <AlbumNavigation
          rightContent={
            <Modal title={'Delete album'}>
              <div className="">
                <div className={'delete-album'}>
                  <i className="zmdi zmdi-delete zmdi-hc-lg" /> Delete album
                  <label htmlFor={'imageDnd'} />
                </div>
              </div>
              <ConfirmingForm
                body={<p>Are you sure you want to delete this album?</p>}
                confirmText={'Delete album'}
                onConfirm={this.onAlbumDelete}
              />
            </Modal>
          }
          onUpload={this.onUpload}
          breadCrumbs={breadCrumbs}
        />

        <div className={'edit-album-wrap'}>
          <div className={'edit-album-wrap__cover'}>
            <div className={'edit-album_wrap__label'}>Use as album cover</div>
            <div
              className={`edit-album-wrap__image ${coverPreview ? '' : 'placeholder'}`}
              style={{
                backgroundImage: `url(${coverPreview ? coverPreview : placeholder})`
              }}
            >
              <Modal
                className={'edit-album-modal'}
                title={`Choose a cover for the album «${title}»`}
              >
                <div className="edit-album-cover-trigger">
                  <div className={'delete-album'}>
                    <span>
                      <i className="zmdi zmdi-image zmdi-hc-lg" />
                      Edit cover
                    </span>
                    <label htmlFor={'imageDnd'} />
                  </div>
                </div>
                <PhotoList
                  isSelecting
                  onSelect={coverPhotoName => {
                    this.setState({ coverPhotoName });
                    this.setCoverPreview(coverPhotoName);
                  }}
                  photos={photos}
                />
              </Modal>
            </div>
          </div>
          <div className="edit-album-wrap__form">
            <form className={'form'} onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  id={'title'}
                  className={`form-control ${titleValid ? '' : 'is-invalid'}`}
                  onChange={e => this.onChange(e, 'title')}
                  value={title}
                  type={'text'}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  rows={4}
                  id={'description'}
                  className={`form-control`}
                  onChange={e => this.onChange(e, 'description')}
                  value={description}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <button className={'ok-btn'} type={'submit'}>
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
        <PhotoList
          albumId={this.props.albumId}
          onPhotoDeleted={this._updateAlbum}
          isEditing
          photos={photos}
        />
      </div>
    );
  }
}

const mapMethodToProps = service => {
  return {
    getPhoto: service.getPhoto,
    deleteAlbum: service.deleteAlbum,
    getAlbumInfo: service.getAlbumInfo,
    changeAlbum: service.changeAlbum,
    getPhotosByAlbumId: service.getPhotosByAlbumId,
    uploadPhoto: service.uploadPhoto
  };
};

export default withApiService(mapMethodToProps)(EditPhotoAlbum);
