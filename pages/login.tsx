import { TextField, Button } from "@material-ui/core";
import { withSnackbar, useSnackbar } from "notistack";

function login() {
    const { enqueueSnackbar } = useSnackbar();
    const handleClick = (message) => {
        enqueueSnackbar(message, {
            variant: 'error'
        });
    };
    return (
        <div className='text-center my-10'>
            <div>
                <TextField label='학번' id='classnum' />
            </div>
            <div className='my-5'>
                <Button variant="contained" color='primary' onClick={() => {
                    const value = document.getElementById('classnum').value;
                    if (value.length === 5) {
                        if (value[0] === '3') {
                            if (value[2] === '2') {
                                fetch('/api/check', {
                                    method: 'POST'
                                }).then()
                                window.location.replace('/')
                            } else {
                                handleClick('2반 이외 출입 금지')
                            }
                        } else {
                            handleClick('3학년 이외 출입 금지')
                        }
                    } else {
                        handleClick('올바른 학번을 입력해주세요.')
                    }
                }}>Enter</Button>
            </div>
        </div>
    )
}

export default withSnackbar(login)