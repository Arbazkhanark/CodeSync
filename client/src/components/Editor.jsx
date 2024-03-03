import { useState, useCallback, useContext } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import contextTheme from '../utils/themeContext';


const Editor = ({codeTheme,codeLanguage}) => {
  // const {theme}=useContext(contextTheme)
  const theme=localStorage.getItem("theme")
  const [value, setValue] = useState("console.log('hello world!');");
  const onChange = useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
  }, []);

  return (
    <CodeMirror
      value={value}
      className={`${theme==='light'? "text-black":""} ${codeTheme==='none'?"text-white":""} `}
      width='999px'
      height="90vh"
      theme={codeTheme}
      autocompletion="true"
      // lintKeymap="true"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
}

export default Editor;
