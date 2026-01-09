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

  const chapterData = useMemo(() => {
    if (!mangaInfo) return [];
    return mangaInfo?.chapters[0].server_data
      .map((chap) => ({
        ...chap,
        chapter_name: `Chapter ` + chap.chapter_name,
      }))
      .reverse();
  }, [mangaInfo]);

  return (
    <div className="max-w-7xl w-full mx-auto space-y-14 py-8 px-4">
      {/* info */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={truyenImage(mangaInfo?.thumb_url)}
          alt="thumb"
          loading="lazy"
          className="rounded-lg overflow-hidden w-3xs aspect-thumbnail"
        />
        <div className="flex-1 space-y-4">
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
          <div>
            <h5 className="text-muted-foreground">Thông tin:</h5>
            <ul className="grid grid-cols-2 gap-1 text-muted-foreground">
              <li>Tình trạng: {mangaInfo?.status}</li>
              <li>Tác giả: {mangaInfo?.author.join(", ")}</li>
              <li>
                Cập nhật:{" "}
                {new Date(mangaInfo?.updatedAt || "").toLocaleString()}
              </li>
              <li>Lượt xem: 1000</li>
            </ul>
          </div>
          <p
            className="whitespace-break-spaces text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: mangaInfo?.content || "" }}
          ></p>
        </div>
      </section>
      {/* chapter and  */}
      <div className="flex items-stretch gap-8">
        <section className="space-y-4 flex-2/3">
          <h3 className="text-sky-600">DANH SÁCH CHƯƠNG</h3>
          <div className="border-t border-sky-600"></div>
          <ul className="max-h-145 overflow-y-auto custom-scrollbar">
            {chapterData.map((chapter) => (
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
                  <span>{chapter.chapter_name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="space-y-4 flex-1/3">
          <h3 className="text-sky-600">TRUYỆN LIÊN QUAN</h3>
        </section>
      </div>
    </div>
  );
};

export default MangaDetailPage;
