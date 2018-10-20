import React from 'react';
import Feed from './components/Feed';
import App from 'grommet/components/App';
import Toast from 'grommet/components/Toast';
import { connect } from 'react-redux';
import { setGlobalToast, clearGlobalToast } from './actions/App';

class AppComponent extends React.Component {
    render() {
        const { globalToast, clearGlobalToast } = this.props;

        return (
            <App centered={false}>
                {(globalToast && globalToast.message && globalToast.status) &&
                    <Toast
                        status={globalToast.status}
                        onClose={clearGlobalToast}
                    >
                        {globalToast.message}
                    </Toast>
                }
                <Feed />
            </App>
        );
    }
}

const mapStateToProps = state => ({
    globalToast: state.app.get('globalToast').toJS()
});

const mapDispatchToProps = dispatch => ({
    setGlobalToast: (payload) => dispatch(setGlobalToast(payload)),
    clearGlobalToast: () => dispatch(clearGlobalToast())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
