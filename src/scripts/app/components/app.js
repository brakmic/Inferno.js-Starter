import Inferno from 'inferno';
import InfernoDOM from 'inferno-dom';
import Component from 'inferno-component';
import CarInfo from './car_info';
import CarDetails from './car_details';
import { ADD_CAR, SET_PIC } from '../actions';
import { carStore } from '../stores';

class App extends Component {
  constructor(props) {
    super(props);
    this.initTools(); // for console debugging
    this.state = {
      car: undefined,
      picture: undefined
    }
    this.setSelectedCar = this.setSelectedCar.bind(this);
  }

  setSelectedCar(car, id, make){
    this.setState({
      car,
      picture: '/static/content/images/' + car.toLowerCase() + '.png'
    });
    carStore.dispatch({ type: ADD_CAR, payload: { id: id, data: { name: car, make: car }}});
  }

  initTools() {
    carStore.subscribe(() => console.log(`Added car to store.`));
    window.app = {
      carStore
    };
  }

  render() {
    var self = this;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="list-group">
              { [ 'Volvo', 'BMW', 'Mercedes' ].map((car, idx) => {
                return (
                  <CarInfo onCarSelected={self.setSelectedCar} name={car} id={idx} make={car} key={idx}/>
                );
              })}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <CarDetails picture={self.state.picture} info={self.state.car}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
