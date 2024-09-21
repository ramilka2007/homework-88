import React from 'react';
import {Comments} from '../../types';

interface Props {
    comment: Comments;
}
const CommentCard: React.FC<Props> = ({comment}) => {
    return (
        <div  className="text-start border rounded-4 p-3 mb-2">
            <h6>{comment.user.username}</h6>
            <hr/>
            <p>{comment.text}</p>
        </div>
    );
};

export default CommentCard;