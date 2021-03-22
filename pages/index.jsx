import styled from 'styled-components';
import jwt from 'jsonwebtoken';
import * as cookie from 'cookie';
import { Component } from "react";

const now = new Date();
const yesterday = new Date();
const tomorrow = new Date();
yesterday.setDate(now.getDate() - 1);
tomorrow.setDate(now.getDate() + 1);
const days = ["일", "월", "화", "수", "목", "금", "토"];
let hours = now.getHours();
const minutes = now.getMinutes();
const day = now.getDay()
const currentDay = days[day];

const TableContainer = styled.div`
  th, td {
    padding: 12px;
    font-size: 24px;
  }
`


let messages;
let classmsg = '';
let classlink = '';

if (now.getDay() === 6 || now.getDay() === 0) {
    messages = '오늘은 즐거운 주말!'
} else {
    if (hours <= 7) {
        messages = '좋은 아침!'
    }
    if (hours === 8 && minutes <= 50) {
        messages = '조회 시간!'
    }
    if (hours === 8 && minutes >= 50 || hours === 9 && minutes < 35) {
        messages = '1교시 하자!'
        if (day === 1 || day === 2) {
            classmsg = '역사 수업 들어가기'
            classlink = 'https://zoom.us/j/95518576742'
        }
        if (day === 3 || day === 4) {
            classmsg = '영어B 수업 들어가기'
        }
    }
    if (hours === 9 && minutes >= 35 || hours === 10 && minutes < 25) {
        messages = '2교시 하자!'
        if (day === 2) {
            classmsg = '국어 수업 들어가기'
            classlink = 'https://zoom.us/j/7183222256'
        }
        if (day === 4) {
            classmsg = '과학B 수업 들어가기'
        }
    }
    if (hours === 10 && minutes >= 25 || hours === 11 && minutes < 15) {
        messages = '3교시 하자!'
        if (day === 1) {
            classmsg = '사회 수업 들어가기'
        }
        if (day === 3) {
            classmsg = '국어 수업 들어가기'
            classlink = 'https://zoom.us/j/7183222256'
        }
    }
    if (hours === 11 && minutes >= 15 || hours === 12 && minutes < 5) {
        messages = '4교시 하자!'
        if (day === 2) {
            classmsg = '과학B 수업 들어가기'
        }
        if (day === 3) {
            classmsg = '수학 수업 들어가기'
        }
        if (day === 4) {
            classmsg = '사회 수업 들어가기'
        }
    }
    if (hours === 12 && minutes >= 5 || hours === 12 && minutes < 55) {
        messages = '즐거운 점심시간!'
    }
    if (hours === 12 && minutes >= 55 || hours === 13 && minutes < 40) {
        messages = '5교시 하자!'
        if (day === 3) {
            classmsg = '과학A 수업 들어가기'
        }
        if (day === 5) {
            classmsg = '수학 수업 들어가기'
        }
    }
    if (hours === 13 && minutes >= 40 || hours === 14 && minutes < 30) {
        messages = '6교시 하자!'
        if (day === 1 || day === 4) {
            classmsg = '국어 수업 들어가기'
            classlink = 'https://zoom.us/j/7183222256'
        }
        if (day === 5) {
            classmsg = '과학A 수업 들어가기'
        }
    }
    if (now.getDay() === 2 || now.getDay() === 4) {
        if (hours === 14 && minutes >= 35 || hours === 15 && minutes < 20) {
            messages = '7교시 하자!'
            if (day === 2) {
                classmsg = '사회 수업 들어가기'
            }
        }
        if (hours === 15 && minutes >= 20 || hours === 23 && minutes < 59) {
            messages = '오늘 하루 고생했어요!'
        }
    } else {
        if (hours === 14 && minutes >= 30 || hours >= 15) {
            messages = '오늘 하루 고생했어요!'
        }
    }
}

