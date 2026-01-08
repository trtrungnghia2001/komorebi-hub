import type { MovieListType, MovieResponse } from "@/types";
import axios from "axios";

const axiosPhim = axios.create({
  baseURL: `https://phimapi.com`,
});

export async function phimDanhsach(type: MovieListType) {
  return (await axiosPhim.get<MovieResponse>(`/danh-sach/` + type)).data;
}

export function phimImg(url: string) {
  return ` https://phimapi.com/image.php?url=` + url;
}
