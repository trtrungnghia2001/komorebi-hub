import MediaSlide from "@/components/custom/MediaSlide";
import { phimDanhsach } from "@/services/kkphim";
import { truyenDanhsach } from "@/services/otruyen";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const { data: movie } = useQuery({
    queryKey: ["home", "movie"],
    queryFn: async () =>
      await Promise.all([
        await phimDanhsach("phim-moi-cap-nhat"),
        await phimDanhsach("phim-chieu-rap"),
      ]),
  });
  const { data: manga } = useQuery({
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
      <div className="max-w-7xl mx-auto space-y-14">
        <GroupSlide>
          <MediaSlide
            name="Phim chiếu rạp"
            type="movie"
            items={movie?.[1].items}
          />
          <MediaSlide
            name="Phim mới cập nhật"
            type="movie"
            items={movie?.[0].items}
          />
        </GroupSlide>
        <GroupSlide>
          <MediaSlide
            name="Truyện mới cập nhật"
            type="manga"
            items={manga?.[0].data.items}
          />
          <MediaSlide
            name="Truyện sắp ra mắt"
            type="manga"
            items={manga?.[1].data.items}
          />
          <MediaSlide
            name="Truyện đang phát hành"
            type="manga"
            items={manga?.[2].data.items}
          />
          <MediaSlide
            name="Truyện hoàn thành"
            type="manga"
            items={manga?.[3].data.items}
          />
        </GroupSlide>
      </div>
    </div>
  );
};

export default HomePage;

const GroupSlide = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="space-y-10 p-4 md:p-8 bg-linear-0 from-background to-[#282b3a] rounded-lg">
      {children}
    </div>
  );
};
