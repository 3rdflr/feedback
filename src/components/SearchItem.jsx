import searchIcon from "../assets/input/search.svg";

function SearchItem({ value, onChange }) {
  return (
    <div>
      <img src={searchIcon} alt="검색 아이콘" />
      <input
        value={value}
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        onChange={onChange}
      />
    </div>
  );
}

export default SearchItem;
