import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Footers = () => {
  return (
    <div className='border-b-2 md:mx-36 mt-auto'>
      <Footer container>
        <div className='w-full text-center'>
          <div className='w-full justify-between sm:flex sm:items-center sm:justify-between'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
            >
              <span className='px-2 py-1 bg-gradient-to-r from-red-400 via-red-500 to-pink-500 rounded-lg text-white'>
                Blog App
              </span>
            </Link>
            <Footer.LinkGroup>
              <Footer.Link href='#'>About</Footer.Link>
              <Footer.Link href='#'>Privacy Policy</Footer.Link>
              <Footer.Link href='#'>Licensing</Footer.Link>
              <Footer.Link href='#'>Contact</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <Footer.Divider />
          <Footer.Copyright href='#' by='Flowbite™' year={2022} />
        </div>
      </Footer>
    </div>
  );
};

export default Footers;
