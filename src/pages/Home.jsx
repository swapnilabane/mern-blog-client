import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Posts from '../components/Posts';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [post, setPost] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'https://mern-blog-server-hq7r.onrender.com/api/v1/post' + search
        );
        setPost(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [search]);

  return (
    <div className='relative md:mx-36'>
      <div className='relative'>
        <img src='laptop1.jpg' alt='laptop' className='w-full h-[38rem]' />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full'>
          <div className='flex flex-col items-center'>
            <h1 className='text-4xl md:text-6xl font-bold mb-4'>
              Discover, Learn, and Share <br />
              Amazing Stories
            </h1>
            <h3 className='text-lg md:text-xl'>
              Dive into a collection of thought-provoking articles, compelling
              stories, and expert perspectives. <br />
              Unleash your curiosity and discover a wealth of knowledge waiting
              to be explored.
            </h3>
          </div>
        </div>
      </div>
      <div className='flex w-full mt-8'>
        <div className='w-2/3 pr-4'>
          <Posts post={post} />
        </div>
        <div className='w-1/3'>
          <Categories />
        </div>
      </div>
    </div>
  );
};

export default Home;
