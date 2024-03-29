import {io} from 'socket.io-client';


//  io("http://localhost:3000")
export const initSocket =async()=>{
    const options={
        'force new connection':true,
        reconnectionAttempt:'Infinity',
        timeout:10000,
        transports:['websocket']
    }
    // return io(process.env.REACT_APP_BACKEND_URL,options);
    return io("http://localhost:3000",options);
}