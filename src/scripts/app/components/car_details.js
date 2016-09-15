import Inferno from 'inferno';
import InfernoDOM from 'inferno-dom';
import Component from 'inferno-component';

class CarDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      picture: '',
      info: ''
    }
  }
  render(props){
    return (
        <div>
          {this.props.picture ? <img src={this.props.picture} width="700" height="500" /> : <div/>}
          <div className="note">
          <textarea className="form-control" ref="carText" value={this.props.info}></textarea>
          </div>
        </div>
      );
  }
}

export default CarDetails;
