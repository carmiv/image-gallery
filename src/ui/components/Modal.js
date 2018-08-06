import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderData(data) {
    const dataToIgnore = ['Width', 'Height', 'ImageURLs', 'Id', 'Title'];
    return Object.keys(data).map((title, index) => {
      if (dataToIgnore.includes(title)) {
        return false;
      }
      return (
        <div key={index} className={`content content-${title}`}>
          <span className="title">{title}</span>
          <div className="data">{data[title]}</div>
        </div>
      );
    });
  }

  render() {
    const { data, mode, closeModal } = this.props;
    const { Title, ImageURLs } = data;

    return (
      <div id="modal" className={`modal-overlay ${mode}`}>
        <div className="modal-container">
          <span className="close-button" onClick={closeModal}>
            &times;
          </span>
          <h1>{Title}</h1>
          <div className="row">
            <div className="image-container">
              <img src={ImageURLs && ImageURLs.FullSize} alt="" className="image" />
            </div>

            <div className="modal-content-container">
              {this.renderData(data)}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Modal;
