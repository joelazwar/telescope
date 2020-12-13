import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'gatsby-image';
import { StaticQuery, graphql } from 'gatsby';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'scroll',
    backgroundSize: 'cover',
    transition: 'opacity 1s ease-in-out',
    position: 'absolute',
    height: 'calc(100vh - 64px)',
    [theme.breakpoints.between('xs', 'sm')]: {
      height: 'calc(100vh - 56px)',
    },
    width: '100%',
    opacity: '.45',
    top: 0,
  },
  child: {
    transition: 'opacity 1s ease-in-out',
  },
}));

const randomGenerator = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const DynamicImage: FC = () => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        {
          allImageSharp {
            edges {
              node {
                id
                fluid(quality: 75) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      `}
      render={(data) => {
        const { allImageSharp } = data;
        const { edges } = allImageSharp;
        const randomPosition = randomGenerator(0, edges.length - 1);
        const randomizedImage = edges[randomPosition].node;
        return <Image className={classes.background} fluid={randomizedImage.fluid} />;
      }}
    />
  );
};

export default DynamicImage;
