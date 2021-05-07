import React from 'react';
import NotFound from './NotFound';
import Image from './images';

//PhotoContainer will recieve it's data from App.js via props
const ImageContainer = props => {

    const results = props.data;
    let images;
    // Conditional rendering - if results are returned, construct URL for Photo
    if (results.length > 0) {
        console.log("Results returned " + results.length + " images.");
        images = results.map(Images =>
            <Image url={`https://farm${Images.farm}.staticflickr.com/${Images.server}/${Images.id}_${Images.secret}_m.jpg`} key={Images.id} title={Images.title} />

        );
        console.log(images)
    } else {// Conditional Rendering - if No Results are returned render NotFound component
        console.log("This is part of the ELSE condition. Results has a length of " + results.length);
        images = <NotFound />
    }

    return (
        <div>
            {images}
        </div>
    );
}


export default ImageContainer;