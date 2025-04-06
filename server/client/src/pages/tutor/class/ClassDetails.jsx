import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./classDetails.scss";

const ClassDetails = () => {
  const { classId } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchClass = async () => {
      const res = await axios.get(`http://localhost:8800/api/classes/${classId}`);
      setClassInfo(res.data[0]);
    };
    const fetchPosts = async () => {
      const res = await axios.get(`http://localhost:8800/api/posts/${classId}`);
      setPosts(res.data);
    };

    fetchClass();
    fetchPosts();
  }, [classId]);

  const handlePost = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("classId", classId);

    const res = await axios.post("http://localhost:8800/api/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.status === 201) {
      const newPost = {
        content: formData.get("content"),
        imageUrl: res.data.imageUrl || null,
        dueDate: formData.get("dueDate"),
      };
      setPosts((prev) => [...prev, newPost]);
      e.target.reset();
    }
  };

  if (!classInfo) return <div>Loading...</div>;

  return (
    <div className="class-details">
      <div className="banner">
        <h1>{classInfo.subject}</h1>
        <p>{classInfo.frequency} class | Start: {classInfo.startDate}</p>
      </div>

      <form onSubmit={handlePost} className="post-form">
        <textarea name="content" placeholder="Announce something to your class..." required />
        <input type="file" name="image" accept="image/*" />
        <input type="date" name="dueDate" />
        <button type="submit">Post</button>
      </form>

      <div className="posts">
        {posts.map((post, index) => (
          <div className="post" key={index}>
            <p>{post.content}</p>
            {post.imageUrl && <img src={`http://localhost:8800${post.imageUrl}`} alt="Uploaded" />}
            {post.dueDate && <p className="due">Due: {post.dueDate}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassDetails;