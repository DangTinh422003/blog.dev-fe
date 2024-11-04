import { useEffect, useState } from 'react';

export function useToTopPage() {
  const [showTopPage, setShowTopPage] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        setShowTopPage(true);
      } else {
        setShowTopPage(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);
  const handleClickToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { showTopPage, handleClickToTop };
}
