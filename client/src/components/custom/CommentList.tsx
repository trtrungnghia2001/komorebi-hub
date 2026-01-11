import { IMAGE_DEFAULT } from "@/constants";
import { memo } from "react";
const comments = [
  {
    id: "c1",
    user: {
      id: "u1",
      name: "Trần Nam",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nam",
      is_admin: false,
    },
    text: "Phim hay quá mọi người ơi! Đoạn cuối main bá đạo thực sự, hóng phần tiếp theo quá.",
    created_at: "2024-03-20T10:30:00Z",
    likes: 15,
    dislikes: 2,
    replies: [
      {
        id: "r1",
        user: {
          id: "u2",
          name: "Cimanga Admin",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
          is_admin: true,
        },
        text: "Cảm ơn bạn đã ủng hộ web, phần 2 dự kiến sẽ có vào tháng sau nhé!",
        created_at: "2024-03-20T11:00:00Z",
        likes: 5,
        dislikes: 0,
      },
    ],
  },
  {
    id: "c2",
    user: {
      id: "u3",
      name: "Hoàng Yến",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yen",
      is_admin: false,
    },
    text: "Có ai thấy art đoạn đầu hơi lạ không? Nhưng càng về sau càng đẹp.",
    created_at: "2024-03-19T15:20:00Z",
    likes: 8,
    dislikes: 1,
    replies: [],
  },
  {
    id: "c3",
    user: {
      id: "u4",
      name: "Mạnh Tuấn",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tuan",
      is_admin: false,
    },
    text: "Mấy ông cho hỏi xem tập 5 ở đâu thế? Sao tui thấy mới có tập 4 à?",
    created_at: "2024-03-18T09:15:00Z",
    likes: 2,
    dislikes: 0,
    replies: [
      {
        id: "r2",
        user: {
          id: "u5",
          name: "Linh Cute",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linh",
          is_admin: false,
        },
        text: "Tối nay mới có bạn ơi, đợi tầm 10h quay lại là có nha.",
        created_at: "2024-03-18T10:00:00Z",
        likes: 3,
        dislikes: 0,
      },
    ],
  },
  {
    id: "c4",
    user: {
      id: "u6",
      name: "Quốc Anh",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anh",
      is_admin: false,
    },
    text: "Siêu phẩm của năm là đây chứ đâu! Đã cày xong 10 tập trong 1 đêm.",
    created_at: "2024-03-17T22:45:00Z",
    likes: 42,
    dislikes: 0,
    replies: [],
  },
  {
    id: "c5",
    user: {
      id: "u7",
      name: "Thanh Hằng",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hang",
      is_admin: false,
    },
    text: "Cốt truyện hơi chậm, nhưng bù lại nhạc phim quá đỉnh luôn.",
    created_at: "2024-03-17T14:30:00Z",
    likes: 12,
    dislikes: 4,
    replies: [],
  },
  {
    id: "c6",
    user: {
      id: "u8",
      name: "Sơn Tùng",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tung",
      is_admin: false,
    },
    text: "Mới vào xem đã thấy hay rồi, hy vọng không bị đầu voi đuôi chuột.",
    created_at: "2024-03-16T20:10:00Z",
    likes: 7,
    dislikes: 1,
    replies: [],
  },
  {
    id: "c7",
    user: {
      id: "u9",
      name: "Diệu Nhi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nhi",
      is_admin: false,
    },
    text: "Web load nhanh, ảnh nét, 10 điểm cho CimangaHub nhé!",
    created_at: "2024-03-16T11:20:00Z",
    likes: 25,
    dislikes: 0,
    replies: [
      {
        id: "r3",
        user: {
          id: "u2",
          name: "Cimanga Admin",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
          is_admin: true,
        },
        text: "Cảm ơn Nhi nhiều, web sẽ cố gắng duy trì server ổn định nhất.",
        created_at: "2024-03-16T12:00:00Z",
        likes: 10,
        dislikes: 0,
      },
    ],
  },
  {
    id: "c8",
    user: {
      id: "u10",
      name: "Khánh Vy",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vy",
      is_admin: false,
    },
    text: "Truyện này bản Raw ra đến chương bao nhiêu rồi các bác ơi?",
    created_at: "2024-03-15T18:05:00Z",
    likes: 4,
    dislikes: 0,
    replies: [],
  },
  {
    id: "c9",
    user: {
      id: "u11",
      name: "Hữu Thắng",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thang",
      is_admin: false,
    },
    text: "Phim này xem giải trí tốt, không cần não nhiều. Rate 7/10.",
    created_at: "2024-03-15T13:40:00Z",
    likes: 6,
    dislikes: 2,
    replies: [],
  },
  {
    id: "c10",
    user: {
      id: "u12",
      name: "Minh Béo",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Minh",
      is_admin: false,
    },
    text: "Cày lần thứ 3 rồi vẫn thấy cuốn, mỗi lần xem lại thấy chi tiết mới.",
    created_at: "2024-03-14T21:55:00Z",
    likes: 31,
    dislikes: 0,
    replies: [],
  },
];
const CommentList = () => {
  return (
    <ul className="space-y-6">
      <li className="text-muted-foreground">Chưa có bình luận nào</li>
      {comments.map((comment) => (
        <li key={comment.id} className="flex items-start gap-2">
          <img
            src={comment.user.avatar || IMAGE_DEFAULT.AVATAR}
            alt="avatar"
            loading="lazy"
            className="w-10 aspect-square border border-border rounded-full overflow-hidden object-center object-cover"
          />
          <div className="space-y-1">
            <p className="space-x-4">
              <span>{comment.user.name}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(comment.created_at).toDateString()}
              </span>
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: comment.text || "" }}
              className="whitespace-break-spaces text-muted-foreground"
            ></div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default memo(CommentList);
