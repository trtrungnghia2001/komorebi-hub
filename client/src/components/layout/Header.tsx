import { memo } from "react";
import { Link, NavLink } from "react-router-dom";
import ButtonTheme from "./ButtonTheme";
import clsx from "clsx";
import InputSearch from "../form/InputSearch";
import { MdInstallMobile } from "react-icons/md";
import { CgMenuRightAlt } from "react-icons/cg";
import Logo from "../custom/Logo";
// import logo from "@/assets/logo.png";

const navs = [
  { title: `Phim`, path: `/search?media_type=movie` },
  { title: `Truyện`, path: `/search?media_type=manga` },
  { title: `Anime`, path: `/search?media_type=anime` },
  { title: `Databook`, path: `/search?media_type=data-book` },
  { title: `Tìm kiếm`, path: `/search` },
  { title: `Giới thiệu`, path: `/about` },
  { title: `Liên hệ`, path: `/contact` },
];

const Header = () => {
  return (
    <header
      className={clsx([
        `sticky top-0 left-0 right-0 z-50`,
        `px-5 py-3 bg-header-bg text-sm`,
      ])}
    >
      <div className="flex items-center justify-between gap-4">
        <Logo />

        <InputSearch className="w-xs hidden md:block" />
        <div className="flex-1 flex items-center justify-between">
          <nav>
            <ul className="hidden xl:flex items-center gap-4">
              {navs.map((nav) => (
                <li key={nav.path}>
                  <NavLink
                    to={nav.path}
                    className={({ isActive }) =>
                      clsx([
                        `hover:text-yellow-500`,
                        isActive && `text-yellow-500`,
                      ])
                    }
                  >
                    {nav.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-4 text-13">
            <Link
              to={`/download-app`}
              className="hidden md:flex items-center gap-1"
            >
              <MdInstallMobile size={32} className="text-yellow-500" />
              <p className="">
                <span className="text-muted-foreground text-xs block">
                  Tải ứng dụng
                </span>
                <span className="font-bold block">CimangaHub</span>
              </p>
            </Link>
            <ButtonTheme />
            <Link
              to={`/signin`}
              className="rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-all px-3 py-1.5"
            >
              Đăng nhập
            </Link>
            <button>
              <CgMenuRightAlt size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
