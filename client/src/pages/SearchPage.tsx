import MovieCard from "@/components/custom/MovieCard";
import InputSearch from "@/components/form/InputSearch";
import Wrapper from "@/components/layout/Wrapper";
import { phimSearch } from "@/services/ophim";
import type { MediaType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const media_type = useMemo(
    () => searchParams.get("media_type") as MediaType,
    [searchParams]
  );
  const keyword = useMemo(
    () => searchParams.get("keyword") || "",
    [searchParams]
  );

  const { data: movies } = useQuery({
    queryKey: ["search", "movie", media_type],
    queryFn: async () => await phimSearch(keyword),
    enabled: media_type === "movie",
  });
  return (
    <div>
      {/* input */}
      <section
        className="h-125 flex items-center justify-center bg-no-repeat bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${`https://wallpapers.com/images/hd/pixel-landscape-2000-x-1334-yg387p1lulc6yojr.jpg`})`,
        }}
      >
        <div className="absolute inset-0  bg-black/50"></div>
        <InputSearch className="max-w-200 w-full z-10 bg-input" />
      </section>
      <Wrapper className="p-4">
        {/* filter */}
        <section></section>
        {/* result */}
        <section>
          <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {movies?.data.items.map((item) => (
              <li key={item._id}>
                <MovieCard movie={item} />
              </li>
            ))}
          </ul>
        </section>
      </Wrapper>
    </div>
  );
};

export default SearchPage;
