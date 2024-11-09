'use client';
import { cva } from 'class-variance-authority';
import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const buttonToTopVariants = cva(
  `
    fixed bottom-3 right-3 size-8 rounded-xl flex-center cursor-pointer bg-white
    text-black

    hover:opacity-90

    md:size-16

    sm:size-12
  `,
  {
    variants: {
      state: {
        active: 'flex',
        inactive: 'hidden',
      },
    },
    defaultVariants: {
      state: 'inactive',
    },
  },
);

const GoToTop = () => {
  const [showTopPage, setShowTopPage] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowTopPage(true);
      } else {
        setShowTopPage(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleClickToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div
      className={buttonToTopVariants({
        state: showTopPage ? 'active' : 'inactive',
      })}
      onClick={handleClickToTop}
    >
      <ChevronUp size={32} />
    </div>
  );
};

export default GoToTop;
