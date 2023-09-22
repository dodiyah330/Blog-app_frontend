import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const SearchBar = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const [blogTitles, setblogsTitles] = useState([]);

    const getAllBlog = async () => {
        const { data } = await axios.get("/api/v1/blog/all-blog");
        data?.blogs?.map((blog) => (
            setblogsTitles(prevState => [...prevState, blog.title])
        ))
    };

    useEffect(() => {
        getAllBlog()
    }, [])

    return (
        <div>
            <Autocomplete
                id="search-bar"
                options={blogTitles}
                getOptionLabel={(option) => option}
                value={searchValue}
                onChange={(event, newValue) => {
                    setSearchValue(newValue);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Search" variant="outlined" fullWidth />
                )}
            />
        </div>
    );
};

export default SearchBar;
