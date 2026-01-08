import { memo } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="px-5 py-3 bg-header-bg">
      <div className="flex items-center justify-between gap-4">
        <Link to={`/`} className="block">
          <img
            src="https://www.rophim.li/images/logo.svg"
            alt="logo"
            loading="lazy"
            className="w-28"
          />
        </Link>
      </div>
    </header>
  );
};

export default memo(Header);
