export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ChapterLatest {
  filename: string;
  chapter_name: string;
  chapter_title: string;
  chapter_api_data: string;
}

export interface MangaItem {
  _id: string;
  name: string;
  slug: string;
  origin_name: string[];
  status: "ongoing" | "coming_soon" | "completed";
  thumb_url: string;
  sub_docquyen: boolean;
  category: Category[];
  updatedAt: string;
  chaptersLatest: ChapterLatest[];
}

// Cấu trúc phân trang riêng của otruyen
export interface OtruyenPagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  pageRanges: number;
}

export interface MangaResponse {
  status: string;
  message: string;
  data: {
    items: MangaItem[];
    APP_DOMAIN_CDN_IMAGE: string; // Quan trọng để nối link ảnh
    params: {
      pagination: OtruyenPagination;
    };
  };
}

export type MangaListType =
  | "truyen-moi"
  | "sap-ra-mat"
  | "dang-phat-hanh"
  | "hoan-thanh";
