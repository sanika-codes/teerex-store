import React, { useRef } from "react";
import "../styles/Searchbar.scss";

function Searchbar(props) {

  const searchRef = useRef('');

  const searchClickHandler = (event) => {
    event.preventDefault();
    props.onSearchClick(searchRef.current.value);
  }
  return (
    <div className="searchbar">
      <form role="search" action="">
        <label htmlFor="search-store">Search the TeeRex Store</label>
        <input type="text" id="search-store" placeholder="Search for ..." className="small-heading" ref={searchRef} />
        <button aria-label="Search" id="search" className="search-button-container small-heading" onClick={searchClickHandler}>Search
          <svg
            aria-hidden="true"
            role="img"
            id="rey-icon-search-65cf9d3cb8bd6"
            className="rey-icon rey-icon-search icon-search"
            viewBox="0 0 30 30"
          >
            <path d="M29.784,26.394 L25.103,21.831 C25.056,21.785 24.995,21.764 24.943,21.727 C29.501,16.417 28.792,8.956 23.676,3.969 C21.055,1.414 17.571,0.006 13.865,0.006 C10.158,0.006 6.673,1.414 4.053,3.969 C-1.358,9.244 -1.358,17.827 4.053,23.101 C6.673,25.657 10.158,27.065 13.865,27.065 C17.155,27.065 19.831,26.323 22.322,24.285 C22.361,24.336 22.381,24.394 22.428,24.441 L26.726,28.630 C26.975,28.873 27.301,28.995 27.627,28.995 C27.953,28.995 29.099,28.873 29.347,28.630 C29.845,28.145 30.282,26.879 29.784,26.394 ZM13.865,23.834 C7.538,23.834 3.588,19.596 3.526,13.649 C3.460,7.397 7.666,3.397 13.865,3.397 C20.087,3.397 24.519,7.410 24.477,13.609 C24.436,19.609 20.169,23.834 13.865,23.834 Z"></path>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default Searchbar;
