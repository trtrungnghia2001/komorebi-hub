import { phimCategories, phimCountries, phimYears } from "@/services/ophim";
import type {
  MovieDetailCategory,
  MovieDetailCountry,
  MovieDetailYear,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaCalendar, FaSort } from "react-icons/fa";
import { FaEarthAsia } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

type SelectType = {
  label: string;
  value: string;
};

export const MovieFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchParams = (updates: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([name, value]) => {
      if (value) {
        newParams.set(name, value.toString());
      } else {
        newParams.delete(name);
      }
    });

    setSearchParams(newParams);
  };

  const handleReset = () => {
    setSearchParams({
      media_type: "movie",
      keyword: "",
      sort_field: "modified.time",
    });
  };

  const { data } = useQuery({
    queryKey: ["movie", "filter"],
    queryFn: async () =>
      await Promise.all([
        await phimCategories(),
        await phimCountries(),
        await phimYears(),
      ]),
  });

  const renderFilter = useMemo(() => {
    if (!data) return [];

    const categories: SelectType[] = (
      data[0].data.items as unknown as MovieDetailCategory[]
    ).map((item) => ({
      label: item.name.toString(),
      value: item.slug.toString(),
    }));

    const countries: SelectType[] = (
      data[1].data.items as unknown as MovieDetailCountry[]
    ).map((item) => ({
      label: item.name.toString(),
      value: item.slug.toString(),
    }));

    const years: SelectType[] = (
      data[2].data.items as unknown as MovieDetailYear[]
    ).map((item) => ({
      label: item.year.toString(),
      value: item.year.toString(),
    }));

    const sorts: SelectType[] = [
      {
        label: `Ngày cập nhật`,
        value: "modified.time",
      },
      {
        label: `Năm phát hành`,
        value: "year",
      },
      {
        label: `Lượt xem`,
        value: "view",
      },
    ];

    const list: SelectType[] = [
      { label: "Phim mới", value: "phim-moi" },
      { label: "Phim bộ", value: "phim-bo" },
      { label: "Phim lẻ", value: "phim-le" },
      { label: "TV Shows", value: "tv-shows" },
      { label: "Hoạt hình", value: "hoat-hinh" },
      { label: "Phim Vietsub", value: "phim-vietsub" },
      { label: "Thuyết minh", value: "phim-thuyet-minh" },
      { label: "Lồng tiếng", value: "phim-long-tieng" },
      { label: "Đang chiếu", value: "phim-bo-dang-chieu" },
      { label: "Hoàn thành", value: "phim-bo-hoan-thanh" },
      { label: "Sắp chiếu", value: "phim-sap-chieu" },
      { label: "Chiếu rạp", value: "phim-chieu-rap" },
      { label: "Subteam", value: "subteam" },
    ];

    const all = [{ label: "Tất cả", value: "" }];

    return [
      {
        icon: <BiSolidCategoryAlt />,
        label: `Danh sách`,
        items: all.concat(list),
        queryKey: "danh-sach",
        value: searchParams.get("danh-sach") || "",
      },
      {
        icon: <BiSolidCategoryAlt />,
        label: `Thể loại`,
        items: all.concat(categories),
        queryKey: "category",
        value: searchParams.get("category") || "",
      },
      {
        icon: <FaEarthAsia />,
        label: `Quốc gia`,
        items: all.concat(countries),
        queryKey: "country",
        value: searchParams.get("country") || "",
      },
      {
        icon: <FaCalendar />,
        label: `Năm`,
        items: all.concat(years),
        queryKey: "year",
        value: searchParams.get("year") || "",
      },
      {
        icon: <FaSort />,
        label: `Sắp xếp`,
        items: sorts,
        queryKey: "sort_field",
        value: searchParams.get("sort_field") || "",
      },
    ];
  }, [data, searchParams]);

  return (
    <div className="transition-all space-y-4">
      <p className="text-muted-foreground">
        <span>Tìm kiếm chỉ phù hợp với tất cả danh sách. </span>
        <button onClick={handleReset} className="underline">
          Làm mới bộ lọc
        </button>
      </p>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {renderFilter.map((filter) => (
          <div key={filter.queryKey} className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-base">{filter.icon}</span>
              <span>{filter.label}</span>
            </div>
            <select
              value={filter.value}
              onChange={(e) => {
                handleSearchParams({
                  [filter.queryKey]: e.target.value,
                  page: 1,
                });
              }}
              className="bg-select px-4 py-2 rounded w-full cursor-pointer custom-scrollbar"
            >
              {filter.items.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};
