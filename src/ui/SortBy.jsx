import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  const handleChange = (e) => {
    // could be abstracted into a custom hook called useURL - readURL and updateURL function
    // This code is repeated for filtering as well
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <Select
      value={sortBy}
      options={options}
      type={"white"}
      onChange={handleChange}
    />
  );
}

export default SortBy;
