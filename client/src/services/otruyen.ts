import type { MangaListType, MangaResponse } from "@/types";
import axios from "axios";

const axiosTruyen = axios.create({
  baseURL: `https://otruyenapi.com/v1/api`,
});
export function truyenImage(thumb_url?: string, width: number = 250) {
  if (!thumb_url) return "/placeholder.jpg";

  const thumb = `https://img.otruyenapi.com/uploads/comics/` + thumb_url;

  return `https://images.weserv.nl/?url=${encodeURIComponent(
    thumb
  )}&w=${width}&q=75&output=webp`;
}

//
export async function truyenDanhsach(type: MangaListType) {
  return (await axiosTruyen.get<MangaResponse>(`/danh-sach/` + type)).data;
}
export async function truyenBySlug(slug: string) {
  return (await axiosTruyen.get<MangaResponse>(`/truyen-tranh/` + slug)).data;
}
