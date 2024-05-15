import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Login from './Login'
import Dashboard from './Dashboard';
const code = new URLSearchParams(window.location.search).get('code'); //get code url from login

class App extends React.Component {
  componentDidMount() {
    // Set up the ResizeObserver
    this.resizeObserver = new ResizeObserver(entries => {
      // Your code handling resize events
    });

    try {
      // Start observing
      this.resizeObserver.observe(/* your target element */);
    } catch (error) {
      // Handle the error here
      console.error('Error in ResizeObserver:', error);
    }
  }

  componentWillUnmount() {
    // Disconnect the ResizeObserver
    this.resizeObserver.disconnect();
  }

  render() {
  return code ? <Dashboard code = {code}/> : <Login/>
}
}

export default App;
