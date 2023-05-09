
import editStyles from './Edit.module.css'
const Edit=({onCancel})=>{

    const onChange=()=>{
        
    }
    return (
              <> <input type='search' onChange={onChange}/> <button className={editStyles.btnCancel} onClick={onCancel}>Cancel</button></> 
    )
}

export default Edit;