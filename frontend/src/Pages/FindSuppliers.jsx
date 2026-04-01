import React,{useEffect,useState} from 'react'

const FindSuppliers = () => {
   const [posts, setPosts] = useState([]);
   const [search, setSearch] = useState("");
   const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/posts/")
    .then((res)=>{
      if(!res.ok) throw new Error("failed to fetch posts");
      return res.json();
    })
    .then((data)=>{
      setPosts(data);
      setLoading(false);
    })
    .catch((err)=>{
      setLoading(false);
    })
  }, []);

  if (loading) return <p>Loading posts...</p>
  if (error) return <p>Error:{error}</p>

  //filter post by caption and cities
   
  const filteredPosts = posts.filter((post) => {
  const query = search.toLowerCase();
  return (
    post.caption.toLowerCase().includes(query) ||
    post.cities.toLowerCase().includes(query) 
    
  );
});

  return (
    <>
    
        <h1>Find Suppliers</h1>

        <input
          type="text"
          placeholder="Search city or caption..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      
    <div className="postdisplay">
      {filteredPosts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          filteredPosts.map((post, index) => (
            <div key={post.id || index} className="post-card">

    <div className='Contain'>
      <h2>{post.cities}</h2> 
      <p>{post.caption}</p>
      <p>{post .created_at}</p>

    <div className='images'>
      {post.uploaded_images && post.uploaded_images.length > 0 ? (
        post.uploaded_images.map((img, idx) => ( 
          <img key={idx} src={img} alt={`${post.cities} gallery ${idx + 1}`} />
        ))
      ) : (
        <p>No images available.</p>
      )}
      </div> 
    </div>
  </div>
          ))
        )}
      </div>  
       
      
    
    </>
  )
}

export default FindSuppliers