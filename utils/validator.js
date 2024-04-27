export function validateRegister(data){
     const {name, username, password, confirm } = data;
     const errors={nameError:null, usernameError:null, passwordError:null, confirmError:null};
     let errCount = 0;
     console.log(username.length,username, "legth")
     name.length < 4 ? errors.nameError="名称必须至少包含 4 个字符" : "";
     name.length < 4 ?  errCount++ : "";
     username.length < 6 ? errors.usernameError="密码必须至少6个字符"  : "";
     username.length < 6 ? errCount++ : "";
     password.length < 6 ? errors.passwordError="密码必须至少6个字符"  : "";
     password.length < 6 ? errCount++ : "";

     name==="" ? errors.nameError="全名是必需的" : "";
     name==="" ?  errCount++ : "";
     username==="" ? errors.usernameError="用户名是必需的" : "";
     username==="" ? errCount++ : "";
     password==="" ? errors.passwordError="密码是必需的" : "";
     password==="" ? errCount++: "";
     confirm==="" ? errors.confirmError="需要确认密码" : "";
     confirm==="" ? errCount++: "";

  !errors.passwordError && password !== confirm ? errors.confirmError="confiremed password doesnt match" : ""
  !errors.password && password !== confirm ? errCount++ : ""
     return {errCount, errors}
};

export function validateLogin(data){
   const { username, password } = data;
   const errors={ usernameError:null, passwordError:null};
   let errCount = 0;

   username==="" ? errors.usernameError="用户名是必需的" : "";
   username==="" ? errCount++ : "";
   password==="" ? errors.passwordError="密码是必需的" : "";
   password==="" ? errCount++: "";

   return {errCount, errors}
};
