import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import css from "./Select.module.css";
import { AiFillCaretUp } from "react-icons/ai";
import clsx from "clsx";

export function Select({ values, selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const icon = clsx(css.inputIcon, isOpen && css.rotate);

  useEffect(() => {
    const handleClick = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleOptionClick = useCallback(
    (name) => {
      setSelected(name);
      setIsOpen(false);
    },
    [setSelected]
  );

  const handleInputChange = useCallback(
    (e) => {
      setSelected(e.target.value);
      setIsOpen(true);
    },
    [setSelected]
  );

  const filteredValues = useMemo(() => {
    const text = selected.toLowerCase();
    return values.filter((item) => item.name.toLowerCase().startsWith(text));
  }, [values, selected]);

  return (
    <div className={css.customDropdown} ref={dropdownRef}>
      <div className={css.inputBox}>
        <input
          className={css.input}
          type="text"
          value={selected}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
        />
        <AiFillCaretUp className={icon} />
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
            <li className={css.noMatches}>No matches found</li>
          )}
        </ul>
      )}
    </div>
  );
}
