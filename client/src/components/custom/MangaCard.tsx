import { truyenImg } from "@/services/otruyen";
import type { MangaItem } from "@/types/otruyen";
import { memo } from "react";
import { Link } from "react-router-dom";

const MangaCard = ({ manga }: { manga: MangaItem }) => {
  return (
    <Link to={`/`} className="block text-center">
      <div className="relative">
        <img
          loading="lazy"
          alt="thumb"
          src={truyenImg(manga.thumb_url)}
          className="rounded-lg overflow-hidden aspect-thumbnail hover:opacity-90 transition-all"
        />
        {/* <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs bg-gray-500 text-white rounded-t px-1.5 py-0.5">
          {movie.lang}
        </span> */}
      </div>
      <h6 className="line-clamp-1 mt-2">{manga.name}</h6>
      <p className="text-13 text-muted-foreground line-clamp-1">
        Chapter {manga.chaptersLatest?.[0]?.chapter_name}
      </p>
    </Link>
  );
};

export default memo(MangaCard);
