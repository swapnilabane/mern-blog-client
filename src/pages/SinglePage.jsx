import Categories from '../components/Categories';
import SinglePost from '../components/SinglePost';

const SinglePage = () => {
  return (
    <div className='relative md:mx-36'>
      <div className='flex w-full mt-8'>
        <div className='w-2/3 pr-4'>
          <SinglePost />
        </div>
        <div className='w-1/3'>
          <Categories />
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
