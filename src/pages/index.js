import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { PostPreviewFull, PostPreviewHalf } from "../components/Posts";

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const { node: firstPost } = posts[0];
    return (
      <Layout>
        <div className="level">
          <p>Vítejte na stránkách Čtvrtkonu - Jihočeské Webové komunity.</p>
        </div>
        <h4 className="title is-4">Příští Čtvrtkon / Pozvánka</h4>
        <div className="columns">
          <PostPreviewFull slug={firstPost.fields.slug} post={firstPost.frontmatter}/>
        </div>
        <h4 className="title is-4 mt-2">Přednášky z minulých akcí</h4>
        <div className="columns is-multiline">
          {posts
            .filter((_, idx) => idx > 0) // skip first post as its part of full preview
            .map(({ node: post }) => (
              <PostPreviewHalf key={post.id} slug={post.fields.slug} post={post.frontmatter}/>
            ))}
        </div>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
      limit: 5
    ) {
      edges {
        node {
          excerpt(pruneLength: 700)
          id
          fields {
            slug
          }
          frontmatter {
            title
            image
            description
            templateKey
            date(formatString: "DD.MM.YYYY")
          }
        }
      }
    }
  }
`;
