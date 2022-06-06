import React from 'react';
import useStyles from './styles.js';
import { Skeleton } from '@material-ui/lab';
import { Divider, Grid } from '@material-ui/core';

const SkeletonAnimation = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={6}
      alignItems="stretch"
      justifyContent="space-around"
    >
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Grid>
          {/* title */}
          <Skeleton animation="wave" className={classes.boxing} height="60px" />
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3}>
          {/* tags */}
          <Skeleton animation="wave" height="25px" />
        </Grid>
        <Grid>
          {/* message */}
          <Skeleton
            animation="wave"
            className={classes.boxing}
            height="120px"
          />
        </Grid>
        <Grid>
          {/* author */}
          <Skeleton animation="wave" height="40px" />
        </Grid>
        <Grid>
          {/* time */}
          <Skeleton animation="wave" height="40px" />
        </Grid>
        <Divider style={{ margin: '20px 0' }} />
        {/* Realtime */}
        <Grid>
          {/* chat */}
          <Skeleton animation="wave" height="60px" />
        </Grid>
        <Divider style={{ margin: '20px 0' }} />
        {/* <CommentSection post={post} /> */}
        <div>
          <Grid
            container
            spacing={3}
            alignItems="stretch"
            justifyContent="space-between"
          >
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Skeleton animation="wave" height="160px" />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Skeleton animation="wave" height="160px" />
            </Grid>
          </Grid>
        </div>
        <Divider style={{ margin: '20px 0' }} />
      </Grid>

      {/* media */}
      <Grid height="525px" item xs={12} sm={12} md={6} lg={6}>
        <Skeleton animation="wave" height={515} />
      </Grid>
    </Grid>
  );
};

export default SkeletonAnimation;
