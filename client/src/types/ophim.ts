export interface MovieCategory {
  id: string;
  name: string;
  slug: string;
}

export interface MovieCountry {
  id: string;
  name: string;
  slug: string;
}

export interface MovieLastEpisode {
  server_name: string;
  is_ai: boolean;
  name: string;
}

export interface MovieItem {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  alternative_names: string[];
  type: "series" | "single" | "hoathinh" | "tvshows";
  thumb_url: string;
  poster_url: string;
  sub_docquyen: boolean;
  chieurap: boolean;
  time: string;
  episode_current: string;
  quality: string;
  lang: string;
  year: number;
  category: MovieCategory[];
  country: MovieCountry[];
  tmdb: {
    type: "tv" | "movie";
    id: string;
    season: number | null;
    vote_average: number;
    vote_count: number;
  };
  imdb: {
    id: string;
    vote_average: number;
    vote_count: number;
  };
  modified: {
    time: string;
  };
  last_episodes: MovieLastEpisode[];
}

export interface OPhimPagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  pageRanges: number;
}

export interface MovieResponse {
  status: "success" | string;
  message?: string;
  data: {
    items: MovieItem[];
    params: {
      pagination: OPhimPagination;
    };
    titlePage: string;
    breadCrumb: {
      name: string;
      slug?: string;
      isCurrent: boolean;
      position: number;
    }[];
  };
}

export type MovieListType =
  | "phim-moi"
  | "phim-bo"
  | "phim-le"
  | "tv-shows"
  | "hoat-hinh"
  | "phim-vietsub"
  | "phim-thuyet-minh"
  | "phim-long-tieng"
  | "phim-bo-dang-chieu"
  | "phim-bo-hoan-thanh"
  | "phim-sap-chieu"
  | "subteam"
  | "phim-chieu-rap";
