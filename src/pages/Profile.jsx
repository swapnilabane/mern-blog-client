import { CgProfile } from 'react-icons/cg';
import { Button, Label, TextInput } from 'flowbite-react';
import { Context } from '../../context/ContextProvider';
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();

  const publicFolder = 'https://mern-blog-server-hq7r.onrender.com/images/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_START' });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updatedUser.profilePic = filename;
      try {
        await axios.post(
          'https://mern-blog-server-hq7r.onrender.com/api/upload',
          data
        );
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put(
        'https://mern-blog-server-hq7r.onrender.com/api/v1/user/update/' +
          user._id,
        updatedUser
      );
      setSuccess(true);
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'UPDATE_FAILURE' });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://mern-blog-server-hq7r.onrender.com/api/v1/user/delete/${user._id}`,
        {
          data: { userId: user._id },
        }
      );

      dispatch({ type: 'LOGOUT' });

      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='settings min-h-screen bg-gray-100 relative bg-gradient-to-br from-gray-900 to-gray-800 '>
      <button
        className='absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600'
        type='button'
        onClick={handleDelete}
      >
        Delete Account
      </button>
      <div className='flex justify-center items-center'>
        <div className='settingsWrapper bg-white p-8 rounded-lg shadow-md max-w-md w-full mt-16'>
          <div className='settingsTitle text-center mb-6'>
            <span className='text-2xl font-semibold text-gray-800'>
              Update Your Account
            </span>
          </div>
          <form
            className='flex max-w-md flex-col gap-4'
            onSubmit={handleSubmit}
          >
            <div className='mb-4'>
              <label
                htmlFor='fileInput'
                className='text-sm font-medium text-gray-700 block mb-1'
              >
                Profile Picture
              </label>
              <div className='settingsPP flex items-center space-x-4'>
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : publicFolder + user.profilePic
                  }
                  alt='profilepic'
                  className='w-12 h-12 rounded-full object-cover'
                />
                <label
                  htmlFor='fileInput'
                  className='cursor-pointer text-blue-500'
                >
                  <CgProfile className='text-2xl' />
                </label>
                <input
                  id='fileInput'
                  type='file'
                  style={{ display: 'none' }}
                  className='settingsPPInput'
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='email1' value='Your email' />
              </div>
              <TextInput
                id='username'
                type='text'
                name='name'
                placeholder={user.username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='email1' value='Your email' />
              </div>
              <TextInput
                id='email1'
                type='email'
                name='email'
                placeholder={user.email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='password1' value='Your password' />
              </div>
              <TextInput
                id='password1'
                type='password'
                name='password'
                placeholder='Password'
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button gradientMonochrome='success' type='submit'>
              Update
            </Button>
            {success && (
              <div className='mt-6 text-center text-green-500'>
                <span className='block bg-green-100 border border-green-400 text-sm px-4 py-2 rounded'>
                  Profile has been updated...
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
