import { Component } from "react";
import { Input, Button, Container, Header } from 'semantic-ui-react';
import styled from "styled-components";

export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {visibility: 'hidden'}
    }
    render() {
        return (
            <div className='text-center my-10'>
                <Input
                    label={{ basic: true, content: '학번' }}
                    placeholder='학번을 입력해주세요'
                    id='classnumber'
                />
                <Button onClick={() => {
                    const value = document.getElementById('classnumber').value;
                    if (value.length === 5) {
                        
                    } else {
                        this.setState({ visibility: 'visible' })
                        setTimeout(() => this.setState({ visibility: 'hidden' }), 3000)
                    }
                }}>Enter</Button>

                <Container className='my-5 bg-red-500 p-8 lg:w-1/3 rounded-xl' style={{ visibility: this.state.visibility }}>
                    <Header as='h2'>Warning</Header>
                    <p>
                        학번은 정상적으로 써주세요.
                    </p>
                </Container>
            </div>
        )
    }
}