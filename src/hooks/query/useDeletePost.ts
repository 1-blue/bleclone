import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

// api
import { apiServicePost } from "@src/apis";

// key
import { queryKeys } from ".";

// type
import type { UseMutateFunction } from "react-query";
import type {
  ApiDeletePostRequest,
  ApiDeletePostResponse,
} from "@src/types/api";

/** 2023/04/11 - 게시글 제거 훅 ( 서버 ) - by 1-blue */
const useDeletePost = (): UseMutateFunction<
  ApiDeletePostResponse,
  unknown,
  ApiDeletePostRequest,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServicePost.apiDeletePost, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(queryKeys.post);

      toast.success(data.message);
    },
  });

  return mutate;
};

export default useDeletePost;
