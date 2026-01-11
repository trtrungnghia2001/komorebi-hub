import MangaCard from "@/components/custom/MangaCard";
import MovieCard from "@/components/custom/MovieCard";
import Pagination from "@/components/custom/Pagination";
import { MovieFilter } from "@/components/custom/SearchFilter";
import InputSearch from "@/components/form/InputSearch";
import Wrapper from "@/components/layout/Wrapper";
import { phimDanhsach, phimSearch } from "@/services/ophim";
import { truyenSearch } from "@/services/otruyen";
import type {
  MangaItem,
  MediaType,
  MovieItem,
  MovieListType,
  PaginationType,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDebounce } from "use-debounce";

const bgSlideUrls = [
  {
    img: `https://s1.picswalls.com/wallpapers/2014/09/18/war-desktop-wallpaper_112201361_216.jpg`,
    title: `Movie`,
  },
  {
    img: `https://wallpapers.com/images/hd/pixel-landscape-2000-x-1334-yg387p1lulc6yojr.jpg`,
    title: `Manga`,
  },

  {
    img: `https://wallpapercave.com/wp/wp5475487.jpg`,
    title: `Anime`,
  },
  {
    img: `https://images3.alphacoders.com/101/thumb-1920-1012111.jpg`,
    title: `Data Book`,
  },
];

const mediaTypes: { type: MediaType; label: string }[] = [
  { label: "Movie", type: "movie" },
  { label: "Manga", type: "manga" },
  { label: "Anime", type: "anime" },
  { label: "Data book", type: "databook" },
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    media_type: "movie",
    keyword: "",
    sort_field: "modified.time",
  });
  const media_type = useMemo(
    () => searchParams.get("media_type") as MediaType,
    [searchParams]
  );
  const keyword = useMemo(
    () => searchParams.get("keyword") || "",
    [searchParams]
  );
  const list = useMemo(
    () => searchParams.get("danh-sach") as MovieListType,
    [searchParams]
  );

  // search
  const [text, setText] = useState(keyword);
  const [value] = useDebounce(text, 500);

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

  useEffect(() => {
    if (value !== searchParams.get("keyword")) {
      setSearchParams(
        (prev) => {
          prev.set("keyword", value);
          prev.set("page", `1`);

          return prev;
        },
        { replace: true }
      );
    }
  }, [value, setSearchParams]);

  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: ["search", searchParams.toString()],
    queryFn: async () => {
      if (media_type === "movie") {
        // Ưu tiên lọc theo danh mục nếu 'danh-sach' có giá trị
        if (list) return await phimDanhsach(list, searchParams.toString());

        // Nếu không có danh mục thì mới search theo keyword + các filter khác
        return await phimSearch(searchParams.toString());
      }

      if (media_type === "manga") {
        return await truyenSearch(searchParams.toString());
      }
      return null;
    },
    enabled: !!media_type,
  });

  const dataCustom = useMemo(() => {
    let results: unknown[] = [];
    let pagination: PaginationType = {
      currentPage: 0,
      limit: 0,
      totalItems: 0,
      totalPages: 0,
    };

    if (!data) return { results };

    if (media_type === "movie") {
      results = data.data.items;
      pagination = {
        currentPage: data.data.params.pagination.currentPage,
        limit: data.data.params.pagination.totalItemsPerPage,
        totalItems: data.data.params.pagination.totalItems,
        totalPages: Math.ceil(
          data.data.params.pagination.totalItems /
            data.data.params.pagination.totalItemsPerPage
        ),
      };
    }
    if (media_type === "manga") {
      results = data.data.items;
    }

    return {
      results,
      pagination,
    };
  }, [data, media_type]);

  return (
    <div>
      {/* slide bg */}
      <section>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay
          loop
          modules={[Autoplay]}
        >
          {bgSlideUrls?.map((bg, idx) => (
            <SwiperSlide key={idx} className="relative">
              <img
                src={bg.img}
                alt="bg"
                loading="lazy"
                className="object-center object-cover h-32 md:h-64 w-full "
              />
              <div className="absolute inset-0 bg-black/50"></div>
              <h1 className="italic absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                {bg.title}
              </h1>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <div className="absolute inset-0  bg-black/50"></div> */}
      </section>
      <Wrapper className="py-8 px-4 space-y-8">
        {/* input */}
        <section>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex items-stretch gap-4"
          >
            <InputSearch
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1"
            />
            <select
              value={media_type}
              onChange={(e) => {
                handleSearchParams({ media_type: e.target.value, page: 1 });
              }}
              className="min-w-25 bg-select px-4 py-2 rounded-lg outline-none cursor-pointer"
            >
              {mediaTypes.map((type) => (
                <option key={type.type} value={type.type}>
                  {type.label}
                </option>
              ))}
            </select>
          </form>
        </section>
        {/* filter */}
        <section>{media_type === "movie" && <MovieFilter />}</section>
        {/* result */}
        <section>
          {isLoading && <p>Đang tìm kiếm...</p>}
          {!isLoading && isError && (
            <p className="text-red-600">{error.message}</p>
          )}
          {!isLoading && isSuccess && dataCustom.results.length === 0 && (
            <div className="text-muted-foreground space-y-2">
              <h6>Opps! Không tìm thấy "{value}"</h6>
              <p className="text-sm">Thử từ khóa khác xem sao bro?</p>
            </div>
          )}
          {!isLoading && isSuccess && dataCustom.results.length > 0 && (
            <div>
              <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                {dataCustom.results.map((item, idx) => (
                  <li key={idx}>
                    {media_type === "movie" && (
                      <MovieCard movie={item as MovieItem} />
                    )}
                    {media_type === "manga" && (
                      <MangaCard manga={item as MangaItem} />
                    )}
                  </li>
                ))}
              </ul>
              <Pagination
                currentPage={dataCustom.pagination?.currentPage || 1}
                totalPages={dataCustom.pagination?.totalPages || 1}
                onPageChange={(page) => {
                  handleSearchParams({ page: page });
                }}
              />
            </div>
          )}
        </section>
      </Wrapper>
    </div>
  );
};

export default SearchPage;
