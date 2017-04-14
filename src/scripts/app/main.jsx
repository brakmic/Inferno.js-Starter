import Inferno from 'inferno';
import Component from 'inferno-component';

import '../../../static/bootstrap/css/bootstrap.css';
import '../../../static/bootstrap/css/bootstrap-theme.css';
import '../../../static/bootstrap/js/bootstrap.js';
import { App } from './components';

Inferno.render(<App />, document.getElementById('app'));
