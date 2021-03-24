import { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { NextSeo } from "next-seo";

const now = new Date();
const yesterday = new Date();
const tomorrow = new Date();
const month = {
    yesterday: yesterday.getMonth().toString(),
    today: now.getMonth().toString(),
    tomorrow: tomorrow.getMonth().toString()
}
const date = {
    yesterday: yesterday.getDate() + 1,
    today: now.getDate() + 1,
    tomorrow: tomorrow.getDate() + 1
}
yesterday.setDate(now.getDate() - 1);
tomorrow.setDate(now.getDate() + 1);
if (yesterday.getMonth().toString().length === 1) {
    month.yesterday = `0${yesterday.getMonth() + 1}`
}
if (now.getMonth().toString().length === 1) {
    month.today = `0${now.getMonth() + 1}`
}
if (tomorrow.getMonth().toString().length === 1) {
    month.tomorrow = `0${tomorrow.getMonth() + 1}`
}
if (yesterday.getDate().toString().length === 1) {
    date.yesterday = `0${yesterday.getDate()}`
}
if (now.getDate().toString().length === 1) {
    date.today = `0${yesterday.getDate()}`
}
if (tomorrow.getDate().toString().length === 1) {
    date.tomorrow = `0${tomorrow.getDate()}`
}
const days = ["일", "월", "화", "수", "목", "금", "토"];
let hours = now.getHours();
const minutes = now.getMinutes();
const day = now.getDay()
const currentDay = days[day];

const option = {
    seokgwan: [
        { key: 1, text: '2반', value: 'second' },
        { key: 2, text: '6반', value: 'sixth' }
    ],
    byeolgram: [
        { key: 1, text: '10반', value: 'tenth' }
    ]
}

const ms = {
    seokgwan : {
        second: [
            [
                '역사',
                '역사',
                '영어B',
                '영어B',
                '스클'
            ],
            [
                '기술',
                '국어',
                '음악',
                '과학B',
                '영어A'
            ],
            [
                '사회',
                '수학',
                '국어',
                '스클',
                '가정'
            ],
            [
                '음악',
                '과학B',
                '수학',
                '사회',
                '체육'
            ],
            [
                '영어A',
                '기술',
                '과학A',
                '미술',
                '수학'
            ],
            [
                '국어',
                '미술',
                '체육',
                '국어',
                '과학A'
            ],
            [
                '',
                '사회',
                '',
                '가정',
                ''
            ]
        ],
        sixth: [
            [
                '기술',
                '과학B',
                '음악B',
                '국어',
                '국어'
            ],
            [
                '음악',
                '수학',
                '기술',
                '가정',
                '스클'
            ],
            [
                '미술',
                '역사',
                '영어A',
                '과학A',
                '과학B'
            ],
            [
                '사회',
                '체육',
                '미술',
                '수학',
                '과학A'
            ],
            [
                '영어B',
                '가정',
                '사회',
                '역사',
                '체육'
            ],
            [
                '국어',
                '국어',
                '수학',
                '스클',
                '사회'
            ],
            [
                '',
                '영어B',
                '',
                '영어A',
                ''
            ]
        ]
    },
    byeolgram: {
        tenth: [
            [
                '수학',
                '미술',
                '사회',
                '국어',
                '사회'
            ],
            [
                '체육',
                '미술',
                '영어',
                '역사',
                '국어'
            ],
            [
                '국어',
                '중국어',
                '과학',
                '중국어',
                '수학'
            ],
            [
                '과학',
                '과학',
                '체육',
                '영어',
                '역사'
            ],
            [
                '기가',
                '영어',
                '스클',
                '기가',
                '과학'
            ],
            [
                '역사',
                '국어',
                '스클',
                '수학',
                '체육'
            ],
            [
                '',
                '',
                '',
                '음악',
                '영어'
            ]
        ]
    }
}

const msoption = [
    { key: 1, text: '석관중학교', value: 'seokgwan' },
    { key: 2, text: '별가람중학교', value: 'byeolgram' }
]

class Home extends Component {
    static async getInitialProps() {
        const datas = {
            seokgwan: {
                today : await (await fetch(`https://schoolmenukr.ml/api/middle/B100002273?year=${now.getFullYear()}&month=${now.getMonth() + 1}&date=${now.getDate()}&allergy=hidden`)).json(),
                yesterday : await (await fetch(`https://schoolmenukr.ml/api/middle/B100002273?year=${yesterday.getFullYear()}&month=${yesterday.getMonth() + 1}&date=${yesterday.getDate()}&allergy=hidden`)).json(),
                tomorrow : await (await fetch(`https://schoolmenukr.ml/api/middle/B100002273?year=${tomorrow.getFullYear()}&month=${tomorrow.getMonth() + 1}&date=${tomorrow.getDate()}&allergy=hidden`)).json()
            },
            byeolgram: {
                today : await (await fetch(`https://schoolmenukr.ml/api/middle/J100005779?year=${now.getFullYear()}&month=${now.getMonth() + 1}&date=${now.getDate()}&allergy=hidden`)).json(),
                yesterday : await (await fetch(`https://schoolmenukr.ml/api/middle/J100005779?year=${yesterday.getFullYear()}&month=${yesterday.getMonth() + 1}&date=${yesterday.getDate()}&allergy=hidden`)).json(),
                tomorrow : await (await fetch(`https://schoolmenukr.ml/api/middle/J100005779?year=${tomorrow.getFullYear()}&month=${tomorrow.getMonth() + 1}&date=${tomorrow.getDate()}&allergy=hidden`)).json()
            }
        }
        return {
            data: datas
        }
    }

    constructor(props) {
        super(props);
        this.state = { date: new Date(), messages: '', classnm: 'second', msname: 'seokgwan', options: option.seokgwan, classmsg: '' };
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
        if (this.state.date.getDay() === 6 || this.state.date.getDay() === 0) {
            this.setState({ messages: '오늘은 즐거운 주말!' })
        } else {
            if (this.state.msname === 'seokgwan') {
                if (this.state.date.getHours() <= 7) {
                    this.setState({ messages: '좋은 아침!' })
                }
                if (this.state.date.getHours() === 8 && this.state.date.getMinutes() <= 50) {
                    this.setState({ messages: '조회 시간!' })
                }
                if (this.state.date.getHours() === 8 && this.state.date.getMinutes() >= 50 || this.state.date.getHours() === 9 && this.state.date.getMinutes() < 35) {
                    this.setState({ messages: '1교시 하자!', classmsg: ms['seokgwan'][this.state.classnm][0][this.state.date.getDay() - 1] })
                }
                if (this.state.date.getHours() === 9 && this.state.date.getMinutes() >= 35 || this.state.date.getHours() === 10 && this.state.date.getMinutes() < 25) {
                    this.setState({ messages: '2교시 하자!', classmsg: ms['seokgwan'][this.state.classnm][1][this.state.date.getDay() - 1] })
                }
                if (this.state.date.getHours() === 10 && this.state.date.getMinutes() >= 25 || this.state.date.getHours() === 11 && this.state.date.getMinutes() < 15) {
                    this.setState({ messages: '3교시 하자!', classmsg: ms['seokgwan'][this.state.classnm][2][this.state.date.getDay() - 1] })
                }
                if (this.state.date.getHours() === 11 && this.state.date.getMinutes() >= 15 || this.state.date.getHours() === 12 && this.state.date.getMinutes() < 5) {
                    this.setState({ messages: '4교시 하자!', classmsg: ms['seokgwan'][this.state.classnm][3][this.state.date.getDay() - 1] })
                }
                if (this.state.date.getHours() === 12 && this.state.date.getMinutes() >= 5 || this.state.date.getHours() === 12 && this.state.date.getMinutes() < 55) {
                    this.setState({ messages: '즐거운 점심시간!' })
                }
                if (this.state.date.getHours() === 12 && this.state.date.getMinutes() >= 55 || this.state.date.getHours() === 13 && this.state.date.getMinutes() < 40) {
                    this.setState({ messages: '5교시 하자!', classmsg: ms['seokgwan'][this.state.classnm][4][this.state.date.getDay() - 1] })
                }
                if (this.state.date.getHours() === 13 && this.state.date.getMinutes() >= 40 || this.state.date.getHours() === 14 && this.state.date.getMinutes() < 30) {
                    this.setState({ messages: '6교시 하자!', classmsg: ms['seokgwan'][this.state.classnm][5][this.state.date.getDay() - 1] })
                }
                if (this.state.date.getDay() === 2 || this.state.date.getDay() === 4) {
                    if (this.state.date.getHours() === 14 && this.state.date.getMinutes() >= 35 || this.state.date.getHours() === 15 && this.state.date.getMinutes() < 20) {
                        this.setState({ messages: '7교시 하자!', classmsg: ms['seokgwan'][this.state.classnm][6][this.state.date.getDay() - 1] })
                    }
                    if (this.state.date.getHours() === 15 && this.state.date.getMinutes() >= 20 || this.state.date.getHours() === 23 && this.state.date.getMinutes() < 59) {
                        this.setState({ messages: '오늘 하루 고생했어요!' })
                    }
                } else {
                    if (this.state.date.getHours() === 14 && this.state.getMinutes() >= 30 || this.state.date.getHours() >= 15) {
                        this.setState({ messages: '오늘 하루 고생했어요!' })
                    }
                }
            }
            if (this.state.classnm === 'byeolgram') {
                if (this.state.date.getHours() < 8 || this.state.date.getHours() === 8 && this.state.date.getMinutes() < 30 ) {
                    this.setState({ messages: '좋은 아침!' })
                }
                if (this.state.date.getHours() === 8 && this.state.date.getMinutes() >= 30 || this.state.date.getHours() === 9 && this.state.date.getMinutes() < 10) {
                    this.setState({ messages: '조회 시간!' })
                }
                if (this.state.date.getHours() === 9 && this.state.date.getMinutes() >= 10 || this.state.date.getHours() === 9 && this.state.date.getMinutes() < 55) {
                    this.setState({ messages: '1교시 하자!', classmsg: ms['byeolgram'][this.state.classnm][0][this.state.date.getDay() - 1] })
                }
                if (this.state.date.getHours() === 9 && this.state.date.getMinutes() >= 55 || this.state.date.getHours() === 10 && this.state.date.getMinutes() < 50) {
                    this.setState({ messages: '2교시 하자!', classmsg: ms['byeolgram'][this.state.classnm][1][this.state.date.getDay() - 1] })
                }
                if (this.state.date.getHours() === 10 && this.state.date.getMinutes() >= 50 || this.state.date.getHours() === 11 && this.state.date.getMinutes() < 45) {
                    this.setState({ messages: '3교시 하자!', classmsg: ms['byeolgram'][this.state.classnm][2][this.state.date.getDay() - 1] })
                }
                if (this.state.date.getHours() === 11 && this.state.date.getMinutes() >= 45 || this.state.date.getHours() === 12 && this.state.date.getMinutes() < 35) {
                    this.setState({ messages: '4교시 하자!', classmsg: ms['byeolgram'][this.state.classnm][3][this.state.date.getDay() - 1] })
                }
                if (this.state.date.getHours() === 12 && this.state.date.getMinutes() >= 35 || this.state.date.getHours() === 13 && this.state.date.getMinutes() < 20) {
                    this.setState({ messages: '즐거운 점심시간!' })
                }
                if (this.state.date.getHours() === 13 && this.state.date.getMinutes() >= 20 || this.state.date.getHours() === 14 && this.state.date.getMinutes() < 15) {
                    this.setState({ messages: '5교시 하자!', classmsg: ms['byeolgram'][this.state.classnm][4][this.state.date.getDay() - 1] })
                }
                if (this.state.date.getHours() === 14 && this.state.date.getMinutes() >= 15 || this.state.date.getHours() === 15 && this.state.date.getMinutes() < 10) {
                    this.setState({ messages: '6교시 하자!', classmsg: ms['byeolgram'][this.state.classnm][5][this.state.date.getDay() - 1] })
                }
                if (this.state.date.getDay() === 4 || this.state.date.getDay() === 5) {
                    if (this.state.date.getHours() === 15 && this.state.date.getMinutes() >= 10 || this.state.date.getHours() === 16 && this.state.date.getMinutes() < 5) {
                        this.setState({ messages: '7교시 하자!', classmsg: ms['byeolgram'][this.state.classnm][6][this.state.date.getDay() - 1] })
                    }
                    if (this.state.date.getHours() === 16 && this.state.date.getMinutes() >= 5 || this.state.date.getHours() > 16) {
                        this.setState({ messages: '오늘 하루 고생했어요!' })
                    }
                } else {
                    if (this.state.date.getHours() === 15 && this.state.date.getMinutes() >= 10 || this.state.date.getHours() > 15) {
                        this.setState({ messages: '오늘 하루 고생했어요!' })
                    }
                }
            }
        }
    }

    render() {
        return (
            <div className='text-center font-bold my-20'>
                <NextSeo title='학교 시간 알리미' description='Creator : 송찬우' />
                <h1 className='text-5xl my-10'>🧭학교 시간 알리미</h1>
                <h3 className='text-1xl'>지금 시각</h3>
                <h2 className='text-2xl'>{`${this.state.date.getMonth() + 1}월 ${this.state.date.getDate()}일 ${currentDay}요일`}</h2>
                <h1 className='text-8xl font-black my-6'>
                    {
                        `${(this.state.date.getHours().toString().length === 1) ? (`0${this.state.date.getHours()}`) : (this.state.date.getHours())}:${(this.state.date.getMinutes().toString().length === 1) ? (`0${this.state.date.getMinutes()}`) : (this.state.date.getMinutes())}:${(this.state.date.getSeconds().toString().length === 1) ? (`0${this.state.date.getSeconds()}`) : (this.state.date.getSeconds())}`
                    }
                </h1>
                <h1 className='text-2xl'>{this.state.messages}</h1>
                <h2 className='text-2xl'>{(this.state.classmsg.length === 0) ? '' : `${this.state.classmsg} 수업 하자!`}</h2>
                <div>
                    <Dropdown options={msoption} defaultValue={msoption[0].value} selection onChange={(e, data) => {
                        if (data.value === 'seokgwan') {
                            this.setState({ msname: 'seokgwan', classnm: 'second', options: option.seokgwan })
                        } else if (data.value === 'byeolgram') {
                            this.setState({ msname: 'byeolgram', classnm: 'tenth', options: option.byeolgram })
                            if (this.state.date.getHours() === 9 && this.state.date.getMinutes() >= 10 || this.state.date.getHours() === 9 && this.state.date.getMinutes() < 55) {
                                this.setState({ messages: '1교시 하자!', classmsg: ms['byeolgram']['tenth'][0][this.state.date.getDay() - 1] })
                            }
                            if (this.state.date.getHours() === 9 && this.state.date.getMinutes() >= 55 || this.state.date.getHours() === 10 && this.state.date.getMinutes() < 50) {
                                this.setState({ messages: '2교시 하자!', classmsg: ms['byeolgram']['tenth'][1][this.state.date.getDay() - 1] })
                            }
                            if (this.state.date.getHours() === 10 && this.state.date.getMinutes() >= 50 || this.state.date.getHours() === 11 && this.state.date.getMinutes() < 45) {
                                this.setState({ messages: '3교시 하자!', classmsg: ms['byeolgram']['tenth'][2][this.state.date.getDay() - 1] })
                            }
                            if (this.state.date.getHours() === 11 && this.state.date.getMinutes() >= 45 || this.state.date.getHours() === 12 && this.state.date.getMinutes() < 35) {
                                this.setState({ messages: '4교시 하자!', classmsg: ms['byeolgram']['tenth'][3][this.state.date.getDay() - 1] })
                            }
                            if (this.state.date.getHours() === 12 && this.state.date.getMinutes() >= 35 || this.state.date.getHours() === 13 && this.state.date.getMinutes() < 20) {
                                this.setState({ messages: '즐거운 점심시간!' })
                            }
                            if (this.state.date.getHours() === 13 && this.state.date.getMinutes() >= 20 || this.state.date.getHours() === 14 && this.state.date.getMinutes() < 15) {
                                this.setState({ messages: '5교시 하자!', classmsg: ms['byeolgram']['tenth'][4][this.state.date.getDay() - 1] })
                            }
                            if (this.state.date.getHours() === 14 && this.state.date.getMinutes() >= 15 || this.state.date.getHours() === 15 && this.state.date.getMinutes() < 10) {
                                this.setState({ messages: '6교시 하자!', classmsg: ms['byeolgram']['tenth'][5][this.state.date.getDay() - 1] })
                            }
                            if (this.state.date.getDay() === 4 || this.state.date.getDay() === 5) {
                                if (this.state.date.getHours() === 15 && this.state.date.getMinutes() >= 10 || this.state.date.getHours() === 16 && this.state.date.getMinutes() < 5) {
                                    this.setState({ messages: '7교시 하자!', classmsg: ms['byeolgram']['tenth'][6][this.state.date.getDay() - 1] })
                                }
                                if (this.state.date.getHours() === 16 && this.state.date.getMinutes() >= 5 || this.state.date.getHours() > 16) {
                                    this.setState({ messages: '오늘 하루 고생했어요!' })
                                }
                            } else {
                                if (this.state.date.getHours() === 15 && this.state.date.getMinutes() >= 10 || this.state.date.getHours() > 15) {
                                    this.setState({ messages: '오늘 하루 고생했어요!' })
                                }
                            }
                        }
                    }} />
                </div>
                <div>
                    <Dropdown options={this.state.options} selection defaultValue={this.state.options[0].value} onChange={(e, data) => this.setState({ classnm: data.value })} />
                </div>
                <table className='mx-auto my-10'>
                    <thead>
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
                        {ms[this.state.msname][this.state.classnm][0].map((r, index) =>
                            <td key={index}>{r}</td>
                        )}
                    </tr>
                    <tr>
                        <th>2교시</th>
                        {ms[this.state.msname][this.state.classnm][1].map((r, index) =>
                            <td key={index}>{r}</td>
                        )}
                    </tr>
                    <tr>
                        <th>3교시</th>
                        {ms[this.state.msname][this.state.classnm][2].map((r, index) =>
                            <td key={index}>{r}</td>
                        )}
                    </tr>
                    <tr>
                        <th>4교시</th>
                        {ms[this.state.msname][this.state.classnm][3].map((r, index) =>
                            <td key={index}>{r}</td>
                        )}
                    </tr>
                    <tr>
                        <th>5교시</th>
                        {ms[this.state.msname][this.state.classnm][4].map((r, index) =>
                            <td key={index}>{r}</td>
                        )}
                    </tr>
                    <tr>
                        <th>6교시</th>
                        {ms[this.state.msname][this.state.classnm][5].map((r, index) =>
                            <td key={index}>{r}</td>
                        )}
                    </tr>
                    <tr>
                        <th>7교시</th>
                        {ms[this.state.msname][this.state.classnm][6].map((r, index) =>
                            <td key={index}>{r}</td>
                        )}
                    </tr>
                    </tbody>
                </table>
                <div className='my-20 container mx-auto gap-2 flex-col lg:flex-row flex'>
                    <div className="bg-black rounded-xl p-6 text-white lg:w-1/3">
                        <h1 className="text-3xl mb-4">어제 급식이 뭐였지?</h1>
                        <p className="text-xl">{`${(this.props.data[this.state.msname]['yesterday']['menu'][0].length === 0) ? '어제는 급식이 없었어요!' : this.props.data[this.state.msname]['yesterday']['menu'][0]['lunch'].join(', ')}`}</p>
                    </div>
                    <div className="bg-black rounded-xl p-6 text-white lg:w-1/3">
                        <h1 className="text-3xl mb-4">오늘 급식은 뭐야?!</h1>
                        <p className="text-xl">{`${(this.props.data[this.state.msname]['today']['menu'][0].length === 0) ? '오늘은 급식이 없어요!' : this.props.data[this.state.msname]['today']['menu'][0]['lunch'].join(', ')}`}</p>
                    </div>
                    <div className="bg-black rounded-xl p-6 text-white lg:w-1/3">
                        <h1 className="text-3xl mb-4">내일 급식은 뭘까?</h1>
                        <p className="text-xl">{`${(this.props.data[this.state.msname]['tomorrow']['menu'][0].length === 0) ? '내일은 급식이 없어요!' : this.props.data[this.state.msname]['tomorrow']['menu'][0]['lunch'].join(', ')}`}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;