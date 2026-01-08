import MediaSlide, { GroupSlide } from "@/components/custom/MediaSlide";
import { phimDanhsach } from "@/services/ophim";
import { truyenDanhsach } from "@/services/otruyen";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const { data: movie, isLoading: movieLoading } = useQuery({
    queryKey: ["home", "movie"],
    queryFn: async () =>
      await Promise.all([
        await phimDanhsach("phim-chieu-rap"),
        await phimDanhsach("phim-moi"),
        await phimDanhsach("phim-thuyet-minh"),
        await phimDanhsach("hoat-hinh"),
      ]),
  });
  const { data: manga, isLoading: mangaLoading } = useQuery({
    queryKey: ["home", "manga"],
    queryFn: async () =>
      await Promise.all([
        await truyenDanhsach("truyen-moi"),
        await truyenDanhsach("sap-ra-mat"),
        await truyenDanhsach("dang-phat-hanh"),
        await truyenDanhsach("hoan-thanh"),
      ]),
  });

  return (
    <div className="">
      <div className="max-w-7xl w-full mx-auto space-y-14">
        <GroupSlide>
          <MediaSlide
            name="Phim chiếu rạp"
            type="movie"
            items={movie?.[0].data.items}
            loading={movieLoading}
          />
          <MediaSlide
            name="Phim mới cập nhật"
            type="movie"
            items={movie?.[1].data.items}
            loading={movieLoading}
          />
          <MediaSlide
            name="Phim thuyết minh"
            type="movie"
            items={movie?.[2].data.items}
            loading={movieLoading}
          />
          <MediaSlide
            name="Phim hoạt hình"
            type="movie"
            items={movie?.[3].data.items}
            loading={movieLoading}
          />
        </GroupSlide>
        <GroupSlide>
          <MediaSlide
            name="Truyện mới cập nhật"
            type="manga"
            items={manga?.[0].data.items}
            loading={mangaLoading}
          />
          <MediaSlide
            name="Truyện sắp ra mắt"
            type="manga"
            items={manga?.[1].data.items}
            loading={mangaLoading}
          />
          <MediaSlide
            name="Truyện đang phát hành"
            type="manga"
            items={manga?.[2].data.items}
            loading={mangaLoading}
          />
          <MediaSlide
            name="Truyện hoàn thành"
            type="manga"
            items={manga?.[3].data.items}
            loading={mangaLoading}
          />
        </GroupSlide>
      </div>
    </div>
  );
};

export default HomePage;
