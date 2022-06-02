import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Typography, TextField, Button, Grid } from "@material-ui/core/";
import { commentPost } from "../../actions/posts";

import useStyles from "./styles";

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(
      commentPost(`${user?.result?.name}: ${comment}`, post._id)
    );

    setComments(newComments);
    setComment("");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <Grid
          container
          spacing={3}
          alignItems="stretch"
          justifyContent="space-between"
        >
          <Grid className={classes.commentsInnerContainer} item xs={12} sm={12} md={12} lg={6}>
              <Typography gutterBottom variant="h6">
                Comments
              </Typography>
              {comments?.map((comment, index) => (
                <Typography key={index} gutterBottom variant="subtitle1">
                  {comment}
                </Typography>
              ))}
              <div ref={commentsRef} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
              <Typography gutterBottom variant="h6">
                Write a comment
              </Typography>
              <TextField
                fullWidth
                rows={4}
                variant="outlined"
                label="Comment"
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <br />
              <Button
                style={{ marginTop: "10px" }}
                fullWidth
                disabled={!comment.length}
                color="primary"
                variant="contained"
                onClick={handleComment}
              >
                Comment
              </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CommentSection;
