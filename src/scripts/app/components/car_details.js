import Inferno from 'inferno';
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
    var self = this;
    return (
        <div>
          {self.props.picture ? <img src={self.props.picture} width="700" height="500" /> : <div/>}
          <div className="note">
          <textarea className="form-control" value={self.props.info}></textarea>
          </div>
        </div>
      );
  }
}

export default CarDetails;
