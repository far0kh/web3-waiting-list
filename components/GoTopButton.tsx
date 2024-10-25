import { useEffect, useState } from 'react';

const GoTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed text-lg font-bold bottom-5 right-5 p-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:outline-none transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ display: visible ? 'inline' : 'none' }}
    >
      ↑
    </button>
  );
};

export default GoTopButton;
