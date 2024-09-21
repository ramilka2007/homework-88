import React, {useState} from 'react';
import {PostForAdd} from '../../types';
import {Alert} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {addPost, getPosts} from "../../features/posts/postsThunk";
import FileInput from "../../UI/FileInput/FileInput";
import {useAppDispatch} from "../../app/hooks";

const AddNewPost = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [newPost, setNewPost] = useState<PostForAdd>({
        title: '',
        description: '',
        image: null,
        user: null
    });

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('title', newPost.title);
        formData.append('text', newPost.description);

        if(newPost.image) {
            formData.append('image', newPost.image);
        }

        if (newPost.description.trim().length !== 0 && newPost.title.trim().length !== 0) {
            try {
                await dispatch(addPost(formData));
                await dispatch(getPosts());
                navigate('/');
            } catch (e) {
                console.error(e);
            }
        }
    };

    const changeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewPost((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setNewPost(prevState => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    return (
        <div className="container">
            <form onSubmit={onFormSubmit} className="w-50 mx-auto">
                <h2 className="text-center my-4">Add new post</h2>
                {error ? <Alert severity="error">Title and description must be field</Alert> : null}

                <div className="mb-3 w-75 mx-auto">
                    <label htmlFor="name" className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        className="form-control"
                        value={newPost.title}
                        onChange={changeForm}
                    />
                </div>

                <div className="mb-3 w-75 mx-auto">
                    <label htmlFor="name" className="form-label">Text</label>
                    <textarea
                        name="description"
                        id="description"
                        required
                        className="form-control"
                        value={newPost.description}
                        onChange={changeForm}
                    ></textarea>
                </div>

                <div className="mb-3 w-75 mx-auto">
                    <FileInput
                        onChange={fileInputChangeHandler}
                        name="image"
                        label="Image"
                    />
                </div>

                <button disabled={newPost.title.trim().length === 0 && newPost.description.trim().length ===0} type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    );
};

export default AddNewPost;