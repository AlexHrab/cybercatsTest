import { useState } from "react";
import css from "./Select.module.css";
import { useRef, useEffect } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";

export function Select({ values, selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleDocumentClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  function handleOptionClick(name) {
    setTimeout(() => {
      setIsOpen(false);
    }, 0);

    setSelected(name);
  }

  function handleInputChange(event) {
    setSelected(event.target.value);
    setIsOpen(true);
  }

  const filteredValues = values.filter((value) =>
    value.name.toLowerCase().startsWith(selected.toLowerCase())
  );

  return (
    <div className={css.customDropdown} ref={dropdownRef}>
      <div className={css.inputBox}>
        <input
          className={css.input}
          type="text"
          value={selected}
          onChange={handleInputChange}
        />
        {isOpen ? (
          <AiFillCaretUp className={css.inputIcon} />
        ) : (
          <AiFillCaretDown className={css.inputIcon} />
        )}
      </div>
      {isOpen && (
        <ul className={css.dropdownOptions}>
          {filteredValues.length > 0 ? (
            filteredValues.map((option) => (
              <li
                className={css.dropdownOptionsItem}
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
