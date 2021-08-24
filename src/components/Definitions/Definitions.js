
// import global styles
import './Definitions.css'

const Definitions = ({ themeLight , category , word , meanings }) => {

  console.log("meanings", meanings);

  return (
    <>


      {
        word
        ? (
          <div className="meanings">
            {
              meanings[0] && word && category === 'en' && (
                <audio
                  src={ meanings[0].phonetics[0] ? `${meanings[0].phonetics[0].audio}` : null }
                  style={{
                    backgroundColor:themeLight ? '#3b5360' : 'white',
                    color:themeLight ? '#fff' : 'black'
                  }}
                  controls
                >
                  Audio element is not suportted in current Browser
                </audio>
              )
            }
            {
              meanings.map( mean => (
                mean.meanings.map( item => (
                  item.definitions.map( def => (
                    <div
                      className="singleMean"
                      style={{
                        backgroundColor:themeLight ? '#3b5360' : 'white',
                        color:themeLight ? '#fff' : 'black'
                      }}
                    >
                      <b>{ def.definition }</b>

                      { def.example && (
                        <span>
                          <b>Example: </b> { def.example }
                        </span>
                      ) }

                      { def.synonyms.length > 0 && (
                        <span>
                          <b>Synonyms: </b>
                          { def.synonyms.map( ( syn , key ) => (
                            parseInt( key ) === ( parseInt( def.synonyms.length ) - 1 )
                            ? `${syn}.`
                            : `${syn}, `
                          ) ) }
                        </span>
                      ) }

                      <hr style={{backgroundColor:'black',width:'100%'}}/>
                    </div>
                  )) )
                ) )
              )
            }
          </div>
        )
        : <span className="subtitle">Start by searching a word</span>
      }

    </>
  )


}

export default Definitions
