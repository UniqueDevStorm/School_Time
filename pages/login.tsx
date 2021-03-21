import { Component } from "react";
import { Input } from 'semantic-ui-react';

export default class login extends Component {
    render() {
        return (
            <div className='text-center'>
                <Input
                    label={{ basic: true, content: '학번' }}
                    placeholder='학번을 입력해주세요'
                />
            </div>
        )
    }
}