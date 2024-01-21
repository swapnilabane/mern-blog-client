import { useContext, useEffect, useState } from 'react';
import { AiFillFileAdd } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/ContextProvider';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

const Write = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);

  const uploadFile = async (type, timestamp, signature) => {
    const folder = type === 'image' ? 'images' : 'videos';

    const data = new FormData();
    data.append('file', type === 'image' ? img : video);
    data.append('timestamp', timestamp);
    data.append('signature', signature);
    data.append('api_key', import.meta.env.VITE_REACT_APP_CLOUDINARY_API_KEY);
    data.append('folder', folder);

    try {
      let cloudName = import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME;
      let resourceType = type === 'image' ? 'image' : 'video';
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log('File upload success:', secure_url);
      return secure_url;
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  const getSignatureForUpload = async (folder) => {
    try {
      const res = await axios.post(
        'https://mern-blog-server-hq7r.onrender.com/api/sign-upload',
        { folder }
      );
      console.log('Signature response:', res.data);

      if ('timestamp' in res.data && 'signature' in res.data) {
        return res.data;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Signature request error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { timestamp: imgTimestamp, signature: imgSignature } =
        await getSignatureForUpload('images');
      const { timestamp: videoTimestamp, signature: videoSignature } =
        await getSignatureForUpload('videos');

      const imgUrl = await uploadFile('image', imgTimestamp, imgSignature);
      const videoUrl = await uploadFile(
        'video',
        videoTimestamp,
        videoSignature
      );

      const newPost = {
        username: user.username,
        title,
        description,
        img: imgUrl,
        video: videoUrl,
      };

      const res = await axios.post(
        'https://mern-blog-server-hq7r.onrender.com/api/v1/post/create',
        newPost
      );

      res.data && navigate(`/post/${res.data._id}`);
      setImg(null);
      setVideo(null);

      console.log('Post creation success!');
      setLoading(false);
    } catch (error) {
      console.error('Post creation error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [user, navigate]);

  return user ? (
    <div className='main flex flex-col items-center h-screen mt-10'>
      <div className='image'>
        {file && (
          <img
            className='w-[45rem] h-[15rem] rounded-lg'
            src={URL.createObjectURL(file)}
            alt=''
          />
        )}
      </div>
      <form className='mt-8' onSubmit={handleSubmit}>
        <div className='flex items-center space-x-8'>
          <label
            className='text-sm font-medium text-gray-900 dark:text-white'
            htmlFor='file_input'
          >
            Upload an Image:
          </label>
          <input
            className='text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
            id='file_input'
            type='file'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type='text'
            placeholder='Title'
            className='border-b-2 outline-none w-56'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='mt-8'>
          <label
            className='block text-sm font-medium text-gray-900 dark:text-white'
            htmlFor='article_content'
          >
            Write your article:
          </label>
          <textarea
            placeholder='Start typing here...'
            id='article_content'
            cols='80'
            rows='8'
            className='w-full text-sm text-gray-800 bg-white border-2 rounded-lg focus:ring-2 focus:ring-blue-200 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400'
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          type='submit'
          className='inline-flex items-center px-5 py-2.5 mt-8 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'
        >
          <AiFillFileAdd className='mr-2' />
          Publish Post
        </button>
      </form>

      {loading && (
        <ThreeDots
          height='80'
          width='80'
          radius='9'
          color='#4fa94d'
          ariaLabel='three-dots-loading'
          wrapperStyle={{}}
          wrapperClassName=''
          visible={true}
        />
      )}
    </div>
  ) : null;
};

export default Write;
