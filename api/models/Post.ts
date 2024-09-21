import mongoose, {Schema, Types} from 'mongoose';
import User from './User';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
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
    description: {
        type: String,
    },
    image: String,

    datetime: {
        type: Date,
        default: () => new Date(),
    },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;