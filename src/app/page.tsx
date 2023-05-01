// component
import Post from "@src/components/Post";

// ssr
import { defaultMatadata } from "@src/shared/metadata";
import { ssrInstance } from "@src/apis";
import { combinePhotoURL } from "@src/utils";
import type { ApiFetchPostsResponse } from "@src/types/api";
import type { Metadata } from "next";
interface Props {
  searchParams: { postIdx: string | undefined };
}

/** 2023/04/30 - 메타데이터 - by 1-blue */
export const generateMetadata = async ({
  searchParams: { postIdx },
}: Props): Promise<Metadata> => {
  const { data } = await ssrInstance.get<ApiFetchPostsResponse>(
    process.env.BASE_URL + "/api/posts",
    {
      params: { take: 1, lastIdx: postIdx || -1 },
      headers: { "Cache-Control": "no-cache" },
    }
  );

  return {
    ...defaultMatadata,
    title: "blegram | 메인",
    description: data?.posts?.[0].content || "존재하지 않는 게시글입니다.",

    openGraph: {
      ...defaultMatadata.openGraph,
      title: "blegram | 메인",
      description: data?.posts?.[0].content || "존재하지 않는 게시글입니다.",
      ...(data?.posts?.[0].photos[0] && {
        images: [combinePhotoURL(data.posts[0].photos[0])],
      }),
    },

    twitter: {
      ...defaultMatadata.twitter,
      title: "blegram | 메인",
      description: data?.posts?.[0].content || "존재하지 않는 게시글입니다.",
      ...(data?.posts?.[0].photos[0] && {
        images: [combinePhotoURL(data.posts[0].photos[0])],
      }),
    },
  };
};

/** 2023/03/24 - 홈 페이지 - by 1-blue ( 2023/04/09 ) */
const Home = () => <Post />;

export default Home;
