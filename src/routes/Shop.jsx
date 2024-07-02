import React, { useEffect, useState, useRef } from "react";
import FiltersSection from "../components/FiltersSection";
import ProductGrid from "../components/ProductGrid";
import Searchbar from "../components/Searchbar";
import useWindowDimensions from "../hooks/useWindowDimensions";

function Shop({ products }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [removeFilters, setRemoveFilters] = useState(false);
  const filteredBySearchProducts = useRef([]);
  const filtersSetRef = useRef(false);
  const searchTermRef = useRef("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    if (searchTermRef.current !== "" && !filtersSetRef.current)
      filteredBySearchProducts.current = filteredProducts;
  }, [filteredProducts]);

  const { width } = useWindowDimensions();

  const searchClickHandler = (term) => {
    searchTermRef.current = term;
    setFilteredProducts(() => {
      return products.filter((product) => {
        return (
          product.name.toLowerCase().includes(term.toLowerCase()) ||
          product.type.toLowerCase().includes(term.toLowerCase()) ||
          product.color.toLowerCase().includes(term.toLowerCase())
        );
      });
    });

    //Reset Filters if search is clicked and there are some filters set.
    if (filtersSetRef.current) {
      setRemoveFilters(true);
      filtersSetRef.current = false;
    }
  };

  const filtersAddedHandler = (filters) => {
    filtersSetRef.current = filters.size > 0 ? true : false;
    setFilteredProducts(() => {
      let productsToFilter = [];
      if (
        searchTermRef.current !== "" &&
        filteredBySearchProducts.current.length > 0
      ) {
        productsToFilter = filteredBySearchProducts.current;
      } else {
        productsToFilter = products;
      }

      let resultProducts = [];

      let totalFilters = filters.entries().toArray().length;

      productsToFilter.forEach((product) => {
        let i;
        for (i = 0; i < totalFilters; i++) {
          let currentFilter = filters.entries().toArray()[i]; //currentFilter[0] is type and [1] is array of values
          if (currentFilter[0] === "price") {
            let matches = false;
            for (let i = 0; i < currentFilter[1].length; i++) {
              if (
                product.price > currentFilter[1][i].min &&
                product.price <= currentFilter[1][i].max
              ) {
                matches = true;
                break;
              }
            }
            if (!matches) break;
          } else if (
            currentFilter[1].includes(product[currentFilter[0]]) === false
          )
            //if product does not match with any value of current filter, skip it and move to next product
            break;
        }
        if (i === totalFilters) resultProducts.push(product); //product matches all filters
      });

      return resultProducts;
    });
  };

  return (
    
    <main id="catalogue-main">
      {width > 767 && 
        <FiltersSection
          onFiltersSelected={filtersAddedHandler}
          removeFilters={removeFilters}
        />
       }

      <div className="main-content">
        <Searchbar onSearchClick={searchClickHandler} />

        {showMobileFilters ? (
          <div>
            <FiltersSection
              onFiltersSelected={filtersAddedHandler}
              removeFilters={removeFilters}
            />
            <button
              className="trex-button small-heading"
              onClick={() => {
                setShowMobileFilters(false);
              }}
            >
              Close
            </button>
          </div>
        ) : (
          width < 767 && (
            <button
              className="trex-button small-heading"
              onClick={() => {
                setShowMobileFilters(true);
              }}
            >
              Filter Products
            </button>
          )
        )}
        {filteredProducts.length === 0 ? (
          filtersSetRef.current ? (
            "There are no products matching the selected filters. Please remove one or more filters."
          ) : (
            <ProductGrid products={products} />
          )
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>
    </main>
  );
}

export default Shop;