export async function getServerSideProps(ctx) {
    const today = await (await fetch(`https://schoolmenukr.ml/api/middle/B100002273?year=${now.getFullYear()}&month=${now.getMonth() + 1}&date=${now.getDate()}&allergy=hidden`)).json()
    const _yesterday = await (await fetch(`https://schoolmenukr.ml/api/middle/B100002273?year=${yesterday.getFullYear()}&month=${yesterday.getMonth() + 1}&date=${yesterday.getDate()}&allergy=hidden`)).json()
    const _tomorrow = await (await fetch(`https://schoolmenukr.ml/api/middle/B100002273?year=${tomorrow.getFullYear()}&month=${tomorrow.getMonth() + 1}&date=${tomorrow.getDate()}&allergy=hidden`)).json()
    let data = []
    data.push(_yesterday.menu[0].lunch)
    data.push(today.menu[0].lunch)
    data.push(_tomorrow.menu[0].lunch)
    let key = null;
    try {
        const cookies = cookie.parse(ctx.req.headers.cookie);
        const user = cookies.token;
        key = jwt.verify(user, 'seokgwanms');
    } catch {
        key = null
    }
    return {
        props: {
            data: data,
            token: key
        }
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div className='text-center font-bold'>
                <h1 className='text-5xl my-10'>🧭학교 시간 알리미</h1>
                <h3 className='text-1xl'>지금 시각</h3>
                <h2 className='text-2xl'>{`${this.state.date.getMonth() + 1}월 ${this.state.date.getDate()}일 ${currentDay}요일`}</h2>
                <h1 className='text-8xl font-black my-6'>
                    {
                        `${(this.state.date.getHours().toString().length === 1) ? (`0${this.state.date.getHours()}`) : (this.state.date.getHours())}:${(this.state.date.getMinutes().toString().length === 1) ? (`0${this.state.date.getMinutes()}`) : (this.state.date.getMinutes())}:${(this.state.date.getSeconds().toString().length === 1) ? (`0${this.state.date.getSeconds()}`) : (this.state.date.getSeconds())}`
                    }
                </h1>
                <h1 className='text-2xl'>{messages}</h1>
                <h2 className='text-2xl'>{(classmsg.length === 0) ? '현재 줌 수업은 없습니다.' : <a href={classlink}>{classmsg}</a>}</h2>
                <TableContainer>
                    <table className="mx-auto">
                        <thead>
                        <th style={{ borderLeft: 'solid 5px' }}>시간표</th>
                        <tr className="font-black">
                            <th>교시/요일</th>
                            <th>월</th>
                            <th>화</th>
                            <th>수</th>
                            <th>목</th>
                            <th>금</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>1교시</th>
                            <td>역사</td>
                            <td>역사</td>
                            <td>영어B</td>
                            <td>영어B</td>
                            <td>스클</td>
                        </tr>
                        <tr>
                            <th>2교시</th>
                            <td>기술</td>
                            <td>국어</td>
                            <td>음악</td>
                            <td>과학B</td>
                            <td>영어A</td>
                        </tr>
                        <tr>
                            <th>3교시</th>
                            <td>사회</td>
                            <td>수학</td>
                            <td>국어</td>
                            <td>스클</td>
                            <td>가정</td>
                        </tr>
                        <tr>
                            <th>4교시</th>
                            <td>음악</td>
                            <td>과학B</td>
                            <td>수학</td>
                            <td>사회</td>
                            <td>체육</td>
                        </tr>
                        <tr>
                            <th>5교시</th>
                            <td>영어A</td>
                            <td>기술</td>
                            <td>과학A</td>
                            <td>미술</td>
                            <td>수학</td>
                        </tr>
                        <tr>
                            <th>6교시</th>
                            <td>국어</td>
                            <td>미술</td>
                            <td>체육</td>
                            <td>국어</td>
                            <td>과학A</td>
                        </tr>
                        <tr>
                            <th>7교시</th>
                            <td />
                            <td>사회</td>
                            <td />
                            <td>가정</td>
                            <td />
                        </tr>
                        </tbody>
                    </table>
                </TableContainer>
                <div className='my-20 container mx-auto gap-2 flex-col lg:flex-row flex'>
                    <div className="bg-black rounded-xl p-6 text-white lg:w-1/3">
                        <h1 className="text-3xl mb-4">어제 급식이 뭐였지?</h1>
                        <p className="text-xl">{`${(this.props.data[0].length === 0) ? '어제는 급식이 없었어요!' : this.props.data[0].join(', ')}`}</p>
                    </div>
                    <div className="bg-black rounded-xl p-6 text-white lg:w-1/3">
                        <h1 className="text-3xl mb-4">오늘 급식은 뭐야?!</h1>
                        <p className="text-xl">{`${(this.props.data[1].length === 0) ? '오늘은 급식이 없어요!' : this.props.data[1].join(', ')}`}</p>
                    </div>
                    <div className="bg-black rounded-xl p-6 text-white lg:w-1/3">
                        <h1 className="text-3xl mb-4">내일 급식은 뭘까?</h1>
                        <p className="text-xl">{`${(this.props.data[2].length === 0) ? '내일은 급식이 없어요!' : this.props.data[2].join(', ')}`}</p>
                    </div>
                </div>
            </div>
        )
    }
    }

export default Home;