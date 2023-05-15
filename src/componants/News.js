import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {

  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResult] = useState(0);

  const updatenews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    document.title = `${(props.category).charAt(0).toUpperCase() + (props.category).slice(1)} - NewsJungle`
    setloading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setarticles(parseData.articles);
    settotalResult(parseData.totalResults);
    setloading(false);
    props.setProgress(100);

  }

  useEffect(() => {
    updatenews();
  }, []);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page + 1);
    document.title = `${(props.category).charAt(0).toUpperCase() + (props.category).slice(1)} - NewsJungle`
    let data = await fetch(url);
    let parseData = await data.json();
    setarticles(articles.concat(parseData.articles));
    settotalResult(parseData.totalResults);
  }

  // for using next and previous button!!
  // const handleNextClick = async () => {
  //   updatenews();
  // setpage(page + 1);
  // };

  // const handlePreviousClick = async () => {
  //   updatenews();
  // setpage(page - 1);
  // };

  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: 90 }}>NewsJungle - Top {(props.category).charAt(0).toUpperCase() + (props.category).slice(1)} Headlines</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles !== totalResults}
        loader={loading && <Spinner/>}
      >
        <div className="container">
          <div className="row my-5">
            {!loading && articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    discription={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/* for using previous and next button jsx */}
      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            {" "}
            &larr; {this.state.page - 1} Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props .pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next {this.state.page} &rarr;{" "}
          </button>
        </div> */}
    </>
  );
}

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
