import PropTypes from 'prop-types'
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PropperWrapper } from "~/components/Propper";

import MenuItem from "./MenuItem";
import Header from "./Header";
import styles from "./MenuItem.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({
  children,
  items = [],
  hideOnClick = false,
  onChange = defaultFn,
}) {
  
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };
  const handleBack = () => {
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const renderResults = (attrs) => (
    <div className={cx("menu-list")} tabIndex="-1">
      <PropperWrapper className={cx("menu-popper")}>
        {history.length > 1 && (
          <Header 
          title={current.title} 
          onBack={handleBack} 
          />
        )}
        <div className={cx("menu-body")}>{renderItems()}</div>
      </PropperWrapper>
    </div>
  )

  //reset to the first page
  const handleResetMenu = () => {
    setHistory((prev) => prev.slice(0, 1))
  }

  return (
    <Tippy
      interactive
      delay={[0, 400]}
      offset={[12, 8]}
      hideOnClick={hideOnClick}
      placement="bottom-end"
      render={renderResults}
      onHide={handleResetMenu}
    >
      {children}
    </Tippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  hideOnClick: PropTypes.bool,
  onChange: PropTypes.func,
}

export default Menu;
