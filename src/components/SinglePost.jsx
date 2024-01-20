import { useContext, useEffect, useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../context/ContextProvider';
import { Button } from 'flowbite-react';

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({});
  const [updateMode, setUpdateMode] = useState(false);
  const publicFolder = 'http://localhost:3000/images/';
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // console.log('user', user);
  // console.log('post', post);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get('/api/v1/post/' + path);
        setPost(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/v1/post/delete/${post._id}`, {
        data: { username: user.username },
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/v1/post/update/${post._id}`, {
        username: user.username,
        title,
        description,
      });
      setUpdateMode(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=''>
      <div className='card space-y-5 mt-2 h-screen flex-col '>
        <div className='image'>
          <img
            src={publicFolder + post.photo}
            alt='img'
            className='w-full h-64 object-cover'
          />
        </div>
        <div className='above p-4'>
          <div className='space-y-2'>
            {updateMode ? (
              <input
                type='text'
                placeholder='Title'
                className='border-b-2 outline-none w-56'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <h1 className='text-2xl md:text-4xl font-bold'>{title}</h1>
            )}
            <div className='flex items-center space-x-4'>
              <Link
                to={`/individual-posts?user=${post.username}`}
                className='text-blue-500 hover:underline'
              >
                {post.username}
              </Link>
              <span className='text-gray-500'>
                {new Date(post.createdAt).toDateString()}
              </span>
            </div>
            {post.username === user?.username && (
              <div className='flex items-center space-x-4'>
                <AiFillDelete
                  className='text-red-500 cursor-pointer hover:scale-125'
                  onClick={handleDelete}
                />
                <AiFillEdit
                  className='text-blue-500 cursor-pointer hover:scale-125'
                  onClick={() => setUpdateMode(true)}
                />
              </div>
            )}
          </div>
        </div>
        {updateMode ? (
          <textarea
            placeholder='Start typing here...'
            id='article_content'
            cols='80'
            rows='8'
            className='w-full text-sm text-gray-800 bg-white border-2 rounded-lg focus:ring-2 focus:ring-blue-200 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        ) : (
          <div className='p-4'>
            <p className='text-gray-700'>{description}</p>
          </div>
        )}
        <div className='p-4 flex justify-end'>
          {updateMode && (
            <Button
              outline
              gradientDuoTone='purpleToBlue'
              onClick={handleUpdate}
            >
              Update
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
