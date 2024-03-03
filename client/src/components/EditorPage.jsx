import { useEffect, useRef, useState } from "react";
import ClientsList from "./ClientsList";
// import contextTheme from "../utils/themeContext";
import OurEditor from "./Editor";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { initSocket } from "../../socket/socket";
import { toast } from "sonner";
import ACTIONS from "../../socket/Actions";




const EditorPage = () => {
  // const { theme } = useContext(contextTheme);
  // const theme=localStorage.getItem("theme")
  const [codeTheme,setCodeTheme]=useState('light')
  const [codeLanguage, setCodeLanguage] = useState("javascript");
  const [user, setUser] = useState([]);

  const socketRef=useRef(null);
  const reactNavigator=useNavigate();
  const location=useLocation();
  const {roomId}=useParams()
  useEffect(()=>{
    const init=async()=>{
      socketRef.current=await initSocket();
      socketRef.current.on('connect_error',(err)=>handleErrors(err));
      socketRef.current.on('connect_failed',(err)=>handleErrors(err));

      function handleErrors(err){
        console.log('socket error',err);
        toast.error('Socket connection failed, try again later..');
        reactNavigator('/')
      }


      socketRef.current.emit(ACTIONS.JOIN,{
        roomId,
        userName:location.state?.userName
      });


      //Listening for joined event
      socketRef.current.on(ACTIONS.JOINED,({clients,userName,socketId})=>{
        if(userName!==location.state?.userName){
          toast.success(`${userName} joined the Room. `);
          console.log(`${userName} joined`)
        }
        setUser(clients)
      })



      //Listening for Disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED,({socketId,userName})=>{
        toast.success(`${userName} left the room`);
        setUser((prev)=>{
          return prev.filter((client)=>client.socketId!==socketId);
        });
      });

    };init();

    return ()=>{
      socketRef.current.disconnected();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    }
  },[])

  if(!location.state){
    return <Navigate to="/" />
  }


  return (
    <div className="flex">
      <div className="aside border bg-gray-900 border-gray-700 flex flex-col h-[90vh] justify-between asidewraper w-[18%] ">
        <div>
          <div className="flex py-3 ">
            <h1 className="text-3xl">Code</h1>
            <span className=" text-teal-500 text-3xl">Sync</span>
          </div>
          <hr className="h-px mb-1 dark:bg-gray-600 border-0 bg-gray-800"/>

          <div>
            <h2 className=" font-bold">Connected</h2>
            <div className="flex mt-2 items-center justify-around flex-wrap">
                {user.map((u) => (
                <ClientsList key={u.socketId} userName={u.userName} />
                ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <button className={`m-2 bg-teal-500 p-1 rounded-lg`}>
            Copy ROOM ID
          </button>
          <button className={`m-2 bg-[tomato] p-1 rounded-lg`}>Leave</button>
        </div>
      </div>

      <div className="editorwraper">
        <div>
          <select name="code_theme" id="code_theme" onChange={(e)=>setCodeTheme(e.target.value)}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="none">Default</option>
          </select>

          <select
            name="code_language"
            id="code_language"
            value={codeLanguage}
            onChange={(e) => setCodeLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="go">Go</option>
          </select>
        </div>
        <OurEditor codeTheme={codeTheme} codeLanguage={codeLanguage} />
        {/* <textarea name="" id="" cols="30" rows="10"></textarea> */}
      </div>
    </div>
  );
};

export default EditorPage;
