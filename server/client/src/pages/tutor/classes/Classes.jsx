import "./classes.scss";
import React, { useState } from "react";

const dummyClasses = [
  { id: 1, title: "Algebra 101", code: "ALG101", color: "#7e57c2" },
  { id: 2, title: "Biology", code: "BIO102", color: "#42a5f5" },
  { id: 3, title: "World History", code: "HIS103", color: "#ef5350" },
];

const Classes = () => {
  const [posts, setPosts] = useState({});

  const handlePost = (e, classId) => {
    e.preventDefault();
    const content = e.target.elements[`content-${classId}`].value;
    const image = e.target.elements[`image-${classId}`].files[0];
    const newPost = {
      content,
      image: image ? URL.createObjectURL(image) : null,
    };
    setPosts((prev) => ({
      ...prev,
      [classId]: [...(prev[classId] || []), newPost],
    }));
    e.target.reset();
  };

  return (
    <div className="classes">
      {dummyClasses.map((cls) => (
        <div className="card" key={cls.id} style={{ backgroundColor: cls.color }}>
          <h2>{cls.title}</h2>
          <span className="code">Class Code: {cls.code}</span>
          <form onSubmit={(e) => handlePost(e, cls.id)} className="post-form">
            <textarea name={`content-${cls.id}`} placeholder="Announce something to your class..." />
            <input type="file" name={`image-${cls.id}`} accept="image/*" />
            <button type="submit">Post</button>
          </form>
          <div className="posts">
            {(posts[cls.id] || []).map((post, index) => (
              <div className="post" key={index}>
                <p>{post.content}</p>
                {post.image && <img src={post.image} alt="Uploaded" />}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Classes;