import React from 'react';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: ""
        };
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleOnClick = (e) => {
        console.log(this.state.email, this.state.name);
    };

    render() {
        return (
            <form>
                <h2>회원가입</h2>
                <input type='email' name='email' placeholder='이메일' onChange={this.handleChange}/><br></br>
                <input type='text' name='name' placeholder='이름' onChange={this.handleChange}/><br></br>
                <button type='button' onClick={this.handleOnClick}>로그인</button>
            </form>
        );
    };
}

export default SignUp;