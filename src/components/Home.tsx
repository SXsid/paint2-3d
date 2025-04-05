import React, { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom';


function Home({height}:{height:number}){
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [userPrefrence,setPrefrence] = useState({
        linWith:5,
        color:{
           value: '#FFFFFF', name: 'White'
        }
    })
    const [isDrwaing,setDrawing] = useState(false)
    const [genrating, setgenrating] = useState(false)
    const [error, setError] = useState<string | null>(null);
    const colorsData=[
        { value: '#000000', name: 'Black' },
        { value: '#FF0000', name: 'Red' },
        { value: '#00FF00', name: 'Green' },
        { value: '#0000FF', name: 'Blue' },
        { value: '#FFFF00', name: 'Yellow' },
        { value: '#FF00FF', name: 'Purple' },
        { value: '#00FFFF', name: 'Cyan' },
        { value: '#FFFFFF', name: 'White' }
    ]
    const withData =[1,2,3,4,5,6,7,8,9,10]
    const getContext = () => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        const context = canvas.getContext('2d');
        if (!context) {
            setError('Canvas context not available');
            return null;
        }
        return { context, canvas };
    };

    useEffect(()=>{
            const data=getContext()
            if(! data) return
            const {context,canvas}=data
            canvas.height=height
            canvas.width=canvas.parentElement?.clientWidth||800
            
            

            context.lineCap='round'
            context.lineJoin='round'
            context.fillStyle="black"
            context.strokeStyle=userPrefrence.color.value
            context.lineWidth=userPrefrence.linWith
            context.fillRect(0,0,canvas.width,canvas.height)

            
            
            },[])

            const updateCanvas = (e:React.ChangeEvent<HTMLSelectElement>) => {
                const {name,value} = e.target
                const data=getContext()
                if(! data) return
                const {context}=data
                if(name === "color") {
                    
                    
                    setPrefrence(prev => {
                        context.strokeStyle = value;
                       return { ...prev,
                        color: {
                            value: value,
                            name: colorsData.find(c => c.value === value)?.name || ''
                        }}
                    })
                }else{
                    setPrefrence(prev=>{
                        context.lineWidth = Number(value);
                        return{
                            ...prev,
                            linWith:Number(value)
                        }
                    })
                }
                
                
               
              };

             
              
            const startDrawing=(e:React.MouseEvent<HTMLCanvasElement, MouseEvent>)=>{
                const data=getContext()
                if(! data) return
                const {context,canvas}=data
                const rect = canvas.getBoundingClientRect()
                const x = e.clientX-rect.left
                const y =e.clientY-rect.top

                context.beginPath()
                //defien the strt positon wrt to canvas 
                context.moveTo(x,y)
                setDrawing(true)
            }

            const draw=(e:React.MouseEvent<HTMLCanvasElement, MouseEvent>)=>{
                if(!isDrwaing) return
                const data=getContext()
                if(! data) return
                const {context,canvas}=data
                const rect = canvas.getBoundingClientRect()
                //curr pstoin of mouse
                const x = e.clientX-rect.left
                const y =e.clientY-rect.top

                context.lineTo(x,y)

                context.stroke()

            }
              
            const stopDrawing = () => {
                const data=getContext()
                if(! data) return
                const {context}=data
                // End the drawing path
                context.closePath();
                
                
                setDrawing(false);
              };
              const clearCanvas = () => {
                const data=getContext()
                if(! data) return
                const {context,canvas}=data
                // Clear the entire canvas
                context.fillStyle = 'black';
                context.fillRect(0, 0, canvas.width, canvas.height);
              };

              const savDrawing=()=>{
                const canvas = canvasRef.current
                if(!canvas)return
                const imageURl = canvas.toDataURL("image/jpg")
                const link = document.createElement('a');
                link.download = 'drawing.jpg';
                link.href = imageURl;
                link.click();

              }
              const startTochDrawing=(e:React.TouchEvent<HTMLCanvasElement>
              )=>{
                const data=getContext()
                if(! data) return
                const {context,canvas}=data

                const rect = canvas.getBoundingClientRect();
                const touch = e.touches[0];
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;

                context.beginPath();
                context.moveTo(x, y);
                setDrawing(true);

              }

              const Tochdraw=(e:React.TouchEvent<HTMLCanvasElement>
              )=>{
                if(!isDrwaing) return
                const data=getContext()
                if(! data) return
                const {context,canvas}=data
                const rect = canvas.getBoundingClientRect()
                const touch = e.touches[0];
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                context.lineTo(x,y)

                context.stroke()

              }

              
  return (
    <div className="min-h-screen bg-gray-900 p-8">
       {genrating&&<div className="absolute inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
           <Outlet context={{setgenrating}} />
         </div>}
            {error ? (
                <div className="text-red-500 text-xl">{error}</div>
            ) : (
                <div className="space-y-6 relative">
                    <h1 className="text-4xl font-bold text-white mb-8">Let's build</h1>
                    
                    <div className="flex space-x-4 mb-6">
                        <label className="flex items-center">
                            <select 
                                onChange={(e)=>updateCanvas(e)}
                                name='color'
                                value={userPrefrence.color.value}
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {colorsData.map(color => (
                                    <option key={color.value} value={color.value}>
                                        {color.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="flex items-center">
                            <select
                                name='width'
                                value={userPrefrence.linWith}
                                onChange={(e)=>updateCanvas(e)}
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {withData.map(width=>(
                                    <option key={width} value={width}>{width}</option>
                                ))}
                            </select>
                        </label>

                        <button 
                            onClick={clearCanvas}
                            className="bg-red-500 hover:bg-red-600 text-white lg:px-6 lg:py-2 px-3 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Clear
                        </button>
                        <button 
                        onClick={savDrawing}
                         className="bg-green-500 hover:bg-green-600 text-white lg:px-6 lg:py-2 px-3 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Save
                        </button>
                        <button 
                        onClick={()=>setgenrating(true)}
                         className="bg-cyan-500 hover:bg-cyan-600 text-white lg:px-6 lg:py-2 px-3 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            Create
                        </button>
                    </div>

                    <canvas 
                        onMouseDown={(e)=>startDrawing(e)}
                        onMouseMove={(e)=>draw(e)}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        ref={canvasRef}
                        className="border-2 border-gray-700 rounded-lg"
                        onTouchStart={(e)=>startTochDrawing(e)}
                     onTouchMove={(e)=>Tochdraw(e)}
                    onTouchEnd={stopDrawing}
                            style={{ touchAction: 'none', width: '100%', height: 'auto' }}
                    ></canvas>
                </div>
            )}
        </div>
  )
 
}

export default Home
