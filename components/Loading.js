import {Circle} from 'better-react-spinkit'
function Loading() {
    return (
        <center style={{display:"grid", placeItems:"center", height:"100vh"}}>
            <div>
                <img
                    src="/logo/app_02/512.png"
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
