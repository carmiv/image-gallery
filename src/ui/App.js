import React, { Component } from 'react';
import axios from 'axios';

import Navigation from './components/Navigation';
import Gallery from './components/Gallery';
import Copyright from './components/Copyright';
import Modal from './components/Modal';

const galleryOptions = [{ name: 'animals', icon: 'd' }, { name: 'fruitsAndVegetables', icon: 'e' }];
const viewOptions = [
  { name: 'gridView', icon: 'c' },
  { name: 'horizontalView', icon: 'f' },
  { name: 'verticalView', icon: 'b' },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animalsArr: [],
      fruitsAndVegetables: [],
      galleryArr: [],
      selectedGallery: 'animals',
      selectedView: 'gridView',
      modalState: null,
      modalData: '',
    };
  }

  componentDidMount() {
    this.getAnimals();
    this.getFruitVeg();
  }

  getAnimals() {
    return axios
      .get('http://styleguide.effectivedigital.com/interview/api/animals')
      .then(response => this.setState({ animalsArr: response.data, galleryArr: response.data }));
  }

  getFruitVeg() {
    axios
      .get('http://styleguide.effectivedigital.com/interview/api/fruitveg')
      .then(response => this.setState({ fruitsAndVegetablesArr: response.data }));
  }

  changeGallery(selectedGallery) {
    this.setState({
      selectedGallery: selectedGallery,
      galleryArr: this.state[`${selectedGallery}Arr`],
    });
  }

  changeView(selectedView) {
    this.setState({ selectedView: selectedView });
  }

  openItemModal(itemData) {
    this.setState({ modalState: 'openModal', modalData: itemData });
    document.querySelector('body').style.overflow = 'hidden';
  }

  closeItemModal() {
    this.setState({ modalState: 'closeModal', modalData: [] });
    document.querySelector('body').style.overflow = 'auto';
  }

  title(title) {
    return title.charAt(0).toUpperCase() + title.slice(1).replace(/([A-Z])/g, ' $1');
  }

  render() {
    const { selectedGallery, selectedView, galleryArr, modalState, modalData } = this.state;
    const fixedClassName = selectedView === 'verticalView' ? 'fixed': '';
    return (
      <section className="App">
        <nav className="nav-bar">
          <Navigation
            name="gallery"
            navOptions={galleryOptions}
            selectedOption={selectedGallery}
            changeSelection={this.changeGallery.bind(this)}
            title={this.title.bind(this)}
          />

          <Navigation
            name="view"
            navOptions={viewOptions}
            selectedOption={selectedView}
            changeSelection={this.changeView.bind(this)}
            title={this.title.bind(this)}
          />
        </nav>

        <div id="content" className="app-body">
          <h1 id="title" className={fixedClassName}>Image Gallery</h1>
          <h2 id="subheader" className={`selected-gallery ${fixedClassName}`}>{`/ ${this.title(
            selectedGallery
          )} / ${this.title(selectedView)}`}</h2>
          <Gallery
            galleryItems={galleryArr}
            selectedView={selectedView}
            openItemModal={this.openItemModal.bind(this)}
          />

          <Copyright />
        </div>

        <Modal mode={modalState} closeModal={this.closeItemModal.bind(this)} data={modalData} />


      </section>
    );
  }
}

export default App;
