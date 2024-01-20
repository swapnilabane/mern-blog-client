import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/ContextProvider';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/v1/auth/login', {
        email,
        password,
      });

      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      localStorage.setItem('user', JSON.stringify(res.data));

      res.data && navigate('/');
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className='settings min-h-screen '>
      <div className='flex justify-center items-center'>
        <div className=' bg-white p-8 rounded-lg shadow-md max-w-md w-full mt-16'>
          <div className=' text-center mb-6'>
            <span className='text-2xl font-semibold text-gray-800'>Login</span>
          </div>
          <form
            className='flex max-w-md flex-col gap-4'
            onSubmit={handleSubmit}
          >
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='email1' value='Your email' />
              </div>
              <TextInput
                id='email1'
                type='email'
                name='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox id='remember' />
              <Label htmlFor='remember'>Remember me</Label>
            </div>
            <Button gradientDuoTone='purpleToBlue' type='submit'>
              Sign In
            </Button>
          </form>
          {error && <p className='text-red-500'>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
