import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import Tagify from '@yaireo/tagify';
import axios from 'axios';
import color from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@yaireo/tagify/dist/tagify.css';
import { useNavigate } from 'react-router-dom';

const WriteForm = () => {
  const editorRef = useRef(null);
  const inputRef = useRef(null);
  const tagifyRef = useRef(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
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
      const response = await axios.post(
        'http://localhost:8080/api/post/register',
        {
          title: title,
          content: content,
          tags: tags,
        }
      );
      console.log(response.data);
      alert('글 작성 성공적');
      navigate('/');
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('글 작성 오류');
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
        placeholder='태그를 입력하세요!'
        // value={tags}
        // onChange={onChangeTag}
      />
      <Editor
        ref={editorRef}
        initialValue=' '
        previewStyle='vertical'
        width='300px'
        height='540px'
        initialEditType='wysiwyg'
        hideModeSwitch={true}
        useCommandShortcut={false}
        plugins={[color]}
        onChange={onContentChange}
      />
      <button className='write-btn' onClick={onSubmit}>
        작성하기
      </button>
    </div>
  );
};

export default WriteForm;
