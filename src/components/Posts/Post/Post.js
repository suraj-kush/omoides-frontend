import React, { useState } from "react";
//prettier-ignore
import {Card, Typography, CardActions, CardContent, CardMedia, Button} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleleIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useHistory } from "react-router-dom";

import useStyles from "./styles.js";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts.js";

const Post = ({ post, setCurrentID }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);
  const userID = user?.result?.googleId || user?.result?._id;
  const hasLikedPost = likes.find((like) => like === userID);

  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(likes.filter((id) => id !== userID));
    } else {
      setLikes([...post.likes, userID]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === userID
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} elevation={3}>
      <div className={classes.view} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.googleId || user?.result?._id) === post.creator && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white", minWidth: "24px" }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentID(post._id);
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5">
          {post.title}
        </Typography>
        <CardContent>
          <Typography ariant="body1" component="p" color="textSecondary">
            {post.message}
          </Typography>
        </CardContent>
      </div>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId || user?.result?._id) === post.creator && (
          <Button
            size="small"
            color="primary"
            className={classes.deleteBtn}
            align="right"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleleIcon fontSize="small" color="error" />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
