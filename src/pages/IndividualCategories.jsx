import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import PostCard from '../components/PostCard';

const IndividualCategories = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const categoryName = queryParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://mern-blog-server-hq7r.onrender.com/api/v1/post?category=${categoryName.toLowerCase()}`
        );
        setPosts(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [categoryName]);

  return (
    <div className='container mx-auto md:mx-36 py-8'>
      <h2 className='text-3xl font-semibold mb-6'>
        Posts Related To {categoryName || 'Category'}
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {posts.map((post) => (
          <PostCard key={post._id} items={post} />
        ))}
      </div>
    </div>
  );
};

export default IndividualCategories;
