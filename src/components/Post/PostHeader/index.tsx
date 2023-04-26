// hook
import useMe from "@src/hooks/query/useMe";
import usePostModal from "@src/hooks/recoil/usePostModal";

// component
import Icon from "@src/components/common/Icon";
import Avatar from "@src/components/common/Avatar";

// style
import StyledPostHeader from "./style";

// type
import type { SimpleUser } from "@src/types/api";
interface Props {
  user: SimpleUser;
  postIdx: number;
}

/** 2023/04/09 - 게시글 상단부 ( 작성자, 팔로우버튼, 옵션버튼 ) - by 1-blue */
const PostHeader: React.FC<Props> = ({ user, postIdx }) => {
  const { me } = useMe();

  /** 2023/04/11 - 게시글의 모달관련 훅 - by 1-blue */
  const { openPostModal } = usePostModal();

  return (
    <StyledPostHeader>
      <Avatar src={user.avatar} alt={`${user.nickname}님의 프로필 이미지`} />
      <span>{user.nickname}</span>
      {me && (
        <button type="button" className="follow">
          팔로우
        </button>
      )}
      <button
        type="button"
        className="option"
        onClick={() => openPostModal(me?.idx === user.idx, postIdx)}
      >
        <Icon shape="ellipsis-vertical" />
      </button>
    </StyledPostHeader>
  );
};

export default PostHeader;
