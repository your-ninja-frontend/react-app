import React, { useState, useEffect, useRef } from "react";
import PostSirvice from "../API/PostService";
import { usePost } from "../hooks/usePosts";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Button from "../components/UI/button/Button";
import Modal from "../components/UI/modal/Modal";
import Loader from "../components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { usePagination } from "../hooks/usePagination";
import { useObserver } from "../hooks/useObserver";
import Select from "../components/UI/select/Select";


function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const sortedAndSearchedPosts = usePost(posts, filter.sort, filter.query);
  const pagesArray = usePagination(totalPages);
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const responce = await PostSirvice.getAll(limit, page);
    setPosts([...posts, ...responce.data]);
    const totalCount = responce.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit))
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  })


  useEffect(() => {
    fetchPosts(page, limit);
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(el => el.id !== post.id));
  }

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className="App">
      <Button style={{ marginTop: 15 }} onClick={() => setModal(true)}>
        Create Post
      </Button>

      <Modal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </Modal>

      <hr style={{ margin: '15px 0' }} />

      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />

      <Select
        value={limit}
        onChange={value => setLimit(value)}
        defaultOption='Кол-во постов'
        option={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Все'},
        ]}
      />

      {postError && <h1>Error: ${postError}</h1>}

      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title='Посты про ЯП'
      />
      <div ref={lastElement}></div>

      {isPostsLoading && <Loader />}

      <Pagination
        pagesArray={pagesArray}
        page={page}
        changePage={changePage}
      />

    </div >
  );
}

export default Posts;
