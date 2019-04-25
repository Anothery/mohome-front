export default class TestService {
  _album = {
    ids: [
      {
        id: 1,
        title: "lolkek",
        count: 3,
        photo_ids: [1]
      },
      {
        id: 2,
        title: "placeholder",
        count: 8,
        photo_ids: [1]
      },
      {
        id: 3,
        title: 123,
        count: 32,
        photo_ids: [2]
      },
      {
        id: 4,
        title: 1233,
        count: 35,
        photo_ids: [3]
      },
      {
        id: 5,
        title: "asd",
        count: 13,
        photo_ids: [1]
      },
      {
        id: 6,
        title: "cu",
        count: 3,
        photo_ids: [1]
      },
      {
        id: 7,
        title: 228,
        count: 4,
        photo_ids: [1]
      },
      {
        id: 8,
        title: 875,
        count: 5,
        photo_ids: [1]
      },
      {
        id: 9,
        title: "test",
        count: 6,
        photo_ids: [1]
      },
      {
        id: 10,
        title: 1,
        count: 8,
        photo_ids: [1]
      },
      {
        id: 11,
        title: 2,
        count: 3,
        photo_ids: [1]
      }
    ]
  };
  _photos = {
    1: "https://bipbap.ru/wp-content/uploads/2017/10/0_8eb56_842bba74_XL-640x400.jpg",
    2: "https://xaxa-net.ru/uploads/posts/2018-03/1522233561_perfekcionizm_xaxa-net.ru-10.jpg",
    3: "https://pbs.twimg.com/profile_images/793021684064419840/RjEjM6z5_400x400.jpg",
    4: "http://bigpicture.ru/wp-content/uploads/2009/12/wave01-800x565.jpg",
    5: "https://bipbap.ru/wp-content/uploads/2018/07/51-1-640x480.jpg"
  };
  getAlbum = async () => {
    return this._album;
  };
  getPhoto = id => {
    return this._photos[id];
  };
}
