import { useState, useEffect } from "react";
import PostsContainer from "./PostsContainer";
import PostForm from "./PostForm";

export default function FakeApiApp() {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(URL);
    const posts = await response.json();
    setData(posts); 
    setIsLoading(false);
  }
  
  const handleAddPost = () => {
    const postToAdd = {
      id: Date.now(),
      title: newPost.title,
      body: newPost.body
    };
    setData([postToAdd, ...data]);
    setNewPost({ title: "", body: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Fake API App</h1>
      <PostForm 
        newPost={newPost}
        onInputChange={handleInputChange}
        onSubmit={handleAddPost}
      />
      {isLoading && <p>Loading...</p>}
      <PostsContainer data={data} />
    </div>
  );
}