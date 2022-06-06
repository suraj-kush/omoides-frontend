import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './Post/Post.js';
import useStyles from './styles.js';

const Posts = ({ setCurrentID }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);
  // console.log(posts);

  if (!posts.length && !isLoading) return 'NO POSTS';

  return isLoading ? (
    <div className={classes.loading}>
      <CircularProgress  size="5em"/>
    </div>
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentID={setCurrentID} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
