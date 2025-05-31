/* eslint-disable no-const-assign */
import React, { useState, useEffect } from "react";
import Dropdown from "../elements/Dropdown";
import { fieldsToSearch } from "../../helpers/fieldsToSearch";
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
    // Checks if search item selected is description; if so, use the url for LIKE sql statement
    if (selectedField === "description") {
      url = `/api/gearlists/searchGear/description/like/${encodeURIComponent(
        inputSearch
      )}/${encodeURIComponent(sortByValue)}/${encodeURIComponent(
        selectedOption
      )}`;
    } else {
      url = `/api/gearlists/searchGear/${encodeURIComponent(
        selectedField
      )}/${encodeURIComponent(inputSearch)}/${encodeURIComponent(
        sortByValue
      )}/${encodeURIComponent(selectedOption)}`;
    }
    await fetchData(url);
    setDisplayTable(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <AppTitle />
      <form onSubmit={handleSubmit}>
        <label>Search by Field</label>
        <Dropdown
          options={fieldsToSearch}
          selectedValue={selectedField}
          setSelectedValue={setSelectedField}
          required
        />
        <label>Search Input</label>
        <input
          type="text"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          placeholder={
            selectedField === "description"
              ? "Enter a phrase to search in the descriptions"
              : "Enter search input"
          }
          className="form-control"
          required
        />
        <label>Order by</label>
        <Dropdown
          options={fieldsToSearch}
          selectedValue={sortByValue}
          setSelectedValue={setSortByValue}
        />
        <label>
          {sortByValue === "price" ? "Order of Cost?" : "Alphabetical Order?"}
        </label>
        <RadioGroup
          options={radioOptionsForSearch}
          selectedValue={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-20 me-2">
          Search
        </button>
      </form>
      {error && <div>{error}: Please try again...</div>}
      {!error && (
        <>
          {data?.length === 0 ? (
            <div className="drop-some">
              Sorry, no items matched your search.
            </div>
          ) : (
            <DisplaySearchedGearItems displayTable={displayTable} data={data} />
          )}
        </>
      )}
    </>
  );
}
