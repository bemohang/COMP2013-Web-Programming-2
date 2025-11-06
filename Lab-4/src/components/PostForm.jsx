export default function PostForm({ newPost, onInputChange, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Post</h2>
      <div>
        <label>Title: </label>
        <input 
          type="text" 
          name="title" 
          value={newPost.title} 
          onChange={onInputChange} 
        />
      </div>
      <div>
        <label>Body: </label>
        <input 
          type="text" 
          name="body" 
          value={newPost.body} 
          onChange={onInputChange} 
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}