const initialState = {
    studentData: [
        {
          id:"1",
          firstName: "Bharat",
          lastName: "Agrawal",
          fatherName: "Ramesh Agrawal",
          emailId: "bharat@sarvika.com",
          address: "Jaipur",
          mobile: "7888874575",
          gender: "male",
          dob: "",
          country: "US",
        },
        {
          id:"2",
          firstName: "Bharat",
          lastName: "Agrawal",
          fatherName: "Ramesh Agrawal",
          emailId: "bharat0071@gmail.com",
          address: "Jaipur",
          mobile: "7888874575",
          gender: "male",
          dob: "",
          country: "US",
        },
        {
          id:"3",
          firstName: "Bharat",
          lastName: "dsdsd",
          fatherName: 'drer',
          emailId: "bharat0071@gmail.com",
          address: "Kota",
          mobile: "7888874575",
          gender: "female",
          dob: "",
          country: "US",
        },
        {
          id:"4",
          firstName: "Bharat",
          lastName: "Garg",
          fatherName: "sdd",
          emailId: "bharat0071@gmail.com",
          address: "Kota",
          mobile: "7888874575",
          gender: "male",
          dob: "",
          country: "US",
        },
      ]
  }
  
  function students(state = initialState, action) {
    // const temp = Object.assign({}, state.studentData)

    // return {
    //     ...state,
    //     studentData: action.payload,
    //   }

    switch (action.type) {
      case "STUDENT":
        // temp.push(action.payload)
        return {
          ...state,
          studentData: action.payload,
        }
      default:
        return state
    }


  }
  
  export default students