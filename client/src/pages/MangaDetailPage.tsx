import { truyenBySlug, truyenImage } from "@/services/otruyen";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const MangaDetailPage = () => {
  const { slug } = useParams();
  const { data: info } = useQuery({
    queryKey: ["manga", "detail", slug],
    queryFn: async () => await truyenBySlug(slug as string),
    enabled: !!slug,
  });

  const mangaInfo = useMemo(() => {
    return info?.data.item;
  }, [info]);

  return (
    <div className="max-w-7xl w-full mx-auto">
      <section className="flex items-start gap-8 max-w-4/5">
        <img
          src={truyenImage(mangaInfo?.thumb_url)}
          alt="thumb"
          loading="lazy"
          className="rounded-lg overflow-hidden w-3xs"
        />
        <div className="flex-1 space-y-2">
          <h3>{mangaInfo?.name}</h3>
          <p className="text-muted-foreground flex flex-wrap gap-2">
            <h5>Thể loại: </h5>
            {mangaInfo?.category.map((cate) => (
              <Link
                key={cate.id}
                to={`/manga/category/` + cate.slug}
                className="inline-block px-2 py-0.5 border rounded-lg border-blue-500 text-blue-500"
              >
                #{cate.name}
              </Link>
            ))}
          </p>
          <p className="text-muted-foreground">
            <h5>Tags: </h5>
          </p>
          <h5 className="text-muted-foreground">Thông tin:</h5>
          <ul className="grid grid-cols-2 gap-1 text-muted-foreground">
            <li>Tình trạng: {mangaInfo?.status}</li>
            <li>Tác giả: {mangaInfo?.author.join(", ")}</li>
            <li>
              Cập nhật: {new Date(mangaInfo?.updatedAt || "").toLocaleString()}
            </li>
            <li>Lượt xem: 1000</li>
          </ul>
          <p
            className="whitespace-break-spaces text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: mangaInfo?.content || "" }}
          ></p>
        </div>
      </section>
      <section></section>
    </div>
  );
};

export default MangaDetailPage;
