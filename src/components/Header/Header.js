import { useRef } from 'react'

// global imports
import './Header.css'
import {
  createTheme,
  makeStyles
} from '@material-ui/core/styles'
import {
  ThemeProvider
} from '@material-ui/styles'

// Material UI Components Imports
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'

// Import Data
import categories from '../data/category'


const useStyles = makeStyles((theme) => ({
  formControl: {
    // marginLeft: theme.spacing(1),
    minWidth: 120,
    width: '43%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



const Header = ({ themeLight , category , setCategory , word , setWord }) => {

  // Material UI Styles
  const darkTheme = createTheme({
    palette: {
      primary:{
        main:themeLight ? '#000' : '#fff'
      },
      type:themeLight ? 'light' : 'dark',
    }
  });

  const classes = useStyles()


  // Reference for findDOMNode deprecation warning
  const selectRef = useRef()

  // Clean Text Field
  const handleChange = language => {
    setCategory( language )
    setWord('')
  }

  return (
    <div  className="header">
      <span className="title">{ word ? word : 'Word Hunt' }</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>

          <TextField
            className="search"
            label="Search a word"
            value={word}
            onChange={ e => setWord( e.target.value )}
          />

          <FormControl className={classes.formControl}>
            <InputLabel id="language-label">Language</InputLabel>
            <Select
              ref={selectRef}
              className="select"
              labelId="language-label"
              value={category}
              onChange={ e => handleChange( e.target.value )}
            >
              {
                categories.map( option => (
                  <MenuItem value={option.label} key={option.label}>{option.value}</MenuItem>
                ))
              }
            </Select>
          </FormControl>

        </ThemeProvider>
      </div>
    </div>
  )

}

export default Header
