import Wrapper from "@/components/layout/Wrapper";
import {
  getTMDBImage,
  phimBySlug,
  phimBySlugImages,
  phimBySlugPeoples,
  phimImage,
} from "@/services/ophim";
import type { MoviePeopleItem, ServerEpisode } from "@/types";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useMemo, useState } from "react";
import {
  Link,
  useParams,
  useSearchParams,
  type SetURLSearchParams,
} from "react-router-dom";
import _ from "lodash";
import { IMAGE_DEFAULT } from "@/constants";

const MovieDetailPage = () => {
  const { slug } = useParams();
  const { data: info } = useQuery({
    queryKey: ["movie", "detail", slug],
    queryFn: async () => await phimBySlug(slug as string),
    enabled: !!slug,
  });
  const movieInfo = useMemo(() => {
    return info?.data.item;
  }, [info]);

  // tab
  const [tabIndex, setTabIndex] = useState(0);
  const tabs = [`Tập phim`, `Gallery`, `Thành viên`, `Đề xuất`];

  const [searchParams, handleSearchParams] = useSearchParams({
    server: `0`,
    episode: `0`,
  });
  const server = useMemo(
    () => searchParams.get("server") || "0",
    [searchParams]
  );
  const episode = useMemo(
    () => searchParams.get("episode") || "0",
    [searchParams]
  );
  const currentSrcPlay = useMemo(() => {
    const url =
      movieInfo?.episodes?.[Number(server)]?.server_data?.[Number(episode)];

    return url?.link_embed || url?.link_m3u8 || null;
  }, [movieInfo, server, episode]);

  //
  const [showInfo, setShowInfo] = useState(false);

  return (
    <Wrapper className="py-8 px-4 space-y-10">
      {/* video */}
      {currentSrcPlay && (
        <section>
          <iframe
            src={currentSrcPlay}
            title={movieInfo?.name}
            className="aspect-video w-full"
            loading="lazy"
            allowFullScreen
            frameBorder="0"
            allow="autoplay=0; encrypted-media"
          ></iframe>
        </section>
      )}
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
        {/* left */}
        <section className="w-full flex-1/3 flex flex-col items-center lg:items-start gap-4">
          {/*  */}
          <img
            src={phimImage({ thumb_url: movieInfo?.thumb_url })}
            alt="thumb"
            loading="lazy"
            className="aspect-thumbnail rounded-lg w-40"
          />
          <h5 className="text-center lg:text-left">{movieInfo?.name}</h5>
          <p className="text-muted-foreground text-13 text-center lg:text-left">
            {movieInfo?.origin_name}
          </p>
          {/* info */}
          <button
            className="text-yellow-500 lg:hidden"
            onClick={() => setShowInfo(!showInfo)}
          >
            Thông tin phim
          </button>
          <div
            className={clsx([
              `space-y-4`,
              showInfo ? `block` : `hidden`,
              `lg:block`,
            ])}
          >
            <div className="text-xs space-x-2">
              {movieInfo?.country.map((c) => (
                <span
                  key={c.id}
                  className="inline-block rounded border border-white px-1.5 py-1"
                >
                  {c.name}
                </span>
              ))}

              <span className="inline-block rounded border border-white px-1.5 py-1">
                {movieInfo?.lang}
              </span>
            </div>
            <div className="text-xs space-x-2">
              <span className="inline-block rounded border text-yellow-500 border-yellow-500 px-1.5 py-1">
                IMDB {movieInfo?.imdb.vote_average}
              </span>
              <span className="inline-block rounded border border-white px-1.5 py-1">
                {movieInfo?.year}
              </span>
              <span className="inline-block rounded border border-white px-1.5 py-1">
                {movieInfo?.type}
              </span>
              <span className="inline-block rounded border border-white px-1.5 py-1">
                {movieInfo?.episode_current}
              </span>
            </div>
            {/* cate */}
            <div className="text-xs space-x-2">
              {movieInfo?.category.map((cate) => (
                <Link
                  key={cate.id}
                  to={`/movie/`}
                  className="bg-white/20 py-1 px-1.5 text-xs rounded hover:text-yellow-500"
                >
                  {cate.name}
                </Link>
              ))}
            </div>
            {/*  */}
            <div className="space-y-2">
              <p>
                <span className="font-bold">Giới thiệu: </span>
              </p>
              <div
                className="text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: movieInfo?.content || "" }}
              ></div>
              <p className="space-x-2">
                <span className="font-bold">Thời lượng:</span>
                <span className="text-muted-foreground">{movieInfo?.time}</span>
              </p>
              <p className="space-x-2">
                <span className="font-bold">Quốc gia:</span>
                {movieInfo?.country.map((item) => (
                  <Link
                    to={`/movie`}
                    key={item.id}
                    className="text-muted-foreground hover:text-yellow-500"
                  >
                    {item.name}
                  </Link>
                ))}
              </p>
            </div>
          </div>
        </section>
        {/* right */}
        <section className="w-full flex-2/3 space-y-8">
          {/* tabs */}
          <ul
            className={clsx([
              `flex items-center gap-8 border-b border-b-border`,
            ])}
          >
            {tabs.map((tab, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setTabIndex(idx)}
                  className={clsx(
                    `py-4 relative transition-all`,
                    tabIndex === idx &&
                      `text-yellow-500 after:transition-all after:ease-in-out after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-yellow-500 after:z-10`
                  )}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
          {/* tab detail */}
          {tabIndex === 0 && (
            <Episode
              serverEpisodes={movieInfo?.episodes || []}
              searchParams={searchParams}
              handleSearchParams={handleSearchParams}
              server={Number(server)}
              episode={Number(episode)}
            />
          )}
          {tabIndex === 1 && (
            <Gallery
              slug={slug as string}
              trailer_url={movieInfo?.trailer_url || ""}
            />
          )}
          {tabIndex === 2 && <People slug={slug as string} />}
          {/* comment */}
        </section>
      </div>
    </Wrapper>
  );
};

export default MovieDetailPage;

const Episode = ({
  serverEpisodes,
  searchParams,
  handleSearchParams,
  episode,
  server,
}: {
  serverEpisodes: ServerEpisode[];
  searchParams: URLSearchParams;
  handleSearchParams: SetURLSearchParams;
  episode: number;
  server: number;
}) => {
  return (
    <div className="space-y-8">
      {serverEpisodes.map((serverEpisode, serverIdx) => (
        <article key={serverEpisode.server_name}>
          <h6 className="mb-4">{serverEpisode.server_name}</h6>
          <ul className="flex flex-wrap gap-2">
            {serverEpisode.server_data.map((ep, epIdx) => (
              <li key={ep.name}>
                <button
                  className={clsx([
                    `py-1 px-3 rounded`,
                    serverIdx === server && epIdx === episode
                      ? `bg-blue-500`
                      : `bg-input`,
                  ])}
                  onClick={() => {
                    const newSearch = new URLSearchParams(searchParams);
                    newSearch.set("server", serverIdx.toString());
                    newSearch.set("episode", epIdx.toString());
                    handleSearchParams(newSearch);
                  }}
                >
                  Tập {ep.name}
                </button>
              </li>
            ))}
          </ul>
        </article>
      ))}
      <ul></ul>
    </div>
  );
};

const Gallery = ({
  slug,
  trailer_url,
}: {
  slug: string;
  trailer_url: string;
}) => {
  const { data } = useQuery({
    queryKey: ["movie", "detail", slug, "images"],
    queryFn: async () => await phimBySlugImages(slug),
    enabled: !!slug,
  });
  return (
    <div className="space-y-8">
      <article>
        <h6 className="mb-4">Trailer</h6>
        <iframe
          src={`https://www.youtube.com/embed/` + trailer_url?.split("=")?.[1]}
          title={`Trailer`}
          className="aspect-video w-full sm:w-1/2"
          loading="lazy"
          allowFullScreen
          frameBorder="0"
          allow="autoplay=0; encrypted-media"
        ></iframe>
      </article>
      <article>
        <h6 className="mb-4">Ảnh</h6>
        <ul className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {data?.data.images.map((img) => (
            <li key={img.file_path}>
              <img
                src={getTMDBImage({ path: img.file_path })}
                alt={img.file_path}
                className="object-cover w-full h-50"
              />
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
};

const People = ({ slug }: { slug: string }) => {
  const { data } = useQuery({
    queryKey: ["movie", "detail", slug, "peoples"],
    queryFn: async () => await phimBySlugPeoples(slug),
    enabled: !!slug,
  });

  const peopleGroup = useMemo(() => {
    return _.groupBy(
      (data?.data?.peoples as MoviePeopleItem[]) || [],
      "known_for_department"
    );
  }, [data]);

  return (
    <div className="space-y-8">
      {Object.keys(peopleGroup).length > 0 &&
        Object.entries(peopleGroup).map(([key, value]) => (
          <article key={key} className="space-y-4">
            <h6>{key}</h6>
            <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {value?.map((item) => (
                <li key={item.tmdb_people_id}>
                  <Link to={`/`} className="block relative">
                    <img
                      src={
                        item.profile_path
                          ? getTMDBImage({ path: item.profile_path })
                          : IMAGE_DEFAULT.AVATAR
                      }
                      alt="avatar"
                      loading="lazy"
                      className="aspect-thumbnail object-cover object-center rounded-lg"
                    />
                    <div className="absolute p-2 bottom-0 left-0 right-0 text-center bg-linear-180 from-transparent to-black">
                      <p>{item.name}</p>
                      <p className="text-xs text-yellow-500">
                        {item.character}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
    </div>
  );
};
