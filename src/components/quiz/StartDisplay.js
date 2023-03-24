import './StartDisplay.css'

export default function StartDisplay (props) {

  return (
    <div className="StartDisplay">
      <div className="StartDisplay__image-container">
        <div
          className="StartDisplay__image"
          style={{
            backgroundImage: `url(${props.pic})`
          }}
        />
      </div>
    </div>
  )
}