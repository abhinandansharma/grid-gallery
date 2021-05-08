// Container component that takes in a keyword and api key as props
// and fetches the photos and other required information from the API
import React, { Component } from 'react';

// a promised-based library that makes server requests in React
// It will ne used to fetch the data from Flickr
import axios from 'axios';
import '../style.css'
import Search from './search';
import InfiniteScroll from 'react-infinite-scroll-component';
// import ImageSlideshow from 'material-ui/svg-icons/image/slideshow';

// App components
import ImageContainer from './ImageContainer';

export default class GridGallery extends Component {
    // Initialize State for data that is going to change
    constructor() {
        super();
        this.state = {
            // State is the 'photos' data we want to display
            photos: [],
            loading: true,
            query: '',
            page: 15,
        };
    }

    // componentDidMount is used to "fetch data from a server" with AJAX calls (axios will perform)
    componentDidMount() {
        this.newImages()
    }

    newImages = () => {
        // axios (get method) - uses Javascript Promises to handle results. Promises let you chain methods (callbacks) in a sequential order
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e52a287d86469bf01ea901dfd92cf8a5&text=${this.props.query}&media=photos&per_page=${this.state.page}&page=1&format=json&nojsoncallback=1`)
            // Response object executed once results are obtained from Flickr
            .then(response => {
                console.log(response)
                // let [photos] = this.state.photos;
                // photos.push(response.data.photos.photo);
                this.setState({
                    photos: response.data.photos.photo,
                    loading: false,
                    query: ''
                });
            })
            // catch method - handles any errors fetching data
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    getValues = () => {
        this.setState({
            page: (this.state.page) + 70
        });
        this.newImages()
        console.log(this.state.page)

    }


    render() {
        console.log(this.state.photos);
        return (
            <div>
                <Search />
                <div className="photo-container">
                    {
                        (this.state.loading)
                            ? <p>Loading...</p>
                            : <InfiniteScroll dataLength={15} next={this.getValues} hasMore={true} className="gallery" alwaysCallback={true} refreshFunction={this.getValues}>
                                <ImageContainer data={this.state.photos} />
                            </InfiniteScroll>
                    }
                </div>
            </div>
        );
    }
}
