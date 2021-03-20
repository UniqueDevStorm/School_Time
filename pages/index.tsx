import 'tailwindcss/tailwind.css';
import Clock from 'react-live-clock';

const now = new Date();
const yesterday = new Date();
const tomorrow = new Date();
yesterday.setDate(now.getDate() - 1);
tomorrow.setDate(now.getDate() + 1);
const days = ["일","월","화","수","목","금","토"];
const hours = now.getHours();
const minutes = now.getMinutes();
const currentDay = days[now.getDay()];

let messages;
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
    }
    if (hours === 9 && minutes >= 35 || hours === 10 && minutes < 25) {
        messages = '2교시 하자!'
    }
    if (hours === 10 && minutes >= 25 || hours === 11 && minutes < 15) {
        messages = '3교시 하자!'
    }
    if (hours === 11 && minutes >= 15 || hours === 12 && minutes < 5) {
        messages = '4교시 하자!'
    }
    if (hours === 12 && minutes >= 5 || hours === 12 && minutes < 55) {
        messages = '즐거운 점심시간!'
    }
    if (hours === 12 && minutes >= 55 || hours === 13 && minutes < 40) {
        messages = '5교시 하자!'
    }
    if (hours === 13 && minutes >= 40 || hours === 14 && minutes < 30) {
        messages = '6교시 하자!'
    }
    if (now.getDay() === 2 || now.getDay() === 4) {
        if (hours === 14 && minutes >= 35 || hours === 15 && minutes < 20) {
            messages = '7교시 하자!'
        }
        if (hours === 15 && minutes >= 20 || hours === 23 && minutes < 59) {
            messages = '오늘 하루 고생했어요!'
        }
    }
}

function Home({ data }) {
    return (
        <div className='text-center font-bold'>
          <h1 className='text-5xl my-20'>🧭학교 시간 알리미</h1>
          <h3 className='text-1xl'>지금 시각</h3>
          <h2 className='text-2xl'>{
              <Clock format={`MM월 DD일 ${currentDay}요일`} ticking={true} />
          }</h2>
          <h1 className='text-8xl font-black my-6'>{
            <Clock format={'HH:mm:ss'} ticking={true} />
          }</h1>
          <h1 className='text-2xl'>{messages}</h1>
          <h1>{data.server_message.map((x, y)=><p key={y}>{x}</p>)}</h1>
        </div>
    )
}

Home.getInitialProps = async (ctx) => {
    const today = await (await fetch(`https://schoolmenukr.ml/api/middle/B100002273?year=${now.getFullYear()}&month=${now.getMonth()}&date=${now.getDate()}`)).json()
    const _yesterday = await (await fetch(`https://schoolmenukr.ml/api/middle/B100002273?year=${yesterday.getFullYear()}&month=${yesterday.getMonth()}&date=${yesterday.getDate()}`)).json()
    const _tomorrow = await (await fetch(`https://schoolmenukr.ml/api/middle/B100002273?year=${tomorrow.getFullYear()}&month=${tomorrow.getMonth()}&date=${tomorrow.getDate()}`)).json()
    let data = []
    data.push(today.menu[0].lunch)
    data.push(_yesterday.menu[0].lunch)
    data.push(_tomorrow.menu[0].lunch)
    console.log(data)
    return { data: today }
};

export default Home;