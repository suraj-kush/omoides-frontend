import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { getPosts } from "../actions/posts";

import useStyles from "./styles.js";

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { totalPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page, dispatch]);

  //   const handleChange = (event, value) => {
  //     setCurrentPage(value);
  //   };
  return (
    <Pagination
      count={totalPages}
      page={Number(page) || 1}
      classes={{ ul: classes.ul }}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
