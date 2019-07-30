import React from 'react';
import Appbar from './components/Appbar';

class App extends React.Component {

    render() {
        return (
            <div>
                <Appbar/>
                {this.props.children}
            </div>
        );
    }
}

export default App;
