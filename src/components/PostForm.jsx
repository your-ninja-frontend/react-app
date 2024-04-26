import React, { useState } from 'react';
import Input from './UI/input/Input.jsx'
import Button from './UI/button/Button.jsx';

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: '', body: '', });

  const addPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now()
    };
    create(newPost);
    setPost({ title: '', body: '', })
  };

  return (
    <form action="">
      <Input
        type="text"
        placeholder="Post Name"
        value={post.title}
        onChange={e => setPost({ ...post, title: e.target.value })}
      />
      <Input
        type="text"
        placeholder="Post Description"
        value={post.body}
        onChange={e => setPost({ ...post, body: e.target.value })}
      />
      <Button onClick={addPost}>Create Post</Button>
    </form>
  );
}

export default PostForm;
