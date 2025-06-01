/* eslint-disable no-const-assign */
import React, { useState, useEffect } from "react";
import Dropdown from "../elements/Dropdown";
import { fieldsToSearch } from "../../helpers/fieldsToSearch";
import { sortByFields } from "../../helpers/sortByFields";
import RadioGroup from "../elements/RadioGroup";
import { radioOptionsForSearch } from "../../helpers/radioOptionsForSearch";
import useFetchApi from "../../hooks/useFetchApi";
import DisplaySearchedGearItems from "./DisplaySearchedGearItems";
import AppTitle from "../common/AppTitle";
import "../../assets/css/search.css";

export default function SearchForm() {
  const { fetchData, data, loading, error } = useFetchApi();

  const [selectedField, setSelectedField] = useState("item_name");
  const [inputSearch, setInputSearch] = useState("");
  const [sortByValue, setSortByValue] = useState("item_name");
  const [selectedOption, setSelectedOption] = useState("ASC");
  const [displayTable, setDisplayTable] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let url;
    if (inputSearch === "") {
      url = `/api/gearlists/searchGear/returnAll/${encodeURIComponent(
        sortByValue
      )}/${encodeURIComponent(selectedOption)}`;
    } else {
      url = `/api/gearlists/searchGear/${selectedField}/like/${encodeURIComponent(
        inputSearch
      )}/${encodeURIComponent(sortByValue)}/${encodeURIComponent(
        selectedOption
      )}`;
    }

    await fetchData(url);
    setDisplayTable(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <AppTitle />
      <form className="w-100" onSubmit={handleSubmit}>
        <div className="d-flex align-items-end w-100 flex-wrap">
          <div className="me-3">
            <label htmlFor="dropdownSearchBy" className="form-label mb-0">
              <strong>Search by</strong>
            </label>
            <Dropdown
              dropdownId={"dropdownSearchBy"}
              options={fieldsToSearch}
              selectedValue={selectedField}
              setSelectedValue={setSelectedField}
              required
            />
          </div>
          <div className="me-5">
            <label htmlFor="searchInput" className="form-label mb-0">
              <strong>Search Input</strong>
            </label>
            <input
              id="searchInput"
              type="text"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              placeholder={"Enter a search"}
              className="form-control"
            />
          </div>
          <div className="me-3">
            <label htmlFor="dropdownOrderBy" className="form-label mb-0">
              <strong>Sort by</strong>
            </label>
            <Dropdown
              dropdownId={"dropdownOrderBy"}
              options={sortByFields}
              selectedValue={sortByValue}
              setSelectedValue={setSortByValue}
            />
          </div>
          <label htmlFor="radioButtonId">
            {sortByValue === "price" || sortByValue === "weight_lbs"
              ? "Numerical Order:"
              : "Alphabetical Order:"}
          </label>
          <RadioGroup
            radioId={"radioButtonId"}
            options={radioOptionsForSearch}
            selectedValue={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          <div className="ms-5">
            <button type="submit" className="btn btn-info w-20">
              Search
            </button>
          </div>
        </div>
      </form>
      <div className="mt-4">
        {error && <div>Error: Please try again...</div>}
        {!error && (
          <>
            {data?.length === 0 ? (
              <div className="drop-some">
                Sorry, no items matched your search.
              </div>
            ) : (
              <DisplaySearchedGearItems
                displayTable={displayTable}
                data={data}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
