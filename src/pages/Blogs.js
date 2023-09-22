import React, { useEffect } from "react";
import Blog from "../components/Blog";
import { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [sort, setSort] = React.useState('ascending');

  const handleChange = (event) => {
    setSort(event.target.value);
    let ascendingSortedBlogs = blogs?.sort((a, b) => new Date(...a.createdAt.split('/').reverse()) - new Date(...b.createdAt.split('/')));
    if (event.target.value === 'ascending') {
      setBlogs(ascendingSortedBlogs)
    } else {
      setBlogs(ascendingSortedBlogs.reverse())
    }
  };

  const getAllBlog = async () => {
    const { data } = await axios.get("/api/v1/blog/all-blog");
    let ascendingSortedBlogs = data?.blogs?.sort((a, b) => new Date(...a.createdAt.split('/').reverse()) - new Date(...b.createdAt.split('/')));
    setBlogs(ascendingSortedBlogs);
  };

  useEffect(() => {
    getAllBlog();
  }, []);

  return (
    <div>
      <SearchBar />

      {/* Sorting */}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Date Sort by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            defaultValue="ascending"
            label="Date Sort by"
            onChange={handleChange}
          >
            <MenuItem value={'ascending'}>Ascending</MenuItem>
            <MenuItem value={'descending'}>Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {blogs?.map((item, index) => {
        return (
          <div key={index} className="blog-container">
            <Blog
              name={item.user.username}
              content={item.content}
              time={Date(item.createdAt)}
              title={item.title}
              image={item.image}
              category={item.category}
            ></Blog>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
