import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          'https://mern-blog-server-hq7r.onrender.com/api/v1/categories/'
        );
        // console.log(res.data);
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    getCategories();
  }, []);

  return (
    <div className='bg-white p-4 rounded shadow-md'>
      <h1 className='text-xl font-bold mb-2'>Categories</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
        {categories.map((category, index) => (
          <div key={index} className='mb-2 md:mb-0'>
            <Link
              to={`/individual-categories?category=${category.name}`}
              className='text-blue-500 hover:underline'
            >
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
