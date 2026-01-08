import { truyenBySlug, truyenImage } from "@/services/otruyen";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import book from "@/assets/icon/book.svg";

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
    <div className="max-w-7xl w-full mx-auto space-y-14 px-4">
      <section className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={truyenImage(mangaInfo?.thumb_url)}
          alt="thumb"
          loading="lazy"
          className="rounded-lg overflow-hidden w-3xs aspect-thumbnail"
        />
        <div className="flex-1 space-y-2">
          <h3>{mangaInfo?.name}</h3>
          <div className="text-muted-foreground flex flex-wrap gap-2">
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
          </div>
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
      <section className="space-y-4">
        <h3>Danh sách chương</h3>
        <div className="border-t border-border"></div>
        <ul className="max-h-[580px] overflow-y-auto">
          {mangaInfo?.chapters[0].server_data.map((chapter) => (
            <li
              key={chapter.chapter_name}
              className="border-b border-b-gray-500 last:border-none hover:bg-gray-800"
            >
              <Link
                to={
                  `/manga/${slug}/chapter/` +
                  chapter.chapter_api_data.split("/").pop()
                }
                className="flex items-center gap-2 py-2"
              >
                <img src={book} alt="icon" loading="lazy" className="w-4" />
                <span>Chapter {chapter.chapter_name}</span>
                <span>{chapter.chapter_title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default MangaDetailPage;
