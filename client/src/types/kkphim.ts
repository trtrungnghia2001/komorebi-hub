export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
}

export interface TMDBInfo {
  type: string;
  id: string;
  season?: number;
  vote_average: number;
  vote_count: number;
}

export interface PaginationParams {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

export interface MovieItem {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  type: "hoathinh" | "series" | "single" | "tvshows";
  poster_url: string;
  thumb_url: string;
  sub_docquyen: boolean;
  time: string;
  episode_current: string;
  quality: string;
  lang: string; // "Vietsub", "Vietsub + Thuyết Minh", v.v.
  year: number;
  category: Category[];
  country: Country[];
  modified: {
    time: string;
  };
  tmdb: TMDBInfo;
  imdb: {
    id: string | null;
  };
}

export interface MovieResponse {
  status: boolean;
  msg: string;
  items: MovieItem[];
  params: PaginationParams;
}

export type MovieListType = "phim-moi-cap-nhat" | "phim-chieu-rap";
