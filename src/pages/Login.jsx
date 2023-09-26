import React from 'react'

const Login = () => {
  return (
    <div className='loginContainer border rounded'>
        <form>
            <div class="form-group">
                <label for="exampleFormControlInput1">Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
            </div>
        </form>

    </div>
  )
}

export default Login