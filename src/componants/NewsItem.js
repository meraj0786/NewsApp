import React from "react";

function NewsItem(props) {
  let { title, discription, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">

        <div style={{ display: "flex", justifyContent: "flex-end", position: "absolute", right: 0 }}>
          <span className="badge rounded-pill bg-danger"> {source} </span>
        </div>

        <img
          src={
            !imageUrl
              ? "https://img.freepik.com/free-vector/abstract-coming-soon-halftone-style-background-design_1017-27282.jpg"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{discription}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {!author ? "Unknown" : author} on{new Date(date).toString()}
            </small>
          </p>
          <a rel="noreferrer" href={newsUrl}  target="_blank" className="btn btn-dark btn-sm" > Read more </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
