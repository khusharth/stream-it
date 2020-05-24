import React from "react";
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        // loads client portion of library
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '943625806461-am4koo1e2jn1t3no705ba9bhijr198ag.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                // to load the auth2 library from google
                this.auth = window.gapi.auth2.getAuthInstance();

                this.onAuthChange(this.auth.isSignedIn.get());
                // listens to event for user signing in and out
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    // this.auth.currentUser.get().getId() -> returns the google id of the user
    // Google Id is created when user creates an account on google
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn === true) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, {
    signIn,
    signOut
})(GoogleAuth);