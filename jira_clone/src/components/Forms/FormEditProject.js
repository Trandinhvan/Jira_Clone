import React, { useEffect } from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {useDispatch, useSelector} from 'react-redux'
import {connect} from 'react-redux'
import { validateYupSchema, withFormik } from 'formik'
import * as Yup from 'yup'

function FormEditProject(props) {

    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory)
  // console.log('đây =>', arrProjectCategory)
    const dispatch = useDispatch()

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue
      } = props
    

    //componentdidmout
    useEffect(()=>{

        //gọi api load project category
        dispatch({type:'GET_ALL_PROJECT_CATEGORY_SAGA'})

        dispatch({
            type:'SET_SUBMIT_EDIT_PROJECT',
            submitFunction: handleSubmit
        })
    },[])

    // const submitForm = (e)=>{
    //     e.preventDefault()
    //     alert('submit edit')
    // }

    const handleEditorChange = (content,editor)=>{
        console.log('Content was updated: ', content)
        setFieldValue('description',content)
      }

  return (
    <form className='container-fluid' onSubmit={handleSubmit}>
        <div className='row'>
            <div className='col-4'>
                <div className='form-group'>
                    <p className='font-weight-bold'>Project id</p>
                    <input value={values.id} disabled className='form-control' name='id'></input>
                </div>
            </div>
            <div className='col-4'>
                <div className='form-group'>
                    <p className='font-weight-bold'>Project name</p>
                    <input value={values.projectName} className='form-control' name='projectName' onChange={handleChange}></input>
                </div>
            </div>
            <div className='col-4'>
                <div className='form-group'>
                    <p className='font-weight-bold'>Project Category</p>
                    <select className="form-control" name="categoryId" value={values.categoryId}>
                            {arrProjectCategory?.map((item, index) => {
                                return <option key={index} value={item.id}>
                                    {item.projectCategoryName}
                                </option>
                            })}
                        </select>
                </div>
            </div>
            <div className='col-12'>
                <div className='form-group'>
                    <p className='font-weight-bold'>Description</p>
                    <Editor name='description'
        // onInit={(evt, editor) => editorRef.current = editor}
        initialValue={values.description}
        value={values.description}
        init={{
        height: 500,
        menubar: false,
        plugins: [
           'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
           'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
           'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
        ],
        toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
           'alignleft aligncenter alignright alignjustify | ' +
           'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={handleEditorChange}
    />
                </div>
            </div>
        </div>
    </form>
  )
}

const editProjectForm = withFormik({
    enableReinitialize: true, //mỗi lần props của redux thay đổi lập tức binding lại giá trị của obj mapprospvalues.
    mapPropsToValues: (props) =>{
        return {
            id: props.projectEdit.id,
            projectName: props.projectEdit.projectName,
            description: props.projectEdit.description,
            categoryId: props.projectEdit.categoryId
        }
    },
  
    validateYupSchema: Yup.object().shape({
  
    }),
  
    handleSubmit: (values, { props,setSubmitting }) => {
        //khi ngdung bấm submit => đưa dữ liệu về backend thông qua api
        const action = {
            type: 'UPDATE_PROJECTSAGA',
            projectUpdate: values
        }
        //gọi saga
        props.dispatch(action)
    },
    displayName: 'CreateProjectFormilk'
  })(FormEditProject)
  
  const mapStateToProps = (state) =>({
    projectEdit: state.ProjectJiraReducer.projectEdit
  })



  export default connect(mapStateToProps)(editProjectForm)
  
