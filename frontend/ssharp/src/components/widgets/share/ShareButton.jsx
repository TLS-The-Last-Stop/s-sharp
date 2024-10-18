import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Share2Icon,
  FacebookIcon,
  TwitterIcon,
  PaperclipIcon
} from 'lucide-react';

const ShareButtonStyle = {
  toast         : {
    whiteSpace  : 'nowrap',
    overflow    : 'hidden',
    textOverflow: 'ellipsis',
    maxWidth    : '300px'
  },
  fixedContainer: {
    left         : '20px',
    top          : '50%',
    transform    : 'translateY(-50%)',
    display      : 'flex',
    flexDirection: 'column',
    gap          : '10px',
    zIndex       : 1000
  },
  shareMenu     : {
    display        : 'flex',
    flexDirection  : 'column',
    alignItems     : 'center',
    gap            : '10px',
    position       : 'absolute',
    left           : '110%',
    top            : '-70px',
    backgroundColor: '#f9f9f9',
    padding        : '10px',
    borderRadius   : '10px',
    opacity        : 0,
    transform      : 'scale(0)',
    transformOrigin: 'left center',
    transition     : 'opacity 0.3s ease, transform 0.3s ease'
  },
  shareMenuOpen : {
    opacity  : 1,
    transform: 'scale(1)'
  }
};

const ShareButton = () => {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('URL이 클립보드에 복사되었습니다!', {
        position       : 'top-right',
        autoClose      : 2000,
        hideProgressBar: false,
        closeOnClick   : true,
        pauseOnHover   : true,
        draggable      : true,
        style          : ShareButtonStyle.toast
      });
    } catch (err) {
      toast.error('URL 복사 중 오류가 발생했습니다.', {
        position       : 'top-center',
        autoClose      : 2000,
        hideProgressBar: false,
        closeOnClick   : true,
        pauseOnHover   : true,
        draggable      : true,
        style          : ShareButtonStyle.toast
      });
      console.error('URL 복사 중 오류 발생:', err);
    }
  };

  const handleFacebookShare = () => {
    toast.error('페이스북 공유 준비중', {
      position       : 'top-right',
      autoClose      : 2000,
      hideProgressBar: false,
      closeOnClick   : true,
      pauseOnHover   : true,
      draggable      : true,
      style          : ShareButtonStyle.toast
    });
  };

  const handleTwitterShare = () => {
    toast.error('트위터 공유 준비중', {
      position       : 'top-right',
      autoClose      : 2000,
      hideProgressBar: false,
      closeOnClick   : true,
      pauseOnHover   : true,
      draggable      : true,
      style          : ShareButtonStyle.toast
    });
  };

  return (
    <>
      <div style={ShareButtonStyle.fixedContainer}>
        <div style={ShareButtonStyle.shareMenuWrapper}>
          <button
            onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <Share2Icon size={24} />
          </button>
          <div
            style={{
              ...ShareButtonStyle.shareMenu,
              ...(isShareMenuOpen ? ShareButtonStyle.shareMenuOpen : {})
            }}
          >
            <button onClick={handleFacebookShare}>
              <FacebookIcon size={24} />
            </button>
            <button onClick={handleTwitterShare}>
              <TwitterIcon size={24} />
            </button>
            <button onClick={handleShare}>
              <PaperclipIcon size={24} />
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ShareButton;
