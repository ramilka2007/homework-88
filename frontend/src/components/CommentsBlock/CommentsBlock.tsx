import CommentCard from '../CommentCard/CommentCard';
import Spinner from "../../UI/Spinner/Spinner";
import {useAppSelector} from "../../app/hooks";
import {selectAddLoadingComments, selectComments, selectIsLoadingComments} from "../../features/comments/commentsSlice";

const CommentsBlock = () => {
    const comments = useAppSelector(selectComments);
    const commentsLoading = useAppSelector(selectIsLoadingComments);
    const addCommentsLoading = useAppSelector(selectAddLoadingComments);

    return (
        <>
            {commentsLoading || addCommentsLoading  ? <Spinner/> :
                <>
                    {comments.length > 0  ?
                        <>
                            <h4>Comments:</h4>
                            {comments.map(comment => (
                                <CommentCard key={comment._id} comment={comment}/>
                            ))}
                        </>
                        : <h4>No comments yet</h4>
                    }
                </>

            }
        </>
    );
};

export default CommentsBlock;