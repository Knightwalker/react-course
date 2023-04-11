import "./SearchButton.css";



/**
 * @typedef {Object} RefType
 * @property {HTMLInputElement} current
 */

/**
 * Animated search button which enables users to query movies
 * @param {object} props
 * @param {string} props.placeholderValue
 * @param {string} props.searchParam
 * @param {Function} props.setSearchParam
 * @param {Function} props.handleShowInput
 * @param {boolean} props.isSearching
 * @param {Function} props.handleKeyDownEvents
 * @param {React.MutableRefObject<RefType>} props.inputRef
 * @returns {JSX.Element}
 */
const SearchButton = ({
  placeholderValue,
  searchParam,
  setSearchParam,
  handleShowInput,
  isSearching,
  handleKeyDownEvents,
  inputRef,
}) => {


  return (
    <div className="SearchButton">
      <div className="SearchButton__input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className={`SearchButton__input ${
            isSearching ? "SearchButton__input-visible" : ""
          }`}
          placeholder={placeholderValue}
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          onKeyDown={handleKeyDownEvents}
        />
        {isSearching && searchParam.length !== 0 && (
          <button
            className="SearchButton__btn-close"
            name="clear-input"
            onClick={() => setSearchParam("")}
          >
            <i className="bi bi-x"></i>
          </button>
        )}

        {isSearching && <i className="bi bi-search SearchButton__input-visible-icon"></i>}
      </div>

      {isSearching ? null : (
        <button className="SearchButton__btn" onClick={handleShowInput}>
          <i className="bi bi-search"></i>
        </button>
      )}
    </div>
  );
};

export default SearchButton;
