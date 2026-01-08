import type { MediaType, MovieItem } from "@/types";
import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import type { MangaItem } from "@/types/otruyen";
import MangaCard from "./MangaCard";

type MediaSlideType = {
  name: string;
  type: MediaType;
  items?: MovieItem[] | MangaItem[];
};

const MediaSlide = ({ name, type, items }: MediaSlideType) => {
  return (
    <section className="space-y-4">
      <h4>{name}</h4>

      <div>
        <Swiper
          spaceBetween={16}
          slidesPerView={2.2}
          breakpoints={{
            // Tablet (>= 640px)
            640: {
              slidesPerView: 3.2,
            },
            // Desktop (>= 1024px)
            1024: {
              slidesPerView: 6,
            },
            // Wide Desktop (>= 1280px)
            1280: {
              slidesPerView: 7,
            },
          }}
        >
          {items?.map((item, idx) => (
            <SwiperSlide key={idx}>
              {type === "movie" && <MovieCard movie={item as MovieItem} />}
              {type === "manga" && <MangaCard manga={item as MangaItem} />}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default memo(MediaSlide);
