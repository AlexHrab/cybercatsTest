import { useState } from "react";
import css from "./Select.module.css";
import { useRef, useEffect } from "react";

export function Select() {
  const [values] = useState(() => {
    const savedValues = JSON.parse(window.localStorage.getItem("savedAnimals"));
    return savedValues || [];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleDocumentClick(event) {
      setIsOpen(false);
    }

    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    if (selected) {
      setIsOpen(true);
    }
  }, [selected]);

  function handleOptionClick(option) {
    setSelected(option);
    setIsOpen(false);
  }

  function handleInputChange(event) {
    setSelected(event.target.value);
  }

  const filteredValues = values.filter((value) =>
    value.name.toLowerCase().startsWith(selected.toLowerCase())
  );

  return (
    <div className={css.customDropdown}>
      <input
        type="text"
        value={selected}
        // onClick={() => setIsOpen(!isOpen)}
        onChange={handleInputChange}
      />
      {isOpen && (
        <ul className={css.dropdownOptions}>
          {filteredValues.length > 0 ? (
            filteredValues.map((option) => (
              <li
                key={option.id}
                onClick={() => handleOptionClick(option.name)}
              >
                {option.name}
              </li>
            ))
          ) : (
            <li>
              <p>No matches found</p>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

{
  /* <select
name="select"
id="select"
value={selectedValue}
onChange={handleChange}
>
<option value="" disabled></option>
{values.map((el) => (
  <option key={el.id} value={el.id}>
    {el.name}
  </option>
))}
</select> */
}

{
  /* <div className={css.list}>
      <input
        type="text"
        list="animals"
        value={selectedValue}
        onChange={handleChange}
      />
      <datalist id="animals">
        {values.map((el) => (
          <option key={el.id} data-id={el.id}>
            {el.name}
          </option>
        ))}
      </datalist>
    </div> */
}
