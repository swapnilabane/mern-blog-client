import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import PostCard from '../components/PostCard';

const IndividualPosts = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const username = queryParams.get('user');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://mern-blog-server-hq7r.onrender.com/api/v1/post?user=${username}`
        );
        setPosts(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className='container mx-auto md:mx-36 py-8'>
      <h2 className='text-3xl font-semibold mb-6 text-center'>
        Posts by {username || 'User'}
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto'>
        {posts.map((post) => (
          <div key={post._id} className='mx-auto'>
            <PostCard items={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndividualPosts;
