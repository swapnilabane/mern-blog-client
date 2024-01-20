import PostCard from './PostCard';

const Posts = ({ post }) => {
  return (
    <div className='flex flex-wrap'>
      {post?.map((items) => (
        <div
          className='w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4'
          key={items._id}
        >
          <PostCard items={items} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
