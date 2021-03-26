import {Circle} from 'better-react-spinkit'
function Loading() {
    return (
        <center style={{display:"grid", placeItems:"center", height:"100vh"}}>
            <div>
                <img
                    src="https://www.logo.wine/a/logo/WhatsApp/WhatsApp-Logo.wine.svg"
                    alt=""
                    style={{marginBottom:10}}
                    height={200}
                />
                <Circle  color="#FBBD38" size={70}/>

            </div>
            
        </center>
    )
}

export default Loading
