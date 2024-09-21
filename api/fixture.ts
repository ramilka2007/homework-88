import mongoose from 'mongoose';
import config from './config';
import User from "./models/User";
import Post from "./models/Post";
import Comments from "./models/Comment";

const run = async () => {
    await mongoose.connect(config.database);
    const db = mongoose.connection;

    try {
        await db.dropCollection('comments');
        await db.dropCollection('users');
        await db.dropCollection('posts');
    } catch (e) {
        console.log('Skipping drop...');
    }

    const [user1, user2] = await User.create({
            username: 'user1',
            password: '123',
            token: '1'
        },
        {
            username: 'user2',
            password: '123',
            token: '2'
        });

    const [post1, post2] = await Post.create({
            title: "Post1",
            image: 'fixtures/test-image.jpg',
            user: user1._id,
            description: "description",
            datetime: new Date().toISOString(),
        },
        {
            title: "Post2",
            image: 'fixtures/test-image.jpg',
            user: user2._id,
            description: "description",
            datetime: new Date().toISOString(),
        }
    );

    await Comments.create(
        {
            user: user1._id,
            post: post1._id,
            text: "text1",
        }, {
            user: user1._id,
            post: post2._id,
            text: "text2",
        },
        {
            user: user2._id,
            post: post1._id,
            text: "text3",
        }, {
            user: user2._id,
            post: post2._id,
            text: "text4",
        },
    );

    await db.close();
};

run().catch(console.error);