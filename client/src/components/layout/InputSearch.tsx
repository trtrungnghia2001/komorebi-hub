import clsx from "clsx";
import { memo, type ComponentProps } from "react";
import { MdSearch } from "react-icons/md";

const InputSearch = ({ className, ...props }: ComponentProps<"input">) => {
  return (
    <div
      className={clsx([
        `bg-input px-4 py-2 rounded-lg flex items-center gap-2`,
        className,
      ])}
    >
      <MdSearch size={20} />
      <input
        type="text"
        placeholder="Tìm kiếm phim, diễn viên, truyện, anime"
        className="w-full border-none outline-none"
        {...props}
      />
    </div>
  );
};

export default memo(InputSearch);
