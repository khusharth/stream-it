import React from "react";

class GoogleAuth extends React.Component {
    state = { isSignedIn: null };
    componentDidMount() {
        // loads client portion of library
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '943625806461-am4koo1e2jn1t3no705ba9bhijr198ag.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                // to load the auth2 library from google
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                // listens to event for user signing in and out
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn === true) {
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

export default GoogleAuth;