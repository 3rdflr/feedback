import { useCallback, useState } from "react";
import { debounce, groupBy } from "lodash";
import { dummy } from "../dummy.js";
import SuggestionItems from "./SuggestionItems.jsx";
import styles from "./AutoComplete.module.css";

const DEBOUNCE_DELAY = 300;

function AutoComplete() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightList, setHighlightList] = useState(-1);

  const filteredSuggestions = useCallback((value) => {
    if (!value) {
      setSuggestions([]);
      return;
    }
    const filtered = dummy.filter((item) =>
      item.description.toLowerCase().includes(value.toLowerCase())
    );

    const groupedByType = groupBy(filtered, "type");

    const typeOrder = ["COMPANY", "PEOPLE", "COUNTRY", "JOB"];

    const sortedGroups = typeOrder.flatMap((type) => groupedByType[type] || []);

    setSuggestions(sortedGroups);
  }, []);

  const filterDebounced = useCallback(
    debounce(filteredSuggestions, DEBOUNCE_DELAY),
    [filteredSuggestions]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      setShowSuggestions(true);
      filterDebounced(value);
      setHighlightList(-1);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  const handleSuggestionClick = (key) => {
    setInputValue(key);
    setShowSuggestions(false);
    setHighlightList(-1);
    const selected = dummy.find((item) => item.key === key);
    if (selected) {
      console.log({ key: selected.key, type: selected.type });
    }
  };

  const handleKeyDown = (event) => {
    if (!showSuggestions || suggestions.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightList((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightList((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (event.key === "Enter" && highlightList !== -1) {
      handleSuggestionClick(suggestions[highlightList].key);
    } else if (event.key === "Escape") {
      setShowSuggestions(false);
      setHighlightList(-1);
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && (
        <ul className={styles.lists}>
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <SuggestionItems
                key={suggestion.key}
                suggestion={suggestion}
                value={inputValue}
                onClick={handleSuggestionClick}
                isSelected={index === highlightList}
              />
            ))
          ) : (
            <li>결과가 없습니다</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default AutoComplete;
