import React, { useEffect, useState } from "react";
import axios from "axios";
import image from "../images/logo.png";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts?cat=${cat}`);
        console.log(res);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [cat]);

  // const posts = [
  //   {
  //     id: 1,
  //     title:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente",
  //     desc: "molestias reprehenderit odio modi rerum, impedit hic architecto enim sint? Nesciunt beatae quidem et quasi. Veniam nam rerum iusto dolorem reiciendis",
  //     img: "https://images.pexels.com/photos/7008010.jpeg?auto=compress&cs=tiny&rgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     title:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente",
  //     desc: "molestias reprehenderit odio modi rerum, impedit hic architecto enim sint? Nesciunt beatae quidem et quasi. Veniam nam rerum iusto dolorem reiciendis",
  //     img: "https://images.pexels.com/photos/7008010.jpeg?auto=compress&cs=tiny&rgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 3,
  //     title:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente",
  //     desc: "molestias reprehenderit odio modi rerum, impedit hic architecto enim sint? Nesciunt beatae quidem et quasi. Veniam nam rerum iusto dolorem reiciendis",
  //     img: "https://www.pexels.com/photo/people-walking-on-a-snow-covered-town-10066931/",
  //   },
  //   {
  //     id: 4,
  //     title:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente",
  //     desc: "molestias reprehenderit odio modi rerum, impedit hic architecto enim sint? Nesciunt beatae quidem et quasi. Veniam nam rerum iusto dolorem reiciendis",
  //     img: "https://www.pexels.com/photo/white-ceramic-mug-on-a-wooden-tray-10026524/2",
  //   },
  // ];

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>

      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../uploads/${post.img}`} alt="" />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
