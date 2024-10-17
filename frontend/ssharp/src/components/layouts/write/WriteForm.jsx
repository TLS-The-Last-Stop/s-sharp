import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import Tagify from '@yaireo/tagify';
import axios from 'axios';
import color from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@yaireo/tagify/dist/tagify.css';

const WriteForm = () => {
  const editorRef = useRef(null);
  const inputRef = useRef(null);
  const tagifyRef = useRef(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    // Tagify 인스턴스 생성
    tagifyRef.current = new Tagify(inputRef.current);

    // 태그가 추가되면 이벤트 발생
    tagifyRef.current.on('add', () => {
      console.log(tagifyRef.current.value); // 입력된 태그 정보 객체
    });

    // 컴포넌트가 언마운트될 때 Tagify 인스턴스 제거
    return () => {
      tagifyRef.current.destroy();
      tagifyRef.current = null;
    };
  }, []);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = () => {
    const data = editorRef.current.getInstance().getHTML();
    setContent(data);
  };

  const onChangeTag = (e) => {
    setTags(e.target.value);
  };

  const onSubmit = async () => {
    await axios
      .post('http://localhost:8080/post', {
        title: title,
        content: content,
        tag: tags,
      })
      .then((response) => {
        alert(aa);
        console.log(response.data);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  return (
    <div className='post'>
      <input
        className='post-title'
        placeholder='제목을 입력하세요'
        value={title}
        onChange={onChangeTitle}
      />
      <input
        ref={inputRef}
        className='post-tags'
        placeholder='태그를 입력하세요!'
        value={tags}
        onChange={onChangeTag}
      />
      <Editor
        ref={editorRef}
        initialValue=' '
        previewStyle='vertical'
        height='540px'
        initialEditType='wysiwyg'
        useCommandShortcut={false}
        plugins={[color]}
        onChange={onChangeContent}
      />
      <button className='write-btn' onClick={onSubmit}>
        작성하기
      </button>
    </div>
  );
};

export default WriteForm;
