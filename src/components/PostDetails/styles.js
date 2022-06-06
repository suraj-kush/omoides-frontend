import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  boxing:{
    padding: '0px',
    margin: '0px',
  },
  root: {
    padding: '20px',
    borderRadius: '15px'
  },
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '515px',
    maxWidth:'800px'
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column-reverse'
    }
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    // height: '39vh'
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  commentsInnerContainer: {
    height: '160px',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 0
    }
  }
}));
