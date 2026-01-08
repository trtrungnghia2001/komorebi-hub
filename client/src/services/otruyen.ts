import type { MangaListType, MangaResponse } from "@/types/otruyen";
import axios from "axios";

const axiosTruyen = axios.create({
  baseURL: `https://otruyenapi.com/v1/api`,
});

export async function truyenDanhsach(type: MangaListType) {
  return (await axiosTruyen.get<MangaResponse>(`/danh-sach/` + type)).data;
}

export function truyenImg(thumb_url: string) {
  return `https://img.otruyenapi.com/uploads/comics/` + thumb_url;
}
