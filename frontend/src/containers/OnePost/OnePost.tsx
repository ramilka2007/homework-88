import {Button} from '@mui/material';
import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectIsLoadingPosts, selectPost} from "../../features/posts/postsSlice";
import {getPostsById} from "../../features/posts/postsThunk";
import Spinner from "../../UI/Spinner/Spinner";
import dayjs from "dayjs";
import {API_URL} from "../../costants";
import AddCommentForm from "../../components/AddCommentForm/AddCommentForm";
import CommentsBlock from "../../components/CommentsBlock/CommentsBlock";
import {getComments} from "../../features/comments/commentsThunk";

const OnePost = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    const params = useParams();
    const post = useAppSelector(selectPost);
    const postLoading = useAppSelector(selectIsLoadingPosts);

    useEffect(() => {
        if (params.id) {
            dispatch(getPostsById(params.id));
            dispatch(getComments(params.id));
        }

    }, [dispatch, params.id]);

    return (
        <div className="container">
            <Button onClick={() => navigation('/')}>Go back</Button>
            {postLoading ? <Spinner/> : <>{post !== null ?
                <div className="text-start p-2 border p-3 w-50 mx-auto">
                    <p className="text-center">{dayjs(post.datetime).format('ddd, MMM D, YYYY h:mm A')}</p>
                    <div className="d-flex justify-content-between">
                        <div>
                            {post.image ? <img width="200" src={API_URL + "/" + post.image} alt={post._id}/> : null}
                        </div>
                        <div className={post.image ? 'w-50' : 'w-100 text-center'}>
                            <h4 className="mb-3">{post.title}</h4>
                            <p>Author: {post.user.username}</p>
                            <p className="mb-1">{post.description}</p>
                        </div>
                    </div>
                </div>
                : <h2>Not found</h2>
            }</>}
            <hr/>
            <AddCommentForm post_id={params.id}/>
            <hr/>

            <CommentsBlock/>
        </div>
    );
};

export default OnePost;