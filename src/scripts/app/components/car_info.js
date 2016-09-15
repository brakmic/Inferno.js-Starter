import Inferno from 'inferno';
import InfernoDOM from 'inferno-dom';
import Component from 'inferno-component';

class CarInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeClass: 'none',
      name: '',
      id: '',
      make: ''
    };

    this.click = this.click.bind(this);
  }

  click(){
    // console.log('Clicked on ' + this.props.name);
    this.props.onCarSelected(this.props.name, this.props.id, this.props.make);
  }

  componentWillReceiveProps(nextProps) {
    //  console.log('CarInfo for ' + this.props.name + ' will receive these props: ' + JSON.stringify(nextProps, null, 4));
  }

  render(props) {
    return (
          <a href="#"
            className={"list-group-item " + this.state.activeClass}
            onClick={this.click}>
            {this.props.name}
         </a>
    );
  }
}

export default CarInfo;
