import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { fieldsToSearch } from "../helpers/fieldsToSearch";
import RadioGroup from "./RadioGroup";
import { radioOptionsForSearch } from "../helpers/radioOptionsForSearch";
import useFetchApi from "../hooks/useFetchApi";
import DisplaySearchedGearItems from "./DisplaySearchedGearItems";

export default function SearchForm() {
  const { fetchData, data, loading, error } = useFetchApi();

  const [selectedField, setSelectedField] = useState("Item Name");
  const [inputSearch, setInputSearch] = useState("");
  const [sortByValue, setSortByValue] = useState("Item Name");
  const [selectedOption, setSelectedOption] = useState("ASC");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const encodedField = encodeURIComponent(selectedField);
    const encodedInputSearch = encodeURIComponent(inputSearch);
    const url = `/api/gearlists/searchGear/${encodedField}/${encodedInputSearch}/${sortByValue}/${selectedOption}`;
    await fetchData(url);
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <>
      <form className="drop-more" onSubmit={handleSubmit}>
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
          className="form-control"
          required
        />
        <label>Order by</label>
        <Dropdown
          options={fieldsToSearch}
          selectedValue={sortByValue}
          setSelectedValue={setSortByValue}
        />
        <label>Order?</label>
        <RadioGroup
          options={radioOptionsForSearch}
          selectedValue={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-20 me-2">
          Search
        </button>
      </form>
      {(data?.length === 0 && (
        <div className="drop-some">Sorry, no items matched your search.</div>
      )) || <DisplaySearchedGearItems data={data} />}
    </>
  );
}
