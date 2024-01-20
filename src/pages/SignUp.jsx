import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        registerAsync({
          username,
          email,
          mobile,
          password,
        })
      );

      navigate('/sign-in');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className='settings min-h-screen '>
      <div className='flex justify-center items-center'>
        <div className=' bg-white p-8 rounded-lg shadow-md max-w-md w-full mt-16'>
          <div className=' text-center mb-6'>
            <span className='text-2xl font-semibold text-gray-800'>
              Register
            </span>
          </div>
          <form
            className='flex max-w-md flex-col gap-4'
            onSubmit={handleSubmit}
          >
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='username' value='Your username' />
              </div>
              <TextInput
                id='username'
                type='text'
                name='username'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
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
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='mobile' value='Your mobile' />
              </div>
              <TextInput
                id='mobile'
                type='number'
                name='mobile'
                placeholder='Mobile Number'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
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
              Sign Up
            </Button>
          </form>
          {error && <p className='text-red-500'>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
