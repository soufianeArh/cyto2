export function validateRegister(data){
     const {name, username, password, confirm } = data;
     const errors={nameError:null, usernameError:null, passwordError:null, confirmError:null};
     let errCount = 0;
     console.log(username.length,username, "legth")
     name.length < 4 ? errors.nameError="name must be at least 4 characters" : "";
     name.length < 4 ?  errCount++ : "";
     username.length < 6 ? errors.usernameError="password must be at least 6 characters"  : "";
     username.length < 6 ? errCount++ : "";
     password.length < 6 ? errors.passwordError="password must be at least 6 characters"  : "";
     password.length < 6 ? errCount++ : "";

     name==="" ? errors.nameError="Name is required" : "";
     name==="" ?  errCount++ : "";
     username==="" ? errors.usernameError="username is required" : "";
     username==="" ? errCount++ : "";
     password==="" ? errors.passwordError="password is required" : "";
     password==="" ? errCount++: "";
     confirm==="" ? errors.confirmError="confirm is required" : "";
     confirm==="" ? errCount++: "";

  !errors.passwordError && password !== confirm ? errors.confirmError="confiremed password doesnt match" : ""
  !errors.password && password !== confirm ? errCount++ : ""
     return {errCount, errors}
} 