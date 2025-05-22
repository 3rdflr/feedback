import TextHighLight from "./textHighLight.jsx";
import styles from "./SuggestionItems.module.css";

const SuggestionItem = ({ suggestion, value, onClick, isSelected }) => {
  return (
    <li className={styles.list} onClick={() => onClick(suggestion.key)}>
      {isSelected ? (
        <TextHighLight
          text={`${suggestion.description}     [${suggestion.type}]`}
          value={value}
        />
      ) : (
        <span>{`${suggestion.description}     [${suggestion.type}]`}</span>
      )}
    </li>
  );
};

export default SuggestionItem;
