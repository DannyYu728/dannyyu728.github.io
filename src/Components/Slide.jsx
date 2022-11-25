import React, { Component } from "react";

class Slide extends Component {
  constructor(props) {
    super(props);
    this.slide = React.createRef();
  }

  handleMouseMove = (event) => {
    const el = this.slide.current;
    const r = el.getBoundingClientRect();
    el.style.setProperty(
      "--x",
      event.clientX - (r.left + Math.floor(r.width / 2))
    );
    el.style.setProperty(
      "--y",
      event.clientY - (r.top + Math.floor(r.height / 2))
    );
  };

  handleMouseLeave = (event) => {
    this.slide.current.style.setProperty("--x", 0);
    this.slide.current.style.setProperty("--y", 0);
  };

  handleSlideClick = (event) => {
    this.props.handleSlideClick(this.props.slide.index);
  };

  imageLoaded = (event) => {
    event.target.style.opacity = 1;
  };

  render() {
    const { src, summary, headline, index, stack } = this.props.slide;
    const current = this.props.current;
    let classNames = "slide";

    if (current === index) classNames += " slide--current";
    else if (current - 1 === index) classNames += " slide--previous";
    else if (current + 1 === index) classNames += " slide--next";

    return (
      <li
        ref={this.slide}
        className={classNames}
        onClick={this.handleSlideClick}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="slide__image-wrapper">
          <img
            className="slide__image"
            alt={headline}
            src={src}
            onLoad={this.imageLoaded}
          />
        </div>
        <article className="slide__content">
          <h2 className="slide__headline">{headline}</h2>
          <button className="slide__action formBtn btn2" onClick={this.props.learnMore}>Learn More</button>
          <div className="con">
            {stack.map((e, i) => {
              return <img className="btn2" src={e} key={i} />;
            })}
          </div>
        </article>
      </li>
    );
  }
}

export default Slide;
