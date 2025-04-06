import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./classDetails.scss";

const ClassDetail = () => {
  const { classId } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // In future, fetch posts from DB
    setPosts([]);
  }, [classId]);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/classes/${classId}`);
        setClassInfo(res.data[0]); // assuming backend returns array
      } catch (err) {
        console.error("Error fetching class info:", err);
      }
    };
    fetchClass();
  }, [classId]);

  const handlePost = (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;
    const image = e.target.elements.image.files[0];
    const newPost = {
      content,
      image: image ? URL.createObjectURL(image) : null,
    };
    setPosts((prev) => [...prev, newPost]);
    e.target.reset();
  };

  if (!classInfo) return <div>Loading...</div>;

  return (
    <div className="class-details">
      <div className="banner">
        <h1>{classInfo.subject}</h1>
        <p>{classInfo.frequency} class | Start: {classInfo.startDate}</p>
      </div>

      <form onSubmit={handlePost} className="post-form">
        <textarea name="content" placeholder="Announce something to your class..." />
        <input type="file" name="image" accept="image/*" />
        <button type="submit">Post</button>
      </form>

      <div className="posts">
        {posts.map((post, index) => (
          <div className="post" key={index}>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt="Uploaded" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassDetail;