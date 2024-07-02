import React, { useState, useRef, createRef, useEffect } from "react";
import "../styles/FiltersSection.scss";
import {FILTERS} from '../utils/filters'

function FiltersSection(props) {
 
  const [userSetFilters, setUserSetFilters] = useState(new Map());
  const inputFilterRefs = useRef([]);

  useEffect( () => {
    inputFilterRefs.current.forEach( ref => {
      ref.current.checked = false;
    });
    setUserSetFilters(new Map());
  }, [props.removeFilters])

  

  let counter = 0; 
  for (let filter of FILTERS) {
    for (counter = 0 ; counter < filter.values.length ; counter++) {
      inputFilterRefs.current[counter] = createRef();
      
    }
  }

  const filterSelectHandler = (type, value) => {
    if (userSetFilters.has(type)) {
      //type already exists, just add value to the value array
      let values = userSetFilters.get(type);
      let index = values.findIndex((arrValue) => {
        if (type === "price") {
          return arrValue.label === value.label;
        } else return arrValue === value;
      });

      if (index !== -1) {
        //filter already present, so remove it
        values.splice(index, 1);
        setUserSetFilters((filterMap) => {
          if (values.length === 0) filterMap.delete(type);
          else filterMap.set(type, values);
          return filterMap;
        });
      } else {
        values.push(value);
        setUserSetFilters((filterMap) => {
          filterMap.set(type, values);
          return filterMap;
        });
      }
    } else {
      //type does not exist, add it
      setUserSetFilters((filterMap) => {
        filterMap.set(type, [value]);
        return filterMap;
      });
    }
    props.onFiltersSelected(userSetFilters);
    
  };

  counter = -1;

  return (
    <div className="filterbar">
      
      {FILTERS.map((filter) => {
        return (
          <div key={filter.type}>
            <h3 className="small-heading">{filter.type}</h3>
            {filter.values.map((value) => {
              counter++;

              return (
                <fieldset key={filter.type === "price" ? value.label : value}>
                  <label
                    htmlFor={
                      filter.type === "price"
                        ? value.label.replaceAll(" ", "")
                        : value.replaceAll(" ", "")
                    }
                  >
                    <input
                      ref={inputFilterRefs.current[counter]}
                      type="checkbox"
                      id={
                        filter.type === "price"
                          ? value.label.replaceAll(" ", "")
                          : value.replaceAll(" ", "")
                      }
                      name={filter.type === "price" ? value.label : value}
                      onClick={() => filterSelectHandler(filter.type, value)}
                    />
                    {filter.type === "price" ? value.label : value}
                  </label>
                </fieldset>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default FiltersSection;
