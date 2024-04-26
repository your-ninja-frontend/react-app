import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostSirvice from '../API/PostService';
import Loader from './UI/loader/Loader';


const Post = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostSirvice.getById(id);
    setPost(response.data)
  });
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostSirvice.getCommentsByPost(id);
    setComments(response.data)
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, [])

  return (
    <div>
      <h1 style={{ marginBottom: 30 }}>Старница поста с ID = {params.id}</h1>
      {isLoading
        ? <Loader />
        : <div>
          <p style={{ marginBottom: 15 }}>{post.title}</p>
          <p style={{ marginBottom: 30 }}>{post.body}</p>
        </div>
      }
      <h2 style={{ marginBottom: 30 }}>Комментарии</h2>
      {isComLoading
        ? <Loader />
        : <div>
          {comments.map((comment) =>
            <div style={{ marginBottom: 10 }} key={comment.id}>
              <h3>{comment.email}</h3>
              <p>{comment.name}</p>
              <p>{comment.body}</p>
            </div>
          )}
        </div>
      }
    </div>
  );
}

export default Post;
