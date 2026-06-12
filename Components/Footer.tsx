import Image from 'next/image';
import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center'>
      <p className='text-sm text-white'>
        &copy; {currentYear} Heba Hamdan. All rights reserved.
      </p>

      <div className='flex'>
        <a href='https://ar-ar.facebook.com/heba.shamdan.9' target='_blank' rel='noopener noreferrer'>
          <Image src='/facebook.svg' alt='Facebook icon' height={40} width={40} />
        </a>

        <a href='https://www.instagram.com/heba_hamdan__/' target='_blank' rel='noopener noreferrer'>
          <Image src='/instagram.svg' alt='Instagram icon' height={40} width={40} />
        </a>

        <a href='https://www.linkedin.com/in/heba-hamdan2/' target='_blank' rel='noopener noreferrer'>
          <Image src='/linkedin.svg' alt='LinkedIn icon' height={40} width={40} />
        </a>

        <a href='https://github.com/HebaHamdan2/' target='_blank' rel='noopener noreferrer'>
          <Image src='/github.svg' alt='GitHub icon' height={40} width={40} />
        </a>
      </div>
    </div>
  );
};