import React from 'react';
import {NavLink} from 'react-router-dom';
import {Posts} from '../../types';
import dayjs from 'dayjs';
import {CardMedia, styled} from '@mui/material';
import {API_URL} from "../../costants";
import OnlyText from '../../assets/text-img.jpeg'

const ImageCardMedia = styled(CardMedia)({
    width: '150px',
    height: "100px",
    borderRadius: "50%",
});

interface Props {
    post: Posts;
}

const PostCard: React.FC<Props> = ({post}) => {
    return (
        <NavLink to={`/posts/${post._id}`} className="w-100 text-decoration-none text-black">
            <div className="col border border-2 border-black pt-2">
                <div className="post-card text-start p-2">
                    <div className="d-flex">
                        <div>
                            <ImageCardMedia
                                image={post.image ? API_URL + '/' + post.image : OnlyText} title={post._id}/>
                        </div>
                        <div className="w-50">
                            <p className="text-start">{dayjs(post.datetime).format('ddd, MMM D, YYYY h:mm A')} by {post.user.username}</p>
                            <h4 className="mb-3 text-decoration-underline">{post.title}</h4>
                            <p className="mb-1">{post.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default PostCard;