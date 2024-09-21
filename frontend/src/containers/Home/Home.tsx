import Post from '../Post/Post';
import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';


const Home = () => {

    const Navigation = useNavigate();

    return (
        <div className="container">
            <div className="text-end">
                <Button variant="outlined" onClick={() => Navigation('/new-post')}>Add new post</Button>
            </div>
            <Post/>
        </div>
    );
};

export default Home;