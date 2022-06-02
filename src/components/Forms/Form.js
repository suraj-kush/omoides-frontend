import React, { useState, useEffect } from "react";
import useStyles from "./styles.js";
import FileBase from "react-file-base64";
import { useSelector, useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts.js";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

const Form = ({ currentID, setCurrentID }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    selectedFile: null,
    likes: [],
    createdAt: Date.now,
  });
  const [tags, setTags] = useState([]);

  const user = JSON.parse(localStorage.getItem("profile"));
  const { posts } = useSelector((state) => state.posts);
  const post = currentID ? posts.find((post) => post._id === currentID) : null;
  useEffect(() => {
    if (post) {
      setPostData({
        title: post.title,
        message: post.message,
        selectedFile: post.selectedFile,
        likes: post.likes,
        createdAt: post.createdAt,
      });
      setTags(post.tags);
    }
  }, [post]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const handleAdd = (chip) => {
    setTags([...tags, chip]);
  };
  
  const handleDelete = (chip) => {
    setTags(tags.filter((tag) => tag !== chip));
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentID) {
      dispatch(
        updatePost(currentID, {
          ...postData,
          name: user?.result?.name,
          creator: user?.result?._id,
          tags: tags,
        })
        );
      } else {
      dispatch(createPost({ ...postData, name: user?.result?.name, tags:tags }, history));
    }
    clear();
  };
  const clear = () => {
    setCurrentID(null);
    setPostData({
      title: "",
      message: "",
      selectedFile: null,
      likes: [],
      createdAt: Date.now,
    });
    setTags([]);
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
          label="Caption" // it is message in the backend
          fullWidth
          rows={4}
          multiline
          value={postData.message}
          onChange={(e) => {
            setPostData({ ...postData, message: e.target.value });
          }}
        />
        <ChipInput
          className={classes.chipInput}
          value={tags}
          label="Tags"
          fullWidth
          variant="outlined"
          newChipKeyCodes={[32]}
          onAdd={handleAdd}
          onDelete={handleDelete}
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
