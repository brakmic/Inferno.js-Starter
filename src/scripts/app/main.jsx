import Inferno from 'inferno';
import InfernoDOM from 'inferno-dom';
import Component from 'inferno-component';

import 'bootstrap.css';
import 'bootstrap-theme.css';
import 'bootstrap.js';
import { App } from './components';

InfernoDOM.render(<App />, document.getElementById('app'));
