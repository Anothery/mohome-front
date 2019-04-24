export default class TestService {
    _album = {
        ids: [1,2,3,4,5,6,7,8]
    };
    _photos = {
        1:"https://bipbap.ru/wp-content/uploads/2017/10/0_8eb56_842bba74_XL-640x400.jpg",
        2:"https://xaxa-net.ru/uploads/posts/2018-03/1522233561_perfekcionizm_xaxa-net.ru-10.jpg",
        3: "https://pbs.twimg.com/profile_images/793021684064419840/RjEjM6z5_400x400.jpg",
        4:"http://bigpicture.ru/wp-content/uploads/2009/12/wave01-800x565.jpg",
        5: "https://bipbap.ru/wp-content/uploads/2018/07/51-1-640x480.jpg"
    };
    getAlbum= async ()=>{
        return this._album;
    };
    getPhotos = (id)=>{
        return this._photos[id];
    }
}