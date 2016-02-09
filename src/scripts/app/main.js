import Inferno from 'inferno';
import InfernoDOM from 'inferno-dom';
import { Component } from 'inferno-component';

import 'bootstrap.css';
import 'bootstrap-theme.css';
import 'bootstrap.js';

class CarDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      picture: null
    }
  }
  render(props){
    return (
        <div>
          {this.props.picture ? <img src={this.props.picture} width="700" height="500" /> : <div/>}
        </div>
      );
  }
}

class CarInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeClass: 'none'
    };

    this.blur = this.blur.bind(this);
    this.focus = this.focus.bind(this);
    this.click = this.click.bind(this);
  }

  blur() {
    this.setState({
      activeClass :  ''
    });
    console.log(new Date(), ': BLUR');
  }

  focus() {
    this.setState({
      activeClass : 'active'
    });
    console.log(new Date(), ': FOCUS');
  }

  click(){
    console.log('Clicked on ' + this.props.name + ', activeClass is: ' + this.state.activeClass);
    this.props.onCarSelected(this.props.name);
  }

  render(props) {
    return (
          <a href="#"
            class={"list-group-item " + this.state.activeClass}
            onBlur={this.blur}
            onFocus={this.focus}
            onClick={this.click}>
            {this.props.name}
         </a>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCar: null,
      carPicture: null
    }
    this.setSelectedCar = this.setSelectedCar.bind(this);
  }
  setSelectedCar(car){
    this.setState({
      selectedCar: car,
      carPicture: 'content/images/' + car.toLowerCase() + '.png'
    });
    console.log('Picture: ' + this.state.carPicture);
  }

  render() {
    var self = this;
    return (
      <div clas="container">
        <div class="row">
          <div class="col-md-3">
            <div class="list-group">
              { [ 'Volvo', 'BMW', 'Mercedes' ].map((car) => {
                return (
                  <CarInfo onCarSelected={self.setSelectedCar} value={car} name={car}/>
                );
              })}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8">
            <CarDetails picture={self.state.carPicture}/>
          </div>
        </div>
      </div>
    );
  }
}

InfernoDOM.render(<App />, document.getElementById('app'));