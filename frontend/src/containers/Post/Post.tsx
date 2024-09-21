import {useEffect} from 'react';
import Spinner from "../../UI/Spinner/Spinner";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getPosts} from "../../features/posts/postsThunk";
import {selectIsLoadingPosts, selectPosts} from "../../features/posts/postsSlice";
import PostCard from "../../components/PostCard/PostCard";

const Post = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const loading = useAppSelector(selectIsLoadingPosts);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <div className="container">
            {loading ? <Spinner/> :
                <>
                    {posts.length === 0 ? <p>No posts yet</p> :
                        <div className="row justify-content-center">
                            <div className="col-12 text-center">
                                {posts.map(post => (
                                    <div key={post._id} className="post-container mb-2">
                                        <PostCard post={post}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </>
            }
        </div>
    );
};

export default Post;