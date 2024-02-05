// "use server";
import GetReplyLikes from "./GetReplyLikes";
export default function GetReplies(item, comment_id) {
    // console.log(item, comment_id);
    // return <h2>hi</h2>;
    return <GetReplyLikes item={item} comment_id={comment_id} />;
}
