import { useEffect, useState, useRef } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faSpinner,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import HeadlessTippy from "@tippyjs/react/headless";

import * as searchServices from "~/services/searchService";
import { Wrapper as PropperWrapper } from "~/components/Propper";
import AccountItem from "~/components/AccountItem";
import { useDebounce } from "~/hooks";
import styles from "./Seach.module.scss";

const cx = classNames.bind(styles);

function Search() {
  
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResults, setShowResults] = useState(true);
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(searchValue, 500);

  const inputRef = useRef();

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchAPI = async () => {
      setLoading(true);
      const result = await searchServices.search(debouncedValue);
      setSearchResult(result);
      setLoading(false);
    };
    fetchAPI();
  }, [debouncedValue]);

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResults = () => {
    setShowResults(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  return (
    //Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
    <div>
      <HeadlessTippy
        visible={showResults && searchResult.length > 0}
        appendTo={() => document.body}
        interactive
        render={(attrs) => (
          <div className={cx("search-results")} tabIndex="-1">
            <PropperWrapper>
              <h4 className={cx("search-title")}>Accounts</h4>
              {searchResult.map((result) => (
                <AccountItem key={result.id} data={result} />
              ))}
            </PropperWrapper>
          </div>
        )}
        onClickOutside={handleHideResults}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            type="text"
            placeholder="Search"
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResults(true)}
          />

          {/*Clear*/}
          {!!searchValue && !loading && (
            <button className={cx("clear")} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          {/*Loading*/}
          {loading && (
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
          )}

          {/*Search button*/}
          <button className={cx("search-btn")}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              onMouseDown={(e) => e.preventDefault()}
            />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
