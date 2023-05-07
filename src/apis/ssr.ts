import type {
  ApiFetchHashtagPostsHandler,
  ApiFetchPostsHandler,
  ApiFetchUserHandler,
} from "@src/types/api";

/** 2023/05/07 - 게시글들 가져오기 요청 - by 1-blue */
const fetchPosts: ApiFetchPostsHandler = async ({ take, lastIdx = -1 }) =>
  fetch(process.env.BASE_URL + `/api/posts?take=${take}&lastIdx=${lastIdx}`, {
    cache: "no-store",
  }).then((res) => res.json());

/** 2023/05/07 - 특정 유저 정보 요청 - by 1-blue */
const fetchUser: ApiFetchUserHandler = async ({ nickname }) =>
  fetch(process.env.BASE_URL + `/api/user?nickname=${nickname}`, {
    cache: "force-cache",
  }).then((res) => res.json());

/** 2023/05/07 - 특정 해시태그를 갖는 게시글들 요청 - by 1-blue */
const fetchHashtagPosts: ApiFetchHashtagPostsHandler = async ({
  hashtag,
  take,
  skip,
}) =>
  fetch(
    process.env.BASE_URL +
      `/api/search/post/${hashtag}?take=${take}&skip=${skip}`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json());

/** 2023/05/07 - SSR 요청 - by 1-blue */
export const apiServiceSSR = {
  /** 2023/05/07 - 게시글들 가져오기 요청 - by 1-blue */
  fetchPosts,
  /** 2023/05/07 - 특정 유저 정보 요청 - by 1-blue */
  fetchUser,
  /** 2023/05/07 - 특정 해시태그를 갖는 게시글들 요청 - by 1-blue */
  fetchHashtagPosts,
};
