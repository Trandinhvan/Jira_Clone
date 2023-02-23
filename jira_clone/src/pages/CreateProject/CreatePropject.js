import React, {useRef,useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {connect, useSelector,useDispatch} from 'react-redux'
import { validateYupSchema, withFormik } from 'formik'

import * as Yup from 'yup'

function CreatePropject(props) {

  const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory)
  // console.log('đây =>', arrProjectCategory)
  const dispatch = useDispatch();

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

  useEffect(()=>{
    //gọi Api để lấy dữ liệu thẻ select
      dispatch({type:'GET_ALL_PROJECT_CATEGORY_SAGA'})
  },[])


  const handleEditorChange = (content,editor)=>{
    // console.log('Content was updated: ', content)
    setFieldValue('description',content)
  }

  const editorRef = useRef(null);
  return (
    <div className='container m-5'>
        <h3>Create Project</h3>
        <form className='container' onSubmit={handleSubmit} onChange={handleChange}>
          <div className='form-group'>
            <p>Name</p>
            <input className='form-control' name='projectName'></input>
          </div>
          <div className='form-group'>
            <p>Description</p>
            {/*  */}
            <Editor name='description'
        // onInit={(evt, editor) => editorRef.current = editor}
        initialValue=""
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
          <div className='form-group'>
            <select className='form-control' name='categoryId' onChange={handleChange}>
              {arrProjectCategory.map((item,index)=>{
                return <option value={item.id} key={index}>{item.projectCategoryName}</option>
              })}
            </select>
          </div>
          <button className='btn btn-outline-primary' type='submit'>Create Project</button>
        </form>
    </div>
  )
}

const CreatePropjectForm = withFormik({
  enableReinitialize: true, //mỗi lần props của redux thay đổi lập tức binding lại giá trị của obj mapprospvalues.
  mapPropsToValues: (props) =>({
    projectName: '',
    description:'',
    categoryId:props.arrProjectCategory[0]?.id,
  }),

  validateYupSchema: Yup.object().shape({

  }),

  handleSubmit: (values, { props,setSubmitting }) => {
    // console.log('this is values: ',values)
    props.dispatch({
      type:'CREATE_PROJECT_SAGA',
      newProject: values
    })
  },
  displayName: 'CreateProjectFormilk'
})(CreatePropject)

const mapStateToProps = (state) =>({
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
})

export default connect(mapStateToProps)(CreatePropjectForm)
