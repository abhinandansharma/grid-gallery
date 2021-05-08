// Search input Text & Maginfying Glass button
import React, { Component } from 'react';

// a promised-based library that makes server requests in React
// It will be used to fetch the data from Flickr
import axios from 'axios';

import '../style.css'

// App components
import ImageContainer from './ImageContainer';

export default class Search extends Component {
    // State specific for this component that is updated
    // by onSearchChange function that users type Text
    // into input field of the Form
    // Initialize State for data that is going to change
    constructor() {
        super();
        this.state = {
            // State is the 'photos' data we want to display
            photos: [],
            loading: false,//true (was true)
            query: '',
            searchText: '',

        };
    }

    // searchText gets updated by the text users type into the Search form
    onSearchChange = e => {
        this.setState({ searchText: e.target.value });
        e.preventDefault();

        // Input field's value assigned to: checkquery
        let checkquery = (this.query.value);
        console.log('You typed "' + checkquery + '" in the Search field');
        this.performSearch(checkquery);
        //trying to change url on search.
        // let url = new URL('https://grid-gallery.vercel.app/');
        // let params = new URLSearchParams(url.search.slice(1));

        // params.append(checkquery, checkquery.length);
    }

    // React component lifecycle method to fetch data immediately
    // performSearch is called with 'Kitten' as the query text
    // This runs before user types anything in the Search Form
    componentDidMount() {
    }

    performSearch = (text = '') => {
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e52a287d86469bf01ea901dfd92cf8a5&text=${text}&per_page=15&format=json&nojsoncallback=1`)
            // Response object executed once results are obtained from Flickr
            .then(response => {
                this.setState({
                    photos: response.data.photos.photo,
                    loading: false,//was false
                    checkquery: text
                });
            })
            // catch method - handles any errors fetching data
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }


    render() {
        return (
            <div>
                <div id="nav">
                    <div className="search">
                        <i className="fa fa-search searchIcon"></i>
                        <input
                            type="search"
                            onChange={this.onSearchChange}
                            className="searchInput"
                            ref={(input) => this.query = input} // Puts a reference to the input on the Search form class
                            id="Search"
                            placeholder="Search free high resolution photos"
                        />
                    </div>
                </div>
                <div className="gallery">
                    {
                        (this.state.loading)
                            ? <p>Loading...</p>
                            : <ImageContainer data={this.state.photos} />
                    }
                </div>
            </div>
        );
    }
}
