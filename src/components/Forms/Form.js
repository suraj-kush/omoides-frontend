import React, { useState, useEffect } from "react";
import useStyles from "./styles.js";
import FileBase from "react-file-base64";
import { useSelector, useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts.js";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import {useHistory} from 'react-router-dom'

const Form = ({ currentID, setCurrentID }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: null,
    likes: [],
    createdAt: Date.now,
  });

  const user = JSON.parse(localStorage.getItem("profile"));
  const {posts}= useSelector(state => state.posts)
  const post = currentID ? posts.find((post) => post._id === currentID) : null;
  useEffect(() => {
    if (post) {
      setPostData({
        title: post.title,
        message: post.message,
        tags: post.tags,
        selectedFile: post.selectedFile,
        likes: post.likes,
        createdAt: post.createdAt,
      });
    }
  }, [post]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentID) {
      dispatch(
        updatePost(currentID, { ...postData, name: user?.result?.name, creator: user?.result?._id})
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    }
    clear();
  };
  const clear = () => {
    setCurrentID(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: null,
      likes: [],
      createdAt: Date.now,
    });
  };
  if (!user) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h5" component="h3">
          Please login to create a post
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentID ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => {
            setPostData({ ...postData, title: e.target.value });
          }}
        />

        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) => {
            setPostData({ ...postData, message: e.target.value });
          }}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => {
            setPostData({ ...postData, tags: e.target.value.split(",") });
          }}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={(base64) => {
              setPostData({ ...postData, selectedFile: base64.base64 });
            }}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          type="submit"
          color="primary"
          size="large"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
