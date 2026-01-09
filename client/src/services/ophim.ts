import type { MovieListType, MovieResponse } from "@/types";
import axios from "axios";

const axiosPhim = axios.create({
  baseURL: `https://ophim1.com/v1/api`,
});
export async function phimHome() {
  return (await axiosPhim.get<MovieResponse>(`/home?limit=10`)).data;

  // const bgUrls = await Promise.all(
  //   getHome.data.items.map(async (phim) => {
  //     return (await axiosPhim.get<MovieResponse>(`/phim/` + phim.slug)).data
  //       .data.item;
  //   })
  // );

  // console.log({ bgUrls });

  // return getHome;
}
export async function phimDanhsach(type: MovieListType) {
  return (await axiosPhim.get<MovieResponse>(`/danh-sach/` + type)).data;
}
export async function phimBySlug(slug: string) {
  return (await axiosPhim.get<MovieResponse>(`/phim/` + slug)).data;
}
export function phimImage({
  width = 250,
  thumb_url,
  banner,
}: {
  thumb_url?: string;
  width?: number;
  banner?: boolean;
}) {
  if (!thumb_url) return "/placeholder.jpg";

  const thumb = `https://img.ophim.live/uploads/movies/` + thumb_url;
  if (banner) {
    return thumb;
  }

  return `https://images.weserv.nl/?url=${encodeURIComponent(
    thumb
  )}&w=${width}&q=75&output=webp`;
}
