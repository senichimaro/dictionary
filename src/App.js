import axios from 'axios'
import {
  useEffect,
  useState
} from 'react'

// styles global import
import './App.css';
import {
  withStyles
} from '@material-ui/core/styles'
import {
  grey
} from '@material-ui/core/colors'


// Meterial UI Components Imports
import {
  Container,
  FormControlLabel,
  Switch
} from '@material-ui/core'

// Meterial UI Components Imports
import Header from './components/Header/Header'
import Definitions from './components/Definitions/Definitions'


// https://api.dictionaryapi.dev/api/v2/entries/<language>/<word>

function App() {
  const [ meanings , setMeanings ] = useState([])
  const [ word , setWord ] = useState('')
  const [ category , setCategory ] = useState('en')
  const [ themeLight , setThemeLight ] = useState(false)


  // Theme Switch
  const ThemeSwitch = withStyles({
    switchBase: {
      color: grey[300],
      '&$checked': {
        color: grey[500],
      },
      '&$checked + $track': {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);


  const dictionaryApi = async () => {
    try {
      const data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`)
      // console.log("data", data.data);
      setMeanings( data.data )
    }
    catch(e) { console.error(`ERROR at App.js dictionaryApi: ${e.message}`) }
  }

  // console.log("meanings", meanings);
  useEffect(() => {
    dictionaryApi()
    // console.log("useEffect");
  },[word , category])

  return (
    <div
      className="App"
      style={{
        height:'100vh',
        backgroundColor:themeLight ? '#fff' : '#282c34',
        color:themeLight ? '#000' : '#fff',
        transition:'all 0.5s linear'
      }}
    >

      {
        /** Theme Switch
        */
      }
      <div style={{position:'absolute',top:0,right:15,paddingTop:10}}>

        <span>{ themeLight ? 'Dark' : 'Light'} Mode</span>

        <ThemeSwitch

          name="checkedA"
          checked={themeLight}
          onChange={() => setThemeLight(!themeLight)}
        />

      </div>

      {
        /** Container | Header & Definitions
        */
      }
      <Container
        maxWidth="lg"
        style={{display:'flex', flexDirection:'column', height:'100vh', paddingTop:50}}
      >

        {/* Header */}
        <Header themeLight={themeLight} category={category} setCategory={setCategory} word={word} setWord={setWord} />
        {
          meanings && (
            <Definitions themeLight={themeLight} category={category} word={word} meanings={meanings} />
          )
        }

      </Container>

    </div>
  );
}

export default App;
