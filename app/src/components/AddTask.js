import {useState} from "react"

const AddTask = ({onSubmitForm}) => {
    const[title, setTitle] = useState("")
    const[description, setDescription] = useState("")
    const[isCompleted, setIsCompleted] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        onSubmitForm({title, description, isCompleted})
    }
    return (
        <form className="add-form" onSubmit={onSubmit}>
            <h3>Add a task</h3>
            <div className="form-control">
                <label>Title</label>
                <input value={title} type="text" placeholder="Task title" onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="form-control">
                <label>Description</label>
                <input value={description} type="text" placeholder="Task description" onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div className="padLeft form-control form-control-check">
                <label>Is Completed</label>
                <input value={isCompleted} type="checkbox" onChange={(e) => setIsCompleted(e.currentTarget.checked)} />
            </div>

            <input type="submit" value="Add Task" className="form-control input btn btn-block" />
        </form>
    )
}

export default AddTask