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
const day = now.getDay()
const currentDay = days[day];

let messages;
let classmsg;
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
        }
        if (day === 3 || day === 4) {
            classmsg = '영어B 수업 들어가기'
        }
    }
    if (hours === 9 && minutes >= 35 || hours === 10 && minutes < 25) {
        messages = '2교시 하자!'
        if (day === 2) {
            classmsg = '국어 수업 들어가기'
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

function Home({ data }) {
    if (data[0].length === 0) {
        data[0] = '어제는 급식이 없었어요!'
    }
    if (data[1].length === 0) {
        data[1] = '오늘은 급식이 없어요!'
    }
    if (data[2].length === 0) {
        data[2] = '내일은 급식이 없어요!'
    }
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
          <h2 className='text-2xl'>{classmsg}</h2>
          <div className='my-20 text-3xl'>
              <div>
                  <h1>어제 급식이 뭐였지?</h1>
                  <h2>{data[0]}</h2>
              </div>
              <div>
                  <h1>오늘 급식은 뭐야?!</h1>
                  <h2>{data[1]}</h2>
              </div>
              <div>
                  <h1>내일 급식은 뭘까?</h1>
                  <h2>{data[2]}</h2>
              </div>
          </div>
        </div>
    )
}

Home.getInitialProps = async () => {
    const today = await (await fetch(`https://schoolmenukr.ml/api/middle/B100002273?year=${now.getFullYear()}&month=${now.getMonth() + 1}&date=${now.getDate()}`)).json()
    const _yesterday = await (await fetch(`https://schoolmenukr.ml/api/middle/B100002273?year=${yesterday.getFullYear()}&month=${yesterday.getMonth() + 1}&date=${yesterday.getDate()}`)).json()
    const _tomorrow = await (await fetch(`https://schoolmenukr.ml/api/middle/B100002273?year=${tomorrow.getFullYear()}&month=${tomorrow.getMonth() + 1}&date=${tomorrow.getDate()}`)).json()
    let data = []
    data.push(_yesterday.menu[0].lunch)
    data.push(today.menu[0].lunch)
    data.push(_tomorrow.menu[0].lunch)
    return { data: data }
};

export default Home;