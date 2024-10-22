import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Share2Icon, FacebookIcon, TwitterIcon, PaperclipIcon } from 'lucide-react';

const ShareButtonStyle = {
  toast: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' },
  fixedContainer: { left: '20px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 1000 },
  shareMenu: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', position: 'absolute', left: '110%', top: '-70px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '10px', opacity: 0, transform: 'scale(0)', transition: 'opacity 0.3s ease, transform 0.3s ease' },
  shareMenuOpen: { opacity: 1, transform: 'scale(1)' }
};

const ShareButton = () => {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('URL이 클립보드에 복사되었습니다!', { style: ShareButtonStyle.toast });
    } catch {
      toast.error('URL 복사 중 오류가 발생했습니다.', { style: ShareButtonStyle.toast });
    }
  };

  const notify = (message) => toast.error(message, { style: ShareButtonStyle.toast });

  return (
      <>
        <div style={ShareButtonStyle.fixedContainer}>
          <button onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}>
            <Share2Icon size={24} />
          </button>
          <div style={{ ...ShareButtonStyle.shareMenu, ...(isShareMenuOpen ? ShareButtonStyle.shareMenuOpen : {}) }}>
            <button onClick={() => notify('페이스북 공유 준비중')}><FacebookIcon size={24} /></button>
            <button onClick={() => notify('트위터 공유 준비중')}><TwitterIcon size={24} /></button>
            <button onClick={handleShare}><PaperclipIcon size={24} /></button>
          </div>
        </div>
        <ToastContainer />
      </>
  );
};

export default ShareButton;
