import React from 'react';

const Gallery = ({ galleryItems, selectedView, openItemModal }) => {

  const isMobile = window.innerWidth < 767;

  const truncate = (descr, num) => {
    return descr
      .split(' ')
      .splice(0, num)
      .join(' ');
  };

  const renderItems = () => {

    // FullSize Image is used for better quality photos.

    return galleryItems.map(item => {
      const { Id, ImageURLs, Title, Description } = item;
      let description;

      if (isMobile) {
        description = `${truncate(Description, 18)}...`;
      } else if (selectedView !== 'horizontalView') {
        description = `${truncate(Description, 25)}...`;
      } else {
        description = Description;
      }

      if (selectedView === 'verticalView') {
        return (
          <li key={Id} className="list-container">
            <div className="gallery-item" onClick={() => openItemModal(item)}>
              <img src={ImageURLs.FullSize} alt="" className="image" />
              <div className="content">
                <h3>{Title}</h3>
                <p>{description}</p>
              </div>
            </div>
          </li>
        );
      }
      return (
        <li key={Id} className="gallery-item" onClick={() => openItemModal(item)}>
          <img src={ImageURLs.FullSize} alt="" className="image" />
          <div className="content">
            <h3>{Title}</h3>
            <p>{description}</p>
          </div>
        </li>
      );
    });
  };

  return (
    <div id="gallery" className={`gallery gallery-${selectedView}`}>
      <ul id="gallery-list" className={`list-${selectedView}`}>
        {renderItems()}
      </ul>
    </div>
  );
};

export default Gallery;
