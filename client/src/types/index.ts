export * from "./ophim";
export * from "./otruyen";

export type MediaType = "movie" | "manga" | "databook" | "anime";

export type PaginationType = {
  totalItems: number;
  limit: number;
  currentPage: number;
  totalPages: number;
};
