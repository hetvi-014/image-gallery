import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ReactResponsiveGallery from 'react-responsive-gallery';

function App() {
  const [images, setImages] = useState([]);
  const [scrollType, setScrollType] = useState('infinite');
  const [page, setPage] = useState(1);

  const fetchImages = useCallback(async () => {
    const response = await axios.get(
      ` https://picsum.photos/v2/list?page=${page}&limit=20`
    );
    setImages((prevImages) => [
      ...prevImages,
      ...response.data.map((image) => ({ src: image.download_url })),
    ]);
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (scrollType === 'infinite') {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollType]);

  const toggleScrollType = () => {
    setScrollType((prevType) =>
      prevType === 'infinite' ? 'loadMore' : 'infinite'
    );
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className=''>
      <header className='h-20 flex w-full '>
        <div className='h-full flex items-center w-[20%]'>
          <img
            className='w-auto md:h-full sm:h-auto p-4'
            src='https://seeklogo.com/images/A/apple-photos-logo-20DBB81F0E-seeklogo.com.png'
            alt='logo'
          />
          <h2 className='md:text-xl sm:text-sm '>LOGO</h2>
        </div>
        <div className='flex justify-center items-center w-[60%] h-full'>
          <h1 className='sm:text-4xl font-bold'>Image Gallery</h1>
        </div>
        <div className='flex  items-center justify-end w-[20%] p-4 '>
          <button
            onClick={toggleScrollType}
            className='py-2 px-2 whitespace-nowrap   text-xs sm:text-base bg-blue-500 text-white rounded-md'
          >
            Scroll Type: {scrollType === 'infinite' ? 'Infinite' : 'Load More'}
          </button>
        </div>
      </header>
      <div className='w-full h-[35vh] overflow-hidden mb-4'>
        <img
          className='fit object-cover'
          src='https://fastly.picsum.photos/id/116/3504/2336.jpg?hmac=C46vgpj3R407e8pCyy8NhIsNaBZCjb4r5d71keNgMJY'
          alt='header-image'
        />
      </div>
      <ReactResponsiveGallery
        media={images}
        customLoader={<></>}
        screenWidthSizes={{ xs: 420, s: 600, m: 768, l: 992, xl: 2300 }}
      />
      {scrollType === 'loadMore' && (
        <div className='flex justify-center my-4'>
          <button
            onClick={loadMoreImages}
            className='px-4 py-2 bg-green-500 text-white rounded-md'
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
