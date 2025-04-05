import { useEffect, useRef } from "react";
import * as Three from "three"
import {  useOutletContext } from "react-router-dom"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
type ContextType = {
  setgenrating: (value: boolean) => void;}
  
  interface ImodelData  {
    vertices: number[]; 
    faces: number[];   
  };
  

function ThreeJsViewer({modelData}:{modelData:ImodelData}) {
    const {setgenrating} = useOutletContext<ContextType>()
    const domRef = useRef<HTMLDivElement | null>(null)
    //scene ref so we manultiple the existig scene later
    const sceneRef =useRef<Three.Scene|null>(null)
    useEffect(()=>{
      if (!domRef.current) return
      const width = domRef.current.clientWidth
      const height = domRef.current.clientHeight
    
      const scene = new Three.Scene()
      scene.background = new Three.Color('#000000')
      sceneRef.current = scene
    
      // Make the lights brighter
      const ambientLight = new Three.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)
    
      const pointLight = new Three.PointLight(0xffffff, 1, 100)
      pointLight.position.set(10, 10, 10) // Move light further out
      scene.add(pointLight)
    
      
      const gridHelper = new Three.GridHelper(50, 50) 
      scene.add(gridHelper)
    
      const camera = new Three.PerspectiveCamera(75, width/height, 0.1, 1000)
      // Move camera back and up slightly to see the scene better
      camera.position.set(2, 5, 10)
      camera.lookAt(0, 0, 0)
    
      const renderer = new Three.WebGLRenderer({antialias: true})
      renderer.setSize(width, height)
      domRef.current.appendChild(renderer.domElement)
    
     
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      
      const animate = () => {
        requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
      }
      animate()
    
      return () => {
        renderer.dispose()
        if (domRef.current) domRef.current.removeChild(renderer.domElement)
      }
    
    },[])
    
    useEffect(()=>{
      const scene = sceneRef.current
      if(!scene) return
      //remove existing model
      scene.children= scene.children.filter(child=>child instanceof Three.Light || child instanceof Three.GridHelper || child instanceof Three.AxesHelper)
      
      const {vertices,faces} = modelData
      if(!vertices||!faces) return
      //create the geometry 
      const geo = new Three.BufferGeometry()
      geo.setAttribute('position',new Three.Float32BufferAttribute(vertices,3))
      geo.setIndex(faces)
      geo.computeVertexNormals()

      const mat = new Three.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.5,
        side: Three.DoubleSide
      })

      const mesh = new Three.Mesh(geo,mat)
      scene.add(mesh)

      //center the model
      const box = new Three.Box3().setFromObject(mesh)
      const center = box.getCenter(new Three.Vector3())
     
mesh.position.x -= center.x
mesh.position.z -= center.z
mesh.position.y -= box.min.y 
    },[modelData])
  return (
    <div className="bg-white p-4 rounded-lg shadow-md relative">
      <button 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={() => setgenrating(false)}
      >
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M6 18L18 6M6 6l12 12" 
        />
        </svg>
      </button>
      <div ref={domRef} className="mt-2 h-[400px] w-[600px] overflow-hidden">
      
      </div>
    </div>
  )
}





export default ThreeJsViewer
