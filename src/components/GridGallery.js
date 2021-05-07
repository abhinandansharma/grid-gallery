import { useEffect } from 'react';
import '../style.css';

const loadJSON = async (fname) => {
    var response = await fetch(fname);
    var j = await response.json();
    for (let imageObj of j.photos.photo) {
        let img = document.createElement("img");
        img.src = `https://farm${imageObj.farm}.staticflickr.com/${imageObj.server}/${imageObj.id}_${imageObj.secret}.jpg`;
        document.getElementById("gallery").append(img);
    }
};

loadJSON(
    "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e52a287d86469bf01ea901dfd92cf8a5&text=animal&media=photos&per_page=15&page=1&format=json&nojsoncallback=1"
);

function GridGallery() {
    useEffect(() => {
        let images = document.getElementsByTagName('img');
        document.getElementById("Search").on("keyup", function () {
            let search = document.getElementById('Search').val().toLowerCase();
            for (var i = 0; i < images.length; i++) {
                let value = images[i].getAttribute('data-alt');
                if (value.toLocaleLowerCase().indexOf(search) > -1) {
                    images[i].style.display = "";
                }
                else {
                    images[i].style.display = "none";
                }
            }
        });
    }, []);

    return (
        <div>
            <div className="search">
                <i className="fa fa-search searchIcon"></i>
                <input
                    type="text"
                    className="searchInput"
                    id="Search"
                    placeholder="Search free high resolution photos"
                />
            </div>
            <div id="gallery" className="App"></div>
        </div>
    );
}

export default GridGallery;
