import type { MovieListType, MovieResponse } from "@/types";
import axios from "axios";

const axiosPhim = axios.create({
  baseURL: `https://ophim1.com/v1/api`,
});

export async function phimDanhsach(type: MovieListType) {
  return (await axiosPhim.get<MovieResponse>(`/danh-sach/` + type)).data;
}
export async function phimBySlug(slug: string) {
  return (await axiosPhim.get<MovieResponse>(`/phim/` + slug)).data;
}
export function phimImage(thumb_url?: string, width: number = 250) {
  if (!thumb_url) return "/placeholder.jpg";

  const thumb = `https://img.ophim.live/uploads/movies/` + thumb_url;

  return `https://images.weserv.nl/?url=${encodeURIComponent(
    thumb
  )}&w=${width}&q=75&output=webp`;
}
