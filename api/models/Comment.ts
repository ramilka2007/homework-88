import mongoose, {Schema, Types} from 'mongoose';
import Post from './Post';
import User from './User';

const CommentsSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'User does not exist!',
        },
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const post = await Post.findById(value);
                return Boolean(post);
            },
            message: 'Post does not exist!',
        },
    },
    text: {
        type: String,
        required: true,
    },
});

const Comments = mongoose.model('Comments', CommentsSchema);

export default Comments;