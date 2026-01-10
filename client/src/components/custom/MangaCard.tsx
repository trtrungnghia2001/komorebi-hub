import { truyenImage } from "@/services/otruyen";
import type { MangaItem } from "@/types/otruyen";
import { memo } from "react";
import { Link } from "react-router-dom";

const MangaCard = ({ manga }: { manga: MangaItem }) => {
  return (
    <Link
      to={`/manga/` + manga.slug}
      state={[
        {
          label: "Truyện",
          path: "/manga",
        },
        {
          label: manga.name,
          path: "/manga/" + manga.slug,
        },
      ]}
      className="block"
    >
      <div className="relative">
        <img
          loading="lazy"
          alt="thumb"
          src={truyenImage(manga.thumb_url)}
          className="rounded-lg overflow-hidden aspect-thumbnail hover:opacity-90 transition-all"
        />
      </div>
      <h6 className="line-clamp-2 mt-2 h-10">{manga.name}</h6>
      <div className="text-muted-foreground border-t border-t-gray-500 pt-2 mt-2">
        <p className="line-clamp-1 font-medium">
          Chapter {manga.chaptersLatest?.[0]?.chapter_name}
        </p>
        <p className="text-13 text-muted-foreground line-clamp-1">
          {new Date(manga.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
};

export default memo(MangaCard);
