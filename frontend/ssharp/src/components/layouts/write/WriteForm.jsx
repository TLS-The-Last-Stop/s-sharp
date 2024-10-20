import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import Tagify from '@yaireo/tagify';
import color from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@yaireo/tagify/dist/tagify.css';
import { useNavigate } from 'react-router-dom';
import { axiosWithAuth } from '../../../utils/authUtils';
import '../../../app/css/WriteForm.css';

const WriteForm = () => {
  const editorRef = useRef(null);
  const inputRef = useRef(null);
  const tagifyRef = useRef(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    tagifyRef.current = new Tagify(inputRef.current, {
      maxTags: 10,
      backspace: 'edit',
      dropdown: {
        enabled: 0,
      },
    });

    tagifyRef.current.on('add', onTagChange);
    tagifyRef.current.on('remove', onTagChange);

    return () => {
      if (tagifyRef.current) {
        tagifyRef.current.destroy();
      }
    };
  }, []);

  const onTagChange = () => {
    setTags(tagifyRef.current.value.map((tag) => tag.value));
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onContentChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    setContent(data);
  };

  const onSubmit = async () => {
    try {
      const axiosInstance = axiosWithAuth(); // 인증된 axios 인스턴스 가져오기
      const response = await axiosInstance.post(
          'http://localhost:8080/api/post/register',
          {
            title: title,
            content: content,
            tags: tags,
          }
      );
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  const onUploadImage = async (blob, callback) => {
    const formData = new FormData();
    formData.append('image', blob);

    try {
      const axiosInstance = axiosWithAuth();
      const response = await axiosInstance.post(
          'http://localhost:8080/api/upload',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
      );
      callback(response.data, 'alt text');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
      <div className='post'>
        <input
            className='post-title'
            placeholder='제목을 입력하세요'
            value={title}
            onChange={onTitleChange}
        />
        <input
            ref={inputRef}
            className='post-tags'
            placeholder='태그를 입력하세요! (예: react, javascript)'
        />
        <Editor
            ref={editorRef}
            initialValue=' '
            previewStyle='vertical'
            width='100%'
            height='540px'
            initialEditType='wysiwyg'
            hideModeSwitch={true}
            useCommandShortcut={false}
            plugins={[color]}
            onChange={onContentChange}
            hooks={{
              addImageBlobHook: onUploadImage,
            }}
        />
        <button className='write-btn' onClick={onSubmit}>
          작성하기
        </button>
      </div>
  );
};

export default WriteForm;
