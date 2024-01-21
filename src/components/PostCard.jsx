import { useState } from 'react';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function PostCard({ items }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const publicFolder = 'https://mern-blog-server-hq7r.onrender.com/images/';

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const getDescriptionContent = () => {
    if (isExpanded) {
      return items.description;
    } else {
      const truncatedDescription = items.description
        .split(' ')
        .slice(0, 12)
        .join(' ');
      return `${truncatedDescription}...`;
    }
  };

  return (
    <Card
      className='max-w-sm h-full'
      imgAlt='Meaningful alt text for an image that is not purely decorative'
      imgSrc={publicFolder + items.photo}
    >
      <div className='p-6 h-full flex flex-col justify-between'>
        <div>
          <Link
            to={`/post/${items._id}`}
            className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline hover:text-blue-500'
          >
            {items.title}
          </Link>
          <p className='font-normal text-gray-700 dark:text-gray-400 mt-2 overflow-hidden'>
            {getDescriptionContent()}
          </p>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <div>
            <p className='text-blue-600 dark:text-blue-400'>
              {items.categories.map((category) => (
                <span key={category} className='mr-2'>
                  {category}
                </span>
              ))}
            </p>
          </div>
          {items.description.split(' ').length > 12 && (
            <button
              className='text-blue-500 hover:underline focus:outline-none'
              onClick={toggleDescription}
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
        <hr className='my-4 border-gray-300 dark:border-gray-600' />
        <div className='flex justify-between items-center'>
          <p className='text-gray-500 dark:text-gray-400'>
            {new Date(items.createdAt).toDateString()}
          </p>
          <Link
            to={`/individual-posts?user=${items.username}`}
            className='text-blue-500 hover:underline'
          >
            {capitalizeFirstLetter(items.username)}
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default PostCard;
