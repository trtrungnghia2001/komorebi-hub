import { memo, useState } from "react";
import { MdSend } from "react-icons/md";

const CommentForm = () => {
  const [text, setText] = useState("");
  return (
    <div className="space-y-2">
      <h6>Bình luận (864)</h6>
      <p className="text-muted-foreground">
        Vui lòng đăng nhập để tham gia bình luận.
      </p>

      <form className="relative rounded-lg p-2 bg-input">
        <span className="text-muted-foreground text-10 absolute top-2 right-6 inline-block">
          {text.length}/1000
        </span>
        <textarea
          name="text"
          id="text"
          value={text}
          onChange={(e) => {
            if (e.target.value.length > 1000) return;
            setText(e.target.value);
          }}
          className="w-full rounded-lg p-4 px-3 bg-background transition-all outline-none custom-scrollbar"
          placeholder="Viết bình luận"
          rows={5}
        ></textarea>
        <div className="flex items-center justify-between py-2">
          <div className="text-xs text-muted-foreground">Hãy đóng góp</div>
          <button className="flex items-center gap-2 text-yellow-500 hover:text-yellow-600 transition-all">
            Gửi
            <MdSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(CommentForm);
